import Link from "next/link";
import HeaderAuth from "@/components/header-auth";
import { hasEnvVars } from "@/utils/supabase/check-env-vars";

export default function Navbar() {
    return (
        <nav className="fixed top-0 w-full z-50 bg-navy-900/80 backdrop-blur-md border-b border-navy-800/50 dark:border-navy-700/30">
            <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    <div className="flex items-center">
                        <Link href="/" className="flex items-center gap-2">
                            <div className="w-8 h-8 rounded-md flex items-center justify-center">
                                <img src="https://www.buildfastwithai.com/_next/static/media/light.5e8e48b7.svg" alt="logo" />
                            </div>
                            <span className="text-xl font-bold bg-gradient-to-r from-white to-indigo-200 bg-clip-text text-transparent">
                                BFWAI Chatbot
                            </span>
                        </Link>
                    </div>

                    <div className="hidden md:flex items-center space-x-4">
                        <Link href="/features" className="text-navy-100 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-colors">
                            Features
                        </Link>
                        <Link href="/pricing" className="text-navy-100 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-colors">
                            Pricing
                        </Link>
                        <Link href="/about" className="text-navy-100 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-colors">
                            About
                        </Link>
                    </div>

                    <div className="flex items-center gap-4">
                        {hasEnvVars ? (
                            <HeaderAuth />
                        ) : (
                            <div className="flex items-center gap-3">
                                <Link
                                    href="/login"
                                    className="text-white/90 hover:text-white px-5 py-2.5 rounded-lg text-sm font-medium transition-all bg-navy-800/40 hover:bg-navy-700/60 backdrop-blur-sm border border-navy-700/20 hover:border-navy-600/40"
                                >
                                    Log in
                                </Link>
                                <Link
                                    href="/signup"
                                    className="text-white px-5 py-2.5 rounded-lg text-sm font-medium transition-all bg-navy-700 hover:bg-navy-600 shadow-sm hover:shadow-md hover:shadow-indigo-500/10 border border-indigo-500/20"
                                >
                                    Sign up
                                </Link>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    );
}