import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card"
import { useState } from "react"
import { Button } from "../ui/button"
import { LuExternalLink, LuGithub } from "react-icons/lu"
import Link from "next/link"
import { Badge } from "../ui/badge"

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
                        <Card className="hover:shadow-md transition-all duration-300 overflow-hidden bg-card/50 backdrop-blur-sm border-border/50">
                            <div className="flex">
                                <div className="w-24 h-24 bg-muted/30 rounded-l-lg overflow-hidden relative flex-shrink-0">
                                    <motion.img
                                        src={project.image}
                                        alt={project.title}
                                        className="w-full h-full object-cover"
                                        animate={{ scale: hoveredProject === index ? 1.1 : 1 }}
                                        transition={{ duration: 0.3 }}
                                    />
                                </div>

                                <div className="flex-1">
                                    <CardHeader className="pb-2">
                                        <div className="flex justify-between items-start">
                                            <div>
                                                <CardTitle className="text-lg text-card-foreground">{project.title}</CardTitle>
                                                <CardDescription className="text-sm mt-1">{project.descritption}</CardDescription>
                                            </div>
                                            <div className="flex gap-1 ml-4">
                                                <Button size="sm" variant="ghost" asChild className="w-8 h-8 p-0">
                                                    <Link href={project.github} target="_blank" rel="noopener noreferrer">
                                                        <LuGithub className="w-4 h-4" />
                                                    </Link>
                                                </Button>
                                                <Button size="sm" variant="ghost" asChild className="w-8 h-8 p-0">
                                                    <Link href={project.live} target="_blank" rel="noopener noreferrer">
                                                        <LuExternalLink className="w-4 h-4" />
                                                    </Link>
                                                </Button>
                                            </div>
                                        </div>
                                    </CardHeader>

                                    <CardContent className="pt-0">
                                        <div className="flex flex-wrap gap-1">
                                            {project.technologies.slice(0, 4).map((tech, i) => (
                                                <Badge key={i} variant="secondary" className="text-xs px-2 py-0.5">
                                                    {tech}
                                                </Badge>
                                            ))}
                                            {project.technologies.length > 4 && (
                                                <Badge variant="outline" className="text-xs px-2 py-0.5 cursor-pointer">
                                                    +{project.technologies.length - 4}
                                                </Badge>
                                            )}
                                        </div>
                                    </CardContent>
                                </div>
                            </div>
                        </Card>
                    </motion.div>
                ))}
            </div>
        </motion.div>
    )
}
