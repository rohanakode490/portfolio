import Contacts from "@/components/sections/contacts";
import Education from "@/components/sections/education";
import Navbar from "@/components/navbar";
import Projects from "@/components/sections/projects";
import Skills from "@/components/sections/skills";
import Profile from "@/components/sections/profile";
import Experience from "@/components/sections/experiece";

export default function Home() {
  return (
    <div>
      <Navbar />
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
  );
}
