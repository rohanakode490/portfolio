import { motion } from "framer-motion"
import { Card } from "../ui/card"
import { useState } from "react"
import { Button } from "../ui/button"
import { LuExternalLink, LuGithub } from "react-icons/lu"
import Link from "next/link"
import TechStack from "../tech-stack"

const projects = [
    {
        title: "FlowCatalyst",
        descritption: "No code Automation Platform.",
        image: "/p1.png",
        technologies: ["Next.js", "TypeScript", "Node.js", "Prisma", "PostgreSQL", "Turborepo"],
        github: "https://github.com/rohanakode490/FlowCatalyst",
        live: ""
    },
    {
        title: "EzCart - E-Commerce Platform",
        descritption: "Full-stack e-commerce solution with payment processing and admin dashboard.",
        image: "/p2.png",
        technologies: ["React.js", "TypeScript", "Node.js", "MongoDB", "Stripe"],
        github: "https://github.com/rohanakode490/EZCart",
        live: "https://ez-cart-frontend.vercel.app/"
    },
    {
        title: "Weather Dashboard",
        descritption: "Weather Application with location-based forecasts",
        image: "/p3.png",
        technologies: ["React.js", "OpenWeather API"],
        github: "https://github.com/rohanakode490/weather-web-app",
        live: "https://rohanakodeweatherwebapp.vercel.app/"
    },
]

export default function Projects() {
    const [hoveredProject, setHoveredProject] = useState<number | null>(null)

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
        >
            <h2 className="text-3xl font-bold text-foreground mb-8">Projects</h2>

            <div className="grid grid-cols-1 gap-4">
                {projects.map((project, index) => (
                    <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: index * 0.1 }}
                        className="group"
                        onHoverStart={() => setHoveredProject(index)}
                        onHoverEnd={() => setHoveredProject(null)}
                        viewport={{ once: true }}
                    >
                        <Card className="hover:shadow-md transition-all duration-300 overflow-hidden bg-transparent border-border/50">
                            <div className="flex flex-col sm:flex-row items-start sm:items-center p-4 md:p-5 gap-4">
                                <div className="w-full sm:w-24 h-48 sm:h-24 md:w-32 md:h-32 bg-muted/30 rounded-lg overflow-hidden relative flex-shrink-0">
                                    <motion.img
                                        src={project.image}
                                        alt={project.title}
                                        className="w-full h-full object-cover"
                                        animate={{ scale: hoveredProject === index ? 1.1 : 1 }}
                                        transition={{ duration: 0.3 }}
                                    />
                                </div>

                                <div className="flex-1 min-w-0">
                                    <div className="flex flex-col">
                                        <div className="flex justify-between items-start">
                                            <div className="flex-1 min-w-0">
                                                <h3 className="text-base md:text-lg font-bold text-card-foreground leading-tight truncate">
                                                    {project.title}
                                                </h3>
                                                <p className="text-xs md:text-sm text-muted-foreground mt-1 line-clamp-2">
                                                    {project.descritption}
                                                </p>
                                            </div>
                                            <div className="flex gap-1 ml-4 flex-shrink-0">
                                                <Button size="sm" variant="ghost" asChild className="w-8 h-8 p-0 cursor-pointer">
                                                    <Link href={project.github} target="_blank" rel="noopener noreferrer">
                                                        <LuGithub className="w-4 h-4" />
                                                    </Link>
                                                </Button>
                                                <Button size="sm" variant="ghost" asChild className="w-8 h-8 p-0 cursor-pointer">
                                                    <Link href={project.live} target="_blank" rel="noopener noreferrer">
                                                        <LuExternalLink className="w-4 h-4" />
                                                    </Link>
                                                </Button>
                                            </div>
                                        </div>
                                        <div className="flex flex-wrap gap-1 mt-3">
                                            <TechStack technologies={project.technologies} />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Card>
                    </motion.div>
                ))}
            </div>
        </motion.div>
    )
}