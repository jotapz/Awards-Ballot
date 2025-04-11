'use client';

import Link from 'next/link';
import { useState } from 'react';
import Image from 'next/image';
import GrammyIcon from '../images/Grammys.png';
import GoldenGlobeIcon from '../images/goldenglobe.png';
import OscarIcon from '../images/Oscar.png';
import LogoIcon from '../images/logo3.png';

const HeaderComponent = () => {
    const [menuOpen, setMenuOpen] = useState(false);
    return (
        <header className="bg-[#C9A227] sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
                <Link href="/home">
                    <Image src={LogoIcon} width={300} height={10} />
                </Link>
                <div className="flex items-center space-x-4">
                    <button
                        className="text-white md:hidden"
                        onClick={() => setMenuOpen(!menuOpen)}
                        aria-label="Abrir menu"
                    >
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2"
                            viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round"
                                d="M4 6h16M4 12h16M4 18h16" />
                        </svg>
                    </button>
                    <nav className="hidden md:flex space-x-6">
                        <Link href="/golden-globes">
                            <Image src={GoldenGlobeIcon} alt="Golden Globes" width={50} height={50} />
                        </Link>
                        <Link href="/grammys">
                            <Image src={GrammyIcon} alt="Grammys" width={50} height={50} />
                        </Link>
                        <Link href="/oscar">
                            <Image src={OscarIcon} alt="Oscar" width={50} height={50} />
                        </Link>
                    </nav>
                </div>
            </div>
            {menuOpen && (
                <nav className="md:hidden px-4 pb-4 flex flex-col space-y-2 bg-[#C9A227]">
                    <Link href="/grammys" className="text-white hover:underline" onClick={() => setMenuOpen(false)}>Grammys</Link>
                    <Link href="/golden-globes" className="text-white hover:underline" onClick={() => setMenuOpen(false)}>Golden Globes</Link>
                    <Link href="/oscar" className="text-white hover:underline" onClick={() => setMenuOpen(false)}>Oscar</Link>
                </nav>
            )}
        </header>
    );
}

export default HeaderComponent;
