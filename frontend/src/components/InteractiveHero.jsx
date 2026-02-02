import { useState } from 'react';
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
        icon: '🌸',
        position: { top: '45%', left: '20%' },
        size: { width: '30%', height: '35%' },
        color: 'from-[#98FF98] to-[#90EE90]',
        content: {
            title: 'ประเพณีต้นดอกไม้',
            description: 'งานประเพณีที่สืบทอดมากว่า 400 ปี จัดขึ้นในช่วงเดือน 4 ของทุกปี ชาวบ้านจะร่วมแรงร่วมใจประดิษฐ์ต้นดอกไม้จากดอกไม้ธรรมชาติ แห่รอบหมู่บ้านเพื่อถวายเป็นพุทธบูชา',
            image: null
        }
    },
    {
        id: 'macadamia',
        name: 'แมคคาเดเมีย',
        icon: '🥜',
        position: { top: '8%', left: '3%' },
        size: { width: '18%', height: '25%' },
        color: 'from-[#FFE5B4] to-[#FFDAB9]',
        content: {
            title: 'แมคคาเดเมียนาแห้ว',
            description: 'ด้วยสภาพอากาศเย็นตลอดปีและความสูงจากระดับน้ำทะเล ทำให้นาแห้วเป็นพื้นที่ปลูกแมคคาเดเมียที่มีคุณภาพสูง น้ำมันจากแมคคาเดเมียเป็นส่วนผสมหลักในผลิตภัณฑ์ของเรา',
            image: null
        }
    },
    {
        id: 'product',
        name: 'ผลิตภัณฑ์',
        icon: '💄',
        position: { top: '25%', left: '75%' },
        size: { width: '20%', height: '30%' },
        color: 'from-[#FFD1DC] to-[#FFB6C1]',
        content: {
            title: 'ลิปบาล์มนาแห้ว โบทานิกส์',
            description: 'ลิปบาล์มออร์แกนิกจากน้ำมันแมคคาเดเมียและไขผึ้งแท้ สูตรต้นตำรับจากงานวิจัย กักเก็บความชุ่มชื้นได้ถึง 95% ปลอดสารเคมี 100%',
            image: '/images/product-box.png',
            link: '#collection'
        }
    }
];

export default function InteractiveHero() {
    const [activeHotspot, setActiveHotspot] = useState(null);
    const [hoveredHotspot, setHoveredHotspot] = useState(null);
    const [isFullscreen, setIsFullscreen] = useState(false);

    const openModal = (hotspot) => {
        setActiveHotspot(hotspot);
    };

    const closeModal = () => {
        setActiveHotspot(null);
    };

    const toggleFullscreen = async () => {
        try {
            if (!document.fullscreenElement) {
                await document.documentElement.requestFullscreen();
                setIsFullscreen(true);
            } else {
                await document.exitFullscreen();
                setIsFullscreen(false);
            }
        } catch (err) {
            console.error('Fullscreen error:', err);
        }
    };

    return (
        <>
            {/* Fullscreen Hero */}
            <div className="fixed inset-0">
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
                                px-2 sm:px-3 py-1 sm:py-1.5 rounded-full text-[10px] sm:text-xs font-semibold text-gray-800 whitespace-nowrap
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

                {/* Logo */}
                <div className="absolute top-4 left-4 flex items-center gap-2 z-10">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-gradient-to-br from-[#FFD1DC] to-[#FFB6C1] flex items-center justify-center text-white font-bold text-sm shadow-lg">
                        NH
                    </div>
                    <span className="text-base sm:text-lg font-display font-medium text-white drop-shadow-lg">
                        Na Haeo <span className="text-[#FFD1DC]">Glow</span>
                    </span>
                </div>

                {/* Fullscreen Button */}
                <button
                    onClick={toggleFullscreen}
                    className="absolute top-4 right-4 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-gradient-to-br from-[#FFD1DC] to-[#FFB6C1] flex items-center justify-center text-gray-800 hover:scale-110 transition-transform z-10 shadow-lg"
                >
                    <span className="material-symbols-outlined text-xl sm:text-2xl">
                        {isFullscreen ? 'fullscreen_exit' : 'fullscreen'}
                    </span>
                </button>
            </div>

            {/* Modal */}
            {activeHotspot && (
                <div className="fixed inset-0 z-[100]">
                    <div
                        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
                        onClick={closeModal}
                    />
                    <div className="absolute inset-0 flex items-center justify-center p-2 sm:p-4">
                        <div className="bg-white rounded-2xl sm:rounded-3xl w-full max-w-lg max-h-[90vh] overflow-y-auto shadow-2xl animate-scale-in">
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
                                        className="w-full py-2 sm:py-3 rounded-xl bg-gray-100 text-gray-600 font-semibold hover:bg-gray-200 transition-colors text-sm sm:text-base"
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
            `}</style>
        </>
    );
}
