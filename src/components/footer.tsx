import React from 'react'
import { motion } from 'framer-motion'
import SocialLinks from './social-links'
import Link from 'next/link'

export default function Footer() {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className='py-16'
        >
            <div className="flex flex-row justify-around ">
                <div>
                    @2025 <Link href={"/"} className='hover:underline'>
                        rohanakode.dev
                    </Link>
                    {/* . Built with ❤️ by Rohan Akode */}
                </div>
                <div className='flex flex-row justify-center items-center'>
                    <SocialLinks className='bg-transparent' />
                </div>
            </div>
        </motion.div>
    )
}
