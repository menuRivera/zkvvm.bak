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
    const [proofId, setProofId] = useState('')
    const [isVerifying, setIsVerifying] = useState(false)
    const [step, setStep] = useState<'input' | 'verifying' | 'success'>('input')

    const handleWithdraw = async (e: React.FormEvent) => {
        e.preventDefault()
        setStep('verifying')
        setIsVerifying(true)

        // Simulate ZK-proof verification on evvm.org
        await new Promise(resolve => setTimeout(resolve, 3000))

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
        <div className="max-w-2xl mx-auto px-6 py-24">
            <Link href="/dashboard" className="inline-flex items-center gap-2 text-zinc-500 hover:text-white transition-colors mb-8 group">
                <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
                Back to Virtual Dashboard
            </Link>

            <AnimatePresence mode="wait">
                {step === 'input' && (
                    <motion.div
                        key="input"
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                    >
                        <Card className="p-10">
                            <div className="mb-8">
                                <h1 className="text-3xl font-display font-bold mb-2">Fisher Relay</h1>
                                <p className="text-zinc-500">Submit your off-chain proof for EMVM executor verification.</p>
                            </div>

                            <form onSubmit={handleWithdraw} className="space-y-6">
                                <Input
                                    label="ZK-Proof Identifier"
                                    placeholder="zk_proof_hash_..."
                                    value={proofId}
                                    onChange={(e) => setProofId(e.target.value)}
                                    required
                                />

                                <div className="flex items-start gap-3 p-4 bg-zinc-900 rounded-xl border border-zinc-800">
                                    <AlertCircle size={18} className="text-zinc-500 mt-0.5" />
                                    <p className="text-xs text-zinc-500 leading-relaxed">
                                        Your transaction will be relayed gasless to the EVVM executor contract.
                                        Successful execution will update the virtual state securely.
                                    </p>
                                </div>

                                <Button type="submit" className="w-full gap-2" size="lg">
                                    Initiate Relay Execution
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
                                <Zap size={32} className="text-brand" />
                            </div>
                        </div>
                        <div className="text-center space-y-2">
                            <h2 className="text-2xl font-display font-semibold text-gradient">Executing Relay</h2>
                            <p className="text-zinc-500 font-mono text-xs">Fisher relaying proof to EVVM executor...</p>
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
                        <div className="flex justify-center">
                            <div className="w-20 h-20 bg-brand/10 rounded-full flex items-center justify-center text-brand">
                                <ShieldCheck size={40} />
                            </div>
                        </div>
                        <div className="space-y-2">
                            <h2 className="text-3xl font-display font-bold">Virtual State Updated</h2>
                            <p className="text-zinc-400">The EMVM executor has verified the proof and settled the transaction.</p>
                        </div>
                        <div className="flex justify-center pt-4">
                            <Button onClick={() => setStep('input')} variant="outline">
                                Initiate another relay
                            </Button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    )

}
