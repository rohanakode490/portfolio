"use client"

import { motion } from 'framer-motion'
import { CodeXml } from 'lucide-react'
import React from 'react'

export default function LoadingComponent() {
    return (
        <>
            <motion.div
                className='fixed inset-0 bg-background z-50 flex items-center justify-center'
                initial={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
            >
                <div className="text-center">
                    <motion.div
                        className='relative mb-8'
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ duration: 0.5 }}
                    >
                        <motion.div
                            className='w-16 h-16 border-4 border-primary/20 rounded-full mx-auto'
                            animate={{ rotate: 360 }}
                            transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                        />
                        <motion.div
                            className='absolute inset-0 w-16 h-16 border-4 border-transparent border-t-primary rounded-full mx-auto'
                            animate={{ rotate: -360 }}
                            transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                        />
                        <div className="absolute inset-0 flex items-center justify-center">
                            <CodeXml className='w-6 h-6 text-primary' />
                        </div>
                    </motion.div>

                    <motion.h2
                        className="text-2xl font-bold text-foreground mb-2"
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                    >
                        Rohan Akode
                    </motion.h2>

                    <motion.p
                        className='text-muted-foreground flex items-center justify-center gap-2'
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.4 }}
                    >
                        Loading Portfolio...
                    </motion.p>
                </div>
            </motion.div>
        </>
    )
}
