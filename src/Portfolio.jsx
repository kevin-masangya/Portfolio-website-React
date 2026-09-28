import "./index.css";
import Keyframes from "./components/Keyframes.jsx";
import Navbar from "./components/Navbar.jsx";
import Hero from "./components/Hero.jsx";
import About from "./components/About.jsx";
import Projects from "./components/Projects.jsx";
import Experience from "./components/Experience.jsx";
import Contact from "./components/Contacts.jsx";
import Footer from "./components/Footer.jsx";

export default function Portfolio() {
  return (
    <div className="bg-[#0B0E14] text-[#E9EDF2] font-sans min-h-screen">
      <Keyframes />
      <Navbar />
      <Hero />
      <About />
      <Projects />
      <Experience />
      <Contact />
      <Footer />
    </div>
  );
}