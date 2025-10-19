    import { useEffect, useState } from "react";
    import { motion, AnimatePresence } from "framer-motion";
    import { FaReact, FaPhp, FaLaravel, FaGithub, FaEnvelope, FaLinkedin, FaWhatsapp, FaInstagram } from "react-icons/fa";
    import { SiTypescript, SiNextdotjs, SiTailwindcss, SiJavascript } from "react-icons/si";
    import type { ReactElement } from "react";
    import AOS from 'aos';
    import 'aos/dist/aos.css';

    export default function App() {

        const [menuOpen, setMenuOpen] = useState(false);
        const [isScrolling, setIsScrolling] = useState(false)
        const [selectedProject, setSelectedProject] = useState<number | null>(null);
        const [activeSection, setActiveSection] = useState<string | null>(null);

        useEffect(() => {
            let timeout: ReturnType<typeof setTimeout>;

            const handlescroll = () => {
                setIsScrolling(true);
                clearTimeout(timeout);
                timeout = setTimeout(() => {
                    setIsScrolling(false);
                }, 200);
            };
            window.addEventListener("scroll", handlescroll);
            return () => {
                window.removeEventListener("scroll", handlescroll);
                clearTimeout(timeout);
            };
        }, []);

        useEffect(() => {
            const sections = document.querySelectorAll("section[id]");
            const observer = new IntersectionObserver(
                (entries) => {
                    let visibleSection: string | null = null;
                    entries.forEach((entry) => {
                        if (entry.isIntersecting) {
                            visibleSection = entry.target.id;
                        }
                    });
                    if (visibleSection) {
                        setActiveSection(visibleSection);
                    } else {
                        const TopSection = (sections[0] as HTMLElement)?.getBoundingClientRect().top || 0;
                        if (TopSection > 150) {
                            setActiveSection(null);
                        }
                    }
                },
                {   root: null,
                    rootMargin: "-50% 0px -50% 0px",
                    threshold: [0, 0.3, 0.5],
                }
            );
            sections.forEach((section) => observer.observe(section));
            return () => sections.forEach((section) => observer.unobserve(section));
        }, []);

        useEffect(() => {
            AOS.init();
        }, []);


        interface skill {
            name: string;
            icon: ReactElement;
            }
        
        const skills: skill [] = [
            {name: "React", icon: <FaReact size = {55} className = "text-cyan-400 icon-size"/>},
            {name: "PHP", icon: <FaPhp size = {55} className = "text-gray-400 icon-size"/>},
            {name: "Laravel", icon: <FaLaravel size = {55} className = "text-red-500 icon-size"/>},
            {name: "TypeScript", icon: <SiTypescript size = {55} className = "text-blue-500 icon-size"/>},
            {name: "Next.js", icon: <SiNextdotjs size = {55} className = "text-green-400 icon-size"/>},
            {name: "Tailwind", icon: <SiTailwindcss size = {55} className = "text-[#06b6d4] icon-size"/>},
            {name: "Javascript", icon: <SiJavascript size = {55} className = "text-yellow-400 icon-size"/>}
        ]

        interface project {
            id: number;
            name: string;
            description: string;
            year: string;
            role: string;
            image: string;
        }
        const projects: project [] = [
            {
                id: 1,
                name: "Braniacs e-commerce Website",
                description: "Braniacs is an simple E-commerce website built using Laravel and Tailwind CSS framework. This website is designed to focus on implementing a complete CRUD system for managing products, allowing admins can easily add, edit, or remove products from the database through the built-in dashboard.",
                year: "2024",
                role: "Fullstack Developer",
                image: "/project1.png",
            },
            {
                id: 2,
                name: "Bike Store Website",
                description: "This website is fully built using Javascript and SQL. The website displays bike products dynamically, with data fetched directly from an SQL database. This website allow user to explore various category such as new products, discounted items, and popular bikes.",
                year: "2025",
                role: "Fullstack Developer",
                image: "/project2.png",
            },
            {
                id: 3,
                name: "Website UMKM MysticalNeko",
                description: "MysthicalNeko is a platform built for local online UMKM accesory store, developed using JavaScript and the Tailwind CSS framework. This website is designed to promote MysthicalNeko's products and support simple product management through a clean and user friendly interface.",
                year: "2025",
                role: "Frontend Developer",
                image: "/project3.png",
            },
            { id: 4,
                name: "Website e-commerce with ERP system (ONGOING)",
                description: " An e-commerce platform combined with an ERP system built using Laravel to manage products and employees. The frontend is developed with Next.js, Typescript, and Tailwind CSS, connected to the Laravel backend via API. This project is currently under development",
                year: "2025",
                role: "Fullstack Developer",
                image: "/project4.png",
            },
        ];
        
        interface contact {
            name: string;
            icon: ReactElement;
            link: string;
            }
        const contacts: contact [] = [
            {name: "Email", link: "mailto:andrichens4@gmail.com", icon: <FaEnvelope size = {55} className = "text-[#06b6d4] icon-size"/>},
            {name: "GitHub", link: "https://github.com/Ndriiii", icon: <FaGithub size = {55} className = "text-[#C0C0C0] icon-size"/>},
            {name: "LinkedIn", link: "https://www.linkedin.com/in/andri-jlis-4a3510370/", icon: <FaLinkedin size = {55} className = "text-[#0A66C2] icon-size"/>},
            {name: "Whatsapp", link: "https://wa.me/6282174877794", icon: <FaWhatsapp size = {55} className = "text-[#25D366] icon-size"/>},
            {name: "Instagram", link: "https://www.instagram.com/drichn_" , icon: <FaInstagram size = {55} className = "text-[#E1306C] icon-size"/>},
        ]

        return (
            <main className = "relative min-h-screen bg-[#0a0a0a] text-white overflow-hidden flex flex-col">
                <motion.nav 
                    initial = {{ y : 0 }}
                    animate = {{ y: isScrolling ? -100 : 0 }}
                    transition = {{ duration: 0.3}}
                    className = "fixed z-20 w-full mt-6 flex items-center justify-center"
                >
                    <div className = "hidden md:flex gap-6 rounded-xl bg-white/10 px-8 py-3 backdrop-blur-md border border-white/20 text-base">
                        <a href = "#about" 
                            className = {`transition ${activeSection === "about" ? "text-cyan-400 font-semibold" : "hover:text-cyan-400"}`}> 
                                About 
                        </a>
                        <a href = "#skills" 
                            className = {`transition ${activeSection === "skills" ? "text-cyan-400 font-semibold" : "hover:text-cyan-400"}`}> 
                                Skills 
                        </a>
                    <a href = "#projects" 
                            className = {`transition ${activeSection === "projects" ? "text-cyan-400 font-semibold" : "hover:text-cyan-400"}`}> 
                                Projects 
                        </a>
                        <a href = "#contact" 
                            className = {`transition ${activeSection === "contact" ? "text-cyan-400 font-semibold" : "hover:text-cyan-400"}`}> 
                                Contact 
                        </a>
                    </div>

                    {/*Other view*/}
                    <button className = "md:hidden flex flex-col gap-1.5 absolute top-6 left-6 z-30 cursor-pointer"
                        onClick={() => setMenuOpen(!menuOpen)}>
                        <span className = "w-7 h-0.5 bg-white"></span>
                        <span className = "w-7 h-0.5 bg-white"></span>
                        <span className = "w-7 h-0.5 bg-white"></span>
                    </button>
                </motion.nav>

                <AnimatePresence>
                    {menuOpen && (
                        <motion.div
                            initial = {{ x: "-100%" }}
                            animate = {{ x: 0 }}
                            exit = {{ x: "-100%" }}
                            transition = {{ duration: 0.4, ease: "easeInOut" }}
                            className = "fixed top-0 left-0 w-full h-full bg-[#0a0a0a] flex flex-col items-center justify-center gap-8 text-2xl md:hidden z-20">

                            {/*Close Button*/}
                            <button className = "absolute top-6 right-6 text-white text-3xl cursor-pointer"
                                onClick = {() => setMenuOpen(false)}>
                                ✕
                            </button>

                            <a href = "#about" onClick={() => setMenuOpen(false)}
                                className = {`${activeSection === "about" ? "text-cyan-400 font-semibold" : "hover:text-cyan-400"} transition`}>
                                    About
                            </a>
                            <a href = "#skills" onClick={() => setMenuOpen(false)}
                                className = {`${activeSection === "skills" ? "text-cyan-400 font-semibold" : "hover:text-cyan-400"} transition`}>
                                    Skills
                            </a>
                            <a href = "#projects" onClick={() => setMenuOpen(false)}
                                className = {`${activeSection === "projects" ? "text-cyan-400 font-semibold" : "hover:text-cyan-400"} transition`}>
                                    Projects
                            </a>
                            <a href = "#contact" onClick={() => setMenuOpen(false)}
                                className = {`${activeSection === "contact" ? "text-cyan-400 font-semibold" : "hover:text-cyan-400"} transition`}>
                                    Contact
                            </a>
                        </motion.div>
                    )}
                </AnimatePresence>

                <section className = "relative z-10 min-h-screen flex flex-col items-center justify-center text-center">
                    <motion.div
                        className = "absolute left-[-200px] top-1/2 w-[550px] h-[550px] rounded-full blur-3xl opacity-50 mix-blend-screen"
                            animate = {{
                                background: [
                                    "linear-gradient(to right, #3b82f6, #06b6d4, #22d3ee)",
                                    "linear-gradient(to right, #a855f7, #ec4899, #f43f5e)",
                                    "linear-gradient(to right, #22c55e, #84cc16, #eab308)",
                                    "linear-gradient(to right, #3b82f6, #06b6d4, #22d3ee)",
                                ],
                            }}
                        transition = {{ duration: 15, repeat: Infinity, ease: "linear" }}
                    />
                    <motion.div
                        className = "absolute right-[-200px] top-0 -translate-y-1/2 w-[550px] h-[550px] rounded-full blur-3xl opacity-50 mix-blend-screen"
                            animate = {{
                                background: [
                                    "linear-gradient(to right, #a855f7, #ec4899, #f43f5e)",
                                    "linear-gradient(to right, #22c55e, #84cc16, #eab308)",
                                    "linear-gradient(to right, #3b82f6, #06b6d4, #22d3ee)",
                                    "linear-gradient(to right, #a855f7, #ec4899, #f43f5e)",
                                ],
                            }}
                        transition = {{ duration: 15, repeat: Infinity, ease: "linear", delay: 5 }}
                    />
                    <h1 className = "text-4xl sm:text-5xl font-bold text-gray-400 leading-tight"> Welcome to my Portfolio, </h1>
                    <h2 className = "text-4xl sm:text-5xl font-bold mt-2 text-white"> I’m Andri </h2>
                    <p className = "mt-6 text-xl text-gray-300 font-medium"> Information System student | Frontend Developer  </p>
                </section>

                <section id = "skills"  className = "relative z-10  flex flex-col justify-center text-center px-6 py-6 bg-gradient-to-br from-[#0a0a0a] to-[#111111] rounded-3xl">
                    <h2 className = "text-4xl font-bold text-white mb-12"> My Skills </h2>
                    
                    {/* Other view*/}
                    <div className = "lg:hidden w-full">
                    <div data-aos = "fade-left" className = "flex flex-wrap justify-center gap-8 sm:gap-8">
                        {skills.map((skill, index) => (
                            <div key = {index} className = "flex flex-col items-center justify-center rounded-2xl bg-[#1a1a1a] shadow-md transition w-[90px] h-[110px] sm:w-[130px] sm:h-[150px]">
                                <div>
                                    {skill.icon}
                                </div>
                                <p className = "mt-2 text-xs sm:text-sm font-medium text-gray-400 text-center"> {skill.name} </p>
                            </div>
                        ))}
                    </div>
                </div>

                    {/* Desktop*/}

                    <div data-aos = "fade-left" className = "hidden lg:grid lg:grid-cols-7 gap-8 max-w-8xl w-full">
                        {skills.map((skill, index) => (
                            <div key = {index} className = "flex flex-col items-center justify-center p-8 rounded-2xl bg-[#1a1a1a] shadow-md hover:scale-105 transition duration-300 w-48 lg:w-34 xl:w-48">
                                {skill.icon}
                                <p className = "mt-4 xl:text-3xl lg:text-2xl font-medium text-gray-400"> {skill.name} </p>
                            </div>
                        ))}
                    </div>
                </section>

                <section id = "about" className = "min-h-screen relative z-10 flex flex-col md:flex-row items-center justify-center gap-12 px-10 py-20 bg-gradient-to-br from-[#0a0a0a] to-[#111111]">
                    <div data-aos = "fade-right" data-aos-duration = "800" className = "flex-1 order-2 md:order-1 text-left">
                        <h2 className = "text-4xl font-bold text-white mb-6"> About Me </h2>
                        <p className = "text-gray-300 text-xl mb-8 text-justify">
                            I’m an Information Systems student passionate about web development. I have hands-on experience 
                            with HTML, CSS, JavaScript, and PHP, including various frameworks. I enjoy building functional,
                            user-friendly, and dynamic web applications while continuously exploring new technologies to 
                            enhance my development skills.
                        </p>
                        <div>
                            <h3 className = "text-3xl font-semibold text-white mb-4"> Education History </h3>
                            <ul className = "space-y-4">
                                <li className = "border-l-2 border-cyan-400 pl-4">
                                    <p className = "text-cyan-400 font-medium text-lg"> Universitas Internasional Batam</p>
                                    <p className = "text-gray-400 text-sm"> Bachelor of Computer Science ( 2022 - Present )</p>
                                </li>
                                <li className = "border-l-2 border-cyan-400 pl-4">
                                    <p className = "text-cyan-400 font-medium text-lg"> SMA Santa Maria Pekanbaru </p>
                                    <p className = "text-gray-400 text-sm"> Science Major ( 2021 - 2024 )</p>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div data-aos = "fade-left" data-aos-duration = "800" className = "flex-1 flex justify-center order-1 md:order-2">
                        <div className = "relative w-64 h-64 md:w-90 md:h-90 rounded-full overflow-hidden border-4 border-cyan-400 shadow-[0_0_50px_#06b6d4]">
                            <img src = "/profile.JPG" alt = "Andri" className = "w-full h-full object-cover"
                            />
                        </div>
                    </div> 
                </section>

                <section id = "projects" data-aos = "fade-down" className = "relative z-10 flex flex-col md:flex-row items-center justify-center gap-12 px-10 py-20 bg-gradient-to-br from-[#0a0a0a] to-[#111111]"> 
                    <motion.div
                        className = "absolute inset-0 rounded-3xl border-[4px] blur-[2px] pointer-events-none"
                        animate = {{
                            borderColor: [
                                "#a855f7",
                                "#ec4899",
                                "#f43f5e",
                                "#22c55e",
                                "#84cc16",
                                "#eab308",
                                "#3b82f6",
                                ],
                            }}
                            transition = {{ duration: 10, repeat: Infinity, ease: "linear" }}
                            style = {{
                                padding: "4px",
                                mask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
                                WebkitMaskComposite: "xor",
                                maskComposite: "exclude"
                            }}
                    />
                    <div className = "flex-1">
                        <h2 className = "text-3xl font-bold text-white mb-8 lg:text-left lg:text-4xl text-center"> My Projects </h2>
                        <div className = "space-y-6">
                            {projects.map((project) => {
                                const active = selectedProject === project.id;
                                return (
                                    <div key = {project.id} className = "mb-6">
                                        <button onClick = {() =>
                                            setSelectedProject(active ? null : project.id)
                                        }
                                        className = "w-full text-left text-xl md:text-2xl font-semibold text-cyan-500 hover:text-white transition">
                                            {project.name}
                                        </button>
                                        <motion.div
                                            initial = {{ scaleX: 0 }}
                                            animate = {{ scaleX: selectedProject === project.id ? 1 : 0 }}
                                            transition = {{ duration: 0.6, ease: "easeInOut" }}
                                            className = "h-[2px] bg-cyan-400 mt-1 origin-left"
                                        />
                                        <AnimatePresence mode = "wait">
                                            {active  && (
                                                <motion.div
                                                    key = {`mobile-${project.id}`}
                                                    initial = {{ opacity: 0, y: -10, clipPath: "inset(0 0 100% 0)" }}
                                                    animate = {{ opacity: 1, y: 0, clipPath: "inset(0 0 0% 0)" }}
                                                    exit = {{ opacity: 0, y: -10, clipPath: "inset(0 0 100% 0)" }}
                                                    transition = {{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
                                                    className = " block lg:hidden text-gray-300 mt-2 text-base md:text-lg leading-relaxed overflow-hidden"
                                                >
                                                    <p className = "italic text-sm text-cyan-400 mb-1">
                                                        {project.year} • {project.role}
                                                    </p>
                                                    <p> {project.description} </p>
                                                    <div className = "lg:hidden mt-4 flex justify-center">
                                                        <motion.img
                                                            key = {`img-${project.id}`}
                                                            src = {project.image}
                                                            alt = {project.name}
                                                            initial = {{ opacity: 0, scale: 0.95 }}
                                                            animate = {{ opacity: 1, scale: 1 }}
                                                            exit = {{ opacity: 0, scale: 0.95 }}
                                                            transition = {{ duration: 0.2, ease: "easeOut" }}
                                                            className = "w-[320px] sm:w-[450px] md:w-[600px] rounded-xl shadow-lg -mt-2"
                                                        />
                                                    </div>
                                                </motion.div>
                                            )}
                                        </AnimatePresence>
                                        <AnimatePresence>
                                            {active && (
                                                <motion.div
                                                    key = {`desktop-${project.id}`}
                                                    initial = {{ opacity: 0, height: 0 }}
                                                    animate = {{ opacity: 1, height: "auto" }}
                                                    exit = {{ opacity: 0, height: 0 }}
                                                    transition = {{ duration: 0.3 }}
                                                    className = "hidden lg:block text-gray-300 mt-2 text-base md:text-lg leading-relaxed overflow-hidden"
                                                >
                                                    <p className = "italic text-sm text-cyan-400 mb-1">
                                                        {project.year} • {project.role}
                                                    </p>    
                                                    <p> {project.description} </p>  
                                                </motion.div>
                                            )}
                                        </AnimatePresence>
                                    </div>
                                );
                            })}
                        </div>
                    </div>

                    <div className = "hidden lg:flex flex-1 justify-center items-center w-full mt-10 md:mt-0">
                            <AnimatePresence mode = "wait">
                                    <motion.div
                                        key = { selectedProject ?? "default" }
                                        initial = {{ rotateY: 90, opacity: 0 }}
                                        animate = {{ rotateY: 0, opacity: 1 }}
                                        exit = {{ rotateY: -90, opacity: 0 }}
                                        transition = {{duration: 0.5, ease: "easeOut"}}
                                        whileHover = { selectedProject ?
                                            {
                                            scale: 1.05,
                                            rotateX: 5,
                                            rotateY: -5,
                                            boxShadow: "0 15px 30px rgba(6,182,212,0.5)",
                                            }
                                        : {}
                                        }
                                        className = "max-w-full max-h-full object-contain rounded-2xl overflow-hidden cursor-pointer shadow-lg"
                                        style = {{ perspective: 1000 }}
                                    >
                                        {selectedProject ? (
                                        <img 
                                            src = { projects[selectedProject - 1].image }
                                            alt = {projects[selectedProject - 1].name}
                                            className = "w-full h-full rounded-2xl"
                                        />
                                        ) : (
                                            <p className = "text-gray-400 text-lg italic"> Select a project to preview </p>
                                        )}
                                    </motion.div>
                            </AnimatePresence>
                    </div>
                </section>
                
                <section id = "contact" data-aos = "fade-up" className = "relative z-10 flex flex-col items-center justify-center bg-gradient-to-b from-[#0a0a0a] to-[#111111] text-white px-6 py-20">
                    <h2 className = "text-5xl font-extrabold mb-12">
                        <span className = "bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
                            Contact Me
                        </span>
                    </h2>

                    {/* Mobile */}

                    <div className = "md:hidden w-full">
                        <div data-aos = "fade-left" className = "flex flex-wrap justify-center gap-8 sm:gap-8">
                            {contacts.map((contact, index) => (
                                <motion.a key = {index} href = {contact.link} aria-label={contact.name} target = "_blank" className = "flex flex-col items-center justify-center rounded-2xl transition">
                                    {contact.icon}
                                </motion.a>
                            ))}
                        </div>
                    </div>

                    {/* Desktop and Tablet */}
                    
                    <div className = "hidden md:flex flex-wrap justify-center gap-10 text-5xl">
                        {contacts.map((contact, index) => (
                            <motion.a key = {index} href = {contact.link} target = "_blank" aria-label={contact.name} whileHover = {{ scale: 1.2 }} className = "transition-all">
                                {contact.icon}
                            </motion.a>
                        ))}
                    </div>
                </section> 
            </main>
        );
    }
