'use client'

import { useAppKit, useAppKitAccount } from '@reown/appkit/react'
import { motion, AnimatePresence } from 'framer-motion'
import { Wallet, ChevronDown } from 'lucide-react'

export default function ConnectButton() {
    const { open } = useAppKit()
    const { address, isConnected } = useAppKitAccount()

    const truncatedAddress = address
        ? `${address.slice(0, 6)}...${address.slice(-4)}`
        : ''

    return (
        <div id="connect-button-container" className="relative">
            {!isConnected ? (
                <motion.button
                    id="connect-wallet-button"
                    whileHover={{ scale: 1.02, y: -2 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => open()}
                    className="relative px-8 py-3 bg-brand text-black font-bold rounded-2xl overflow-hidden group shadow-[0_0_20px_rgba(0,255,163,0.2)] hover:shadow-[0_0_30px_rgba(0,255,163,0.4)] transition-all duration-300"
                >
                    <div className="absolute inset-0 bg-white/30 -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-in-out skew-x-12" />
                    <span className="relative flex items-center gap-2 text-sm tracking-tight">
                        <Wallet size={18} className="transition-transform group-hover:scale-110 group-hover:rotate-6" />
                        Connect Wallet
                    </span>
                </motion.button>
            ) : (
                <motion.button
                    id="account-button"
                    whileHover={{ scale: 1.02, y: -1 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => open({ view: 'Account' })}
                    className="flex items-center gap-3 px-5 py-2.5 glass-dark rounded-2xl border border-white/5 hover:border-brand/40 transition-all group shadow-2xl relative overflow-hidden"
                >
                    <div className="absolute inset-0 bg-brand/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                    <div className="relative">
                        <div className="w-9 h-9 rounded-xl bg-linear-to-br from-brand via-emerald-400 to-blue-500 flex items-center justify-center text-black font-bold text-[10px] shadow-lg transition-transform group-hover:rotate-3">
                            {address?.slice(2, 4).toUpperCase()}
                        </div>
                        <div className="absolute -bottom-1 -right-1 w-3.5 h-3.5 bg-brand rounded-full border-2 border-black shadow-brand/50 shadow-sm" />
                    </div>

                    <div className="flex flex-col items-start gap-0 relative z-10 text-left">
                        <span className="text-[9px] uppercase tracking-[0.2em] text-zinc-500 font-black leading-none mb-0.5">Verified Account</span>
                        <span className="text-sm font-bold text-zinc-100 group-hover:text-white transition-colors">
                            {truncatedAddress}
                        </span>
                    </div>

                    <ChevronDown size={14} className="text-zinc-500 group-hover:text-brand transition-all duration-300 group-hover:translate-y-0.5" />
                </motion.button>
            )}
        </div>
    )
}
