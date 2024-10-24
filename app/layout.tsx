import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import {
  ClerkProvider,
  SignInButton,
  SignedIn,
  SignedOut,
  UserButton,
} from "@clerk/nextjs";
import { Inter as FontSans } from "next/font/google";
import { Poppins } from "next/font/google";
import Head from "next/head";
import "aos/dist/aos.css";
import Script from "next/script";
import AOSInitializer from "@/components/website/AOS/AOSInitializer";
import { cn } from "@/lib/utils";
import React from "react";
import ClientProviders from "@/components/client-providers";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Toaster } from "@/components/ui/sonner";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});
const poppins = Poppins({
  weight: ["100", "200", "300", "400", "500", "600", "700"],
  style: ["normal", "italic"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-poppins",
});
export const metadata: Metadata = {
  title: "Offerado",
  description: "Offer Management Platform",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <Head>
          <link rel="icon" href="/favicon.ico" sizes="any" />
        </Head>
        <body
          className={cn(
            "min-h-screen font-poppins antialiased",
            // fontSans.variable,
            GeistSans.variable,
            GeistMono.variable,
            poppins.variable
          )}
        >
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <ClientProviders>
              {children}
              <ReactQueryDevtools initialIsOpen={false} />
              <Toaster position="top-center" richColors />
            </ClientProviders>
          </ThemeProvider>
          <AOSInitializer />
        </body>
      </html>
    </ClerkProvider>
  );
}
