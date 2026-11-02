import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import AIHighlight from "@/components/Landing/AIHighlight";
import FeaturedCourses from "@/components/Landing/FeaturedCourses";
import FinalCTA from "@/components/Landing/FinalCTA";
import HeroSection from "@/components/Landing/HeroSection";
import HowItWorks from "@/components/Landing/HowItWorks";
import MentorCallout from "@/components/Landing/MentorCallout";
import TrustStrip from "@/components/Landing/TrustStrip";
import WhyEjazTech from "@/components/Landing/WhyEjazTech";



const LandingPage = () => {
  return (
    <>
    <Navbar />
    <main className="min-h-screen bg-background">
    <HeroSection />
    <TrustStrip />
    <FeaturedCourses />
    <WhyEjazTech />
    <MentorCallout />
    <AIHighlight />
    <HowItWorks />
    <FinalCTA />
    <Footer />
    </main>
    </>
  )
}

export default LandingPage;