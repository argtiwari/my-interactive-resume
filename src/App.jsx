import React, { useState, useEffect, useRef } from 'react';
import { Download, ExternalLink, Github, Linkedin, Mail, MapPin, Phone, Moon, Sun, Code, Briefcase, FileJson, User, Award, UserCheck, Globe, Cpu, BookOpen, Layers, Send, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Typewriter from 'typewriter-effect';
import confetti from 'canvas-confetti';
import Tilt from 'react-parallax-tilt';

const Resume = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [viewMode, setViewMode] = useState('ui'); 
  const [scrollProgress, setScrollProgress] = useState(0);
  const [showMatrix, setShowMatrix] = useState(false);
  const [showHint, setShowHint] = useState(false);
  
  // --- NEW: CONTACT FORM STATES ---
  const [showContact, setShowContact] = useState(false);
  const [contactForm, setContactForm] = useState({ name: '', message: '' });
  
  // --- NEW: MOBILE DETECTION (3D Effect mobile par band karne ke liye) ---
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth <= 768);
    checkMobile(); // Check on load
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
    summary: "Motivated Full Stack Developer & Hardware Technician skilled in MERN Stack, system optimization, and operational support. Passionate about building scalable web solutions and enhancing organizational efficiency.",
    skills: {
      web: ["React.js", "Node.js", "MongoDB", "Express.js", "Tailwind CSS", "JavaScript (ES6+)"],
      hardware: ["PC Assembling", "Troubleshooting", "OS Setup", "MS Office Suite"],
      soft: ["Customer Support", "Team Collaboration", "Problem Solving", "Time Management"],
      admin: ["Inventory Management", "Documentation","Internet Surfing" ]
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
        duration: "02/2024 - 09/2024",
        desc: [
          "Specialized in PC assembling, hardware upgrades, and system diagnosis.",
          "Performed software installations and OS setups."
        ]
      },
      {
        role: "Hardware Technician",
        company: "STS Computer and Mobile Center",
        duration: "02/2024 - 09/2024",
        desc: [
          "Specialized in PC assembling, hardware upgrades, and system diagnosis.",
          "Performed software installations and OS setups."
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
    { title: " Admission Counseling Website", desc: "MERN Stack admin panel with inventory management.", tags: ["React", "Node", "MongoDB"], link: "#", img: "/ecommerce.png" },
    { title: "Politician Portfolio", desc: "Static site with SEO and animations.", tags: ["React", "Tailwind"], link: "#", img: "/portfolio.png" },
    { title: "Task Manager App", desc: "Productivity tool with drag-and-drop.", tags: ["JS", "Firebase"], link: "#", img: "/taskapp.png" }
  ];

  // --- LOGIC: Handle Email Send ---
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

  // Logic Hooks
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

  const MatrixRain = ({ onClose }) => {
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
      const interval = setInterval(draw, 30);
      return () => clearInterval(interval);
    }, []);
    return (
      <div className="fixed inset-0 z-[9999] bg-black cursor-pointer" onClick={onClose}>
        <canvas ref={canvasRef} className="block" />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-green-500 font-bold text-4xl animate-pulse text-center">ACCESS GRANTED</div>
      </div>
    );
  };

  const JsonView = () => (
    <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="max-w-4xl mx-auto bg-gray-900 text-green-400 p-8 rounded-lg shadow-2xl font-mono text-xs md:text-sm overflow-hidden border border-gray-700 mt-10 mb-10">
      <pre className="whitespace-pre-wrap">{JSON.stringify(resumeData, null, 2)}</pre>
    </motion.div>
  );

  return (
    <div className={`${darkMode ? 'dark bg-gray-950' : 'bg-gray-100'} min-h-screen py-10 transition-colors duration-300 print:bg-white print:py-0`}>
      <div className="fixed top-0 left-0 h-1.5 bg-blue-600 z-[9999]" style={{ width: `${scrollProgress * 100}%` }}></div>

      {/* --- MOBILE POLISHED TOOLBAR --- */}
      <div className="fixed top-3 right-3 md:top-5 md:right-5 flex gap-2 md:gap-3 z-50 print:hidden">
        {/* Hire Me Button */}
        <button onClick={() => setShowContact(true)} className="p-2 md:p-3 rounded-full bg-blue-600 text-white shadow-lg hover:scale-110 transition-transform animate-bounce">
          <Send size={18} className="md:w-5 md:h-5" />
        </button>

        <div className="bg-white dark:bg-gray-800 p-1 rounded-full shadow-lg flex">
          <button onClick={() => setViewMode('ui')} className={`p-2 rounded-full ${viewMode === 'ui' ? 'bg-blue-600 text-white' : 'text-gray-500'}`}><User size={18} /></button>
          <button onClick={() => setViewMode('json')} className={`p-2 rounded-full ${viewMode === 'json' ? 'bg-purple-600 text-white' : 'text-gray-500'}`}><FileJson size={18} /></button>
        </div>
        <button onClick={() => setDarkMode(!darkMode)} className="p-2 md:p-3 rounded-full bg-gray-700 text-white shadow-lg">{darkMode ? <Sun size={18} /> : <Moon size={18} />}</button>
        <button onClick={handleDownload} className="p-2 md:p-3 rounded-full bg-green-600 text-white shadow-lg"><Download size={18} /></button>
      </div>

      <AnimatePresence mode="wait">
        {viewMode === 'json' ? <JsonView key="json" /> : (
          <motion.div key="ui" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="perspective-1000 mb-10">
            {/* --- 3D TILT DISABLED ON MOBILE --- */}
            <Tilt tiltEnable={!isMobile} tiltMaxAngleX={1} tiltMaxAngleY={1} glareEnable={!isMobile} glareMaxOpacity={0.05} className={`max-w-4xl mx-auto bg-white shadow-2xl rounded-sm overflow-hidden print:shadow-none dark:bg-gray-800 dark:text-gray-100`}>
              
              {/* Header: Padding reduced for mobile */}
              <header className="bg-slate-900 text-white p-6 md:p-10 print:p-6">
                <div className="flex flex-col md:flex-row justify-between gap-6">
                  <div className="flex-1">
                    <h1 className="text-3xl md:text-4xl font-bold uppercase tracking-wider">{resumeData.name}</h1>
                    <div className="text-lg md:text-xl text-blue-400 mt-2 font-semibold h-8">
                      <Typewriter options={{ strings: [resumeData.role, 'Hardware Expert', 'MERN Stack Developer'], autoStart: true, loop: true }} />
                    </div>
                    <p className="text-sm text-gray-400 mt-4 leading-relaxed border-l-4 border-blue-500 pl-4">{resumeData.summary}</p>
                    
                    {/* Header 'Hire Me' Text Button */}
                    <button onClick={() => setShowContact(true)} className="mt-6 px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-bold rounded shadow-lg flex items-center gap-2 transition-all">
                      <Send size={16}/> Hire Me Now
                    </button>
                  </div>

                  <div className="text-sm space-y-2 text-gray-300 min-w-[200px] text-left md:text-right">
                    <div className="flex md:justify-end gap-2 items-center"><a href={`tel:${resumeData.contact.phone}`} className="hover:text-blue-400">{resumeData.contact.phone}</a> <Phone size={14}/></div>
                    <div className="flex md:justify-end gap-2 items-center"><a href={`mailto:${resumeData.contact.email}`} className="hover:text-blue-400">{resumeData.contact.email}</a> <Mail size={14}/></div>
                    <div className="flex md:justify-end gap-2 items-center"><span>{resumeData.contact.location}</span> <MapPin size={14}/></div>
                    <div className="flex md:justify-end gap-3 mt-2 text-white">
                      <Github size={18} className="cursor-pointer hover:text-blue-400"/>
                      <Linkedin size={18} className="cursor-pointer hover:text-blue-400"/>
                    </div>
                  </div>
                </div>
              </header>

              {/* Body: Padding adjusted */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 p-6 md:p-8 print:p-6">
                {/* Left Column */}
                <div className="col-span-1 space-y-6 md:space-y-8 md:border-r border-gray-200 md:pr-6 dark:border-gray-700">
                  <section>
                    <h3 className="text-lg font-bold uppercase border-b-2 border-blue-500 pb-1 mb-4 flex items-center gap-2"><Code size={18}/> Web Skills</h3>
                    <div className="flex flex-wrap gap-2">
                      {resumeData.skills.web.map(skill => <span key={skill} className="px-2 py-1 bg-blue-50 dark:bg-blue-900 text-xs rounded border border-blue-100 dark:border-blue-800 text-blue-700 dark:text-blue-200 font-semibold">{skill}</span>)}
                    </div>
                  </section>
                  <section>
                    <h3 className="text-lg font-bold uppercase border-b-2 border-orange-500 pb-1 mb-4 flex items-center gap-2"><BookOpen size={18}/> Learning</h3>
                    <div className="flex flex-wrap gap-2">
                      {resumeData.learning.map(skill => <span key={skill} className="px-2 py-1 bg-orange-50 dark:bg-orange-900 text-xs rounded border border-orange-100 dark:border-orange-800 text-orange-700 dark:text-orange-200 italic">{skill}</span>)}
                    </div>
                  </section>
                  <section>
                    <h3 className="text-lg font-bold uppercase border-b-2 border-green-500 pb-1 mb-4 flex items-center gap-2"><Cpu size={18}/> Hardware</h3>
                    <div className="flex flex-wrap gap-2">
                      {resumeData.skills.hardware.map(skill => <span key={skill} className="px-2 py-1 bg-green-50 dark:bg-green-900 text-xs rounded border border-green-100 dark:border-green-800 text-green-700 dark:text-green-200">{skill}</span>)}
                    </div>
                  </section>

                  {/* --- SOFT & BASIC SKILLS --- */}
                  <section>
                    <h3 className="text-lg font-bold uppercase border-b-2 border-pink-500 pb-1 mb-4 flex items-center gap-2">
                      <Layers size={18}/> Soft & Basic Skills
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {/* Soft Skills */}
                      {resumeData.skills.soft.map(skill => (
                        <span key={skill} className="px-2 py-1 bg-pink-50 dark:bg-pink-900 text-xs rounded border border-pink-100 dark:border-pink-800 text-pink-700 dark:text-pink-200">
                          {skill}
                        </span>
                      ))}
                      
                      {/* Basic/Admin Skills */}
                      {resumeData.skills.admin.map(skill => (
                        <span key={skill} className="px-2 py-1 bg-indigo-50 dark:bg-indigo-900 text-xs rounded border border-indigo-100 dark:border-indigo-800 text-indigo-700 dark:text-indigo-200">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </section>
                  <section>
                    <h3 className="text-lg font-bold uppercase border-b-2 border-gray-400 pb-1 mb-4">Education</h3>
                    {resumeData.education.map((edu, index) => <div key={index} className="mb-3"><h4 className="font-bold text-sm">{edu.degree}</h4><p className="text-xs text-gray-500 dark:text-gray-400">{edu.school} | {edu.year}</p></div>)}
                  </section>
                  {/* --- PERSONAL DETAILS (Wapas aa gaya) --- */}
                  <section>
                    <h3 className="text-lg font-bold uppercase border-b-2 border-gray-400 pb-1 mb-4 flex items-center gap-2">
                      <UserCheck size={18}/> Personal Details
                    </h3>
                    <div className="text-xs space-y-1 text-gray-600 dark:text-gray-400">
                      <p><strong>Father:</strong> {resumeData.personalDetails.fatherName}</p>
                      <p><strong>DOB:</strong> {resumeData.personalDetails.dob}</p>
                      <p><strong>Gender:</strong> {resumeData.personalDetails.gender}</p>
                      <p><strong>Nationality:</strong> {resumeData.personalDetails.nationality}</p>
                    </div>
                  </section>
                </div>

                

                {/* Right Column */}
                <div className="col-span-1 md:col-span-2 space-y-6 md:space-y-8">
                  <section>
                    <h3 className="text-xl font-bold uppercase border-b-2 border-blue-500 pb-1 mb-4 flex items-center gap-2"><Briefcase size={20}/> Work Experience</h3>
                    {resumeData.experience.map((exp, index) => (
                      <div key={index} className="mb-6 relative pl-4 border-l-2 border-gray-300 hover:border-blue-500 transition-colors group">
                        <div className="absolute -left-[9px] top-0 w-4 h-4 bg-gray-400 group-hover:bg-blue-500 rounded-full transition-colors"></div>
                        <h4 className="text-lg font-bold">{exp.role}</h4>
                        <p className="text-sm text-gray-500 font-semibold">{exp.company} | {exp.duration}</p>
                        <ul className="list-disc list-outside ml-4 mt-2 text-sm text-gray-600 dark:text-gray-300 space-y-1">
                          {exp.desc.map((point, i) => <li key={i}>{point}</li>)}
                        </ul>
                      </div>
                    ))}
                  </section>

                  <section>
                    <h3 className="text-xl font-bold uppercase border-b-2 border-blue-500 pb-1 mb-4">Web Projects</h3>
                    <div className="grid grid-cols-1 gap-4">
                      {projects.map((project, index) => (
                        <motion.a href={project.link} key={index} whileHover={{ scale: 1.02 }} className="group block border border-gray-200 rounded-lg p-4 hover:shadow-xl hover:border-blue-400 transition-all bg-gray-50 dark:bg-gray-700 dark:border-gray-600">
                          <div className="flex gap-4 items-start">
                            <div className="w-16 h-16 md:w-20 md:h-20 flex-shrink-0 bg-gray-300 rounded-md overflow-hidden">
                               <img src={project.img} alt="project" className="w-full h-full object-cover opacity-80 group-hover:opacity-100"/>
                            </div>
                            <div>
                              <h4 className="font-bold text-lg group-hover:text-blue-600 flex items-center gap-2">{project.title} <ExternalLink size={14} className="opacity-0 group-hover:opacity-100"/></h4>
                              <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">{project.desc}</p>
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
                 <p>Interactive Resume © 2025 {resumeData.name}. Built with React & Tailwind.</p>
               </div>
            </Tilt>
          </motion.div>
        )}
      </AnimatePresence>

      {/* --- CONTACT POPUP MODAL --- */}
      <AnimatePresence>
        {showContact && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 p-4">
            <motion.div initial={{ scale: 0.8 }} animate={{ scale: 1 }} exit={{ scale: 0.8 }} className="bg-white dark:bg-gray-800 rounded-lg shadow-2xl p-6 w-full max-w-md relative">
              <button onClick={() => setShowContact(false)} className="absolute top-4 right-4 text-gray-500 hover:text-red-500"><X size={20}/></button>
              <h2 className="text-2xl font-bold mb-4 dark:text-white flex items-center gap-2"><Briefcase className="text-blue-600"/> Hire Me</h2>
              <form onSubmit={handleSendEmail} className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold mb-1 dark:text-gray-300">Your Name</label>
                  <input required type="text" className="w-full p-2 border rounded dark:bg-gray-700 dark:text-white" placeholder="Recruiter Name" value={contactForm.name} onChange={e => setContactForm({...contactForm, name: e.target.value})}/>
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
          <motion.div initial={{ x: 100, opacity: 0 }} animate={{ x: 0, opacity: 1 }} exit={{ x: 100, opacity: 0 }} className="fixed bottom-10 right-10 z-[50] max-w-sm">
             <div className="bg-gray-900 border-l-4 border-green-500 p-4 rounded shadow-2xl flex items-start gap-3 text-green-400">
                <div><h4 className="font-bold font-mono text-sm uppercase">System Hint</h4><p className="text-xs mt-1 font-mono text-gray-300">Type <span className="bg-gray-700 text-white px-1">123</span> to unlock Admin Mode.</p></div>
                <button onClick={() => setShowHint(false)} className="text-gray-500 hover:text-white ml-auto">✕</button>
             </div>
          </motion.div>
        )}
      </AnimatePresence>
      {showMatrix && <MatrixRain onClose={() => setShowMatrix(false)} />}
    </div>
  );
};

export default Resume;