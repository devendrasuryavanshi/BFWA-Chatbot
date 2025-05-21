import { GoogleGenerativeAI } from '@google/generative-ai';
import { createClient } from '@/utils/supabase/server';

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

export async function POST(request: Request) {
    try {
        const supabase = await createClient();
        const { data: { user } } = await supabase.auth.getUser();

        if (!user) {
            return new Response(JSON.stringify({ error: 'Unauthorized' }), {
                status: 401,
                headers: { 'Content-Type': 'application/json' }
            });
        }

        const body = await request.json();
        const { messages, userContext, pdfContext, sessionId, pdfName } = body;

        if (!messages || !Array.isArray(messages) || messages.length === 0) {
            return new Response(JSON.stringify({ error: 'No messages provided' }), {
                status: 400,
                headers: { 'Content-Type': 'application/json' }
            });
        }

        const userMessage = messages[messages.length - 1];
        if (!userMessage || userMessage.role !== 'user') {
            return new Response(JSON.stringify({ error: 'Last message must be from user' }), {
                status: 400,
                headers: { 'Content-Type': 'application/json' }
            });
        }

        const userPrompt = userMessage.content;

        if (!userPrompt || !userPrompt.trim()) {
            return new Response(JSON.stringify({ error: 'Empty user prompt' }), {
                status: 400,
                headers: { 'Content-Type': 'application/json' }
            });
        }

        let generatedTitle: string | null = null;

        if (sessionId) {
            await supabase.from('chat_messages').insert({
                session_id: sessionId,
                user_id: user.id,
                content: userMessage.content,
                is_user: true,
                pdf_name: pdfName || null,
                pdf_content: pdfContext || null
            });

            const { data: messageCount } = await supabase
                .from('chat_messages')
                .select('id', { count: 'exact' })
                .eq('session_id', sessionId);

            if (messageCount && messageCount.length <= 2) {
                try {
                    const titleResponse = await fetch(new URL('/api/generate-title', request.url), {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ message: userPrompt })
                    });

                    if (titleResponse.ok) {
                        const { title } = await titleResponse.json();
                        generatedTitle = title;

                        await supabase
                            .from('chat_sessions')
                            .update({
                                title: title,
                                updated_at: new Date().toISOString()
                            })
                            .eq('id', sessionId);
                    }
                } catch (titleError) {
                    console.error('Error generating title:', titleError);
                    await supabase
                        .from('chat_sessions')
                        .update({
                            title: userPrompt.slice(0, 30) + (userPrompt.length > 30 ? '...' : ''),
                            updated_at: new Date().toISOString()
                        })
                        .eq('id', sessionId);
                }
            } else {
                await supabase
                    .from('chat_sessions')
                    .update({ updated_at: new Date().toISOString() })
                    .eq('id', sessionId);
            }
        }

        const systemInstruction = `
      You are a helpful AI assistant. Always provide concise, factual answers.
      User Context: ${JSON.stringify(userContext)}
      Document Context: ${pdfContext ? `PDF Document (${pdfName}): ${pdfContext}` : 'None'}
    `;

        const model = genAI.getGenerativeModel({
            model: 'gemini-2.0-flash',
            generationConfig: {
                temperature: 0.7,
                maxOutputTokens: 1048,
                topK: 3,
                topP: 0.9,
            },
            systemInstruction,
        });

        const historyMessages = messages.slice(0, -1);
        const chatSession = model.startChat({
            history: historyMessages.map((m: any) => ({
                role: m.role === 'assistant' ? 'model' : m.role,
                parts: [{ text: m.content || ' ' }],
            })),
        });

        const result = await chatSession.sendMessageStream(userPrompt);

        let fullResponse = '';

        const encoder = new TextEncoder();
        const stream = new ReadableStream({
            async start(controller) {
                if (generatedTitle) {
                    controller.enqueue(encoder.encode(`data: {"title":"${generatedTitle}"}\n\n`));
                }
                for await (const chunk of result.stream) {
                    const text = chunk.text();
                    fullResponse += text;
                    controller.enqueue(encoder.encode(`data: ${text}\n\n`));
                }

                if (sessionId) {
                    await supabase.from('chat_messages').insert({
                        session_id: sessionId,
                        user_id: user.id,
                        content: fullResponse,
                        is_user: false
                    });

                    const { data: messageCount } = await supabase
                        .from('chat_messages')
                        .select('id', { count: 'exact' })
                        .eq('session_id', sessionId);

                    if (messageCount && messageCount.length <= 2) {
                        await supabase
                            .from('chat_sessions')
                            .update({
                                title: userPrompt.slice(0, 50) + (userPrompt.length > 50 ? '...' : ''),
                                updated_at: new Date().toISOString()
                            })
                            .eq('id', sessionId);
                    } else {
                        await supabase
                            .from('chat_sessions')
                            .update({ updated_at: new Date().toISOString() })
                            .eq('id', sessionId);
                    }
                }

                controller.enqueue(encoder.encode('data: [DONE]\n\n'));
                controller.close();
            }
        });

        return new Response(stream, {
            headers: {
                'Content-Type': 'text/event-stream',
                'Cache-Control': 'no-cache',
                'Connection': 'keep-alive',
            },
        });
    } catch (err) {
        console.error('[Gemini API Error]', err);
        const errorMessage = err instanceof Error ? err.message : 'Unknown error occurred';
        return new Response(JSON.stringify({ error: 'Internal server error', details: errorMessage }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' }
        });
    }
}
