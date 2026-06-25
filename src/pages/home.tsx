import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { motion } from "framer-motion";
import {
  Menu, X, Phone, Mail, MapPin, Instagram, Youtube, Facebook,
  CheckCircle2, ChevronRight, ChevronLeft, Award, BadgeCheck,
  Shield, Palette, GraduationCap, Users, Clock, BookOpen, Pencil, Star,
  Video, PlayCircle, Infinity, ShieldCheck
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

// Updated to accept the image directly inside the card object
const FlippableCourseCard = ({ card }: { card: { title: string; desc?: string; icon: any; img: string } }) => {
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
            src={card.img}
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

  const videoCategories = [
    {
      name: "Kids & Foundational Art",
      courses: [
        { title: "Cartoon Art", img: "/vcartoons.jpeg", tag: "Kids Special", desc: "Fun, step-by-step cartoon character styling and creative expressions for young minds.", price: "₹999", features: ["HD Video Lessons", "Ages 5-12", "Lifetime Access"], previewUrl: "https://youtu.be/XNjtZYZ0qoI?si=BDP4tqB5sPVzkAYW" },
        { title: "Pencil Shading for Kids", img: "/vpencilshadingforkids.jpeg", tag: "Foundational", desc: "Introduces basic light, shadow, and tonal control with pencils for junior artists.", price: "₹1,199", features: ["Core Modules", "Kid Friendly", "Lifetime Access"], previewUrl: "https://youtu.be/nWzlU6gXn20?si=u0t9H_oh4bTAI8Ab" },
        { title: "Figure Drawing for Kids", img: "/vfiguredrawingforkids.jpeg", tag: "Junior Anatomy", desc: "Simplifies human body proportions into basic geometric shapes for quick learning.", price: "₹1,299", features: ["Practice Videos", "Easy Methods", "Lifetime Access"] },
      ]
    },
    {
      name: "Sketching & Anatomy Mastery",
      courses: [
        { title: "Pencil Objects Shading", img: "/vpencilobjects.jpeg", tag: "Still Life", desc: "Master realistic 3D textures, drapery, and complex shading structures of daily objects.", price: "₹1,499", features: ["Deep-Dive Modules", "Material Guides", "Lifetime Access"], previewUrl: "https://youtu.be/cB5IvOosbCs?si=pI0jRHK52_z6HJHU" },
        { title: "Pencil Landscapes", img: "/vpencillandscapes.jpeg", tag: "Perspective", desc: "Understand 1-point, 2-point perspective guidelines, skies, trees, and detailed nature drawing.", price: "₹1,499", features: ["Detailed Chapters", "Perspective Rules", "Lifetime Access"], previewUrl: "https://youtu.be/wq1dHb4fsqg?si=AHlaLCeEbYw1nA-6" },
        { title: "Human Figures Study", img: "/vhumanfigures.jpeg", tag: "Anatomy", desc: "Comprehensive anatomical body maps, skeletal breakdowns, and realistic gesture poses.", price: "₹1,799", features: ["Step-by-Step Clips", "Proportions Blueprint", "Lifetime Access"], previewUrl: "https://youtu.be/v0o2DB77gYs?si=U3REitQ4bThoC4p-" },
        { title: "Sketching People Live", img: "/vsketchingpeople.jpeg", tag: "Live Sketching", desc: "Capture real-time gestures, clothing folds, and natural human postures rapidly.", price: "₹1,599", features: ["Action Demos", "Live Techniques", "Lifetime Access"] },
        { title: "Caricature Design", img: "/vcaricature.jpeg", tag: "Creative Stylization", desc: "Learn exaggeration rules to morph basic portraits into humorous, artistic caricatures.", price: "₹1,499", features: ["Conceptual Modules", "Proportion Warping", "Lifetime Access"], previewUrl: "https://youtu.be/BcC0GXsGNGk?si=qoPlYSAOVRFnA00s" },
        { title: "Pencil Portraiture", img: "/vpencilportrait.jpeg", tag: "Advanced Portrait", desc: "Detailed mapping of hyper-realistic facial features, hair rendering, and soft skin shading.", price: "₹1,999", features: ["Hyper-Detail Videos", "Feature Breakdowns", "Lifetime Access"] },
      ]
    },
    {
      name: "Coloring & Painting Mediums",
      courses: [
        { title: "Object Painting Basics", img: "/vobjectpainting.jpeg", tag: "Color Theory", desc: "Transition from pencil tones to volumetric color application using brush strategies.", price: "₹1,399", features: ["Fundamental Lessons", "Color Mixing Plans", "Lifetime Access"], previewUrl: "https://youtu.be/7P25y-R0wRY?si=hKzInLMmw-yzyaSc" },
        { title: "Oil Pastel Objects", img: "/voilpastelobjects.jpeg", tag: "Pastel Medium", desc: "Learn smooth blending, scrapings, and vibrant color layering tricks using oil pastels.", price: "₹1,199", features: ["Practical Modules", "Blending Methods", "Lifetime Access"] },
        { title: "Oil Pastel Landscapes", img: "/voilpastellandscapes.jpeg", tag: "Vibrant Scenery", desc: "Create breathtaking sunset, night, and valley scenarios using high-vibrancy pastels.", price: "₹1,299", features: ["Scenic Tutorials", "Layering Guides", "Lifetime Access"], previewUrl: "https://youtu.be/Qd9uXiWMuZo?si=JtsImkaek4ctY8Az" },
        { title: "Watercolor Landscape", img: "/vwatercolourlandscape.jpeg", tag: "Classic Scenery", desc: "Control transparency, transparent color layers, light highlights, and depth in water scapes.", price: "₹1,699", features: ["Detailed Modules", "Wash Blueprints", "Lifetime Access"] },
        { title: "Watercolor Wet on Wet", img: "/vwatercolourwetonwet.jpeg", tag: "Advanced Flow", desc: "Control highly fluid pigments on moisture grids to form soft, atmospheric masterpieces.", price: "₹1,799", features: ["Advanced Sessions", "Pigment Flow Rules", "Lifetime Access"], previewUrl: "https://youtu.be/UASbQpyNUC4?si=sdJDFYjDEMHe8QKV" },
        { title: "Watercolor Portraiture", img: "/vwatercolourportrait.jpeg", tag: "Elite Painting", desc: "Paint translucent skin tones, realistic bone shadow layers, and modern lighting accents.", price: "₹2,199", features: ["Masterclass Modules", "Skin Layer Recipes", "Lifetime Access"], previewUrl: "https://youtu.be/Y6kVTb75g0k?si=lR-jxj0Usjxsk7Ca" },
      ]
    },
    {
      name: "Art Grade Exam Specials",
      courses: [
        { title: "Memory Drawing Vol. 1", img: "/vmemorydrawing1.jpeg", tag: "Art Grade Exam", desc: "Master daily human action scenes, overlapping figures, and background grids for Elementary exams.", price: "₹1,999", features: ["Complete Scenarios", "Exam Guideline Check", "Lifetime Access"] },
        { title: "Memory Drawing Vol. 2", img: "/vmemorydrawing2.jpeg", tag: "Art Grade Exam", desc: "Complex crowd layouts, market grids, and technical coloring constraints for Intermediate exams.", price: "₹2,499", features: ["Complex Composition Demos", "Time Optimization", "Lifetime Access"] },
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-primary/20 selection:text-primary overflow-x-hidden font-sans">
      
      {/* 1. TOP INFO BAR */}
      <div className="w-full bg-primary text-primary-foreground py-2 text-sm hidden md:block">
        <div className="container mx-auto px-6 md:px-12 flex justify-between items-center">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-2">
              <Phone className="w-4 h-4"/> 
              <a href="tel:+918779739115" className="hover:underline">+91 8779739115</a>, 
              <a href="tel:+919326345790" className="hover:underline">+91 9326345790</a>
            </span>
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
        <section className="relative pt-20 pb-20 md:pt-32 md:pb-32 flex items-center overflow-hidden" style={{ background: "linear-gradient(135deg, #fce7f3 0%, #fdf2f8 50%, #d1fae5 100%)" }}>
          <div className="container mx-auto px-6 md:px-12 relative z-10 grid lg:grid-cols-2 gap-12 items-center">
            
            <div className="flex flex-col items-start text-left max-w-xl">
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
                <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-primary/10 text-primary text-xs font-bold uppercase tracking-wider mb-6 rounded-full">
                  Nurturing Creativity Since 1984
                </div>
              </motion.div>

              <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.1 }} className="text-4xl md:text-6xl lg:text-7xl font-sans font-bold text-foreground leading-[1.1] mb-4">
                Subodh Narvekar's Art Academy –<br/>
                <span className="text-secondary italic">Where Art Meets Fun</span>
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
                { value: "Since 1984-", label: "in art education" },
                { value: "20000+", label: "Students Trained" },
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
                <div className="inline-block px-4 py-1 bg-primary/10 text-primary font-semibold rounded-full text-sm mb-6">About Us</div>
                <h3 className="text-3xl md:text-4xl lg:text-5xl font-sans font-bold text-foreground mb-6 leading-tight">A Legacy since 1984 in Art Education</h3>
                <div className="space-y-6 text-foreground/70 text-lg mb-10">
                  <p>Established by Subodh Narvekar, SNAA has grown into one of Mumbai's most respected art institutions, a legacy since 1984 in art education.</p>
                  <p>From nurturing young children's creativity to preparing serious students for government-certified professional examinations, the academy combines disciplined classical training with an encouraging, studio-like atmosphere.</p>
                </div>
              </motion.div>

              <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-100px" }} transition={{ duration: 0.7, delay: 0.2 }} className="grid sm:grid-cols-2 gap-6">
                {[
                  { icon: Palette, text: "Structured curriculum for exam excellence" },
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
                  <img src="/subodhsir.jpg" alt="Subodh Narvekar" className="w-40 h-40 rounded-full object-cover mb-6 shadow-md border-4 border-muted" />
                  <h4 className="text-xl font-bold text-foreground mb-1">Subodh Narvekar</h4>
                  <p className="text-primary font-semibold text-sm uppercase tracking-wider mb-4">Founder</p>
                  <p className="text-foreground/70 text-sm">Subodh Narvekar is an art institution in himself. He has dedicated his life to teaching children. He had authored hundreds of books on drawing, basic painting , craft, origami, pencil shading series and grade exam made easy. He is proud recepient of lifetime acheivement award from Rotary Kandivali and Sai Seva Mandal, Kandivali.</p>
                </div>
                <div className="bg-white p-8 rounded-2xl shadow-sm border border-border/50 hover:shadow-lg transition-shadow flex flex-col items-center">
                  <img src="/Avdhutsir.jpg" alt="Avdhut Narvekar" className="w-40 h-40 rounded-full object-cover mb-6 shadow-md border-4 border-muted" />
                  <h4 className="text-xl font-bold text-foreground mb-1">Avdhut Narvekar</h4>
                  <p className="text-secondary font-semibold text-sm uppercase tracking-wider mb-4">Senior Instructor</p>
                  <p className="text-foreground/70 text-sm">Specializes in advanced techniques, perspective, and preparing students for competitive entrance exams.</p>
                </div>
                <div className="bg-white p-8 rounded-2xl shadow-sm border border-border/50 hover:shadow-lg transition-shadow flex flex-col items-center">
                  <img src="/Hemangimaam.jpg" alt="Hemangi Narvekar" className="w-40 h-40 rounded-full object-cover mb-6 shadow-md border-4 border-muted" />
                  <h4 className="text-xl font-bold text-foreground mb-1">Hemangi Narvekar</h4>
                  <p className="text-secondary font-semibold text-sm uppercase tracking-wider mb-4">Senior Instructor</p>
                  <p className="text-foreground/70 text-sm">Expert in child art development, foundational sketching, and nurturing early creative talent.</p>
                </div>
              </div>
            </div>

          </div>
        </section>{/* 6. COURSES SECTION */}
        <section id="courses" className="py-20 md:py-28 bg-white">
          <div className="container mx-auto px-6 md:px-12">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <div className="inline-block px-4 py-1 bg-primary/10 text-primary font-semibold rounded-full text-sm mb-4">Curriculum</div>
              <h3 className="text-3xl md:text-5xl font-sans font-bold text-foreground mb-6">Courses Offered</h3>
              <p className="text-lg text-foreground/70 font-medium">Structured courses for every age and skill level.</p>
            </div>

            <Tabs defaultValue="tab1" className="w-full">
              <TabsList className="flex flex-wrap h-auto w-full justify-center bg-transparent mb-12 border-b border-border p-0 gap-4 md:gap-8">
                <TabsTrigger value="tab1" className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:text-primary py-4 px-2 text-sm md:text-base font-bold data-[state=inactive]:text-foreground/60">Kids</TabsTrigger>
                <TabsTrigger value="tab2" className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:text-primary py-4 px-2 text-sm md:text-base font-bold data-[state=inactive]:text-foreground/60">Teens & Adults</TabsTrigger>
                <TabsTrigger value="tab4" className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:text-primary py-4 px-2 text-sm md:text-base font-bold data-[state=inactive]:text-foreground/60 relative">
                  Certified Courses <span className="absolute top-1 -right-4 bg-secondary text-white text-[10px] px-2 py-0.5 rounded-full font-bold">GOVT</span>
                </TabsTrigger>
              </TabsList>

              {/* Tab 1: Kids */}
              <TabsContent value="tab1" className="animate-in fade-in-50 duration-500 pt-4">
                <div className="flex overflow-x-auto pb-8 gap-6 snap-x hide-scrollbar">
                  {[
                    { title: "Child Art", desc: "Ages 4–10", icon: Palette, img: "/childart.jpg" },
                    { title: "Elementary & Intermediate Grade Exam", desc: "", icon: BookOpen, img: "/Intermediate.jpg" },
                    { title: "Advance Painting", desc: "", icon: Award, img: "/student.jpg" },
                    { title: "Pencil Shading", desc: "Sketching & Landscapes", icon: Pencil, img: "/pencilshadingkids.jpeg" }
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
                    { title: "Watercolor Painting", icon: Palette, img: "/watercolor.jpg" },
                    { title: "Acrylic Painting", icon: Palette, img: "/acrylicpainting.jpeg" },
                    { title: "Pencil Shading", icon: Pencil, img: "/pencilshadingadults.jpeg" }
                  ].map((card, i) => (
                     <FlippableCourseCard key={i} card={card} />
                  ))}
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
                      <li className="flex items-start gap-2"><CheckCircle2 className="w-5 h-5 shrink-0" /><span>Prepares students to teach at school level</span></li>
                      <li className="flex items-start gap-2"><CheckCircle2 className="w-5 h-5 shrink-0" /><span>Affiliated with SDVTII & MBTB</span></li>
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
              </TabsContent>
            </Tabs>
          </div>
        </section>

        {/* 6.5 COURSE DETAILS SECTION */}
        <section className="py-16 md:py-24 bg-white">
          <div className="container mx-auto px-6 md:px-12 grid md:grid-cols-2 gap-12 items-center">
            <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="relative">
              <div className="absolute inset-0 bg-primary/10 rounded-3xl translate-x-4 translate-y-4 -z-10"></div>
              <img src="/group2.jpeg" alt="Kids & Teens Art" className="w-full h-auto rounded-2xl shadow-xl object-cover" />
            </motion.div>
            <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
              <h3 className="text-3xl md:text-4xl font-bold mb-4">Kids & Teens Art Classes</h3>
              <div className="inline-block px-4 py-1.5 bg-secondary/10 text-secondary font-bold text-sm rounded-full mb-6">Ideal for ages - 4 to 15 years</div>
              <p className="text-foreground/80 font-medium mb-8 leading-relaxed">
                Our foundational art classes are designed to spark creativity and build core skills in young learners. From Child Art for beginners to Elementary and Intermediate Grade Exam Preparation, each session blends fun with structured learning.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
                {["Child art", "Advance painting", "Elementary exam preparation", "Intermediate exam preparation", "Pencil shading and sketching", "Cartoon art", "Art and craft", "Advance child art"].map((item, i) => (
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
              <div className="inline-block px-4 py-1.5 bg-secondary/10 text-secondary font-bold text-sm rounded-full mb-6">14 years and above</div>
              <p className="text-foreground/80 font-medium mb-8 leading-relaxed">
                Whether you're a hobbyist or an aspiring professional, our classes offer a relaxed yet structured Curriculum to explore a wide range of art mediums.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
                {["Pencil Shading", "Charcoal Art", "Water Colour Painting", "Acrylic Painting", "Poster colour painting", "Colour Pencil", "Oil Pastels"].map((item, i) => (
                  <div key={i} className="flex items-start gap-2">
                    <CheckCircle2 className="w-5 h-5 text-secondary shrink-0" /><span className="text-sm font-semibold">{item}</span>
                  </div>
                ))}
              </div>
              <Button onClick={() => scrollToSection("contact")} className="bg-secondary hover:bg-secondary/90 text-white font-bold rounded-full px-8 py-6 h-auto">ENQUIRE NOW</Button>
            </motion.div>
            <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="relative order-1 md:order-2">
              <div className="absolute inset-0 bg-secondary/10 rounded-3xl -translate-x-4 translate-y-4 -z-10"></div>
              <img src="/student4.jpg" alt="Teens & Adults Art" className="w-full h-auto rounded-2xl shadow-xl object-cover" />
            </motion.div>
          </div>
        </section>

        <section className="py-16 md:py-24 bg-white">
          <div className="container mx-auto px-6 md:px-12 grid md:grid-cols-2 gap-12 items-center">
            <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="relative">
              <div className="absolute inset-0 bg-primary/10 rounded-3xl translate-x-4 translate-y-4 -z-10"></div>
              <img src="/bagworkshop.jpg" alt="Professional Courses" className="w-full h-auto rounded-2xl shadow-xl object-cover" />
            </motion.div>
            <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
              <h3 className="text-3xl md:text-4xl font-bold mb-4">Professional & Certified Courses</h3>
              <div className="inline-block px-4 py-1.5 bg-[#4285F4]/10 text-[#4285F4] font-bold text-sm rounded-full mb-6">Govt. Certified | Affiliated with SDVTII & MBTB</div>
              <p className="text-foreground/80 font-medium mb-8 leading-relaxed">
                For those seeking a formal career in art and design, SNAA offers government-certified programs with proven results in national entrance examinations.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
                {["Art Teacher's Training course", "Fine Arts"].map((item, i) => (
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
                <div><h4 className="font-bold text-lg">SDVTII</h4><p className="text-sm text-foreground/70">Vocational Training</p></div>
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
                  Expert-led art classes, government-certified courses, and entrance exam preparation — all in one place. Admissions Open.
                </p>
                <Button onClick={() => scrollToSection("contact")} className="bg-white hover:bg-white/90 text-secondary font-bold rounded-full px-8 py-6 h-auto shadow-lg hover:-translate-y-1 transition-all">
                  ENQUIRE NOW
                </Button>
              </div>
              
              <div className="md:w-[40%] grid grid-cols-2 gap-4 z-10 w-full aspect-square md:aspect-auto">
                <img src="/kashvi.jpg" alt="Artwork 1" className="rounded-xl w-full h-full object-cover shadow-md" />
                <img src="/student9.jpeg" alt="Artwork 2" className="rounded-xl w-full h-full object-cover shadow-md translate-y-4" />
                <img src="/student11.jpeg" alt="Artwork 3" className="rounded-xl w-full h-full object-cover shadow-md -translate-y-4" />
                <img src="/painting.jpg" alt="Artwork 4" className="rounded-xl w-full h-full object-cover shadow-md" />
              </div>
              <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3"></div>
            </div>
          </div>
        </section>


        {/* ========================================================================= */}
        {/* ==================== 8. PREMIUM VIDEO COURSES SECTION =================== */}
        {/* ========================================================================= */}
        
        <div id="video-courses">
          {/* CINEMATIC HERO SECTION */}
          <section className="relative pt-24 pb-32 bg-slate-900 text-white overflow-hidden">
            <div className="absolute inset-0 z-0 opacity-20">
              <img src="/work7.jpg" alt="Background Texture" className="w-full h-full object-cover blur-sm" />
              <div className="absolute inset-0 bg-slate-900/80"></div>
            </div>
            
            <div className="container mx-auto px-6 md:px-12 relative z-10 text-center max-w-4xl">
              <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
                <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-white/10 text-white text-xs font-bold uppercase tracking-wider mb-6 rounded-full border border-white/20">
                  <Video className="w-4 h-4" /> Premium Online Learning
                </div>
              </motion.div>
              
              <motion.h1 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.1 }} className="text-4xl md:text-5xl lg:text-6xl font-sans font-bold leading-[1.1] mb-6">
                Master Art Anytime,<br/>Anywhere.
              </motion.h1>
              
              <motion.p initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.2 }} className="text-lg md:text-xl text-white/80 mb-10 leading-relaxed font-medium">
                Step-by-step, high-quality video tutorials taught by Subodh Narvekar and our senior faculty. Bring the studio experience directly to your home.
              </motion.p>
            </div>
          </section>

          {/* WHY CHOOSE OUR VIDEOS */}
          <section className="py-16 bg-white border-b border-border/50 relative -mt-12 z-20 container mx-auto px-6 md:px-12 rounded-3xl shadow-xl">
            <div className="grid md:grid-cols-3 gap-8">
              <div className="flex flex-col items-center text-center p-6">
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center text-primary mb-6">
                  <Video className="w-8 h-8" />
                </div>
                <h4 className="text-lg font-bold text-foreground mb-3">Crystal Clear Quality</h4>
                <p className="text-foreground/70 font-medium">High-Definition (4K) recording so students can see every brushstroke.</p>
              </div>
              
              <div className="flex flex-col items-center text-center p-6 border-y md:border-y-0 md:border-x border-border/50">
                <div className="w-16 h-16 rounded-full bg-secondary/10 flex items-center justify-center text-secondary mb-6">
                  <PlayCircle className="w-8 h-8" />
                </div>
                <h4 className="text-lg font-bold text-foreground mb-3">Total Flexibility</h4>
                <p className="text-foreground/70 font-medium">Pause, rewind, and learn at your own pace from the comfort of your home.</p>
              </div>

              <div className="flex flex-col items-center text-center p-6">
                <div className="w-16 h-16 rounded-full bg-[#4285F4]/10 flex items-center justify-center text-[#4285F4] mb-6">
                  <Infinity className="w-8 h-8" />
                </div>
                <h4 className="text-lg font-bold text-foreground mb-3">Courses with lifetime access</h4>
                <p className="text-foreground/70 font-medium">Buy once, keep forever. Revisit the deep lessons whenever you need a refresher.</p>
              </div>
            </div>
          </section>

          {/* DYNAMIC CATEGORIZED COURSE SECTIONS */}
          {videoCategories.map((cat, catIdx) => (
            <section key={catIdx} className={`py-16 ${catIdx % 2 === 0 ? "bg-muted/10" : "bg-white"}`}>
              <div className="container mx-auto px-6 md:px-12">
                <div className="flex items-center gap-4 mb-12">
                  <div className="h-8 w-2 bg-primary rounded-full"></div>
                  <h3 className="text-2xl md:text-3xl font-sans font-bold text-foreground tracking-tight">{cat.name}</h3>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {cat.courses.map((course, i) => {
                    const whatsappUrl = `https://wa.me/918779739115?text=Hi%2C%20I'm%20interested%20in%20purchasing%20the%20%22${encodeURIComponent(course.title)}%22%20video%20course%20for%20${course.price}.%20Please%20guide%20me%20on%20how%20to%20complete%20the%20payment%20and%20get%20access.`;
                    
                    return (
                      <div key={i} className="bg-white rounded-3xl overflow-hidden shadow-md hover:shadow-xl transition-all border border-border flex flex-col group">
                        <div className="relative aspect-video overflow-hidden bg-muted">
                          <img src={course.img} alt={course.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                          <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm text-foreground text-xs font-bold px-3 py-1 rounded-full border border-border/50 shadow-sm">{course.tag}</div>
                        </div>
                        <div className="p-6 flex flex-col flex-grow">
                          <h4 className="text-xl font-bold text-foreground leading-tight mb-3">{course.title}</h4>
                          <p className="text-foreground/70 text-sm mb-6 leading-relaxed flex-grow">{course.desc}</p>
                          
                          <ul className="space-y-2.5 mb-6 pt-4 border-t border-border/40">
                            {course.features.map((feat, fIdx) => (
                              <li key={fIdx} className="flex items-center gap-2 text-xs font-semibold text-foreground/80">
                                <CheckCircle2 className="w-4 h-4 text-primary shrink-0" /> {feat}
                              </li>
                            ))}
                          </ul>

                          <div className="flex items-center justify-between pt-4 border-t border-border/50 mt-auto">
                            <span className="text-xl font-black text-foreground">{course.price}</span>
                            <div className="flex gap-2">
                              {course.previewUrl && (
                                <a href={course.previewUrl} target="_blank" rel="noreferrer">
                                  <Button variant="outline" className="rounded-full px-4 h-10 text-xs border-primary text-primary hover:bg-primary/10 flex items-center gap-1.5 shadow-sm">
                                    <Youtube size={15} /> Preview
                                  </Button>
                                </a>
                              )}
                              <a href={whatsappUrl} target="_blank" rel="noreferrer">
                                <Button className="bg-[#25D366] hover:bg-[#20ba53] text-white font-bold rounded-full px-4 h-10 text-xs flex items-center gap-1.5 shadow-sm">
                                  <FaWhatsapp size={15} /> Enquire
                                </Button>
                              </a>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </section>
          ))}

          {/* FREE PREVIEW PLAYLIST SECTION */}
          <section className="py-20 bg-slate-900 text-white border-t border-border/10">
            <div className="container mx-auto px-6 md:px-12 text-center max-w-4xl">
              <h3 className="text-3xl md:text-5xl font-sans font-bold mb-6">Try Before You Buy</h3>
              <p className="text-lg text-white/80 font-medium mb-10">Not sure which course is right for you? Watch our free preview lessons on YouTube to experience the teaching quality.</p>
              <a href="https://youtube.com/playlist?list=PLwB_a_c_n1B65545B82" target="_blank" rel="noreferrer">
                <Button className="bg-red-600 hover:bg-red-700 text-white font-bold rounded-full px-8 py-6 shadow-lg hover:shadow-xl transition-all hover:-translate-y-1">
                  <Youtube className="w-6 h-6 mr-2" /> Watch Free Previews
                </Button>
              </a>
            </div>
          </section>

          {/* HOW TO GET ACCESS GUIDE */}
          <section className="py-20 bg-white border-y border-border">
            <div className="container mx-auto px-6 md:px-12 max-w-4xl">
              <h3 className="text-3xl font-bold text-center text-foreground mb-12">How To Purchase Your Course</h3>
              <div className="grid md:grid-cols-3 gap-8 relative">
                <div className="flex flex-col items-center text-center p-4">
                  <div className="w-12 h-12 rounded-full bg-primary text-white font-bold flex items-center justify-center text-lg mb-4 shadow-md">1</div>
                  <h5 className="font-bold text-lg mb-2">Click Enquire</h5>
                  <p className="text-sm text-foreground/70 font-medium">Click the WhatsApp button on your chosen course to connect with our academy instantly.</p>
                </div>
                <div className="flex flex-col items-center text-center p-4">
                  <div className="w-12 h-12 rounded-full bg-primary text-white font-bold flex items-center justify-center text-lg mb-4 shadow-md">2</div>
                  <h5 className="font-bold text-lg mb-2">Pay via UPI / GPay</h5>
                  <p className="text-sm text-foreground/70 font-medium">We will share our official UPI handle. Complete the transaction securely and share a screenshot.</p>
                </div>
                <div className="flex flex-col items-center text-center p-4">
                  <div className="w-12 h-12 rounded-full bg-primary text-white font-bold flex items-center justify-center text-lg mb-4 shadow-md">3</div>
                  <h5 className="font-bold text-lg mb-2">Instant Access</h5>
                  <p className="text-sm text-foreground/70 font-medium">Our team will instantly share your personalized, permanent stream links straight to your chat!</p>
                </div>
              </div>
            </div>
          </section>
        </div>


        {/* ========================================================================= */}
        {/* ========================= 9. NEW WORKSHOPS SECTION ====================== */}
        {/* ========================================================================= */}
        
        <section id="workshops" className="py-20 md:py-28 bg-muted/20">
          <div className="container mx-auto px-6 md:px-12">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <div className="inline-block px-4 py-1 bg-primary/10 text-primary font-semibold rounded-full text-sm mb-4">Creative Learning</div>
              <h3 className="text-3xl md:text-5xl font-sans font-bold text-foreground mb-6">Special Workshops</h3>
              <p className="text-lg text-foreground/70 font-medium">Explore dedicated sessions focusing on specific traditional and modern art forms.</p>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
              {[
                { src: "/workshop3.jpeg", alt: "Pichwai Art" },
                { src: "/workshop2.jpeg", alt: "Boho art" },
                { src: "/workshop4.jpeg", alt: "Knife painting" },
                { src: "/workshop1.jpeg", alt: "Moon Light" },
                { src: "/workshop6.jpeg", alt: "Lord Shiva art" },
                { src: "/workshop5.jpeg", alt: "Lippan Art" },
                { src: "/workshop13.jpeg", alt: "Upcoming Workshop" },
                { src: "/workshop11.jpeg", alt: "Upcoming Workshop" },
                { src: "/workshop8.jpeg", alt: "Upcoming Workshop" },
                { src: "/workshop9.jpeg", alt: "Upcoming Workshop" },
                { src: "/workshop10.jpeg", alt: "Upcoming Workshop" },
                { src: "/workshop12.jpeg", alt: "Upcoming Workshop" }
              ].map((img, i) => (
                <div key={i} className="flex flex-col gap-4 group">
                  <div className="relative rounded-2xl overflow-hidden aspect-[4/3] shadow-sm group-hover:shadow-xl transition-all cursor-pointer">
                    <img src={img.src} alt={img.alt} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  </div>
                  <h4 className="font-bold text-foreground text-center text-lg">{img.alt}</h4>
                </div>
              ))}
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

        {/* 8. GALLERY SECTION */}
        <section id="gallery" className="py-20 md:py-28 bg-white">
          <div className="container mx-auto px-6 md:px-12">
            <div className="text-center mb-16">
              <div className="inline-block px-4 py-1 bg-primary/10 text-primary font-semibold rounded-full text-sm mb-4">Portfolio</div>
              <h3 className="text-3xl md:text-5xl font-sans font-bold text-foreground">Student Gallery</h3>
            </div>
            
            <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
              {[
                { src: "/group8.jpg", alt: "Academy Session" },
                { src: "/group1.jpg", alt: "Student Gathering" },
                { src: "/group2.jpg", alt: "Art Class" },
                { src: "/group3.jpg", alt: "Exhibition View" },
                { src: "/group4.jpg", alt: "Workshop Group" },
                { src: "/group6.jpg", alt: "Creating Art" },
                { src: "/homepage.jpg", alt: "Studio Life" },
                { src: "/student1.jpg", alt: "Portrait Practice" },
                { src: "/student2.jpg", alt: "Focus in Class" },
                { src: "/student3.jpg", alt: "Foundational Sketching" },
                { src: "/student6.jpg", alt: "Advanced Techniques" },
                { src: "/student9.jpg", alt: "Art Student" },
                { src: "/student10.jpg", alt: "Class Session" },
                { src: "/student11.jpg", alt: "Creating Art" },
                { src: "/student12.jpg", alt: "Academy Member" },
                { src: "/work1.jpg", alt: "Fruits Still Life" },
                { src: "/work3.jpg", alt: "Detailed Sketch" },
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
                  { q: "What courses do you offer?", a: "We offer Kids & Teens art classes, Grade exam preparation (Elementary & Intermediate), Teens & Adults hobby classes, Video Lecture based sessions, Art Teacher's Training Course (ATTC), Fine Arts, and entrance exam preparation for NIFT, NID, NATA, and MH AAC CET." },
                  { q: "Who are the instructors?", a: "Classes are conducted by our Founder Subodh Narvekar, alongside Senior Instructors Avdhut Narvekar and Hemangi Narvekar — all trained professional artists." },
                  { q: "What are your timings?", a: "Tuesday to Saturday: 4:00 PM – 8:00 PM. Sunday special batches are available by appointment. Video Lectures provide flexible access anytime." },
                  { q: "Are government certificates provided?", a: "Yes! Our ATTC and Fine Arts courses are government-certified through SDVTII and affiliated with the Maharashtra Business Training Board (MBTB) and Skill India." }
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
                              <SelectItem value="kids">Kids Art</SelectItem>
                              <SelectItem value="exam_prep">Govt. Exam Preparation</SelectItem>
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
                Nurturing creativity since 1984. Offering comprehensive art education and government certified courses in Mumbai and Video Lectures.
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
                  <li><button onClick={() => scrollToSection("about")} className="text-white/60 hover:text-white transition-colors font-medium">About</button></li>
                  <li><button onClick={() => scrollToSection("faculty")} className="text-white/60 hover:text-white transition-colors font-medium">Faculty</button></li>
                  <li><button onClick={() => scrollToSection("courses")} className="text-white/60 hover:text-white transition-colors font-medium">Courses</button></li>
                  <li><button onClick={() => scrollToSection("gallery")} className="text-white/60 hover:text-white transition-colors font-medium">Gallery</button></li>
                  <li><button onClick={() => scrollToSection("contact")} className="text-white/60 hover:text-white transition-colors font-medium">Contact</button></li>
                </ul>
              </div>
              <div>
                <h4 className="font-bold text-lg mb-6">Popular Courses</h4>
                <ul className="space-y-4">
                  <li><button onClick={() => scrollToSection("courses")} className="text-white/60 hover:text-white transition-colors font-medium">Child Art</button></li>
                  <li><button onClick={() => scrollToSection("courses")} className="text-white/60 hover:text-white transition-colors font-medium">Exam Prep</button></li>
                  <li><button onClick={() => scrollToSection("courses")} className="text-white/60 hover:text-white transition-colors font-medium">ATTC Certification</button></li>
                  <li><button onClick={() => scrollToSection("video-courses")} className="text-white/60 hover:text-white transition-colors font-medium">Video Lectures</button></li>
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
        href="https://wa.me/918779739115?text=Hi%2C%20I'd%20like%20to%20know%20more%20about%20your%20video%20courses"
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
