import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Provider from "@/libs/next-auth";
import AuthProvider from "@/libs/auth-provider";
import Navbar from "@/(components)/navbar";
import Footer from "@/(components)/footer";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Provider>
          <AuthProvider>
            <div className="w-full min-h-screen h-full grid grid-rows-min-auto">
              <Navbar />
              {children}
              <Footer />
            </div>
          </AuthProvider>
        </Provider>
      </body>
    </html>
  );
}
