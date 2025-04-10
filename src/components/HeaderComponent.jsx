'use client';

import Link from 'next/link';
import { useState } from 'react';

const HeaderComponent = () => {
    const [menuOpen, setMenuOpen] = useState(false);
    return (
        <header className="bg-[#C9A227] sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
                <Link href="/home" className="text-white font-bold text-xl">
                    LOGO
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
                        <Link href="/grammys" className="text-white hover:underline">Grammys</Link>
                        <Link href="/golden-globes" className="text-white hover:underline">Golden Globes</Link>
                        <Link href="/oscar" className="text-white hover:underline">Oscar</Link>
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
