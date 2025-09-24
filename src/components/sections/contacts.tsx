import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { LuGithub, LuLinkedin, LuMail, LuMapPin, LuSend } from 'react-icons/lu'
import { RiTwitterLine } from 'react-icons/ri'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card'
import Link from 'next/link'
import { Input } from '../ui/input'
import { Textarea } from '../ui/textarea'
import { Button } from '../ui/button'

const contactInfo = [
    {
        icon: <LuMail className='w-5 h-5 text-primary' />,
        label: "Email",
        value: "rohanakode52@email.com",
        href: "mailto:rohanakode52@email.com",
    },
    {
        icon: <LuMapPin className='w-5 h-5 text-primary' />,
        label: "Location",
        value: "Maharashtra, India",
        href: "https://maps.google.com/?q=Maharashtra,+India",
    },
]

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
]


export default function Contacts() {

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        subject: "",
        message: ""
    })

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        // TODO: Add Resend logic
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData((prev) => ({
            ...prev,
            [e.target.name]: [e.target.value]
        }))
    }

    return (
        <section id='contact' className='scroll-mt-8'>
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
            >
                <h2 className="text-3xl font-bold text-foreground mb-8">Get In Touch</h2>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5 }}
                        className='flex flex-col'
                    >
                        <Card className='bg-card/60 backdrop-blur-sm border-border/50 h-full'>
                            <CardHeader>
                                <CardTitle className='text-xl text-card-foreground'>Let's Work Together</CardTitle>
                                <CardDescription className='mt-2'> I'm always interested in new opportunities and exciting projects. Feel free to reach out if you'd like to collaborate!</CardDescription>
                            </CardHeader>

                            <CardContent className='space-y-6 flex-1'>
                                <div className="space-y-4">
                                    {contactInfo.map((contact, index) => (
                                        <motion.div
                                            key={index}
                                            initial={{ opacity: 0, y: 10 }}
                                            whileInView={{ opacity: 1, y: 0 }}
                                            transition={{ duration: 0.3, delay: index * 0.1 }}
                                        >
                                            <Link
                                                href={contact.href}
                                                target={contact.href.startsWith("https") ? "_blank" : undefined}
                                                rel={contact.href.startsWith("https") ? "noopener noreferrer" : undefined}
                                                className='flex items-center gap-3 p-3 rounded-lg hover:bg-muted/30 transition-colors group'
                                            >
                                                <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                                                    {contact.icon}
                                                </div>
                                                <div>
                                                    <p className='font-medium text-card-foreground'>{contact.label}</p>
                                                    <p className='text-sm text-muted-foreground'>{contact.value}</p>
                                                </div>
                                            </Link>
                                        </motion.div>
                                    ))}
                                </div>

                                <div>
                                    <h4 className="font-semibold text-card-foreground mb-3">Connect With Me</h4>
                                    <div className='flex gap-3'>
                                        {socialLinks.map((social, index) => (
                                            <motion.div
                                                key={index}
                                                initial={{ opacity: 0, scale: 0.8 }}
                                                whileInView={{ opacity: 1, scale: 1 }}
                                                transition={{ duration: 0.3, delay: 0.1 * index }}
                                            >
                                                <Link
                                                    href={social.href}
                                                    target='_blank'
                                                    rel='noopener noreferror'
                                                    className='w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center hover:bg-primary-foreground transition-all duration-300 group'
                                                    title={`${social.label}: ${social.username}`}
                                                >
                                                    {social.icon}
                                                </Link>
                                            </motion.div>
                                        ))}
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                        className="flex flex-col"
                    >
                        <Card className='bg-card/50 backdrop-blur-sm border-border/50 h-full'>
                            <CardHeader>
                                <CardTitle className='text-xl text-card-foreground'>Send a Message</CardTitle>
                                <CardDescription className='mt-2'>Have a project in mind? I'd love to hear about it.</CardDescription>
                            </CardHeader>

                            <CardContent>
                                <form onSubmit={handleSubmit} className="space-y-4 h-full flex flex-col">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div>
                                            <Input
                                                name='name'
                                                placeholder='Your Name'
                                                value={formData.name}
                                                onChange={handleChange}
                                                required
                                                className='transition-all duration-200 focus:ring-2 focus:ring-primary/20'
                                            />
                                        </div>
                                        <div>
                                            <Input
                                                name='email'
                                                type='email'
                                                placeholder='Your Email'
                                                value={formData.email}
                                                onChange={handleChange}
                                                required
                                                className='transition-all duration-200 focus:ring-2 focus:ring-primary/20'
                                            />
                                        </div>
                                    </div>

                                    <div>
                                        <Input
                                            name='subject'
                                            placeholder='Subject'
                                            value={formData.subject}
                                            onChange={handleChange}
                                            required
                                            className='transition-all duration-200 focus:ring-2 focus:ring-primary/20'
                                        />
                                    </div>
                                    <div className='flex-2'>
                                        <Textarea
                                            name="message"
                                            placeholder='Your Message'
                                            rows={5}
                                            value={formData.message}
                                            onChange={handleChange}
                                            required
                                            className='transition-all duration-200 focus:ring-2 focus:ring-primary/20 resize-none h-full'
                                        />
                                    </div>

                                    <Button
                                        type='submit'
                                        className='w-full group bg-primary hover:bg-primary/90 text-white border-0'
                                    >
                                        <LuSend className='w-4 h-4 mr-2 group-hover:translate-x-1 transition-transform duration-200' />
                                        Send Message
                                    </Button>
                                </form>
                            </CardContent>
                        </Card>
                    </motion.div>
                </div>
            </motion.div>
        </section >
    )
}
