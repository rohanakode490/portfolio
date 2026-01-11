import { motion } from "framer-motion";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "../ui/card";
import { LuCalendar, LuMapPin } from "react-icons/lu";
import TechStack from "../tech-stack";
import { useState } from "react";

const experiences = [
    {
        company: "Freelance Project for a Cafe",
        image: "/exp1.png",
        position: "Full Stack Developer",
        duration: "June 2024 - Aug 2024",
        location: "Remote",
        description:
            "Created a user-friendly platform for item browsing and order placement within the app",
        technologies: [
            "React.js",
            "TypeScript",
            "Turborepo",
            "TailwindCSS",
            "PostgreSQL",
        ],
    },
    {
        company: "TalentServe",
        image: "/exp2.png",
        position: "Software Engineer & General Management Intern",
        duration: "June 2023 - July 2023",
        location: "Remote",
        description:
            "Built HR tools including an anonymous feedback form and employee management app.",
        technologies: [
            "React.js",
            "Node.js",
            "MongoDB",
            "Express",
            "TypeScript",
            "TailwindCSS",
        ],
    },
];

export default function Experience() {
    const [hoveredExperience, setHoveredExperience] = useState<number | null>(
        null,
    );
    return (
        <section id="experience">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
            >
                <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-6 md:mb-8">
                    Experience
                </h2>

                <div className="space-y-4">
                    {experiences.map((experience, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            onHoverStart={() => setHoveredExperience(index)}
                            onHoverEnd={() => setHoveredExperience(null)}
                            viewport={{ once: true }}
                        >
                            <Card className="hover:shadow-md transition-shadow duration-300 bg-card/50 backdrop-blur-sm border-border/50 gap-0 py-2">
                                <div className="flex items-center">
                                    <div className="w-24 h-24 bg-muted/30 rounded-lg overflow-hidden relative flex-shrink-0 ml-6">
                                        <motion.img
                                            src={experience.image}
                                            alt={experience.company}
                                            className="w-full h-full object-cover"
                                            animate={{ scale: hoveredExperience === index ? 1.1 : 1 }}
                                            transition={{ duration: 0.3 }}
                                        />
                                    </div>
                                    <div className="flex-1">
                                        <CardHeader className="pb-3 p-4 md:p-6">
                                            <CardTitle className="text-base md:text-lg text-card-foreground">
                                                {experience.position}
                                            </CardTitle>
                                            <CardDescription className="text-sm md:text-base font-medium text-primary">
                                                {experience.company}
                                            </CardDescription>

                                            <div className="flex flex-col sm:flex-row sm:flex-wrap gap-2 sm:gap-3 text-xs md:text-sm text-muted-foreground py-1">
                                                <div className="flex justify-center items-center gap-1">
                                                    <LuCalendar className="h-5 w-5" />
                                                    <span>{experience.duration}</span>
                                                </div>
                                                <div className="flex justify-center items-center gap-1">
                                                    <LuMapPin className="h-5 w-5" />
                                                    <span>{experience.location}</span>
                                                </div>
                                            </div>
                                        </CardHeader>
                                    </div>
                                </div>
                                <CardContent className="pt-0 p-4 md:p-6 md:pt-0">
                                    <p className="text-muted-foreground text-xs md:text-sm mb-3">
                                        {experience.description}
                                    </p>

                                    <div className="flex flex-wrap gap-1">
                                        <TechStack
                                            technologies={experience.technologies}
                                            maxTech={5}
                                        />
                                    </div>
                                </CardContent>
                            </Card>
                        </motion.div>
                    ))}
                </div>
            </motion.div>
        </section>
    );
}
