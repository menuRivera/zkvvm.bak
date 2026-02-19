'use client'

import { motion } from 'framer-motion'
import { Shield, Zap, Lock, ArrowRight } from 'lucide-react'
import Button from '@/components/ui/Button'
import Link from 'next/link'

export default function Home() {
  return (
    <div className="relative isolate px-6 pt-14 lg:px-8 overflow-hidden">
      {/* Background Blobs */}
      <div className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80">
        <div className="relative left-[calc(50%-11rem)] aspect-1155/678 w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-linear-to-tr from-brand to-[#9089fc] opacity-20 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]" />
      </div>

      <div className="mx-auto max-w-4xl py-12 sm:py-24 lg:py-32">
        <div className="text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="mb-8 flex justify-center"
          >
            <div className="relative rounded-full px-3 py-1 text-sm leading-6 text-zinc-400 ring-1 ring-white/10 hover:ring-white/20 transition-all">
              Announcing our ZK-Compliant Payment Protocol.{" "}
              <a href="#" className="font-semibold text-brand">
                Read more <span aria-hidden="true">&rarr;</span>
              </a>
            </div>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="text-6xl font-display font-bold tracking-tight text-white sm:text-7xl lg:text-8xl"
          >
            <span className="text-gradient">Zero-Knowledge</span>
            <br />
            Virtual Machine
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="mt-8 text-lg leading-8 text-zinc-400 max-w-2xl mx-auto font-medium"
          >
            An infrastructure-less, privacy-focused virtual blockchain running
            entirely within a smart contract "executor." Decouple privacy from consensus.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="mt-12 flex items-center justify-center gap-x-6"
          >
            <Link href="/dashboard">
              <Button size="lg" className="gap-2">
                Launch Explorer <ArrowRight size={18} />
              </Button>
            </Link>
            <Link href="/docs" className="text-sm font-semibold leading-6 text-white hover:text-brand transition-colors">
              Read Mission <span aria-hidden="true">→</span>
            </Link>
          </motion.div>
        </div>
      </div>

      {/* Feature Grid */}
      <div className="mx-auto max-w-7xl px-6 lg:px-8 pb-32">
        <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 sm:gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-3">
          {[
            {
              name: 'The Shield (ZK Flow)',
              description: 'Generate ZK-SNARK proofs off-chain to obscure sender, receiver, and amount. No sensitive data leaves your client.',
              icon: Shield
            },
            {
              name: 'The Fisher Network',
              description: 'Infrastructure-less relay layer. Fishers relay proofs gasless-ly and get rewarded for securing the virtual state.',
              icon: Zap
            },
            {
              name: 'The Key (Compliance)',
              description: 'Selective disclosure via read-only Viewing Keys. Share granular access with auditors without exposing public history.',
              icon: Lock
            }
          ].map((feature, idx) => (
            <motion.div
              key={feature.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * idx, duration: 0.5 }}
              viewport={{ once: true }}
              className="glass p-8 rounded-3xl group hover:border-brand/20 transition-colors"
            >
              <div className="mb-6 flex h-10 w-10 items-center justify-center rounded-lg bg-brand shadow-[0_0_15px_rgba(0,255,163,0.3)]">
                <feature.icon className="h-6 w-6 text-black" aria-hidden="true" />
              </div>
              <p className="text-lg font-display font-semibold leading-7 text-white group-hover:text-brand transition-colors">{feature.name}</p>
              <p className="mt-2 text-sm leading-7 text-zinc-400">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* How it Works */}
      <div className="mx-auto max-w-7xl px-6 lg:px-8 py-32">
        <div className="mx-auto max-w-2xl text-center mb-20">
          <h2 className="text-3xl font-display font-bold tracking-tight text-white sm:text-4xl text-gradient">System Architecture</h2>
          <p className="mt-4 text-lg text-zinc-400">Decoupling privacy execution from consensus through the EVVM.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            {[
              { step: '01', title: 'Virtual Settlement', desc: 'The "Virtual Chain" lives inside a host L1/L2 smart contract, maintaining the Merkle Root of the private state.' },
              { step: '02', title: 'Off-Chain Proving', desc: 'Users compute ZK proofs locally (browser/WASM), generating commitments that never leak transaction details.' },
              { step: '03', title: 'Fisher Relay', desc: 'Relayers pick up proofs from the mempool, pay host gas, and get reimbursed from shielded transaction fees.' }
            ].map((item, idx) => (
              <div key={idx} className="flex gap-6 group">
                <span className="text-4xl font-display font-bold text-brand/20 group-hover:text-brand/40 transition-colors">{item.step}</span>
                <div>
                  <h4 className="text-xl font-semibold text-white mb-2">{item.title}</h4>
                  <p className="text-zinc-400 text-sm leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="glass p-1 rounded-3xl overflow-hidden aspect-square flex items-center justify-center bg-linear-to-br from-brand/10 to-blue-500/10 border-white/10 relative group">
            <div className="absolute inset-0 bg-brand/5 opacity-0 group-hover:opacity-100 transition-opacity" />
            <div className="text-center p-12 relative z-10">
              <div className="w-24 h-24 bg-brand/20 rounded-full flex items-center justify-center mx-auto mb-6 shadow-[0_0_30px_rgba(0,255,163,0.1)] group-hover:scale-110 transition-transform">
                <Shield className="w-12 h-12 text-brand" />
              </div>
              <p className="text-zinc-500 text-sm font-mono tracking-tighter">
                EXECUTOR: [EVVM_SMART_CONTRACT] <br />
                STATE: [SHIELDED_MERKLE_TREE] <br />
                CONSENSUS: [DECOUPLED_ZK_SETTLEMENT]
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Compliance & Viewing Keys Section */}
      <div className="mx-auto max-w-7xl px-6 lg:px-8 py-32 border-y border-white/5 bg-zinc-950/50 backdrop-blur-3xl relative overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-px bg-linear-to-r from-transparent via-brand/20 to-transparent" />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand/10 border border-brand/20 text-brand text-xs font-bold uppercase tracking-widest">
              <Lock size={12} />
              The Compliance Twist
            </div>
            <h2 className="text-4xl font-display font-bold text-white sm:text-5xl leading-tight">
              Privacy that meets <br />
              <span className="text-gradient">Regulatory Standards</span>
            </h2>
            <p className="text-lg text-zinc-400 leading-relaxed">
              Unlike traditional mixers, zkVVM is built for the real world.
              Our unique <span className="text-white font-semibold">Viewing Key</span> architecture
              bridges the gap between complete financial anonymity and the need for
              granular, selective disclosure.
            </p>

            <div className="space-y-6">
              {[
                {
                  title: 'Selective Disclosure',
                  desc: 'Generate read-only keys for specific blocks or date ranges to share with auditors without compromising your entire history.'
                },
                {
                  title: 'Zk-Proof of Compliance',
                  desc: 'Prove you haven’t transacted with sanctioned addresses without revealing who you actually sent money to.'
                }
              ].map((item, idx) => (
                <div key={idx} className="flex gap-4 p-4 rounded-2xl bg-white/5 border border-white/5 hover:border-brand/10 transition-colors">
                  <div className="w-10 h-10 rounded-xl bg-zinc-900 border border-zinc-800 flex items-center justify-center shrink-0">
                    <span className="text-brand font-bold">0{idx + 1}</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-white">{item.title}</h4>
                    <p className="text-sm text-zinc-500 mt-1">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="absolute -inset-4 bg-brand/10 blur-3xl rounded-full opacity-50" />
            <div className="relative glass p-8 rounded-[32px] border-white/10 bg-linear-to-b from-white/10 to-transparent overflow-hidden">
              {/* UI Mockup for Viewing Key */}
              <div className="space-y-6">
                <div className="flex items-center justify-between border-b border-white/5 pb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-brand/20 flex items-center justify-center">
                      <Shield size={20} className="text-brand" />
                    </div>
                    <div>
                      <p className="text-sm font-bold text-white">Viewing Key Export</p>
                      <p className="text-[10px] text-zinc-500 uppercase tracking-tighter">Selective Audit Access</p>
                    </div>
                  </div>
                  <div className="px-3 py-1 bg-zinc-900 rounded-lg text-[10px] font-mono text-zinc-400 border border-zinc-800">
                    STATUS: READY
                  </div>
                </div>

                <div className="p-4 bg-black/40 rounded-2xl border border-white/5 space-y-4">
                  <div className="flex justify-between text-[10px] uppercase font-bold tracking-widest text-zinc-600">
                    <span>Target Auditor</span>
                    <span>Permissions</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-xs font-mono text-zinc-400">IRS_REVENUE_SERVICE_0x...</span>
                    <span className="px-2 py-0.5 bg-brand/10 text-brand text-[9px] font-bold rounded">READ_ONLY</span>
                  </div>
                  <div className="h-px bg-white/5" />
                  <div className="space-y-2">
                    <p className="text-[10px] text-zinc-500 uppercase font-bold tracking-widest">Shareable Proof Hash</p>
                    <div className="p-3 bg-zinc-900/50 rounded-xl font-mono text-xs text-brand truncate">
                      vk_vvm_77a2f910e82b7c4d5e6f1a2b3c4d5e6f...
                    </div>
                  </div>
                </div>

                <Button className="w-full gap-2 shadow-[0_0_20px_rgba(0,255,163,0.1)] group">
                  Generate Compliance Key
                  <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                </Button>

                <p className="text-center text-[10px] text-zinc-600">
                  Disclosure is strictly user-initiated. zkVVM holds no master keys.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Final CTA */}
      <div className="mx-auto max-w-7xl px-6 lg:px-8 py-32 text-center">
        <div className="glass p-16 rounded-[48px] bg-linear-to-b from-white/5 to-transparent relative overflow-hidden group">
          <div className="absolute inset-0 bg-brand/5 blur-[100px] -z-10 group-hover:bg-brand/10 transition-colors" />
          <h2 className="text-4xl font-display font-bold text-white mb-6">Redefining Private Infrastructure</h2>
          <p className="text-zinc-400 mb-10 max-w-xl mx-auto">Build the future of zkVVM at ETHDenver 2026. Complete privacy without dedicated L2 sequencer networks.</p>
          <div className="flex justify-center gap-4">
            <Link href="/dashboard">
              <Button size="lg">Get Started</Button>
            </Link>
            <Link href="/docs">
              <Button variant="outline" size="lg">Explore Circuitry</Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
