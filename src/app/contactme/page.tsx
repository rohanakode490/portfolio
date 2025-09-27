"use client"

import React, { useEffect, useState } from 'react'
import BackgroundElements from '@/components/background-elements'
import Navbar from '@/components/navbar'
import Contacts from '@/components/sections/contacts'
import { scrollToSection } from '@/lib/navigation'
import { motion } from 'framer-motion'
import Footer from '@/components/footer'

export default function Contactpage() {

    const [mounted, setMounted] = useState(false)

    useEffect(() => {
        setMounted(true)
    }, [])

    if (!mounted) {
        return null;
    }

    return (
        <div className="min-h-screen bg-background relative">
            <BackgroundElements />
            <Navbar activeSection='contact' onNavigate={scrollToSection} />
            <div className="p-4 md:p-6 pt-16 md:pt-20">
                <motion.div
                    id="contact"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                >
                    <Contacts />
                </motion.div>
            </div>
            <Footer />
        </div>
    )
}
