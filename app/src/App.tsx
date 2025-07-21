
import { useEffect, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import DeepSeaFishesVideo from "./assets/deep-sea-fishes.mp4";
import BgFallbackImage from "./assets/deep-sea-fishes.png";

const dummyProjects = [
  {
    title: "Project One",
    desc: "Brief description of the project. Tech stack. Link or demo.",
  },
  {
    title: "Project Two",
    desc: "Another cool project with a different stack. Demo coming soon.",
  },
  {
    title: "AI Portfolio",
    desc: "A portfolio powered by AI, built with Next.js and OpenAI API.",
  },
  {
    title: "Design System",
    desc: "Reusable UI components and tokens for rapid prototyping.",
  },
  {
    title: "Motion Gallery",
    desc: "A gallery of animated UI elements using Framer Motion.",
  },
  {
    title: "Startup Landing",
    desc: "Landing page template for SaaS startups, built with Vite.",
  },
];


const codeSnippet = [
  { line: "import React from 'react';", area: "frontend" },
  { line: "import { PrismaClient } from '@prisma/client';", area: "frontend" },
  { line: "const prisma = new PrismaClient();", area: "frontend" },
  { line: "", area: "frontend" },
  { line: "export default function MyComponent() {", area: "frontend" },
  { line: "  const [data, setData] = React.useState([]);", area: "frontend" },
  { line: "", area: "frontend" },
  { line: "  React.useEffect(() => {", area: "frontend" },
  { line: "    fetch('/api/users')", area: "backend" },
  { line: "      .then(res => res.json())", area: "backend" },
  { line: "      .then(setData);", area: "backend" },
  { line: "  }, []);", area: "frontend" },
  { line: "", area: "frontend" },
  { line: "  // ...", area: "frontend" },
  { line: "  prisma.user.findMany();", area: "database" },
  { line: "  // ...", area: "frontend" },
  { line: "  return <div>{data.length}</div>;", area: "frontend" },
  { line: "}", area: "frontend" },
];

const areaList = [
  { label: "Frontend (React)", key: "frontend" },
  { label: "Backend & APIs", key: "backend" },
  { label: "Databases", key: "database" },
];

export default function App() {
  // Detect if device is mobile
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.matchMedia('(max-width: 768px)').matches);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);
  useEffect(() => {
    document.title = "My Portfolio";
  }, []);


  const { scrollY } = useScroll();
  // Animate video opacity on scroll
  const videoOpacity = useTransform(scrollY, [0, 300], [1, 0]);
  // Animate hero text scale and y position on scroll
  const heroScale = useTransform(scrollY, [0, 300], [1, 0.5]);
  const heroY = useTransform(scrollY, [0, 300], [0, -40]);
  // Animate subtitle opacity
  const subtitleOpacity = useTransform(scrollY, [0, 300], [1, 0]);
  // Animate scroll indicator button opacity
  const scrollBtnOpacity = useTransform(scrollY, [0, 120], [1, 0]);


  // Interactive code/area highlight state
  // areaHighlight: 'frontend' | 'backend' | 'database' | null
  const [areaHighlight, setAreaHighlight] = useState<string | null>(null);
  const [hoveredLine, setHoveredLine] = useState<number | null>(null);

  // Timeline progress bar state
  const [progress, setProgress] = useState(0);
  const [showTimeline, setShowTimeline] = useState(false);
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.body.scrollHeight - window.innerHeight;
      const percent = docHeight > 0 ? Math.min(1, scrollTop / docHeight) : 0;
      setProgress(percent);
      // Show timeline only after hero section (e.g., after 80vh)
      setShowTimeline(scrollTop > window.innerHeight * 0.8);
    };
    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <main className="min-h-screen bg-neutral-950 text-white relative overflow-x-hidden">
      {/* Timeline Progress Bar (appears after hero section) */}
      {showTimeline && (
        <div className="fixed right-6 top-1/2 -translate-y-1/2 z-50 flex flex-col items-center" style={{height: '60vh'}}>
          <div className="relative h-full w-2 bg-white/10 rounded-full overflow-hidden shadow-lg">
            <div
              className="absolute left-0 top-0 w-full bg-gradient-to-b from-blue-400 via-cyan-300 to-purple-400 rounded-full shadow-lg transition-all"
              style={{ height: `${Math.max(8, progress * 100)}%`, minHeight: 8 }}
            />
          </div>
          <span className="mt-2 text-xs text-white/60 tracking-wide" style={{textShadow: '0 1px 4px rgba(0,0,0,0.12)'}}>
            {Math.round(progress * 100)}%
          </span>
        </div>
      )}
      {/* Hero Section with Background Video */}

      <section className="relative h-screen flex flex-col justify-center items-center text-center p-6">
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0">
          {/* Show fallback image only on mobile, video otherwise */}
          {isMobile ? (
            <img
              src={BgFallbackImage}
              alt="Background fallback"
              className="w-full h-full object-cover absolute top-0 left-0 z-0 pointer-events-none select-none"
              style={{
                display: 'block',
                opacity: 0.7,
              }}
            />
          ) : (
            <motion.video
              src={DeepSeaFishesVideo}
              autoPlay
              loop
              muted
              playsInline
              poster={BgFallbackImage}
              className="w-full h-[calc(100%+100px)] object-cover relative z-10"
              style={{
                opacity: videoOpacity,
                marginTop: "-50px",
                marginBottom: "-50px",
              }}
            />
          )}
        </div>
        <div className="relative z-10 flex flex-col items-center">
          <motion.h1
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            style={{ scale: heroScale, y: heroY }}
            className="text-5xl md:text-7xl font-bold"
          >
            Hi, I'm Miguel
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            style={{ opacity: subtitleOpacity }}
            className="mt-4 text-xl text-neutral-300"
          >
            Creative Developer & UI Enthusiast
          </motion.p>
        </div>
        <div className="absolute inset-0 bg-black/10 z-0" />
        {/* Scroll Indicator Button */}
        <motion.button
          style={{ opacity: scrollBtnOpacity }}
          onClick={() => {
            window.scrollTo({
              top: window.innerHeight,
              behavior: "smooth",
            });
          }}
          aria-label="Scroll to Projects"
          className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 text-white rounded-full p-2 shadow-lg transition-all"
        >
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-chevron-down animate-bounce">
            <polyline points="6 9 12 15 18 9" />
          </svg>
        </motion.button>
      </section>

      {/* Interactive Code/Area Showcase Section */}
      <section className="w-full max-w-6xl mx-auto mb-20 px-2 md:px-0">
        <h2 className="w-full text-3xl md:text-4xl font-bold mb-8 text-center flex items-center justify-center gap-2">
          I <span role="img" aria-label="love" className="text-red-400">❤️</span> code
        </h2>
        <div className="flex flex-col md:flex-row gap-8 items-stretch">
          {/* Code Snippet Column */}
          <div className="flex-1 bg-neutral-900 border border-white/10 shadow-lg p-6 font-mono text-sm rounded-xl min-w-[320px] relative overflow-x-auto">
            <div className="mb-4 text-xs text-cyan-300 font-semibold tracking-wide">Fullstack Example</div>
            <pre className="m-0 p-0 bg-transparent text-white">
              {codeSnippet.map((item, idx) => {
                // Highlight logic
                let highlight = false;
                if (hoveredLine === idx) highlight = true;
                else if (areaHighlight === 'backend' && item.area === 'backend') highlight = true;
                else if (areaHighlight === 'database' && item.area === 'database') highlight = true;
                return (
                  <div
                    key={idx}
                    className={`transition-all duration-200 px-2 py-1 rounded-md cursor-pointer ${highlight ? 'bg-cyan-900/40' : ''}`}
                    onMouseEnter={() => {
                      setHoveredLine(idx);
                      if (item.area !== 'frontend') setAreaHighlight(item.area);
                    }}
                    onMouseLeave={() => {
                      setHoveredLine(null);
                      setAreaHighlight(null);
                    }}
                    style={{
                      background: highlight ? 'linear-gradient(90deg, #22d3ee22 0%, #818cf822 100%)' : 'none',
                      color: highlight ? '#67e8f9' : undefined,
                      fontWeight: highlight ? 600 : 400,
                    }}
                  >
                    {item.line}
                  </div>
                );
              })}
            </pre>
          </div>
          {/* Area List Column */}
          <div className="flex-1 flex flex-col justify-center gap-4 min-w-[220px]">
            <div className="mb-2 text-xs text-neutral-400 font-semibold tracking-wide uppercase">Areas</div>
            {areaList.map((area) => (
              <button
                key={area.key}
                className={`w-full text-left px-4 py-3 border-2 transition-all duration-200 font-semibold text-lg rounded-lg ${areaHighlight === area.key ? 'border-cyan-400 bg-cyan-900/30 text-cyan-200 shadow-lg' : 'border-white/10 bg-white/5 text-white/80 hover:bg-cyan-900/10 hover:text-cyan-200'}`}
                onClick={() => {
                  // Clicking Frontend: highlight nothing, Backend: highlight fetch, Database: highlight prisma
                  if (area.key === 'frontend') setAreaHighlight(null);
                  else setAreaHighlight(area.key);
                }}
                onMouseEnter={() => setAreaHighlight(area.key)}
                onMouseLeave={() => setAreaHighlight(null)}
                style={{
                  outline: areaHighlight === area.key ? '2px solid #22d3ee' : 'none',
                  outlineOffset: 2,
                }}
              >
                {area.label}
              </button>
            ))}
          </div>
        </div>
      </section>


      {/* Education & Experience Section */}
      <section className="w-full max-w-4xl mx-auto px-4 py-16">
        <h2 className="text-3xl md:text-4xl font-bold mb-10 text-center">Education & Experience</h2>
        <div className="flex flex-col gap-6">
          {/* Education */}
          <motion.div
            whileHover={{ scale: 1.03, boxShadow: "0 8px 32px 0 rgba(31,38,135,0.18)", borderColor: "#38bdf8" }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            className="group cursor-pointer relative min-w-[260px] max-w-xl flex flex-col p-6 border-2 border-white/10 bg-white/5 hover:bg-white/10 transition-all duration-300 shadow-lg"
            style={{ borderRadius: 0 }}
          >
            <div className="flex-1">
              <a href="https://www.uc.pt/en/" target="_blank" rel="noopener noreferrer" className="text-cyan-300 font-semibold text-lg hover:underline">Master Degree on Computer Science</a>
              <span className="block text-neutral-400 text-sm mt-1">2015</span>
            </div>
            {/* Animated border effect */}
            <span className="absolute left-0 bottom-0 w-0 h-1 bg-gradient-to-r from-cyan-400 to-blue-500 transition-all duration-300 group-hover:w-full" />
          </motion.div>
          {/* Experience */}
          <div className="flex flex-col gap-4 mt-4">
            <motion.div
              whileHover={{ scale: 1.03, boxShadow: "0 8px 32px 0 rgba(31,38,135,0.18)", borderColor: "#38bdf8" }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              className="group cursor-pointer relative min-w-[260px] max-w-xl flex flex-col p-6 border-2 border-white/10 bg-white/5 hover:bg-white/10 transition-all duration-300 shadow-lg"
              style={{ borderRadius: 0 }}
            >
              <div className="flex-1">
                <a href="https://escadote.com/" target="_blank" rel="noopener noreferrer" className="text-cyan-300 font-semibold text-lg hover:underline">Escadote Software</a>
                <span className="block text-neutral-400 text-sm mt-1">2015 – 2017</span>
              </div>
              <span className="absolute left-0 bottom-0 w-0 h-1 bg-gradient-to-r from-cyan-400 to-blue-500 transition-all duration-300 group-hover:w-full" />
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.03, boxShadow: "0 8px 32px 0 rgba(31,38,135,0.18)", borderColor: "#38bdf8" }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              className="group cursor-pointer relative min-w-[260px] max-w-xl flex flex-col p-6 border-2 border-white/10 bg-white/5 hover:bg-white/10 transition-all duration-300 shadow-lg"
              style={{ borderRadius: 0 }}
            >
              <div className="flex-1">
                <a href="https://www.criticalsoftware.com/" target="_blank" rel="noopener noreferrer" className="text-cyan-300 font-semibold text-lg hover:underline">Critical Software</a>
                <span className="block text-neutral-400 text-sm mt-1">2017 – 2020</span>
              </div>
              <span className="absolute left-0 bottom-0 w-0 h-1 bg-gradient-to-r from-cyan-400 to-blue-500 transition-all duration-300 group-hover:w-full" />
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.03, boxShadow: "0 8px 32px 0 rgba(31,38,135,0.18)", borderColor: "#38bdf8" }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              className="group cursor-pointer relative min-w-[260px] max-w-xl flex flex-col p-6 border-2 border-white/10 bg-white/5 hover:bg-white/10 transition-all duration-300 shadow-lg"
              style={{ borderRadius: 0 }}
            >
              <div className="flex-1">
                <a href="https://www.talkdesk.com/" target="_blank" rel="noopener noreferrer" className="text-cyan-300 font-semibold text-lg hover:underline">Talkdesk</a>
                <span className="block text-neutral-400 text-sm mt-1">2020 – 2023</span>
              </div>
              <span className="absolute left-0 bottom-0 w-0 h-1 bg-gradient-to-r from-cyan-400 to-blue-500 transition-all duration-300 group-hover:w-full" />
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.03, boxShadow: "0 8px 32px 0 rgba(31,38,135,0.18)", borderColor: "#38bdf8" }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              className="group cursor-pointer relative min-w-[260px] max-w-xl flex flex-col p-6 border-2 border-white/10 bg-white/5 hover:bg-white/10 transition-all duration-300 shadow-lg"
              style={{ borderRadius: 0 }}
            >
              <div className="flex-1">
                <a href="https://rows.com/" target="_blank" rel="noopener noreferrer" className="text-cyan-300 font-semibold text-lg hover:underline">Rows</a>
                <span className="block text-neutral-400 text-sm mt-1">2023 – 2025</span>
              </div>
              <span className="absolute left-0 bottom-0 w-0 h-1 bg-gradient-to-r from-cyan-400 to-blue-500 transition-all duration-300 group-hover:w-full" />
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.03, boxShadow: "0 8px 32px 0 rgba(31,38,135,0.18)", borderColor: "#38bdf8" }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              className="group cursor-pointer relative min-w-[260px] max-w-xl flex flex-col p-6 border-2 border-white/10 bg-white/5 hover:bg-white/10 transition-all duration-300 shadow-lg"
              style={{ borderRadius: 0 }}
            >
              <div className="flex-1">
                <a href="https://www.talkdesk.com/" target="_blank" rel="noopener noreferrer" className="text-cyan-300 font-semibold text-lg hover:underline">Talkdesk</a>
                <span className="block text-neutral-400 text-sm mt-1">2025 – present</span>
              </div>
              <span className="absolute left-0 bottom-0 w-0 h-1 bg-gradient-to-r from-cyan-400 to-blue-500 transition-all duration-300 group-hover:w-full" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* What I Do / My Work Section */}
      <section className="min-h-screen px-6 py-20 bg-neutral-900">
        <h2 className="text-3xl md:text-4xl font-semibold mb-12 text-center">What I Do</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {dummyProjects.map((proj, idx) => (
            <motion.div
              key={proj.title}
              whileHover={{ scale: 1.03, boxShadow: "0 8px 32px 0 rgba(31,38,135,0.18)", borderColor: "#38bdf8" }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              className="group cursor-pointer relative min-w-[260px] max-w-xl flex flex-col p-6 border-2 border-white/10 bg-white/5 hover:bg-white/10 transition-all duration-300 shadow-lg"
              style={{ borderRadius: 0 }}
            >
              <h3 className="text-lg font-bold mb-2 text-white group-hover:text-cyan-300 transition-colors">{proj.title}</h3>
              <p className="text-neutral-300 mb-4 text-sm">{proj.desc}</p>
              <a
                href="https://github.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-cyan-300 font-medium text-sm underline-offset-4 group-hover:underline transition-all duration-200 hover:text-cyan-400"
              >
                View on GitHub
                <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><path d="M16 8l6 6m0 0l-6 6m6-6H2"/></svg>
              </a>
              {/* Animated border effect */}
              <span className="absolute left-0 bottom-0 w-0 h-1 bg-gradient-to-r from-cyan-400 to-blue-500 transition-all duration-300 group-hover:w-full" />
            </motion.div>
          ))}
        </div>
      </section>

      {/* Where to Find Me Section */}
      <section className="min-h-[40vh] px-6 py-20 flex flex-col items-center justify-center">
        <h2 className="text-3xl md:text-4xl font-semibold mb-8 text-center">Where to find me</h2>
        <div className="flex gap-8 items-center justify-center">
          {/* GitHub */}
          <a href="https://github.com/miglrodri" target="_blank" rel="noopener noreferrer" className="group flex flex-col items-center text-cyan-300 hover:text-white transition">
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="mb-2 group-hover:scale-110 transition-transform">
              <path d="M12 2C6.48 2 2 6.58 2 12.26c0 4.5 2.87 8.32 6.84 9.67.5.09.68-.22.68-.48 0-.24-.01-.87-.01-1.7-2.78.62-3.37-1.36-3.37-1.36-.45-1.18-1.1-1.5-1.1-1.5-.9-.63.07-.62.07-.62 1 .07 1.53 1.05 1.53 1.05.89 1.56 2.34 1.11 2.91.85.09-.66.35-1.11.63-1.37-2.22-.26-4.56-1.14-4.56-5.07 0-1.12.39-2.03 1.03-2.75-.1-.26-.45-1.3.1-2.7 0 0 .84-.28 2.75 1.05A9.38 9.38 0 0 1 12 6.84c.85.004 1.71.12 2.51.35 1.91-1.33 2.75-1.05 2.75-1.05.55 1.4.2 2.44.1 2.7.64.72 1.03 1.63 1.03 2.75 0 3.94-2.34 4.81-4.57 5.07.36.32.68.94.68 1.9 0 1.37-.01 2.47-.01 2.81 0 .27.18.58.69.48A10.01 10.01 0 0 0 22 12.26C22 6.58 17.52 2 12 2Z" />
            </svg>
            <span className="text-sm">GitHub</span>
          </a>
          {/* LinkedIn */}
          <a href="https://www.linkedin.com/in/miglrodri/" target="_blank" rel="noopener noreferrer" className="group flex flex-col items-center text-cyan-300 hover:text-white transition">
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="mb-2 group-hover:scale-110 transition-transform">
              <rect x="2" y="2" width="20" height="20" rx="5" />
              <path d="M16 8a6 6 0 0 1 6 6v6" />
              <line x1="8" y1="11" x2="8" y2="16" />
              <line x1="8" y1="8" x2="8" y2="8" />
            </svg>
            <span className="text-sm">LinkedIn</span>
          </a>
          {/* Stack Overflow */}
          <a href="https://stackoverflow.com/users/youruserid" target="_blank" rel="noopener noreferrer" className="group flex flex-col items-center text-cyan-300 hover:text-white transition">
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="mb-2 group-hover:scale-110 transition-transform">
              <rect x="2" y="2" width="20" height="20" rx="5" />
              <path d="M8 17h8M8.5 13.5l7 1M9.5 10.5l6 2M11 7.5l5 3" />
            </svg>
            <span className="text-sm">Stack Overflow</span>
          </a>
        </div>
      </section>

      <footer className="text-center py-8 text-neutral-500">
        © {new Date().getFullYear()} Alex. All rights reserved.
      </footer>
    </main>
  );
}
