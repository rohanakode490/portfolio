import { motion } from "framer-motion";
import {
    Card,
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
        <div className="space-y-4 mt-4">
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
                            <Card className="hover:shadow-md transition-shadow duration-300 bg-transparent border-border/50 gap-0 py-0 overflow-hidden">
                                <div className="flex flex-col sm:flex-row items-start sm:items-center p-4 md:p-5 gap-4">
                                    <div className="w-16 h-16 sm:w-20 sm:h-20 bg-muted/30 rounded-lg overflow-hidden relative flex-shrink-0">
                                        <motion.img
                                            src={experience.image}
                                            alt={experience.company}
                                            className="w-full h-full object-cover"
                                            animate={{ scale: hoveredExperience === index ? 1.1 : 1 }}
                                            transition={{ duration: 0.3 }}
                                        />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <div className="flex flex-col">
                                            <h3 className="text-base md:text-lg font-bold text-card-foreground leading-tight">
                                                {experience.position}
                                            </h3>
                                            <p className="text-sm md:text-base font-medium text-primary mt-1">
                                                {experience.company}
                                            </p>

                                            <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs md:text-sm text-muted-foreground mt-2">
                                                <div className="flex items-center gap-1.5">
                                                    <LuCalendar className="h-4 w-4" />
                                                    <span>{experience.duration}</span>
                                                </div>
                                                <div className="flex items-center gap-1.5">
                                                    <LuMapPin className="h-4 w-4" />
                                                    <span>{experience.location}</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="px-4 md:px-5 pb-4 md:pb-5">
                                    <p className="text-muted-foreground text-xs md:text-sm mb-3">
                                        {experience.description}
                                    </p>

                                    <div className="flex flex-wrap gap-1">
                                        <TechStack
                                            technologies={experience.technologies}
                                            maxTech={5}
                                        />
                                    </div>
                                </div>
                            </Card>
                        </motion.div>
                    ))}
        </div>
    );
}