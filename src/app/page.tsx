"use client"

import Contacts from "@/components/sections/contacts";
import Education from "@/components/sections/education";
import Navbar from "@/components/navbar";
import Projects from "@/components/sections/projects";
import Skills from "@/components/sections/skills";
import Profile from "@/components/sections/profile";
import Experience from "@/components/sections/experiece";
import { useEffect, useState } from "react";
import BackgroundElements from "@/components/background-elements";

export default function Home() {
  const [activeSection, setActiveSection] = useState("experience")

  useEffect(() => {
    const handleScroll = () => {
      const sections = ["experience", "projects", "skills", "education", "contact"]
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

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      const rect = element.getBoundingClientRect()
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop
      const offsetTop = rect.top + scrollTop - 100

      window.scrollTo({
        top: offsetTop,
        behavior: "smooth"
      })
    }
  }

  return (
    <>
      <div className="min-h-screen bg-background relative">
        <BackgroundElements />

        <Navbar activeSection={activeSection} onNavigate={scrollToSection} />
        Main Page
        <div>
          <div>
            <Profile />
          </div>
          <div>
            <Experience />
            <Projects />
            <Skills />
            <Education />
            <Contacts />
          </div>
        </div>
      </div>
    </>
  );
}
