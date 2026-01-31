import { motion } from "framer-motion";
import { Card } from "../ui/card";
import { LuCalendar, LuMapPin } from "react-icons/lu";

const education = [
    {
        institution: "Indian Institute of Technology Bhubaneswar",
        degree: "Bachelor of Technology in Computer Science and Engineering",
        duration: "2020 - 2024",
        location: "Bhubaneswar, IN",
    },
];

export default function Education() {
    return (
        <section id="education" className="scroll-mt-8">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
            >

                <div className="space-y-4">
                    {education.map((edu, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            viewport={{ once: true }}
                        >
                            <Card className="hover:shadow-md transition-shadow duration-300 bg-transparent border-border/50 overflow-hidden">
                                <div className="flex flex-col sm:flex-row items-start sm:items-center p-4 md:p-5 gap-4">
                                    <div className="w-16 h-16 sm:w-20 sm:h-20 bg-muted/30 rounded-lg overflow-hidden relative flex-shrink-0 ">
                                        <motion.img
                                            src={"/uni.png"}
                                            alt={"IIT BBS"}
                                            className="w-full h-full object-cover"
                                            whileHover={{ scale: 1.1 }}
                                            transition={{ duration: 0.3 }}
                                        />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <div className="flex flex-col">
                                            <h3 className="text-base md:text-lg font-bold text-card-foreground leading-tight">
                                                {edu.degree}
                                            </h3>
                                            <p className="text-sm md:text-base font-medium text-primary mt-1">
                                                {edu.institution}
                                            </p>

                                            <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs md:text-sm text-muted-foreground mt-2">
                                                <div className="flex items-center gap-1.5">
                                                    <LuCalendar className="w-4 h-4" />
                                                    <span>{edu.duration}</span>
                                                </div>
                                                <div className="flex items-center gap-1.5">
                                                    <LuMapPin className="w-4 h-4" />
                                                    <span>{edu.location}</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </Card>
                        </motion.div>
                    ))}
                </div>
            </motion.div>
        </section>
    );
}
