"use client";

import { useState, useEffect } from "react";
import { Plus, History, Trash2, ChevronLeft, ChevronRight, MessageSquare, PanelRightOpen, PanelRightClose } from "lucide-react";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

type ChatHistory = {
    id: string;
    title: string;
    timestamp: Date;
    messages: any[];
};

type SidebarProps = {
    chatHistories: ChatHistory[];
    activeChatId: string | null;
    setActiveChatId: (id: string) => void;
    createNewChat: () => void;
    deleteChat: (id: string) => void;
    user?: any;
};

const Sidebar = ({
    chatHistories,
    activeChatId,
    setActiveChatId,
    createNewChat,
    deleteChat,
    user
}: SidebarProps) => {
    const [isExpanded, setIsExpanded] = useState(true);

    useEffect(() => {
        if (window.innerWidth < 768) {
            setIsExpanded(false);
        }
    }, []);

    return (
        <motion.div
            animate={{ width: isExpanded ? "260px" : "72px" }}
            className="h-full w-[260px] bg-gray-50 dark:bg-gray-900 border-r border-gray-200 dark:border-gray-800 flex flex-col relative z-20"
            transition={{ duration: 0.2 }}
        >
            <div className="w-full flex flex-col">
                <Button
                size="icon"
                onClick={() => setIsExpanded(!isExpanded)}
                className="mr-2 self-end bg-transparent text-white font-bold hover:bg-transparent"
                aria-label={isExpanded ? "Collapse sidebar" : "Expand sidebar"}
            >
                {isExpanded ? <PanelRightOpen size={35} /> : <PanelRightClose size={35} />}
            </Button>
            </div>

            <div className="p-3">
                <Button
                    onClick={createNewChat}
                    className={cn(
                        "w-full flex items-center justify-center gap-2",
                        !isExpanded && "px-2"
                    )}
                    title={!isExpanded ? "New Chat" : undefined}
                >
                    <Plus size={16} />
                    {isExpanded && <span>New Chat</span>}
                </Button>
            </div>

            <div className="flex-1 overflow-y-auto p-2">
                <div className="space-y-1">
                    {chatHistories.map(chat => (
                        <div
                            key={chat.id}
                            className={cn(
                                "flex items-center justify-between p-2 rounded-md cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-800 group",
                                activeChatId === chat.id && "bg-gray-100 dark:bg-gray-800",
                                !isExpanded && "justify-center"
                            )}
                            onClick={() => setActiveChatId(chat.id)}
                            title={!isExpanded ? chat.title : undefined}
                        >
                            {isExpanded ? (
                                <>
                                    <div className="flex items-center gap-2 truncate">
                                        <MessageSquare size={16} className="shrink-0" />
                                        <span className="truncate text-sm">{chat.title}</span>
                                    </div>
                                    <Button
                                        variant="ghost"
                                        size="icon"
                                        className="opacity-0 group-hover:opacity-100 h-6 w-6"
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            deleteChat(chat.id);
                                        }}
                                    >
                                        <Trash2 size={14} />
                                    </Button>
                                </>
                            ) : (
                                <MessageSquare
                                    size={20}
                                    className={cn(
                                        "shrink-0",
                                        activeChatId === chat.id ? "text-primary" : "text-muted-foreground"
                                    )}
                                />
                            )}
                        </div>
                    ))}
                </div>
            </div>

            {user && (
                <div className={cn(
                    "p-3 border-t border-gray-200 dark:border-gray-800",
                    !isExpanded && "flex justify-center"
                )}>
                    {isExpanded ? (
                        <div className="flex items-center gap-2">
                            <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-primary-foreground">
                                {user.email?.[0] || '?'}
                            </div>
                            <div className="truncate">
                                <p className="text-sm font-medium truncate">{user.email}</p>
                                <p className="text-xs text-muted-foreground truncate">{user.email}</p>
                            </div>
                        </div>
                    ) : (
                        <div
                            className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-primary-foreground cursor-pointer"
                            title={user.email}
                        >
                            {user.email?.[0] || '?'}
                        </div>
                    )}
                </div>
            )}
        </motion.div>
    );
};

export default Sidebar;
