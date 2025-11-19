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
                className="max-w-sm mx-auto text-left"
            >
                <div className="flex items-center gap-4 mb-3">

                    <div className="relative inline-block"
                        onMouseEnter={handleHoverEnter}
                        onMouseLeave={handleHoverLeave}
                    >
                        <motion.div className="relative">
                            <Avatar className="w-22 h-22 border-4 border-primary/20 flex-shrink-0 overflow-hidden">
                                <div className="relative w-full h-full">
                                    <AnimatePresence mode="wait">
                                        <MotionAvatarImage
                                            key={displayedSrc}
                                            src={displayedSrc}
                                            alt="Rohan Akode Profile Picture"
                                            animate={{ opacity: 1, scale: [1, 1.06, 1.03] }}
                                            exit={{ opacity: 1, scale: 1.03 }}
                                            transition={{
                                                opacity: { duration: 0.18, ease: "easeOut" },
                                            }}
                                        />
                                    </AnimatePresence>
                                </div>
                                <AvatarFallback className="text-xl font-semibold bg-primary text-[var(--text)]">RA</AvatarFallback>
                            </Avatar>

                            {isLoading && (
                                <div className="absolute inset-0 w-22 h-22 mx-auto">
                                    <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
                                        <circle
                                            cx="50"
                                            cy="50"
                                            r="47"
                                            stroke="currentColor"
                                            strokeWidth="2"
                                            fill="none"
                                            className="text-primary/20"
                                        />
                                        <circle
                                            cx="50"
                                            cy="50"
                                            r="47"
                                            stroke="url(#progressGradient)"
                                            strokeWidth="2"
                                            fill="none"
                                            strokeLinecap="round"
                                            strokeDasharray="295.31"
                                            strokeDashoffset="295.31"
                                            className="animate-[progress_2s_ease-in-out_forwards]"
                                        />
                                        <defs>
                                            <linearGradient id="progressGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                                                <stop offset="100%" stopColor="#1447e6" />
                                            </linearGradient>
                                        </defs>
                                    </svg>
                                </div>
                            )}
                        </motion.div>
                    </div>

                    <div className="flex flex-col gap-2">
                        <h2 className="text-3xl font-bold text-foreground leading-none">
                            Rohan Akode
                        </h2>
                        <div className="flex items-center gap-2 flex-wrap">
                            <motion.span
                                whileHover={{ scale: 1.05 }}
                                transition={{ duration: 0.2, ease: "easeOut" }}
                                className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-xs font-semibold bg-green-500/10 text-green-600 border border-green-500/30"
                                aria-label="Availability status"
                            >
                                <div className="w-1.5 h-1.5 bg-green-500 rounded-full shrink-0 translate-y-[0.5px]" />
                                <span className="leading-[1.2]">Available for Full-Time</span>
                            </motion.span>
                        </div>
                    </div>
                </div>

                <div
                    className="flex items-center flex-wrap gap-x-2 gap-y-1 mb-6 text-sm text-muted-foreground"
                    aria-label="Profile metadata"
                >
                    <div className="flex items-center gap-1.5 text-base text-foreground font-medium">
                        <GoBriefcase className="w-4 h-4 shrink-0 translate-y-[1px]" /> {/* Added translate-y to nudge icon */}
                        <span className="leading-[1.2]">Full Stack Developer</span> {/* Tightened line-height */}
                    </div>
                    <span className="text-muted-foreground/50 hidden sm:inline mx-2 text-[0.9rem]">|</span> {/* Adjusted margin and size */}
                    <div className="flex items-center gap-1.5 text-base text-foreground font-medium">
                        <LuMapPin className="w-4 h-4 shrink-0 translate-y-[1px] opacity-80" /> {/* Subtle opacity */}
                        <span className="leading-[1.2]">Maharashtra, India</span>
                    </div>
                </div>

                <div className="mb-6">
                    <p className="text-sm text-muted-foreground leading-relaxed">
                        Experience in developing and deploying applications built with <strong className="font-semibold text-foreground">React</strong>{" "}
                        and <strong className="font-semibold text-foreground">Node.js.</strong>
                    </p>
                </div>

                <div className="grid grid-rows-1 grid-cols-[50%_50%] justify-around gap-2">

                    <div>
                        <Button
                            size="lg"
                            variant="outline"
                            className="w-full border-gray-300 hover:bg-gray-50 cursor-pointer"
                            aria-label="Download Rohan Akode's Resume (PDF)"
                            onClick={() => window.open("/Rohan-Akode.pdf", "_blank")}
                        >
                            <GrDocumentDownload className="w-4 h-4 mr-2" />
                            Resume
                        </Button>
                    </div>


                    <div className="flex justify-around">
                        <SocialLinks />
                    </div>
                </div>

            </motion.div>
        </>
    )
}
