import React, { useState, useEffect, useRef } from 'react';
import { Download, ExternalLink, Github, Linkedin, Mail,Instagram, MapPin, Phone, Moon, Sun, Code, Briefcase, FileJson, User, Award, UserCheck, Globe, Cpu, BookOpen, Layers, Send, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Typewriter from 'typewriter-effect';
import confetti from 'canvas-confetti';
import Tilt from 'react-parallax-tilt';

// --- OPTIMIZED COMPONENT 1: MOUSE FOLLOWER ---
// Ye alag component hai taaki puri site re-render na ho
const MouseFollower = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth <= 768);
    checkMobile();

    const updateMousePosition = (e) => {
      // requestAnimationFrame use kiya taaki lag na ho
      requestAnimationFrame(() => {
        setMousePosition({ x: e.clientX, y: e.clientY });
      });
    };

    window.addEventListener('resize', checkMobile);
    if (!isMobile) window.addEventListener('mousemove', updateMousePosition);

    return () => {
      window.removeEventListener('resize', checkMobile);
      window.removeEventListener('mousemove', updateMousePosition);
    };
  }, [isMobile]);

  if (isMobile) return null;

  return (
    <motion.div
      className="fixed top-0 left-0 w-8 h-8 bg-blue-500 rounded-full blur-xl pointer-events-none z-[40] opacity-60 print:hidden"
      animate={{
        x: mousePosition.x - 16,
        y: mousePosition.y - 16
      }}
      transition={{
        type: "spring",
        stiffness: 500,
        damping: 28,
        mass: 0.5
      }}
    />
  );
};

// --- OPTIMIZED COMPONENT 2: MATRIX RAIN ---
// React.memo use kiya taaki ye atak-atak kar na chale
const MatrixRain = React.memo(({ onClose }) => {
  const canvasRef = useRef(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    const letters = '0123456789ABCDEF';
    const fontSize = 16;
    const columns = canvas.width / fontSize;
    const drops = Array(Math.floor(columns)).fill(1);

    const draw = () => {
      ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = '#0F0';
      ctx.font = fontSize + 'px monospace';
      for (let i = 0; i < drops.length; i++) {
        const text = letters[Math.floor(Math.random() * letters.length)];
        ctx.fillText(text, i * fontSize, drops[i] * fontSize);
        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) drops[i] = 0;
        drops[i]++;
      }
    };
    const interval = setInterval(draw, 33); // 30 FPS for smoothness
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed inset-0 z-[9999] bg-black cursor-pointer" onClick={onClose}>
      <canvas ref={canvasRef} className="block" />
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-green-500 font-bold text-4xl animate-pulse text-center">
        ACCESS GRANTED <br /><span className="text-sm">Welcome Anurag</span>
      </div>
    </div>
  );
});

// --- MAIN RESUME COMPONENT ---
const Resume = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [viewMode, setViewMode] = useState('ui');
  const [scrollProgress, setScrollProgress] = useState(0);
  const [showMatrix, setShowMatrix] = useState(false);
  const [showHint, setShowHint] = useState(false);

  // Contact & Mobile States
  const [showContact, setShowContact] = useState(false);
  const [contactForm, setContactForm] = useState({ name: '', message: '' });
  const [isMobile, setIsMobile] = useState(false);

  // Mobile Detection
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth <= 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const resumeData = {
    name: "Anurag Kumar",
    role: "Full Stack Web Developer",
    contact: {
      phone: "+91-9990170562",
      email: "argtiwary11@gmail.com",
      location: "Jamui, Bihar - 811313"
    },
    summary: "I am a self-taught Web Developer with a strong passion for coding. Coming from a non-CS background, I have learned the MERN Stack by building practical projects. I rely on hard work and continuous learning. I am looking for an opportunity where I can contribute my best efforts and grow my skills under the guidance of experienced seniors.",
    skills: {
      web: ["React.js", "Node.js", "MongoDB", "Express.js", "Tailwind CSS", "JavaScript (ES6+)"],
      hardware: ["PC Assembling", "Troubleshooting", "OS Setup", "MS Office Suite"],
      soft: ["Customer Support", "Team Collaboration", "Problem Solving", "Time Management"],
      admin: ["Inventory Management", "Documentation", "Admissions Handling", "Record Keeping"]
    },
    learning: ["Next.js", "TypeScript", "Advanced SEO"],
    experience: [
      {
        role: "Field Executive",
        company: "Independent MLA Candidate Outreach",
        duration: "09/2024 - 11/2025",
        desc: [
          "Assisted citizens with government schemes (Ration Cards, Ayushman Cards).",
          "Managed on-ground data collection and streamlined application processes."
        ]
      },
      {
        role: "Hardware Technician",
        company: "STS Computer and Mobile Center",
        duration: "02/2022 - 09/2022",
        desc: [
          "Specialized in PC assembling, hardware upgrades, and system diagnosis.",
          "Performed software installations and OS setups."
        ]
      },
      {
        role: "Admission Executive",
        company: "Deluxe Computer Center",
        duration: "04/2023 - 12/2023",
        desc: [
          "Managed admission processes, fee collection, and student records.",
          "Provided administrative support for smooth center operations."
        ]
      },
          {
        role: "front-end developer intern",
        company: "TRIPFOX TRAVELLERS",
        duration: "02/2024 - 07/2024",
        desc: [
          "Focus on Development & Integration.",
          "Focus on UI/UX & Maintenance",
          "Collaborated via GitHub to develop a high-quality project, ensuring code efficiency and improved functionality through team reviews and version control."
        ]
      }
    ],
    education: [
      { degree: "Bachelor of Arts", school: "Munger University", year: "2025" },
      { degree: "Intermediate (+2)", school: "+2 A.H.S. Ratanpur", year: "2022" }
    ],
    certifications: ["ADCA - 2022"],
    languages: ["Hindi (Native)", "English (Advanced)"],
    personalDetails: {
      fatherName: "Buddhdev Tiwari",
      dob: "25 Dec 2004",
      gender: "Male",
      nationality: "Indian"
    }
  };

  const projects = [
    { title: "E-Commerce Dashboard", desc: "MERN Stack admin panel with inventory management.", tags: ["React", "Node", "MongoDB"], link: "https://argtiwari.github.io/CareerPath-India/", img: "/ecommerce.png" },
    { title: "Politician Portfolio", desc: "Static site with SEO and animations.", tags: ["React", "Tailwind"], link: "https://www.amrendrakumaratri.in/", img: "/portfolio.png" },
    { title: "Task Manager App", desc: "Productivity tool with drag-and-drop.", tags: ["JS", "Firebase"], link: "#", img: "/taskapp.png" }
  ];

  // Logic Functions
  const handleSendEmail = (e) => {
    e.preventDefault();
    const subject = `Hiring Inquiry from ${contactForm.name}`;
    const body = `Hi Anurag,%0D%0A%0D%0A${contactForm.message}%0D%0A%0D%0ARegards,%0D%0A${contactForm.name}`;
    window.location.href = `mailto:${resumeData.contact.email}?subject=${subject}&body=${body}`;
    setShowContact(false);
    confetti({ particleCount: 50, spread: 50, origin: { y: 0.6 } });
  };

  const handleDownload = () => {
    confetti({ particleCount: 100, spread: 70, origin: { y: 0.6 } });
    setTimeout(() => window.print(), 1000);
  };

  useEffect(() => {
    const handleScroll = () => {
      const scrollableHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (scrollableHeight > 0) setScrollProgress(window.scrollY / scrollableHeight);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    let currentInput = "";
    const handleKey = (e) => {
      currentInput += e.key;
      if (currentInput.includes("123")) { setShowMatrix(true); setShowHint(false); currentInput = ""; }
      if (currentInput.length > 10) currentInput = currentInput.slice(-10);
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => { if (!showMatrix) setShowHint(true); }, 10000);
    return () => clearTimeout(timer);
  }, [showMatrix]);

  // Fixed JSON View with Scroll
  const JsonView = () => (
    <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="max-w-4xl mx-auto bg-gray-900 text-green-400 p-8 rounded-lg shadow-2xl font-mono text-xs md:text-sm border border-gray-700 mt-10 mb-10 h-[80vh] overflow-y-auto z-40 relative">
      <pre className="whitespace-pre-wrap">{JSON.stringify(resumeData, null, 2)}</pre>
    </motion.div>
  );

  return (
    <div className={`${darkMode ? 'dark bg-gray-950' : 'bg-gray-100'} flex flex-col min-h-screen transition-colors duration-300 print:bg-white`}>
      
      {/* 1. Optimized Mouse Follower (Sirf Desktop par) */}
      <MouseFollower />

      {/* 2. Scroll Progress Bar */}
      <div className="fixed top-0 left-0 h-1 md:h-1.5 bg-blue-600 z-[9999]" style={{ width: `${scrollProgress * 100}%` }}></div>

      {/* 3. Mobile Optimized Toolbar */}
      <div className="fixed top-2 right-2 md:top-5 md:right-5 flex gap-2 z-50 print:hidden">
        {/* Mobile par buttons chote */}
        <button onClick={() => setShowContact(true)} className="p-2 rounded-full bg-blue-600 text-white shadow-lg animate-bounce">
          <Send size={16} className="md:w-5 md:h-5" />
        </button>
        <div className="bg-white dark:bg-gray-800 p-1 rounded-full shadow-lg flex">
          <button onClick={() => setViewMode('ui')} className={`p-2 rounded-full ${viewMode === 'ui' ? 'bg-blue-600 text-white' : 'text-gray-500'}`}><User size={16} /></button>
          <button onClick={() => setViewMode('json')} className={`p-2 rounded-full ${viewMode === 'json' ? 'bg-purple-600 text-white' : 'text-gray-500'}`}><FileJson size={16} /></button>
        </div>
        <button onClick={() => setDarkMode(!darkMode)} className="p-2 rounded-full bg-gray-700 text-white shadow-lg">{darkMode ? <Sun size={16} /> : <Moon size={16} />}</button>
        <button onClick={handleDownload} className="p-2 rounded-full bg-green-600 text-white shadow-lg"><Download size={16} /></button>
      </div>

      <AnimatePresence mode="wait">
        {viewMode === 'json' ? <JsonView key="json" /> : (
          <motion.div key="ui" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="perspective-1000 pb-10">
            {/* Mobile Margin Fix: my-14 (Toolbar ke liye jagah) */}
            <Tilt tiltEnable={!isMobile} tiltMaxAngleX={1} tiltMaxAngleY={1} glareEnable={!isMobile} glareMaxOpacity={0.05} className={`w-[95%] md:max-w-4xl mx-auto mt-16 md:mt-10 bg-white shadow-xl rounded-lg overflow-hidden print:shadow-none dark:bg-gray-800 dark:text-gray-100`}>
              
              {/* Header: Compact on Mobile */}
              <header className="bg-slate-900 text-white p-5 md:p-10 print:p-6">
                <div className="flex flex-col md:flex-row justify-between gap-6">
                  <div className="flex-1">
                    {/* Name Size Fix */}
                    <h1 className="text-2xl md:text-4xl font-bold uppercase tracking-wider">{resumeData.name}</h1>
                    <div className="text-sm md:text-xl text-blue-400 mt-1 md:mt-2 font-semibold h-6 md:h-8">
                      <Typewriter options={{ strings: [resumeData.role, 'Hardware Expert', 'MERN Stack Developer'], autoStart: true, loop: true }} />
                    </div>
                    <p className="text-xs md:text-sm text-gray-400 mt-3 leading-relaxed border-l-4 border-blue-500 pl-3">{resumeData.summary}</p>
                    
                    <button onClick={() => setShowContact(true)} className="mt-4 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-xs md:text-sm font-bold rounded shadow-lg flex items-center gap-2 transition-all w-full md:w-auto justify-center">
                      <Send size={14}/> Hire Me Now
                    </button>
                  </div>

                  {/* Contact Info: Compact List */}
                  <div className="text-xs md:text-sm space-y-2 text-gray-300 min-w-[200px] text-left md:text-right border-t border-gray-700 pt-4 md:border-0 md:pt-0">
                    <div className="flex md:justify-end gap-2 items-center"><a href={`tel:${resumeData.contact.phone}`} className="hover:text-blue-400">{resumeData.contact.phone}</a> <Phone size={12}/></div>
                    <div className="flex md:justify-end gap-2 items-center"><a href={`mailto:${resumeData.contact.email}`} className="hover:text-blue-400 break-all">{resumeData.contact.email}</a> <Mail size={12}/></div>
                    <div className="flex md:justify-end gap-2 items-center"><span>{resumeData.contact.location}</span> <MapPin size={12}/></div>
                    <div className="flex md:justify-end gap-3 mt-2 text-white">
                      <a href="https://github.com/argtiwari"><Github size={16} className="cursor-pointer hover:text-blue-400"/></a>
                      <a href="https://www.linkedin.com/in/anurag-tiwari-9a3185392/"><Linkedin size={16} className="cursor-pointer hover:text-blue-400"/></a>
                      <a href="https://www.instagram.com/argtiwari/"><Instagram size={16} className="cursor-pointer hover:text-blue-400"/></a>
                    </div>
                  </div>
                </div>
              </header>

              {/* Body: Compact Grid */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-5 md:p-8 print:p-6">
                
                {/* Left Column */}
                <div className="col-span-1 space-y-6 md:border-r border-gray-200 md:pr-6 dark:border-gray-700">
                  <section>
                    <h3 className="text-sm md:text-lg font-bold uppercase border-b-2 border-blue-500 pb-1 mb-3 flex items-center gap-2"><Code size={16}/> Web Skills</h3>
                    <div className="flex flex-wrap gap-1.5">
                      {resumeData.skills.web.map(skill => <span key={skill} className="px-2 py-1 bg-blue-50 dark:bg-blue-900 text-[10px] md:text-xs rounded border border-blue-100 dark:border-blue-800 text-blue-700 dark:text-blue-200 font-semibold">{skill}</span>)}
                    </div>
                  </section>
                  
                  {/* Learning Section */}
                  <section>
                    <h3 className="text-sm md:text-lg font-bold uppercase border-b-2 border-orange-500 pb-1 mb-3 flex items-center gap-2"><BookOpen size={16}/> Learning</h3>
                    <div className="flex flex-wrap gap-1.5">
                      {resumeData.learning.map(skill => <span key={skill} className="px-2 py-1 bg-orange-50 dark:bg-orange-900 text-[10px] md:text-xs rounded border border-orange-100 dark:border-orange-800 text-orange-700 dark:text-orange-200 italic">{skill}</span>)}
                    </div>
                  </section>

                  {/* Hardware Skills */}
                  <section>
                    <h3 className="text-sm md:text-lg font-bold uppercase border-b-2 border-green-500 pb-1 mb-3 flex items-center gap-2"><Cpu size={16}/> Hardware</h3>
                    <div className="flex flex-wrap gap-1.5">
                      {resumeData.skills.hardware.map(skill => <span key={skill} className="px-2 py-1 bg-green-50 dark:bg-green-900 text-[10px] md:text-xs rounded border border-green-100 dark:border-green-800 text-green-700 dark:text-green-200">{skill}</span>)}
                    </div>
                  </section>
                  
                  {/* Soft & Admin */}
                  <section>
                    <h3 className="text-sm md:text-lg font-bold uppercase border-b-2 border-pink-500 pb-1 mb-3 flex items-center gap-2"><Layers size={16}/> Soft & Admin</h3>
                    <div className="flex flex-wrap gap-1.5">
                      {[...resumeData.skills.soft, ...resumeData.skills.admin].slice(0, 8).map(skill => (
                        <span key={skill} className="px-2 py-1 bg-pink-50 dark:bg-pink-900 text-[10px] md:text-xs rounded border border-pink-100 dark:border-pink-800 text-pink-700 dark:text-pink-200">{skill}</span>
                      ))}
                    </div>
                  </section>

                  {/* Education & Personal */}
                  <section>
                    <h3 className="text-sm md:text-lg font-bold uppercase border-b-2 border-gray-400 pb-1 mb-3">Education</h3>
                    {resumeData.education.map((edu, index) => <div key={index} className="mb-2"><h4 className="font-bold text-xs md:text-sm">{edu.degree}</h4><p className="text-[10px] md:text-xs text-gray-500 dark:text-gray-400">{edu.school} | {edu.year}</p></div>)}
                  </section>
                   <section>
                    <h3 className="text-sm md:text-lg font-bold uppercase border-b-2 border-gray-400 pb-1 mb-3 flex items-center gap-2"><UserCheck size={16}/> Personal</h3>
                    <div className="text-[10px] md:text-xs space-y-1 text-gray-600 dark:text-gray-400">
                      <p><strong>Father:</strong> {resumeData.personalDetails.fatherName}</p>
                      <p><strong>DOB:</strong> {resumeData.personalDetails.dob}</p>
                      <p><strong>Gender:</strong> {resumeData.personalDetails.gender}</p>
                      <p><strong>Nationality:</strong> {resumeData.personalDetails.nationality}</p>
                    </div>
                  </section>
                </div>

                {/* Right Column */}
                <div className="col-span-1 md:col-span-2 space-y-6 md:space-y-8">
                  
                  {/* Experience */}
                  <section>
                    <h3 className="text-lg md:text-xl font-bold uppercase border-b-2 border-blue-500 pb-1 mb-4 flex items-center gap-2"><Briefcase size={18}/> Work Experience</h3>
                    {resumeData.experience.map((exp, index) => (
                      <div key={index} className="mb-4 md:mb-6 relative pl-4 border-l-2 border-gray-300 hover:border-blue-500 transition-colors group">
                        <div className="absolute -left-[9px] top-0 w-4 h-4 bg-gray-400 group-hover:bg-blue-500 rounded-full transition-colors"></div>
                        <h4 className="text-sm md:text-lg font-bold">{exp.role}</h4>
                        <p className="text-xs md:text-sm text-gray-500 font-semibold">{exp.company} | {exp.duration}</p>
                        <ul className="list-disc list-outside ml-4 mt-2 text-xs md:text-sm text-gray-600 dark:text-gray-300 space-y-1">
                          {exp.desc.map((point, i) => <li key={i}>{point}</li>)}
                        </ul>
                      </div>
                    ))}
                  </section>

                  {/* Projects */}
                  <section>
                    <h3 className="text-lg md:text-xl font-bold uppercase border-b-2 border-blue-500 pb-1 mb-4">Web Projects</h3>
                    <div className="grid grid-cols-1 gap-4">
                      {projects.map((project, index) => (
                        <motion.a href={project.link} key={index} whileHover={{ scale: 1.02 }} className="group block border border-gray-200 rounded-lg p-3 md:p-4 hover:shadow-xl hover:border-blue-400 transition-all bg-gray-50 dark:bg-gray-700 dark:border-gray-600">
                          <div className="flex gap-3 md:gap-4 items-start">
                            <div className="w-16 h-16 md:w-20 md:h-20 flex-shrink-0 bg-gray-300 rounded-md overflow-hidden">
                               <img src={project.img} alt="project" className="w-full h-full object-cover opacity-80 group-hover:opacity-100"/>
                            </div>
                            <div>
                              <h4 className="font-bold text-sm md:text-lg group-hover:text-blue-600 flex items-center gap-2">{project.title} <ExternalLink size={14} className="opacity-0 group-hover:opacity-100"/></h4>
                              <p className="text-xs md:text-sm text-gray-600 dark:text-gray-300 mt-1 line-clamp-2">{project.desc}</p>
                              <div className="flex gap-2 mt-2 flex-wrap">
                                {project.tags.map(tag => <span key={tag} className="text-[10px] font-bold px-2 py-1 bg-blue-100 text-blue-700 rounded-full">{tag}</span>)}
                              </div>
                            </div>
                          </div>
                        </motion.a>
                      ))}
                    </div>
                  </section>
                </div>
              </div>

               <div className="bg-gray-100 dark:bg-gray-900 p-4 text-center text-xs text-gray-500 print:hidden border-t dark:border-gray-700">
                 <p>Interactive Resume © 2025 <a href="https://www.instagram.com/argcoding/"><span className="font-extrabold underline text-red-300">ArgCoding</span></a>. Built with React & Tailwind.</p>
               </div>
            </Tilt>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showContact && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 p-4">
            <motion.div initial={{ scale: 0.8 }} animate={{ scale: 1 }} exit={{ scale: 0.8 }} className="bg-white dark:bg-gray-800 rounded-lg shadow-2xl p-6 w-full max-w-md relative">
              <button onClick={() => setShowContact(false)} className="absolute top-4 right-4 text-gray-500 hover:text-red-500"><X size={20}/></button>
              <h2 className="text-xl md:text-2xl font-bold mb-4 dark:text-white flex items-center gap-2"><Briefcase className="text-blue-600"/> Hire Me</h2>
              <form onSubmit={handleSendEmail} className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold mb-1 dark:text-gray-300">Your Name</label>
                  <input required type="text" className="w-full p-2 border rounded dark:bg-gray-700 dark:text-white" placeholder="Recruiter Name" value={contactForm.name} onChange={e => setContactForm({...contactForm, name: e.target.value})}/>
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-1 dark:text-gray-300">Your Email</label>
                  <input required type="email" className="w-full p-2 border rounded dark:bg-gray-700 dark:text-white" placeholder="recruiter@company.com" value={contactForm.email} onChange={e => setContactForm({...contactForm, email: e.target.value})}/>
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-1 dark:text-gray-300">Message</label>
                  <textarea required className="w-full p-2 border rounded h-32 dark:bg-gray-700 dark:text-white" placeholder="Hi Anurag, I liked your profile..." value={contactForm.message} onChange={e => setContactForm({...contactForm, message: e.target.value})}/>
                </div>
                <button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded flex items-center justify-center gap-2">
                  <Send size={18}/> Send Message
                </button>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showHint && !showMatrix && !showContact && (
          <motion.div initial={{ x: 100, opacity: 0 }} animate={{ x: 0, opacity: 1 }} exit={{ x: 100, opacity: 0 }} className="fixed bottom-10 right-10 z-[50] max-w-[90%] md:max-w-sm">
             <div className="bg-gray-900 border-l-4 border-green-500 p-4 rounded shadow-2xl flex items-start gap-3 text-green-400">
                <div><h4 className="font-bold font-mono text-sm uppercase">System Hint</h4><p className="text-xs mt-1 font-mono text-gray-300">Type <span className="bg-gray-700 text-white px-1">123</span> to unlock Admin Mode.</p></div>
                <button onClick={() => setShowHint(false)} className="text-gray-500 hover:text-white ml-auto">✕</button>
             </div>
          </motion.div>
        )}
      </AnimatePresence>
      {showMatrix && <MatrixRain onClose={() => setShowMatrix(false)} />}
    </div>
  )
};
  export default Resume;
  