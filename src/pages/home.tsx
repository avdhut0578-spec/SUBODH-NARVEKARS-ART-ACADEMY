import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { motion } from "framer-motion";
import {
  Menu, X, Phone, Mail, MapPin, Instagram, Youtube, Facebook,
  CheckCircle2, ChevronRight, ChevronLeft, Award, BadgeCheck,
  Shield, Palette, GraduationCap, Users, Clock, BookOpen, Pencil, Star
} from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";

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
import { useToast } from "@/hooks/use-toast";

const contactSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(10, "Valid phone number required"),
  courseInterest: z.string().min(1, "Please select a course"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

type ContactFormValues = z.infer<typeof contactSchema>;

// THE COMPREHENSIVE FLIPPABLE COURSE ARTWORK MAP
const courseArtwork: { [key: string]: string } = {
  // Kids & Teens
  "Child Art": "/student4.jpg",
  "Elementary Exam": "/student13.jpeg",
  "Intermediate Exam": "/student7.jpg",
  "Pencil Shading": "/work4.jpg",
  "Caricature": "/caricature.jpg",
  
  // Teens & Adults Hobby
  "Watercolor Painting": "/work3.jpg",
  "Acrylic Painting": "/work1.jpg",
  "Mandala Art": "/student5.jpg",
};

// Component for the Flippable Course Cards
const FlippableCourseCard = ({ card }: { card: { title: string; desc?: string; img?: string } }) => {
  return (
    <div className="group perspective-1000 w-full h-80 sm:h-96 shrink-0 cursor-pointer snap-center">
      <div className="relative w-full h-full transition-transform duration-700 [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)]">
        {/* Front of Card */}
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
        {/* Back of Card (Artwork) */}
        <div className="absolute inset-0 h-full w-full bg-muted rounded-2xl [transform:rotateY(180deg)] [backface-visibility:hidden] flex items-center justify-center overflow-hidden border-4 border-primary">
          <img 
            src={courseArtwork[card.title] || "/class.jpg"}
            alt={`${card.title} Artwork`}
            className="w-full h-full object-cover"
          />
        </div>
      </div>
    </div>
  );
};

export default function Home() {
  const [isScrolled, setIsScrolled] = useState(false);
  
  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: "",
      phone: "",
      email: "",
      courseInterest: "",
      message: "",
    },
  });

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const onSubmit = (data: ContactFormValues) => {
    console.log(data);
    alert("Inquiry submitted successfully!");
    form.reset();
  };

  return (
    <div className="min-h-screen bg-background font-sans selection:bg-primary/20">
      
      {/* 1. HEADER */}
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
          
          <button className="md:hidden text-foreground">
            <Menu className="w-6 h-6" />
          </button>
        </div>
      </header>

      <main>
        {/* 3. HERO SECTION */}
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
                  <svg className="absolute w-full h-3 -bottom-2 left-0 text-secondary opacity-50" viewBox="0 0 100 10" preserveAspectRatio="none"><path d="M0 5 Q 50 10 100 5" stroke="currentColor" strokeWidth="3" fill="transparent"/></svg>
                </span>
                <span className="block mt-2 text-3xl md:text-4xl lg:text-5xl font-bold text-foreground/80">Your Creative Journey, Personalized</span>
              </motion.h1>
              
              <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }} className="text-lg md:text-xl text-foreground/70 mb-10 leading-relaxed font-medium">
                Comprehensive art education for children, teens, and professionals in Mumbai.
              </motion.p>
              
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.3 }} className="flex flex-wrap items-center gap-4">
                <Button onClick={() => scrollToSection("courses")} className="bg-primary hover:bg-primary/90 text-white font-bold px-8 py-6 rounded-full text-lg shadow-lg hover:shadow-xl transition-all hover:-translate-y-1">
                  View Courses
                </Button>
                <Button onClick={() => scrollToSection("contact")} variant="outline" className="border-2 border-primary text-primary hover:bg-primary/5 font-bold px-8 py-6 rounded-full text-lg transition-all bg-transparent">
                  Contact Us
                </Button>
              </motion.div>
            </div>

            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.8, delay: 0.2 }} className="relative hidden lg:block">
              <div className="absolute inset-0 bg-primary/20 rounded-3xl translate-x-4 translate-y-4 -z-10"></div>
              <img src="/class.jpg" alt="Art Studio Class" className="w-full h-auto rounded-2xl object-cover shadow-2xl" />
            </motion.div>
          </div>
        </section>

        {/* 4. STATS BAR */}
        <section className="py-12 bg-white border-b border-border/50">
          <div className="container mx-auto px-6 md:px-12">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {[
                { value: "42+", label: "Years of Legacy" },
                { value: "1000+", label: "Students Trained" },
                { value: "Govt.", label: "Certified Courses" },
                { value: "100%", label: "Dedicated Teaching" }
              ].map((stat, i) => (
                <div key={i} className="text-center">
                  <div className="text-3xl md:text-4xl font-black text-primary mb-2 tracking-tight">{stat.value}</div>
                  <div className="text-sm md:text-base font-semibold text-foreground/70 uppercase tracking-wider">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 5. ABOUT SECTION */}
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
                  {[
                    "Structured syllabus for exam excellence",
                    "Small batch sizes for personal attention",
                    "Classical techniques across all mediums",
                    "Professional certifications & career pathways"
                  ].map((feature, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <div className="w-6 h-6 rounded-full bg-secondary/20 flex items-center justify-center shrink-0 mt-0.5">
                        <CheckCircle2 className="w-4 h-4 text-secondary" />
                      </div>
                      <span className="font-medium text-foreground/90">{feature}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>

            {/* FACULTY SUB-SECTION */}
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

        {/* 6. COURSES TABS SECTION */}
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
                  {[
                    { title: "Child Art", desc: "Ages 4–10" },
                    { title: "Elementary Exam", desc: "Prep Course" },
                    { title: "Intermediate Exam", desc: "Prep Course" },
                    { title: "Pencil Shading", desc: "Sketching" },
                    { title: "Caricature", desc: "Character Design" }
                  ].map((card, i) => (
                    <FlippableCourseCard key={i} card={card} />
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="tab2" className="animate-in fade-in-50 duration-500 pt-4">
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {[
                    "Watercolor Painting",
                    "Acrylic Painting",
                    "Pen & Ink Drawing",
                    "Mandala Art",
                    "Landscape Painting",
                    "Portrait Drawing"
                  ].map((course, idx) => (
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
        </section>

        {/* 6.5 COURSE DETAILS SECTION */}
        <section className="py-16 md:py-24 bg-white">
          {/* Kids Block */}
          <div className="container mx-auto px-6 md:px-12 grid md:grid-cols-2 gap-12 items-center">
            <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="relative">
              <div className="absolute inset-0 bg-primary/10 rounded-3xl translate-x-4 translate-y-4 -z-10"></div>
              <img src="/group7.jpg" alt="Kids & Teens Art" className="w-full h-auto rounded-2xl shadow-xl object-cover" />
            </motion.div>
            <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
              <h3 className="text-3xl md:text-4xl font-bold text-foreground mb-6">Kids & Teens Art Classes</h3>
              <p className="text-secondary font-semibold uppercase tracking-wider text-sm mb-4">Ideal for: Kids | Young Adults | Ages 4–15</p>
              <p className="text-foreground/70 text-lg mb-8 leading-relaxed">Our foundational art classes are designed to spark creativity and build core skills in young learners. From Child Art for beginners to Elementary and Intermediate Grade Exam Preparation, each session blends fun with structured learning.</p>
              <Button onClick={() => scrollToSection("contact")} variant="outline" className="border-2 border-primary text-primary hover:bg-primary hover:text-white font-bold rounded-full px-8 py-6">ENQUIRE NOW</Button>
            </motion.div>
          </div>

          {/* Teens Block */}
          <div className="container mx-auto px-6 md:px-12 grid md:grid-cols-2 gap-12 items-center mt-24">
            <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="order-2 md:order-1">
              <h3 className="text-3xl md:text-4xl font-bold text-foreground mb-6">Teens & Adults Classes</h3>
              <p className="text-secondary font-semibold uppercase tracking-wider text-sm mb-4">All Mediums | All Skill Levels</p>
              <p className="text-foreground/70 text-lg mb-8 leading-relaxed">Whether you're a hobbyist or an aspiring professional, our adult classes offer a relaxed yet structured environment to explore a wide range of art mediums at your own pace.</p>
              <Button onClick={() => scrollToSection("contact")} variant="outline" className="border-2 border-secondary text-secondary hover:bg-secondary hover:text-white font-bold rounded-full px-8 py-6">ENQUIRE NOW</Button>
            </motion.div>
            <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="relative order-1 md:order-2">
              <div className="absolute inset-0 bg-secondary/10 rounded-3xl -translate-x-4 translate-y-4 -z-10"></div>
              <img src="/miss2.jpeg" alt="Teens & Adults Art" className="w-full h-auto rounded-2xl shadow-xl object-cover" />
            </motion.div>
          </div>

          {/* Professionals Block */}
          <div className="container mx-auto px-6 md:px-12 grid md:grid-cols-2 gap-12 items-center mt-24">
            <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="relative">
              <div className="absolute inset-0 bg-primary/10 rounded-3xl translate-x-4 translate-y-4 -z-10"></div>
              <img src="/student5.jpg" alt="Professional Courses" className="w-full h-auto rounded-2xl shadow-xl object-cover" />
            </motion.div>
            <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration:
