import { GoogleGenerativeAI } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

export async function POST(request: Request) {
  try {
    const { message } = await request.json();
    
    if (!message) {
      return Response.json({ error: 'No message provided' }, { status: 400 });
    }
    
    const model = genAI.getGenerativeModel({
      model: 'gemini-2.0-flash',
      generationConfig: {
        temperature: 0.2,
        maxOutputTokens: 30,
        topK: 1,
        topP: 0.8,
      }
    });
    
    const prompt = `Generate a very short, concise title (maximum 5 words) for a chat that starts with this message: "${message}". 
    Return ONLY the title, nothing else. Keep it under 30 characters.`;
    
    const result = await model.generateContent(prompt);
    const title = result.response.text().trim();
    
    return Response.json({ title });
  } catch (error) {
    console.error('Error generating title:', error);
    return Response.json({ error: 'Failed to generate title' }, { status: 500 });
  }
}