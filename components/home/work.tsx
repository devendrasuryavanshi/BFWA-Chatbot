"use client"

const Work = () => {
    return (
        <section className="py-20 relative">
            <div className="absolute inset-0 bg-gradient-to-b from-navy-900 to-navy-950"></div>
            <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-sky-400 to-blue-600 bg-clip-text text-transparent inline-block">
                        How It Works
                    </h2>
                    <p className="mt-4 text-lg text-navy-200 max-w-2xl mx-auto">
                        Get started in just three simple steps
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
                    <div className="relative flex flex-col items-center text-center">
                        <div className="w-16 h-16 bg-gradient-to-br from-indigo-500 to-cyan-500 rounded-full flex items-center justify-center mb-6 relative z-10">
                            <span className="text-white text-xl font-bold">1</span>
                        </div>
                        <h3 className="text-xl font-semibold text-white mb-3">Upload Your PDF</h3>
                        <p className="text-navy-200">
                            Simply drag and drop or browse to upload your PDF document to our secure platform.
                        </p>
                    </div>

                    <div className="relative flex flex-col items-center text-center">
                        <div className="w-16 h-16 bg-gradient-to-br from-indigo-500 to-cyan-500 rounded-full flex items-center justify-center mb-6 relative z-10">
                            <span className="text-white text-xl font-bold">2</span>
                        </div>
                        <h3 className="text-xl font-semibold text-white mb-3">AI Processes Content</h3>
                        <p className="text-navy-200">
                            Our AI system analyzes and understands your document, extracting key information and context.
                        </p>
                    </div>

                    <div className="relative flex flex-col items-center text-center">
                        <div className="w-16 h-16 bg-gradient-to-br from-indigo-500 to-cyan-500 rounded-full flex items-center justify-center mb-6 relative z-10">
                            <span className="text-white text-xl font-bold">3</span>
                        </div>
                        <h3 className="text-xl font-semibold text-white mb-3">Start Chatting</h3>
                        <p className="text-navy-200">
                            Ask questions about your document and receive intelligent, contextual responses instantly.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    )
};

export default Work;
