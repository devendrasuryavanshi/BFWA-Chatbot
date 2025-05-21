import { signUpAction } from "@/app/actions";
import { FormMessage, Message } from "@/components/form-message";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";

export default async function Signup(props: {
    searchParams: Promise<Message>;
}) {
    const searchParams = await props.searchParams;
    if ("message" in searchParams) {
        return (
            <div className="w-full flex-1 flex items-center h-screen sm:max-w-md justify-center gap-2 p-4">
                <FormMessage message={searchParams} />
            </div>
        );
    }

    return (
        <div className="w-full min-h-screen flex flex-col items-center justify-center py-12 px-4 sm:px-6 lg:px-8 relative">
            {/* Background elements */}
            <div className="absolute inset-0 bg-gradient-dots bg-[size:20px_20px] opacity-5 z-0"></div>
            <div className="absolute top-0 left-0 right-0 h-40 bg-gradient-to-b from-indigo-600/10 to-transparent z-0"></div>
            <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-cyan-600/10 to-transparent z-0"></div>

            {/* Content */}
            <div className="w-full max-w-md space-y-8 relative z-10">
                <div className="text-center">
                    <h2 className="text-3xl font-bold bg-gradient-to-r from-sky-400 to-blue-600 bg-clip-text text-transparent">
                        Create your account
                    </h2>
                    <p className="mt-2 text-sm text-navy-200">
                        Already have an account?{" "}
                        <Link className="text-indigo-400 hover:text-indigo-300 font-medium transition-colors" href="/sign-in">
                            Sign in
                        </Link>
                    </p>
                </div>

                <div className="bg-navy-800/40 backdrop-blur-sm border border-navy-700/50 rounded-xl p-8 shadow-xl">
                    <form className="space-y-6">
                        <div className="space-y-2">
                            <Label htmlFor="email" className="text-navy-100 text-sm font-medium">
                                Email address
                            </Label>
                            <Input
                                name="email"
                                type="email"
                                placeholder="you@example.com"
                                required
                                className="w-full bg-navy-900/70 border border-navy-700 rounded-lg py-3 px-4 text-white placeholder-navy-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500/50"
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="password" className="text-navy-100 text-sm font-medium">
                                Password
                            </Label>
                            <Input
                                type="password"
                                name="password"
                                placeholder="Your password"
                                minLength={6}
                                required
                                className="w-full bg-navy-900/70 border border-navy-700 rounded-lg py-3 px-4 text-white placeholder-navy-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500/50"
                            />
                        </div>

                        <div>
                            <button
                                type="submit"
                                formAction={signUpAction}
                                className="w-full bg-gradient-to-r from-sky-400 to-blue-600 hover:from-sky-500 hover:to-blue-700 text-white py-3 px-4 rounded-lg font-medium transition-all shadow-md hover:shadow-blue-500/25 flex justify-center items-center"
                            >
                                <span>Sign up</span>
                            </button>
                        </div>

                        <FormMessage message={searchParams} />
                    </form>
                </div>

                <div className="text-center mt-6">
                    <p className="text-xs text-navy-300">
                        By signing up, you agree to our{" "}
                        <Link href="/terms" className="text-indigo-400 hover:text-indigo-300">
                            Terms of Service
                        </Link>{" "}
                        and{" "}
                        <Link href="/privacy" className="text-indigo-400 hover:text-indigo-300">
                            Privacy Policy
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
}
