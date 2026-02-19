'use client'

import { motion } from 'framer-motion'
import { ReactNode } from 'react'
import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs))
}

interface ButtonProps {
    children: ReactNode
    onClick?: () => void
    disabled?: boolean
    className?: string
    variant?: 'primary' | 'secondary' | 'outline' | 'ghost'
    size?: 'sm' | 'md' | 'lg'
    type?: 'button' | 'submit' | 'reset'
}

export default function Button({
    children,
    onClick,
    disabled,
    className,
    variant = 'primary',
    size = 'md',
    type = 'button'
}: ButtonProps) {
    const baseStyles = 'inline-flex items-center justify-center font-medium transition-all duration-200 focus:outline-hidden disabled:opacity-50 disabled:cursor-not-allowed rounded-full'

    const variants = {
        primary: 'bg-white text-black hover:bg-zinc-200 active:scale-95',
        secondary: 'bg-zinc-800 text-white hover:bg-zinc-700 active:scale-95',
        outline: 'border border-zinc-700 text-white hover:bg-zinc-900 active:scale-95',
        ghost: 'text-zinc-400 hover:text-white hover:bg-white/5 active:scale-95'
    }

    const sizes = {
        sm: 'px-4 py-1.5 text-xs',
        md: 'px-6 py-2.5 text-sm',
        lg: 'px-8 py-3.5 text-base'
    }

    return (
        <motion.button
            type={type}
            whileHover={{ y: -1 }}
            whileTap={{ scale: 0.98 }}
            className={cn(baseStyles, variants[variant], sizes[size], className)}
            onClick={onClick}
            disabled={disabled}
        >
            {children}
        </motion.button>
    )
}
