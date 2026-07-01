import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { motion } from "framer-motion";
import {
  Menu, X, Phone, Mail, MapPin, Instagram, Youtube, Facebook,
  CheckCircle2, ChevronRight, ChevronLeft, Award, BadgeCheck,
  Shield, Palette, GraduationCap, Users, Clock, BookOpen, Pencil, Star,
  Video, PlayCircle, Infinity, ShieldCheck, ChevronUp
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
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [visibleGalleryCount, setVisibleGalleryCount] = useState(9);
  const { toast } = useToast();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
      setShowBackToTop(window.scrollY > 800);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      const y = element.getBoundingClientRect().top + window.scrollY - 80;
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

  const galleryImages = [
    { src: "/Texture art workshop.jpg", alt: "Texture Art Workshop" },
    { src: "/abstractart.jpeg", alt: "Abstract Art" },
    { src: "/calligraphy.jpg", alt: "Calligraphy" },
    { src: "/Canvaspaintng.jpg", alt: "Canvas Painting" },
    { src: "/charcoal.jpg", alt: "Charcoal Art" },
    { src: "/knifepainting.jpg", alt: "Knife Painting" },
    { src: "/oilpastel.jpg", alt: "Oil Pastel" },
    { src: "/pencilshading.jpg", alt: "Pencil Shading" },
    { src: "/Sketching.jpg", alt: "Sketching" },
    { src: "/classroom.jpg", alt: "Classroom" },
    { src: "/explaining2.jpg", alt: "Teacher Explaining" },
    { src: "/paintingstudent.jpg", alt: "Student Painting" },
    { src: "/group1.jpeg", alt: "Group Photo" },
    { src: "/group3.jpeg", alt: "Group Photo" },
    { src: "/group4.jpeg", alt: "Group Photo" },
    { src: "/group5.jpeg", alt: "Group Photo" },
    { src: "/group6.jpeg", alt: "Group Photo" },
    { src: "/group7.jpeg", alt: "Group Photo" },
    { src: "/group8.jpeg", alt: "Group Photo" },
    { src: "/group9.jpeg", alt: "Group Photo" },
    { src: "/group11.jpeg", alt: "Group Photo" },
    { src: "/student1.jpg", alt: "Student Work" },
    { src: "/student2.jpg", alt: "Student Work" },
    { src: "/student3.jpg", alt: "Student Work" },
    { src: "/student5.jpg", alt: "Student Work" },
    { src: "/student6.jpg", alt: "Student Work" },
    { src: "/student7.jpeg", alt: "Student Work" },
    { src: "/student8.jpeg", alt: "Student Work" },
    { src: "/student10.jpeg", alt: "Student Work" },
    { src: "/student12.jpeg", alt: "Student Work" },
    { src: "/student13.jpeg", alt: "Student Work" }
  ];

  const workshopImages = [
    { src: "/workshop3.jpeg", alt: "Pichwai Art" },
    { src: "/workshop2.jpeg", alt: "Boho Art" },
    { src: "/workshop4.jpeg", alt: "Knife Painting" },
    { src: "/workshop1.jpeg", alt: "Moonlight Art" },
    { src: "/workshop6.jpeg", alt: "Lord Shiva Art" },
    { src: "/workshop5.jpeg", alt: "Lippan Art" },
    { src: "/workshop13.jpeg", alt: "Brushpen Calligraphy" },
    { src: "/workshop11.jpeg", alt: "Warli Art" },
    { src: "/workshop8.jpeg", alt: "Sand Art" },
    { src: "/workshop9.jpeg", alt: "Texture Art" },
    { src: "/workshop10.jpeg", alt: "Buddha Line Art" },
    { src: "/workshop12.jpeg", alt: "Glass Painting" }
  ];

  const videoCategories = [
    {
      name: "Video courses for kids",
      courses: [
        { title: "Figure Drawing for Kids", img: "/vfiguredrawingforkids.jpeg", desc: "Specially for kids of grades 2 to 6. Over 48 human figures demonstrated in simple language.", price: "₹600", features: ["34 Lessons", "Grades 2 to 6", "48+ Human Figures"] },
        { title: "Pencil Shading for Kids", img: "/vpencilshadingforkids.jpeg", desc: "Specially for kids of grades 2 to 6. Introduces basic light, shadow, and tonal control.", price: "₹600", features: ["15 Lessons", "Grades 2 to 6", "Lifetime Access"], previewUrl: "https://youtu.be/nWzlU6gXn20?si=u0t9H_oh4bTAI8Ab" },
        { title: "Cartoon Art", img: "/vcartoons.jpeg", desc: "Includes Animal cartoons, creative cartoons, kawaii animation, Mario Miranda style, cartoon characters. PDF images included.", price: "₹600", features: ["37 Lessons", "Grades 2 to 6", "PDF Included"], previewUrl: "https://youtu.be/XNjtZYZ0qoI?si=BDP4tqB5sPVzkAYW" },
        { title: "Oil Pastel Landscapes", img: "/voilpastellandscapes.jpeg", desc: "For both kids and adults. Includes 7 intro lessons, 11 landscapes, and 1 bonus lesson.", price: "₹750", features: ["19 Lessons", "Kids & Adults", "Bonus Lesson"], previewUrl: "https://youtu.be/Qd9uXiWMuZo?si=JtsImkaek4ctY8Az" }
      ]
    },
    {
      name: "Video courses for teens & adults",
      courses: [
        { title: "Pencil Shading Portraits", img: "/vpencilportrait.jpeg", desc: "Detailed mapping of hyper-realistic facial features, hair rendering, and soft skin shading.", price: "₹750", features: ["21 Lessons", "Lifetime Access"] },
        { title: "Pencil Objects Shading", img: "/vpencilobjects.jpeg", desc: "Perspective, shade and light, shading without smudging, man-made & natural objects.", price: "₹750", features: ["26 Lessons", "17 Intro & 9 Objects", "Lifetime Access"], previewUrl: "https://youtu.be/cB5IvOosbCs?si=pI0jRHK52_z6HJHU" },
        { title: "Pencil Shading Landscapes", img: "/vpencillandscapes.jpeg", desc: "Understand 1-point, 2-point perspective guidelines, skies, trees, and detailed nature drawing.", price: "₹750", features: ["18 Lessons", "Lifetime Access"], previewUrl: "https://youtu.be/wq1dHb4fsqg?si=AHlaLCeEbYw1nA-6" },
        { title: "Human Figures Study", img: "/vhumanfigures.jpeg", desc: "Adult to child body proportion, male/female faces, sitting/standing figures, sports/dance action poses.", price: "₹840", features: ["23 Lessons", "Lifetime Access"], previewUrl: "https://youtu.be/v0o2DB77gYs?si=U3REitQ4bThoC4p-" },
        { title: "Sketching People", img: "/vsketchingpeople.jpeg", desc: "Capture real-time gestures, clothing folds, and natural human postures rapidly.", price: "₹600", features: ["13 Lessons", "Lifetime Access"] },
        { title: "Caricatures", img: "/vcaricature.jpeg", desc: "Learn exaggeration rules to morph basic portraits. Includes 3 intro lessons and 25 caricatures.", price: "₹750", features: ["28 Lessons", "Lifetime Access"], previewUrl: "https://youtu.be/BcC0GXsGNGk?si=qoPlYSAOVRFnA00s" },
        { title: "Object Painting", img: "/vobjectpainting.jpeg", desc: "Transition from pencil tones to volumetric color application using brush strategies.", price: "₹750", features: ["34 Lessons", "Lifetime Access"], previewUrl: "https://youtu.be/7P25y-R0wRY?si=hKzInLMmw-yzyaSc" },
        { title: "Oil Pastels Objects", img: "/voilpastelobjects.jpeg", desc: "Learn smooth blending, scrapings, and vibrant color layering tricks using oil pastels.", price: "₹750", features: ["34 Lessons", "Lifetime Access"] },
        { title: "Water Colour Landscapes", img: "/vwatercolourlandscape.jpeg", desc: "Control transparency, transparent color layers, light highlights, and depth in water scapes.", price: "₹750", features: ["22 Lessons", "Lifetime Access"] },
        { title: "Wet on Wet Watercolours", img: "/vwatercolourwetonwet.jpeg", desc: "Step by step in Hindi with English captions. Control highly fluid pigments.", price: "₹500", features: ["21 Lessons", "Hindi & English", "Lifetime Access"], previewUrl: "https://youtu.be/UASbQpyNUC4?si=sdJDFYjDEMHe8QKV" },
        { title: "Water Colour Portrait", img: "/vwatercolourportrait.jpeg", desc: "Drawing Portraits accurately, tonal value, skin tone combinations, monochrome & colour portraits.", price: "₹750", features: ["25 Lessons", "Lifetime Access"], previewUrl: "https://youtu.be/Y6kVTb75g0k?si=lR-jxj0Usjxsk7Ca" },
        { title: "Perspective", img: "/student3.jpg", desc: "1, 2 & 3 point perspective, room view, outdoor view, stairs drawing, figures in perspective.", price: "₹600", features: ["26 Lessons", "Lifetime Access"] },
        { title: "Memory Drawing Vol. 1", img: "/vmemorydrawing1.jpeg", desc: "Master daily human action scenes, overlapping figures, and background grids for Elementary exams.", price: "₹1250", features: ["27 Lessons", "Lifetime Access"] },
        { title: "Memory Drawing Vol. 2", img: "/vmemorydrawing2.jpeg", desc: "Human Figure Proportions, women dressed in saree, hands and feet, 5 Memory drawings.", price: "₹1750", features: ["12 Lessons", "Lifetime Access"] }
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-primary/20 selection:text-primary overflow-x-hidden font-sans">
      
      {/* TOP INFO BAR */}
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

      {/* NAVIGATION */}
      <header className={`sticky top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? "bg-white shadow-sm py-3 border-b border-border" : "bg-white py-4"}`}>
        <div className="container mx-auto px-6 md:px-12 flex items-center justify-between">
          <div className="flex items-center gap-3 cursor-pointer group" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>
            <img src="/logo.jpg" alt="SNAA Logo" className="w-10 h-10 md:w-12 md:h-12 rounded-full object-cover shadow-md group-hover:scale-105 transition-transform" />
            <div className="flex flex-col">
              <span className="font-sans font-bold text-base md:text-lg leading-tight tracking-tight text-foreground">Subodh Narvekar's</span>
              <span className="text-[10px] md:text-xs uppercase tracking-wider text-primary font-semibold">Art Academy</span>
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
        {/* HERO SECTION */}
        <section className="relative py-16 md:py-24 flex items-center overflow-hidden" style={{ background: "linear-gradient(135deg, #fce7f3 0%, #fdf2f8 50%, #d1fae5 100%)" }}>
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

              <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }} className="text-lg md:text-xl text-foreground/80 mb-8 leading-relaxed font-medium">
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

        {/* STATS STRIP */}
        <section className="bg-white border-b border-border py-8 md:py-10">
          <div className="container mx-auto px-6 md:px-12">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {[
                { value: "Since 1984-", label: "in art education" },
                { value: "20000+", label: "Students Trained" },
                { value: "Govt.", label: "Certified Courses" },
                { value: "100%", label: "Dedicated Teaching" }
              ].map((stat, i) => (
                <div key={i} className="flex flex-col items-center justify-center text-center">
                  <span className="text-3xl md:text-4xl font-sans font-bold text-primary mb-1">{stat.value}</span>
                  <span className="text-[10px] md:text-xs font-semibold text-foreground/70 uppercase tracking-wider">{stat.label}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ABOUT & FACULTY SECTION */}
        <section id="about" className="py-12 md:py-20 bg-muted/20 relative">
          <div className="container mx-auto px-6 md:px-12">
            
            <div className="grid lg:grid-cols-2 gap-12 items-center mb-20">
              <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-50px" }} transition={{ duration: 0.6 }}>
                <div className="inline-block px-4 py-1 bg-primary/10 text-primary font-semibold rounded-full text-sm mb-4">About Us</div>
                <h3 className="text-3xl md:text-4xl lg:text-5xl font-sans font-bold text-foreground mb-6 leading-tight">A Legacy Since 1984 in Art Education</h3>
                <div className="space-y-4 text-foreground/70 text-base md:text-lg mb-8">
                  <p>Established by Subodh Narvekar, SNAA has grown into one of Mumbai's most respected art institutions, a legacy since 1984 in art education.</p>
                  <p>From nurturing young children's creativity to preparing serious students for government-certified professional examinations, the academy combines disciplined classical training with an encouraging, studio-like atmosphere.</p>
                </div>
              </motion.div>

              <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-50px" }} transition={{ duration: 0.6, delay: 0.2 }} className="grid sm:grid-cols-2 gap-4">
                {[
                  { icon: Palette, text: "Structured curriculum for exam excellence" },
                  { icon: Users, text: "Small batch sizes for personal attention" },
                  { icon: GraduationCap, text: "Classical techniques across all mediums" },
                  { icon: Award, text: "Professional certifications & career pathways" }
                ].map((item, i) => (
                  <div key={i} className="bg-white p-5 rounded-2xl shadow-sm hover:shadow-md transition-shadow border border-border/50 flex flex-col gap-3">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary"><item.icon className="w-5 h-5" /></div>
                    <span className="font-semibold text-foreground text-sm">{item.text}</span>
                  </div>
                ))}
              </motion.div>
            </div>

            <div id="faculty" className="text-center pb-8">
              <div className="inline-block px-4 py-1 bg-secondary/10 text-secondary font-semibold rounded-full text-sm mb-4">Our Team</div>
              <h3 className="text-3xl md:text-4xl font-sans font-bold text-foreground mb-10">Meet Our Instructors</h3>
              
              <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-border/50 hover:shadow-lg transition-shadow flex flex-col items-center">
                  <img src="/subodhsir.jpg" alt="Subodh Narvekar" className="w-32 h-32 md:w-40 md:h-40 rounded-full object-cover mb-4 shadow-md border-4 border-muted" />
                  <h4 className="text-lg md:text-xl font-bold text-foreground mb-1">Subodh Narvekar</h4>
                  <p className="text-primary font-semibold text-xs uppercase tracking-wider mb-3">Founder</p>
                  <p className="text-foreground/70 text-xs md:text-sm">Subodh Narvekar is an art institution in himself. He has dedicated his life to teaching children. He has authored hundreds of books on drawing, basic painting, craft, origami, the Pencil Shading Series, and Grade Exam Made Easy. He is the proud recipient of the Lifetime Achievement Award from Rotary Kandivali and Sai Seva Mandal, Kandivali.</p>
                </div>
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-border/50 hover:shadow-lg transition-shadow flex flex-col items-center">
                  <img src="/Avdhutsir.jpg" alt="Avdhut Narvekar" className="w-32 h-32 md:w-40 md:h-40 rounded-full object-cover mb-4 shadow-md border-4 border-muted" />
                  <h4 className="text-lg md:text-xl font-bold text-foreground mb-1">Avdhut Narvekar</h4>
                  <p className="text-secondary font-semibold text-xs uppercase tracking-wider mb-3">Senior Instructor</p>
                  <p className="text-foreground/70 text-xs md:text-sm">Specializes in advanced techniques, perspective, and preparing students for competitive entrance exams. BFA (Drawing and Painting) JJ School of Art 2002.</p>
                </div>
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-border/50 hover:shadow-lg transition-shadow flex flex-col items-center">
                  <img src="/Hemangimaam.jpg" alt="Hemangi Narvekar" className="w-32 h-32 md:w-40 md:h-40 rounded-full object-cover mb-4 shadow-md border-4 border-muted" />
                  <h4 className="text-lg md:text-xl font-bold text-foreground mb-1">Hemangi Narvekar</h4>
                  <p className="text-secondary font-semibold text-xs uppercase tracking-wider mb-3">Senior Instructor</p>
                  <p className="text-foreground/70 text-xs md:text-sm">Expert in child art development, foundational sketching, and nurturing early creative talent. BFA (Textile Designing) JJ School of Art 2002. Diploma Course from IITC in Fashion Designing.</p>
                </div>
              </div>
            </div>

          </div>
          {/* Subtle Wave Divider */}
          <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-[0]">
             <svg data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none" className="relative block w-full h-[30px] md:h-[50px] fill-white">
                <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V120H0V95.8C59.71,118.08,130.83,123.8,192.5,110.15,238.41,100,281.33,78.85,321.39,56.44Z"></path>
             </svg>
          </div>
        </section>

        {/* COURSES TABS SECTION */}
        <section id="courses" className="py-12 md:py-20 bg-white">
          <div className="container mx-auto px-6 md:px-12">
            <div className="text-center max-w-3xl mx-auto mb-12">
              <div className="inline-block px-4 py-1 bg-primary/10 text-primary font-semibold rounded-full text-sm mb-3">Curriculum</div>
              <h3 className="text-3xl md:text-4xl font-sans font-bold text-foreground mb-4">Courses Offered</h3>
              <p className="text-base text-foreground/70 font-medium">Structured courses for every age and skill level.</p>
            </div>

            <Tabs defaultValue="tab1" className="w-full">
              <TabsList className="flex flex-wrap h-auto w-full justify-center bg-transparent mb-10 border-b border-border p-0 gap-4 md:gap-8">
                <TabsTrigger value="tab1" className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:text-primary py-3 px-2 text-sm md:text-base font-bold data-[state=inactive]:text-foreground/60">Kids</TabsTrigger>
                <TabsTrigger value="tab2" className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:text-primary py-3 px-2 text-sm md:text-base font-bold data-[state=inactive]:text-foreground/60">Teens & Adults</TabsTrigger>
                <TabsTrigger value="tab4" className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:text-primary py-3 px-2 text-sm md:text-base font-bold data-[state=inactive]:text-foreground/60 relative">
                  Certified Courses <span className="absolute top-0 -right-3 bg-secondary text-white text-[9px] px-1.5 py-0.5 rounded-full font-bold">GOVT</span>
                </TabsTrigger>
              </TabsList>

              {/* Tab 1: Kids */}
              <TabsContent value="tab1" className="animate-in fade-in-50 duration-500 pt-2">
                <div className="flex overflow-x-auto pb-6 gap-6 snap-x hide-scrollbar">
                  {[
                    { title: "Child Art", desc: "Ages 4–10", icon: Palette, img: "/childart.jpg" },
                    { title: "Elementary & Intermediate Grade Exam", desc: "", icon: BookOpen, img: "/student13.jpeg" },
                    { title: "Advanced Painting", desc: "", icon: Award, img: "/student.jpg" },
                    { title: "Pencil Shading", desc: "Sketching & Landscapes", icon: Pencil, img: "/pencilshadingkids.jpeg" }
                  ].map((card, i) => (
                    <div key={i} className="min-w-[260px] snap-center">
                       <FlippableCourseCard card={card} />
                    </div>
                  ))}
                </div>
              </TabsContent>

              {/* Tab 2: Teens & Adults */}
              <TabsContent value="tab2" className="animate-in fade-in-50 duration-500 pt-2">
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
              <TabsContent value="tab4" className="animate-in fade-in-50 duration-500 pt-2">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="bg-primary text-white p-6 md:p-8 rounded-2xl shadow-lg relative overflow-hidden flex flex-col hover:-translate-y-1 transition-transform">
                    <BadgeCheck className="absolute top-4 right-4 w-12 h-12 opacity-20" />
                    <h4 className="text-xl md:text-2xl font-bold uppercase mb-2 pr-10 tracking-tight">Art Teacher's Training Course (ATTC)</h4>
                    <div className="bg-white text-primary text-[10px] md:text-xs font-bold px-3 py-1 rounded-full inline-block mb-6 w-fit">Government Certified</div>
                    <ul className="space-y-2 font-medium text-white/90 mb-6 text-sm md:text-base">
                      <li className="flex items-start gap-2"><CheckCircle2 className="w-4 h-4 mt-0.5 shrink-0" /><span>Prepares students to teach at school level</span></li>
                      <li className="flex items-start gap-2"><CheckCircle2 className="w-4 h-4 mt-0.5 shrink-0" /><span>Affiliated with SDVTII & MBTB</span></li>
                    </ul>
                  </div>
                  
                  <div className="bg-primary text-white p-6 md:p-8 rounded-2xl shadow-lg relative overflow-hidden flex flex-col hover:-translate-y-1 transition-transform">
                    <Award className="absolute top-4 right-4 w-12 h-12 opacity-20" />
                    <h4 className="text-xl md:text-2xl font-bold uppercase mb-2 tracking-tight">Fine Arts</h4>
                    <div className="bg-transparent text-transparent text-[10px] md:text-xs font-bold px-3 py-1 mb-6 w-fit select-none">Placeholder</div>
                    <ul className="space-y-2 font-medium text-white/90 mb-6 text-sm md:text-base">
                      <li className="flex items-start gap-2"><CheckCircle2 className="w-4 h-4 mt-0.5 shrink-0" /><span>Foundational & advanced fine arts training</span></li>
                      <li className="flex items-start gap-2"><CheckCircle2 className="w-4 h-4 mt-0.5 shrink-0" /><span>Professional portfolio development</span></li>
                    </ul>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </section>{/* COURSE DETAILS SECTION 1 */}
        <section className="py-12 md:py-20 bg-muted/20">
          <div className="container mx-auto px-6 md:px-12 grid md:grid-cols-2 gap-10 items-center">
            <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="relative">
              <div className="absolute inset-0 bg-primary/10 rounded-3xl translate-x-3 translate-y-3 -z-10"></div>
              <img src="/group2.jpeg" alt="Kids & Teens Art" className="w-full h-auto rounded-2xl shadow-xl object-cover" />
            </motion.div>
            <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
              <h3 className="text-2xl md:text-3xl font-bold mb-3">Kids Art Classes</h3>
              <div className="inline-block px-3 py-1 bg-secondary/10 text-secondary font-bold text-xs md:text-sm rounded-full mb-5">Ideal for ages 4 to 15 years</div>
              <p className="text-foreground/80 font-medium mb-6 leading-relaxed text-sm md:text-base">
                Our foundational art classes are designed to spark creativity and build core skills in young learners. From Child Art for beginners to Elementary and Intermediate Grade Exam Preparation, each session blends fun with structured learning.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
                {["Child Art", "Advanced Painting", "Elementary Exam Preparation", "Intermediate Exam Preparation", "Pencil Shading & Sketching", "Cartoon Art", "Art & Craft", "Advanced Child Art"].map((item, i) => (
                  <div key={i} className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 md:w-5 md:h-5 text-secondary shrink-0" /><span className="text-xs md:text-sm font-semibold">{item}</span>
                  </div>
                ))}
              </div>
              <Button onClick={() => scrollToSection("contact")} className="bg-secondary hover:bg-secondary/90 text-white font-bold rounded-full px-6 py-5 h-auto text-sm">ENQUIRE NOW</Button>
            </motion.div>
          </div>
        </section>

        {/* COURSE DETAILS SECTION 2 */}
        <section className="py-12 md:py-20 bg-white overflow-hidden">
          <div className="container mx-auto px-6 md:px-12 grid md:grid-cols-2 gap-10 items-center">
            <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="order-2 md:order-1">
              <h3 className="text-2xl md:text-3xl font-bold mb-3">Teens & Adults Classes</h3>
              <div className="inline-block px-3 py-1 bg-secondary/10 text-secondary font-bold text-xs md:text-sm rounded-full mb-5">14 years and above</div>
              <p className="text-foreground/80 font-medium mb-6 leading-relaxed text-sm md:text-base">
                Whether you're a hobbyist or an aspiring professional, our classes offer a relaxed yet structured Curriculum to explore a wide range of art mediums.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
                {["Pencil Shading", "Charcoal Art", "Watercolor Painting", "Acrylic Painting", "Poster Colour Painting", "Colour Pencils", "Oil Pastels"].map((item, i) => (
                  <div key={i} className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 md:w-5 md:h-5 text-secondary shrink-0" /><span className="text-xs md:text-sm font-semibold">{item}</span>
                  </div>
                ))}
              </div>
              <Button onClick={() => scrollToSection("contact")} className="bg-secondary hover:bg-secondary/90 text-white font-bold rounded-full px-6 py-5 h-auto text-sm">ENQUIRE NOW</Button>
            </motion.div>
            <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="relative order-1 md:order-2">
              <div className="absolute inset-0 bg-secondary/10 rounded-3xl -translate-x-3 translate-y-3 -z-10"></div>
              <img src="/student4.jpg" alt="Teens & Adults Art" className="w-full h-auto rounded-2xl shadow-xl object-cover" />
            </motion.div>
          </div>
        </section>

        {/* COURSE DETAILS SECTION 3 */}
        <section className="py-12 md:py-20 bg-white">
          <div className="container mx-auto px-6 md:px-12 grid md:grid-cols-2 gap-10 items-center">
            <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="relative">
              <div className="absolute inset-0 bg-primary/10 rounded-3xl translate-x-3 translate-y-3 -z-10"></div>
              <img src="/attc.jpeg" alt="Professional Courses" className="w-full h-auto rounded-2xl shadow-xl object-cover" />
            </motion.div>
            <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
              <h3 className="text-2xl md:text-3xl font-bold mb-3">Professional & Certified Courses</h3>
              <div className="inline-block px-3 py-1 bg-[#4285F4]/10 text-[#4285F4] font-bold text-xs md:text-sm rounded-full mb-5">Govt. Certified | Affiliated with SDVTII & MBTB</div>
              <p className="text-foreground/80 font-medium mb-6 leading-relaxed text-sm md:text-base">
                For those seeking a formal career in art and design, SNAA offers government-certified programs with proven results in national entrance examinations.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
                {["Art Teacher's Training Course (Offline)", "Art Teacher's Training Course (Online)", "Fine Arts Course", "Drawing & Painting Course", "Pencil Shading Course"].map((item, i) => (
                  <div key={i} className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 md:w-5 md:h-5 text-secondary shrink-0" /><span className="text-xs md:text-sm font-semibold">{item}</span>
                  </div>
                ))}
              </div>
              <Button onClick={() => scrollToSection("contact")} className="bg-secondary hover:bg-secondary/90 text-white font-bold rounded-full px-6 py-5 h-auto text-sm">ENQUIRE NOW</Button>
            </motion.div>
          </div>
        </section>

        {/* AFFILIATIONS SECTION */}
        <section id="affiliations" className="py-12 md:py-20 bg-muted/30 border-y border-border">
          <div className="container mx-auto px-6 md:px-12">
            <h3 className="text-2xl md:text-3xl font-bold text-center text-foreground mb-10">Recognised & Affiliated With</h3>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-white p-5 rounded-xl shadow-sm border-l-4 border-l-primary flex items-center gap-4 hover:shadow-md transition-shadow">
                <Shield className="w-8 h-8 text-primary shrink-0" />
                <div><h4 className="font-bold text-base md:text-lg">Skill India</h4><p className="text-xs md:text-sm text-foreground/70">Govt. of India Initiative</p></div>
              </div>
              <div className="bg-white p-5 rounded-xl shadow-sm border-l-4 border-l-primary flex items-center gap-4 hover:shadow-md transition-shadow">
                <BadgeCheck className="w-8 h-8 text-primary shrink-0" />
                <div><h4 className="font-bold text-base md:text-lg">SDVTII</h4><p className="text-xs md:text-sm text-foreground/70">Vocational Training</p></div>
              </div>
              <div className="bg-white p-5 rounded-xl shadow-sm border-l-4 border-l-primary flex items-center gap-4 hover:shadow-md transition-shadow">
                <Award className="w-8 h-8 text-primary shrink-0" />
                <div><h4 className="font-bold text-base md:text-lg">MBTB</h4><p className="text-xs md:text-sm text-foreground/70">Technical Board</p></div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA BANNER SECTION */}
        <section className="py-10 md:py-16 bg-white">
          <div className="container mx-auto px-6 md:px-12">
            <div className="bg-secondary rounded-3xl p-8 md:p-14 flex flex-col md:flex-row items-center gap-10 overflow-hidden relative shadow-2xl">
              <div className="md:w-[60%] z-10 text-center md:text-left flex flex-col items-center md:items-start">
                <h3 className="text-2xl md:text-4xl lg:text-5xl font-bold text-white mb-4 leading-tight tracking-tight">Begin Your Creative Journey at SNAA</h3>
                <p className="text-white/80 text-base md:text-lg font-medium mb-8 max-w-xl leading-relaxed">
                  Expert-led art classes, government-certified courses, and entrance exam preparation — all in one place. Admissions Open.
                </p>
                <Button onClick={() => scrollToSection("contact")} className="bg-white hover:bg-white/90 text-secondary font-bold rounded-full px-6 md:px-8 py-5 md:py-6 h-auto shadow-lg hover:-translate-y-1 transition-all">
                  ENQUIRE NOW
                </Button>
              </div>
              
              <div className="md:w-[40%] grid grid-cols-2 gap-3 z-10 w-full aspect-square md:aspect-auto">
                <img src="/kashvi.jpg" alt="Artwork 1" className="rounded-xl w-full h-full object-cover shadow-md" />
                <img src="/student9.jpeg" alt="Artwork 2" className="rounded-xl w-full h-full object-cover shadow-md translate-y-3" />
                <img src="/student11.jpeg" alt="Artwork 3" className="rounded-xl w-full h-full object-cover shadow-md -translate-y-3" />
                <img src="/painting.jpg" alt="Artwork 4" className="rounded-xl w-full h-full object-cover shadow-md" />
              </div>
              <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3"></div>
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* ==================== PREMIUM VIDEO COURSES SECTION ====================== */}
        {/* ========================================================================= */}
        
        <div id="video-courses">
          {/* CINEMATIC HERO SECTION */}
          <section className="relative pt-20 pb-28 bg-slate-900 text-white overflow-hidden">
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
                Video Courses
              </motion.h1>
              
              <motion.p initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.2 }} className="text-base md:text-lg text-white/80 mb-10 leading-relaxed font-medium">
                Step-by-step, high-quality video tutorials taught by Avdhut Narvekar. Bring the studio experience directly to your home.
              </motion.p>
            </div>
          </section>

          {/* WHY CHOOSE OUR VIDEOS */}
          <section className="py-12 bg-white border-b border-border/50 relative -mt-12 z-20 container mx-auto px-6 md:px-12 rounded-3xl shadow-xl">
            <div className="grid md:grid-cols-3 gap-6">
              <div className="flex flex-col items-center text-center p-4">
                <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center text-primary mb-4">
                  <Video className="w-7 h-7" />
                </div>
                <h4 className="text-base font-bold text-foreground mb-2">Crystal Clear Quality</h4>
                <p className="text-foreground/70 font-medium text-sm">High-Definition (4K) recording so students can see every brushstroke.</p>
              </div>
              
              <div className="flex flex-col items-center text-center p-4 border-y md:border-y-0 md:border-x border-border/50">
                <div className="w-14 h-14 rounded-full bg-secondary/10 flex items-center justify-center text-secondary mb-4">
                  <PlayCircle className="w-7 h-7" />
                </div>
                <h4 className="text-base font-bold text-foreground mb-2">Total Flexibility</h4>
                <p className="text-foreground/70 font-medium text-sm">Pause, rewind, and learn at your own pace from the comfort of your home.</p>
              </div>

              <div className="flex flex-col items-center text-center p-4">
                <div className="w-14 h-14 rounded-full bg-[#4285F4]/10 flex items-center justify-center text-[#4285F4] mb-4">
                  <Infinity className="w-7 h-7" />
                </div>
                <h4 className="text-base font-bold text-foreground mb-2">Lifetime Access</h4>
                <p className="text-foreground/70 font-medium text-sm">Buy once, keep forever. Revisit the deep lessons whenever you need a refresher.</p>
              </div>
            </div>
          </section>

          {/* DYNAMIC CATEGORIZED COURSE SECTIONS */}
          {videoCategories.map((cat, catIdx) => (
            <section key={catIdx} className={`py-12 md:py-16 ${catIdx % 2 === 0 ? "bg-muted/10" : "bg-white"}`}>
              <div className="container mx-auto px-6 md:px-12">
                <div className="flex items-center gap-3 mb-8">
                  <div className="h-6 w-2 bg-primary rounded-full"></div>
                  <h3 className="text-2xl md:text-3xl font-sans font-bold text-foreground tracking-tight">{cat.name}</h3>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {cat.courses.map((course, i) => {
                    const whatsappUrl = `https://wa.me/918779739115?text=Hi%2C%20I'm%20interested%20in%20purchasing%20the%20%22${encodeURIComponent(course.title)}%22%20video%20course%20for%20${course.price}.%20Please%20guide%20me%20on%20how%20to%20complete%20the%20payment%20and%20get%20access.`;
                    
                    return (
                      <div key={i} className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all border border-border flex flex-col group">
                        <div className="relative aspect-video overflow-hidden bg-muted">
                          <img src={course.img} alt={course.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                        </div>
                        <div className="p-5 flex flex-col flex-grow">
                          <h4 className="text-lg font-bold text-foreground leading-tight mb-2">{course.title}</h4>
                          <p className="text-foreground/70 text-xs md:text-sm mb-4 leading-relaxed flex-grow">{course.desc}</p>
                          
                          <ul className="space-y-2 mb-5 pt-3 border-t border-border/40">
                            {course.features.map((feat, fIdx) => (
                              <li key={fIdx} className="flex items-center gap-2 text-[11px] md:text-xs font-semibold text-foreground/80">
                                <CheckCircle2 className="w-3.5 h-3.5 text-primary shrink-0" /> {feat}
                              </li>
                            ))}
                          </ul>

                          <div className="flex items-center justify-between pt-4 border-t border-border/50 mt-auto">
                            <span className="text-lg font-black text-foreground">{course.price}</span>
                            <div className="flex gap-2">
                              {course.previewUrl && (
                                <a href={course.previewUrl} target="_blank" rel="noreferrer">
                                  <Button variant="outline" className="rounded-full px-3 h-8 text-[10px] md:text-xs border-primary text-primary hover:bg-primary/10 flex items-center gap-1 shadow-sm">
                                    <Youtube size={14} /> Preview
                                  </Button>
                                </a>
                              )}
                              <a href={whatsappUrl} target="_blank" rel="noreferrer">
                                <Button className="bg-[#25D366] hover:bg-[#20ba53] text-white font-bold rounded-full px-3 h-8 text-[10px] md:text-xs flex items-center gap-1 shadow-sm">
                                  <FaWhatsapp size={14} /> Enquire
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
          <section className="py-16 md:py-20 bg-slate-900 text-white border-t border-border/10">
            <div className="container mx-auto px-6 md:px-12 text-center max-w-4xl">
              <h3 className="text-3xl md:text-4xl font-sans font-bold mb-4">Try Before You Buy</h3>
              <p className="text-base md:text-lg text-white/80 font-medium mb-8">Not sure which course is right for you? Watch our free preview lessons on YouTube to experience the teaching quality.</p>
              <a href="https://youtube.com/playlist?list=PLwB_a_c_n1B65545B82" target="_blank" rel="noreferrer">
                <Button className="bg-red-600 hover:bg-red-700 text-white font-bold rounded-full px-6 py-5 shadow-lg hover:shadow-xl transition-all hover:-translate-y-1">
                  <Youtube className="w-5 h-5 mr-2" /> Watch Free Previews
                </Button>
              </a>
            </div>
          </section>

          {/* HOW TO GET ACCESS GUIDE */}
          <section className="py-16 md:py-20 bg-white border-y border-border">
            <div className="container mx-auto px-6 md:px-12 max-w-4xl">
              <h3 className="text-2xl md:text-3xl font-bold text-center text-foreground mb-10">How To Purchase Your Course</h3>
              <div className="grid md:grid-cols-3 gap-6 relative">
                <div className="flex flex-col items-center text-center p-4">
                  <div className="w-10 h-10 rounded-full bg-primary text-white font-bold flex items-center justify-center text-base mb-3 shadow-md">1</div>
                  <h5 className="font-bold text-base mb-2">Click Enquire</h5>
                  <p className="text-xs md:text-sm text-foreground/70 font-medium">Click the WhatsApp button on your chosen course to connect with our academy instantly.</p>
                </div>
                <div className="flex flex-col items-center text-center p-4">
                  <div className="w-10 h-10 rounded-full bg-primary text-white font-bold flex items-center justify-center text-base mb-3 shadow-md">2</div>
                  <h5 className="font-bold text-base mb-2">Pay via UPI / GPay</h5>
                  <p className="text-xs md:text-sm text-foreground/70 font-medium">We will share our official UPI handle. Complete the transaction securely and share a screenshot.</p>
                </div>
                <div className="flex flex-col items-center text-center p-4">
                  <div className="w-10 h-10 rounded-full bg-primary text-white font-bold flex items-center justify-center text-base mb-3 shadow-md">3</div>
                  <h5 className="font-bold text-base mb-2">Instant Access</h5>
                  <p className="text-xs md:text-sm text-foreground/70 font-medium">Our team will instantly share your personalized, permanent stream links straight to your chat!</p>
                </div>
              </div>
            </div>
          </section>
        </div>

        {/* WORKSHOPS CAROUSEL SECTION */}
        <section id="workshops" className="py-12 md:py-20 bg-muted/20">
          <div className="container mx-auto px-6 md:px-12">
            <div className="text-center max-w-3xl mx-auto mb-10">
              <div className="inline-block px-4 py-1 bg-primary/10 text-primary font-semibold rounded-full text-sm mb-3">Creative Learning</div>
              <h3 className="text-3xl md:text-4xl font-sans font-bold text-foreground mb-4">Special Workshops</h3>
              <p className="text-base text-foreground/70 font-medium">Explore dedicated sessions focusing on specific traditional and modern art forms. Swipe to see more!</p>
            </div>
            
            <div className="flex overflow-x-auto gap-6 snap-x hide-scrollbar pb-6 px-2">
              {workshopImages.map((img, i) => (
                <div key={i} className="flex flex-col gap-4 group min-w-[260px] md:min-w-[300px] snap-center">
                  <div className="relative rounded-2xl overflow-hidden aspect-[4/3] shadow-sm group-hover:shadow-xl transition-all cursor-pointer">
                    <img src={img.src} alt={img.alt} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  </div>
                  <h4 className="font-bold text-foreground text-center text-base md:text-lg">{img.alt}</h4>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* GOOGLE REVIEWS SECTION */}
        <section className="py-12 md:py-20 bg-white border-y border-border">
          <div className="container mx-auto px-6 md:px-12">
            <h3 className="text-2xl md:text-3xl font-bold text-center mb-10">Google Reviews</h3>
            <div className="grid lg:grid-cols-[1fr_2fr] gap-10 items-start">
              <div className="bg-white rounded-2xl p-6 md:p-8 border border-border shadow-sm flex flex-col items-center justify-center text-center">
                <h4 className="font-bold text-lg md:text-xl mb-3">Subodh Narvekar's Art Academy</h4>
                <div className="text-5xl md:text-6xl font-bold text-[#F59E0B] mb-2 tracking-tight">4.9</div>
                <div className="flex gap-1 text-[#F59E0B] mb-2">
                  {[1, 2, 3, 4, 5].map(star => <Star key={star} className="w-5 h-5 md:w-6 md:h-6 fill-current" />)}
                </div>
                <p className="text-foreground/60 text-xs md:text-sm font-medium mb-5">Based on actual student reviews</p>
                <div className="flex items-center gap-2 mb-6">
                  <span className="text-xs md:text-sm font-medium">Powered by</span>
                  <span className="font-bold text-lg md:text-xl">
                    <span className="text-[#4285F4]">G</span><span className="text-[#EA4335]">o</span><span className="text-[#FBBC05]">o</span><span className="text-[#4285F4]">g</span><span className="text-[#34A853]">l</span><span className="text-[#EA4335]">e</span>
                  </span>
                </div>
                <a href="https://share.google/RPrzTLlXcciCwdZEj" target="_blank" rel="noreferrer">
                  <Button variant="outline" className="rounded-full font-bold border-2 hover:bg-muted cursor-pointer text-xs md:text-sm px-4 md:px-6">Read & Review on Google</Button>
                </a>
              </div>
              
              <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
                {[
                  { name: "Anita S.", text: "Best art academy in Mumbai! My daughter's skills improved drastically. The teachers are very supportive and encouraging." },
                  { name: "Raj M.", text: "Excellent faculty and well-structured course. Highly recommend for exam preparation. Great environment to learn!" },
                  { name: "Divya K.", text: "Amazing experience! The ATTC course was very well-organized. Got certified on first attempt. Thank you SNAA!" }
                ].map((review, i) => (
                  <div key={i} className="bg-muted/10 p-5 rounded-2xl border border-border flex flex-col hover:shadow-md transition-shadow">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-2 md:gap-3">
                        <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-foreground text-white flex items-center justify-center font-bold text-sm">{review.name[0]}</div>
                        <div>
                          <div className="font-bold text-xs md:text-sm">{review.name}</div>
                          <div className="text-[10px] md:text-xs text-foreground/50">Verified Student</div>
                        </div>
                      </div>
                      <div className="w-5 h-5 flex items-center justify-center"><span className="text-[#4285F4] font-bold text-lg md:text-xl leading-none">G</span></div>
                    </div>
                    <div className="flex gap-1 text-[#F59E0B] mb-2">{[1, 2, 3, 4, 5].map(star => <Star key={star} className="w-3 h-3 fill-current" />)}</div>
                    <p className="text-xs md:text-sm font-medium text-foreground/80 leading-relaxed line-clamp-4">{review.text}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* GALLERY SECTION */}
        <section id="gallery" className="py-12 md:py-20 bg-white">
          <div className="container mx-auto px-6 md:px-12">
            <div className="text-center mb-12">
              <div className="inline-block px-4 py-1 bg-primary/10 text-primary font-semibold rounded-full text-sm mb-3">Portfolio</div>
              <h3 className="text-3xl md:text-4xl font-sans font-bold text-foreground">Student Gallery</h3>
            </div>
            
            <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6">
              {galleryImages.slice(0, visibleGalleryCount).map((img, i) => (
                <div key={i} className="relative rounded-2xl overflow-hidden group break-inside-avoid shadow-sm hover:shadow-xl transition-all cursor-pointer">
                  <img src={img.src} alt={img.alt} className="w-full h-auto object-cover" />
                  <div className="absolute inset-0 bg-primary/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center p-4 text-center">
                    <span className="text-white font-bold text-sm md:text-lg mb-2">View Artwork</span>
                  </div>
                </div>
              ))}
            </div>

            {visibleGalleryCount < galleryImages.length && (
              <div className="flex justify-center mt-10">
                <Button 
                  onClick={() => setVisibleGalleryCount(prev => prev + 9)} 
                  variant="outline" 
                  className="rounded-full px-8 py-6 font-bold border-2 text-primary border-primary hover:bg-primary/5 transition-all cursor-pointer shadow-sm hover:shadow-md"
                >
                  Load More Images
                </Button>
              </div>
            )}
          </div>
        </section>

        {/* FAQ SECTION */}
        <section className="py-12 md:py-20 bg-muted/20">
          <div className="container mx-auto px-6 md:px-12 grid lg:grid-cols-[1fr_2fr] gap-10 items-start">
            <div className="text-center lg:text-left flex flex-col items-center lg:items-start">
              <h3 className="text-secondary text-2xl md:text-4xl font-bold mb-3 leading-tight tracking-tight">Curious about us?</h3>
              <p className="text-foreground/70 font-medium text-sm md:text-base mb-6 leading-relaxed max-w-lg lg:max-w-none">Find out more about why SNAA is the right place for you.</p>
              <Button onClick={() => scrollToSection("contact")} className="bg-secondary hover:bg-secondary/90 text-white font-bold rounded-full px-6 py-5 h-auto text-sm shadow-lg hover:-translate-y-1 transition-all">BOOK A CLASS</Button>
            </div>
            <div>
              <Accordion type="single" collapsible className="w-full space-y-3 md:space-y-4">
                {[
                  { q: "Where are your studios located?", a: "We have two branches! Our Dhanukarwadi Branch is at Shop 4, Pushp Meet, Kandivali West. Our Mahavir Nagar Branch is at Shop no 8, Sai Sumit, near Pancholia School, Kandivali West." },
                  { q: "What courses do you offer?", a: "We offer Kids & Teens art classes, Grade exam preparation (Elementary & Intermediate), Teens & Adults hobby classes, Video Lecture based sessions, Art Teacher's Training Course (ATTC), Fine Arts, and entrance exam preparation for NIFT, NID, NATA, and MH AAC CET." },
                  { q: "Who are the instructors?", a: "Classes are conducted by our Founder Subodh Narvekar, alongside Senior Instructors Avdhut Narvekar and Hemangi Narvekar — all trained professional artists." },
                  { q: "What are your timings?", a: "Tuesday to Saturday: 4:00 PM – 8:00 PM. Sunday special batches are available by appointment. Video Lectures provide flexible access anytime." },
                  { q: "Are government certificates provided?", a: "Yes! Our ATTC and Fine Arts courses are government-certified through SDVTII and affiliated with the Maharashtra Business Training Board (MBTB) and Skill India." }
                ].map((faq, i) => (
                  <AccordionItem key={i} value={`item-${i}`} className="bg-white px-5 md:px-6 rounded-xl border border-border shadow-sm data-[state=open]:shadow-md transition-all">
                    <AccordionTrigger className="font-semibold text-foreground text-sm md:text-base hover:no-underline py-3 md:py-4 text-left">{faq.q}</AccordionTrigger>
                    <AccordionContent className="text-foreground/70 font-medium text-xs md:text-sm pb-5 md:pb-6 leading-relaxed">{faq.a}</AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          </div>
        </section>

        {/* CONTACT FORM SECTION */}
        <section id="contact" className="py-12 md:py-20 bg-muted/30">
          <div className="container mx-auto px-6 md:px-12">
            <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">
              <div className="grid lg:grid-cols-2">
                <div className="p-8 md:p-14 bg-primary text-white flex flex-col justify-between">
                  <div>
                    <h3 className="text-2xl md:text-3xl font-bold mb-3 tracking-tight">Get in Touch</h3>
                    <p className="text-white/80 font-medium mb-8 max-w-lg text-sm md:text-base">Have questions about our courses or admissions? Drop us a message and we'll get back to you.</p>
                    
                    <div className="space-y-6 md:space-y-8">
                      <div className="flex items-start gap-4">
                        <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center shrink-0"><MapPin className="w-5 h-5 text-white" /></div>
                        <div>
                          <h5 className="font-semibold text-base md:text-lg mb-1">Dhanukarwadi Branch</h5>
                          <p className="text-white/80 leading-relaxed mb-4 text-sm">Shop 4, Pushp Meet, Dhanukarwadi,<br />Kandivali West, Mumbai – 400067</p>
                          <h5 className="font-semibold text-base md:text-lg mb-1">Mahavir Nagar Branch</h5>
                          <p className="text-white/80 leading-relaxed text-sm">Shop no 8, Sai Sumit, Mahavir Nagar, near Pancholia School,<br />Kandivali West, Mumbai</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center shrink-0"><Phone className="w-5 h-5 text-white" /></div>
                        <div>
                          <h5 className="font-semibold text-base md:text-lg mb-1">Call Us</h5>
                          <p className="text-white/80 leading-relaxed text-sm">+91 8779739115<br/>+91 9326345790</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="p-8 md:p-14">
                  <h4 className="text-xl md:text-2xl font-bold text-foreground mb-6">Send an Inquiry</h4>
                  <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                        <FormField control={form.control} name="name" render={({ field }) => (
                          <FormItem><FormLabel className="font-semibold text-sm">Full Name</FormLabel><FormControl><Input placeholder="John Doe" {...field} className="rounded-lg bg-muted/50 border-transparent focus-visible:bg-white text-sm" /></FormControl><FormMessage /></FormItem>
                        )} />
                        <FormField control={form.control} name="phone" render={({ field }) => (
                          <FormItem><FormLabel className="font-semibold text-sm">Phone Number</FormLabel><FormControl><Input placeholder="+91 XXXXX XXXXX" {...field} className="rounded-lg bg-muted/50 border-transparent focus-visible:bg-white text-sm" /></FormControl><FormMessage /></FormItem>
                        )} />
                      </div>
                      <FormField control={form.control} name="email" render={({ field }) => (
                        <FormItem><FormLabel className="font-semibold text-sm">Email Address</FormLabel><FormControl><Input placeholder="john@example.com" {...field} className="rounded-lg bg-muted/50 border-transparent focus-visible:bg-white text-sm" /></FormControl><FormMessage /></FormItem>
                      )} />
                      <FormField control={form.control} name="courseInterest" render={({ field }) => (
                        <FormItem>
                          <FormLabel className="font-semibold text-sm">Interested In</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl><SelectTrigger className="rounded-lg bg-muted/50 border-transparent focus-visible:bg-white text-sm"><SelectValue placeholder="Select a course category" /></SelectTrigger></FormControl>
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
                        <FormItem><FormLabel className="font-semibold text-sm">Message</FormLabel><FormControl><Textarea placeholder="Tell us about your art experience or specific requirements..." className="min-h-[100px] rounded-lg bg-muted/50 border-transparent focus-visible:bg-white leading-relaxed text-sm" {...field} /></FormControl><FormMessage /></FormItem>
                      )} />
                      <Button type="submit" className="w-full rounded-full h-12 text-sm md:text-base font-semibold bg-primary hover:bg-primary/90">Send Inquiry</Button>
                    </form>
                  </Form>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* FOOTER SECTION */}
      <footer className="bg-foreground text-white pt-16 md:pt-20 pb-10">
        <div className="container mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-12 mb-12 md:mb-16">
            <div className="md:col-span-4">
              <div className="flex items-center gap-3 mb-5">
                <img src="/logo.jpg" alt="SNAA Logo" className="w-8 h-8 md:w-10 md:h-10 rounded-full object-cover bg-white p-0.5" />
                <span className="font-bold text-base md:text-lg tracking-tight">Subodh Narvekar's Art Academy</span>
              </div>
              <p className="text-white/60 font-medium mb-6 leading-relaxed max-w-sm text-sm md:text-base">
                Nurturing creativity since 1984. Offering comprehensive art education and government certified courses in Mumbai and Video Lectures.
              </p>
              <div className="flex items-center gap-3 md:gap-4">
                <a href="https://www.instagram.com/snaa.subodhnarvekarsartacademy?igsh=MWNkMXoxamd0NTBqcA==" target="_blank" rel="noreferrer" className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-secondary flex items-center justify-center hover:bg-secondary/80 transition-colors"><Instagram className="w-4 h-4 md:w-5 md:h-5" /></a>
                <a href="https://www.facebook.com/reel/1663614361350893/" target="_blank" rel="noreferrer" className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-secondary flex items-center justify-center hover:bg-secondary/80 transition-colors"><Facebook className="w-4 h-4 md:w-5 md:h-5" /></a>
                <a href="https://youtube.com/@avdhutnarvekarsnaa1850?si=U1Br-bhEh0GfYp2O" target="_blank" rel="noreferrer" className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-secondary flex items-center justify-center hover:bg-secondary/80 transition-colors"><Youtube className="w-4 h-4 md:w-5 md:h-5" /></a>
              </div>
            </div>

            <div className="md:col-span-4 flex flex-col sm:flex-row gap-10 sm:justify-between">
              <div>
                <h4 className="font-bold text-base md:text-lg mb-4 md:mb-6">Quick Links</h4>
                <ul className="space-y-3 md:space-y-4">
                  <li><button onClick={() => scrollToSection("about")} className="text-white/60 hover:text-white transition-colors font-medium text-sm md:text-base">About</button></li>
                  <li><button onClick={() => scrollToSection("faculty")} className="text-white/60 hover:text-white transition-colors font-medium text-sm md:text-base">Faculty</button></li>
                  <li><button onClick={() => scrollToSection("courses")} className="text-white/60 hover:text-white transition-colors font-medium text-sm md:text-base">Courses</button></li>
                  <li><button onClick={() => scrollToSection("gallery")} className="text-white/60 hover:text-white transition-colors font-medium text-sm md:text-base">Gallery</button></li>
                  <li><button onClick={() => scrollToSection("contact")} className="text-white/60 hover:text-white transition-colors font-medium text-sm md:text-base">Contact</button></li>
                </ul>
              </div>
              <div>
                <h4 className="font-bold text-base md:text-lg mb-4 md:mb-6">Popular Courses</h4>
                <ul className="space-y-3 md:space-y-4">
                  <li><button onClick={() => scrollToSection("courses")} className="text-white/60 hover:text-white transition-colors font-medium text-sm md:text-base">Child Art</button></li>
                  <li><button onClick={() => scrollToSection("courses")} className="text-white/60 hover:text-white transition-colors font-medium text-sm md:text-base">Exam Prep</button></li>
                  <li><button onClick={() => scrollToSection("courses")} className="text-white/60 hover:text-white transition-colors font-medium text-sm md:text-base">ATTC Certification</button></li>
                  <li><button onClick={() => scrollToSection("video-courses")} className="text-white/60 hover:text-white transition-colors font-medium text-sm md:text-base">Video Lectures</button></li>
                </ul>
              </div>
            </div>

            <div className="md:col-span-4">
              <h4 className="font-bold text-base md:text-lg mb-4 md:mb-6">Contact Us</h4>
              <ul className="space-y-4 md:space-y-6">
                <li className="flex items-start gap-3 text-white/60 font-medium leading-relaxed text-sm md:text-base">
                  <MapPin className="w-5 h-5 text-secondary shrink-0 mt-1" />
                  <div>
                    <span className="block text-white mb-1">Our Studios:</span>
                    Branch 1: Shop 4, Pushp Meet, Dhanukarwadi, Kandivali West<br/><br/>
                    Branch 2: Shop 8, Sai Sumit, Mahavir Nagar, Kandivali West
                  </div>
                </li>
                <li className="flex items-start gap-3 text-white/60 font-medium leading-relaxed text-sm md:text-base">
                  <Clock className="w-5 h-5 text-secondary shrink-0 mt-1" />
                  <div>
                    <span className="block text-white mb-1">Timings:</span>
                    Tue–Sat: 4:00 PM – 8:00 PM<br/>Sunday: Special batches by appointment
                  </div>
                </li>
                <li className="flex items-center gap-3 text-white/60 font-medium leading-relaxed text-sm md:text-base">
                  <Phone className="w-5 h-5 text-secondary shrink-0" />
                  <span>+91 8779739115, +91 9326345790</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4 text-xs md:text-sm text-white/40 font-medium">
            <p>© {new Date().getFullYear()} Subodh Narvekar's Art Academy. All rights reserved.</p>
            <div className="flex gap-4 md:gap-6">
              <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
            </div>
          </div>
        </div>
      </footer>

      {/* Floating Buttons: Back To Top & WhatsApp */}
      <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-3 items-end">
        {showBackToTop && (
          <motion.button
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="w-12 h-12 rounded-full bg-foreground text-white flex items-center justify-center shadow-lg transition-colors border border-border"
          >
            <ChevronUp size={24} />
          </motion.button>
        )}
        
        <motion.a
          href="https://wa.me/918779739115?text=Hi%2C%20I'd%20like%20to%20know%20more%20about%20your%20classes"
          target="_blank"
          rel="noreferrer"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 1.5, type: "spring", stiffness: 200 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          className="group flex items-center gap-3"
        >
          <span className="hidden md:group-hover:flex items-center bg-white text-gray-800 text-sm font-semibold px-4 py-2 rounded-full shadow-lg border border-gray-100 whitespace-nowrap transition-all">
            Chat on WhatsApp
          </span>
          <div className="w-14 h-14 rounded-full flex items-center justify-center shadow-xl text-white relative" style={{ backgroundColor: "#25D366" }}>
            <span className="absolute inset-0 rounded-full animate-ping opacity-30" style={{ backgroundColor: "#25D366" }}></span>
            <FaWhatsapp size={28} />
          </div>
        </motion.a>
      </div>

    </div>
  );
}
