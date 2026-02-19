'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion } from 'framer-motion'
import { clsx } from 'clsx'
import { Wallet } from 'lucide-react'
import { useState, useEffect } from 'react'

export default function Navbar() {
    const pathname = usePathname()
    const [scrolled, setScrolled] = useState(false)

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20)
        }
        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    const navLinks = [
        { name: 'Home', href: '/' },
        { name: 'Dashboard', href: '/dashboard' },
        { name: 'Withdraw', href: '/withdraw' }
    ]

    return (
        <nav className="fixed top-0 left-0 right-0 z-50 flex justify-center p-6">
            <motion.div
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                className={clsx(
                    'w-full max-w-7xl px-8 py-4 rounded-3xl flex items-center justify-between border border-white/5 transition-all duration-300',
                    scrolled ? 'glass-dark shadow-2xl scale-[0.98]' : 'bg-black/80 backdrop-blur-md'
                )}
            >
                <div className="flex items-center gap-8">
                    <Link href="/" className="flex items-center gap-2">
                        <div className="w-8 h-8 bg-brand rounded-lg flex items-center justify-center">
                            <span className="text-black font-bold text-xs">ZK</span>
                        </div>
                        <span className="font-display font-semibold tracking-tight text-lg">
                            vvm
                        </span>
                    </Link>

                    <div className="hidden md:flex items-center gap-8">
                        {navLinks.map((link) => (
                            <Link
                                key={link.href}
                                href={link.href}
                                className={clsx(
                                    'text-sm font-medium transition-colors hover:text-white',
                                    pathname === link.href ? 'text-white' : 'text-zinc-500'
                                )}
                            >
                                {link.name}
                            </Link>
                        ))}
                    </div>
                </div>

                <div className="flex items-center gap-4">
                    <appkit-button />
                </div>
            </motion.div>
        </nav>
    )
}
