import { useEffect, useState, useRef } from "react";
import { AnimatePresence, motion, useScroll, useTransform } from "framer-motion";
import DeepSeaFishesVideo from "./assets/deep-sea-fishes.mp4";
import BgFallbackImage from "./assets/deep-sea-fishes.png";
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneDark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import Terminal from "./sections/Terminal";
import WhereToFindMe from "./sections/WhereToFindMe";

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

// Achievement definitions
const ACHIEVEMENTS = [
  { key: "explorer", label: "Explorer", desc: "Scroll to all major sections" },
  { key: "inspected", label: "Inspected", desc: "Open DevTools" },
  { key: "fastTyper", label: "Fast Typer", desc: "Use the terminal" },
  { key: "curious", label: "Curious", desc: "Find the Easter egg" },
  { key: "nightCrawler", label: "Night Crawler", desc: "Enable dark mode" },
  { key: "lightSeeker", label: "Light Seeker", desc: "Enable light mode" },
  { key: "timeTraveler", label: "Time Traveler", desc: "Visit at night" },
  { key: "returnVisitor", label: "Return Visitor", desc: "Visit more than once" },
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

  // Add state for cursor position
  const [cursor, setCursor] = useState({ x: 0, y: 0 });

  // Listen for mouse movement
  useEffect(() => {
    const handleMove = (e: MouseEvent) => {
      setCursor({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", handleMove);
    return () => window.removeEventListener("mousemove", handleMove);
  }, []);

  // Add state for delayed cursor position
  const [delayedCursor, setDelayedCursor] = useState({ x: 0, y: 0 });

  // Animate delayed cursor position
  useEffect(() => {
    let raf: number;
    function animate() {
      setDelayedCursor(prev => ({
        x: prev.x + (cursor.x - prev.x) * 0.15,
        y: prev.y + (cursor.y - prev.y) * 0.15,
      }));
      raf = requestAnimationFrame(animate);
    }
    raf = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(raf);
  }, [cursor.x, cursor.y]);

  // Theme state: "dark" | "light"
  const [theme, setTheme] = useState<"dark" | "light">("dark");

  // Theme color maps
  const themeColors = {
    dark: {
      bg: "#18181b",
      text: "#fff",
      accent: "#22d3ee",
      border: "#27272a",
      cardBg: "#23232b",
      codeBg: "#18181b",
      codeText: "#fff",
    },
    light: {
      bg: "#fff",
      text: "#18181b",
      accent: "#0e7490",
      border: "#e5e7eb",
      cardBg: "#f3f4f6",
      codeBg: "#f3f4f6",
      codeText: "#18181b",
    },
  };

  // Toggle theme handler
  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  // Prevent horizontal scroll
  useEffect(() => {
    document.body.style.overflowX = "hidden";
    return () => { document.body.style.overflowX = ""; };
  }, []);

  // Page translation based on theme
  // Use -100vw instead of -100% for correct pixel-based translation
  const translateX = theme === "dark" ? "0vw" : "-100vw";

  // Achievement system state
  const [achievements, setAchievements] = useState<string[]>([]);
  const [showPanel, setShowPanel] = useState(false);
  const [showToast, setShowToast] = useState<{ key: string, label: string } | null>(null);

  // Helper to unlock achievement
  const unlock = (key: string) => {
    if (!achievements.includes(key)) {
      const found = ACHIEVEMENTS.find(a => a.key === key);
      setAchievements(prev => [...prev, key]);
      if (found) {
        setShowToast({ key, label: found.label });
        setTimeout(() => setShowToast(null), 2200);
      }
    }
  };

  // Explorer: scroll to all major sections
  const sectionRefs = {
    about: useRef<HTMLDivElement>(null),
    projects: useRef<HTMLDivElement>(null),
    contact: useRef<HTMLDivElement>(null),
  };
  useEffect(() => {
    function checkSections() {
      const sections = Object.values(sectionRefs);
      const allVisible = sections.every(ref => {
        if (!ref.current) return false;
        const rect = ref.current.getBoundingClientRect();
        return rect.top < window.innerHeight && rect.bottom > 0;
      });
      if (allVisible) unlock("explorer");
    }
    window.addEventListener("scroll", checkSections);
    checkSections();
    return () => window.removeEventListener("scroll", checkSections);
  }, []);

  // Inspected: DevTools detection (simple heuristic)
  useEffect(() => {
    let devtoolsOpen = false;
    function detectDevtools() {
      const threshold = 160;
      const widthDiff = window.outerWidth - window.innerWidth > threshold;
      const heightDiff = window.outerHeight - window.innerHeight > threshold;
      if (widthDiff || heightDiff) devtoolsOpen = true;
      if (devtoolsOpen) unlock("inspected");
    }
    window.addEventListener("resize", detectDevtools);
    detectDevtools();
    return () => window.removeEventListener("resize", detectDevtools);
  }, []);

  // Fast Typer: Use the terminal
  const handleTerminalAchievement = () => unlock("fastTyper");

  // Curious: Easter egg hover (add a hidden element)
  const handleCurious = () => unlock("curious");

  // Night Crawler / Light Seeker
  useEffect(() => {
    if (theme === "dark") unlock("nightCrawler");
    if (theme === "light") unlock("lightSeeker");
  }, [theme]);

  // Time Traveler: Visit at night
  useEffect(() => {
    const hour = new Date().getHours();
    if (hour < 6 || hour > 20) unlock("timeTraveler");
  }, []);

  // Return Visitor: localStorage
  useEffect(() => {
    const visits = Number(localStorage.getItem("visits") || "0") + 1;
    localStorage.setItem("visits", String(visits));
    if (visits > 1) unlock("returnVisitor");
  }, []);

  // Main content renderer
  function renderContent(mode: "dark" | "light") {
    const colors = themeColors[mode];
    return (
      <main
        className="relative min-h-screen overflow-x-hidden"
        style={{
          background: colors.bg,
          color: colors.text,
          transition: "background 0.3s, color 0.3s",
        }}
      >
        {/* Achievement Badge Button */}
        <motion.button
          id="achievements-btn"
          className="fixed bottom-6 right-6 z-[200] flex items-center gap-2 px-4 py-2 rounded-full font-semibold shadow-lg bg-gradient-to-r from-cyan-400 to-blue-500 text-white"
          style={{
            boxShadow: "0 2px 12px #22d3ee44",
            opacity: showTimeline ? 1 : 0,
            pointerEvents: showTimeline ? "auto" : "none",
            transition: "opacity 0.3s",
          }}
          onClick={() => setShowPanel(true)}
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: showTimeline ? 1 : 0.8, opacity: showTimeline ? 1 : 0 }}
        >
          🏆 {achievements.length}/{ACHIEVEMENTS.length} Achievements
        </motion.button>
        {/* Achievement Panel Popup - position relative to button */}
        {showPanel && (
          <motion.div
            className="z-[201] flex flex-col items-end"
            initial={{ opacity: 0, scale: 0.95, y: 40 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 40 }}
            transition={{ duration: 0.25 }}
            style={{
              position: "fixed",
              bottom: 72,
              right: 24,
              maxWidth: 340,
              width: "100%",
            }}
          >
            <motion.div
              className="rounded-2xl shadow-2xl p-6"
              style={{
                background: colors.bg,
                color: colors.text,
                border: `1px solid ${colors.border}`,
              }}
            >
              <h3
                className="text-xl font-bold mb-4"
                style={{ color: colors.accent }}
              >
                Achievements
              </h3>
              <div className="flex flex-col gap-3">
                {ACHIEVEMENTS.map(a => (
                  <div
                    key={a.key}
                    className={`flex items-center gap-3 px-3 py-2 rounded-lg border ${achievements.includes(a.key) ? "border-cyan-400 bg-cyan-900/10 text-cyan-300" : "border-neutral-300 bg-neutral-100 text-neutral-400 dark:bg-neutral-800 dark:border-neutral-700"}`}
                    style={achievements.includes(a.key)
                      ? { borderColor: colors.accent, background: colors.accent + "22", color: colors.accent }
                      : { borderColor: colors.border, background: colors.cardBg, color: colors.text }}
                  >
                    <span className="text-2xl">{achievements.includes(a.key) ? "✅" : "⬜"}</span>
                    <div>
                      <div className="font-semibold">{a.label}</div>
                      <div className="text-xs">{a.desc}</div>
                    </div>
                  </div>
                ))}
              </div>
              <button
                className="mt-6 px-4 py-2 rounded-lg font-semibold shadow"
                style={{
                  background: colors.accent,
                  color: colors.bg,
                  border: "none",
                }}
                onClick={() => setShowPanel(false)}
              >
                Close
              </button>
            </motion.div>
          </motion.div>
        )}
        {/* Toast Message */}
        <AnimatePresence>
          {showToast && (
            <motion.div
              className="fixed bottom-20 right-8 z-[202] px-6 py-3 rounded-lg bg-gradient-to-r from-cyan-400 to-blue-500 text-white font-bold shadow-lg"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 30 }}
              transition={{ duration: 0.4 }}
            >
              🏆 Achievement Unlocked: {showToast.label}
            </motion.div>
          )}
        </AnimatePresence>
        {/* Hero Section with Background Video */}
        <section ref={sectionRefs.about} className="relative h-screen flex flex-col justify-center items-center text-center p-6">
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
        <section ref={sectionRefs.projects} className="w-full max-w-3xl mx-auto mb-20 px-2 md:px-0">
          <h2 className="w-full text-3xl md:text-4xl font-bold mb-8 text-center flex items-center justify-center gap-2">
            I <span role="img" aria-label="love" className="text-red-400">❤️</span> code
          </h2>
          <div
            className="border shadow-lg p-6 rounded-xl overflow-x-auto"
            style={{
              background: colors.codeBg,
              borderColor: colors.border,
              color: colors.codeText,
            }}
          >
            {/* Syntax highlighted code snippet */}
            <SyntaxHighlighter
              language="typescript"
              style={oneDark}
              customStyle={{
                background: "transparent",
                color: colors.codeText,
                fontSize: "1rem",
                borderRadius: "0.75rem",
                padding: "1.5rem",
              }}
            >
              {`// miguel.ts
const name = "Miguel Jesus";

const location = "Coimbra, Portugal";

const skills = ["React", "TypeScript", "Tailwind", "Git"];

const experience = ["Escadote", "Critical", "Talkdesk", "Rows"];

const hobbies = ["👨‍👩‍👧‍👦 Family Time", "☕ Coffee", "🕹 Side Projects"];

function sayHi() {
  console.log("Let's build something great!");
}
`}
            </SyntaxHighlighter>
          </div>
          {/* Easter egg element for "Curious" */}
          <div
            style={{ position: "absolute", top: 0, right: 0, width: 32, height: 32, opacity: 0, cursor: "pointer" }}
            onMouseEnter={handleCurious}
            aria-label="Easter Egg"
          />
        </section>


        {/* Education & Experience Section */}
        <section ref={sectionRefs.about} className="w-full max-w-4xl mx-auto px-4 py-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-10 text-center">Education & Experience</h2>
          <div className="relative flex flex-col items-center">
            {/* Timeline vertical line */}
            <div className="absolute left-1/2 top-0 -translate-x-1/2 h-full w-1 bg-gradient-to-b from-cyan-400 via-blue-400 to-purple-400 opacity-40 z-0" />
            {/* Timeline items */}
            {[{
              year: "2015",
              title: "University of Coimbra",
              desc: "Master Degree on Computer Science",
              url: "https://www.uc.pt/en/",
            },
            {
              year: "2015 – 2017",
              title: "Escadote Software",
              desc: "Software Engineer, web & mobile projects.",
              url: "https://escadote.com/",
            },
            {
              year: "2017 – 2020",
              title: "Critical Software",
              desc: "Fullstack Developer, mission-critical systems.",
              url: "https://www.criticalsoftware.com/",
            },
            {
              year: "2020 – 2023",
              title: "Talkdesk",
              desc: "Frontend Engineer, cloud contact center.",
              url: "https://www.talkdesk.com/",
            },
            {
              year: "2023 – 2025",
              title: "Rows",
              desc: "Senior Engineer, spreadsheet automation.",
              url: "https://rows.com/",
            },
            {
              year: "2025 – present",
              title: "Talkdesk",
              desc: "Lead Engineer, platform architecture.",
              url: "https://www.talkdesk.com/",
            },
          ].map((item, idx) => {
              const isLeft = idx % 2 === 0;
              return (
                <div
                  key={item.title + item.year}
                  className="relative flex w-full mb-12 items-center"
                  style={{ minHeight: 100 }}
                >
                  {/* Left side card */}
                  <div className={`w-1/2 px-4 flex ${isLeft ? "justify-end" : "justify-end"} z-10`}>
                    {isLeft && (
                      <div className="bg-white/5 border border-white/10 rounded-lg shadow-lg p-5 min-w-[220px] max-w-xs text-left">
                        <a
                          href={item.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-cyan-300 font-semibold text-lg hover:underline"
                        >
                          {item.title}
                        </a>
                        <div className="text-neutral-400 text-sm mt-1">{item.desc}</div>
                      </div>
                    )}
                  </div>
                  {/* Timeline dot and year */}
                  <div className="absolute left-1/2 -translate-x-1/2 flex flex-col items-center z-20">
                    <div className="w-5 h-5 rounded-full bg-gradient-to-br from-cyan-400 to-blue-500 border-2 border-white shadow" />
                    <div className="mt-2 text-xs text-neutral-400 font-semibold">{item.year}</div>
                  </div>
                  {/* Right side card */}
                  <div className={`w-1/2 px-4 flex ${isLeft ? "justify-start" : "justify-start"} z-10`}>
                    {!isLeft && (
                      <div className="bg-white/5 border border-white/10 rounded-lg shadow-lg p-5 min-w-[220px] max-w-xs text-left">
                        <a
                          href={item.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-cyan-300 font-semibold text-lg hover:underline"
                        >
                          {item.title}
                        </a>
                        <div className="text-neutral-400 text-sm mt-1">{item.desc}</div>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* Dummy Terminal Section */}
        <section className="w-full max-w-2xl mx-auto px-4 py-16">
          <h2 className="text-2xl md:text-3xl font-bold mb-8 text-center">Terminal</h2>
          <Terminal onType={handleTerminalAchievement} />
        </section>

        {/* What I Do / My Work Section */}
        <section ref={sectionRefs.projects} className="min-h-screen px-6 py-20 bg-neutral-900">
          <h2 className="text-3xl md:text-4xl font-semibold mb-12 text-center">What I Do</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {dummyProjects.map((proj) => (
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
        <section ref={sectionRefs.contact} className="min-h-[40vh] px-6 py-20 flex flex-col items-center justify-center">
          <h2 className="text-3xl md:text-4xl font-semibold mb-8 text-center">Where to find me</h2>
          <WhereToFindMe />
        </section>

        <footer
          className="text-center py-8"
          style={{ color: mode === "dark" ? "#a1a1aa" : "#64748b" }}
        >
          © {new Date().getFullYear()} Alex. All rights reserved.
        </footer>
      </main>
    );
  }

  return (
    <div
      className="relative w-full h-full overflow-x-hidden"
      style={{
        width: "100vw",
        minHeight: "100vh",
        overflow: "hidden",
        position: "relative",
      }}
    >
      {/* Theme Toggle Button (always visible, only triggers) */}
      <button
        className="fixed top-4 left-6 z-[102] px-4 py-2 rounded-lg font-semibold shadow-lg border bg-black/10 backdrop-blur"
        style={{
          color: themeColors[theme].accent,
          borderColor: themeColors[theme].border,
          transition: "all 0.2s",
        }}
        onClick={toggleTheme}
        aria-label="Toggle light/dark mode"
      >
        {theme === "dark" ? "🌙 Dark" : "🌞 Light"}
      </button>
      {/* Two versions side by side, slide animation */}
      <motion.div
        className="flex w-[200vw] h-full"
        style={{
          position: "relative",
          minHeight: "100vh",
        }}
        animate={{ x: translateX }}
        transition={{ type: "spring", stiffness: 300, damping: 40, duration: 0.6 }}
      >
        <div className="w-screen h-full">{renderContent("dark")}</div>
        <div className="w-screen h-full">{renderContent("light")}</div>
      </motion.div>
    </div>
  );
}
