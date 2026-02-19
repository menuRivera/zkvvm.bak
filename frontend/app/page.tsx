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
            <span className="text-gradient">Secure Payments</span>
            <br />
            Built with ZK-Proof
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="mt-8 text-lg leading-8 text-zinc-400 max-w-2xl mx-auto"
          >
            ZK-vvm provides a zero-knowledge compliant infrastructure for
            private, secure, and regulatory-ready financial transactions on-chain.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="mt-12 flex items-center justify-center gap-x-6"
          >
            <Link href="/dashboard">
              <Button size="lg" className="gap-2">
                Launch App <ArrowRight size={18} />
              </Button>
            </Link>
            <Link href="/docs" className="text-sm font-semibold leading-6 text-white hover:text-zinc-300 transition-colors">
              Read Documentation <span aria-hidden="true">→</span>
            </Link>
          </motion.div>
        </div>
      </div>

      {/* Feature Grid */}
      <div className="mx-auto max-w-7xl px-6 lg:px-8 pb-32">
        <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 sm:gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-3">
          {[
            {
              name: 'Privacy First',
              description: 'All transactions are shielded using zero-knowledge proofs, ensuring your data remains private.',
              icon: Shield
            },
            {
              name: 'Instant Verification',
              description: 'Proofs are generated and verified in milliseconds, providing instant settlement.',
              icon: Zap
            },
            {
              name: 'Compliance Ready',
              description: 'Built-in hooks for regulatory oversight without compromising user privacy.',
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
    </div>
  )
}
