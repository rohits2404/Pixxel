import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/providers/theme-provider";
import { Header } from "@/components/header";
import { FloatingShapes } from "@/components/floating-shapes";
import { Toaster } from "@/components/ui/sonner";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
    title: "Pixxel",
    description: "Professional Image Editing Powered By AI",
};

export default function RootLayout({ children }) {
    return (
        <html lang="en" suppressHydrationWarning>
            <head>
                <link rel="icon" href="/logo-text.png" sizes="any" />
            </head>
            <body className={`${inter.className}`}>
                <ThemeProvider
                    attribute="class"
                    defaultTheme="system"
                    enableSystem
                    disableTransitionOnChange
                >
                    <Header />
                    <main className="bg-slate-900 min-h-screen text-white overflow-x-hidden">
                        <FloatingShapes />
                        <Toaster richColors />
                        {children}
                    </main>
                </ThemeProvider>
            </body>
        </html>
    );
}
