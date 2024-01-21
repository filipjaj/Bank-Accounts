import { cn } from "@/lib/utils";
import type { Metadata } from "next";
import { Inter as FontSans } from "next/font/google";
import "./globals.css";

import { LandmarkIcon } from "lucide-react";
import dynamic from "next/dynamic";

const Provider = dynamic(() => import("./providers"), {
  ssr: false,
});

const Toaster = dynamic(() => import("../components/ui/sonner"), {
  ssr: false,
});

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: "Kontovelger.no",
  description: "Finn den beste bankkontoen",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased relative",
          fontSans.variable
        )}
      >
        <nav className="w-full ">
          <div className="flex items-center justify-between max-w-7xl px-4 py-4 mx-auto sm:px-6 lg:px-8">
            <div className="flex  flex-col  gap-2">
              <div className="flex items-center flex-shrink-0 gap-4 ">
                <LandmarkIcon className="w-10 h-10 text-primary " />
                <h1 className="scroll-m-20  text-3xl font-semibold tracking-tight first:mt-0">
                  Kontovelger.no
                </h1>
              </div>
              <h2 className="text-sm text-muted-foreground ml-14">
                Finn den beste bankkontoen
              </h2>
            </div>
          </div>
        </nav>

        <Provider>{children}</Provider>
        <Toaster />
      </body>
    </html>
  );
}
