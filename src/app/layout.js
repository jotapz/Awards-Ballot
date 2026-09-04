import { Geist, Geist_Mono, Josefin_Sans, Poiret_One } from "next/font/google";
import Header from "@/components/Header";
import "./globals.css";
import { VotacaoProvider } from "@/context/VotacaoContext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const poiret = Poiret_One({
  variable: "--font-poiret",
  weight: "400",
  subsets: ["latin"],
});

const josefin = Josefin_Sans({
  variable: "--font-josefin",
  subsets: ["latin"],
});

export const metadata = {
  title: "Awards Ballot",
  description: "Vote nos seus favoritos do Oscar, Grammy e Golden Globes e baixe seu bolão preenchido.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="pt-BR">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${poiret.variable} ${josefin.variable} flex min-h-screen flex-col bg-[#0B0B0C] text-white`}
      >
        <VotacaoProvider>
          <Header />
          <main className="flex-grow bg-[#0B0B0C]">{children}</main>
        </VotacaoProvider>
      </body>
    </html>
  );
}
