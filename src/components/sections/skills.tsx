import { motion } from 'framer-motion'
import { BsDatabaseFill } from 'react-icons/bs'
import { SiCss3, SiDocker, SiExpress, SiGit, SiHtml5, SiKubernetes, SiMongodb, SiMysql, SiNextdotjs, SiNodedotjs, SiPostgresql, SiReact, SiTailwindcss } from 'react-icons/si'
import { Card, CardDescription, CardHeader, CardTitle } from '../ui/card'
import { Badge } from '../ui/badge'

const techStack = [
    { name: "HTML", icon: <SiHtml5 className='group-hover:text-[#E34F26]' /> },
    { name: "CSS", icon: <SiCss3 className='group-hover:text-[#663399]' /> },
    { name: "TailwindCSS", icon: <SiTailwindcss className='group-hover:text-[#06B6D4]' /> },
    { name: "React.js", icon: <SiReact className='group-hover:text-[#61DAFB]' /> },
    { name: "Next.js", icon: <SiNextdotjs className='group-hover:text-[#fff]' /> },
    { name: "Framer Motion", icon: <svg role="img" viewBox="0 0 200 54" xmlns="http://www.w3.org/2000/svg" className="sm:group-hover:-translate-y-1 size-6 transition-all duration-300 undefined w-12 h-12 pl-2 rounded-xl group-hover:text-[#000] group-hover:bg-[#FFF42B]"><title>Framer Motion</title><path fill="currentColor" d="M 58.148 0 L 27.72 53.952 L 0 53.952 L 23.759 11.824 C 27.442 5.294 36.633 0 44.288 0 Z M 126.125 13.488 C 126.125 6.039 132.33 0 139.985 0 C 147.64 0 153.845 6.039 153.845 13.488 C 153.845 20.937 147.64 26.976 139.985 26.976 C 132.33 26.976 126.125 20.937 126.125 13.488 Z M 63.345 0 L 91.065 0 L 60.638 53.952 L 32.918 53.952 Z M 96.085 0 L 123.805 0 L 100.046 42.128 C 96.363 48.659 87.172 53.952 79.517 53.952 L 65.657 53.952 Z" /></svg> },
    { name: "Node.js", icon: <SiNodedotjs className='group-hover:text-[#5FA04E]' /> },
    { name: "Express", icon: <SiExpress className='group-hover:text-[#fff]' /> },
    { name: "MySQL", icon: <SiMysql className='group-hover:text-[#4479A1]' /> },
    { name: "PostgreSQL", icon: <SiPostgresql className='group-hover:text-[#4169E1]' /> },
    { name: "PLSQL", icon: <BsDatabaseFill className='group-hover:text-[#FF0808]' /> },
    { name: "MongoDb", icon: <SiMongodb className='group-hover:text-[#47A248]' /> },
    { name: "Docker", icon: <SiDocker className='group-hover:text-[#2496ED]' /> },
    { name: "Kubernetes", icon: <SiKubernetes className='group-hover:text-[#326CE5]' /> },
    { name: "Git", icon: <SiGit className='group-hover:text-[#F05032]' /> },
]

export default function Skills() {
    return (
        <section id='skills' className='scroll-mt-8'>
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
            >
                <h2 className="text-3xl font-bold text-foreground mb-8">Tech Stack</h2>

                <Card className='bg-card/50 backdrop-blur-sm border-border/50'>
                    <CardHeader>
                        <CardTitle className='text-xl text-card-foreground'>Technologies & Tools</CardTitle>
                    </CardHeader>
                    <CardDescription>
                        <div className="grid grid-cols-5 gap-0">
                            {techStack.map((tech, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, scale: 0.8 }}
                                    whileInView={{ opacity: 1, scale: 1 }}
                                    transition={{ duration: 0.2 }}
                                    whileHover={{ scale: 1.1, y: -5 }}
                                    className='relative flex flex-col items-center p-4 m-4 rounded-lg hover:bg-accent/30 transition-colors cursor-pointer group'
                                >
                                    <div className="text-4xl mb-2 group-hover:scale-110 transition-transform group">{tech.icon}</div>

                                    <Badge variant="secondary"
                                        className='absolute -bottom-2 left-1/2 transform -translate-x-1/2 font-semibold px-2 py-1 rounded text-xs whitespace-nowrap z-10 shadow-md'
                                    >
                                        {tech.name}
                                    </Badge>
                                </motion.div>
                            ))}
                        </div>
                    </CardDescription>
                </Card>
            </motion.div>

        </section>
    )
}
