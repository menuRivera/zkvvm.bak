'use client'

import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs))
}

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label?: string
    error?: string
}

export default function Input({ label, error, className, ...props }: InputProps) {
    return (
        <div className="flex flex-col gap-1.5 w-full">
            {label && (
                <label className="text-xs font-medium text-zinc-400 px-1 uppercase tracking-wider">
                    {label}
                </label>
            )}
            <input
                className={cn(
                    'w-full bg-zinc-900/50 border border-zinc-800 rounded-xl px-4 py-3 text-sm text-white transition-all duration-200',
                    'placeholder:text-zinc-600 outline-hidden',
                    'focus:border-brand/50 focus:bg-zinc-900',
                    error && 'border-red-500/50 focus:border-red-500/50',
                    className
                )}
                {...props}
            />
            {error && (
                <span className="text-xs text-red-500 px-1">
                    {error}
                </span>
            )}
        </div>
    )
}
