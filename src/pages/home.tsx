import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { motion } from "framer-motion";
import {
  Menu,
  X,
  Phone,
  Mail,
  MapPin,
  Instagram,
  Youtube,
  Facebook,
  CheckCircle2,
  ChevronRight,
  ChevronLeft,
  Award,
  BadgeCheck,
  Shield,
  Palette,
  GraduationCap,
  Users,
  Clock,
  BookOpen,
  Pencil,
  Star
} from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
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

// THE COMPREHENSIVE FLIPPABLE COURSE ARTWORK MAP (.PNG FIX)
const courseArtwork: { [key: string]: string } = {
  // Kids & Teens
  "Child Art": "/student4.png",
  "Elementary Exam": "/student13.png",
  "Intermediate Exam": "/student7.png",
  "Pencil Shading": "/work4.png",
  "Caricature": "/caricature.png",
  
  // Teens & Adults Hobby
  "Watercolor Painting": "/work1.png",
  "Acrylic Painting": "/work3.png",
  "Charcoal Art": "/work6.png",
  "Warli Painting": "/workshop1.png",
  "Mandala Art": "/workshop6.png",
};

const FlippableCourseCard = ({ card }: { card: { title: string; desc?: string; icon: any } }) => {
  const [isFlipped, setIsFlipped] = useState(false);
  const ArtworkIcon = card.icon;

  return (
    <div
      className="relative w-full aspect-[3/4] [perspective:1000px] group cursor-pointer"
      onClick={() => setIsFlipped(!isFlipped)}
    >
      <motion.div
        className="w-full h-full rounded-2xl shadow-lg transition-all duration-500 [transform-style:preserve-3d]"
        animate={{ rotateY: isFlipped ? 180 : 0 }}
      >
        <div className="absolute inset-0 h-full w-full bg-primary text-white p-8 rounded-2xl [backface-visibility:hidden] flex flex-col justify-center border-4 border-primary shadow-inner">
          <ArtworkIcon className="w-10 h-10 mb-6 opacity-90" />
          <h4 className="text-xl font-bold uppercase mb-2 leading-tight tracking-tight">{card.title}</h4>
          {card.desc && <p className="text-white/80 font-medium mb-12">{card.desc}</p>}
          
          <div className="absolute inset-0 bg-black/40 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center gap-2">
              <Star className="w-8 h-8 text-white fill-white"/>
              <span className="text-white font-bold text-sm tracking-wide">See Artwork</span>
          </div>
        </div>

        <div className="absolute inset-0 h-full w-full bg-muted rounded-2xl [transform:rotateY(180deg)] [backface-visibility:hidden] flex items-center justify-center overflow-hidden border-4 border-primary">
          <img
            src={courseArtwork[card.title] || "/class.png"}
            alt={`${card.title} Artwork`}
            className="w-full h-full object-cover"
          />
          <div className="absolute bottom-4 left-4 bg-white/20 backdrop-blur-sm px-3 py-1.5 rounded-full z-10 flex items-center gap-2">
            <span className="text-white font-bold text-xs uppercase tracking-wider">{card.title}</span>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default function Home() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const { toast } = useToast();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      const y = element.getBoundingClientRect().top + window.scrollY - 100;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
  };

  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
    defaultValues: { name: "", email: "", phone: "", courseInterest: "", message: "" },
  });

  const onSubmit = (data: ContactFormValues) => {
    toast({ title: "Inquiry Sent Successfully", description: "We will get back to you within 24 hours." });
    form.reset();
  };

  const navLinks = [
    { label: "About", id: "about" },
    { label: "Faculty", id: "faculty" },
    { label: "Courses", id: "courses" },
    { label: "Gallery", id: "gallery" },
    { label: "Contact", id: "contact" },
  ];

  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-primary/20 selection:text-primary overflow-x-hidden font-sans">
      
      {/* 1. TOP INFO BAR */}
      <div className="w-full bg-primary text-primary-foreground py-2 text-sm hidden md:block">
        <div className="container mx-auto px-6 md:px-12 flex justify-between items-center">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-2"><Phone className="w-4 h-4"/> +91 8779739115, +91 9326345790</span>
          </div>
          <div className="flex items-center gap-4">
            <a href="https://www.instagram.com/snaa.subodhnarvekarsartacademy?igsh=MWNkMXoxamd0NTBqcA==" target="_blank" rel="noreferrer" className="hover:text-primary-foreground/80 transition-colors"><Instagram className="w-4 h-4"/></a>
            <a href="https://www.facebook.com/reel/1663614361350893/" target="_blank" rel="noreferrer" className="hover:text-primary-foreground/80 transition-colors"><Facebook className="w-4 h-4"/></a>
            <a href="https://youtube.com/@avdhutnarvekarsnaa1850?si=U1Br-bhEh0GfYp2O" target="_blank" rel="noreferrer" className="hover:text-primary-foreground/80 transition-colors"><Youtube className="w-4 h-4"/></a>
          </div>
        </div>
      </div>

      {/* 2. NAVIGATION */}
      <header className={`sticky top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? "bg-white shadow-sm py-4 border-b border-border" : "bg-white py-4"}`}>
        <div className="container mx-auto px-6 md:px-12 flex items-center justify-between">
          <div className="flex items-center gap-3 cursor-pointer group" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>
            <img src="/logo.png" alt="SNAA Logo" className="w-12 h-12 rounded-full object-cover shadow-md group-hover:scale-105 transition-transform" />
            <div className="flex flex-col">
              <span className="font-sans font-bold text-lg leading-tight tracking-tight text-foreground">Subodh Narvekar's</span>
              <span className="text-xs uppercase tracking-wider text-primary font-semibold">Art Academy</span>
            </div>
          </div>

          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <button key={link.id} onClick={() => scrollToSection(link.id)} className="text-sm font-medium hover:text-primary transition-colors tracking-wide">
                {link.label}
              </button>
            ))}
            <Button onClick={() => scrollToSection("contact")} className="rounded-full px-6 font-semibold bg-primary hover:bg-primary/90 text-primary-foreground">
              BOOK A CLASS
            </Button>
          </nav>

          <button className="md:hidden text-foreground p-2" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {mobileMenuOpen && (
          <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="absolute top-full left-0 right-0 bg-white shadow-lg p-6 flex flex-col gap-4 md:hidden border-t border-border">
            {navLinks.map((link) => (
              <button key={link.id} onClick={() => scrollToSection(link.id)} className="text-left text-lg font-medium hover:text-primary transition-colors py-2 border-b border-border/50">
                {link.label}
              </button>
            ))}
            <Button onClick={() => scrollToSection("contact")} className="mt-4 w-full rounded-full h-12 bg-primary hover:bg-primary/90 font-semibold">
              BOOK A CLASS
            </Button>
          </motion.div>
        )}
      </header>

      <main>
        {/* 3. HERO SECTION */}
        <section className="relative pt-20 pb-20 md:pt-32 md:pb-32 flex items-center overflow-hidden" style={{ background: "linear-gradient(135deg, #e8f4ff 0%, #f0e8ff 50%, #e8fff4 100%)" }}>
          <div className="container mx-auto px-6 md:px-12 relative z-10 grid lg:grid-cols-2 gap-12 items-center">
            
            <div className="flex flex-col items-start text-left max-w-xl">
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
                <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-primary/10 text-primary text-xs font-bold uppercase tracking-wider mb-6 rounded-full">
                  Nurturing Creativity Since 2002
                </div>
              </motion.div>

              <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.1 }} className="text-4xl md:text-6xl lg:text-7xl font-sans font-bold text-foreground leading-[1.1] mb-4">
                Subodh Narvekar's Art Academy –<br/>
                <span className="text-secondary italic">Your Creative Journey, Personalized</span>
              </motion.h1>

              <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }} className="text-lg md:text-xl text-foreground/80 mb-10 leading-relaxed font-medium">
                Comprehensive art education for children, teens, and professionals in Mumbai.
              </motion.p>

              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.3 }} className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
                <Button size="lg" className="rounded-full h-14 px-8 text-base font-semibold shadow-lg hover:shadow-xl transition-all hover:-translate-y-0.5 bg-primary text-white" onClick={() => scrollToSection("courses")}>
                  View Courses
                </Button>
                <Button size="lg" variant="outline" className="rounded-full h-14 px-8 text-base font-semibold border-2 border-primary text-primary hover:bg-primary/5 transition-all hover:-translate-y-0.5 bg-transparent" onClick={() => scrollToSection("contact")}>
                  Contact Us
                </Button>
              </motion.div>
            </div>

            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.8, delay: 0.2 }} className="relative hidden lg:block">
              <div className="absolute inset-0 bg-primary/20 rounded-3xl translate-x-4 translate-y-4 -z-10"></div>
              {/* HERO IMAGE PNG UPDATE */}
              <img src="/class.png" alt="Art Studio Class" className="w-full h-auto rounded-2xl object-cover shadow-2xl" />
            </motion.div>
          </div>
        </section>

        {/* 4. STATS STRIP */}
        <section className="bg-white border-b border-border py-12">
          <div className="container mx-auto px-6 md:px-12">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {[
                { value: "23+", label: "Years of Excellence" },
                { value: "1000+", label: "Students Trained" },
                { value: "Govt.", label: "Certified Courses" },
                { value: "100%", label: "Dedicated Teaching" }
              ].map((stat, i) => (
                <div key={i} className="flex flex-col items-center justify-center text-center">
                  <span className="text-4xl md:text-5xl font-sans font-bold text-primary mb-2">{stat.value}</span>
                  <span className="text-sm font-semibold text-foreground/70 uppercase tracking-wider">{stat.label}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 5. ABOUT & FACULTY SECTION */}
        <section id="about" className="py-20 md:py-28 bg-muted/30">
          <div className="container mx-auto px-6 md:px-12">
            
            {/* Story */}
            <div className="grid lg:grid-cols-2 gap-16 items-center mb-24">
              <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-100px" }} transition={{ duration: 0.7 }}>
                <div className="inline-block px-4 py-1 bg-primary/10 text-primary font-semibold rounded-full text-sm mb-6">Our Story</div>
                <h3 className="text-3xl md:text-4xl lg:text-5xl font-sans font-bold text-foreground mb-6 leading-tight">A Legacy of 23 Years in Art Education</h3>
                <div className="space-y-6 text-foreground/70 text-lg mb-10">
                  <p>Established in 2002 by Subodh Narvekar, SNAA has grown into one of Mumbai's most respected art institutions.</p>
                  <p>From nurturing young children's creativity to preparing serious students for government-certified professional examinations, the academy combines disciplined classical training with an encouraging, studio-like atmosphere.</p>
                </div>
              </motion.div>

              <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-100px" }} transition={{ duration: 0.7, delay: 0.2 }} className="grid sm:grid-cols-2 gap-6">
                {[
                  { icon: Palette, text: "Structured syllabus for exam excellence" },
                  { icon: Users, text: "Small batch sizes for personal attention" },
                  { icon: GraduationCap, text: "Classical techniques across all mediums" },
                  { icon: Award, text: "Professional certifications & career pathways" }
                ].map((item, i) => (
                  <div key={i} className="bg-white p-6 rounded-2xl shadow-sm hover:shadow-md transition-shadow border border-border/50 flex flex-col gap-4">
                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary"><item.icon className="w-6 h-6" /></div>
                    <span className="font-semibold text-foreground">{item.text}</span>
                  </div>
                ))}
              </motion.div>
            </div>

            {/* Faculty Section */}
            <div id="faculty" className="text-center">
              <div className="inline-block px-4 py-1 bg-secondary/10 text-secondary font-semibold rounded-full text-sm mb-6">Our Team</div>
              <h3 className="text-3xl md:text-4xl font-sans font-bold text-foreground mb-12">Meet Our Instructors</h3>
              
              <div className="grid md:grid-cols-3 gap-10 max-w-5xl mx-auto">
                <div className="bg-white p-8 rounded-2xl shadow-sm border border-border/50 hover:shadow-lg transition-shadow flex flex-col items-center">
                  <img src="/faculty1.png" alt="Subodh Narvekar" className="w-40 h-40 rounded-full object-cover mb-6 shadow-md border-4 border-muted" />
                  <h4 className="text-xl font-bold text-foreground mb-1">Subodh Narvekar</h4>
                  <p className="text-primary font-semibold text-sm uppercase tracking-wider mb-4">Founder & Lead Instructor</p>
                  <p className="text-foreground/70 text-sm">Decades of professional experience guiding students to national excellence in fine arts.</p>
                </div>
                <div className="bg-white p-8 rounded-2xl shadow-sm border border-border/50 hover:shadow-lg transition-shadow flex flex-col items-center">
                  <img src="/faculty2.png" alt="Avdhut Narvekar" className="w-40 h-40 rounded-full object-cover mb-6 shadow-md border-4 border-muted" />
                  <h4 className="text-xl font-bold text-foreground mb-1">Avdhut Narvekar</h4>
                  <p className="text-secondary font-semibold text-sm uppercase tracking-wider mb-4">Senior Instructor</p>
                  <p className="text-foreground/70 text-sm">Specializes in advanced techniques, perspective, and preparing students for competitive entrance exams.</p>
                </div>
                <div className="bg-white p-8 rounded-2xl shadow-sm border border-border/50 hover:shadow-lg transition-shadow flex flex-col items-center">
                  <img src="/faculty3.png" alt="Hemangi Narvekar" className="w-40 h-40 rounded-full object-cover mb-6 shadow-md border-4 border-muted" />
                  <h4 className="text-xl font-bold text-foreground mb-1">Hemangi Narvekar</h4>
                  <p className="text-secondary font-semibold text-sm uppercase tracking-wider mb-4">Senior Instructor</p>
                  <p className="text-foreground/70 text-sm">Expert in child art development, foundational sketching, and nurturing early creative talent.</p>
                </div>
              </div>
            </div>

          </div>
        </section>

        {/* 6. COURSES SECTION */}
        <section id="courses" className="py-20 md:py-28 bg-white">
          <div className="container mx-auto px-6 md:px-12">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <div className="inline-block px-4 py-1 bg-primary/10 text-primary font-semibold rounded-full text-sm mb-4">Curriculum</div>
              <h3 className="text-3xl md:text-5xl font-sans font-bold text-foreground mb-6">Programs & Courses</h3>
              <p className="text-lg text-foreground/70 font-medium">Tailored instruction for every age and skill level. Click on standard classes below to flip them and see related artwork.</p>
            </div>

            <Tabs defaultValue="tab1" className="w-full">
              <TabsList className="flex flex-wrap h-auto w-full justify-center bg-transparent mb-12 border-b border-border p-0 gap-4 md:gap-8">
                <TabsTrigger value="tab1" className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:text-primary py-4 px-2 text-sm md:text-base font-bold data-[state=inactive]:text-foreground/60">Kids & Teens</TabsTrigger>
                <TabsTrigger value="tab2" className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:text-primary py-4 px-2 text-sm md:text-base font-bold data-[state=inactive]:text-foreground/60">Teens & Adults</TabsTrigger>
                <TabsTrigger value="tab3" className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:text-primary py-4 px-2 text-sm md:text-base font-bold data-[state=inactive]:text-foreground/60">Online Classes</TabsTrigger>
                <TabsTrigger value="tab4" className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:text-primary py-4 px-2 text-sm md:text-base font-bold data-[state=inactive]:text-foreground/60 relative">
                  Certified Courses <span className="absolute top-1 -right-4 bg-secondary text-white text-[10px] px-2 py-0.5 rounded-full font-bold">GOVT</span>
                </TabsTrigger>
              </TabsList>

              {/* Tab 1: Kids & Teens */}
              <TabsContent value="tab1" className="animate-in fade-in-50 duration-500 pt-4">
                <div className="flex overflow-x-auto pb-8 gap-6 snap-x hide-scrollbar">
                  {[
                    { title: "Child Art", desc: "Ages 4–10", icon: Palette },
                    { title: "Elementary Exam", desc: "Prep Course", icon: BookOpen },
                    { title: "Intermediate Exam", desc: "Prep Course", icon: Award },
                    { title: "Pencil Shading", desc: "Sketching", icon: Pencil },
                    { title: "Caricature", desc: "Character Design", icon: Star }
                  ].map((card, i) => (
                    <div key={i} className="min-w-[280px] snap-center">
                       <FlippableCourseCard card={card} />
                    </div>
                  ))}
                </div>
              </TabsContent>

              {/* Tab 2: Teens & Adults */}
              <TabsContent value="tab2" className="animate-in fade-in-50 duration-500 pt-4">
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {[
                    { title: "Watercolor Painting", icon: Palette },
                    { title: "Acrylic Painting", icon: Palette },
                    { title: "Charcoal Art", icon: Pencil },
                    { title: "Warli Painting", desc: "Traditional Indian", icon: Star },
                    { title: "Mandala Art", icon: Star }
                  ].map((card, i) => (
                     <FlippableCourseCard key={i} card={card} />
                  ))}
                </div>
              </TabsContent>

              {/* Tab 3: Online Classes */}
              <TabsContent value="tab3" className="max-w-4xl mx-auto animate-in fade-in-50 duration-500 pt-4">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="bg-primary text-white p-8 rounded-2xl shadow-lg flex flex-col hover:-translate-y-1 transition-transform">
                    <Clock className="w-10 h-10 mb-6 opacity-90" />
                    <h4 className="text-2xl font-bold uppercase mb-4 tracking-tight">Primary Level</h4>
                    <p className="text-white/90 font-medium mb-12">Fundamentals & basic techniques tailored for beginners establishing their core skills over Zoom.</p>
                  </div>
                  <div className="bg-primary text-white p-8 rounded-2xl shadow-lg flex flex-col hover:-translate-y-1 transition-transform">
                    <Clock className="w-10 h-10 mb-6 opacity-90" />
                    <h4 className="text-2xl font-bold uppercase mb-4 tracking-tight">Advanced Level</h4>
                    <p className="text-white/90 font-medium mb-12">Intermediate subjects, complex compositions, and dedicated portfolio work over Zoom.</p>
                  </div>
                </div>
                <div className="bg-secondary text-white mt-6 p-6 rounded-2xl flex items-center gap-4 justify-center text-center shadow-lg">
                  <Clock className="w-6 h-6 shrink-0" />
                  <p className="font-semibold">Classes available for students outside Mumbai. Flexible timings for different time zones.</p>
                </div>
              </TabsContent>

              {/* Tab 4: Certified Courses */}
              <TabsContent value="tab4" className="animate-in fade-in-50 duration-500 pt-4">
                <div className="grid md:grid-cols-2 gap-6 mb-8">
                  <div className="bg-primary text-white p-8 rounded-2xl shadow-lg relative overflow-hidden flex flex-col hover:-translate-y-1 transition-transform">
                    <BadgeCheck className="absolute top-4 right-4 w-16 h-16 opacity-20" />
                    <h4 className="text-2xl font-bold uppercase mb-2 pr-12 tracking-tight">Art Teacher's Training Course (ATTC)</h4>
                    <div className="bg-white text-primary text-xs font-bold px-3 py-1 rounded-full inline-block mb-6 w-fit">Government Certified</div>
                    <ul className="space-y-3 font-medium text-white/90 mb-10">
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="w-5 h-5 shrink-0" />
                        <span>Prepares students to teach at school level</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="w-5 h-5 shrink-0" />
                        <span>Affiliated with SDVTI & MBTB</span>
                      </li>
                    </ul>
                  </div>
                  
                  <div className="bg-primary text-white p-8 rounded-2xl shadow-lg relative overflow-hidden flex flex-col hover:-translate-y-1 transition-transform">
                    <Award className="absolute top-4 right-4 w-16 h-16 opacity-20" />
                    <h4 className="text-2xl font-bold uppercase mb-2 tracking-tight">Fine Arts</h4>
                    <div className="bg-transparent text-transparent text-xs font-bold px-3 py-1 mb-6 w-fit select-none">Placeholder</div>
                    <ul className="space-y-3 font-medium text-white/90 mb-10">
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="w-5 h-5 shrink-0" />
                        <span>Foundational & advanced fine arts training</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="w-5 h-5 shrink-0" />
                        <span>Professional portfolio development</span>
                      </li>
                    </ul>
                  </div>
                </div>

                <div>
                  <h4 className="text-xl font-bold text-foreground mb-6 text-center">Entrance Exam Preparation</h4>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {[
                      { code: "MH AAC CET", name: "Maharashtra Fine Arts" },
                      { code: "NIFT", name: "Fashion Tech" },
                      { code: "NID", name: "Design" },
                      { code: "NATA", name: "Architecture" }
                    ].map((exam, i) => (
                      <div key={i} className="bg-secondary text-white p-6 rounded-2xl shadow-md text-center hover:-translate-y-1 transition-transform">
                        <div className="font-bold text-xl mb-1">{exam.code}</div>
                        <div className="text-sm font-medium text-white/90">{exam.name}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </section>
