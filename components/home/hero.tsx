"use client";

import { hasEnvVars } from "@/utils/supabase/check-env-vars";
import Link from "next/link";

const Hero = () => {
    return (
        <section className="relative pt-20 pb-32 overflow-hidden">
            <div className="absolute inset-0 bg-gradient-dots bg-[size:20px_20px] opacity-5"></div>
            <div className="absolute top-0 left-0 right-0 h-40 bg-gradient-to-b from-indigo-600/10 to-transparent"></div>

            <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="text-center max-w-4xl mx-auto">
                    <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight">
                        <span className="block bg-gradient-to-r from-sky-400 to-blue-600 bg-clip-text text-transparent pb-2">
                            Chat with Your PDF Documents
                        </span>
                        <span className="block text-white text-3xl sm:text-4xl md:text-5xl mt-2">
                            Powered by Gemini AI
                        </span>
                    </h1>

                    <p className="mt-6 text-xl text-navy-100 max-w-3xl mx-auto">
                        Upload your PDFs and get instant, intelligent responses. Extract insights, summarize content, and interact with your documents in a whole new way.
                    </p>

                    <div className=" mt-10 flex items-center flex-col sm:flex-row gap-4 justify-center">
                        {hasEnvVars ? (
                            <Link
                                href="/chat"
                                className="w-60 px-8 py-3 ring-2 text-white rounded-full font-medium transition-all text-sm tracking uppercase"
                            >
                                Start Chatting Now
                            </Link>
                        ) : (
                            <Link
                                href="/login"
                                className="px-8 py-3 ring-2 text-white rounded-full font-medium transition-all text-sm tracking-wide uppercase"
                            >
                                Get Started
                            </Link>
                        )}
                    </div>
                </div>

                {/* Hero Image */}
                <div className="mt-16 relative">
                    <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-full h-full max-w-4xl bg-gradient-radial from-indigo-500/20 to-transparent rounded-full blur-3xl"></div>
                    </div>
                    <div className="relative bg-navy-800/40 backdrop-blur-sm border border-navy-700/50 rounded-2xl overflow-hidden shadow-2xl mx-auto max-w-4xl">
                        <div className="p-2 bg-navy-950/50 border-b border-navy-800/50">
                            <div className="flex items-center gap-2">
                                <div className="w-3 h-3 rounded-full bg-red-500"></div>
                                <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                                <div className="w-3 h-3 rounded-full bg-green-500"></div>
                                <div className="ml-4 text-navy-300 text-sm">BFWai Chatbot</div>
                            </div>
                        </div>
                        <div className="p-6 md:p-8 flex flex-col md:flex-row gap-6 items-center">
                            <div className="w-full md:w-1/2 flex-shrink-0 bg-navy-900/50 rounded-xl p-4 border border-navy-800/50">
                                <div className="flex items-center gap-3 mb-4">
                                    <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-indigo-500 to-cyan-500 flex items-center justify-center">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                                        </svg>
                                    </div>
                                    <div>
                                        <h3 className="text-white font-medium">Upload Your PDF</h3>
                                        <p className="text-navy-300 text-sm">Drag & drop or browse files</p>
                                    </div>
                                </div>
                                <div className="border-2 border-dashed border-navy-700 rounded-lg p-8 flex flex-col items-center justify-center">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-navy-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 13h6m-3-3v6m5 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                    </svg>
                                    <p className="mt-4 text-navy-300 text-sm text-center">
                                        Upload your PDF document here
                                    </p>
                                    <button className="mt-4 px-4 py-2 bg-navy-800 hover:bg-navy-700 text-white rounded-lg text-sm transition-colors">
                                        Browse Files
                                    </button>
                                </div>
                            </div>

                            <div className="w-full md:w-1/2 flex-shrink-0 bg-navy-900/50 rounded-xl p-4 border border-navy-800/50 h-full">
                                <div className="flex items-center gap-3 mb-4">
                                    <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-indigo-500 to-cyan-500 flex items-center justify-center">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                                        </svg>
                                    </div>
                                    <div>
                                        <h3 className="text-white font-medium">Chat with Your Document</h3>
                                        <p className="text-navy-300 text-sm">Ask questions and get answers</p>
                                    </div>
                                </div>

                                <div className="space-y-4 h-[300px] overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-navy-700 scrollbar-track-navy-900">
                                    <div className="flex items-start gap-3">
                                        <div className="w-8 h-8 rounded-full bg-indigo-600 flex items-center justify-center flex-shrink-0 mt-1">
                                            <span className="text-white text-xs font-medium">You</span>
                                        </div>
                                        <div className="bg-navy-800/70 rounded-lg p-3 text-white text-sm">
                                            What are the key findings in the research paper?
                                        </div>
                                    </div>

                                    <div className="flex items-start gap-3">
                                        <div className="w-8 h-8 rounded-full bg-gradient-to-r from-indigo-500 to-cyan-500 flex items-center justify-center flex-shrink-0 mt-1">
                                            <span className="text-white text-xs font-medium">AI</span>
                                        </div>
                                        <div className="bg-navy-800/70 rounded-lg p-3 text-white text-sm">
                                            Based on the uploaded document, the key findings are:
                                            <ol className="list-decimal pl-5 mt-2 space-y-1">
                                                <li>The experiment showed a 45% improvement in efficiency</li>
                                                <li>Results were consistent across all test groups</li>
                                                <li>The new methodology outperformed traditional approaches</li>
                                            </ol>
                                            Would you like me to elaborate on any specific finding?
                                        </div>
                                    </div>

                                    <div className="flex items-start gap-3">
                                        <div className="w-8 h-8 rounded-full bg-indigo-600 flex items-center justify-center flex-shrink-0 mt-1">
                                            <span className="text-white text-xs font-medium">You</span>
                                        </div>
                                        <div className="bg-navy-800/70 rounded-lg p-3 text-white text-sm">
                                            Can you summarize the methodology section?
                                        </div>
                                    </div>
                                </div>

                                <div className="mt-4 relative">
                                    <input
                                        type="text"
                                        placeholder="Ask a question about your document..."
                                        className="w-full bg-navy-800/70 border border-navy-700 rounded-lg py-3 px-4 text-white placeholder-navy-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/50"
                                    />
                                    <button className="absolute right-2 top-1/2 -translate-y-1/2 p-2 bg-gradient-to-r from-indigo-600 to-cyan-600 rounded-lg">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" viewBox="0 0 20 20" fill="currentColor">
                                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-8.707l-3-3a1 1 0 00-1.414 0l-3 3a1 1 0 001.414 1.414L9 9.414V13a1 1 0 102 0V9.414l1.293 1.293a1 1 0 001.414-1.414z" clipRule="evenodd" />
                                        </svg>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
};

export default Hero;