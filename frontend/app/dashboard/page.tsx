'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Plus, Send, ShieldCheck, History } from 'lucide-react'
import Card from '@/components/ui/Card'
import Button from '@/components/ui/Button'
import Input from '@/components/ui/Input'
import { parseUnits } from 'viem'
import { useAccount } from 'wagmi'

export default function Dashboard() {
    const { isConnected, address } = useAccount()
    const [amount, setAmount] = useState('')
    const [recipient, setRecipient] = useState('')
    const [isCreating, setIsCreating] = useState(false)

    const handleCreatePayment = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsCreating(true)
        // Simulate ZK-proof generation and transaction
        await new Promise(resolve => setTimeout(resolve, 2000))
        console.log('Payment created:', { amount, recipient })
        setIsCreating(false)
        setAmount('')
        setRecipient('')
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
                <appkit-button />
            </div>
        )
    }

    return (
        <div className="max-w-6xl mx-auto px-6 py-24 pt-32">
            <div className="flex flex-col md:flex-row gap-8">
                {/* Main Content */}
                <div className="flex-1 space-y-8">
                    <header>
                        <h1 className="text-4xl font-display font-bold">Dashboard</h1>
                        <p className="text-zinc-500 mt-2">Manage your secure ZK-vvm payments</p>
                    </header>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <Card className="flex flex-col gap-4">
                            <div className="flex items-center justify-between">
                                <span className="text-sm font-medium text-zinc-400">Total Volume</span>
                                <div className="p-2 bg-brand/10 rounded-lg">
                                    <ShieldCheck size={18} className="text-brand" />
                                </div>
                            </div>
                            <p className="text-3xl font-display font-bold">$0.00</p>
                            <p className="text-xs text-brand font-medium">+0% from last month</p>
                        </Card>

                        <Card className="flex flex-col gap-4">
                            <div className="flex items-center justify-between">
                                <span className="text-sm font-medium text-zinc-400">Total Payments</span>
                                <div className="p-2 bg-zinc-800 rounded-lg">
                                    <History size={18} className="text-zinc-400" />
                                </div>
                            </div>
                            <p className="text-3xl font-display font-bold">0</p>
                            <p className="text-xs text-zinc-500">Last payment: N/A</p>
                        </Card>
                    </div>

                    <section className="space-y-4">
                        <h3 className="text-xl font-display font-semibold">Recent Transactions</h3>
                        <Card className="p-0 overflow-hidden">
                            <div className="p-8 text-center text-zinc-500 flex flex-col items-center gap-2">
                                <History size={32} strokeWidth={1.5} />
                                <p>No transactions found</p>
                            </div>
                        </Card>
                    </section>
                </div>

                {/* Sidebar: Creation Form */}
                <div className="w-full md:w-96">
                    <Card className="sticky top-32">
                        <h3 className="text-xl font-display font-semibold mb-6 flex items-center gap-2">
                            <Plus size={20} className="text-brand" />
                            Create Payment
                        </h3>
                        <form onSubmit={handleCreatePayment} className="space-y-6">
                            <Input
                                label="Amount (ETH)"
                                placeholder="0.00"
                                value={amount}
                                onChange={(e) => setAmount(e.target.value)}
                                required
                            />
                            <Input
                                label="Recipient Address"
                                placeholder="0x..."
                                value={recipient}
                                onChange={(e) => setRecipient(e.target.value)}
                                required
                            />
                            <div className="p-4 bg-brand/5 border border-brand/10 rounded-xl space-y-2">
                                <div className="flex items-center gap-2 text-brand text-xs font-bold uppercase tracking-wider">
                                    <Lock size={12} />
                                    ZK-Compliance Layer
                                </div>
                                <p className="text-xs text-zinc-400 leading-relaxed">
                                    Every transaction generates a unique zero-knowledge proof
                                    ensuring privacy and regulatory compliance.
                                </p>
                            </div>
                            <Button
                                type="submit"
                                className="w-full gap-2"
                                disabled={isCreating}
                            >
                                {isCreating ? 'Generating Proof...' : 'Send Securely'}
                                <Send size={16} />
                            </Button>
                        </form>
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
