'use client'

import { motion, useMotionValue, useSpring } from 'framer-motion'
import { useEffect } from 'react'

export default function BackgroundEffects() {
    const mouseX = useMotionValue(0)
    const mouseY = useMotionValue(0)

    const springConfig = { damping: 25, stiffness: 150 }
    const x = useSpring(mouseX, springConfig)
    const y = useSpring(mouseY, springConfig)

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            mouseX.set(e.clientX)
            mouseY.set(e.clientY)
        }

        window.addEventListener('mousemove', handleMouseMove)
        return () => window.removeEventListener('mousemove', handleMouseMove)
    }, [mouseX, mouseY])

    return (
        <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
            {/* Interactive cursor blob - very subtle */}
            <motion.div
                className="absolute w-[800px] h-[800px] rounded-full bg-brand/[0.03] blur-[120px]"
                style={{
                    x: x,
                    y: y,
                    translateX: '-50%',
                    translateY: '-50%'
                }}
            />

            {/* Perpetually moving ambient blobs */}
            <motion.div
                animate={{
                    x: [0, 150, -100, 0],
                    y: [0, -100, 100, 0],
                    scale: [1, 1.2, 0.8, 1]
                }}
                transition={{
                    duration: 30,
                    repeat: Infinity,
                    ease: "linear"
                }}
                className="absolute top-[-20%] left-[-20%] w-[1000px] h-[1000px] rounded-full bg-brand/[0.02] blur-[140px]"
            />

            <motion.div
                animate={{
                    x: [0, -150, 150, 0],
                    y: [0, 150, -150, 0],
                    scale: [1, 0.8, 1.2, 1]
                }}
                transition={{
                    duration: 40,
                    repeat: Infinity,
                    ease: "linear"
                }}
                className="absolute bottom-[-20%] right-[-20%] w-[1200px] h-[1200px] rounded-full bg-blue-500/[0.02] blur-[160px]"
            />
        </div>
    )
}
