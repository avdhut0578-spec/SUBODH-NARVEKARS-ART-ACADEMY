import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Menu, X, Phone, Instagram, Youtube, Facebook,
  MapPin, Clock, Video, PlayCircle, Infinity, CheckCircle2
} from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";
import { Button } from "@/components/ui/button";

export default function VideoCourses() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { label: "Home", href: "/" },
    { label: "About", href: "/#about" },
    { label: "Faculty", href: "/#faculty" },
    { label: "Courses", href: "/#courses" },
    { label: "Gallery", href: "/#gallery" },
  ];

  // Categorized course data with your specific .jpeg assets and YouTube preview links
  const categories = [
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
        { title: "Watercolor Portraiture", img: "/vwaterclourportrait.jpeg", tag: "Elite Painting", desc: "Paint translucent skin tones, realistic bone shadow layers, and modern lighting accents.", price: "₹2,199", features: ["Masterclass Modules", "Skin Layer Recipes", "Lifetime Access"], previewUrl: "https://youtu.be/Y6kVTb75g0k?si=lR-jxj0Usjxsk7Ca" },
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
    <div className="min-h-screen bg-background text-foreground font-sans">
      
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
          <a href="/" className="flex items-center gap-3 group">
            <img src="/logo.jpg" alt="SNAA Logo" className="w-12 h-12 rounded-full object-cover shadow-md group-hover:scale-105 transition-transform" />
            <div className="flex flex-col">
              <span className="font-sans font-bold text-lg leading-tight tracking-tight text-foreground">Subodh Narvekar's</span>
              <span className="text-xs uppercase tracking-wider text-primary font-semibold">Art Academy</span>
            </div>
          </a>

          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link, i) => (
              <a key={i} href={link.href} className="text-sm font-medium hover:text-primary transition-colors tracking-wide">
                {link.label}
              </a>
            ))}
            <a href="/#contact">
              <Button className="rounded-full px-6 font-semibold bg-primary hover:bg-primary/90 text-primary-foreground">
                BOOK A CLASS
              </Button>
            </a>
          </nav>

          <button className="md:hidden text-foreground p-2" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {mobileMenuOpen && (
          <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="absolute top-full left-0 right-0 bg-white shadow-lg p-6 flex flex-col gap-4 md:hidden border-t border-border">
            {navLinks.map((link, i) => (
              <a key={i} href={link.href} onClick={() => setMobileMenuOpen(false)} className="text-left text-lg font-medium hover:text-primary transition-colors py-2 border-b border-border/50">
                {link.label}
              </a>
            ))}
          </motion.div>
        )}
      </header>

      <main>
        {/* 3. PREMIUM HERO SECTION */}
        <section className="relative pt-24 pb-32 bg-slate-900 text-white overflow-hidden">
          <div className="absolute inset-0 z-0 opacity-20">
            <img src="/work7.jpg" alt="Background Texture" className="w-full h-full object-cover blur-sm" />
            <div className="absolute inset-0 bg-slate-900/80"></div>
          </div>
          
          <div className="container mx-auto px-6 md:px-12 relative z-10 text-center max-w-4xl">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
              <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-white/10 text-white text-xs font-bold uppercase tracking-wider mb-6 rounded-full border border-white/20">
                <Video className="w-4 h-4" /> Premium Online Learning
              </div>
            </motion.div>
            
            <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.1 }} className="text-4xl md:text-6xl lg:text-7xl font-sans font-bold leading-[1.1] mb-6">
              Master Art Anytime,<br/>Anywhere.
            </motion.h1>
            
            <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }} className="text-lg md:text-xl text-white/80 mb-10 leading-relaxed font-medium">
              Step-by-step, high-quality video tutorials taught by Subodh Narvekar and our senior faculty. Bring the studio experience directly to your home.
            </motion.p>
          </div>
        </section>

        {/* 4. WHY CHOOSE OUR VIDEOS */}
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

        {/* 5. DYNAMIC CATEGORIZED COURSE SECTIONS */}
        {categories.map((cat, catIdx) => (
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

        {/* 6. HOW TO GET ACCESS GUIDE */}
        <section className="py-20 bg-white border-t border-border">
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

      </main>

      {/* 7. FOOTER SECTION */}
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
                  <li><a href="/#about" className="text-white/60 hover:text-white transition-colors font-medium">About</a></li>
                  <li><a href="/#faculty" className="text-white/60 hover:text-white transition-colors font-medium">Faculty</a></li>
                  <li><a href="/#courses" className="text-white/60 hover:text-white transition-colors font-medium">Courses</a></li>
                  <li><a href="/#gallery" className="text-white/60 hover:text-white transition-colors font-medium">Gallery</a></li>
                  <li><a href="/#contact" className="text-white/60 hover:text-white transition-colors font-medium">Contact</a></li>
                </ul>
              </div>
              <div>
                <h4 className="font-bold text-lg mb-6">Popular Courses</h4>
                <ul className="space-y-4">
                  <li><a href="/#courses" className="text-white/60 hover:text-white transition-colors font-medium">Child Art</a></li>
                  <li><a href="/#courses" className="text-white/60 hover:text-white transition-colors font-medium">Exam Prep</a></li>
                  <li><a href="/#courses" className="text-white/60 hover:text-white transition-colors font-medium">ATTC Certification</a></li>
                  <li><a href="/video-courses" className="text-white/60 hover:text-white transition-colors font-medium">Video Lectures</a></li>
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
