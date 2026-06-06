import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { motion } from "framer-motion";
import {
  Menu, X, Phone, Mail, MapPin, Instagram, Youtube, Facebook,
  CheckCircle2, ChevronRight, ChevronLeft, Award, BadgeCheck,
  Shield, Palette, GraduationCap, Users, Clock, BookOpen, Pencil, Star, ArrowRight
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Form, FormControl, FormField, FormItem, FormLabel, FormMessage,
} from "@/components/ui/form";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const contactSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(10, "Valid phone number required"),
  courseInterest: z.string().min(1, "Please select a course"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

type ContactFormValues = z.infer<typeof contactSchema>;

const courseArtwork: { [key: string]: string } = {
  "Child Art": "/student4.jpg",
  "Elementary Exam": "/student13.jpeg",
  "Intermediate Exam": "/student7.jpg",
  "Pencil Shading": "/work4.jpg",
  "Caricature": "/caricature.jpg",
  "Watercolor Painting": "/work3.jpg",
  "Acrylic Painting": "/work1.jpg",
  "Mandala Art": "/student5.jpg",
};

const FlippableCourseCard = ({ card }: { card: { title: string; desc?: string; img?: string } }) => {
  return (
    <div className="group perspective-1000 w-full h-80 sm:h-96 shrink-0 cursor-pointer snap-center">
      <div className="relative w-full h-full transition-transform duration-700 [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)]">
        <div className="absolute inset-0 w-full h-full bg-gradient-to-br from-primary to-primary/80 rounded-2xl shadow-lg [backface-visibility:hidden] flex flex-col items-center justify-center p-8 text-center text-white border-4 border-white/20 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
          <div className="absolute bottom-0 left-0 w-24 h-24 bg-black/10 rounded-full blur-2xl translate-y-1/2 -translate-x-1/2" />
          <div className="bg-white/20 p-4 rounded-full mb-6 backdrop-blur-sm">
            <Palette className="w-8 h-8 text-white drop-shadow-sm" />
          </div>
          <h4 className="text-2xl font-black uppercase tracking-wider mb-2 drop-shadow-md">{card.title}</h4>
          {card.desc && <p className="text-white/90 font-medium text-sm px-4">{card.desc}</p>}
          <div className="mt-8 flex items-center gap-2 text-xs font-bold uppercase bg-white/20 px-4 py-1.5 rounded-full backdrop-blur-md">
            <span>See Artwork</span>
            <ArrowRight className="w-4 h-4" />
          </div>
        </div>
        <div className="absolute inset-0 h-full w-full bg-muted rounded-2xl [transform:rotateY(180deg)] [backface-visibility:hidden] flex items-center justify-center overflow-hidden border-4 border-primary">
          <img src={courseArtwork[card.title] || "/class.png"} alt={`${card.title} Artwork`} className="w-full h-full object-cover" />
        </div>
      </div>
    </div>
  );
};

export default function Home() {
  const [isScrolled, setIsScrolled] = useState(false);
  
  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
    defaultValues: { name: "", phone: "", email: "", courseInterest: "", message: "" },
  });

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) element.scrollIntoView({ behavior: "smooth" });
  };

  const onSubmit = (data: ContactFormValues) => {
    console.log(data);
    alert("Inquiry submitted successfully!");
    form.reset();
  };

  return (
    <div className="min-h-screen bg-background font-sans selection:bg-primary/20">
      <header className={`sticky top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? "bg-white shadow-sm py-4 border-b border-border" : "bg-white py-4"}`}>
        <div className="container mx-auto px-6 md:px-12 flex items-center justify-between">
          <div className="flex items-center gap-3 cursor-pointer group" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>
            <img src="/logo.jpg" alt="SNAA Logo" className="w-12 h-12 rounded-full object-cover shadow-md group-hover:scale-105 transition-transform" />
            <div className="flex flex-col">
              <span className="font-sans font-bold text-lg leading-tight tracking-tight text-foreground">Subodh Narvekar's</span>
              <span className="text-xs uppercase tracking-wider text-primary font-semibold">Art Academy</span>
            </div>
          </div>
          <nav className="hidden md:flex items-center gap-8 font-medium text-sm text-foreground/80">
            <button onClick={() => scrollToSection("about")} className="hover:text-primary transition-colors">About</button>
            <button onClick={() => scrollToSection("faculty")} className="hover:text-primary transition-colors">Faculty</button>
            <button onClick={() => scrollToSection("courses")} className="hover:text-primary transition-colors">Courses</button>
            <button onClick={() => scrollToSection("gallery")} className="hover:text-primary transition-colors">Gallery</button>
            <button onClick={() => scrollToSection("contact")} className="hover:text-primary transition-colors">Contact</button>
          </nav>
          <Button onClick={() => scrollToSection("contact")} className="hidden md:inline-flex bg-primary hover:bg-primary/90 text-white font-bold rounded-full px-6 py-5 shadow-md hover:shadow-lg transition-all hover:-translate-y-0.5">
            BOOK A CLASS
          </Button>
          <button className="md:hidden text-foreground"><Menu className="w-6 h-6" /></button>
        </div>
      </header>

      <main>
        <section className="relative pt-20 pb-20 md:pt-32 md:pb-32 flex items-center overflow-hidden" style={{ background: "linear-gradient(135deg, #fce7f3 0%, #fdf2f8 50%, #d1fae5 100%)" }}>
          <div className="container mx-auto px-6 md:px-12 relative z-10 grid lg:grid-cols-2 gap-12 items-center">
            <div className="flex flex-col items-start text-left max-w-xl">
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
                <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-primary/10 text-primary text-xs font-bold uppercase tracking-wider mb-6 rounded-full">
                  Nurturing Creativity Since 1984
                </div>
              </motion.div>
              <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.1 }} className="text-5xl md:text-6xl lg:text-7xl font-sans font-black text-foreground leading-[1.1] tracking-tight mb-6">
                Subodh Narvekar's <br/>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary relative">
                  Art Academy
                </span>
                <span className="block mt-2 text-3xl md:text-4xl lg:text-5xl font-bold text-foreground/80">Your Creative Journey, Personalized</span>
              </motion.h1>
              <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }} className="text-lg md:text-xl text-foreground/70 mb-10 leading-relaxed font-medium">
                Comprehensive art education for children, teens, and professionals in Mumbai.
              </motion.p>
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.3 }} className="flex flex-wrap items-center gap-4">
                <Button onClick={() => scrollToSection("courses")} className="bg-primary hover:bg-primary/90 text-white font-bold px-8 py-6 rounded-full text-lg shadow-lg hover:shadow-xl transition-all hover:-translate-y-1">View Courses</Button>
                <Button onClick={() => scrollToSection("contact")} variant="outline" className="border-2 border-primary text-primary hover:bg-primary/5 font-bold px-8 py-6 rounded-full text-lg transition-all bg-transparent">Contact Us</Button>
              </motion.div>
            </div>
            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.8, delay: 0.2 }} className="relative hidden lg:block">
              <div className="absolute inset-0 bg-primary/20 rounded-3xl translate-x-4 translate-y-4 -z-10"></div>
              <img src="/class.png" alt="Art Studio Class" className="w-full h-auto rounded-2xl object-cover shadow-2xl" />
            </motion.div>
          </div>
        </section>

        <section className="py-12 bg-white border-b border-border/50">
          <div className="container mx-auto px-6 md:px-12">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {[{ value: "42+", label: "Years of Legacy" }, { value: "1000+", label: "Students Trained" }, { value: "Govt.", label: "Certified Courses" }, { value: "100%", label: "Dedicated Teaching" }].map((stat, i) => (
                <div key={i} className="text-center">
                  <div className="text-3xl md:text-4xl font-black text-primary mb-2 tracking-tight">{stat.value}</div>
                  <div className="text-sm md:text-base font-semibold text-foreground/70 uppercase tracking-wider">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="about" className="py-20 md:py-32 bg-muted/30">
          <div className="container mx-auto px-6 md:px-12">
            <div className="grid lg:grid-cols-2 gap-16 items-center mb-24">
              <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-100px" }} transition={{ duration: 0.7 }}>
                <div className="inline-block px-4 py-1 bg-primary/10 text-primary font-semibold rounded-full text-sm mb-6">Our Story</div>
                <h3 className="text-3xl md:text-4xl lg:text-5xl font-sans font-bold text-foreground mb-6 leading-tight">A Legacy since 1984 in Art Education</h3>
                <div className="space-y-6 text-foreground/70 text-lg mb-10">
                  <p>Established in 2002 by Subodh Narvekar, SNAA has grown into one of Mumbai's most respected art institutions, a legacy since 1984 in art education.</p>
                  <p>From nurturing young children's creativity to preparing serious students for government-certified professional examinations, the academy combines disciplined classical training with an encouraging, studio-like atmosphere.</p>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {["Structured syllabus for exam excellence", "Small batch sizes for personal attention", "Classical techniques across all mediums", "Professional certifications & career pathways"].map((feature, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <div className="w-6 h-6 rounded-full bg-secondary/20 flex items-center justify-center shrink-0 mt-0.5"><CheckCircle2 className="w-4 h-4 text-secondary" /></div>
                      <span className="font-medium text-foreground/90">{feature}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>

            <div id="faculty" className="pt-16 border-t border-border/50">
              <div className="text-center mb-16">
                <div className="inline-block px-4 py-1 bg-secondary/10 text-secondary font-semibold rounded-full text-sm mb-4">Our Team</div>
                <h3 className="text-3xl md:text-5xl font-sans font-bold text-foreground">Meet Our Instructors</h3>
              </div>
              <div className="grid md:grid-cols-3 gap-10 max-w-5xl mx-auto">
                <div className="bg-white p-8 rounded-2xl shadow-sm border border-border/50 hover:shadow-lg transition-shadow flex flex-col items-center">
                  <img src="/faculty1.jpg" alt="Subodh Narvekar" className="w-40 h-40 rounded-full object-cover mb-6 shadow-md border-4 border-muted" />
                  <h4 className="text-xl font-bold text-foreground mb-1">Subodh Narvekar</h4>
                  <p className="text-primary font-semibold text-sm uppercase tracking-wider mb-4">Founder</p>
                  <p className="text-foreground/70 text-sm text-center">Decades of professional experience guiding students to national excellence in fine arts.</p>
                </div>
                <div className="bg-white p-8 rounded-2xl shadow-sm border border-border/50 hover:shadow-lg transition-shadow flex flex-col items-center">
                  <img src="/faculty2.jpg" alt="Avdhut Narvekar" className="w-40 h-40 rounded-full object-cover mb-6 shadow-md border-4 border-muted" />
                  <h4 className="text-xl font-bold text-foreground mb-1">Avdhut Narvekar</h4>
                  <p className="text-secondary font-semibold text-sm uppercase tracking-wider mb-4">Senior Instructor</p>
                  <p className="text-foreground/70 text-sm text-center">Specializes in advanced techniques, perspective, and preparing students for competitive entrance exams.</p>
                </div>
                <div className="bg-white p-8 rounded-2xl shadow-sm border border-border/50 hover:shadow-lg transition-shadow flex flex-col items-center">
                  <img src="/faculty3.jpg" alt="Hemangi Narvekar" className="w-40 h-40 rounded-full object-cover mb-6 shadow-md border-4 border-muted" />
                  <h4 className="text-xl font-bold text-foreground mb-1">Hemangi Narvekar</h4>
                  <p className="text-secondary font-semibold text-sm uppercase tracking-wider mb-4">Senior Instructor</p>
                  <p className="text-foreground/70 text-sm text-center">Expert in child art development, foundational sketching, and nurturing early creative talent.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="courses" className="py-20 md:py-32 bg-white relative overflow-hidden">
          <div className="container mx-auto px-6 md:px-12 relative z-10">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <div className="inline-block px-4 py-1 bg-primary/10 text-primary font-semibold rounded-full text-sm mb-4">Curriculum</div>
              <h2 className="text-3xl md:text-5xl font-sans font-bold text-foreground mb-6">Programs & Courses</h2>
              <p className="text-lg text-foreground/70 font-medium">Tailored instruction for every age and skill level. Click on standard classes below to flip them and see related artwork.</p>
            </div>

            <Tabs defaultValue="tab1" className="w-full">
              <TabsList className="flex flex-wrap h-auto w-full justify-center bg-transparent mb-12 border-b border-border p-0 gap-4 md:gap-8">
                <TabsTrigger value="tab1" className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:text-primary py-4 px-2 text-sm md:text-base font-bold data-[state=inactive]:text-foreground/60">Kids & Teens</TabsTrigger>
                <TabsTrigger value="tab2" className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:text-primary py-4 px-2 text-sm md:text-base font-bold data-[state=inactive]:text-foreground/60">Teens & Adults</TabsTrigger>
                <TabsTrigger value="tab3" className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:text-primary py-4 px-2 text-sm md:text-base font-bold data-[state=inactive]:text-foreground/60">Video Lectures</TabsTrigger>
                <TabsTrigger value="tab4" className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:text-primary py-4 px-2 text-sm md:text-base font-bold data-[state=inactive]:text-foreground/60 relative">
                  Certified Courses <span className="absolute top-1 -right-4 bg-secondary text-white text-[10px] px-2 py-0.5 rounded-full font-bold">GOVT</span>
                </TabsTrigger>
              </TabsList>

              <TabsContent value="tab1" className="animate-in fade-in-50 duration-500 pt-4">
                <div className="flex overflow-x-auto pb-8 gap-6 snap-x hide-scrollbar">
                  {[{ title: "Child Art", desc: "Ages 4–10" }, { title: "Elementary Exam", desc: "Prep Course" }, { title: "Intermediate Exam", desc: "Prep Course" }, { title: "Pencil Shading", desc: "Sketching" }, { title: "Caricature", desc: "Character Design" }].map((card, i) => (
                    <FlippableCourseCard key={i} card={card} />
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="tab2" className="animate-in fade-in-50 duration-500 pt-4">
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {["Watercolor Painting", "Acrylic Painting", "Pen & Ink Drawing", "Mandala Art", "Landscape Painting", "Portrait Drawing"].map((course, idx) => (
                    <div key={idx} className="flex items-center gap-3 bg-muted/40 p-4 rounded-xl border border-border/50">
                      <div className="w-2 h-2 rounded-full bg-secondary" />
                      <span className="font-medium text-foreground/90">{course}</span>
                    </div>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="tab3" className="max-w-4xl mx-auto animate-in fade-in-50 duration-500 pt-4">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="bg-primary text-white p-8 rounded-2xl shadow-lg flex flex-col hover:-translate-y-1 transition-transform">
                    <Clock className="w-10 h-10 mb-6 opacity-90" />
                    <h4 className="text-2xl font-bold uppercase mb-4 tracking-tight">Primary Level</h4>
                    <p className="text-white/90 font-medium mb-12">Fundamentals & basic techniques tailored for beginners establishing their core skills via pre-recorded lessons.</p>
                  </div>
                  <div className="bg-primary text-white p-8 rounded-2xl shadow-lg flex flex-col hover:-translate-y-1 transition-transform">
                    <Clock className="w-10 h-10 mb-6 opacity-90" />
                    <h4 className="text-2xl font-bold uppercase mb-4 tracking-tight">Advanced Level</h4>
                    <p className="text-white/90 font-medium mb-12">Intermediate subjects, complex compositions, and dedicated portfolio work via pre-recorded lessons.</p>
                  </div>
                </div>
                <div className="bg-secondary text-white mt-6 p-6 rounded-2xl flex items-center gap-4 justify-center text-center shadow-lg">
                  <Clock className="w-6 h-6 shrink-0" />
                  <p className="font-semibold">Classes available for students outside Mumbai. Access lessons anytime.</p>
                </div>
              </TabsContent>

              <TabsContent value="tab4" className="animate-in fade-in-50 duration-500 pt-4">
                <div className="grid md:grid-cols-2 gap-6 mb-8">
                  <div className="bg-primary text-white p-8 rounded-2xl shadow-lg relative overflow-hidden flex flex-col hover:-translate-y-1 transition-transform">
                    <Award className="w-10 h-10 mb-6 opacity-90" />
                    <h4 className="text-2xl font-bold uppercase mb-2 tracking-tight">Art Teacher's Training</h4>
                    <span className="inline-block bg-white/20 text-white text-xs font-bold px-3 py-1 rounded-full w-fit mb-4">(ATTC)</span>
                    <p className="text-white/90 font-medium mb-12">Government-certified program preparing educators with pedagogical skills and classical techniques.</p>
                  </div>
                  <div className="bg-primary text-white p-8 rounded-2xl shadow-lg flex flex-col hover:-translate-y-1 transition-transform">
                    <GraduationCap className="w-10 h-10 mb-6 opacity-90" />
                    <h4 className="text-2xl font-bold uppercase mb-4 tracking-tight">Entrance Prep</h4>
                    <div className="flex flex-wrap gap-2 mb-8">
                      {["NID", "NIFT", "NATA", "MH AAC CET"].map(exam => <span key={exam} className="bg-white/20 px-3 py-1 rounded-full text-xs font-bold">{exam}</span>)}
                    </div>
                    <p className="text-white/90 font-medium mt-auto">Intensive portfolio development and entrance preparation for premier design institutions.</p>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </section><section className="py-16 md:py-24 bg-white">
          <div className="container mx-auto px-6 md:px-12 grid md:grid-cols-2 gap-12 items-center">
            <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="relative">
              <div className="absolute inset-0 bg-primary/10 rounded-3xl translate-x-4 translate-y-4 -z-10"></div>
              <img src="/group7.jpg" alt="Kids & Teens Art" className="w-full h-auto rounded-2xl shadow-xl object-cover" />
            </motion.div>
            <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
              <h3 className="text-3xl md:text-4xl font-bold text-foreground mb-6">Kids & Teens Art Classes</h3>
              <p className="text-secondary font-semibold uppercase tracking-wider text-sm mb-4">Ideal for: Kids | Young Adults | Ages 4–15</p>
              <p className="text-foreground/70 text-lg mb-8 leading-relaxed">Our foundational art classes are designed to spark creativity and build core skills in young learners. From Child Art for beginners to Elementary and Intermediate Grade Exam Preparation, each session blends fun with structured learning.</p>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-3 mb-8">
                {["Child Art (Ages 4–10)", "Elementary Grade Exam Prep", "Intermediate Grade Exam Prep", "Pencil Shading & Sketching", "Caricature & Character Design", "Still Life Drawing", "Memory Drawing", "Watercolor Basics"].map((item, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <CheckCircle2 className="w-5 h-5 text-primary shrink-0" />
                    <span className="text-foreground/80 font-medium text-sm">{item}</span>
                  </li>
                ))}
              </ul>
              <Button onClick={() => scrollToSection("contact")} variant="outline" className="border-2 border-primary text-primary hover:bg-primary hover:text-white font-bold rounded-full px-8 py-6">ENQUIRE NOW</Button>
            </motion.div>
          </div>

          <div className="container mx-auto px-6 md:px-12 grid md:grid-cols-2 gap-12 items-center mt-24">
            <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="order-2 md:order-1">
              <h3 className="text-3xl md:text-4xl font-bold text-foreground mb-6">Teens & Adults Classes</h3>
              <p className="text-secondary font-semibold uppercase tracking-wider text-sm mb-4">All Mediums | All Skill Levels</p>
              <p className="text-foreground/70 text-lg mb-8 leading-relaxed">Whether you're a hobbyist or an aspiring professional, our adult classes offer a relaxed yet structured environment to explore a wide range of art mediums at your own pace.</p>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-3 mb-8">
                {["Watercolor Painting", "Acrylic Painting", "Pen & Ink Drawing", "Mandala Art", "Landscape Painting", "Portrait Drawing"].map((item, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <CheckCircle2 className="w-5 h-5 text-secondary shrink-0" />
                    <span className="text-foreground/80 font-medium text-sm">{item}</span>
                  </li>
                ))}
              </ul>
              <Button onClick={() => scrollToSection("contact")} variant="outline" className="border-2 border-secondary text-secondary hover:bg-secondary hover:text-white font-bold rounded-full px-8 py-6">ENQUIRE NOW</Button>
            </motion.div>
            <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="relative order-1 md:order-2">
              <div className="absolute inset-0 bg-secondary/10 rounded-3xl -translate-x-4 translate-y-4 -z-10"></div>
              <img src="/miss2.jpeg" alt="Teens & Adults Art" className="w-full h-auto rounded-2xl shadow-xl object-cover" />
            </motion.div>
          </div>

          <div className="container mx-auto px-6 md:px-12 grid md:grid-cols-2 gap-12 items-center mt-24">
            <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="relative">
              <div className="absolute inset-0 bg-primary/10 rounded-3xl translate-x-4 translate-y-4 -z-10"></div>
              <img src="/student5.jpg" alt="Professional Courses" className="w-full h-auto rounded-2xl shadow-xl object-cover" />
            </motion.div>
            <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
              <h3 className="text-3xl md:text-4xl font-bold text-foreground mb-6">Professional & Certified Courses</h3>
              <p className="text-secondary font-semibold uppercase tracking-wider text-sm mb-4">Govt. Certified | Affiliated with SDVTI & MBTB</p>
              <p className="text-foreground/70 text-lg mb-8 leading-relaxed">For those seeking a formal career in art and design, SNAA offers government-certified programs with proven results in national entrance examinations.</p>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-3 mb-8">
                {["Art Teacher's Training Course (ATTC)", "Fine Arts (Foundational & Advanced)", "MH AAC CET Entrance Prep", "NIFT Entrance Preparation", "NID Entrance Preparation", "NATA Entrance Preparation", "Portfolio Development", "Online Coaching Available"].map((item, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <CheckCircle2 className="w-5 h-5 text-primary shrink-0" />
                    <span className="text-foreground/80 font-medium text-sm">{item}</span>
                  </li>
                ))}
              </ul>
              <div className="flex gap-6 mb-8 pt-4 border-t border-border/50">
                <div><h4 className="font-bold text-foreground mb-1">Skill India</h4><p className="text-sm text-foreground/60">Govt. of India Initiative</p></div>
                <div><h4 className="font-bold text-foreground mb-1">SDVTI</h4><p className="text-sm text-foreground/60">Vocational Training</p></div>
                <div><h4 className="font-bold text-foreground mb-1">MBTB</h4><p className="text-sm text-foreground/60">Technical Board</p></div>
              </div>
              <Button onClick={() => scrollToSection("contact")} variant="outline" className="border-2 border-primary text-primary hover:bg-primary hover:text-white font-bold rounded-full px-8 py-6">ENQUIRE NOW</Button>
            </motion.div>
          </div>
        </section>

        <section className="py-12 bg-white">
          <div className="container mx-auto px-6 md:px-12">
            <div className="bg-secondary rounded-3xl p-10 md:p-16 flex flex-col md:flex-row items-center gap-12 overflow-hidden relative shadow-2xl">
              <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl translate-x-1/3 -translate-y-1/3"></div>
              <div className="md:w-[60%] z-10 text-center md:text-left">
                <h3 className="text-3xl md:text-5xl font-black text-white mb-6 leading-tight">Begin Your Creative Journey at SNAA</h3>
                <p className="text-white/90 text-lg md:text-xl font-medium mb-8 max-w-2xl">Expert-led art classes, government-certified courses, and entrance exam preparation — all in one place. Admissions open for 2025–26.</p>
                <Button onClick={() => scrollToSection("contact")} className="bg-white text-secondary hover:bg-white/90 font-black rounded-full px-10 py-7 text-lg shadow-xl hover:shadow-2xl transition-all hover:-translate-y-1">ENQUIRE NOW</Button>
              </div>
              <div className="md:w-[40%] grid grid-cols-2 gap-4 z-10 w-full aspect-square md:aspect-auto">
                <img src="/work5.jpg" alt="Artwork 1" className="rounded-xl w-full h-full object-cover shadow-md" />
                <img src="/work2.jpg" alt="Artwork 2" className="rounded-xl w-full h-full object-cover shadow-md translate-y-4" />
                <img src="/work3.jpg" alt="Artwork 3" className="rounded-xl w-full h-full object-cover shadow-md -translate-y-4" />
                <img src="/work4.jpg" alt="Artwork 4" className="rounded-xl w-full h-full object-cover shadow-md" />
              </div>
            </div>
          </div>
        </section>

        <section id="workshops" className="py-20 md:py-28 bg-muted/20">
          <div className="container mx-auto px-6 md:px-12">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <div className="inline-block px-4 py-1 bg-secondary/10 text-secondary font-semibold rounded-full text-sm mb-4">Creative Learning</div>
              <h3 className="text-3xl md:text-5xl font-sans font-bold text-foreground mb-6">Special Workshops</h3>
              <p className="text-lg text-foreground/70 font-medium">Explore dedicated sessions focusing on specific traditional and modern art forms.</p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                { title: "Complex Still Life", img: "/workshop1.jpeg" },
                { title: "Watercolor Session", img: "/workshop2.jpeg" },
                { title: "Perspective Drawing", img: "/workshop3.jpeg" },
                { title: "Character Design", img: "/workshop4.jpeg" },
                { title: "Traditional Techniques", img: "/workshop5.jpeg" },
                { title: "Advanced Traditional Art", img: "/workshop6.jpeg" }
              ].map((workshop, i) => (
                <div key={i} className="bg-white rounded-2xl overflow-hidden border border-border shadow-sm hover:shadow-md transition-shadow group">
                  <div className="relative h-48 overflow-hidden bg-muted">
                    <img src={workshop.img} alt={workshop.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                  </div>
                  <div className="p-6">
                    <h4 className="text-xl font-bold text-foreground mb-2">{workshop.title}</h4>
                    <Button variant="link" className="text-primary p-0 h-auto font-semibold hover:text-primary/80">Learn More →</Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-20 bg-muted/10 border-y border-border/50">
          <div className="container mx-auto px-6 md:px-12">
            <div className="grid md:grid-cols-3 gap-12 items-center">
              <div className="md:col-span-1 text-center md:text-left">
                <div className="flex justify-center md:justify-start items-center gap-2 mb-4">
                  {[1, 2, 3, 4, 5].map(star => <Star key={star} className="w-6 h-6 fill-yellow-400 text-yellow-400" />)}
                </div>
                <h3 className="text-3xl font-black text-foreground mb-2">Google Reviews</h3>
                <p className="text-foreground/70 font-medium mb-6">Subodh Narvekar's Art Academy</p>
                <div className="flex items-center justify-center md:justify-start gap-4 mb-8">
                  <div className="text-5xl font-black text-primary">4.9</div>
                  <div className="text-sm text-foreground/60 text-left leading-tight">Based on actual<br/>student reviews</div>
                </div>
                <a href="#" className="inline-flex items-center gap-2 bg-white border border-border shadow-sm px-6 py-3 rounded-full font-bold text-foreground hover:bg-muted transition-colors">
                  <span className="text-sm">Powered by</span>
                  <span className="font-sans font-black tracking-tight text-lg"><span className="text-blue-500">G</span><span className="text-red-500">o</span><span className="text-yellow-500">o</span><span className="text-blue-500">g</span><span className="text-green-500">l</span><span className="text-red-500">e</span></span>
                </a>
              </div>
              <div className="md:col-span-2 grid sm:grid-cols-2 gap-6">
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-border/50">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-10 h-10 rounded-full bg-blue-100 text-blue-600 font-bold flex items-center justify-center">A</div>
                    <div><h5 className="font-bold text-foreground">Anita S.</h5><p className="text-xs text-foreground/60">Verified Student</p></div>
                  </div>
                  <div className="flex gap-1 mb-3">{[1, 2, 3, 4, 5].map(star => <Star key={star} className="w-4 h-4 fill-yellow-400 text-yellow-400" />)}</div>
                  <p className="text-foreground/80 text-sm">"Best art academy in Mumbai! My daughter's skills improved drastically. The teachers are very supportive and encouraging."</p>
                </div>
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-border/50">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-10 h-10 rounded-full bg-green-100 text-green-600 font-bold flex items-center justify-center">R</div>
                    <div><h5 className="font-bold text-foreground">Raj M.</h5><p className="text-xs text-foreground/60">Verified Student</p></div>
                  </div>
                  <div className="flex gap-1 mb-3">{[1, 2, 3, 4, 5].map(star => <Star key={star} className="w-4 h-4 fill-yellow-400 text-yellow-400" />)}</div>
                  <p className="text-foreground/80 text-sm">"Excellent faculty and well-structured course. Highly recommend for exam preparation. Great environment to learn!"</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="gallery" className="py-20 md:py-28 bg-white">
          <div className="container mx-auto px-6 md:px-12">
            <div className="text-center mb-16">
              <div className="inline-block px-4 py-1 bg-primary/10 text-primary font-semibold rounded-full text-sm mb-4">Portfolio</div>
              <h3 className="text-3xl md:text-5xl font-sans font-bold text-foreground">Student Gallery</h3>
            </div>
            <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
              {[
                { src: "/group8.jpg", alt: "Academy Session" },
                { src: "/student12.jpg", alt: "Student Gathering" },
                { src: "/class.jpg", alt: "Art Class" },
                { src: "/group1.jpg", alt: "Exhibition View" },
                { src: "/group2.jpg", alt: "Workshop Group" },
                { src: "/group3.jpg", alt: "Creating Art" },
                { src: "/group4.jpg", alt: "Studio Life" },
                { src: "/student1.jpg", alt: "Portrait Practice" },
                { src: "/student2.jpg", alt: "Focus in Class" },
                { src: "/student3.jpg", alt: "Foundational Sketching" },
                { src: "/student6.jpg", alt: "Advanced Techniques" },
                { src: "/student9.jpg", alt: "Art Student" },
                { src: "/group5.jpg", alt: "Class Session" },
                { src: "/group6.jpg", alt: "Creating Art" },
                { src: "/student10.jpg", alt: "Academy Member" },
                { src: "/work4.jpg", alt: "Fruits Still Life" },
                { src: "/work2.jpg", alt: "Detailed Sketch" },
                { src: "/work6.jpg", alt: "Charcoal Portrait" },
                { src: "/miss1.jpeg", alt: "Student Artwork 1" },
                { src: "/miss2.jpeg", alt: "Student Artwork 2" },
                { src: "/miss3.jpeg", alt: "Student Artwork 3" },
                { src: "/miss4.jpeg", alt: "Student Artwork 4" },
                { src: "/miss5.jpeg", alt: "Student Artwork 5" },
                { src: "/miss6.jpeg", alt: "Student Artwork 6" },
                { src: "/miss7.jpeg", alt: "Student Artwork 7" },
                { src: "/miss8.jpeg", alt: "Student Artwork 8" },
                { src: "/miss9.jpeg", alt: "Student Artwork 9" },
                { src: "/miss10.jpeg", alt: "Student Artwork 10" },
                { src: "/miss11.jpeg", alt: "Student Artwork 11" },
                { src: "/miss12.jpeg", alt: "Student Artwork 12" },
                { src: "/miss13.jpeg", alt: "Student Artwork 13" },
                { src: "/miss14.jpeg", alt: "Student Artwork 14" },
                { src: "/miss15.jpeg", alt: "Student Artwork 15" }
              ].map((img, index) => (
                <div key={index} className="break-inside-avoid relative rounded-2xl overflow-hidden group shadow-sm border border-border/40 bg-muted aspect-auto">
                  <img src={img.src} alt={img.alt} className="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-105" />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <span className="text-white font-semibold tracking-wide uppercase text-sm bg-primary/80 px-4 py-2 rounded-full backdrop-blur-sm">View Artwork</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-20 md:py-32 bg-white">
          <div className="container mx-auto px-6 md:px-12 max-w-4xl">
            <div className="text-center mb-16">
              <h3 className="text-3xl md:text-5xl font-sans font-bold text-foreground mb-6">Curious about us?</h3>
              <p className="text-lg text-foreground/70 font-medium">Find out more about why SNAA is the right place for you.</p>
            </div>
            <Accordion type="single" collapsible className="w-full space-y-4">
              {[
                { q: "Where are your studios located?", a: "We have two branches! Our Dhanukarwadi Branch is at Shop 4, Pushp Meet, Kandivali West. Our Mahavir Nagar Branch is at Shop no 8, Sai Sumit, near Pancholia School, Kandivali West." },
                { q: "What courses do you offer?", a: "We offer Kids & Teens art classes, Grade exam preparation (Elementary & Intermediate), Teens & Adults hobby classes, Video Lecture based sessions, Art Teacher's Training Course (ATTC), Fine Arts, and entrance exam preparation." },
                { q: "Who are the instructors?", a: "Classes are conducted by our Founder Subodh Narvekar, alongside Senior Instructors Avdhut Narvekar and Hemangi Narvekar — all trained professional artists." },
                { q: "What are your timings?", a: "Tuesday to Saturday: 4:00 PM – 8:00 PM. Sunday special batches are available by appointment. Video Lectures provide flexible access anytime." },
                { q: "Are government certificates provided?", a: "Yes! Our ATTC and Fine Arts courses are government-certified through SDVTI and affiliated with the Maharashtra Business Training Board (MBTB) and Skill India." }
              ].map((faq, i) => (
                <AccordionItem key={i} value={`item-${i}`} className="bg-white px-6 rounded-xl border border-border shadow-sm data-[state=open]:shadow-md transition-all">
                  <AccordionTrigger className="text-left font-bold text-lg text-foreground hover:no-underline py-6">{faq.q}</AccordionTrigger>
                  <AccordionContent className="text-foreground/70 text-base leading-relaxed pb-6">{faq.a}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </section>

        <section id="contact" className="py-20 md:py-32 bg-muted/30 border-t border-border/50">
          <div className="container mx-auto px-6 md:px-12 grid lg:grid-cols-2 gap-16">
            <div>
              <div className="inline-block px-4 py-1 bg-primary/10 text-primary font-semibold rounded-full text-sm mb-6">Get in Touch</div>
              <h3 className="text-3xl md:text-5xl font-sans font-bold text-foreground mb-6">Let's start your artistic journey.</h3>
              <p className="text-lg text-foreground/70 mb-12">Have questions about our courses or admissions? Drop us a message and we'll get back to you.</p>
              <div className="space-y-8">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-white shadow-sm border border-border flex items-center justify-center shrink-0"><MapPin className="w-5 h-5 text-primary" /></div>
                  <div><h5 className="font-bold text-foreground mb-1">Dhanukarwadi Branch</h5><p className="text-foreground/70">Shop 4, Pushp Meet, Dhanukarwadi, Kandivali West, Mumbai – 400067</p></div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-white shadow-sm border border-border flex items-center justify-center shrink-0"><MapPin className="w-5 h-5 text-primary" /></div>
                  <div><h5 className="font-bold text-foreground mb-1">Mahavir Nagar Branch</h5><p className="text-foreground/70">Shop no 8, Sai Sumit, Mahavir Nagar, near Pancholia School, Kandivali West, Mumbai</p></div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-white shadow-sm border border-border flex items-center justify-center shrink-0"><Phone className="w-5 h-5 text-primary" /></div>
                  <div><h5 className="font-bold text-foreground mb-1">Call Us</h5><p className="text-foreground/70">+91 8779739115<br/>+91 9326345790</p></div>
                </div>
              </div>
            </div>

            <div className="bg-white p-8 md:p-10 rounded-3xl shadow-xl border border-border/50">
              <h4 className="text-2xl font-bold text-foreground mb-8">Send an Inquiry</h4>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <FormField control={form.control} name="name" render={({ field }) => (
                    <FormItem>
                      <FormLabel className="font-semibold text-foreground/90">Full Name</FormLabel>
                      <FormControl><Input placeholder="John Doe" className="bg-muted/50 border-transparent focus-visible:ring-primary rounded-xl h-12 px-4" {...field} /></FormControl>
                      <FormMessage />
                    </FormItem>
                  )} />
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField control={form.control} name="phone" render={({ field }) => (
                      <FormItem>
                        <FormLabel className="font-semibold text-foreground/90">Phone Number</FormLabel>
                        <FormControl><Input placeholder="+91 XXXXX XXXXX" className="bg-muted/50 border-transparent focus-visible:ring-primary rounded-xl h-12 px-4" {...field} /></FormControl>
                        <FormMessage />
                      </FormItem>
                    )} />
                    <FormField control={form.control} name="email" render={({ field }) => (
                      <FormItem>
                        <FormLabel className="font-semibold text-foreground/90">Email Address</FormLabel>
                        <FormControl><Input placeholder="john@example.com" className="bg-muted/50 border-transparent focus-visible:ring-primary rounded-xl h-12 px-4" {...field} /></FormControl>
                        <FormMessage />
                      </FormItem>
                    )} />
                  </div>
                  <FormField control={form.control} name="courseInterest" render={({ field }) => (
                    <FormItem>
                      <FormLabel className="font-semibold text-foreground/90">Interested In</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger className="bg-muted/50 border-transparent focus:ring-primary rounded-xl h-12 px-4">
                            <SelectValue placeholder="Select a course category" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent className="rounded-xl border-border shadow-lg">
                          <SelectItem value="kids">Kids & Teens Art</SelectItem>
                          <SelectItem value="grade">Govt. Exam Preparation</SelectItem>
                          <SelectItem value="adults">Adults / Hobby Art</SelectItem>
                          <SelectItem value="attc">ATTC (Teacher Training)</SelectItem>
                          <SelectItem value="entrance">Entrance Exam Prep</SelectItem>
                          <SelectItem value="online">Video Lectures</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )} />
                  <FormField control={form.control} name="message" render={({ field }) => (
                    <FormItem>
                      <FormLabel className="font-semibold text-foreground/90">Message</FormLabel>
                      <FormControl>
                        <Textarea placeholder="Tell us about your art experience or specific requirements..." className="resize-none bg-muted/50 border-transparent focus-visible:ring-primary rounded-xl h-32 p-4" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )} />
                  <Button type="submit" className="w-full bg-primary hover:bg-primary/90 text-white font-bold rounded-xl h-14 text-lg shadow-md hover:shadow-lg transition-all">
                    Send Inquiry
                  </Button>
                </form>
              </Form>
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-foreground text-white py-16 md:py-20 border-t-8 border-primary relative overflow-hidden">
        <div className="container mx-auto px-6 md:px-12 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-12 mb-16">
            <div className="md:col-span-4">
              <div className="flex items-center gap-3 mb-6">
                <img src="/logo.jpg" alt="SNAA Logo" className="w-10 h-10 rounded-full object-cover bg-white p-0.5" />
                <span className="font-bold text-lg tracking-tight">Subodh Narvekar's Art Academy</span>
              </div>
              <p className="text-white/60 font-medium mb-8 leading-relaxed max-w-sm">
                Nurturing creativity since 1984. Offering comprehensive art education and government certified courses in Mumbai and Video Lectures.
              </p>
              <div className="flex items-center gap-4">
                <a href="https://www.instagram.com/snaa.subodhnarvekarsartacademy?igsh=MWNkMXoxamd0NTBqcA==" target="_blank" rel="noreferrer" className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center hover:bg-secondary/80 transition-colors">
                  <Instagram className="w-5 h-5" />
                </a>
              </div>
            </div>
            <div className="md:col-span-2 md:col-start-7">
              <h4 className="font-bold text-lg mb-6 tracking-tight">Quick Links</h4>
              <ul className="space-y-4">
                <li><button onClick={() => scrollToSection("about")} className="text-white/60 hover:text-white transition-colors font-medium">About</button></li>
                <li><button onClick={() => scrollToSection("faculty")} className="text-white/60 hover:text-white transition-colors font-medium">Faculty</button></li>
                <li><button onClick={() => scrollToSection("courses")} className="text-white/60 hover:text-white transition-colors font-medium">Courses</button></li>
                <li><button onClick={() => scrollToSection("gallery")} className="text-white/60 hover:text-white transition-colors font-medium">Gallery</button></li>
                <li><button onClick={() => scrollToSection("contact")} className="text-white/60 hover:text-white transition-colors font-medium">Contact</button></li>
              </ul>
            </div>
            <div className="md:col-span-3">
              <h4 className="font-bold text-lg mb-6 tracking-tight">Popular Courses</h4>
              <ul className="space-y-4">
                <li><button onClick={() => scrollToSection("courses")} className="text-white/60 hover:text-white transition-colors font-medium">Child Art</button></li>
                <li><button onClick={() => scrollToSection("courses")} className="text-white/60 hover:text-white transition-colors font-medium">Exam Prep</button></li>
                <li><button onClick={() => scrollToSection("courses")} className="text-white/60 hover:text-white transition-colors font-medium">ATTC Certification</button></li>
                <li><button onClick={() => scrollToSection("courses")} className="text-white/60 hover:text-white transition-colors font-medium">Video Lectures</button></li>
              </ul>
            </div>
          </div>
          <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-white/40 text-sm font-medium">© 2026 Subodh Narvekar's Art Academy. All rights reserved.</p>
            <div className="flex gap-6 text-sm text-white/40 font-medium">
              <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
