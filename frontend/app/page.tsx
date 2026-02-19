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
            <span className="text-gradient">Privacy-Focused</span>
            <br />
            Virtual Blockchain
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="mt-8 text-lg leading-8 text-zinc-400 max-w-2xl mx-auto font-medium"
          >
            zkVVM is a privacy-focused EVVM custom service running as an
            infrastructure-less virtual blockchain.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="mt-12 flex items-center justify-center gap-x-6"
          >
            <Link href="/dashboard">
              <Button size="lg" className="gap-2">
                Launch Dashboard <ArrowRight size={18} />
              </Button>
            </Link>
            <Link href="/docs" className="text-sm font-semibold leading-6 text-white hover:text-zinc-300 transition-colors">
              Explore Protocol <span aria-hidden="true">→</span>
            </Link>
          </motion.div>
        </div>
      </div>

      {/* Feature Grid */}
      <div className="mx-auto max-w-7xl px-6 lg:px-8 pb-32">
        <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 sm:gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-3">
          {[
            {
              name: 'Off-Chain ZK Flow',
              description: 'Users generate ZK proofs off-chain to obscure payment details including sender, receiver, and amount.',
              icon: Shield
            },
            {
              name: 'zkVVM Execution',
              description: 'A Fisher relays the gasless transaction to the EVVM executor contract, verifying the proof securely.',
              icon: Zap
            },
            {
              name: 'Compliance Keys',
              description: 'Generate read-only "Viewing Keys" for selective disclosure to auditors without compromising privacy.',
              icon: Lock
            }
          ].map((feature, idx) => (
            <motion.div
              key={feature.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * idx, duration: 0.5 }}
              viewport={{ once: true }}
              className="glass p-8 rounded-3xl"
            >
              <div className="mb-6 flex h-10 w-10 items-center justify-center rounded-lg bg-brand">
                <feature.icon className="h-6 w-6 text-black" aria-hidden="true" />
              </div>
              <p className="text-lg font-display font-semibold leading-7 text-white">{feature.name}</p>
              <p className="mt-2 text-sm leading-7 text-zinc-400">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* How it Works */}
      <div className="mx-auto max-w-7xl px-6 lg:px-8 py-32">
        <div className="mx-auto max-w-2xl text-center mb-20">
          <h2 className="text-3xl font-display font-bold tracking-tight text-white sm:text-4xl text-gradient">The zkVVM Protocol</h2>
          <p className="mt-4 text-lg text-zinc-400">An infrastructure-less architecture designed for privacy and scalability.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            {[
              { step: '01', title: 'ZK Flow', desc: 'Users generate ZK proofs off-chain to obscure payment details including sender, receiver, and amount.' },
              { step: '02', title: 'zkVVM Execution', desc: 'A Fisher relays the gasless transaction to the EVVM executor contract, verifying the proof and updating virtual state.' },
              { step: '03', title: 'Compliance', desc: 'Users can generate read-only Viewing Keys for selective disclosure to auditors when required.' }
            ].map((item, idx) => (
              <div key={idx} className="flex gap-6">
                <span className="text-4xl font-display font-bold text-brand/20">{item.step}</span>
                <div>
                  <h4 className="text-xl font-semibold text-white mb-2">{item.title}</h4>
                  <p className="text-zinc-400 text-sm leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="glass p-1 rounded-3xl overflow-hidden aspect-square flex items-center justify-center bg-linear-to-br from-brand/10 to-blue-500/10 border-white/10">
            <div className="text-center p-12">
              <div className="w-24 h-24 bg-brand/20 rounded-full flex items-center justify-center mx-auto mb-6">
                <Shield className="w-12 h-12 text-brand" />
              </div>
              <p className="text-zinc-500 text-sm font-mono tracking-tighter">
                SERVICE: [EVVM_CUSTOM] <br />
                STATE: [VIRTUAL_BLOCKCHAIN] <br />
                NETWORK: [INFRASTRUCTURE_LESS]
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Final CTA */}
      <div className="mx-auto max-w-7xl px-6 lg:px-8 py-32 text-center">
        <div className="glass p-16 rounded-[48px] bg-linear-to-b from-white/5 to-transparent relative overflow-hidden">
          <div className="absolute inset-0 bg-brand/5 blur-[100px] -z-10" />
          <h2 className="text-4xl font-display font-bold text-white mb-6">Ready to secure your payments?</h2>
          <p className="text-zinc-400 mb-10 max-w-xl mx-auto">Join the new era of compliant, private, and instantaneous financial transactions on the blockchain.</p>
          <div className="flex justify-center gap-4">
            <Link href="/dashboard">
              <Button size="lg">Get Started Now</Button>
            </Link>
            <Link href="/docs">
              <Button variant="outline" size="lg">View Documentation</Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
