'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowLeft, Zap, ShieldCheck, Key, AlertCircle } from 'lucide-react'
import Card from '@/components/ui/Card'
import Button from '@/components/ui/Button'
import Input from '@/components/ui/Input'
import { useAccount } from 'wagmi'
import Link from 'next/link'
import ConnectButton from '@/components/ConnectButton'

export default function Withdraw() {
    const { isConnected } = useAccount()
    const [note, setNote] = useState('')
    const [destAddress, setDestAddress] = useState('')
    const [isVerifying, setIsVerifying] = useState(false)
    const [step, setStep] = useState<'input' | 'verifying' | 'success'>('input')

    const handleWithdraw = async (e: React.FormEvent) => {
        e.preventDefault()
        setStep('verifying')
        setIsVerifying(true)

        // Simulate ZK-proof generation & Nullifier verification
        await new Promise(resolve => setTimeout(resolve, 3500))

        setIsVerifying(false)
        setStep('success')
    }

    if (!isConnected) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
                <ShieldCheck size={64} className="text-zinc-700" />
                <h2 className="text-2xl font-display font-semibold">Connect your wallet</h2>
                <ConnectButton />
            </div>
        )
    }

    return (
        <div className="max-w-2xl mx-auto px-6 pt-32 pb-24">
            <AnimatePresence mode="wait">
                {step === 'input' && (
                    <motion.div
                        key="input"
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                    >
                        <Card className="p-10 border-brand/5 shadow-2xl">
                            <div className="mb-8">
                                <h1 className="text-3xl font-display font-bold mb-2">zkVVM Executor</h1>
                                <p className="text-zinc-500">Redeem your shielded commitment via ZK-Proof verification.</p>
                            </div>

                            <form onSubmit={handleWithdraw} className="space-y-6">
                                <Input
                                    label="zkVVM Note"
                                    placeholder="zkvvm-note-..."
                                    value={note}
                                    onChange={(e) => setNote(e.target.value)}
                                    required
                                />

                                <Input
                                    label="Destination Address"
                                    placeholder="0x..."
                                    value={destAddress}
                                    onChange={(e) => setDestAddress(e.target.value)}
                                    required
                                />

                                <div className="p-4 bg-brand/5 border border-brand/10 rounded-2xl space-y-3">
                                    <div className="flex items-center gap-2 text-brand text-[10px] font-black uppercase tracking-[0.2em]">
                                        <Key size={12} />
                                        ZK PROOF LOGIC
                                    </div>
                                    <ul className="text-xs text-zinc-500 space-y-1 font-medium list-none">
                                        <li className="flex items-center gap-2">
                                            <div className="w-1 h-1 bg-brand rounded-full" />
                                            Verifying Merkle membership proof
                                        </li>
                                        <li className="flex items-center gap-2">
                                            <div className="w-1 h-1 bg-brand rounded-full" />
                                            Checking Nullifier non-existence
                                        </li>
                                        <li className="flex items-center gap-2">
                                            <div className="w-1 h-1 bg-brand rounded-full" />
                                            Obscuring transaction linkability
                                        </li>
                                    </ul>
                                </div>

                                <Button type="submit" className="w-full gap-2 shadow-[0_5px_20px_rgba(0,255,163,0.1)]" size="lg">
                                    Generate Proof & Withdraw
                                    <Zap size={18} />
                                </Button>
                            </form>
                        </Card>
                    </motion.div>
                )}

                {step === 'verifying' && (
                    <motion.div
                        key="verifying"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="flex flex-col items-center justify-center py-20 gap-8"
                    >
                        <div className="relative">
                            <div className="w-24 h-24 rounded-full border-4 border-zinc-800 border-t-brand animate-spin" />
                            <div className="absolute inset-0 flex items-center justify-center">
                                <ShieldCheck size={32} className="text-brand animate-pulse" />
                            </div>
                        </div>
                        <div className="text-center space-y-3">
                            <h2 className="text-2xl font-display font-semibold text-gradient">Computing ZK-SNARK</h2>
                            <p className="text-zinc-500 font-mono text-[10px] uppercase tracking-widest">Constructing Proof of Secret Knowledge...</p>
                            <div className="flex gap-1 justify-center">
                                {[...Array(3)].map((_, i) => (
                                    <motion.div
                                        key={i}
                                        animate={{ opacity: [0, 1, 0] }}
                                        transition={{ duration: 1, repeat: Infinity, delay: i * 0.2 }}
                                        className="w-1.5 h-1.5 bg-brand rounded-full"
                                    />
                                ))}
                            </div>
                        </div>
                    </motion.div>
                )}

                {step === 'success' && (
                    <motion.div
                        key="success"
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="text-center space-y-8 py-10"
                    >
                        <div className="flex justify-center relative">
                            <div className="absolute inset-0 bg-brand/20 blur-3xl rounded-full" />
                            <div className="w-20 h-20 bg-brand/10 border border-brand/20 rounded-full flex items-center justify-center text-brand relative z-10">
                                <ShieldCheck size={40} />
                            </div>
                        </div>
                        <div className="space-y-2">
                            <h2 className="text-3xl font-display font-bold">Withdrawal Settled</h2>
                            <p className="text-zinc-400 font-medium">The zkVVM Executor has verified the Nullifier and released the ETH to {destAddress.slice(0, 6)}...{destAddress.slice(-4)}.</p>
                        </div>
                        <div className="flex flex-col items-center gap-4 pt-4">
                            <Button onClick={() => setStep('input')} variant="primary" className="px-12">
                                New Withdrawal
                            </Button>
                            <Link href="/dashboard" className="text-sm text-zinc-500 hover:text-white transition-colors underline underline-offset-4">
                                Back to Explorer
                            </Link>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    )
}
