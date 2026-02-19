'use client'

import { ReactNode } from 'react'
import { motion } from 'framer-motion'
import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs))
}

interface CardProps {
    children: ReactNode
    className?: string
}

export default function Card({ children, className }: CardProps) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className={cn(
                'glass-dark rounded-2xl p-6 shadow-2xl overflow-hidden',
                className
            )}
        >
            {children}
        </motion.div>
    )
}
