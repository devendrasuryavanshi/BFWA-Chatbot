import { Geist } from "next/font/google";
import { ThemeProvider } from "next-themes";
import "./globals.css";
import Link from "next/link";
import Footer from "@/components/footer";
import Navbar from "@/components/navbar";
import { Toaster } from "sonner";

const defaultUrl = process.env.VERCEL_URL
    ? `https://${process.env.VERCEL_URL}`
    : "http://localhost:3000";

export const metadata = {
    metadataBase: new URL(defaultUrl),
    title: "BFWai Chatbot - Chat with your PDFs",
    description: "Upload your PDF documents and chat with them using Gemini AI",
};

const geistSans = Geist({
    display: "swap",
    subsets: ["latin"],
});

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" className={geistSans.className} suppressHydrationWarning>
            <body className="bg-[#030711] text-white min-h-screen">
                <Toaster theme="dark" position="top-center" />
                <ThemeProvider
                    attribute="class"
                    defaultTheme="dark"
                    enableSystem
                    disableTransitionOnChange
                >
                    <Navbar />
                    <main className="pt-16">
                        {children}
                    </main>
                    <Footer />
                </ThemeProvider>
            </body>
        </html>
    );
}
