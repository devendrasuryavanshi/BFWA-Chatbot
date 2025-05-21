"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const Footer = () => {

    if(usePathname() === '/chat') return null;

    return (
        <footer className="mt-20 py-8 border-t border-navy-800/50 dark:border-navy-700/30">
            <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    <div className="col-span-1 md:col-span-2">
                        <Link href="/" className="flex items-center gap-2">
                            <div className="w-8 h-8 rounded-md bg-gradient-to-br from-indigo-500 to-cyan-500 flex items-center justify-center">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" viewBox="0 0 20 20" fill="currentColor">
                                    <path d="M2 5a2 2 0 012-2h7a2 2 0 012 2v4a2 2 0 01-2 2H9l-3 3v-3H4a2 2 0 01-2-2V5z" />
                                    <path d="M15 7v2a4 4 0 01-4 4H9.828l-1.766 1.767c.28.149.599.233.938.233h2l3 3v-3h2a2 2 0 002-2V9a2 2 0 00-2-2h-1z" />
                                </svg>
                            </div>
                            <span className="text-xl font-bold bg-gradient-to-r from-white to-indigo-200 bg-clip-text text-transparent">
                                BFWai Chatbot
                            </span>
                        </Link>
                        <p className="mt-4 text-navy-200 text-sm">
                            Upload your PDF documents and chat with them using the power of Gemini AI. Get instant answers from your documents.
                        </p>
                    </div>

                    <div>
                        <h3 className="text-sm font-semibold text-navy-100 tracking-wider uppercase">Product</h3>
                        <ul className="mt-4 space-y-2">
                            <li><Link href="/features" className="text-navy-300 hover:text-white text-sm">Features</Link></li>
                            <li><Link href="/pricing" className="text-navy-300 hover:text-white text-sm">Pricing</Link></li>
                            <li><Link href="/faq" className="text-navy-300 hover:text-white text-sm">FAQ</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="text-sm font-semibold text-navy-100 tracking-wider uppercase">Company</h3>
                        <ul className="mt-4 space-y-2">
                            <li><Link href="/about" className="text-navy-300 hover:text-white text-sm">About</Link></li>
                            <li><Link href="/contact" className="text-navy-300 hover:text-white text-sm">Contact</Link></li>
                            <li><Link href="/privacy" className="text-navy-300 hover:text-white text-sm">Privacy</Link></li>
                        </ul>
                    </div>
                </div>

                <div className="mt-8 pt-8 border-t border-navy-800/50 dark:border-navy-700/30 flex flex-col md:flex-row justify-between items-center">
                    <p className="text-navy-300 text-sm">
                        © {new Date().getFullYear()} BFWai Chatbot. All rights reserved.
                    </p>
                    <div className="mt-4 md:mt-0 flex space-x-6">
                        <a href="#" className="text-navy-300 hover:text-white">
                            <span className="sr-only">Twitter</span>
                            <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                                <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                            </svg>
                        </a>
                        <a href="#" className="text-navy-300 hover:text-white">
                            <span className="sr-only">GitHub</span>
                            <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                                <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                            </svg>
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    )
};

export default Footer;