"use client"

import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'

export default function BackgroundElements() {
    const [mounted, setMounted] = useState(false)

    useEffect(() => {
        setMounted(true)
    }, [])

    if (!mounted) return null

    return (
        <div className='fixed inset-0 overflow-hidden pointer-events-none'>
            <div className="absolute inset-0">
                <div
                    className='absolute inset-0 opacity-[0.3] dark:opacity-[0.12]'
                    style={{
                        backgroundImage: ` 
                            liner-gradient(rgba(59, 130, 246, 0.3) 1px, transparent 1px),
                            liner-gradient(90degm rgba(59, 130, 246, 0.3) 1px, transparent 1px)  
                        `,
                        backgroundSize: "40px 40px"
                    }}
                />

                {/* Horizontal flowing lines */}
                {Array.from({ length: 7 }).map((_, i) => (
                    <motion.div
                        key={`h-line-${i}`}
                        className='absolute h-[1.5px] w-20 bg-gradient-to-r from-transparent via-blue-400/60 to-transparent'
                        style={{
                            width: "200px",
                            top: `${5 + i * (95 / 7)}%`,
                            left: "-200px"
                        }}
                        animate={{
                            x: ["0px", "calc(100vw + 200px)"],
                            opacity: [0, 1, 1, 0]
                        }}
                        transition={{
                            duration: 7 + Math.random() * 5,
                            repeat: Number.POSITIVE_INFINITY,
                            delay: i * 1 + Math.random() * 3,
                            ease: "linear"
                        }}
                    />
                ))}

                {/* Vertical flowing lines */}
                {Array.from({ length: 7 }).map((_, i) => (
                    <motion.div
                        key={`v-line-${i}`}
                        className="absolute w-[1.5px] h-20 bg-gradient-to-b from-transparent via-blue-400/60 to-transparent"
                        style={{
                            height: "200px",
                            left: `${5 + i * (95 / 7)}%`,
                            top: "-200px",
                        }}
                        animate={{
                            y: ["0px", "calc(100vh + 200px)"],
                            opacity: [0, 1, 1, 0],
                        }}
                        transition={{
                            duration: 7 + Math.random() * 5,
                            repeat: Number.POSITIVE_INFINITY,
                            delay: i * 1 + Math.random() * 3,
                            ease: "linear",
                        }}
                    />
                ))}
            </div>

            {/* Animated Dots */}
            <div className="absolute inset-0 opacity-40">
                {Array.from({ length: 49 }).map((_, i) => (
                    <motion.div
                        key={`intersection-${i}`}
                        className="absolute w-1 h-1 bg-blue-400 rounded-full"
                        style={{
                            left: `${(i % 7) * (95 / 7) + 5}%`,
                            top: `${Math.floor(i / 7) * (95 / 7) + 5}%`,
                        }}
                        animate={{
                            opacity: [0, 2, 0],
                            scale: [0.8, 1.2, 0.8],
                        }}
                        transition={{
                            duration: 5 + Math.random() * 5,
                            repeat: Number.POSITIVE_INFINITY,
                            delay: Math.random() * 50,
                        }}
                    />
                ))}
            </div>
        </div>
    )
}