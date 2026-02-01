import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import HeroSection from '../components/HeroSection';
import LandmarkSection from '../components/LandmarkSection';
import ProductsSection from '../components/ProductsSection';
import Footer from '../components/Footer';

export default function HomePage() {
    const navigate = useNavigate();
    const [isVerified, setIsVerified] = useState(null); // null = checking, true/false = result

    useEffect(() => {
        // Check if user has been verified
        const verified = localStorage.getItem('nahaeo_verified');
        const verifiedTime = localStorage.getItem('nahaeo_verified_time');

        if (verified === 'true' && verifiedTime) {
            // Check if verification is within 24 hours
            const timeDiff = Date.now() - parseInt(verifiedTime);
            const twentyFourHours = 24 * 60 * 60 * 1000;

            if (timeDiff < twentyFourHours) {
                setIsVerified(true);
                return;
            }
        }

        // Not verified or expired, redirect to verify page
        setIsVerified(false);
        navigate('/verify', { replace: true });
    }, [navigate]);

    // Show nothing while checking or redirecting
    if (!isVerified) {
        return (
            <div className="min-h-screen bg-[#FAFAFA] flex items-center justify-center">
                <div className="text-center">
                    <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br from-[#FFD1DC] to-[#FFB6C1] flex items-center justify-center animate-pulse">
                        <span className="material-symbols-outlined text-2xl text-white">lock</span>
                    </div>
                    <p className="text-[#6B6B6B]">กำลังตรวจสอบสิทธิ์...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="relative overflow-x-hidden selection:bg-[#FFD1DC] selection:text-pink-900">
            {/* Background Decorative Elements */}
            <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden bg-pattern">
                <svg
                    className="absolute -top-32 -left-32 w-[700px] h-[700px] text-[#FFD1DC] opacity-40 animate-float-slow"
                    viewBox="0 0 200 200"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        d="M45.7,-76.3C58.9,-69.3,69.1,-55.5,76.3,-41.2C83.5,-26.9,87.6,-12.2,85.6,1.8C83.7,15.8,75.6,29.1,65.8,40.4C55.9,51.7,44.2,61,31.4,68.6C18.6,76.2,4.6,82.1,-8.2,80.3C-21,78.5,-32.6,69,-44.7,60.2C-56.8,51.4,-69.3,43.3,-76.1,31.8C-82.9,20.3,-83.9,5.4,-79.8,-7.8C-75.7,-21,-66.5,-32.5,-56.1,-41.5C-45.7,-50.5,-34.1,-57,-22.3,-65.1C-10.5,-73.2,1.5,-82.9,13.6,-82.3C25.7,-81.7,32.5,-70.8,45.7,-76.3Z"
                        fill="currentColor"
                        transform="translate(100 100)"
                    />
                </svg>
                <svg
                    className="absolute -bottom-48 -right-32 w-[900px] h-[900px] text-[#98FF98] opacity-30"
                    viewBox="0 0 200 200"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        d="M41.4,-73.3C52.7,-65.1,60.3,-50.7,67.6,-36.5C74.9,-22.3,81.9,-8.3,80.3,4.9C78.7,18.1,68.5,30.5,58.3,41.9C48.1,53.3,37.9,63.7,25.8,69.5C13.7,75.3,-0.3,76.5,-13.6,74.1C-26.9,71.7,-39.5,65.7,-50.3,56.7C-61.1,47.7,-70.1,35.7,-76.1,21.8C-82.1,7.9,-85.1,-7.9,-80.6,-21.8C-76.1,-35.7,-64.1,-47.7,-50.8,-55.1C-37.5,-62.5,-22.9,-65.3,-8.9,-66.6C5.1,-67.9,10.2,-67.7,16.4,-70.2C22.6,-72.7,30,-81.5,41.4,-73.3Z"
                        fill="currentColor"
                        transform="translate(100 100)"
                    />
                </svg>
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-radial from-[#FFE5B4]/10 to-transparent rounded-full blur-3xl"></div>
            </div>

            <Navbar />
            <HeroSection />
            <LandmarkSection />
            <ProductsSection />
            <Footer />
        </div>
    );
}

