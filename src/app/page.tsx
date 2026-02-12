"use client"

import { motion } from "framer-motion"
import Education from "@/components/sections/education";
import Navbar from "@/components/navbar";
import Projects from "@/components/sections/projects";
import Skills from "@/components/sections/skills";
import Profile from "@/components/sections/profile";
import Experience from "@/components/sections/experiece";
import OpenSource from "@/components/sections/open-source";
import { useEffect, useState, Suspense } from "react";
import { scrollToSection } from "@/lib/navigation"
import BackgroundElements from "@/components/background-elements";
import Footer from "@/components/footer";
import InitialLoadingScreen from "@/components/initial-loading-screen";

export default function Home() {
  const [activeSection, setActiveSection] = useState("experience")
  const [activeTab, setActiveTab] = useState("experience")

  // Sync tab state with URL hash and handle initial scroll
  useEffect(() => {
    const handleHashChange = () => {
      const fullHash = window.location.hash.replace("#", "")
      const [hash] = fullHash.split("?")
      
      if (["experience", "education"].includes(hash)) {
        setActiveTab(hash)
        setTimeout(() => scrollToSection("experience-education"), 100)
      } else if (hash) {
        setTimeout(() => scrollToSection(hash), 100)
      }
    }
    
    handleHashChange()
    
    window.addEventListener("hashchange", handleHashChange)
    return () => window.removeEventListener("hashchange", handleHashChange)
  }, [])

  // Scroll Spy for Navbar highlight
  useEffect(() => {
    const handleScroll = () => {
      const sections = ["experience-education", "projects", "skills", "opensource"]
      const scrollPosition = window.scrollY + 200

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i]
        const element = document.getElementById(section)
        if (element && scrollPosition >= element.offsetTop) {
          setActiveSection(section === "experience-education" ? activeTab : section)
          break;
        }
      }
    }

    window.addEventListener("scroll", handleScroll)
    handleScroll()
    return () => window.removeEventListener("scroll", handleScroll)
  }, [activeTab])

  const handleNavigate = (section: string) => {
    if (["experience", "education"].includes(section)) setActiveTab(section)
    scrollToSection(section === "experience" || section === "education" ? "experience-education" : section)
  }

  return (
    <>
      <InitialLoadingScreen />
      <div className="min-h-screen bg-background relative">
        <BackgroundElements />
        <Navbar activeSection={activeSection} onNavigate={handleNavigate} />
        <div className="flex flex-col lg:grid lg:grid-cols-2 min-h-screen pt-16 md:pt-20 relative z-10">
          <div className="p-4 md:p-6 lg:p-8 flex items-start justify-center lg:sticky lg:top-24 lg:h-fit">
            <div className="w-full max-w-lg"><Profile /></div>
          </div>
          <div className="p-4 md:p-6">
            <main className="min-h-screen overflow-hidden space-y-8 md:space-y-12 pr-0 md:pr-4">
              <motion.div id="experience-education" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="bg-card/30 backdrop-blur-md rounded-3xl p-5 md:p-8 border border-border/40 shadow-sm scroll-mt-28">
                <div className="w-full flex items-center justify-around gap-4 mb-6 border-b border-border/50 pb-2">
                  {["experience", "education"].map(tab => (
                    <button key={tab} onClick={() => setActiveTab(tab)} className={`text-lg font-bold transition-colors relative cursor-pointer capitalize ${activeTab === tab ? "text-foreground" : "text-muted-foreground hover:text-foreground"}`}>
                      {tab} {activeTab === tab && <motion.div layoutId="activeTab" className="absolute -bottom-[9px] left-0 right-0 h-0.5 bg-primary" />}
                    </button>
                  ))}
                </div>
                {activeTab === "experience" ? <Experience /> : <Education />}
              </motion.div>

              {[
                { id: "projects", component: <Projects /> },
                { id: "skills", component: <Skills /> },
                { 
                  id: "opensource", 
                  component: (
                      <OpenSource />
                  ) 
                },
              ].map(section => (
                <motion.div key={section.id} id={section.id} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="bg-card/30 backdrop-blur-md rounded-3xl p-5 md:p-8 border border-border/40 shadow-sm scroll-mt-28">
                  {section.component}
                </motion.div>
              ))}
            </main>
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
}
