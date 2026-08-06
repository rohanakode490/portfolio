import { motion } from "framer-motion";
import {
    Card,
} from "../ui/card";
import { LuCalendar, LuMapPin, LuChevronDown, LuChevronUp } from "react-icons/lu";
import TechStack from "../tech-stack";
import { useState } from "react";

const experiences = [
    {
        company: "VRKAA",
        image: "/exp3.png",
        position: "Software Engineer",
        duration: "August 2025 - Present",
        location: "Remote",
        description: [
            "Engineered and deployed an end-to-end coupon management platform supporting coupon generation, validation, redemption, and usage tracking, powering promotional campaigns across institutes including IIT Bhubaneswar and IIT Bombay and facilitating engagement for 100+ users.",
            "Designed and implemented a purchase-based loyalty rewards system, automating point accrual and redemption workflows and successfully processing hundreds of customer reward transactions.",
            "Maintained and enhanced customer-facing and administrative applications serving 10,000+ users, delivering new features, resolving production issues, and improving overall platform stability.",
            "Streamlined development across customer and admin portals by managing a Turborepo monorepo architecture, enabling shared code reuse and reducing duplication across applications.",
            "Developed full-stack e-commerce functionality using the PERN stack, while monitoring and supporting production services deployed on Vercel and Dockerized backend infrastructure with Prometheus."
        ],
        technologies: [
            "React.js",
            "Node.js",
            "Express",
            "PostgreSQL",
            "TypeScript",
            "Turborepo",
            "Docker",
            "Prometheus",
            "Vercel",
        ],
    },
    {
        company: "Freelance Project for a Cafe",
        image: "/exp1.png",
        position: "Full Stack Developer",
        duration: "June 2024 - Aug 2024",
        location: "Remote",
        description: [
            "Created a user-friendly platform for item browsing and order placement within the app"
        ],
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
        description: [
            "Built HR tools including an anonymous feedback form and employee management app."
        ],
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
    const [expanded, setExpanded] = useState<Record<number, boolean>>({});

    const toggleExpand = (index: number) => {
        setExpanded(prev => ({
            ...prev,
            [index]: !prev[index]
        }));
    };

    return (
        <div className="space-y-4 mt-4">
            {experiences.map((experience, index) => {
                const hasMultiplePoints = experience.description.length > 1;
                const isExpanded = !!expanded[index];
                const visiblePoints = isExpanded 
                    ? experience.description 
                    : experience.description.slice(0, 1);

                return (
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
                                <ul className="list-disc pl-5 space-y-1.5 text-muted-foreground text-xs md:text-sm mb-3">
                                    {visiblePoints.map((desc, i) => (
                                        <li key={i} className="leading-relaxed">{desc}</li>
                                    ))}
                                </ul>

                                {hasMultiplePoints && (
                                    <button
                                        onClick={() => toggleExpand(index)}
                                        className="flex items-center gap-1 text-xs md:text-sm text-primary hover:text-primary/80 transition-colors font-medium cursor-pointer mb-3"
                                    >
                                        {isExpanded ? (
                                            <>
                                                Show less <LuChevronUp className="w-4 h-4" />
                                            </>
                                        ) : (
                                            <>
                                                Show more ({experience.description.length - 1} more) <LuChevronDown className="w-4 h-4" />
                                            </>
                                        )}
                                    </button>
                                )}

                                <div className="flex flex-wrap gap-1">
                                    <TechStack
                                        technologies={experience.technologies}
                                        maxTech={5}
                                    />
                                </div>
                            </div>
                        </Card>
                    </motion.div>
                );
            })}
        </div>
    );
}
