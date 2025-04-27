import { Geist, Geist_Mono } from "next/font/google";
import HeaderComponent from "@/components/HeaderComponent";
import FooterComponent from "@/components/FooterComponent";
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
      <body className={`${geistSans.variable} ${geistMono.variable} h-screen flex flex-col`}>
        <HeaderComponent />
        <main className="flex-grow bg-[#000000]">{children}</main>
        <FooterComponent/>
      </body>

    </html>
  );
}
