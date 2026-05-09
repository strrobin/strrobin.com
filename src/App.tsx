/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect, useMemo, FormEvent } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Menu, X, Github, Linkedin, Twitter, Instagram, Facebook, MessageCircle, Play,
  ArrowRight, Download, Mail, Phone, MapPin, 
  Code, Palette, Layout, Globe, Star, Quote,
  ChevronLeft, ChevronRight, ExternalLink,
  Figma, Database, Layers, Monitor, ShoppingBag, Wand2, Clock, Smartphone, Plane,
  CheckCircle2, Users, Zap, ShieldCheck
} from 'lucide-react';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db, auth } from './lib/firebase';

// --- Components ---

const Navbar = ({ onMenuClick }: { onMenuClick: () => void }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '#' },
    { name: 'About', href: '#about' },
    { name: 'Skill', href: '#skills' },
    { name: 'Services', href: '#services' },
    { name: 'Testimonials', href: '#testimonials' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-bg-dark/80 backdrop-blur-md py-4 border-b border-border-dark' : 'bg-transparent py-6'}`}>
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        <a href="#" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
          <div className="w-10 h-10 rounded-full overflow-hidden border border-border-dark">
            <img 
              src="https://dev-drain-cleaning-one.pantheonsite.io/wp-content/uploads/2026/05/strrobin2.jpg.jpeg" 
              alt="STR Robin" 
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
          </div>
          <span className="text-2xl font-display font-bold tracking-tighter">STR ROBIN</span>
        </a>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a key={link.name} href={link.href} className="text-sm font-medium hover:text-primary transition-colors">
              {link.name}
            </a>
          ))}
        </div>

        <div className="hidden md:flex items-center gap-4">
          <div className="flex gap-3">
            <a href="https://www.facebook.com/share/1GbvuQmFce/" target="_blank" rel="noreferrer"><Facebook size={18} className="cursor-pointer hover:text-primary transition-colors" /></a>
            <a href="https://www.instagram.com/strahmed7?igsh=aW9wMmdpNThydHQx" target="_blank" rel="noreferrer"><Instagram size={18} className="cursor-pointer hover:text-primary transition-colors" /></a>
            <a href="https://x.com/strrobin3y?t=jyBX6XGkg0A-f__Mv3NLrg&s=09" target="_blank" rel="noreferrer"><Twitter size={18} className="cursor-pointer hover:text-primary transition-colors" /></a>
            <a href="https://wa.me/8801309880436" target="_blank" rel="noreferrer"><MessageCircle size={18} className="cursor-pointer hover:text-primary transition-colors" /></a>
            <a href="https://www.tiktok.com/@strrobin1?lang=en" target="_blank" rel="noreferrer"><Play size={18} className="cursor-pointer hover:text-primary transition-colors" /></a>
          </div>
          <button 
            onClick={onMenuClick}
            className="bg-primary p-2 rounded-full hover:scale-110 transition-transform active:scale-95"
          >
            <Menu size={20} />
          </button>
        </div>

        {/* Mobile Menu Toggle */}
        <button className="md:hidden text-white" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
          {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-full left-0 w-full bg-bg-dark border-b border-border-dark p-6 md:hidden"
          >
            <div className="flex flex-col gap-4">
              {navLinks.map((link) => (
                <a 
                  key={link.name} 
                  href={link.href} 
                  className="text-lg font-medium"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {link.name}
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const Hero = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return (
    <section id="home" className="relative pt-24 pb-12 md:pt-32 md:pb-20 overflow-hidden">
      <div className="absolute top-1/4 -right-20 w-[500px] h-[500px] bg-primary/20 rounded-full blur-[120px] animate-pulse"></div>
      <div className="absolute -bottom-20 -left-20 w-[400px] h-[400px] bg-primary/10 rounded-full blur-[100px]"></div>
      
      <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-16 items-center relative z-10">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="text-primary font-medium tracking-widest uppercase text-sm mb-4 block">I AM</span>
          <h1 className="text-6xl md:text-8xl font-bold leading-[1.1] mb-8 tracking-tighter">
            STR ROBIN, <br />
            <span className="text-primary italic relative">
              Wordpress
              <svg className="absolute -bottom-2 left-0 w-full h-3 text-primary/30" viewBox="0 0 100 10" preserveAspectRatio="none">
                <path d="M0 5 Q 25 0, 50 5 T 100 5" fill="none" stroke="currentColor" strokeWidth="2" />
              </svg>
            </span> <br />
            Developer
          </h1>
          <p className="text-gray-400 text-xl mb-10 max-w-xl leading-relaxed font-light">
            Crafting high-performance digital experiences with WordPress. Specializing in bespoke themes, high-converting funnels, and optimized e-commerce solutions.
          </p>
          <div className="flex flex-wrap gap-6 items-center">
            <button className="bg-primary hover:bg-primary/80 text-white px-10 py-5 rounded-full font-bold flex items-center gap-3 transition-all group shadow-[0_10px_30px_rgba(255,0,92,0.3)] hover:-translate-y-1">
              Start a Project <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
            </button>
            <button className="border border-white/10 hover:bg-white/5 text-white px-10 py-5 rounded-full font-bold transition-all hover:-translate-y-1">
              View Portfolio
            </button>
          </div>
          <div className="mt-12 pt-12 border-t border-white/5 flex gap-10">
            <div>
              <div className="text-3xl font-bold mb-1">40+</div>
              <div className="text-xs text-gray-500 uppercase tracking-widest font-medium">Projects Built</div>
            </div>
            <div>
              <div className="text-3xl font-bold mb-1">99%</div>
              <div className="text-xs text-gray-500 uppercase tracking-widest font-medium">Success Rate</div>
            </div>
          </div>
        </motion.div>

        <div className="relative">
          <div className="relative z-10 rounded-3xl overflow-hidden aspect-[4/5] max-w-md mx-auto">
            <img 
              src="https://dev-drain-cleaning-one.pantheonsite.io/wp-content/uploads/2026/05/strrobin2.jpg.jpeg" 
              alt="STR Robin" 
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.src = "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&q=80&w=800&h=1000";
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-bg-dark via-transparent to-transparent"></div>
          </div>
          
          {/* Decorative Elements */}
          <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-primary/20 rounded-full blur-3xl"></div>
          <div className="absolute -top-10 -right-10 w-60 h-60 bg-primary/10 rounded-full blur-3xl"></div>
          
          <div className="absolute bottom-10 -right-4 bg-bg-dark/80 backdrop-blur-md border border-border-dark p-4 rounded-2xl flex items-center gap-4 z-20">
            <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center">
              <Star size={24} fill="white" />
            </div>
            <div>
              <div className="text-2xl font-bold">3+</div>
              <div className="text-xs text-gray-400 uppercase tracking-widest">Years Experience</div>
            </div>
          </div>


        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 mt-20 text-center">
        <p className="text-2xl md:text-3xl font-medium text-gray-300 leading-relaxed max-w-4xl mx-auto">
          I am a <span className="text-primary">WordPress Developer</span> with <span className="text-primary font-bold underline underline-offset-8">3+ years</span> of experience in building modern, responsive, and high-performing websites. I specialize in custom WordPress development, theme customization, and delivering user-friendly digital experiences that help businesses grow online.
        </p>
      </div>
    </section>
  );
};

const About = () => {
  return (
    <section id="about" className="py-16 md:py-32 bg-bg-dark relative overflow-hidden">
      {/* Background accents */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[120px] -translate-x-1/2"></div>
      
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-12 gap-16 items-center">
          
          {/* Left Side: Visual Stats Grid */}
          <div className="lg:col-span-5 grid grid-cols-2 gap-4 md:gap-6">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="glass-card p-8 flex flex-col justify-between h-[240px] hover:border-primary/30 transition-all border border-white/5"
            >
              <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mb-4">
                <CheckCircle2 size={24} className="text-primary" />
              </div>
              <div>
                <div className="text-5xl font-bold text-white mb-2 tracking-tighter">40+</div>
                <div className="text-gray-500 uppercase tracking-widest text-[10px] font-bold">Projects <br /> Completed</div>
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="glass-card p-8 flex flex-col justify-between h-[240px] mt-12 hover:border-primary/30 transition-all border border-white/5 bg-gradient-to-br from-white/[0.03] to-transparent"
            >
              <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mb-4">
                <Users size={24} className="text-primary" />
              </div>
              <div>
                <div className="text-5xl font-bold text-white mb-2 tracking-tighter">100%</div>
                <div className="text-gray-500 uppercase tracking-widest text-[10px] font-bold">Client <br /> Satisfaction</div>
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="glass-card p-8 flex flex-col justify-between h-[240px] -mt-12 hover:border-primary/30 transition-all border border-white/5 bg-gradient-to-tr from-white/[0.03] to-transparent"
            >
              <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mb-4">
                <Zap size={24} className="text-primary" />
              </div>
              <div>
                <div className="text-5xl font-bold text-white mb-2 tracking-tighter">95+</div>
                <div className="text-gray-500 uppercase tracking-widest text-[10px] font-bold">PageSpeed <br /> Score</div>
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="glass-card p-8 flex flex-col justify-between h-[240px] hover:border-primary/30 transition-all border border-white/5"
            >
              <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mb-4">
                <ShieldCheck size={24} className="text-primary" />
              </div>
              <div>
                <div className="text-5xl font-bold text-white mb-2 tracking-tighter">24/7</div>
                <div className="text-gray-500 uppercase tracking-widest text-[10px] font-bold">Security <br /> Monitoring</div>
              </div>
            </motion.div>
          </div>

          {/* Right Side: Content */}
          <div className="lg:col-span-7">
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <span className="text-primary font-bold tracking-[0.3em] uppercase text-xs mb-6 block">ABOUT ME</span>
              <h2 className="text-5xl md:text-7xl font-bold mb-8 leading-[1.1] tracking-tighter">
                Transforming Your Vision into <br />
                <span className="text-primary italic">Digital Reality.</span>
              </h2>
              <p className="text-gray-400 text-lg mb-10 leading-relaxed font-light max-w-2xl">
                With a deep focus on the WordPress ecosystem, I bridge the gap between complex technical requirements and intuitive user experiences. My approach combines clean, scalable code with high-conversion design strategies.
              </p>
              
              <div className="grid sm:grid-cols-2 gap-10 mb-12">
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-primary animate-pulse"></div>
                    <h4 className="font-bold text-white uppercase tracking-wider text-sm">Bespoke Architecture</h4>
                  </div>
                  <p className="text-gray-500 text-sm leading-relaxed">
                    Custom-built themes and plugins designed for longevity, performance, and complete control over your brand identity.
                  </p>
                </div>
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-primary animate-pulse"></div>
                    <h4 className="font-bold text-white uppercase tracking-wider text-sm">Optimization Engine</h4>
                  </div>
                  <p className="text-gray-500 text-sm leading-relaxed">
                    Strategic performance audits and speed optimization to ensure your site loads faster than the competition.
                  </p>
                </div>
              </div>

              <div className="flex flex-wrap gap-8 items-center">
                <button className="bg-primary hover:bg-primary/80 text-white px-10 py-5 rounded-full font-bold flex items-center gap-3 transition-all group shadow-[0_10px_30px_rgba(255,0,92,0.3)]">
                  Explore My Services <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                </button>
                <div className="flex -space-x-3">
                  {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="w-12 h-12 rounded-full border-2 border-bg-dark overflow-hidden">
                      <img src={`https://i.pravatar.cc/100?u=${i}`} alt="Client" className="w-full h-full object-cover" />
                    </div>
                  ))}
                  <div className="w-12 h-12 rounded-full border-2 border-bg-dark bg-white/5 flex items-center justify-center text-[10px] font-bold text-white">
                    +40
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

const ExperienceEducation = () => {
  const experiences = [
    { title: 'SENIOR DEVELOPER', company: 'CodeGenius (USA)', period: '2023 - 2026' },
    { title: 'WEB DEVELOPER', company: 'Modami Tomoli', period: '2023 - 2026' },
    { title: 'UI DESIGNER', company: 'Tech Design Company', period: '2023 - 2026' },
    { title: 'INTERN UI/UX DESIGNER', company: 'USA Web Company', period: '2023 - 2026' },
  ];

  const education = [
    { title: 'PROGRAMMING COURSE', company: 'Harvard University', period: '2020 - 2026' },
    { title: 'GRAPHIC DESIGN COURSE', company: 'University of Denmark', period: '2020 - 2026' },
    { title: 'WEB DESIGN COURSE', company: 'University of California', period: '2020 - 2026' },
    { title: 'DESIGN & TECHNOLOGY', company: 'Parsons, The New School', period: '2020 - 2026' },
  ];

  return (
    <section className="py-12 md:py-20 bg-bg-dark">
      <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-12">
        {/* Experience */}
        <div>
          <div className="flex items-center gap-4 mb-10">
            <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
              <Monitor size={24} className="text-primary" />
            </div>
            <h2 className="text-3xl font-bold">My Experience</h2>
          </div>
          <div className="space-y-6">
            {experiences.map((item, idx) => (
              <div key={idx} className="glass-card relative overflow-hidden group">
                <div className="absolute top-0 left-0 w-1 h-full bg-primary transform -translate-x-full group-hover:translate-x-0 transition-transform"></div>
                <div className="flex justify-between items-start mb-2">
                  <span className="text-xs text-primary font-bold flex items-center gap-2">
                    <div className="w-2 h-2 bg-primary rounded-full"></div>
                    {item.period}
                  </span>
                </div>
                <h3 className="text-xl font-bold mb-1">{item.title}</h3>
                <p className="text-gray-500 text-sm">{item.company}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Education */}
        <div>
          <div className="flex items-center gap-4 mb-10">
            <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
              <Globe size={24} className="text-primary" />
            </div>
            <h2 className="text-3xl font-bold">My Education</h2>
          </div>
          <div className="space-y-6">
            {education.map((item, idx) => (
              <div key={idx} className="glass-card relative overflow-hidden group">
                <div className="absolute top-0 left-0 w-1 h-full bg-primary transform -translate-x-full group-hover:translate-x-0 transition-transform"></div>
                <div className="flex justify-between items-start mb-2">
                  <span className="text-xs text-primary font-bold flex items-center gap-2">
                    <div className="w-2 h-2 bg-primary rounded-full"></div>
                    {item.period}
                  </span>
                </div>
                <h3 className="text-xl font-bold mb-1">{item.title}</h3>
                <p className="text-gray-500 text-sm">{item.company}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

const Skills = () => {
  const designSkills = [
    { name: 'WORDPRESS DESIGN', level: 95, icon: <Database size={20} /> },
    { name: 'ELEMENTOR', level: 90, icon: <Wand2 size={20} /> },
    { name: 'UI/UX DESIGN', level: 75, icon: <Palette size={20} /> },
    { name: 'FIGMA', level: 65, icon: <Figma size={20} /> },
  ];

  const devSkills = [
    { name: 'E-COMMERCE DEV', level: 85, icon: <ShoppingBag size={20} /> },
    { name: 'THEME CUSTOMIZATION', level: 90, icon: <Layers size={20} /> },
    { name: 'SPEED OPTIMIZATION', level: 80, icon: <Clock size={20} /> },
    { name: 'JAVASCRIPT', level: 70, icon: <Code size={20} /> },
  ];

  const SkillCard = ({ skill, index }: any) => (
    <motion.div
      initial={{ opacity: 0, scale: 0.95, y: 20 }}
      whileInView={{ opacity: 1, scale: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ 
        y: -5, 
        rotateX: 2, 
        rotateY: 2,
        boxShadow: "0 20px 40px rgba(0,0,0,0.4)" 
      }}
      className="glass-card p-6 border border-white/5 hover:border-primary/30 transition-all group relative overflow-hidden cursor-default"
    >
      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center gap-3">
          <div className="text-primary group-hover:scale-110 group-hover:rotate-12 transition-transform duration-300">
            {skill.icon}
          </div>
          <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-gray-400 group-hover:text-white transition-colors">{skill.name}</span>
        </div>
        <span className="text-sm font-display font-bold text-primary">{skill.level}%</span>
      </div>
      
      <div className="h-1.5 bg-white/5 rounded-full overflow-hidden backdrop-blur-sm">
        <motion.div 
          initial={{ width: 0 }}
          whileInView={{ width: `${skill.level}%` }}
          viewport={{ once: true }}
          transition={{ duration: 2, ease: [0.22, 1, 0.36, 1], delay: 0.3 }}
          className="h-full bg-gradient-to-r from-primary via-primary/80 to-primary/50 relative rounded-full"
        >
          {/* Animated shine effect on the progress bar */}
          <motion.div 
            animate={{ x: ['-100%', '200%'] }}
            transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
            className="absolute top-0 left-0 h-full w-20 bg-white/20 skew-x-[45deg] blur-sm"
          ></motion.div>
        </motion.div>
      </div>
    </motion.div>
  );

  return (
    <section id="skills-visual" className="py-20 bg-bg-dark relative overflow-hidden">
      {/* Dynamic background glow */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[120px] mix-blend-screen animate-pulse"></div>
      <div className="absolute top-1/3 right-1/4 -translate-y-1/2 w-[400px] h-[400px] bg-primary/5 rounded-full blur-[100px] mix-blend-screen animate-pulse delay-700"></div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-20">
          <div>
            <div className="flex items-center gap-6 mb-12">
              <h2 className="text-3xl font-bold tracking-tight text-white uppercase italic font-display">Design Skill</h2>
              <div className="h-[2px] flex-grow bg-gradient-to-r from-primary to-transparent opacity-20"></div>
            </div>
            <div className="grid sm:grid-cols-1 gap-6">
              {designSkills.map((skill, idx) => (
                <SkillCard key={skill.name} skill={skill} index={idx} />
              ))}
            </div>
          </div>

          <div>
            <div className="flex items-center gap-6 mb-12">
              <h2 className="text-3xl font-bold tracking-tight text-white uppercase italic font-display">Development Skill</h2>
              <div className="h-[2px] flex-grow bg-gradient-to-r from-primary to-transparent opacity-20"></div>
            </div>
            <div className="grid sm:grid-cols-1 gap-6">
              {devSkills.map((skill, idx) => (
                <SkillCard key={skill.name} skill={skill} index={idx + 4} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const Portfolio = () => {
  const [filter, setFilter] = useState('All');
  
  const categories = ['All', 'Branding', 'Creative', 'Design', 'Development', 'UI Design'];
  
  const projects = [
    { id: 1, title: 'SAAS Website Design', category: 'Design', image: 'https://picsum.photos/seed/p1/600/400' },
    { id: 2, title: 'Workout App Design', category: 'UI Design', image: 'https://picsum.photos/seed/p2/600/400' },
    { id: 3, title: 'Website For a Model', category: 'Creative', image: 'https://picsum.photos/seed/p3/600/400' },
    { id: 4, title: 'Personal Portfolio', category: 'Branding', image: 'https://picsum.photos/seed/p4/600/400' },
    { id: 5, title: 'Workout App Design', category: 'Development', image: 'https://picsum.photos/seed/p5/600/400' },
    { id: 6, title: 'Workout App Design', category: 'UI Design', image: 'https://picsum.photos/seed/p6/600/400' },
  ];

  const filteredProjects = filter === 'All' ? projects : projects.filter(p => p.category === filter);

  return (
    <section id="portfolio" className="py-12 md:py-20 bg-bg-dark">
      <div className="max-w-7xl mx-auto px-6 text-center mb-16">
        <span className="text-primary font-medium tracking-widest uppercase text-sm mb-4 block">LATEST PORTFOLIO</span>
        <h2 className="text-4xl md:text-5xl font-bold mb-6">Transforming Ideas into Exceptional</h2>
        <p className="text-gray-400 max-w-2xl mx-auto">
          Business consulting consultants provide expert advice and guide businesses to help them improve their performance, efficiency, and organizational.
        </p>
      </div>

      <div className="max-w-7xl mx-auto px-6 mb-12 flex flex-wrap justify-center gap-4">
        {categories.map(cat => (
          <button 
            key={cat}
            onClick={() => setFilter(cat)}
            className={`px-6 py-2 rounded-full text-sm font-bold transition-all ${filter === cat ? 'bg-primary text-white' : 'bg-card-dark text-gray-400 hover:text-white'}`}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="max-w-7xl mx-auto px-6 grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
        <AnimatePresence mode="popLayout">
          {filteredProjects.map((project) => (
            <motion.div
              layout
              key={project.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.4 }}
              className="glass-card p-0 overflow-hidden group"
            >
              <div className="relative aspect-video overflow-hidden">
                <img 
                  src={project.image} 
                  alt={project.title} 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-primary/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-primary">
                    <ExternalLink size={24} />
                  </div>
                </div>
              </div>
              <div className="p-6">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-xs text-primary font-bold uppercase tracking-widest">{project.category}</span>
                  <button className="text-gray-400 hover:text-primary flex items-center gap-1 text-xs font-bold">
                    View Design <ArrowRight size={14} />
                  </button>
                </div>
                <h3 className="text-xl font-bold">{project.title}</h3>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </section>
  );
};

const Services = () => {
  const services = [
    { 
      title: 'WordPress Design', 
      icon: <Palette size={24} />, 
      desc: 'Custom WordPress themes designed to reflect your brand identity and engage your audience with stunning visuals and intuitive user experience.' 
    },
    { 
      title: 'E-commerce Development', 
      icon: <ShoppingBag size={24} />, 
      desc: 'Complete WooCommerce solutions with payment gateways, inventory management, and conversion-optimized checkout processes.' 
    },
    { 
      title: 'WordPress Theme Customization', 
      icon: <Wand2 size={24} />, 
      desc: 'Customize any WordPress theme to match your exact needs — from layout and typography to advanced styling and functionality.' 
    },
    { 
      title: 'Landing Page Design', 
      icon: <Plane size={24} />, 
      desc: 'High-converting landing pages built with Elementor or custom design — crafted to boost leads, conversions, and engagement.' 
    },
    { 
      title: 'Website Speed Optimization', 
      icon: <Clock size={24} />, 
      desc: 'Boost your website\'s loading speed and performance using caching, image optimization, and code cleanup for a smooth user experience.....' 
    },
    { 
      title: 'Responsive Design', 
      icon: <Smartphone size={24} />, 
      desc: 'Mobile-first approach ensuring your website looks perfect and functions flawlessly across all devices and screen sizes.' 
    },
  ];

  return (
    <section id="services" className="py-12 md:py-20 bg-bg-dark">
      <div className="max-w-7xl mx-auto px-6 text-center mb-16">
        <h2 className="text-5xl md:text-6xl font-bold mb-4">My Services</h2>
        <div className="flex justify-center items-center gap-1">
          <div className="h-[2px] w-8 bg-primary"></div>
          <div className="grid grid-cols-5 gap-1">
            {[...Array(5)].map((_, i) => <div key={i} className="w-1 h-1 bg-primary rounded-full"></div>)}
          </div>
          <div className="h-[2px] w-8 bg-primary"></div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {services.map((service, idx) => (
          <motion.div 
            key={idx}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: idx * 0.1 }}
            className="glass-card p-10 hover:bg-card-dark transition-all group border-border-dark"
          >
            <div className="w-14 h-14 bg-primary/10 rounded-full flex items-center justify-center mb-8 group-hover:bg-primary transition-colors">
              <div className="text-primary group-hover:text-white transition-colors">
                {service.icon}
              </div>
            </div>
            <h3 className="text-2xl font-bold mb-4">{service.title}</h3>
            <p className="text-gray-400 leading-relaxed text-sm">
              {service.desc}
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

const Testimonials = () => {
  const testimonials = useMemo(() => [
    { 
      name: 'Sarah Jenkins', 
      role: 'E-commerce Store Owner', 
      text: 'Robin transformed our sluggish WooCommerce site into a high-performance machine. Our page load time dropped by 60%, and we saw an immediate boost in conversions.', 
      image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=150&h=150&auto=format&fit=crop' 
    },
    { 
      name: 'Michael Chen', 
      role: 'Marketing Director', 
      text: 'The custom landing page Robin built for our latest campaign was perfect. It looks stunning on mobile and works flawlessly. He really understands funnel building.', 
      image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=150&h=150&auto=format&fit=crop' 
    },
    { 
      name: 'Elena Rodriguez', 
      role: 'SaaS Founder', 
      text: 'We had a complex bug in our custom theme that three other developers couldn\'t fix. Robin identified and resolved it in hours. Technical depth is truly impressive.', 
      image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=150&h=150&auto=format&fit=crop' 
    },
    { 
      name: 'David Thompson', 
      role: 'Real Estate Agent', 
      text: 'My new website is fast, secure, and incredibly easy for me to manage. Robin\'s theme customization skills turned my vision into a professional reality.', 
      image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=150&h=150&auto=format&fit=crop' 
    },
    { 
      name: 'Emma Wilson', 
      role: 'Blogger', 
      text: 'I love my new blog! It\'s so fast and the design is beautiful. Robin was a joy to work with and explained everything so clearly. SEO rankings have gone up!', 
      image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=150&h=150&auto=format&fit=crop' 
    },
    { 
      name: 'James Cooper', 
      role: 'Agency CEO', 
      text: 'We outsource our WordPress development to Robin regularly. He\'s reliable, precise, and always delivers on time. A true professional in every sense.', 
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=150&h=150&auto=format&fit=crop' 
    },
  ], []);

  // Split testimonials into two rows for the marquee
  const firstRow = [...testimonials];
  const secondRow = [...testimonials].reverse();

  const MarqueeRow = ({ items, reverse = false, duration = 40 }: { items: typeof testimonials, reverse?: boolean, duration?: number }) => {
    return (
      <div className="flex overflow-hidden group select-none">
        <motion.div
          animate={{ x: reverse ? ["-50%", "0%"] : ["0%", "-50%"] }}
          transition={{ duration, repeat: Infinity, ease: "linear" }}
          className="flex gap-6 whitespace-nowrap py-4"
        >
          {/* Duplicate items for seamless loop */}
          {[...items, ...items].map((t, idx) => (
            <div 
              key={idx} 
              className="glass-card w-[350px] md:w-[450px] shrink-0 p-8 whitespace-normal relative overflow-hidden group/card hover:bg-card-dark transition-colors border-border-dark/50"
            >
              <div className="absolute top-4 right-6 text-primary/10">
                <Quote size={60} fill="currentColor" />
              </div>
              <div className="flex gap-1 mb-4">
                {[...Array(5)].map((_, i) => <Star key={i} size={14} className="text-primary" fill="currentColor" />)}
              </div>
              <p className="text-gray-400 text-sm italic mb-6 leading-relaxed line-clamp-3">
                "{t.text}"
              </p>
              <div className="flex items-center gap-4">
                <img src={t.image} alt={t.name} className="w-12 h-12 rounded-full object-cover grayscale group-hover/card:grayscale-0 transition-all" referrerPolicy="no-referrer" />
                <div>
                  <h4 className="font-bold text-white group-hover/card:text-primary transition-colors">{t.name}</h4>
                  <p className="text-xs text-gray-500">{t.role}</p>
                </div>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    );
  };

  return (
    <section id="testimonials" className="py-16 md:py-24 bg-bg-dark overflow-hidden relative">
      <div className="max-w-7xl mx-auto px-6 text-center mb-16 relative z-10">
        <div className="flex justify-center mb-4">
          <span className="text-primary font-medium tracking-widest uppercase text-xs border border-primary/20 px-3 py-1 rounded-full bg-primary/5">
            Testimonials
          </span>
        </div>
        <h2 className="text-5xl md:text-6xl font-bold mb-6 tracking-tight">
          Awesome <span className="text-primary italic">Clients</span>
        </h2>
        <p className="text-gray-400 max-w-2xl mx-auto text-lg leading-relaxed">
          My awesome clients foundation in WordPress development and a keen eye for design, I specialize in creating fast, secure and responsive websites.
        </p>
      </div>

      <div className="flex flex-col gap-4">
        <MarqueeRow items={firstRow} duration={45} />
        <MarqueeRow items={secondRow} reverse duration={50} />
      </div>
    </section>
  );
};

const Tools = () => {
  const tools = [
    { name: 'WordPress', icon: <Database size={24} />, desc: 'Expert in developing scalable, high-performance websites and bespoke themes tailored for business success.' },
    { name: 'AI Integration', icon: <Wand2 size={24} />, desc: 'Leveraging cutting-edge AI technologies to automate workflows, enhance user experiences, and drive innovation.' },
    { name: 'Figma', icon: <Figma size={24} />, desc: 'Crafting pixel-perfect, intuitive user interfaces and collaborative design systems that bridge vision and reality.' },
    { name: 'Canva', icon: <Layout size={24} />, desc: 'Designing professional-grade marketing assets and visual content with speed, precision, and aesthetic excellence.' },
  ];

  return (
    <section id="skills" className="py-16 md:py-24 bg-bg-dark">
      <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-16 items-center">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          <span className="text-primary font-bold tracking-[0.3em] uppercase text-xs mb-6 block">MY SKILL</span>
          <h2 className="text-4xl md:text-6xl font-bold leading-[1.1] tracking-tighter text-white">My Expert Areas Where I Gained Skill</h2>
          <p className="text-gray-400 mt-8 text-lg font-light leading-relaxed max-w-xl">
            With years of experience in the digital landscape, I have mastered a diverse set of tools that allow me to deliver end-to-end solutions, from strategic AI integration to bespoke WordPress architecture.
          </p>
        </motion.div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {tools.map((tool, idx) => (
            <motion.div 
              key={idx} 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="glass-card group hover:bg-primary/5 p-8 border border-white/5 transition-all"
            >
              <div className="w-14 h-14 bg-bg-dark border border-white/10 rounded-2xl flex items-center justify-center mb-6 group-hover:border-primary transition-all group-hover:scale-110">
                <div className="text-primary">{tool.icon}</div>
              </div>
              <h4 className="text-xl font-bold mb-3 text-white">{tool.name}</h4>
              <p className="text-sm text-gray-500 leading-relaxed font-light">{tool.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

enum OperationType {
  CREATE = 'create',
  UPDATE = 'update',
  DELETE = 'delete',
  LIST = 'list',
  GET = 'get',
  WRITE = 'write',
}

interface FirestoreErrorInfo {
  error: string;
  operationType: OperationType;
  path: string | null;
  authInfo: {
    userId?: string | null;
    email?: string | null;
    emailVerified?: boolean | null;
    isAnonymous?: boolean | null;
    tenantId?: string | null;
    providerInfo?: {
      providerId?: string | null;
      email?: string | null;
    }[];
  }
}

function handleFirestoreError(error: unknown, operationType: OperationType, path: string | null) {
  const errInfo: FirestoreErrorInfo = {
    error: error instanceof Error ? error.message : String(error),
    authInfo: {
      userId: auth.currentUser?.uid,
      email: auth.currentUser?.email,
      emailVerified: auth.currentUser?.emailVerified,
      isAnonymous: auth.currentUser?.isAnonymous,
      tenantId: auth.currentUser?.tenantId,
      providerInfo: auth.currentUser?.providerData?.map(provider => ({
        providerId: provider.providerId,
        email: provider.email,
      })) || []
    },
    operationType,
    path
  }
  console.error('Firestore Error: ', JSON.stringify(errInfo));
  throw new Error(JSON.stringify(errInfo));
}

const Contact = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setIsSubmitted(false);
    
    const form = e.target as HTMLFormElement;
    const formData = new FormData(form);
    const submissionData = Object.fromEntries(formData.entries());
    
    console.log("Submitting form data:", submissionData);

    try {
      // 1. Save to Firestore
      const path = 'submissions';
      try {
        await addDoc(collection(db, path), {
          ...submissionData,
          createdAt: serverTimestamp()
        });
        console.log("Saved to Firestore successfully");
      } catch (error) {
        console.error("Firestore save error:", error);
        handleFirestoreError(error, OperationType.WRITE, path);
      }

      // 2. Also send email via Express/Resend
      try {
        const response = await fetch("/api/contact", {
          method: "POST",
          body: JSON.stringify(submissionData),
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          }
        });
        if (!response.ok) {
          const errData = await response.json();
          console.warn("Email API error:", errData);
        } else {
          console.log("Email sent successfully");
        }
      } catch (emailError) {
        console.error("Email notification network error:", emailError);
      }
      
      setIsSubmitted(true);
      form.reset();
    } catch (error) {
      console.error("Overall submission failure:", error);
      alert("Sorry, there was an error submitting your message. Please check your internet connection.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-12 md:py-20 bg-bg-dark">
      <div className="max-w-7xl mx-auto px-6">
        <div className="bg-card-dark border border-border-dark rounded-[30px] md:rounded-[40px] overflow-hidden grid lg:grid-cols-2">
          <div className="p-8 md:p-12 lg:p-16 flex flex-col justify-between">
            <div>
              <h2 className="text-4xl md:text-5xl font-bold mb-10 md:mb-12">Get Ready To <br /> Create Great</h2>
              <div className="space-y-6 md:space-y-8">
                <div className="flex items-center gap-4 md:gap-6">
                  <div className="w-10 h-10 md:w-12 md:h-12 bg-primary/10 rounded-full flex items-center justify-center shrink-0">
                    <Phone size={18} className="text-primary md:w-5 md:h-5" />
                  </div>
                  <div>
                    <div className="text-[10px] md:text-xs text-gray-500 uppercase tracking-widest mb-1">Phone:</div>
                    <div className="font-bold text-sm md:text-base">01309880436</div>
                  </div>
                </div>
                <div className="flex items-center gap-4 md:gap-6">
                  <div className="w-10 h-10 md:w-12 md:h-12 bg-primary/10 rounded-full flex items-center justify-center shrink-0">
                    <Mail size={18} className="text-primary md:w-5 md:h-5" />
                  </div>
                  <div>
                    <div className="text-[10px] md:text-xs text-gray-500 uppercase tracking-widest mb-1">Email:</div>
                    <div className="font-bold text-sm md:text-base">strrobin363@gmail.com</div>
                  </div>
                </div>
                <div className="flex items-center gap-4 md:gap-6">
                  <div className="w-10 h-10 md:w-12 md:h-12 bg-primary/10 rounded-full flex items-center justify-center shrink-0">
                    <MapPin size={18} className="text-primary md:w-5 md:h-5" />
                  </div>
                  <div>
                    <div className="text-[10px] md:text-xs text-gray-500 uppercase tracking-widest mb-1">Location:</div>
                    <div className="font-bold text-sm md:text-base">Dhaka, Bangladesh</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
 
          <div className="p-8 md:p-12 lg:p-16 bg-bg-dark/40 border-t lg:border-t-0 lg:border-l border-border-dark">
            <h3 className="text-xl md:text-2xl font-bold mb-8 uppercase tracking-widest">GET IN TOUCH</h3>
            <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                <input required name="name" type="text" placeholder="Your Name" className="w-full bg-card-dark border border-border-dark rounded-xl px-5 py-3 md:px-6 md:py-4 outline-none focus:border-primary transition-colors text-sm md:text-base" />
                <input required name="phone" type="text" placeholder="Phone Number" className="w-full bg-card-dark border border-border-dark rounded-xl px-5 py-3 md:px-6 md:py-4 outline-none focus:border-primary transition-colors text-sm md:text-base" />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                <input required name="email" type="email" placeholder="Your Email" className="w-full bg-card-dark border border-border-dark rounded-xl px-5 py-3 md:px-6 md:py-4 outline-none focus:border-primary transition-colors text-sm md:text-base" />
                <input required name="subject" type="text" placeholder="Subject" className="w-full bg-card-dark border border-border-dark rounded-xl px-5 py-3 md:px-6 md:py-4 outline-none focus:border-primary transition-colors text-sm md:text-base" />
              </div>
              <textarea required name="message" placeholder="Your Message" rows={4} className="w-full bg-card-dark border border-border-dark rounded-xl px-5 py-3 md:px-6 md:py-4 outline-none focus:border-primary transition-colors resize-none text-sm md:text-base"></textarea>
              <button disabled={isSubmitting} type="submit" className="w-full bg-primary hover:bg-primary/80 disabled:opacity-50 text-white py-4 rounded-full font-bold flex items-center justify-center gap-2 transition-all group text-sm md:text-base uppercase">
                {isSubmitting ? "Sending..." : "Submit Message"} <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
              </button>
              
              {isSubmitted && (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="p-4 bg-green-500/10 border border-green-500/40 rounded-xl text-green-400 text-center font-bold shadow-lg"
                >
                  Message sent successfully! I'll get back to you soon.
                </motion.div>
              )}
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

const Blog = () => {
  const posts = [
    { id: 1, title: 'The Role of Human Creativity in an Era Dominated by AI', category: 'AI Explore', date: '15 Sep 2025', image: 'https://picsum.photos/seed/b1/600/400' },
    { id: 2, title: 'Future of Web Design: AI, Automation, and No-Code Tools', category: 'AI Explore', date: '15 Sep 2025', image: 'https://picsum.photos/seed/b2/600/400' },
    { id: 3, title: 'The Importance of Showcasing Growth in Portfolio Projects', category: 'Business Solution', date: '15 Sep 2025', image: 'https://picsum.photos/seed/b3/600/400' },
  ];

  return (
    <section id="blog" className="py-20 bg-bg-dark">
      <div className="max-w-7xl mx-auto px-6 text-center mb-16">
        <span className="text-primary font-medium tracking-widest uppercase text-sm mb-4 block">LATEST BLOG</span>
        <h2 className="text-4xl md:text-5xl font-bold mb-6">Transforming Ideas into Exceptional <br /> the man can Creations</h2>
      </div>

      <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-3 gap-8">
        {posts.map((post) => (
          <div key={post.id} className="glass-card p-0 overflow-hidden group">
            <div className="relative aspect-[4/3] overflow-hidden">
              <img 
                src={post.image} 
                alt={post.title} 
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                referrerPolicy="no-referrer"
              />
              <div className="absolute top-4 left-4 bg-primary text-white text-[10px] font-bold px-3 py-1 rounded-full">
                {post.date}
              </div>
            </div>
            <div className="p-6">
              <div className="flex items-center gap-4 text-[10px] text-gray-500 uppercase tracking-widest mb-4">
                <span className="flex items-center gap-1"><Menu size={12} className="text-primary" /> strrobin</span>
                <span className="flex items-center gap-1"><Palette size={12} className="text-primary" /> {post.category}</span>
              </div>
              <h3 className="text-lg font-bold mb-6 group-hover:text-primary transition-colors">{post.title}</h3>
              <button className="text-xs font-bold flex items-center gap-2 group-hover:gap-3 transition-all">
                Read More <ArrowRight size={14} className="text-primary" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

const Footer = () => {
  return (
    <footer className="pt-20 pb-10 bg-bg-dark border-t border-border-dark">
      <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-4 gap-12 mb-20">
          <div className="col-span-1">
            <a href="#" className="flex items-center gap-2 mb-6 hover:opacity-80 transition-opacity">
              <div className="w-10 h-10 rounded-full overflow-hidden border border-border-dark">
                <img 
                  src="https://dev-drain-cleaning-one.pantheonsite.io/wp-content/uploads/2026/05/strrobin2.jpg.jpeg" 
                  alt="STR Robin" 
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
              <span className="text-2xl font-display font-bold tracking-tighter">STR ROBIN</span>
            </a>
          <p className="text-gray-500 text-sm mb-8 leading-relaxed">
            Professional WordPress Developer specializing in custom theme design, e-commerce, and speed optimization.
          </p>
          <div className="flex gap-4">
            <a href="https://www.facebook.com/share/1GbvuQmFce/" target="_blank" rel="noreferrer" className="w-10 h-10 border border-border-dark rounded-full flex items-center justify-center hover:bg-primary hover:border-primary transition-all cursor-pointer">
              <Facebook size={18} />
            </a>
            <a href="https://www.instagram.com/strahmed7?igsh=aW9wMmdpNThydHQx" target="_blank" rel="noreferrer" className="w-10 h-10 border border-border-dark rounded-full flex items-center justify-center hover:bg-primary hover:border-primary transition-all cursor-pointer">
              <Instagram size={18} />
            </a>
            <a href="https://x.com/strrobin3y?t=jyBX6XGkg0A-f__Mv3NLrg&s=09" target="_blank" rel="noreferrer" className="w-10 h-10 border border-border-dark rounded-full flex items-center justify-center hover:bg-primary hover:border-primary transition-all cursor-pointer">
              <Twitter size={18} />
            </a>
            <a href="https://wa.me/8801309880436" target="_blank" rel="noreferrer" className="w-10 h-10 border border-border-dark rounded-full flex items-center justify-center hover:bg-primary hover:border-primary transition-all cursor-pointer">
              <MessageCircle size={18} />
            </a>
          </div>
        </div>

        <div>
          <h4 className="font-bold mb-8 uppercase tracking-widest text-sm">Quick Link</h4>
          <ul className="space-y-4 text-gray-500 text-sm">
            <li><a href="#" className="hover:text-primary transition-colors">Home</a></li>
            <li><a href="#about" className="hover:text-primary transition-colors">About</a></li>
            <li><a href="#skills" className="hover:text-primary transition-colors">Skill</a></li>
            <li><a href="#services" className="hover:text-primary transition-colors">Services</a></li>
            <li><a href="#testimonials" className="hover:text-primary transition-colors">Testimonials</a></li>
            <li><a href="#contact" className="hover:text-primary transition-colors">Contact</a></li>
          </ul>
        </div>

        <div>
          <h4 className="font-bold mb-8 uppercase tracking-widest text-sm">Contact</h4>
          <ul className="space-y-6 text-gray-500 text-sm">
            <li className="flex items-start gap-3">
              <Mail size={18} className="text-primary shrink-0" />
              <span>strrobin363@gmail.com</span>
            </li>
            <li className="flex items-start gap-3">
              <MapPin size={18} className="text-primary shrink-0" />
              <span>Dhaka, Bangladesh</span>
            </li>
            <li className="flex items-start gap-3">
              <Phone size={18} className="text-primary shrink-0" />
              <span>01309880436</span>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="font-bold mb-8 uppercase tracking-widest text-sm">Newsletter</h4>
          <p className="text-gray-500 text-sm mb-6 leading-relaxed">
            Subscribe to my newsletter and get weekly updates and learn about AI & Internet things.
          </p>
          <div className="relative">
            <input 
              type="email" 
              placeholder="Your e-mail" 
              className="w-full bg-card-dark border border-border-dark rounded-full px-6 py-4 outline-none focus:border-primary transition-colors pr-16"
            />
            <button className="absolute right-2 top-1/2 -translate-y-1/2 w-12 h-12 bg-primary rounded-full flex items-center justify-center hover:bg-primary/80 transition-all">
              <ArrowRight size={20} />
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 pt-10 border-t border-border-dark flex flex-col md:row justify-between items-center gap-6">
        <p className="text-xs text-gray-500">Copyright © 2026 STR ROBIN All Rights Reserved.</p>
        <div className="flex gap-8 text-xs text-gray-500">
          <a href="#" className="hover:text-primary transition-colors">Terms & Condition</a>
          <a href="#" className="hover:text-primary transition-colors">Privacy Policy</a>
          <a href="#" className="hover:text-primary transition-colors">Contact Us</a>
        </div>
        <button 
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="w-10 h-10 bg-primary rounded-full flex items-center justify-center hover:bg-primary/80 transition-all"
        >
          <ArrowRight size={20} className="-rotate-90" />
        </button>
      </div>
    </footer>
  );
};

const Sidebar = ({ isOpen, onClose }: { isOpen: boolean, onClose: () => void }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100]"
          />
          {/* Sidebar Area */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed top-0 right-0 h-full w-full max-w-[420px] bg-[#0A0A0A] z-[101] shadow-2xl overflow-y-auto thin-scrollbar"
          >
            <div className="p-10">
              <div className="flex justify-between items-center mb-12">
                <a href="#" onClick={onClose} className="flex items-center gap-2 hover:opacity-80 transition-opacity">
                  <div className="w-10 h-10 rounded-full overflow-hidden border border-white/10">
                    <img 
                      src="https://dev-drain-cleaning-one.pantheonsite.io/wp-content/uploads/2026/05/strrobin2.jpg.jpeg" 
                      alt="STR Robin" 
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                  <span className="text-2xl font-display font-bold tracking-tighter text-white">STR ROBIN</span>
                </a>
                <button 
                  onClick={onClose}
                  className="w-10 h-10 border border-white/10 rounded-full flex items-center justify-center hover:bg-primary transition-all text-gray-400 hover:text-white"
                >
                  <X size={20} />
                </button>
              </div>

              <div className="mb-10 rounded-3xl overflow-hidden aspect-[4/3] relative group shadow-2xl">
                <img 
                  src="https://dev-drain-cleaning-one.pantheonsite.io/wp-content/uploads/2026/05/strrobin2.jpg.jpeg" 
                  alt="STR Robin" 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-transparent to-transparent opacity-80"></div>
              </div>

              <div className="space-y-6 mb-12">
                <h3 className="text-2xl font-bold text-white tracking-tight leading-tight">
                  Premium Freelance <span className="text-primary italic">Developer</span> delivering exceptional digital solutions.
                </h3>
                <p className="text-gray-400 text-base leading-relaxed font-light">
                  I am a professional WordPress developer and UX/UI enthusiast. I specialize in building high-performance websites, high-converting funnels, and optimized digital experiences that drive growth.
                </p>
              </div>

              <div className="space-y-8 mb-16">
                <div className="flex items-center gap-5 group">
                  <div className="w-14 h-14 bg-white/5 rounded-2xl flex items-center justify-center shrink-0 border border-white/5 group-hover:border-primary/30 transition-colors">
                    <Phone size={24} className="text-primary" />
                  </div>
                  <div>
                    <div className="text-[10px] text-gray-500 uppercase tracking-widest font-bold mb-1">CALL NOW</div>
                    <div className="text-white font-bold text-lg tracking-wide">01309880436</div>
                  </div>
                </div>

                <div className="flex items-center gap-5 group">
                  <div className="w-14 h-14 bg-white/5 rounded-2xl flex items-center justify-center shrink-0 border border-white/5 group-hover:border-primary/30 transition-colors">
                    <Mail size={24} className="text-primary" />
                  </div>
                  <div>
                    <div className="text-[10px] text-gray-500 uppercase tracking-widest font-bold mb-1">MAIL US</div>
                    <div className="text-white font-bold text-lg tracking-wide">strrobin363@gmail.com</div>
                  </div>
                </div>

                <div className="flex items-center gap-5 group">
                  <div className="w-14 h-14 bg-white/5 rounded-2xl flex items-center justify-center shrink-0 border border-white/5 group-hover:border-primary/30 transition-colors">
                    <MapPin size={24} className="text-primary" />
                  </div>
                  <div>
                    <div className="text-[10px] text-gray-500 uppercase tracking-widest font-bold mb-1">MY ADDRESS</div>
                    <div className="text-white font-bold text-lg tracking-wide">Dhaka, Bangladesh</div>
                  </div>
                </div>
              </div>

              <div className="pt-10 border-t border-white/5">
                <div className="text-xs text-white uppercase tracking-[0.3em] font-bold mb-6">FIND WITH ME</div>
                <div className="flex gap-4">
                  {[
                    { icon: <Facebook size={20} />, href: 'https://www.facebook.com/share/1GbvuQmFce/' },
                    { icon: <Instagram size={20} />, href: 'https://www.instagram.com/strahmed7?igsh=aW9wMmdpNThydHQx' },
                    { icon: <Twitter size={20} />, href: 'https://x.com/strrobin3y?t=jyBX6XGkg0A-f__Mv3NLrg&s=09' },
                    { icon: <MessageCircle size={20} />, href: 'https://wa.me/8801309880436' }
                  ].map((social, i) => (
                    <a 
                      key={i}
                      href={social.href} 
                      target="_blank" 
                      rel="noreferrer" 
                      className="w-12 h-12 bg-white/5 hover:bg-primary rounded-xl flex items-center justify-center transition-all text-gray-400 hover:text-white shadow-lg hover:-translate-y-1"
                    >
                      {social.icon}
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-bg-dark">
      <Navbar onMenuClick={() => setIsSidebarOpen(true)} />
      <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
      <Hero />
      <About />
      <ExperienceEducation />
      <Skills />
      <Services />
      <Testimonials />
      <Tools />
      <Contact />
      <Footer />
      {/* Sticky WhatsApp Button */}
      <a 
        href="https://wa.me/8801309880436" 
        target="_blank" 
        rel="noreferrer"
        className="fixed bottom-8 right-8 z-[999] bg-[#25D366] text-white p-4 rounded-full shadow-2xl hover:scale-110 active:scale-95 transition-transform flex items-center justify-center group"
        aria-label="Contact on WhatsApp"
      >
        <MessageCircle size={32} fill="currentColor" className="text-white" />
        <span className="absolute right-full mr-4 bg-white text-black px-4 py-2 rounded-lg text-sm font-bold opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap shadow-xl pointer-events-none">
          Chat with me!
        </span>
      </a>
    </div>
  );
}
