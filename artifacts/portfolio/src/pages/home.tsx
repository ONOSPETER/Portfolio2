import { motion } from "framer-motion";
import { ArrowRight, ChevronRight, Mail, MapPin, Briefcase, GraduationCap } from "lucide-react";
import { SiPython, SiTypescript, SiNextdotjs, SiReact, SiTailwindcss, SiFigma } from "react-icons/si";
import { FaGithub, FaTwitter, FaWhatsapp } from "react-icons/fa";
import { Button } from "@/components/ui/button";

export default function Home() {
  const fadeInUp = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      {/* Decorative Background Elements */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-primary/10 blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-primary/5 blur-[120px]" />
      </div>

      <main className="relative z-10 container mx-auto px-6 py-12 md:py-24 max-w-5xl">
        {/* HERO SECTION */}
        <motion.section 
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
          className="min-h-[85vh] flex flex-col justify-center"
        >
          <motion.div variants={fadeInUp} className="mb-4">
            <span className="text-primary font-mono text-sm tracking-wider uppercase bg-primary/10 px-4 py-2 rounded-full border border-primary/20">
              Information Systems Student & Full-Stack Developer
            </span>
          </motion.div>
          
          <motion.h1 variants={fadeInUp} className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight mb-6">
            Hi, I'm <span className="text-gradient">Peter Obiegba.</span>
          </motion.h1>
          
          <motion.p variants={fadeInUp} className="text-xl md:text-2xl text-muted-foreground max-w-2xl mb-10 leading-relaxed">
            I engineer sharp, scalable web applications, build custom data pipelines, and design interfaces that don't suck. 
            Bridging the gap between complex data and beautiful design.
          </motion.p>
          
          <motion.div variants={fadeInUp} className="flex flex-wrap gap-4">
            <Button size="lg" className="h-14 px-8 text-lg group rounded-full glow-primary" asChild>
              <a href="#projects">
                View My Work
                <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
              </a>
            </Button>
            <Button size="lg" variant="outline" className="h-14 px-8 text-lg rounded-full border-primary/30 hover:bg-primary/10" asChild>
              <a href="https://github.com/ONOSPETER" target="_blank" rel="noreferrer">
                <FaGithub className="mr-2 h-5 w-5" />
                GitHub
              </a>
            </Button>
          </motion.div>
        </motion.section>

        {/* ABOUT SECTION */}
        <motion.section 
          id="about"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
          className="py-24 border-t border-border/50"
        >
          <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
            <div className="md:col-span-5">
              <motion.h2 variants={fadeInUp} className="text-3xl md:text-4xl font-bold mb-4">
                About Me
              </motion.h2>
              <motion.div variants={fadeInUp} className="h-1 w-20 bg-primary mb-8" />
            </div>
            <div className="md:col-span-7 space-y-6 text-lg text-muted-foreground leading-relaxed">
              <motion.p variants={fadeInUp}>
                I'm a rare breed of generalist. While most developers stick to one lane, I thrive in the intersections. 
                As an Information Systems student at the Federal University of Science and Technology Akure (FUTA), 
                I've cultivated a deep obsession with how systems work, how data flows, and how humans interact with it all.
              </motion.p>
              <motion.p variants={fadeInUp}>
                Whether I'm spinning up a Next.js frontend, writing Python automation scripts, training ML models, or 
                designing marketing graphics, my goal is always the same: ship products that solve real problems and feel incredible to use.
              </motion.p>
              
              <motion.div variants={fadeInUp} className="pt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex items-center gap-3 text-foreground">
                  <GraduationCap className="h-5 w-5 text-primary" />
                  <span>FUTA, Ondo State</span>
                </div>
                <div className="flex items-center gap-3 text-foreground">
                  <MapPin className="h-5 w-5 text-primary" />
                  <span>Nigeria</span>
                </div>
              </motion.div>
            </div>
          </div>
        </motion.section>

        {/* SKILLS SECTION */}
        <motion.section 
          id="skills"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
          className="py-24 border-t border-border/50"
        >
          <motion.div variants={fadeInUp} className="mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Tech Arsenal</h2>
            <div className="h-1 w-20 bg-primary" />
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {[
              { name: "Python", icon: SiPython },
              { name: "TypeScript", icon: SiTypescript },
              { name: "Next.js", icon: SiNextdotjs },
              { name: "React", icon: SiReact },
              { name: "Data Science", icon: Briefcase },
              { name: "AI / ML", icon: Briefcase },
              { name: "Automation", icon: Briefcase },
              { name: "UI/UX Design", icon: SiFigma },
            ].map((skill, index) => (
              <motion.div 
                key={skill.name}
                variants={fadeInUp}
                className="flex items-center gap-4 p-6 bg-card/50 border border-border/50 rounded-2xl hover:border-primary/50 transition-colors group"
              >
                <skill.icon className="h-8 w-8 text-muted-foreground group-hover:text-primary transition-colors" />
                <span className="font-medium">{skill.name}</span>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* SERVICES SECTION */}
        <motion.section 
          id="services"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
          className="py-24 border-t border-border/50"
        >
          <motion.div variants={fadeInUp} className="mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">What I Do</h2>
            <div className="h-1 w-20 bg-primary" />
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              {
                title: "Full-Stack Web Apps & ERPs",
                desc: "End-to-end development of landing pages, internal tools, and small-scale ERP web applications that streamline business operations."
              },
              {
                title: "Data Automation Pipelines",
                desc: "Custom scripts and architectures to extract, clean, and pipe data exactly where it needs to go, saving hours of manual work."
              },
              {
                title: "Data Science & Analytics",
                desc: "Turning raw data into actionable insights through statistical analysis, visualization, and machine learning models."
              },
              {
                title: "Graphic & UI/UX Design",
                desc: "Pixel-perfect interfaces, posters, flyers, and social media graphics. Design that doesn't just look good, but converts."
              }
            ].map((service, index) => (
              <motion.div 
                key={service.title}
                variants={fadeInUp}
                className="p-8 bg-card border border-border rounded-3xl relative overflow-hidden group hover:border-primary/50 transition-all duration-300"
              >
                <div className="absolute top-0 right-0 p-8 opacity-0 translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 text-primary">
                  <ArrowRight className="h-6 w-6" />
                </div>
                <h3 className="text-2xl font-bold mb-4 pr-10">{service.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{service.desc}</p>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* PROJECTS SECTION */}
        <motion.section 
          id="projects"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
          className="py-24 border-t border-border/50"
        >
          <motion.div variants={fadeInUp} className="mb-16 flex justify-between items-end">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Selected Work</h2>
              <div className="h-1 w-20 bg-primary" />
            </div>
            <Button variant="ghost" className="hidden md:flex text-primary hover:text-primary hover:bg-primary/10">
              View All <ChevronRight className="ml-2 h-4 w-4" />
            </Button>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            {[
              {
                title: "FinTech Landing Page",
                category: "Web Development",
                image: "/images/project-1.png",
              },
              {
                title: "Inventory ERP System",
                category: "Full-Stack App",
                image: "/images/project-2.png",
              },
              {
                title: "Sales Analytics Dashboard",
                category: "Data Science & UI",
                image: "/images/project-3.png",
              },
              {
                title: "Event Exhibition Campaign",
                category: "Graphic Design",
                image: "/images/project-4.png",
              }
            ].map((project, index) => (
              <motion.div 
                key={project.title}
                variants={fadeInUp}
                className="group cursor-pointer block"
              >
                <div className="overflow-hidden rounded-2xl mb-6 bg-card border border-border/50 aspect-video relative">
                  <div className="absolute inset-0 bg-primary/20 opacity-0 group-hover:opacity-100 transition-opacity z-10 mix-blend-overlay" />
                  <img 
                    src={project.image} 
                    alt={project.title} 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </div>
                <div className="flex flex-col">
                  <span className="text-primary font-mono text-sm mb-2">{project.category}</span>
                  <h3 className="text-2xl font-bold group-hover:text-primary transition-colors flex items-center">
                    {project.title}
                    <ArrowRight className="ml-2 h-5 w-5 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                  </h3>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* CONTACT SECTION */}
        <motion.section 
          id="contact"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
          className="py-32 border-t border-border/50 text-center"
        >
          <motion.h2 variants={fadeInUp} className="text-4xl md:text-6xl font-bold mb-8">
            Let's build something <span className="text-gradient">exceptional.</span>
          </motion.h2>
          <motion.p variants={fadeInUp} className="text-xl text-muted-foreground max-w-2xl mx-auto mb-12">
            Whether you need a full-stack application, an automated data pipeline, or high-end graphic design, I'm ready to bring it to life.
          </motion.p>
          
          <motion.div variants={fadeInUp} className="flex flex-wrap justify-center gap-6">
            <Button size="lg" className="h-16 px-10 text-lg rounded-full glow-primary" asChild>
              <a href="https://wa.me/2347055876701" target="_blank" rel="noreferrer">
                <FaWhatsapp className="mr-3 h-6 w-6" />
                Chat on WhatsApp
              </a>
            </Button>
            
            <div className="flex gap-4">
              <Button size="icon" variant="outline" className="h-16 w-16 rounded-full border-primary/30 hover:bg-primary/10 hover:text-primary" asChild>
                <a href="https://github.com/ONOSPETER" target="_blank" rel="noreferrer" aria-label="GitHub">
                  <FaGithub className="h-7 w-7" />
                </a>
              </Button>
              <Button size="icon" variant="outline" className="h-16 w-16 rounded-full border-primary/30 hover:bg-primary/10 hover:text-primary" asChild>
                <a href="https://x.com/lexlex99722746" target="_blank" rel="noreferrer" aria-label="Twitter">
                  <FaTwitter className="h-7 w-7" />
                </a>
              </Button>
            </div>
          </motion.div>
        </motion.section>
      </main>

      {/* FOOTER */}
      <footer className="border-t border-border/30 bg-card/30 py-8 text-center text-sm text-muted-foreground">
        <div className="container mx-auto px-6">
          <p>© {new Date().getFullYear()} Peter Obiegba. All rights reserved.</p>
          <p className="mt-2">Designed and built with precision.</p>
        </div>
      </footer>
    </div>
  );
}