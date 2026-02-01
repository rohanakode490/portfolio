import { useRef, useState } from "react"
import { AnimatePresence, motion } from "framer-motion"
import { Avatar, AvatarFallback, MotionAvatarImage } from "../ui/avatar"
import { LuMapPin } from "react-icons/lu"
import { Button } from "../ui/button"
import SocialLinks from "../social-links"
import { GoBriefcase } from "react-icons/go"
import { GrDocumentDownload } from "react-icons/gr"

export default function Profile() {
    const [imageToggled, setImageToggled] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [displayedSrc, setDisplayedSrc] = useState("/profile-pic.jpg")
    const timeoutRef = useRef<NodeJS.Timeout | null>(null)

    const handleHoverEnter = () => {
        setIsLoading(true)
        timeoutRef.current = setTimeout(() => {
            // figure the next src
            const newSrc = imageToggled ? "/profile-pic.jpg" : "/profile-pic-2.jpg"

            // preload
            const img = new Image()
            img.onload = () => {
                // only update after load — prevents fallback flash
                setDisplayedSrc(newSrc)
                setImageToggled((prev) => !prev)
                setIsLoading(false)
                timeoutRef.current = null
            }

            // handle load error gracefully 
            img.onerror = () => {
                // keep old image, stop loading indicator
                setIsLoading(false)
                timeoutRef.current = null
            }

            img.src = newSrc
        }, 2000)
    }

    const handleHoverLeave = () => {
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current)
            timeoutRef.current = null
            setIsLoading(false)
        }
    }

    return (
        <>
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                className="w-full bg-card/30 backdrop-blur-md rounded-3xl p-6 md:p-8 border border-border/40 shadow-sm text-left relative overflow-hidden group"
            >
                <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full blur-3xl -mr-16 -mt-16 transition-colors group-hover:bg-primary/10" />
                
                <div className="flex flex-col gap-6 relative z-10">
                    <div className="flex items-center gap-5">
                        <div className="relative inline-block"
                            onMouseEnter={handleHoverEnter}
                            onMouseLeave={handleHoverLeave}
                        >
                            <motion.div className="relative">
                                <Avatar className="w-20 h-20 sm:w-24 sm:h-24 border-4 border-primary/20 flex-shrink-0 overflow-hidden shadow-xl">
                                    <div className="relative w-full h-full">
                                        <AnimatePresence mode="wait">
                                            <MotionAvatarImage
                                                key={displayedSrc}
                                                src={displayedSrc}
                                                alt="Rohan Akode Profile Picture"
                                                animate={{ opacity: 1, scale: [1, 1.05, 1] }}
                                                exit={{ opacity: 1, scale: 1 }}
                                                transition={{
                                                    opacity: { duration: 0.2 },
                                                }}
                                            />
                                        </AnimatePresence>
                                    </div>
                                    <AvatarFallback className="text-2xl font-bold bg-primary text-primary-foreground">RA</AvatarFallback>
                                </Avatar>

                                {isLoading && (
                                    <div className="absolute inset-0 w-full h-full">
                                        <svg className="w-full h-full -rotate-90 scale-110" viewBox="0 0 100 100">
                                            <circle
                                                cx="50"
                                                cy="50"
                                                r="48"
                                                stroke="currentColor"
                                                strokeWidth="3"
                                                fill="none"
                                                className="text-primary/10"
                                            />
                                            <circle
                                                cx="50"
                                                cy="50"
                                                r="48"
                                                stroke="var(--primary)"
                                                strokeWidth="3"
                                                fill="none"
                                                strokeLinecap="round"
                                                strokeDasharray="301.59"
                                                strokeDashoffset="301.59"
                                                className="animate-[progress_2s_ease-in-out_forwards]"
                                            />
                                        </svg>
                                    </div>
                                )}
                            </motion.div>
                        </div>

                        <div className="flex flex-col gap-2">
                            <h2 className="text-3xl md:text-4xl font-extrabold text-foreground tracking-tight leading-none">
                                Rohan Akode
                            </h2>
                            <motion.span
                                whileHover={{ scale: 1.02 }}
                                className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold bg-green-500/10 text-green-600 border border-green-500/20 w-fit"
                            >
                                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                                Available for Full-Time
                            </motion.span>
                        </div>
                    </div>

                    <div className="space-y-4">
                        <div className="flex flex-col gap-3 text-muted-foreground">
                            <div className="flex items-center gap-3 text-base font-semibold text-foreground/90">
                                <div className="p-2 rounded-lg bg-primary/10 text-primary">
                                    <GoBriefcase className="w-5 h-5" />
                                </div>
                                Full Stack Developer
                            </div>
                            <div className="flex items-center gap-3 text-base font-semibold text-foreground/90">
                                <div className="p-2 rounded-lg bg-primary/10 text-primary">
                                    <LuMapPin className="w-5 h-5" />
                                </div>
                                Maharashtra, India
                            </div>
                        </div>

                        <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
                            Crafting high-performance, user-centric applications with <strong className="text-foreground font-bold">React</strong> and <strong className="text-foreground font-bold">Node.js</strong>. Focused on clean architecture and smooth UX.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <Button
                            size="lg"
                            className="w-full h-full font-bold shadow-lg shadow-primary/20 cursor-pointer"
                            onClick={() => window.open("/Rohan-Akode.pdf", "_blank")}
                        >
                            <GrDocumentDownload className="w-4 h-4 mr-2" />
                            Download CV
                        </Button>
                        <div className="flex items-center justify-center bg-card/50 rounded-lg border border-border/50 py-1">
                            <SocialLinks />
                        </div>
                    </div>
                </div>
            </motion.div>
        </>
    )
}
