import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';

// Hotspot data for clickable areas
const hotspots = [
    {
        id: 'temple',
        name: 'วัดศรีโพธิ์ชัย',
        icon: '🏛️',
        position: { top: '15%', left: '25%' },
        size: { width: '25%', height: '40%' },
        color: 'from-[#FFD1DC] to-[#FFB6C1]',
        content: {
            title: 'วัดศรีโพธิ์ชัย นาแห้ว',
            description: 'ศูนย์รวมจิตใจของชาวนาแห้ว เป็นสถานที่จัดงานประเพณีต้นดอกไม้ที่สืบทอดมากว่า 400 ปี วัดแห่งนี้ตั้งอยู่ท่ามกลางขุนเขาและธรรมชาติอันงดงาม',
            image: null
        }
    },
    {
        id: 'procession',
        name: 'ประเพณีต้นดอกไม้',
        icon: '🎊',
        position: { top: '45%', left: '15%' },
        size: { width: '35%', height: '35%' },
        color: 'from-[#FFE5B4] to-[#FFDAB9]',
        content: {
            title: 'ประเพณีต้นดอกไม้',
            description: 'ประเพณีโบราณกว่า 400 ปี ที่ชาวนาแห้วร่วมกันสร้างต้นดอกไม้ขนาดใหญ่เพื่อถวายแด่พระธาตุ เป็นการแสดงความศรัทธาและความสามัคคีของชุมชน',
            image: null
        }
    },
    {
        id: 'macadamia',
        name: 'แมคคาเดเมีย',
        icon: '🥜',
        position: { top: '5%', left: '2%' },
        size: { width: '15%', height: '25%' },
        color: 'from-[#98FF98] to-[#7AE47A]',
        content: {
            title: 'แมคคาเดเมียนาแห้ว',
            description: 'วัตถุดิบหลักในลิปบาล์มของเรา ปลูกโดยเกษตรกรท้องถิ่นในอำเภอนาแห้ว น้ำมันแมคคาเดเมียอุดมด้วยกรดไขมันพาลมิโทเอลิก ซึมซาบเข้าผิวได้ดีเยี่ยม ช่วยกักเก็บความชุ่มชื้นได้ถึง 95%',
            image: null
        }
    },
    {
        id: 'product',
        name: 'ผลิตภัณฑ์',
        icon: '💄',
        position: { top: '25%', left: '60%' },
        size: { width: '25%', height: '35%' },
        color: 'from-[#E6E6FA] to-[#DDA0DD]',
        content: {
            title: 'Na Haeo Glow Lip Balm',
            description: 'ลิปบาล์มออร์แกนิกจากน้ำมันแมคคาเดเมียและไขผึ้งแท้ สูตรดั้งเดิมจากงานวิจัย กักเก็บความชุ่มชื้นได้ถึง 95% ปลอดสารเคมี 100%',
            image: '/images/product-box.png',
            link: '/#collection'
        }
    }
];

export default function InteractiveHero() {
    const [activeHotspot, setActiveHotspot] = useState(null);
    const [hoveredHotspot, setHoveredHotspot] = useState(null);
    const [scrollProgress, setScrollProgress] = useState(0);
    const [isVisible, setIsVisible] = useState(true);
    const heroRef = useRef(null);

    useEffect(() => {
        const handleScroll = () => {
            if (!heroRef.current) return;

            const scrollY = window.scrollY;
            const heroHeight = window.innerHeight;
            const progress = Math.min(scrollY / (heroHeight * 0.5), 1);

            setScrollProgress(progress);
            setIsVisible(progress < 1);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const openModal = (hotspot) => {
        setActiveHotspot(hotspot);
    };

    const closeModal = () => {
        setActiveHotspot(null);
    };

    // Calculate transform based on scroll
    const heroStyle = {
        transform: `perspective(1000px) rotateX(${scrollProgress * 90}deg)`,
        transformOrigin: 'top center',
        opacity: 1 - scrollProgress,
        pointerEvents: isVisible ? 'auto' : 'none',
    };

    return (
        <>
            {/* Fullscreen Fixed Hero Overlay */}
            <div
                ref={heroRef}
                className="fixed inset-0 z-[90]"
                style={heroStyle}
            >
                {/* Fullscreen Image with Hotspots */}
                <div className="absolute inset-0">
                    <img
                        src="/images/nahaeo-illustration.png"
                        alt="นาแห้ว - The Essence of Altitude"
                        className="w-full h-full object-cover"
                    />

                    {/* Hotspot Overlays */}
                    {hotspots.map((hotspot) => (
                        <button
                            key={hotspot.id}
                            onClick={() => openModal(hotspot)}
                            onMouseEnter={() => setHoveredHotspot(hotspot.id)}
                            onMouseLeave={() => setHoveredHotspot(null)}
                            className="absolute cursor-pointer group transition-all duration-300"
                            style={{
                                top: hotspot.position.top,
                                left: hotspot.position.left,
                                width: hotspot.size.width,
                                height: hotspot.size.height,
                            }}
                        >
                            {/* Invisible clickable area */}
                            <div className="absolute inset-0 rounded-xl hover:bg-white/20 transition-colors duration-300" />

                            {/* Label - positioned at center */}
                            <div className={`
                                absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2
                                px-3 py-1.5 rounded-full text-xs font-semibold text-gray-800 whitespace-nowrap
                                bg-gradient-to-r ${hotspot.color} shadow-lg
                                transform transition-all duration-300 cursor-pointer
                                ${hoveredHotspot === hotspot.id ? 'scale-110 opacity-100' : 'scale-100 opacity-90'}
                            `}>
                                <span className="mr-1">{hotspot.icon}</span>
                                {hotspot.name}
                            </div>
                        </button>
                    ))}
                </div>

                {/* Scroll Indicator */}
                <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-bounce z-10">
                    <span className="text-xs text-white bg-black/30 px-3 py-1 rounded-full backdrop-blur-sm">เลื่อนลง</span>
                    <div className="w-6 h-10 rounded-full border-2 border-white/70 flex items-start justify-center p-1 bg-black/20 backdrop-blur-sm">
                        <div className="w-1.5 h-3 rounded-full bg-white animate-scroll-dot" />
                    </div>
                </div>
            </div>

            {/* Spacer for scroll - reduced to prevent blank gap */}
            <div className="h-[70vh]" />

            {/* Modal */}
            {activeHotspot && (
                <div className="fixed inset-0 z-[100]">
                    <div
                        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
                        onClick={closeModal}
                    />
                    <div className="absolute inset-0 flex items-center justify-center p-2 sm:p-4">
                        <div className="glass-strong rounded-2xl sm:rounded-3xl w-full max-w-lg max-h-[90vh] overflow-y-auto shadow-2xl animate-scale-in">
                            {/* Header */}
                            <div className={`bg-gradient-to-r ${activeHotspot.color} p-3 sm:p-6 sticky top-0`}>
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-2 sm:gap-3">
                                        <span className="text-2xl sm:text-4xl">{activeHotspot.icon}</span>
                                        <h2 className="font-display text-base sm:text-xl md:text-2xl font-bold text-gray-900">
                                            {activeHotspot.content.title}
                                        </h2>
                                    </div>
                                    <button
                                        onClick={closeModal}
                                        className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-white/30 flex items-center justify-center text-gray-800 hover:bg-white/50 transition-colors"
                                    >
                                        <span className="material-symbols-outlined text-xl sm:text-2xl">close</span>
                                    </button>
                                </div>
                            </div>

                            {/* Content */}
                            <div className="p-3 sm:p-6">
                                {activeHotspot.content.image && (
                                    <div className="mb-3 sm:mb-4 rounded-xl sm:rounded-2xl overflow-hidden bg-gray-100">
                                        <img
                                            src={activeHotspot.content.image}
                                            alt={activeHotspot.content.title}
                                            className="w-full h-32 sm:h-48 object-contain"
                                        />
                                    </div>
                                )}

                                <p className="text-black text-sm sm:text-base leading-relaxed mb-4 sm:mb-6">
                                    {activeHotspot.content.description}
                                </p>

                                {activeHotspot.content.link ? (
                                    <Link
                                        to={activeHotspot.content.link}
                                        className={`w-full py-2 sm:py-3 rounded-xl bg-gradient-to-r ${activeHotspot.color} text-gray-800 font-semibold flex items-center justify-center gap-2 shadow-lg hover:opacity-90 transition-opacity text-sm sm:text-base`}
                                        onClick={closeModal}
                                    >
                                        <span className="material-symbols-outlined">shopping_bag</span>
                                        ดูสินค้า
                                    </Link>
                                ) : (
                                    <button
                                        onClick={closeModal}
                                        className="w-full py-2 sm:py-3 rounded-xl glass-strong text-gray-600 font-semibold hover:bg-white transition-colors text-sm sm:text-base"
                                    >
                                        ปิด
                                    </button>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Custom Animation Styles */}
            <style>{`
                @keyframes scale-in {
                    0% { transform: scale(0.9); opacity: 0; }
                    100% { transform: scale(1); opacity: 1; }
                }
                .animate-scale-in {
                    animation: scale-in 0.3s ease-out forwards;
                }
                @keyframes scroll-dot {
                    0%, 100% { transform: translateY(0); opacity: 1; }
                    50% { transform: translateY(12px); opacity: 0.3; }
                }
                .animate-scroll-dot {
                    animation: scroll-dot 1.5s ease-in-out infinite;
                }
            `}</style>
        </>
    );
}
