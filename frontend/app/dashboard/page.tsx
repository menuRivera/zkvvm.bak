'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Zap, Send, ShieldCheck, History, Key } from 'lucide-react'
import Card from '@/components/ui/Card'
import Button from '@/components/ui/Button'
import Input from '@/components/ui/Input'
import { parseUnits } from 'viem'
import { useAccount } from 'wagmi'
import ConnectButton from '@/components/ConnectButton'

export default function Dashboard() {
    const { isConnected } = useAccount()
    const [amount, setAmount] = useState('')
    const [isCreating, setIsCreating] = useState(false)
    const [note, setNote] = useState<string | null>(null)
    const [showNote, setShowNote] = useState(false)

    const generateNote = () => {
        const secret = Array.from(crypto.getRandomValues(new Uint8Array(16)))
            .map(b => b.toString(16).padStart(2, '0')).join('')
        const nullifier = Array.from(crypto.getRandomValues(new Uint8Array(16)))
            .map(b => b.toString(16).padStart(2, '0')).join('')
        return `zkvvm-note-${secret}-${nullifier}`
    }

    const handleWithdraw = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsCreating(true)
        // Simulate commitment and state update
        await new Promise(resolve => setTimeout(resolve, 2500))
        const newNote = generateNote()
        setNote(newNote)
        setShowNote(true)
        setIsCreating(false)
    }

    if (!isConnected) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
                <ShieldCheck size={64} className="text-zinc-700" />
                <h2 className="text-2xl font-display font-semibold">Connect your wallet</h2>
                <p className="text-zinc-500 max-w-sm text-center">
                    Please connect your wallet to access the secure payment dashboard
                    and start generating ZK-compliant transactions.
                </p>
                <ConnectButton />
            </div>
        )
    }

    return (
        <div className="max-w-6xl mx-auto px-6 py-24 pt-32">
            <div className="flex flex-col md:flex-row gap-8">
                {/* Main Content */}
                <div className="flex-1 space-y-8">
                    <header>
                        <h1 className="text-4xl font-display font-bold text-gradient">zkVVM Explorer</h1>
                        <p className="text-zinc-500 mt-2">Manage your virtual state and private commitments</p>
                    </header>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <Card className="flex flex-col gap-4 group hover:border-brand/20 transition-colors">
                            <div className="flex items-center justify-between">
                                <span className="text-sm font-medium text-zinc-400 font-mono tracking-tighter">VIRTUAL_BALANCE</span>
                                <div className="p-2 bg-brand/10 rounded-lg">
                                    <ShieldCheck size={18} className="text-brand" />
                                </div>
                            </div>
                            <p className="text-3xl font-display font-bold">0.00 <span className="text-zinc-500 text-lg font-mono">ETH</span></p>
                            <p className="text-xs text-brand font-bold uppercase tracking-widest bg-brand/5 px-2 py-1 rounded-sm w-fit">Synced</p>
                        </Card>

                        <Card className="flex flex-col gap-4">
                            <div className="flex items-center justify-between">
                                <span className="text-sm font-medium text-zinc-400 font-mono tracking-tighter">MERKLE_ROOT</span>
                                <div className="p-2 bg-zinc-800 rounded-lg">
                                    <History size={18} className="text-zinc-400" />
                                </div>
                            </div>
                            <p className="text-xs font-mono text-zinc-500 truncate select-all cursor-pointer hover:text-white transition-colors">
                                0x77a2f910e82b7c4d5e6f1a2b3c4d5e6f...
                            </p>
                            <p className="text-[10px] text-zinc-600 font-bold uppercase tracking-[0.2em]">Global Chain State</p>
                        </Card>
                    </div>

                    <section className="space-y-4">
                        <div className="flex items-center justify-between">
                            <h3 className="text-xl font-display font-semibold">Your Commitments</h3>
                            <Button variant="outline" size="sm" className="gap-2 font-mono text-[10px] tracking-widest">
                                <Key size={14} />
                                EXPORT_VIEWING_KEY
                            </Button>
                        </div>
                        <Card className="p-0 overflow-hidden border-white/5 bg-zinc-900/30">
                            <div className="p-12 text-center text-zinc-500 flex flex-col items-center gap-4">
                                <div className="p-4 bg-zinc-800/50 rounded-full border border-zinc-700/50">
                                    <History size={32} strokeWidth={1.5} className="text-zinc-600" />
                                </div>
                                <div className="space-y-1">
                                    <p className="text-white font-semibold">No active commitments</p>
                                    <p className="text-xs">Deposit assets into the zkVVM Vault to start.</p>
                                </div>
                            </div>
                        </Card>
                    </section>
                </div>

                {/* Sidebar: ZK Flow Initiation */}
                <div className="w-full md:w-96">
                    <Card className="sticky top-32 border-brand/10 shadow-[0_0_40px_rgba(0,255,163,0.05)]">
                        {!showNote ? (
                            <>
                                <h3 className="text-xl font-display font-semibold mb-6 flex items-center gap-2">
                                    <Zap size={20} className="text-brand" />
                                    zkVVM Vault
                                </h3>
                                <form onSubmit={handleWithdraw} className="space-y-6">
                                    <Input
                                        label="Deposit Amount (ETH)"
                                        placeholder="0.00"
                                        value={amount}
                                        onChange={(e) => setAmount(e.target.value)}
                                        required
                                    />

                                    <div className="p-4 bg-brand/5 border border-brand/20 rounded-2xl space-y-3">
                                        <div className="flex items-center gap-2 text-brand text-[10px] font-black uppercase tracking-[0.2em]">
                                            <ShieldCheck size={12} />
                                            Protocol Security
                                        </div>
                                        <p className="text-xs text-zinc-400 leading-relaxed font-medium">
                                            Generating a new Merkle commitment. Funds will be locked by a hashed Secret + Nullifier.
                                        </p>
                                    </div>

                                    <Button
                                        type="submit"
                                        className="w-full gap-2 shadow-[0_5px_20px_rgba(0,255,163,0.15)]"
                                        disabled={isCreating}
                                    >
                                        {isCreating ? 'Minting Commitment...' : 'Mint Commitment'}
                                        <Zap size={16} />
                                    </Button>
                                </form>
                            </>
                        ) : (
                            <motion.div
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className="space-y-6 text-center"
                            >
                                <div className="w-16 h-16 bg-brand/20 rounded-full flex items-center justify-center mx-auto mb-2 text-brand shadow-[0_0_30px_rgba(0,255,163,0.2)]">
                                    <ShieldCheck size={32} />
                                </div>
                                <div>
                                    <h3 className="text-xl font-display font-bold text-white mb-2">Commitment Minted</h3>
                                    <p className="text-xs text-zinc-500 font-medium">Your zkVVM Note is ready. Store it securely; it is the only way to withdraw your funds.</p>
                                </div>

                                <div className="p-4 bg-zinc-900 border border-white/10 rounded-2xl space-y-2 relative group overflow-hidden">
                                    <div className="absolute inset-0 bg-brand/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                                    <p className="text-[10px] text-zinc-600 font-black uppercase tracking-widest text-left">Your zkVVM Note</p>
                                    <div className="font-mono text-sm text-brand break-all select-all pt-1 relative z-10">
                                        {note}
                                    </div>
                                </div>

                                <Button
                                    onClick={() => {
                                        navigator.clipboard.writeText(note || '')
                                        // Simple feedback could be added here
                                    }}
                                    className="w-full gap-2"
                                >
                                    Copy Securely
                                </Button>

                                <button
                                    onClick={() => setShowNote(false)}
                                    className="text-xs text-zinc-500 hover:text-white transition-colors underline underline-offset-4"
                                >
                                    Make Another Deposit
                                </button>
                            </motion.div>
                        )}
                    </Card>
                </div>
            </div>
        </div>
    )

}

function Lock({ size, className }: { size?: number, className?: string }) {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={size || 24}
            height={size || 24}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className={className}
        >
            <rect width="18" height="11" x="3" y="11" rx="2" ry="2" />
            <path d="M7 11V7a5 5 0 0 1 10 0v4" />
        </svg>
    )
}
