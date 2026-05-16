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

// Assigned real artworks from your public folder
const courseArtwork: { [key: string]: string } = {
  "Child Art": "/student1.jpg",
  "Grade 7 Exam": "/work1.jpg",
  "Grade 8 Exam": "/work2.jpg",
  "Pencil Shading": "/work3.jpg",
  "Cartoons": "/student2.jpg",
  "Watercolor Painting": "/work4.jpg",
  "Acrylic Painting": "/work5.jpg",
  "Charcoal Art": "/work6.jpg",
  "Warli Painting": "/workshop1.jpg",
  "Mandala Art": "/workshop6.jpg"
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
            src={courseArtwork[card.title] || "/class.jpg"}
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
            <a href="https://www.instagram.com/snaa.subodhnarvekarsartacademy?igsh=MWNkMXoxamd0NTBqcA==" target="_blank" rel="noreferrer" className="hover:text-primary-foreground/80"><Instagram className="w-4 h-4"/></a>
            <a href="https://www.facebook.com/reel/1663614361350893/" target="_blank" rel="noreferrer" className="hover:text-primary-foreground/80"><Facebook className="w-4 h-4"/></a>
            <a href="https://youtube.com/@avdhutnarvekarsnaa1850?si=U1Br-bhEh0GfYp2O" target="_blank" rel="noreferrer" className="hover:text-primary-foreground/80"><Youtube className="w-4 h-4"/></a>
          </div>
        </div>
      </div>

      {/* 2. NAVIGATION */}
      <header className={`sticky top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? "bg-white shadow-sm py-4 border-b border-border" : "bg-white py-4"}`}>
        <div className="container mx-auto px-6 md:px-12 flex items-center justify-between">
          <div className="flex items-center gap-3 cursor-pointer group" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>
            <img src="/logo.jpg" alt="SNAA Logo" className="w-12 h-12 rounded-full object-cover shadow-md group-hover:scale-105 transition-transform" />
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
              <img src="/class.jpg" alt="Art Studio Class" className="w-full h-auto rounded-2xl object-cover shadow-2xl" />
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

            <div id="faculty" className="text-center">
              <div className="inline-block px-4 py-1 bg-secondary/10 text-secondary font-semibold rounded-full text-sm mb-6">Our Team</div>
              <h3 className="text-3xl md:text-4xl font-sans font-bold text-foreground mb-12">Meet Our Instructors</h3>
              
              <div className="grid md:grid-cols-3 gap-10 max-w-5xl mx-auto">
                <div className="bg-white p-8 rounded-2xl shadow-sm border border-border/50 hover:shadow-lg transition-shadow flex flex-col items-center">
                  <img src="/faculty1.jpg" alt="Subodh Narvekar" className="w-40 h-40 rounded-full object-cover mb-6 shadow-md border-4 border-muted" />
                  <h4 className="text-xl font-bold text-foreground mb-1">Subodh Narvekar</h4>
                  <p className="text-primary font-semibold text-sm uppercase tracking-wider mb-4">Founder & Lead Instructor</p>
                  <p className="text-foreground/70 text-sm">Decades of professional experience guiding students to national excellence in fine arts.</p>
                </div>
                <div className="bg-white p-8 rounded-2xl shadow-sm border border-border/50 hover:shadow-lg transition-shadow flex flex-col items-center">
                  <img src="/faculty2.jpg" alt="Avdhut Narvekar" className="w-40 h-40 rounded-full object-cover mb-6 shadow-md border-4 border-muted" />
                  <h4 className="text-xl font-bold text-foreground mb-1">Avdhut Narvekar</h4>
                  <p className="text-secondary font-semibold text-sm uppercase tracking-wider mb-4">Senior Instructor</p>
                  <p className="text-foreground/70 text-sm">Specializes in advanced techniques, perspective, and preparing students for competitive entrance exams.</p>
                </div>
                <div className="bg-white p-8 rounded-2xl shadow-sm border border-border/50 hover:shadow-lg transition-shadow flex flex-col items-center">
                  <img src="/faculty3.jpg" alt="Hemangi Narvekar" className="w-40 h-40 rounded-full object-cover mb-6 shadow-md border-4 border-muted" />
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

              <TabsContent value="tab1" className="animate-in fade-in-50 duration-500 pt-4">
                <div className="flex overflow-x-auto pb-8 gap-6 snap-x hide-scrollbar">
                  {[
                    { title: "Child Art", desc: "Ages 4–10", icon: Palette },
                    { title: "Grade 7 Exam", desc: "Prep Course", icon: BookOpen },
                    { title: "Grade 8 Exam", desc: "Prep Course", icon: Award },
                    { title: "Pencil Shading", desc: "Sketching", icon: Pencil },
                    { title: "Cartoons", desc: "Character Design", icon: Star }
                  ].map((card, i) => (
                    <div key={i} className="min-w-[280px] snap-center"><FlippableCourseCard card={card} /></div>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="tab2" className="animate-in fade-in-50 duration-500 pt-4">
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {[
                    { title: "Watercolor Painting", icon: Palette },
                    { title: "Acrylic Painting", icon: Palette },
                    { title: "Charcoal Art", icon: Pencil },
                    { title: "Warli Painting", desc: "Traditional Indian", icon: Star },
                    { title: "Mandala Art", icon: Star }
                  ].map((card, i) => (<FlippableCourseCard key={i} card={card} />))}
                </div>
              </TabsContent>

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

              <TabsContent value="tab4" className="animate-in fade-in-50 duration-500 pt-4">
                <div className="grid md:grid-cols-2 gap-6 mb-8">
                  <div className="bg-primary text-white p-8 rounded-2xl shadow-lg relative overflow-hidden flex flex-col hover:-translate-y-1 transition-transform">
                    <BadgeCheck className="absolute top-4 right-4 w-16 h-16 opacity-20" />
                    <h4 className="text-2xl font-bold uppercase mb-2 pr-12 tracking-tight">Art Teacher's Training Course (ATTC)</h4>
                    <div className="bg-white text-primary text-xs font-bold px-3 py-1 rounded-full inline-block mb-6 w-fit">Government Certified</div>
                    <ul className="space-y-3 font-medium text-white/90 mb-10">
                      <li className="flex items-start gap-2"><CheckCircle2 className="w-5 h-5 shrink-0" /><span>Prepares students to teach at school level</span></li>
                      <li className="flex items-start gap-2"><CheckCircle2 className="w-5 h-5 shrink-0" /><span>Affiliated with SDVTI & MBTB</span></li>
                    </ul>
                  </div>
                  
                  <div className="bg-primary text-white p-8 rounded-2xl shadow-lg relative overflow-hidden flex flex-col hover:-translate-y-1 transition-transform">
                    <Award className="absolute top-4 right-4 w-16 h-16 opacity-20" />
                    <h4 className="text-2xl font-bold uppercase mb-2 tracking-tight">Fine Arts</h4>
                    <div className="bg-transparent text-transparent text-xs font-bold px-3 py-1 mb-6 w-fit select-none">Placeholder</div>
                    <ul className="space-y-3 font-medium text-white/90 mb-10">
                      <li className="flex items-start gap-2"><CheckCircle2 className="w-5 h-5 shrink-0" /><span>Foundational & advanced fine arts training</span></li>
                      <li className="flex items-start gap-2"><CheckCircle2 className="w-5 h-5 shrink-0" /><span>Professional portfolio development</span></li>
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
        </section>{/* 6.5 COURSE DETAILS SECTION */}
        <section className="py-16 md:py-24 bg-white">
          <div className="container mx-auto px-6 md:px-12 grid md:grid-cols-2 gap-12 items-center">
            <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="relative">
              <div className="absolute inset-0 bg-primary/10 rounded-3xl translate-x-4 translate-y-4 -z-10"></div>
              <img src="/student5.jpg" alt="Kids & Teens Art" className="w-full h-auto rounded-2xl shadow-xl object-cover" />
            </motion.div>
            <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
              <h3 className="text-3xl md:text-4xl font-bold mb-4">Kids & Teens Art Classes</h3>
              <div className="inline-block px-4 py-1.5 bg-secondary/10 text-secondary font-bold text-sm rounded-full mb-6">Ideal for: Kids | Young Adults | Ages 4–15</div>
              <p className="text-foreground/80 font-medium mb-8 leading-relaxed">
                Our foundational art classes are designed to spark creativity and build core skills in young learners. From Child Art for beginners to Elementary and Intermediate Grade Exam Preparation, each session blends fun with structured learning.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
                {["Child Art (Ages 4–10)", "Elementary Grade Exam Prep", "Intermediate Grade Exam Prep", "Pencil Shading & Sketching", "Cartoons & Character Design", "Still Life Drawing", "Memory Drawing", "Watercolor Basics"].map((item, i) => (
                  <div key={i} className="flex items-start gap-2">
                    <CheckCircle2 className="w-5 h-5 text-secondary shrink-0" /><span className="text-sm font-semibold">{item}</span>
                  </div>
                ))}
              </div>
              <Button onClick={() => scrollToSection("contact")} className="bg-secondary hover:bg-secondary/90 text-white font-bold rounded-full px-8 py-6 h-auto">ENQUIRE NOW</Button>
            </motion.div>
          </div>
        </section>

        <section className="py-16 md:py-24 bg-muted/20 overflow-hidden">
          <div className="container mx-auto px-6 md:px-12 grid md:grid-cols-2 gap-12 items-center">
            <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="order-2 md:order-1">
              <h3 className="text-3xl md:text-4xl font-bold mb-4">Teens & Adults Classes</h3>
              <div className="inline-block px-4 py-1.5 bg-secondary/10 text-secondary font-bold text-sm rounded-full mb-6">All Mediums | All Skill Levels</div>
              <p className="text-foreground/80 font-medium mb-8 leading-relaxed">
                Whether you're a hobbyist or an aspiring professional, our adult classes offer a relaxed yet structured environment to explore a wide range of art mediums at your own pace.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
                {["Watercolor Painting", "Acrylic Painting", "Charcoal Art", "Pen & Ink Drawing", "Warli Painting", "Mandala Art", "Landscape Painting", "Portrait Drawing"].map((item, i) => (
                  <div key={i} className="flex items-start gap-2">
                    <CheckCircle2 className="w-5 h-5 text-secondary shrink-0" /><span className="text-sm font-semibold">{item}</span>
                  </div>
                ))}
              </div>
              <Button onClick={() => scrollToSection("contact")} className="bg-secondary hover:bg-secondary/90 text-white font-bold rounded-full px-8 py-6 h-auto">ENQUIRE NOW</Button>
            </motion.div>
            <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="relative order-1 md:order-2">
              <div className="absolute inset-0 bg-secondary/10 rounded-3xl -translate-x-4 translate-y-4 -z-10"></div>
              <img src="/work5.jpg" alt="Teens & Adults Art" className="w-full h-auto rounded-2xl shadow-xl object-cover" />
            </motion.div>
          </div>
        </section>

        <section className="py-16 md:py-24 bg-white">
          <div className="container mx-auto px-6 md:px-12 grid md:grid-cols-2 gap-12 items-center">
            <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="relative">
              <div className="absolute inset-0 bg-primary/10 rounded-3xl translate-x-4 translate-y-4 -z-10"></div>
              <img src="/group7.jpg" alt="Professional Courses" className="w-full h-auto rounded-2xl shadow-xl object-cover" />
            </motion.div>
            <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
              <h3 className="text-3xl md:text-4xl font-bold mb-4">Professional & Certified Courses</h3>
              <div className="inline-block px-4 py-1.5 bg-[#4285F4]/10 text-[#4285F4] font-bold text-sm rounded-full mb-6">Govt. Certified | Affiliated with SDVTI & MBTB</div>
              <p className="text-foreground/80 font-medium mb-8 leading-relaxed">
                For those seeking a formal career in art and design, SNAA offers government-certified programs with proven results in national entrance examinations.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
                {["Art Teacher's Training Course (ATTC)", "Fine Arts (Foundational & Advanced)", "MH AAC CET Entrance Prep", "NIFT Entrance Preparation", "NID Entrance Preparation", "NATA Entrance Preparation", "Portfolio Development", "Online Coaching Available"].map((item, i) => (
                  <div key={i} className="flex items-start gap-2">
                    <CheckCircle2 className="w-5 h-5 text-secondary shrink-0" /><span className="text-sm font-semibold">{item}</span>
                  </div>
                ))}
              </div>
              <Button onClick={() => scrollToSection("contact")} className="bg-secondary hover:bg-secondary/90 text-white font-bold rounded-full px-8 py-6 h-auto">ENQUIRE NOW</Button>
            </motion.div>
          </div>
        </section>

        {/* 7. AFFILIATIONS SECTION */}
        <section id="affiliations" className="py-20 bg-muted/30 border-y border-border">
          <div className="container mx-auto px-6 md:px-12">
            <h3 className="text-3xl font-bold text-center text-foreground mb-12">Recognised & Affiliated With</h3>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-white p-6 rounded-xl shadow-sm border-l-4 border-l-primary flex items-center gap-4 hover:shadow-md transition-shadow">
                <Shield className="w-8 h-8 text-primary shrink-0" />
                <div><h4 className="font-bold text-lg">Skill India</h4><p className="text-sm text-foreground/70">Govt. of India Initiative</p></div>
              </div>
              <div className="bg-white p-6 rounded-xl shadow-sm border-l-4 border-l-primary flex items-center gap-4 hover:shadow-md transition-shadow">
                <BadgeCheck className="w-8 h-8 text-primary shrink-0" />
                <div><h4 className="font-bold text-lg">SDVTI</h4><p className="text-sm text-foreground/70">Vocational Training</p></div>
              </div>
              <div className="bg-white p-6 rounded-xl shadow-sm border-l-4 border-l-primary flex items-center gap-4 hover:shadow-md transition-shadow">
                <Award className="w-8 h-8 text-primary shrink-0" />
                <div><h4 className="font-bold text-lg">MBTB</h4><p className="text-sm text-foreground/70">Technical Board</p></div>
              </div>
            </div>
          </div>
        </section>

        {/* 7.5 CTA BANNER SECTION */}
        <section className="py-12 bg-white">
          <div className="container mx-auto px-6 md:px-12">
            <div className="bg-secondary rounded-3xl p-10 md:p-16 flex flex-col md:flex-row items-center gap-12 overflow-hidden relative shadow-2xl">
              <div className="md:w-[60%] z-10 text-center md:text-left flex flex-col items-center md:items-start">
                <h3 className="text-3xl md:text-5xl font-bold text-white mb-6 leading-tight tracking-tight">Begin Your Creative Journey at SNAA</h3>
                <p className="text-white/80 text-lg font-medium mb-8 max-w-xl leading-relaxed">
                  Expert-led art classes, government-certified courses, and entrance exam preparation — all in one place. Admissions open for 2025–26.
                </p>
                <Button onClick={() => scrollToSection("contact")} className="bg-white hover:bg-white/90 text-secondary font-bold rounded-full px-8 py-6 h-auto shadow-lg hover:-translate-y-1 transition-all">
                  ENQUIRE NOW
                </Button>
              </div>
              
              <div className="md:w-[40%] grid grid-cols-2 gap-4 z-10 w-full aspect-square md:aspect-auto">
                <img src="/workshop2.jpg" alt="Artwork 1" className="rounded-xl w-full h-full object-cover shadow-md" />
                <img src="/workshop3.jpg" alt="Artwork 2" className="rounded-xl w-full h-full object-cover shadow-md translate-y-4" />
                <img src="/work8.jpg" alt="Artwork 3" className="rounded-xl w-full h-full object-cover shadow-md -translate-y-4" />
                <img src="/workshop4.jpg" alt="Artwork 4" className="rounded-xl w-full h-full object-cover shadow-md" />
              </div>
              <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3"></div>
            </div>
          </div>
        </section>

        {/* 8. GALLERY SECTION */}
        <section id="gallery" className="py-20 md:py-28 bg-white">
          <div className="container mx-auto px-6 md:px-12">
            <div className="text-center mb-16">
              <div className="inline-block px-4 py-1 bg-primary/10 text-primary font-semibold rounded-full text-sm mb-4">Portfolio</div>
              <h3 className="text-3xl md:text-5xl font-sans font-bold text-foreground">Student Gallery</h3>
            </div>
            
            <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
              {[
                { src: "/work1.jpg", alt: "Student Masterpiece" },
                { src: "/student10.jpg", alt: "Class Session" },
                { src: "/work3.jpg", alt: "Pencil Sketching" },
                { src: "/group1.jpg", alt: "Student Group" },
                { src: "/work2.jpg", alt: "Painting Details" },
                { src: "/group2.jpg", alt: "Academy Life" },
                { src: "/work4.jpg", alt: "Watercolor Artwork" },
                { src: "/group3.jpg", alt: "Student Exhibition" },
                { src: "/student11.jpg", alt: "Creating Art" }
              ].map((img, i) => (
                <div key={i} className="relative rounded-2xl overflow-hidden group break-inside-avoid shadow-sm hover:shadow-xl transition-all cursor-pointer">
                  <img src={img.src} alt={img.alt} className="w-full h-auto object-cover" />
                  <div className="absolute inset-0 bg-primary/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center p-4 text-center">
                    <span className="text-white font-bold text-lg mb-2">View Artwork</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 10. TESTIMONIALS SECTION */}
        <section className="py-20 md:py-28 bg-muted/20 overflow-hidden">
          <div className="container mx-auto px-6 md:px-12">
             <div className="text-center mb-16">
              <h3 className="text-3xl md:text-5xl font-sans font-bold text-foreground mb-4">What Our Students Say</h3>
              <p className="text-foreground/70 text-lg font-medium">From exam wins to creative growth — hear how SNAA made a difference.</p>
            </div>
            
            <div className="relative max-w-5xl mx-auto">
              <div className="flex transition-transform duration-500 ease-in-out gap-6" style={{ transform: `translateX(calc(-${activeTestimonial * 100}% - ${activeTestimonial * 24}px))` }}>
                {[
                  { name: "Priya Kulkarni", role: "Parent, Batch 2023", quote: "My daughter passed her Intermediate exam with distinction. Subodh Sir's attention to detail in every class made all the difference.", color: "bg-primary text-white" },
                  { name: "Rahul Mehta", role: "Student, ATTC 2022", quote: "The structured approach to the government syllabus is unlike anywhere else. I cleared my ATTC on the first attempt.", color: "bg-secondary text-white" },
                  { name: "Sneha Joshi", role: "Student, Batch 2024", quote: "SNAA gave me the foundation I needed for NATA prep. The perspective and composition classes were exceptional.", color: "bg-accent text-white" },
                  { name: "Meera Patil", role: "Parent, Batch 2023", quote: "My son has been attending Child Art classes for 2 years now. The patience and encouragement from the teachers is remarkable.", color: "bg-primary text-white" }
                ].map((t, i) => (
                  <div key={i} className="min-w-full md:min-w-[calc(33.333%-16px)]">
                    <div className="bg-white p-8 rounded-2xl shadow-lg border border-border mt-8 relative flex flex-col items-center text-center h-full hover:shadow-xl transition-shadow">
                      <div className={`w-16 h-16 rounded-full flex items-center justify-center font-bold text-xl absolute -top-8 border-4 border-white shadow-md ${t.color}`}>
                        {t.name.split(' ').map(n => n[0]).join('')}
                      </div>
                      <div className="flex gap-1 text-[#F59E0B] mt-6 mb-4">
                        {[1, 2, 3, 4, 5].map(star => <Star key={star} className="w-4 h-4 fill-current" />)}
                      </div>
                      <p className="text-foreground/80 font-medium mb-6 flex-grow leading-relaxed">"{t.quote}"</p>
                      <div>
                        <div className="font-bold text-foreground">{t.name}</div>
                        <div className="text-sm text-foreground/60 font-medium">{t.role}</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex justify-center gap-4 mt-12">
                <button onClick={() => setActiveTestimonial(Math.max(0, activeTestimonial - 1))} className={`w-12 h-12 rounded-full flex items-center justify-center border-2 border-border transition-colors ${activeTestimonial === 0 ? 'opacity-50 cursor-not-allowed' : 'hover:bg-muted'}`}><ChevronLeft className="w-6 h-6" /></button>
                <button onClick={() => setActiveTestimonial(Math.min(1, activeTestimonial + 1))} className={`w-12 h-12 rounded-full flex items-center justify-center border-2 border-border transition-colors ${activeTestimonial >= 1 ? 'opacity-50 cursor-not-allowed' : 'hover:bg-muted'}`}><ChevronRight className="w-6 h-6" /></button>
              </div>
            </div>
          </div>
        </section>

        {/* 10.5 GOOGLE REVIEWS SECTION */}
        <section className="py-20 bg-white border-y border-border">
          <div className="container mx-auto px-6 md:px-12">
            <h3 className="text-3xl font-bold text-center mb-12">Google Reviews</h3>
            <div className="grid lg:grid-cols-[1fr_2fr] gap-12 items-start">
              <div className="bg-white rounded-2xl p-8 border border-border shadow-sm flex flex-col items-center justify-center text-center">
                <h4 className="font-bold text-xl mb-4">Subodh Narvekar's Art Academy</h4>
                <div className="text-6xl font-bold text-[#F59E0B] mb-2 tracking-tight">4.9</div>
                <div className="flex gap-1 text-[#F59E0B] mb-2">
                  {[1, 2, 3, 4, 5].map(star => <Star key={star} className="w-6 h-6 fill-current" />)}
                </div>
                <p className="text-foreground/60 text-sm font-medium mb-6">Based on actual student reviews</p>
                <div className="flex items-center gap-2 mb-6">
                  <span className="text-sm font-medium">Powered by</span>
                  <span className="font-bold text-xl">
                    <span className="text-[#4285F4]">G</span><span className="text-[#EA4335]">o</span><span className="text-[#FBBC05]">o</span><span className="text-[#4285F4]">g</span><span className="text-[#34A853]">l</span><span className="text-[#EA4335]">e</span>
                  </span>
                </div>
                <a href="https://share.google/RPrzTLlXcciCwdZEj" target="_blank" rel="noreferrer">
                  <Button variant="outline" className="rounded-full font-bold border-2 hover:bg-muted cursor-pointer">Read & Review on Google</Button>
                </a>
              </div>
              
              <div className="grid sm:grid-cols-3 gap-6">
                {[
                  { name: "Anita S.", text: "Best art academy in Mumbai! My daughter's skills improved drastically. The teachers are very supportive and encouraging." },
                  { name: "Raj M.", text: "Excellent faculty and well-structured course. Highly recommend for exam preparation. Great environment to learn!" },
                  { name: "Divya K.", text: "Amazing experience! The ATTC course was very well-organized. Got certified on first attempt. Thank you SNAA!" }
                ].map((review, i) => (
                  <div key={i} className="bg-muted/10 p-6 rounded-2xl border border-border flex flex-col hover:shadow-md transition-shadow">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-foreground text-white flex items-center justify-center font-bold">{review.name[0]}</div>
                        <div>
                          <div className="font-bold text-sm">{review.name}</div>
                          <div className="text-xs text-foreground/50">Verified Student</div>
                        </div>
                      </div>
                      <div className="w-6 h-6 flex items-center justify-center"><span className="text-[#4285F4] font-bold text-xl leading-none">G</span></div>
                    </div>
                    <div className="flex gap-1 text-[#F59E0B] mb-3">{[1, 2, 3, 4, 5].map(star => <Star key={star} className="w-3 h-3 fill-current" />)}</div>
                    <p className="text-sm font-medium text-foreground/80 leading-relaxed line-clamp-4">{review.text}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* 10.6 FAQ SECTION */}
        <section className="py-20 md:py-28 bg-muted/20">
          <div className="container mx-auto px-6 md:px-12 grid lg:grid-cols-[1fr_2fr] gap-12 items-start">
            <div className="text-center lg:text-left flex flex-col items-center lg:items-start">
              <h3 className="text-secondary text-3xl md:text-5xl font-bold mb-4 leading-tight tracking-tight">Curious about us?</h3>
              <p className="text-foreground/70 font-medium text-lg mb-8 leading-relaxed max-w-lg lg:max-w-none">Find out more about why SNAA is the right place for you.</p>
              <Button onClick={() => scrollToSection("contact")} className="bg-secondary hover:bg-secondary/90 text-white font-bold rounded-full px-8 py-6 h-auto shadow-lg hover:-translate-y-1 transition-all">BOOK A CLASS</Button>
            </div>
            <div>
              <Accordion type="single" collapsible className="w-full space-y-4">
                {[
                  { q: "Where are your studios located?", a: "We have two branches! Our Dhanukarwadi Branch is at Shop 4, Pushp Meet, Kandivali West. Our Mahavir Nagar Branch is at Shop no 8, Sai Sumit, near Pancholia School, Kandivali West." },
                  { q: "What courses do you offer?", a: "We offer Kids & Teens art classes, Grade exam preparation (Elementary & Intermediate), Teens & Adults hobby classes, Online Zoom-based sessions, Art Teacher's Training Course (ATTC), Fine Arts, and entrance exam preparation for NIFT, NID, NATA, and MH AAC CET." },
                  { q: "Who are the instructors?", a: "Classes are conducted by our Founder Subodh Narvekar, alongside Senior Instructors Avdhut Narvekar and Hemangi Narvekar — all trained professional artists." },
                  { q: "What are your timings?", a: "Tuesday to Saturday: 4:00 PM – 8:00 PM. Sunday special batches are available by appointment. Online classes have flexible timings to accommodate different schedules." },
                  { q: "Are government certificates provided?", a: "Yes! Our ATTC and Fine Arts courses are government-certified through SDVTI and affiliated with the Maharashtra Business Training Board (MBTB) and Skill India." }
                ].map((faq, i) => (
                  <AccordionItem key={i} value={`item-${i}`} className="bg-white px-6 rounded-xl border border-border shadow-sm data-[state=open]:shadow-md transition-all">
                    <AccordionTrigger className="font-semibold text-foreground text-base hover:no-underline py-4 text-left">{faq.q}</AccordionTrigger>
                    <AccordionContent className="text-foreground/70 font-medium text-base pb-6 leading-relaxed">{faq.a}</AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          </div>
        </section>

        {/* 11. CONTACT FORM SECTION */}
        <section id="contact" className="py-20 md:py-28 bg-muted/30">
          <div className="container mx-auto px-6 md:px-12">
            <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">
              <div className="grid lg:grid-cols-2">
                <div className="p-10 md:p-16 bg-primary text-white flex flex-col justify-between">
                  <div>
                    <h3 className="text-3xl md:text-4xl font-bold mb-4 tracking-tight">Get in Touch</h3>
                    <p className="text-white/80 font-medium mb-10 max-w-lg">Have questions about our courses or admissions? Drop us a message and we'll get back to you.</p>
                    
                    <div className="space-y-8">
                      <div className="flex items-start gap-4">
                        <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center shrink-0"><MapPin className="w-5 h-5 text-white" /></div>
                        <div>
                          <h5 className="font-semibold text-lg mb-1">Dhanukarwadi Branch</h5>
                          <p className="text-white/80 leading-relaxed mb-4">Shop 4, Pushp Meet, Dhanukarwadi,<br />Kandivali West, Mumbai – 400067</p>
                          <h5 className="font-semibold text-lg mb-1">Mahavir Nagar Branch</h5>
                          <p className="text-white/80 leading-relaxed">Shop no 8, Sai Sumit, Mahavir Nagar, near Pancholia School,<br />Kandivali West, Mumbai</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center shrink-0"><Phone className="w-5 h-5 text-white" /></div>
                        <div>
                          <h5 className="font-semibold text-lg mb-1">Call Us</h5>
                          <p className="text-white/80 leading-relaxed">+91 8779739115<br/>+91 9326345790</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="p-10 md:p-16">
                  <h4 className="text-2xl font-bold text-foreground mb-8">Send an Inquiry</h4>
                  <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        <FormField control={form.control} name="name" render={({ field }) => (
                          <FormItem><FormLabel className="font-semibold">Full Name</FormLabel><FormControl><Input placeholder="John Doe" {...field} className="rounded-lg bg-muted/50 border-transparent focus-visible:bg-white" /></FormControl><FormMessage /></FormItem>
                        )} />
                        <FormField control={form.control} name="phone" render={({ field }) => (
                          <FormItem><FormLabel className="font-semibold">Phone Number</FormLabel><FormControl><Input placeholder="+91 XXXXX XXXXX" {...field} className="rounded-lg bg-muted/50 border-transparent focus-visible:bg-white" /></FormControl><FormMessage /></FormItem>
                        )} />
                      </div>
                      <FormField control={form.control} name="email" render={({ field }) => (
                        <FormItem><FormLabel className="font-semibold">Email Address</FormLabel><FormControl><Input placeholder="john@example.com" {...field} className="rounded-lg bg-muted/50 border-transparent focus-visible:bg-white" /></FormControl><FormMessage /></FormItem>
                      )} />
                      <FormField control={form.control} name="courseInterest" render={({ field }) => (
                        <FormItem>
                          <FormLabel className="font-semibold">Interested In</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl><SelectTrigger className="rounded-lg bg-muted/50 border-transparent focus-visible:bg-white"><SelectValue placeholder="Select a course category" /></SelectTrigger></FormControl>
                            <SelectContent>
                              <SelectItem value="kids">Kids & Teens Art</SelectItem>
                              <SelectItem value="exam_prep">Govt. Exam Preparation</SelectItem>
                              <SelectItem value="adults">Adults / Hobby Art</SelectItem>
                              <SelectItem value="attc">ATTC (Teacher Training)</SelectItem>
                              <SelectItem value="entrance">Entrance Exam Prep</SelectItem>
                              <SelectItem value="online">Online Classes</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )} />
                      <FormField control={form.control} name="message" render={({ field }) => (
                        <FormItem><FormLabel className="font-semibold">Message</FormLabel><FormControl><Textarea placeholder="Tell us about your art experience or specific requirements..." className="min-h-[120px] rounded-lg bg-muted/50 border-transparent focus-visible:bg-white leading-relaxed" {...field} /></FormControl><FormMessage /></FormItem>
                      )} />
                      <Button type="submit" className="w-full rounded-full h-14 text-base font-semibold bg-primary hover:bg-primary/90">Send Inquiry</Button>
                    </form>
                  </Form>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* 12. FOOTER SECTION */}
      <footer className="bg-foreground text-white pt-20 pb-10">
        <div className="container mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-12 mb-16">
            <div className="md:col-span-4">
              <div className="flex items-center gap-3 mb-6">
                <img src="/logo.jpg" alt="SNAA Logo" className="w-10 h-10 rounded-full object-cover bg-white p-0.5" />
                <span className="font-bold text-lg tracking-tight">Subodh Narvekar's Art Academy</span>
              </div>
              <p className="text-white/60 font-medium mb-8 leading-relaxed max-w-sm">
                Nurturing creativity since 2002. Offering comprehensive art education and government certified courses in Mumbai and online.
              </p>
              <div className="flex items-center gap-4">
                <a href="https://www.instagram.com/snaa.subodhnarvekarsartacademy?igsh=MWNkMXoxamd0NTBqcA==" target="_blank" rel="noreferrer" className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center hover:bg-secondary/80 transition-colors"><Instagram className="w-5 h-5" /></a>
                <a href="https://www.facebook.com/reel/1663614361350893/" target="_blank" rel="noreferrer" className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center hover:bg-secondary/80 transition-colors"><Facebook className="w-5 h-5" /></a>
                <a href="https://youtube.com/@avdhutnarvekarsnaa1850?si=U1Br-bhEh0GfYp2O" target="_blank" rel="noreferrer" className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center hover:bg-secondary/80 transition-colors"><Youtube className="w-5 h-5" /></a>
              </div>
            </div>

            <div className="md:col-span-4 flex flex-col sm:flex-row gap-12 sm:justify-between">
              <div>
                <h4 className="font-bold text-lg mb-6">Quick Links</h4>
                <ul className="space-y-4">
                  {navLinks.map((link) => (
                    <li key={link.id}><button onClick={() => scrollToSection(link.id)} className="text-white/60 hover:text-white transition-colors font-medium">{link.label}</button></li>
                  ))}
                </ul>
              </div>
              <div>
                <h4 className="font-bold text-lg mb-6">Popular Courses</h4>
                <ul className="space-y-4">
                  <li><button onClick={() => scrollToSection("courses")} className="text-white/60 hover:text-white transition-colors font-medium">Child Art</button></li>
                  <li><button onClick={() => scrollToSection("courses")} className="text-white/60 hover:text-white transition-colors font-medium">Exam Prep</button></li>
                  <li><button onClick={() => scrollToSection("courses")} className="text-white/60 hover:text-white transition-colors font-medium">ATTC Certification</button></li>
                  <li><button onClick={() => scrollToSection("courses")} className="text-white/60 hover:text-white transition-colors font-medium">Online Classes</button></li>
                </ul>
              </div>
            </div>

            <div className="md:col-span-4">
              <h4 className="font-bold text-lg mb-6">Contact Us</h4>
              <ul className="space-y-6">
                <li className="flex items-start gap-3 text-white/60 font-medium leading-relaxed">
                  <MapPin className="w-5 h-5 text-secondary shrink-0 mt-1" />
                  <div>
                    <span className="block text-white mb-1">Our Studios:</span>
                    Branch 1: Shop 4, Pushp Meet, Dhanukarwadi, Kandivali West<br/><br/>
                    Branch 2: Shop 8, Sai Sumit, Mahavir Nagar, Kandivali West
                  </div>
                </li>
                <li className="flex items-start gap-3 text-white/60 font-medium leading-relaxed">
                  <Clock className="w-5 h-5 text-secondary shrink-0 mt-1" />
                  <div>
                    <span className="block text-white mb-1">Timings:</span>
                    Tue–Sat: 4:00 PM – 8:00 PM<br/>Sunday: Special batches by appointment
                  </div>
                </li>
                <li className="flex items-center gap-3 text-white/60 font-medium leading-relaxed">
                  <Phone className="w-5 h-5 text-secondary shrink-0" />
                  <span>+91 8779739115, +91 9326345790</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-white/40 font-medium">
            <p>© {new Date().getFullYear()} Subodh Narvekar's Art Academy. All rights reserved.</p>
            <div className="flex gap-6">
              <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
            </div>
          </div>
        </div>
      </footer>

      {/* WhatsApp Floating Button */}
      <motion.a
        href="https://wa.me/918779739115?text=Hi%2C%20I'd%20like%20to%20know%20more%20about%20SNAA%20courses"
        target="_blank"
        rel="noreferrer"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 1.5, type: "spring", stiffness: 200 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        className="fixed bottom-6 right-6 z-50 group flex items-center gap-3"
      >
        <span className="hidden group-hover:flex items-center bg-white text-gray-800 text-sm font-semibold px-4 py-2 rounded-full shadow-lg border border-gray-100 whitespace-nowrap transition-all">
          Chat on WhatsApp
        </span>
        <div className="w-14 h-14 rounded-full flex items-center justify-center shadow-xl text-white relative" style={{ backgroundColor: "#25D366" }}>
          <span className="absolute inset-0 rounded-full animate-ping opacity-30" style={{ backgroundColor: "#25D366" }}></span>
          <FaWhatsapp size={28} />
        </div>
      </motion.a>
    </div>
  );
}
