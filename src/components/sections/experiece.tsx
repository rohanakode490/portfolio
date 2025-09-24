import { motion } from 'framer-motion'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card'
import { LuCalendar, LuMapPin } from 'react-icons/lu'
import { Badge } from '../ui/badge'

const experiences = [
    {
        company: "Freelance Project for a Cafe",
        position: "Full Stack Developer",
        duration: "June 2024 - Aug 2024",
        location: "Remote",
        description: "Created a user-friendly platform for item browsing and order placement within the app",
        technologies: ["React.js", "TypeScript", "Turborepo", "TailwindCSS", "PostgreSQL"]
    },
    {
        company: "TalentServe",
        position: "Software Engineer & General Management Intern",
        duration: "June 2023 - July 2023",
        location: "Remote",
        description: "Built HR tools including an anonymous feedback form and employee management app.",
        technologies: ["React.js", "Node.js", "MongoDB", "Express", "TypeScript", "TailwindCSS"]
    }
]

export default function Experience() {
    return (
        <section id='experience'>
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
            >
                <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-6 md:mb-8">Experience</h2>

                <div className="space-y-4">
                    {experiences.map((experience, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                        >
                            <Card className='hover:shadow-md transition-shadow duration-300 bg-card/50 backdrop-blur-sm border-border/50 gap-0'>
                                <CardHeader className='pb-3 p-4 md:p-6'>
                                    <CardTitle className='text-base md:text-lg text-card-foreground'>{experience.position}</CardTitle>
                                    <CardDescription className='text-sm md:text-base font-medium text-primary'>{experience.company}</CardDescription>

                                    <div className="flex flex-col sm:flex-row sm:flex-wrap gap-2 sm:gap-3 text-xs md:text-sm text-muted-foreground">
                                        <div className='flex items-center gap-1'>
                                            <LuCalendar className='h-3 w-3' />
                                            <span>{experience.duration}</span>
                                        </div>
                                        <div className="flex items-center gap-1">
                                            <LuMapPin className='h-3 w-3' />
                                            <span >{experience.location}</span>
                                        </div>
                                    </div>
                                </CardHeader>

                                <CardContent className='pt-0 p-4 md:p-6 md:pt-0'>
                                    <p className="text-muted-foreground text-xs md:text-sm mb-3">{experience.description}</p>

                                    <div className="flex flex-wrap gap-1">
                                        {experience.technologies.map((tech, index) => (
                                            <Badge key={index} variant="secondary" className='text-xs px-2 py-0.5'>
                                                {tech}
                                            </Badge>
                                        ))}
                                    </div>
                                </CardContent>
                            </Card>
                        </motion.div>
                    ))}
                </div>
            </motion.div>
        </section>
    )
}
