import { motion } from "framer-motion"
import { Card, CardDescription, CardHeader, CardTitle } from "../ui/card"
import { LuCalendar, LuMapPin } from "react-icons/lu"

const education = [
    {
        institution: "Indian Institute of Technology Bhubaneswar",
        degree: "Bachelor of Technology in Computer Science and Engineering",
        duration: "2020 - 2024",
        location: "Bhubaneswar, IN",
    }
]

export default function Education() {
    return (
        <section id="education" className='scroll-mt-8'>
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
            >
                <h2 className="text-3xl font-bold text-foreground mb-8">Education</h2>

                <div className="space-y-4">
                    {education.map((edu, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            viewport={{ once: true }}
                        >
                            <Card className="hover:shadow-md transition-shadow duration-300 bg-card/50 backdrop-blur-sm border-border/50">
                                <div className="flex items-center">
                                    <div className="w-24 h-24 bg-muted/30 rounded-l-lg overflow-hidden relative flex-shrink-0 ">
                                        <motion.img
                                            src={'/uni.png'}
                                            alt={'IIT BBS'}
                                            className="w-full h-full object-cover"
                                            whileHover={{ scale: 1.1 }}
                                            transition={{ duration: 0.3 }}
                                        />
                                    </div>
                                    <div className="flex-1">
                                        <CardHeader className="pb-3">
                                            <CardTitle className="text-lg text-card-foreground">{edu.degree}</CardTitle>
                                            <CardDescription className="text-base font-medium text-primary">{edu.institution}</CardDescription>

                                            <div className="flex flex-wrap gap-3 text-sm text-muted-foreground">
                                                <div className="flex items-center gap-1">
                                                    <LuCalendar className="w-3 h-3" />
                                                    <span>{edu.duration}</span>
                                                </div>
                                                <div className="flex items-center gap-1">
                                                    <LuMapPin className="w-3 h-3" />
                                                    <span>{edu.location}</span>
                                                </div>
                                            </div>
                                        </CardHeader>
                                    </div>
                                </div>
                            </Card>
                        </motion.div>
                    ))}
                </div>
            </motion.div>
        </section>
    )
}
