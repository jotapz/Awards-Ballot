import { Geist, Geist_Mono } from "next/font/google";
import HeaderComponent from "@/components/HeaderComponent";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: 'Awards Ballot',
  description: 'Escolha seus favoritos',
};

export default function RootLayout({ children }) {
  return (
    <html lang="pt">
      <body className="min-h-screen">
        <HeaderComponent />
        <main className="p-6">{children}</main>
      </body>
    </html>
  );
}
