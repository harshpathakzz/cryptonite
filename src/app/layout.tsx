import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ThemeProvider } from "@/components/ThemeProvider";
import "./globals.css";
import { ReactQueryProvider } from "@/components/ReactQueryProvider";
import { Toaster } from "sonner";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "cryptonite",
  description: "Track Your Cryptos",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ThemeProvider>
          <ReactQueryProvider>
            {children}
            <Toaster
              richColors={true}
              theme="dark"
              visibleToasts={1}
              position="top-right"
            />
          </ReactQueryProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
