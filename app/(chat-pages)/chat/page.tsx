'use client';

import { useEffect, useRef, useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { nanoid } from 'nanoid';
import { motion, AnimatePresence } from "framer-motion";
import { SendHorizontal, PlusCircle, FileUp, Trash2 } from "lucide-react";
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { redirect, useRouter } from 'next/navigation';
import { createClient } from '@/utils/supabase/client';
import Sidebar from '@/components/chat/sidebar';
import { v4 as uuidv4 } from 'uuid';

type Message = {
    id: string;
    role: 'user' | 'model';
    hasPdf?: boolean;
    content: string;
    timestamp: Date;
    isComplete?: boolean;
    pdfName?: string;
};

type ChatHistory = {
    id: string;
    sessionId: string;
    title: string;
    timestamp: Date;
    messages: Message[];
};

export default function ChatPage() {
    const [messages, setMessages] = useState<Message[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [chatHistories, setChatHistories] = useState<ChatHistory[]>([]);
    const [activeChatId, setActiveChatId] = useState<string | null>(null);
    const [pdfFile, setPdfFile] = useState<File | null>(null);
    const [userContext, setUserContext] = useState({});
    const [pdfContext, setPdfContext] = useState('');
    const [user, setUser] = useState<any>(null);
    const [sessionId, setSessionId] = useState<string | null>(null);
    const router = useRouter();

    useEffect(() => {
        if (user) {
            loadChatHistory();
        }
    }, [user]);

    const loadChatHistory = async () => {
        if (!user) return;

        const supabase = createClient();

        const { data: sessions, error: sessionsError } = await supabase
            .from('chat_sessions')
            .select('*')
            .order('updated_at', { ascending: false });

        if (sessionsError) {
            toast.error('Failed to load chat history');
            return;
        }

        const chatHistories: ChatHistory[] = [];

        for (const session of sessions) {
            const { data: messages, error: messagesError } = await supabase
                .from('chat_messages')
                .select('*')
                .eq('session_id', session.id)
                .order('created_at', { ascending: true });

            if (messagesError) {
                console.error('Error loading chat messages:', messagesError);
                continue;
            }

            const formattedMessages: Message[] = messages.map(msg => ({
                id: msg.id,
                role: msg.is_user ? 'user' : 'model',
                content: msg.content,
                timestamp: new Date(msg.created_at),
                isComplete: !msg.is_user,
                hasPdf: !!msg.pdf_name,
                pdfName: msg.pdf_name || undefined
            }));

            chatHistories.push({
                id: nanoid(),
                sessionId: session.id,
                title: session.title,
                timestamp: new Date(session.created_at),
                messages: formattedMessages
            });
        }

        setChatHistories(chatHistories);

        if (chatHistories.length > 0) {
            setActiveChatId(chatHistories[0].id);
            setSessionId(chatHistories[0].sessionId);
            setMessages(chatHistories[0].messages);

            const lastUserMessage = chatHistories[0].messages.findLast(m => m.role === 'user' && m.hasPdf);
            if (lastUserMessage?.hasPdf && lastUserMessage?.pdfName) {
                setPdfContext(`[PDF content from ${lastUserMessage.pdfName}]`);
            }
        }
    };

    const createNewChatSession = async () => {
        const supabase = createClient();
        const newSessionId = uuidv4();

        const { data, error } = await supabase
            .from('chat_sessions')
            .insert({
                id: newSessionId,
                title: 'New Chat',
                user_id: user?.id
            })
            .select()
            .single();

        if (error) {
            console.error('Error creating chat session:', error);
            toast.error('Failed to create new chat');
            return null;
        }

        return data.id;
    };

    useEffect(() => {
        const checkAuth = async () => {
            const supabase = createClient();
            const { data: { user } } = await supabase.auth.getUser();

            if (!user) {
                toast.error('You must be logged in to access this page.');
                router.push('/sign-in');
            } else {
                setUser(user);
            }
        };

        checkAuth();
    }, []);

    const chatEndRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        const savedHistories = localStorage.getItem('chatHistories');
        if (savedHistories) {
            const parsed = JSON.parse(savedHistories);
            setChatHistories(parsed.map((history: any) => ({
                ...history,
                timestamp: new Date(history.timestamp),
                messages: history.messages.map((msg: any) => ({
                    ...msg,
                    timestamp: new Date(msg.timestamp)
                }))
            })));
        }
    }, []);

    useEffect(() => {
        if (chatHistories.length > 0) {
            localStorage.setItem('chatHistories', JSON.stringify(chatHistories));
        }
    }, [chatHistories]);

    useEffect(() => {
        if (activeChatId) {
            const activeChat = chatHistories.find(chat => chat.id === activeChatId);
            if (activeChat) {
                setMessages(activeChat.messages);
            }
        }
    }, [activeChatId, chatHistories]);

    useEffect(() => {
        if (isLoading || messages.length > 0) {
            chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
        }
    }, [messages, isLoading]);

    const createNewChat = async () => {
        const newSessionId = await createNewChatSession();
        if (!newSessionId) return;

        const newChatId = nanoid();
        const newChat: ChatHistory = {
            id: newChatId,
            sessionId: newSessionId,
            title: 'New Chat',
            timestamp: new Date(),
            messages: []
        };

        setChatHistories(prev => [newChat, ...prev]);
        setActiveChatId(newChatId);
        setSessionId(newSessionId);
        setMessages([]);
        setPdfFile(null);
        setPdfContext('');
    };

    const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        if (file.type !== 'application/pdf') {
            toast.error('Please upload a PDF file');
            return;
        }

        setPdfFile(file);

        const formData = new FormData();
        formData.append('file', file);

        try {
            const response = await fetch('/api/parse-pdf', {
                method: 'POST',
                body: formData,
            });

            if (!response.ok) {
                throw new Error('Failed to parse PDF');
            }

            toast.success(`File uploaded: ${file.name}`);
            const data = await response.json();
            setPdfContext(data.text);
        } catch (error) {
            console.error('Error parsing PDF:', error);
            toast.error('Failed to parse PDF');
        }

        if (fileInputRef.current) fileInputRef.current.value = '';
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const inputValue = inputRef?.current?.value.trim();
        if (!inputValue || isLoading) return;

        if (!activeChatId) {
            await createNewChat();
        }

        if (!sessionId) {
            const newSessionId = await createNewChatSession();
            if (!newSessionId) return;
            setSessionId(newSessionId);

            setChatHistories(prev =>
                prev.map(chat =>
                    chat.id === activeChatId
                        ? { ...chat, sessionId: newSessionId }
                        : chat
                )
            );
        }

        const userMessage: Message = {
            id: nanoid(),
            role: 'user',
            content: inputValue,
            timestamp: new Date(),
            hasPdf: !!pdfFile,
            pdfName: pdfFile?.name
        };

        let aiMessage: Message = {
            id: nanoid(),
            role: 'model',
            content: '',
            timestamp: new Date(),
            isComplete: false
        };

        if (inputRef.current) inputRef.current.value = '';

        const newMessages = [...messages, userMessage, aiMessage];
        setMessages(newMessages);

        setChatHistories(prev =>
            prev.map(chat =>
                chat.id === activeChatId
                    ? {
                        ...chat,
                        messages: newMessages,
                        title: chat.messages.length === 0 ? inputValue.slice(0, 30) : chat.title
                    }
                    : chat
            )
        );

        setIsLoading(true);

        try {
            const response = await fetch('/api/chat/stream', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    messages: [...messages, userMessage].map(m => ({
                        role: m.role,
                        content: m.content
                    })),
                    userContext,
                    pdfContext,
                    sessionId,
                    pdfName: pdfFile?.name
                }),
            });

            if (!response.ok) {
                throw new Error('Failed to get response');
            }

            const reader = response.body?.getReader();
            if (!reader) throw new Error('No reader available');

            let fullResponse = '';

            while (true) {
                const { done, value } = await reader.read();
                if (done) break;

                const chunk = new TextDecoder().decode(value);
                const lines = chunk.split('\n\n');

                for (const line of lines) {
                    if (line.startsWith('data: ')) {
                        const data = line.slice(6);
                        if (data === '[DONE]') break;

                        if (data.startsWith('{') && data.includes('"title"')) {
                            try {
                                const titleData = JSON.parse(data);
                                if (titleData.title) {
                                    setChatHistories(prev =>
                                        prev.map(chat =>
                                            chat.id === activeChatId
                                                ? { ...chat, title: titleData.title }
                                                : chat
                                        )
                                    );
                                }
                                continue;
                            } catch (e) {
                                console.error('Error parsing title data:', e);
                            }
                        }

                        fullResponse += data;

                        setMessages(prev =>
                            prev.map(msg =>
                                msg.id === aiMessage.id
                                    ? { ...msg, content: fullResponse }
                                    : msg
                            )
                        );

                        setChatHistories(prev =>
                            prev.map(chat =>
                                chat.id === activeChatId
                                    ? {
                                        ...chat,
                                        messages: chat.messages.map(msg =>
                                            msg.id === aiMessage.id
                                                ? { ...msg, content: fullResponse }
                                                : msg
                                        )
                                    }
                                    : chat
                            )
                        );
                    }
                }
            }

            setMessages(prev =>
                prev.map(msg =>
                    msg.id === aiMessage.id
                        ? { ...msg, isComplete: true }
                        : msg
                )
            );

            setChatHistories(prev =>
                prev.map(chat =>
                    chat.id === activeChatId
                        ? {
                            ...chat,
                            messages: chat.messages.map(msg =>
                                msg.id === aiMessage.id
                                    ? { ...msg, isComplete: true }
                                    : msg
                            )
                        }
                        : chat
                )
            );

        } catch (error) {
            console.error('Error:', error);
            toast.error('An error occurred while sending the message.');

            setMessages(prev => prev.filter(msg => msg.id !== aiMessage.id));

            setChatHistories(prev =>
                prev.map(chat =>
                    chat.id === activeChatId
                        ? {
                            ...chat,
                            messages: chat.messages.filter(msg => msg.id !== aiMessage.id)
                        }
                        : chat
                )
            );
        } finally {
            setIsLoading(false);
            setTimeout(() => {
                inputRef?.current?.focus();
            }, 500);
        }
    };

    const deleteChat = async (chatId: string) => {
        const chatToDelete = chatHistories.find(chat => chat.id === chatId);
        if (!chatToDelete || !chatToDelete.sessionId) {
            setChatHistories(prev => prev.filter(chat => chat.id !== chatId));
            if (activeChatId === chatId) {
                setActiveChatId(null);
                setSessionId(null);
                setMessages([]);
            }
            return;
        }

        const supabase = createClient();
        const { error } = await supabase
            .from('chat_sessions')
            .delete()
            .eq('id', chatToDelete.sessionId);

        if (error) {
            console.error('Error deleting chat session:', error);
            toast.error('Failed to delete chat');
            return;
        }

        setChatHistories(prev => prev.filter(chat => chat.id !== chatId));
        if (activeChatId === chatId) {
            setActiveChatId(null);
            setSessionId(null);
            setMessages([]);
            setPdfFile(null);
            setPdfContext('');
        }
    };

    const triggerFileInput = () => {
        fileInputRef.current?.click();
    };

    return (
        <div className="flex h-[calc(100vh-64px)] overflow-hidden">
            {/* Sidebar */}
            <Sidebar
                chatHistories={chatHistories}
                activeChatId={activeChatId}
                setActiveChatId={setActiveChatId}
                createNewChat={createNewChat}
                deleteChat={deleteChat}
                user={user}
            />

            {/* Main Chat Area */}
            <div className="flex-1 flex flex-col h-full w-full overflow-hidden">
                <Card className="flex-1 flex flex-col mx-auto backdrop-blur-sm shadow-lg rounded-none border-0 w-full md:w-4/6 h-full overflow-hidden">
                    <div className="w-full h-full flex flex-col overflow-hidden">
                        <div className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-transparent">
                            {messages.length === 0 && (
                                <div className="flex-1 flex flex-col items-center justify-center gap-8 md:gap-12 p-4 md:py-8 md:px-0">
                                    <div className="relative">
                                        <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 blur-3xl opacity-20 animate-pulse" />
                                        <img src="https://www.buildfastwithai.com/_next/static/media/light.5e8e48b7.svg" alt="logo" className="relative w-12 h-12 md:w-16 md:h-16 animate-pulse" />
                                    </div>
                                    <div className="space-y-4 md:space-y-6 text-center">
                                        <div className="space-y-2">
                                            <h2 className="text-xl md:text-2xl font-bold">
                                                AI Chat model
                                            </h2>
                                            <p className="text-sm md:text-base text-muted-foreground">
                                                Ask me anything or upload a PDF for context
                                            </p>
                                        </div>
                                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
                                            <div className="flex items-center gap-4">
                                                <div className="p-3 rounded-full bg-purple-100 dark:bg-purple-900/30 shrink-0">
                                                    <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                                    </svg>
                                                </div>
                                                <div className="min-w-0">
                                                    <h3 className="font-semibold truncate text-start">Ask Questions</h3>
                                                    <p className="text-sm text-neutral-600 dark:text-neutral-400 truncate text-start">Get detailed answers</p>
                                                </div>
                                            </div>
                                            <div className="flex items-center gap-4">
                                                <div className="p-3 rounded-full bg-pink-100 dark:bg-pink-900/30 shrink-0">
                                                    <svg className="w-6 h-6 text-pink-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                                                    </svg>
                                                </div>
                                                <div className="min-w-0">
                                                    <h3 className="font-semibold truncate text-start">Upload PDFs</h3>
                                                    <p className="text-sm text-neutral-600 dark:text-neutral-400 truncate text-start">Get context-aware responses</p>
                                                </div>
                                            </div>
                                            <div className="flex items-center gap-4">
                                                <div className="p-3 rounded-full bg-purple-100 dark:bg-purple-900/30 shrink-0">
                                                    <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                                                    </svg>
                                                </div>
                                                <div className="min-w-0">
                                                    <h3 className="font-semibold truncate text-start">Smart Responses</h3>
                                                    <p className="text-sm text-neutral-600 dark:text-neutral-400 truncate text-start">Powered by Gemini AI</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}

                            <AnimatePresence mode="wait">
                                {messages.map((message) => (
                                    <motion.div
                                        key={message.id}
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.3 }}
                                        className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                                    >
                                        <div className={`
                                    max-w-[85%] p-4
                                    ${message.role === 'user'
                                                ? ' border-r-2 ml-4'
                                                : 'mr-4 border-l-2'
                                            }
                                `}>
                                            <div className="flex items-center gap-2 mb-2">
                                                {message.role === 'model' && (
                                                    <img width={10} height={10} src="https://www.buildfastwithai.com/_next/static/media/light.5e8e48b7.svg" alt="logo" />
                                                )}
                                                <span className="text-xs opacity-70">
                                                    {message.role === 'model' ? 'AI' : 'You'}
                                                </span>
                                            </div>
                                            <div className="prose prose-sm dark:prose-invert max-w-none overflow-x-auto">
                                                {message.role === 'model' ? (
                                                    <ReactMarkdown
                                                        remarkPlugins={[remarkGfm]}
                                                        rehypePlugins={[rehypeRaw]}
                                                        components={{
                                                            h2: ({ node, ...props }) => <h2 className="text-xl font-semibold text-primary my-3" {...props} />,
                                                            ul: ({ node, ...props }) => <ul className="space-y-1 my-2" {...props} />,
                                                            li: ({ node, ...props }) => <li className="flex items-center gap-2 before:content-['•'] before:text-primary" {...props} />,
                                                            table: ({ node, ...props }) => <table className="w-full my-3 border-collapse" {...props} />,
                                                            td: ({ node, ...props }) => <td className="p-2 border-b border-muted" {...props} />,
                                                            th: ({ node, ...props }) => <th className="p-2 text-left bg-muted/50 border-b border-primary/20" {...props} />,
                                                            strong: ({ node, ...props }) => <strong className="font-medium text-primary" {...props} />,
                                                            em: ({ node, ...props }) => <em className="text-primary/80 italic" {...props} />,
                                                            a: ({ node, href, children, ...props }) => {
                                                                const isImage = href?.match(/\.(jpg|jpeg|gif|png|webp)$/i);
                                                                return (
                                                                    <a
                                                                        href={href}
                                                                        className="text-primary hover:text-primary/80 underline underline-offset-4 transition-colors"
                                                                        target="_blank"
                                                                        rel="noopener noreferrer"
                                                                        {...props}
                                                                    >
                                                                        {children}
                                                                    </a>
                                                                );
                                                            }
                                                        }}
                                                    >
                                                        {message.content}
                                                    </ReactMarkdown>

                                                ) : (
                                                    message.content
                                                )}

                                                {message.hasPdf && message.pdfName && (
                                                    <div className="flex items-center gap-2 mt-1 mb-2 text-xs text-gray-400">
                                                        <FileUp size={12} className="text-indigo-400" />
                                                        <span>Attached PDF: {message.pdfName}</span>
                                                    </div>
                                                )}

                                            </div>
                                            <span className={`pt-2 text-xs opacity-70 ${message.role === 'model' ? 'text-left' : 'text-right'} block ${(message.role === 'model' && message.isComplete) || message.role === 'user' ? '' : 'hidden'}`}>
                                                {new Date(message.timestamp).toLocaleDateString()}
                                                {' '}
                                                {new Date(message.timestamp).toLocaleTimeString([], {
                                                    hour: '2-digit',
                                                    minute: '2-digit',
                                                })}
                                            </span>
                                            {!message.isComplete && message.role === 'model' && (
                                                <div className="mt-2 space-y-2">
                                                    <div className="flex items-center gap-0.5">
                                                        <motion.span
                                                            initial={{ opacity: 0 }}
                                                            animate={{ opacity: [0, 1, 0] }}
                                                            transition={{
                                                                repeat: Infinity,
                                                                duration: 2,
                                                                ease: "easeInOut",
                                                            }}
                                                            className="text-sm font-medium bg-gradient-to-r from-blue-500 to-rose-500 bg-clip-text text-transparent"
                                                        >
                                                            Generating response
                                                        </motion.span>
                                                        <motion.span
                                                            animate={{ opacity: [0, 1, 0] }}
                                                            transition={{
                                                                repeat: Infinity,
                                                                duration: 2,
                                                                delay: 0.3,
                                                                ease: "easeInOut",
                                                            }}
                                                            className="text-blue-500 text-xs pt-2"
                                                        >
                                                            •
                                                        </motion.span>
                                                        <motion.span
                                                            animate={{ opacity: [0, 1, 0] }}
                                                            transition={{
                                                                repeat: Infinity,
                                                                duration: 2,
                                                                delay: 0.6,
                                                                ease: "easeInOut",
                                                            }}
                                                            className="text-violet-500 text-xs pt-2"
                                                        >
                                                            •
                                                        </motion.span>
                                                        <motion.span
                                                            animate={{ opacity: [0, 1, 0] }}
                                                            transition={{
                                                                repeat: Infinity,
                                                                duration: 2,
                                                                delay: 0.9,
                                                                ease: "easeInOut",
                                                            }}
                                                            className="text-rose-500 text-xs pt-2"
                                                        >
                                                            •
                                                        </motion.span>
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    </motion.div>
                                ))}
                            </AnimatePresence>
                            <div ref={chatEndRef} />
                        </div>

                        <div className="p-4">
                            <form onSubmit={handleSubmit} className="flex items-center gap-2 w-full">
                                <div className="relative flex-1">
                                    <Input
                                        ref={inputRef}
                                        placeholder="Ask a question"
                                        className="bg-transparent w-full rounded-full h-10 border border-input hover:border-accent focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:border-input text-white placeholder:text-gray-400 pr-12"
                                        disabled={isLoading}
                                    />

                                    {pdfFile ? (
                                        <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-1 bg-gray-800/60 rounded-full py-0.5 px-2">
                                            <FileUp size={12} className="text-indigo-400" />
                                            <span className="text-xs text-gray-200 max-w-[80px] truncate">{pdfFile.name}</span>
                                            <button
                                                onClick={() => setPdfFile(null)}
                                                className="rounded-full p-0.5 hover:bg-gray-700 transition-colors"
                                                aria-label="Remove file"
                                            >
                                                <Trash2 size={10} className="text-gray-400 hover:text-gray-200" />
                                            </button>
                                        </div>
                                    ) : (
                                        <Button
                                            type="button"
                                            size="icon"
                                            className="bg-transparent hover:bg-transparent text-white absolute right-1 top-1/2 -translate-y-1/2"
                                            onClick={triggerFileInput}
                                            disabled={isLoading}
                                        >
                                            <PlusCircle size={20} />
                                        </Button>
                                    )}

                                    <input
                                        type="file"
                                        ref={fileInputRef}
                                        onChange={handleFileUpload}
                                        className="hidden"
                                        accept=".pdf"
                                    />
                                </div>

                                <Button
                                    type="submit"
                                    disabled={isLoading}
                                    className="rounded-full"
                                >
                                    <SendHorizontal className="w-5 h-5" />
                                </Button>
                            </form>
                            <div className="mt-2 text-xs text-center text-muted-foreground">
                                AI responses are generated and may contain inaccuracies.
                            </div>
                        </div>
                    </div>
                </Card>
            </div>
        </div>
    );
}
