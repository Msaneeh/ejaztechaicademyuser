import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import AIHighlight from "@/Section/AIHighlight";
import FeaturedCourses from "@/Section/FeaturedCourses";
import FinalCTA from "@/Section/FinalCTA";
import HeroSection from "@/Section/HeroSection";
import HowItWorks from "@/Section/HowItWorks";
import MentorCallout from "@/Section/MentorCallout";
import TrustStrip from "@/Section/TrustStrip";
import WhyEjazTech from "@/Section/WhyEjazTech";



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