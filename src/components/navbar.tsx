"use client"

import { motion, useAnimate } from "framer-motion"
import { useEffect, useRef, useState } from "react"
import { Button } from "./ui/button";
import { MdClose, MdMenu } from "react-icons/md";
import { useTheme } from "next-themes";
import { LuMoon, LuSun } from "react-icons/lu";
import { usePathname, useRouter } from "next/navigation";

interface NavbarProps {
    activeSection: string;
    onNavigate: (section: string) => void
}

const navigationItems = [
    { id: "experience", label: "Experience" },
    { id: "education", label: "Education" },
    { id: "projects", label: "Projects" },
    { id: "skills", label: "Skills" },
    { id: "opensource", label: "Open-Source" },
    { id: "contact", label: "Contact" },
]

export default function Navbar({ activeSection, onNavigate }: NavbarProps) {
    const { resolvedTheme, setTheme } = useTheme()
    const router = useRouter()
    const pathname = usePathname()

    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
    const [hoveredSection, setHoveredSection] = useState<string | null>(null)

    const navRefs = useRef<{ [key: string]: HTMLButtonElement | null }>({});

    const [scope, animate] = useAnimate();

    const handleNavigate = (section: string) => {
        if (section === "contact") {
            router.push("/contactme") // Navigate to contact page
        }
        else if (pathname === '/contactme') {
            router.push(`/#${section}`) // If on contact page, go to the main page and scroll to the selected section
        }
        else {
            onNavigate(section) // If on main page, go the selected section
        }
        setIsMobileMenuOpen(false)
    }

    const ToggleTheme = () => {
        setTheme(resolvedTheme === "light" ? "dark" : "light")
    }

    useEffect(() => {
        const updateUnderline = () => {
            requestAnimationFrame(() => {
                const targetSection = hoveredSection || activeSection
                const activeEl = navRefs.current[targetSection];
                if (activeEl && scope.current) {
                    const containerRect = scope.current.parentElement?.getBoundingClientRect();
                    const activeRect = activeEl.getBoundingClientRect();
                    if (containerRect) {
                        const left = activeRect.left - containerRect.left;
                        const width = activeRect.width;

                        animate(scope.current, { left, width }, { type: "spring", stiffness: 300, damping: 30 });
                    }
                }
            });
        };

        updateUnderline();
        window.addEventListener("resize", updateUnderline);

        return () => window.removeEventListener("resize", updateUnderline);
    }, [activeSection, hoveredSection, animate, scope]);

    return (
        <motion.nav
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border/20"
        >
            <div className="container mx-auto px-4 md:px-6 py-3 md:py-4">
                <div className="hidden lg:flex items-center justify-end">
                    <div
                        className="flex items-center space-x-1 mr-4 relative"
                        onMouseLeave={() => setHoveredSection(null)}
                    >
                        {navigationItems.map((item, index) => {
                            const isActive = activeSection === item.id
                            const isHovered = hoveredSection === item.id

                            return (
                                <div className="relative" key={item.id}>

                                    <motion.div
                                        key={item.id}
                                        initial={{ opacity: 0, y: -10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.3, delay: index * 0.05 }}
                                    >
                                        <Button
                                            key={item.id}
                                            ref={(el) => { navRefs.current[item.id] = el; }}
                                            variant={isActive || isHovered ? "default" : "ghost"}
                                            size="sm"
                                            onClick={() => handleNavigate(item.id)}
                                            onMouseEnter={() => setHoveredSection(item.id)}
                                            className={`transform relative transition-all duration-300 bg-transparent text-[var(--text)] cursor-pointer hover:bg-transparent hover:text-[var(--text-hover)] hover:scale-110
                                                ${isActive ? "shadow-md dark:shadow-[0_4px_6px_-1px_rgba(255,255,255,0.1)]" : ""}
                                            `}
                                        >
                                            {item.label}
                                        </Button>
                                    </motion.div>
                                </div>
                            )
                        })}
                        <motion.div
                            ref={scope}
                            className="absolute bottom-0 h-1 bg-primary rounded-full"
                            initial={{ left: 0, width: 0 }}
                        />
                    </div>

                    <button className="text-[var(--text)] cursor-pointer hover:scale-120 hover:text-[var(--text-hover)] " onClick={ToggleTheme} suppressHydrationWarning>
                        {resolvedTheme ? (
                            resolvedTheme === "light" ? <LuSun /> : <LuMoon />
                        ) : (
                            <div className="w-5 h-5" /> // empty box 
                        )}
                    </button>
                </div>

                <div className="flex lg:hidden items-center justify-between">
                    <div className="text-text font-semibold text-lg">Rohan</div>

                    <div className="flex items-center space-x-2">
                        <div className="text-text">
                            {resolvedTheme ? (
                                resolvedTheme === "light" ? <LuSun /> : <LuMoon />
                            ) : (
                                <div className="w-5 h-5" /> // empty box 
                            )}
                        </div>
                        <Button
                            variant="ghost"
                            size="sm"
                            className="text-text hover:bg-white/10"
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        >
                            {isMobileMenuOpen ? <MdClose className="w-5 h-5" /> : <MdMenu className="w-5 h-5" />}
                        </Button>
                    </div>
                </div>

                {isMobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="lg:hidden mt-4 pb-4 border-t border-border/20"
                    >
                        <div className="grid grid-cols-2 gap-2 mt-4">
                            {navigationItems.map((item) => {
                                const isActive = activeSection === item.id
                                return (
                                    <Button
                                        key={item.id}
                                        variant={isActive ? "default" : "ghost"}
                                        size="sm"
                                        className={`transition-all duration-300 ${isActive ? "bg-blue-500 shadow-md hover:bg-blue-700" : "hover:bg-white/10"}`}
                                        onClick={() => handleNavigate(item.id)}
                                    >
                                        {item.label}
                                    </Button>
                                )
                            })}
                        </div>
                    </motion.div>
                )}
            </div>
        </motion.nav>
    )
}
