"use client";

const Features = () => {
    return (
        <section className="py-20 relative bg-[">
            <div className="absolute inset-0 bg-gradient-dots bg-[size:20px_20px] opacity-5"></div>
            <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-sky-400 to-blue-600 bg-clip-text text-transparent inline-block">
                        Powerful Features
                    </h2>
                    <p className="mt-4 text-lg text-navy-200 max-w-2xl mx-auto">
                        Everything you need to interact with your PDF documents intelligently
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div className="bg-navy-800/30 backdrop-blur-sm border border-navy-700/50 rounded-xl p-6 transition-all hover:transform hover:-translate-y-1 hover:shadow-lg hover:shadow-indigo-500/10">
                        <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-cyan-500 rounded-lg flex items-center justify-center mb-5">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                            </svg>
                        </div>
                        <h3 className="text-xl font-semibold text-white mb-3">PDF Upload & Processing</h3>
                        <p className="text-navy-200">
                            Upload any PDF document and our advanced processing will extract and analyze the content for intelligent interactions.
                        </p>
                    </div>

                    <div className="bg-navy-800/30 backdrop-blur-sm border border-navy-700/50 rounded-xl p-6 transition-all hover:transform hover:-translate-y-1 hover:shadow-lg hover:shadow-indigo-500/10">
                        <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-cyan-500 rounded-lg flex items-center justify-center mb-5">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                            </svg>
                        </div>
                        <h3 className="text-xl font-semibold text-white mb-3">AI-Powered Chat</h3>
                        <p className="text-navy-200">
                            Ask questions in natural language and get accurate, contextual responses based on your document's content.
                        </p>
                    </div>

                    <div className="bg-navy-800/30 backdrop-blur-sm border border-navy-700/50 rounded-xl p-6 transition-all hover:transform hover:-translate-y-1 hover:shadow-lg hover:shadow-indigo-500/10">
                        <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-cyan-500 rounded-lg flex items-center justify-center mb-5">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                        </div>
                        <h3 className="text-xl font-semibold text-white mb-3">Chat History</h3>
                        <p className="text-navy-200">
                            All your conversations are securely saved, allowing you to revisit previous chats and continue where you left off.
                        </p>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
                    <div className="bg-navy-800/30 backdrop-blur-sm border border-navy-700/50 rounded-xl p-6 transition-all hover:transform hover:-translate-y-1 hover:shadow-lg hover:shadow-indigo-500/10">
                        <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-cyan-500 rounded-lg flex items-center justify-center mb-5">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                            </svg>
                        </div>
                        <h3 className="text-xl font-semibold text-white mb-3">Secure Authentication</h3>
                        <p className="text-navy-200">
                            Your documents and conversations are protected with enterprise-grade security. Only you can access your data.
                        </p>
                    </div>

                    <div className="bg-navy-800/30 backdrop-blur-sm border border-navy-700/50 rounded-xl p-6 transition-all hover:transform hover:-translate-y-1 hover:shadow-lg hover:shadow-indigo-500/10">
                        <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-cyan-500 rounded-lg flex items-center justify-center mb-5">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                            </svg>
                        </div>
                        <h3 className="text-xl font-semibold text-white mb-3">Powered by Gemini AI</h3>
                        <p className="text-navy-200">
                            Leveraging Google's advanced Gemini AI technology to provide the most accurate and contextually relevant responses.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    )
};

export default Features;