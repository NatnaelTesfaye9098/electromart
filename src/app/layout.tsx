import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { CartProvider } from "@/context/cartContext";
import {Toaster} from "@/components/ui/sonner";
import AuthProvider from "@/components/authProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "ElectroMart - Your Tech Destination",
  description: "Find the latest and greatest electronics at ElectroMart.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <AuthProvider>
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        >
          <CartProvider>
            <div>
              {children}
              <Toaster position="top-right" theme="system" richColors/>
            </div>
          </CartProvider>
        </body>
      </AuthProvider>
    </html>
  );
}