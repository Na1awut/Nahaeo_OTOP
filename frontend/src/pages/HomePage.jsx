import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import InteractiveHero from '../components/InteractiveHero';
import RotateDeviceOverlay from '../components/RotateDeviceOverlay';

export default function HomePage() {
    const navigate = useNavigate();
    const [isVerified, setIsVerified] = useState(null); // null = checking

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

    // Show loading while checking
    if (isVerified === null || isVerified === false) {
        return (
            <div className="fixed inset-0 bg-gradient-to-br from-[#FFF9F5] to-[#F5F0E8] flex items-center justify-center">
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
        <>
            <RotateDeviceOverlay />
            <InteractiveHero />
        </>
    );
}
