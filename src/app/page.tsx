"use client"

import { motion } from "framer-motion"
import Education from "@/components/sections/education";
import Navbar from "@/components/navbar";
import Projects from "@/components/sections/projects";
import Skills from "@/components/sections/skills";
import Profile from "@/components/sections/profile";
import Experience from "@/components/sections/experiece";
import OpenSource from "@/components/sections/open-source";
import { useEffect, useState } from "react";
import { scrollToSection } from "@/lib/navigation"
import BackgroundElements from "@/components/background-elements";
import Footer from "@/components/footer";
import InitialLoadingScreen from "@/components/initial-loading-screen";

export default function Home() {
  const [activeSection, setActiveSection] = useState("experience")
  const [activeTab, setActiveTab] = useState("experience")

  useEffect(() => {
    const handleScroll = () => {
      const sections = ["experience-education", "projects", "skills", "opensource"]
      const scrollPosition = window.scrollY + 200

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i]
        const element = document.getElementById(section)

        if (element) {
          const { offsetTop } = element
          if (scrollPosition >= offsetTop) {
            if (section === "experience-education") {
              setActiveSection(activeTab)
            } else {
              setActiveSection(section)
            }
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
  }, [activeTab])

  const handleNavigate = (section: string) => {
    if (section === "experience" || section === "education") {
      setActiveTab(section)
      scrollToSection("experience-education")
    } else {
      scrollToSection(section)
    }
  }

  return (
    <>
      <InitialLoadingScreen />
      <div className="min-h-screen bg-background relative">
        <BackgroundElements />
        <Navbar activeSection={activeSection} onNavigate={handleNavigate} />
        <div className="flex flex-col lg:grid lg:grid-cols-2 min-h-screen pt-16 md:pt-20 relative z-10">
          <div className="p-4 md:p-6 flex items-start justify-center lg:sticky lg:h-fit">
            <div className="w-full max-w-lg">
              <Profile />
            </div>
          </div>
          <div className="p-4 md:p-6">
            <main className="min-h-screen overflow-hidden">
              <div className="space-y-8 md:space-y-10 lg:space-y-12 pr-0 md:pr-2 lg:pr-4">
                <motion.div
                  id="experience-education"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                  viewport={{ once: true }}
                  className="bg-card/30 backdrop-blur-md rounded-3xl p-5 md:p-8 border border-border/40 shadow-sm"
                >
                  <div className="w-full flex items-center justify-around gap-4 mb-6 border-b border-border/50 pb-2">
                    <button 
                      onClick={() => setActiveTab("experience")}
                      className={`text-lg font-bold transition-colors relative cursor-pointer ${activeTab === "experience" ? "text-foreground" : "text-muted-foreground hover:text-foreground"}`}
                    >
                      Experience
                      {activeTab === "experience" && (
                        <motion.div layoutId="activeTab" className="absolute -bottom-[9px] left-0 right-0 h-0.5 bg-primary" />
                      )}
                    </button>
                    <button 
                      onClick={() => setActiveTab("education")}
                      className={`text-lg font-bold transition-colors relative cursor-pointer ${activeTab === "education" ? "text-foreground" : "text-muted-foreground hover:text-foreground"}`}
                    >
                      Education
                      {activeTab === "education" && (
                        <motion.div layoutId="activeTab" className="absolute -bottom-[9px] left-0 right-0 h-0.5 bg-primary" />
                      )}
                    </button>
                  </div>

                  {activeTab === "experience" ? <Experience /> : <Education />}
                </motion.div>
                <motion.div
                  id="projects"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.1 }}
                  viewport={{ once: true }}
                  className="bg-card/30 backdrop-blur-md rounded-3xl p-5 md:p-8 border border-border/40 shadow-sm"
                >
                  <Projects />
                </motion.div>
                <motion.div
                  id="skills"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  viewport={{ once: true }}
                  className="bg-card/30 backdrop-blur-md rounded-3xl p-5 md:p-8 border border-border/40 shadow-sm"
                >
                  <Skills />
                </motion.div>
                <motion.div
                  id="opensource"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                  viewport={{ once: true }}
                  className="bg-card/30 backdrop-blur-md rounded-3xl p-5 md:p-8 border border-border/40 shadow-sm"
                >
                  <h2 className="text-3xl font-bold text-foreground mb-6">Open-Source Contributions</h2>
                  <OpenSource />
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
