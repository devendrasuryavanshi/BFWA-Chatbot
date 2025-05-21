import { signOutAction } from "@/app/actions";
import { hasEnvVars } from "@/utils/supabase/check-env-vars";
import Link from "next/link";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { createClient } from "@/utils/supabase/server";

export default async function AuthButton() {
    const supabase = await createClient();

    const {
        data: { user },
    } = await supabase.auth.getUser();

    if (!hasEnvVars) {
        return (
            <>
                <div className="flex gap-4 items-center">
                    <div>
                        <Badge
                            variant={"destructive"}
                            className="font-normal pointer-events-none bg-navy-800/80 hover:bg-navy-700/80 text-white border border-navy-600/30"
                        >
                            Please update .env.local file with anon key and url
                        </Badge>
                    </div>
                    <div className="flex gap-3">
                        <Link
                            href="/sign-in"
                            className="text-white/90 hover:text-white px-5 py-2.5 rounded-lg text-sm font-medium transition-all bg-navy-800/40 hover:bg-navy-700/60 backdrop-blur-sm border border-navy-700/20 hover:border-navy-600/40 opacity-75 cursor-not-allowed pointer-events-none"
                        >
                            Sign in
                        </Link>
                        <Link
                            href="/sign-up"
                            className="text-white px-5 py-2.5 rounded-lg text-sm font-medium transition-all bg-navy-700 hover:bg-navy-600 shadow-sm hover:shadow-md hover:shadow-indigo-500/10 border border-indigo-500/20 opacity-75 cursor-not-allowed pointer-events-none"
                        >
                            Sign up
                        </Link>
                    </div>
                </div>
            </>
        );
    }

    return user ? (
        <div className="flex items-center gap-4">
            <form action={signOutAction}>
                <button
                    type="submit"
                    className="text-white/90 hover:text-white px-5 py-2.5 rounded-lg text-sm font-medium transition-all bg-navy-800/40 hover:bg-navy-700/60 backdrop-blur-sm border border-navy-700/20 hover:border-navy-600/40"
                >
                    Sign out
                </button>
            </form>
        </div>
    ) : (
        <div className="flex gap-3">
            <Link
                href="/sign-in"
                className="text-white/90 hover:text-white px-5 py-2.5 rounded-lg text-sm font-medium transition-all bg-navy-800/40 hover:bg-navy-700/60 backdrop-blur-sm border border-navy-700/20 hover:border-navy-600/40"
            >
                Sign in
            </Link>
            <Link
                href="/sign-up"
                className="text-white px-5 py-2.5 rounded-lg text-sm font-medium transition-all bg-navy-700 hover:bg-navy-600 shadow-sm hover:shadow-md hover:shadow-indigo-500/10 border border-indigo-500/20"
            >
                Sign up
            </Link>
        </div>
    );
}
