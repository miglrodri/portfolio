const WhereToFindMe= () => {
    return (
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
    );
};

export default WhereToFindMe;