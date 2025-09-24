import { motion } from "framer-motion"
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar"
import { LuDownload, LuGithub, LuLinkedin, LuMapPin } from "react-icons/lu"
import { Badge } from "../ui/badge"
import { Button } from "../ui/button"
import Link from "next/link"
import { RiTwitterLine } from "react-icons/ri"

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


export default function Profile() {

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.7 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-sm mx-auto"
        >
            <div className="relative inline-block cursor-pointer">
                <div className="relative">
                    <Avatar className="w-26 h-26 mx-auto mb-4 sm:mb-6 border-4 border-primary/20 transition-all duration-300">
                        <AvatarImage src="/photo.png" alt="Profile" />
                        <AvatarFallback className="text-2xl sm:text-3xl font-semibold bg-primary text-[var(--text)]">RA</AvatarFallback>
                    </Avatar>
                </div>
            </div>

            <h3 className="text-2xl sm:text-3xl lg:text-3xl font-bold text-foreground mb-2 sm:mb-3">Rohan Akode</h3>
            <p className="text-lg sm:text-xl text-muted-foreground mb-3 sm:mb-4">Full Stack Developer</p>

            <div className="flex items-center justify-center gap-2 text-muted-foreground mb-4 sm:mb-6">
                <LuMapPin className="w-4 h-4 sm:w-5 sm:h-5" />
                <span className="text-sm sm:text-base">Maharashtra, India</span>
            </div>

            <Badge variant="secondary" className="mb-6 sm:mb-8 text-xs sm:text-sm px-3 py-1 sm:px-4 sm:py-2">Available for Hire</Badge>

            <div className="flex flex-col items-center justify-end gap-4">
                <Button
                    size="default"
                    className="w-[75%] max-w-xs bg-blue-600 hover:bg-blue-700 text-white border-0 text-sm sm:text-base px-4"
                    onClick={() => window.open("/Rohan-Akode.pdf", "_blank")}
                >
                    <LuDownload className="w-4 h-4 sm:w-5 sm:h-5 mr-2 text-white" />
                    Download Resume
                </Button>
                <div className='flex gap-2'>
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
            <p className="text-xs sm:text-sm text-muted-foreground mt-6 leading-relaxed px-2 sm:px-0">
                Passionate about creating exceptional digital experiences with modern technologies. Specialized in React and Node.js.
            </p>
        </motion.div>
    )
}
