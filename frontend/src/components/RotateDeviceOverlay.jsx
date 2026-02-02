import { useState, useEffect } from 'react';

export default function RotateDeviceOverlay() {
    const [showOverlay, setShowOverlay] = useState(false);

    useEffect(() => {
        const checkOrientation = () => {
            // Check if mobile device AND in portrait mode
            const isMobile = window.innerWidth <= 768;
            const isPortrait = window.innerHeight > window.innerWidth;
            setShowOverlay(isMobile && isPortrait);
        };

        checkOrientation();
        window.addEventListener('resize', checkOrientation);
        window.addEventListener('orientationchange', checkOrientation);

        return () => {
            window.removeEventListener('resize', checkOrientation);
            window.removeEventListener('orientationchange', checkOrientation);
        };
    }, []);

    if (!showOverlay) return null;

    return (
        <div className="fixed inset-0 z-[200] bg-gradient-to-br from-[#FFF5F5] to-[#F0FFF0] flex flex-col items-center justify-center p-8">
            {/* Rotate Animation */}
            <div className="relative w-24 h-40 mb-8">
                {/* Phone Icon */}
                <div className="absolute inset-0 border-4 border-gray-800 rounded-2xl bg-white animate-rotate-phone">
                    <div className="absolute top-2 left-1/2 -translate-x-1/2 w-8 h-1 bg-gray-300 rounded-full" />
                    <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-6 h-6 border-2 border-gray-300 rounded-full" />
                </div>
            </div>

            {/* Text */}
            <h2 className="font-display text-2xl font-bold text-gray-800 mb-3 text-center">
                กรุณาหมุนหน้าจอ 📱
            </h2>
            <p className="text-gray-600 text-center max-w-xs">
                เพื่อประสบการณ์การใช้งานที่ดีที่สุด กรุณาหมุนอุปกรณ์เป็นแนวนอน
            </p>

            {/* Arrow Indicator */}
            <div className="mt-8 flex items-center gap-2 text-[#FFB6C1]">
                <span className="material-symbols-outlined text-3xl animate-bounce">screen_rotation</span>
            </div>

            {/* Custom Animation */}
            <style>{`
                @keyframes rotate-phone {
                    0%, 30% { transform: rotate(0deg); }
                    50%, 80% { transform: rotate(90deg); }
                    100% { transform: rotate(0deg); }
                }
                .animate-rotate-phone {
                    animation: rotate-phone 3s ease-in-out infinite;
                    transform-origin: center center;
                }
            `}</style>
        </div>
    );
}
