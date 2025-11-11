"use client"

import { motion } from "framer-motion"
import Education from "@/components/sections/education";
import Navbar from "@/components/navbar";
import Projects from "@/components/sections/projects";
import Skills from "@/components/sections/skills";
import Profile from "@/components/sections/profile";
import Experience from "@/components/sections/experiece";
import { useEffect, useState } from "react";
import { scrollToSection } from "@/lib/navigation"
import BackgroundElements from "@/components/background-elements";
import Footer from "@/components/footer";
import InitialLoadingScreen from "@/components/initial-loading-screen";

export default function Home() {
  const [activeSection, setActiveSection] = useState("experience")

  useEffect(() => {
    const handleScroll = () => {
      const sections = ["experience", "projects", "skills", "education"]
      const scrollPosition = window.scrollY + 200

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i]
        const element = document.getElementById(section)

        if (element) {
          const { offsetTop } = element
          if (scrollPosition >= offsetTop) {
            setActiveSection(section)
            break;
          }
        }
      }
    }

    let ticking = false;
    const throttledHandleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          handleScroll()
          ticking = false
        })
        ticking = true
      }
    }

    window.addEventListener("scroll", throttledHandleScroll)
    handleScroll()

    return () => window.removeEventListener("scroll", throttledHandleScroll)
  }, [])

  return (
    <>
      <InitialLoadingScreen />
      <div className="min-h-screen bg-background relative">
        <BackgroundElements />
        <Navbar activeSection={activeSection} onNavigate={scrollToSection} />
        <div className="flex flex-col lg:grid lg:grid-cols-2 min-h-screen pt-16 md:pt-20 relative z-10">
          <div className="p-6 md:p-6 lg:p-8 flex items-start justify-start lg:sticky lg:top-20 lg:h-[50vh]">
            <Profile />
          </div>
          <div className="p-4 md:p-6">
            <main className="min-h-screen overflow-hidden">
              <div className="space-y-8 md:space-y-10 lg:space-y-12 pr-0 md:pr-2 lg:pr-4">
                <motion.div
                  id="experience"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                  viewport={{ once: true }}
                >
                  <Experience />
                </motion.div>
                <motion.div
                  id="projects"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.1 }}
                  viewport={{ once: true }}
                >
                  <Projects />
                </motion.div>
                <motion.div
                  id="skills"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  viewport={{ once: true }}
                >
                  <Skills />
                </motion.div>
                <motion.div
                  id="education"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                  viewport={{ once: true }}
                >
                  <Education />
                </motion.div>
              </div>
            </main>
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
}
