export type Message =
    | { success: string }
    | { error: string }
    | { message: string };

export function FormMessage({ message }: { message: Message }) {
    if (!message || Object.keys(message).length === 0) {
        return null;
    }

    return (
        <div className="w-full mt-4">
            {"success" in message && (
                <div className="bg-navy-800/60 border-l-4 border-cyan-500 rounded-lg p-4 text-sm text-cyan-100">
                    <div className="flex items-start">
                        <svg className="h-5 w-5 text-cyan-400 mr-3 mt-0.5 flex-shrink-0" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                        <p>{message.success}</p>
                    </div>
                </div>
            )}

            {"error" in message && (
                <div className="bg-navy-800/60 border-l-4 border-red-500 rounded-lg p-4 text-sm text-red-100">
                    <div className="flex items-start">
                        <svg className="h-5 w-5 text-red-400 mr-3 mt-0.5 flex-shrink-0" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                        </svg>
                        <p>{message.error}</p>
                    </div>
                </div>
            )}

            {"message" in message && (
                <div className="bg-navy-800/60 border-l-4 border-indigo-500 rounded-lg p-4 text-sm text-indigo-100">
                    <div className="flex items-start">
                        <svg className="h-5 w-5 text-indigo-400 mr-3 mt-0.5 flex-shrink-0" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zm-1 9a1 1 0 01-1-1v-4a1 1 0 112 0v4a1 1 0 01-1 1z" clipRule="evenodd" />
                        </svg>
                        <p>{message.message}</p>
                    </div>
                </div>
            )}
        </div>
    );
}
