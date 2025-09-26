import React from 'react'
import { motion } from "framer-motion"
import { LuGithub, LuLinkedin, LuMail } from 'react-icons/lu'
import { RiTwitterLine } from 'react-icons/ri'
import Link from "next/link"

const socialLinks = [
    {
        icon: <LuLinkedin className='w-5 h-5' />,
        label: "LinkedIn",
        href: "https://linkedin.com/in/rohan-akode",
        username: "@rohanakode",
    },
    {
        icon: <LuGithub className='w-5 h-5' />,
        label: "GitHub",
        href: "https://github.com/rohanakode490",
        username: "@rohanakode",
    },
    {
        icon: <RiTwitterLine className='w-5 h-5' />,
        label: "X",
        href: "https://x.com/rohanakode7",
        username: "@rohanakode",
    },
    {
        icon: <LuMail className="w-5 h-5" />,
        label: 'Email',
        href: 'mailto:rohan.akode@example.com',
        username: 'rohan.akode@example.com'
    }
]


export default function SocialLinks({ className = "" }: { className?: string }) {
    return (
        <>
            {
                socialLinks.map((social, index) => (
                    <motion.div
                        key={index}
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.3, delay: 0.1 * index }}
                        viewport={{ once: true }}
                    >
                        <Link
                            href={social.href}
                            target='_blank'
                            rel='noopener noreferror'
                            className={`w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center hover:bg-primary-foreground transition-all duration-300 group hover:scale-110 ${className}`}
                            title={`${social.label}: ${social.username}`}
                        >
                            {social.icon}
                        </Link>
                    </motion.div>
                ))
            }
        </>
    )
}
