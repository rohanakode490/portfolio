"use client"

import React, { useState } from 'react'
import { motion, Variants } from 'framer-motion'
import { LuSend } from 'react-icons/lu'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card'
import { Input } from '../ui/input'
import { Textarea } from '../ui/textarea'
import { Button } from '../ui/button'

export default function Contacts() {

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        subject: "",
        message: ""
    })

    const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
    const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
    const [errorMessage, setErrorMessage] = useState<string>('')

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true)
        setErrorMessage('')
        try {
            const resp = await fetch('/api/send-email', {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData)
            })

            const data = await resp.json();
            if (!resp.ok) {
                throw new Error(data.error || "Failed to send email")
            }

            setSubmitStatus('success')
        } catch (error: unknown) {
            setSubmitStatus('error')
            const errorMessage = error instanceof Error ? error.message : "Failed to send email";
            setErrorMessage(errorMessage)
        } finally {
            setIsSubmitting(false)
        }

    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData((prev) => ({
            ...prev,
            [e.target.name]: [e.target.value]
        }))
    }

    const dotVariants: Variants = {
        animate: {
            scale: [1, 1.5, 1],
            opacity: [0.5, 1, 0.5],
            transition: {
                duration: 0.6,
                repeat: Infinity,
                ease: 'easeInOut',
            },
        },
    };


    return (
        <section id='contact' className='scroll-mt-8 flex justify-center items-center'>
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className='w-full max-w-md md:max-w-lg'
            >
                <h2 className="text-3xl font-bold text-foreground mb-8">Get In Touch</h2>

                <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                    className="flex flex-col"
                >
                    <Card className='bg-card/50 backdrop-blur-sm border-border/50 h-full'>
                        <CardHeader>
                            <CardTitle className='text-xl text-card-foreground'>Send a Message</CardTitle>
                            <CardDescription className='mt-2'>Have a project in mind? I&apos;d love to hear about it.</CardDescription>
                        </CardHeader>

                        <CardContent>
                            <form onSubmit={handleSubmit} className="space-y-5">
                                <motion.div
                                    initial={{ opacity: 0, y: 10 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.3 }}
                                >
                                    <Input
                                        name='name'
                                        placeholder='Name'
                                        value={formData.name}
                                        onChange={handleChange}
                                        required
                                        className='transition-all duration-200 focus:ring-2 focus:ring-primary/20'
                                    />
                                </motion.div>
                                <motion.div
                                    initial={{ opacity: 0, y: 10 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.3, delay: 0.1 }}
                                >
                                    <Input
                                        name='email'
                                        type='email'
                                        placeholder='Email'
                                        value={formData.email}
                                        onChange={handleChange}
                                        required
                                        className='transition-all duration-200 focus:ring-2 focus:ring-primary/20'
                                    />
                                </motion.div>
                                <motion.div
                                    initial={{ opacity: 0, y: 10 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.3, delay: 0.2 }}
                                >
                                    <Textarea
                                        name="message"
                                        placeholder='Message'
                                        rows={7}
                                        value={formData.message}
                                        onChange={handleChange}
                                        required
                                        className='transition-all duration-200 focus:ring-2 focus:ring-primary/20 resize-none h-full'
                                    />
                                </motion.div>

                                <motion.div
                                    initial={{ opacity: 0, y: 10 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.3, delay: 0.3 }}
                                >
                                    <Button
                                        type='submit'
                                        className='w-full group bg-primary hover:bg-primary/90 text-white border-0 hover:scale-105 transition-all duration-200'
                                    >
                                        {isSubmitting ? (
                                            <span className="flex items-center">
                                                <div className="flex space-x-1 mr-2">
                                                    <motion.div
                                                        className="w-2 h-2 bg-white rounded-full"
                                                        variants={dotVariants}
                                                        animate="animate"
                                                        custom={0}
                                                    />
                                                    <motion.div
                                                        className="w-2 h-2 bg-white rounded-full"
                                                        variants={dotVariants}
                                                        animate="animate"
                                                        custom={0.2}
                                                    />
                                                    <motion.div
                                                        className="w-2 h-2 bg-white rounded-full"
                                                        variants={dotVariants}
                                                        animate="animate"
                                                        custom={0.4}
                                                    />
                                                </div>
                                                Sending...
                                            </span>
                                        ) : (
                                            <>
                                                <LuSend className='w-4 h-4 mr-2 group-hover:translate-x-1 transition-transform duration-200' />
                                                Send Message
                                            </>
                                        )}
                                    </Button>
                                </motion.div>

                                {submitStatus === "success" && (
                                    <motion.p
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        className='text-[var(--text)] text-sm mt-2 text-center'
                                    >
                                        Message sent successfully!
                                    </motion.p>
                                )}

                                {submitStatus === "error" && (
                                    <motion.p
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        className='text-red-500 text-shadow-neutral-50 mt-2 text-center'
                                    >
                                        {errorMessage || 'Failed to send message. Please try again.'}
                                    </motion.p>
                                )}
                            </form>
                        </CardContent>
                    </Card>
                </motion.div>
            </motion.div>
        </section >
    )
}
