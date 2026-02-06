import { useState, useRef, useEffect, useCallback } from 'react';

// Total number of scenes
const TOTAL_SCENES = 19;

// Get image path (WebP version)
const getImagePath = (sceneNum) => `/images/scene/scene/${sceneNum}.webp`;

// Hotspot data for each scene
const sceneHotspots = {
    2: [
        {
            id: 'phu-kao-ngom',
            position: { top: '58%', left: '42%' }, // ตำแหน่งจอแท็บเล็ตรถในการ์ตูน
            size: { width: '8%', height: '12%' },
            content: {
                title: 'ภูเก้าง้อม',
                subtitle: '2113, Tambon Namala, Amphoe Na Haeo, Chang Wat Loei 42170',
                description: `ภูเก้าง้อม ตั้งอยู่ริมทางหลวงหมายเลข 2113 (นาแห้ว-ด่านซ้าย) ต.บลนามาลา อำเภอนาแห้ว

ชาวบ้านในพื้นที่เรียกว่า โค้งที่ 9 เพราะหากมองจากมุมสูงหรือภาพถ่ายทางอากาศจะเห็นถนนในช่วงนี้มีความคดโค้งคล้ายเลขเก้าไทย ๙

สองข้างทางเป็นภูเขาสลับซับซ้อน ในช่วงฤดูฝนจนถึงปลายฝนต้นหนาวตั้งแต่เดือนตุลาคม-มกราคม มีโอกาสพบเจอทะเลหมอก

มีจุดพักรถข้างทางสำหรับจอดชมทิวทัศน์ ทำให้ภูเก้าง้อมกลายเป็นแหล่งท่องเที่ยวและจุดชมทะเลหมอกที่น่าสนใจอีกแห่งของจังหวัดเลย`,
                icon: '🏔️',
                // Real images
                images: [
                    '/images/real_image/1.webp',
                    '/images/real_image/2.webp',
                    '/images/real_image/3.webp'
                ],
                // Google Maps data
                mapUrl: 'https://www.google.com/maps?q=17.363754,101.051384',
                coordinates: { lat: 17.363754, lng: 101.051384 }
            }
        }
    ],
    4: [
        {
            id: 'phu-pha-muak',
            position: { top: '42%', left: '63%' }, // ตำแหน่งป้ายภูผาหมวก (ขยับขวา)
            size: { width: '8%', height: '12%' },
            content: {
                title: 'ภูผาหมวก',
                subtitle: 'Tambon Na Haeo, Chang Wat Loei 42170',
                description: `ภูผาหมวก ตั้งอยู่ที่บ้านนาโพธิ์ ตำบลนาแห้ว จังหวัดเลย เป็นแหล่งท่องเที่ยวทางธรรมชาติที่มีจุดเด่นคือกลุ่มหินทรายซ้อนทับกันคล้ายหมวกทหารโบราณ

ในอดีตมีประวัติสำคัญเป็นจุดยุทธศาสตร์สังเกตการณ์พรมแดนไทย-ลาว ในช่วงวิกฤตการณ์รบที่ร่มเกล้า

ปัจจุบันเป็นจุดชมทะเลหมอกและทิวทัศน์เมืองบ่อแตน ประเทศลาว ที่สวยงามตลอดทั้งปี โดยมีเส้นทางเดินป่าศึกษาธรรมชาติระยะสั้นที่อุดมสมบูรณ์

ส่วนวิถีชีวิตชาวบ้านนาโพธิ์เป็นชุมชนเกษตรกรรมที่เงียบสงบและเข้มแข็งในการอนุรักษ์วัฒนธรรมไทเลย

มัวศรีโพธิ์ซึ่งเก่าแก่กว่า 400 ปีเป็นศูนย์กลางศรัทธา ชาวบ้านดำเนินชีวิตด้วยการทำนาและปลูกพืชไร่ในหุบเขา พร้อมทั้งบริหารจัดการการท่องเที่ยวโดยชุมชนเองในรูปแบบโฮมสเตย์และการนำเที่ยวเชิงอนุรักษ์ เพื่อรักษาความเรียบง่ายและทรัพยากรท้องถิ่นให้ยั่งยืน`,
                icon: '⛰️',
                images: [
                    '/images/real_image/5.webp',
                    '/images/real_image/6.webp',
                    '/images/real_image/7.webp'
                ],
                mapUrl: 'https://www.google.com/maps?q=17.503052,101.089157',
                coordinates: { lat: 17.503052, lng: 101.089157 }
            }
        }
    ],
    5: [
        {
            id: 'thai-lao-border',
            position: { top: '52%', left: '47.5%' }, // ตำแหน่งจอ tablet
            size: { width: '8%', height: '12%' },
            content: {
                title: 'ชายแดนไทย-ลาวบ้านเหมืองแพร่',
                subtitle: 'National Hwy 2113, 42170 Na Haeo',
                description: `ชายแดนไทย-ลาวบ้านเหมืองแพร่ ตั้งอยู่ในเขตตำบลนาแห้ว อำเภอนาแห้ว จังหวัดเลย ห่างจากตัวจังหวัดประมาณ 115 กิโลเมตร

มีภูมิประเทศเป็นเทือกเขาสลับซับซ้อนและมีพื้นที่ราบระหว่างหุบเขาน้อย พื้นที่ตั้งอยู่ริมฝั่งแม่น้ำเหือง (น้ำเหียง) ซึ่งถือเป็นเส้นกั้นพรมแดนธรรมชาติระหว่างราชอาณาจักรไทยและสาธารณรัฐประชาธิปไตยประชาชนลาว

สำหรับชุมชนบ้านเหมืองแพร่ เป็นชุมชนโบราณที่มีประวัติความเป็นมายาวนานหลายร้อยปี คู่กับบ่อเกลือสินธาว์โบราณ ที่อยู่กลางลำน้ำเหืองและเหมืองแพร่ ซึ่งที่มาของชื่อหมู่บ้านเหมืองแพร่มาจากชื่อของลำเหมืองโบราณที่บรรพบุรุษชาวเหมืองแพร่ทำขึ้น

และไม่นานมานี้ บริเวณชายแดนไทย-ลาว บ้านเหมืองแพร่ มีถนนคนเดินริมเหืองในเวลาช่วงเย็น ทุกวันเสาร์และวันพระ`,
                icon: '🛃',
                images: [
                    '/images/real_image/8.webp',
                    '/images/real_image/9.webp',
                    '/images/real_image/10.webp',
                    '/images/real_image/11.webp'
                ],
                mapUrl: 'https://www.google.com/maps?q=17.504158,101.076790',
                coordinates: { lat: 17.504158, lng: 101.076790 }
            }
        }
    ],
    6: [
        {
            id: 'nahaeo-glow-product',
            position: { top: '32%', left: '43.3%' }, // ตำแหน่งสินค้า
            size: { width: '10%', height: '15%' },
            content: {
                title: 'Na Haeo Glow Lip Balm',
                subtitle: 'ลิปบาล์มออร์แกนิกจากนาแห้ว',
                description: `🌿 สารสกัดหลักทรงคุณค่าจากธรรมชาติ

• น้ำมันแมคคาเดเมีย: จากเกษตรกรอำเภอนาแห้ว สกัดเย็นไม่ใช้สารเคมี อุดมด้วยกรดไขมันพาลมิโทเอลิก ซึมซาบสู่ผิวได้ดีเยี่ยม

• ไขผึ้งบริสุทธิ์: สร้างเกราะป้องกันผิว กักเก็บความชุ่มชื้น

• วิตามินอี: บำรุงและฟื้นฟูผิวริมฝีปาก

💧 แก้ปัญหาปากแห้ง แตก ลอก ได้ตรงจุด

🌱 ปลอดภัย เป็นมิตรต่อสิ่งแวดล้อม สร้างมูลค่าเพิ่มให้ผลผลิตท้องถิ่น`,
                icon: '💋',
                images: [
                    '/images/real_image/24.webp'
                ]
            }
        }
    ],
    12: [
        {
            id: 'wat-sri-pho-chai',
            position: { top: '45%', left: '40%' }, // ตำแหน่งวัด
            size: { width: '10%', height: '15%' },
            content: {
                title: 'วัดศรีโพธิ์ชัย',
                subtitle: 'บ้านแสงภา, นาแห้ว, จังหวัดเลย',
                description: `วัดศรีโพธิ์ชัย บ้านแสงภา จ.เลย เป็นอารามเก่าแก่คู่ชุมชนมานานกว่า 400 ปี (สร้างราว พ.ศ. 2090) โดดเด่นด้วยสถาปัตยกรรม "สิม" (อุโบสถ) ทรงล้านช้างที่งดงามคล้ายวัดเชียงทองในหลวงพระบาง

มีลักษณะหลังคาซ้อนชั้นลาดต่ำเพื่อรับมือกับภูมิอากาศแถบป่าเขา

ภายในประดิษฐานหลวงพ่อใหญ่ที่เป็นศูนย์รวมจิตใจของชาวบ้าน วิถีชีวิตของที่นี่ผูกพันอย่างแน่นแฟ้นกับพุทธศาสนาและจารีตประเพณีโบราณ

โดยมีไฮไลต์สำคัญคือ "ประเพณีแห่ต้นดอกไม้" ที่ใหญ่และสูงที่สุดในโลกในช่วงสงกรานต์ เพื่อเป็นพุทธบูชาและขอความอุดมสมบูรณ์

สะท้อนถึงพลังศรัทธาและความสามัคคีของชาวบ้านที่ยังคงรักษาอัตลักษณ์ท้องถิ่นไว้อย่างเหนียวแน่นจนถึงปัจจุบัน`,
                icon: '🛕',
                images: [
                    '/images/real_image/12.webp',
                    '/images/real_image/13.webp',
                    '/images/real_image/14.webp',
                    '/images/real_image/15.webp',
                    '/images/real_image/16.webp'
                ],
                mapUrl: 'https://www.google.com/maps/place/17%C2%B029\'29.8%22N+100%C2%B059\'51.7%22E/@17.491619,100.9951131,17z',
                coordinates: { lat: 17.491619, lng: 100.997688 }
            }
        }
    ],
    13: [
        {
            id: 'phra-that-din-tan',
            position: { top: '45%', left: '43.7%' }, // ตำแหน่งพระธาตุ
            size: { width: '10%', height: '15%' },
            content: {
                title: 'พระธาตุดินแทน',
                subtitle: 'นาแห้ว, จังหวัดเลย',
                description: `พระธาตุดินแทน ณ วัดโพธิ์ชัย บ้านแสงภา จังหวัดเลย เป็นเจดีย์เก่าแก่ที่สร้างขึ้นราว พ.ศ. 2324 โดยกลุ่มผู้อพยพจากนครเวียงจันทน์

เพื่อเป็นสัญลักษณ์ในการขอขมาต่อธรรมชาติและเป็นพุทธบูชาในการตั้งรกรากใหม่ ชื่อ "ดินแทน" มีที่มาจากการใช้ดินปั้นเป็นก้อนพุทธิบถมกันจนเป็นรูปทรงเจดีย์ แทนการใช้ปูนหรืออิฐซึ่งหาได้ยากในอดีต

สะท้อนถึงวิถีชีวิตที่ผูกพันกับธรรมชาติและความสามัคคีของชุมชน แม้ต่อมาจะมีการบูรณะด้วยการใช้คอนกรีตบุฉาบภายนอกเพื่อความมั่นคง แต่ยังคงรักษาโครงสร้างดั้งเดิมไว้ภายใน

ปัจจุบันที่นี่เป็นศูนย์กลางศรัทธาที่ก่อให้เกิดประเพณี "แห่ต้นดอกไม้" มรดกภูมิปัญญาทางวัฒนธรรมของชาติที่สืบทอดความรุ่งเรืองและจิตวิญญาณของชาวบ้านแสงภามาจนถึงปัจจุบัน`,
                icon: '🙏',
                images: [
                    '/images/real_image/17.webp',
                    '/images/real_image/18.webp'
                ],
                mapUrl: 'https://www.google.com/maps?q=17.491098,100.991333',
                coordinates: { lat: 17.491098, lng: 100.991333 }
            }
        }
    ],
    14: [
        {
            id: 'phu-suan-sai-national-park',
            position: { top: '62%', left: '45.5%' }, // ตำแหน่งอุทยาน
            size: { width: '10%', height: '15%' },
            content: {
                title: 'อุทยานแห่งชาติภูสวนทราย',
                subtitle: 'Sangpa Sub-district, Tambon Saeng Pha, Chang Wat Loei 42170',
                description: `อุทยานแห่งชาติภูสวนทราย ตั้งอยู่ในเขตอำเภอนาแห้ว จังหวัดเลย เป็นพื้นที่ประวัติศาสตร์สำคัญที่เคยเป็นสมรภูมิยุทธการบ้านร่มเกล้า (เนิน 1428) ระหว่างไทย-ลาว ในปี พ.ศ. 2530-2531

ปัจจุบันเป็นผืนป่าดิบเขาอันอุดมสมบูรณ์และแหล่งต้นน้ำสำคัญของแม่น้ำเหือง

โดยมีวิถีชีวิตชาวอำเภอนาแห้วที่เรียบง่ายเป็นเอกลักษณ์ โดดเด่นด้วยการเป็นแหล่งปลูกพืชเศรษฐกิจอัตลักษณ์อย่าง "แมคคาเดเมีย" ซึ่งได้รับการส่งเสริมจากโครงการเกษตรที่สูงเพื่อสร้างรายได้ทดแทนการทำไร่เลื่อนลอยและเพิ่มพื้นที่สีเขียว

ผสมผสานกับวัฒนธรรมท้องถิ่นที่เข้มแข็งผ่านความเชื่อเรื่อง "เจ้าพ่อภูขัด" และประเพณีแห่ต้นดอกไม้ สะท้อนถึงการอยู่ร่วมกันระหว่างคนและป่าท่ามกลางอากาศหนาวเย็นตลอดทั้งปี`,
                icon: '🌲',
                images: [
                    '/images/real_image/19.webp',
                    '/images/real_image/20.webp',
                    '/images/real_image/21.webp',
                    '/images/real_image/22.webp',
                    '/images/real_image/23.webp'
                ],
                mapUrl: 'https://www.google.com/maps?q=17.504070,100.939369',
                coordinates: { lat: 17.504070, lng: 100.939369 }
            }
        }
    ]
};

export default function StoryPage() {
    const [currentScene, setCurrentScene] = useState(1);
    const [isAnimating, setIsAnimating] = useState(false);
    const [slideDirection, setSlideDirection] = useState('');
    const [swipeOffset, setSwipeOffset] = useState(0);
    const [isSwiping, setIsSwiping] = useState(false);
    const [showTutorial, setShowTutorial] = useState(true);
    const [loadedImages, setLoadedImages] = useState(new Set([1]));
    const [isFullscreen, setIsFullscreen] = useState(false);
    const [showControls, setShowControls] = useState(true);
    const [activeHotspot, setActiveHotspot] = useState(null);
    const [zoomedImage, setZoomedImage] = useState(null);
    const touchStartX = useRef(0);
    const hideControlsTimer = useRef(null);
    const containerRef = useRef(null);

    // Get hotspots for current scene
    const currentHotspots = sceneHotspots[currentScene] || [];

    // Auto-hide controls after 3 seconds
    const resetHideTimer = useCallback(() => {
        setShowControls(true);
        if (hideControlsTimer.current) {
            clearTimeout(hideControlsTimer.current);
        }
        hideControlsTimer.current = setTimeout(() => {
            if (!showTutorial && !activeHotspot) {
                setShowControls(false);
            }
        }, 3000);
    }, [showTutorial, activeHotspot]);

    // Show controls on any interaction
    const handleInteraction = useCallback(() => {
        resetHideTimer();
    }, [resetHideTimer]);

    // Start hide timer on mount
    useEffect(() => {
        resetHideTimer();
        return () => {
            if (hideControlsTimer.current) {
                clearTimeout(hideControlsTimer.current);
            }
        };
    }, [resetHideTimer]);

    // Fullscreen change listener
    useEffect(() => {
        const handleFullscreenChange = () => {
            setIsFullscreen(!!document.fullscreenElement);
        };
        document.addEventListener('fullscreenchange', handleFullscreenChange);
        return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
    }, []);

    // Toggle fullscreen
    const toggleFullscreen = async () => {
        try {
            if (!document.fullscreenElement) {
                if (containerRef.current) {
                    await containerRef.current.requestFullscreen();
                    if (screen.orientation && screen.orientation.lock) {
                        try {
                            await screen.orientation.lock('landscape');
                        } catch (e) { }
                    }
                }
            } else {
                await document.exitFullscreen();
                if (screen.orientation && screen.orientation.unlock) {
                    screen.orientation.unlock();
                }
            }
        } catch (err) {
            console.error('Fullscreen error:', err);
        }
        resetHideTimer();
    };

    // Preload adjacent images
    useEffect(() => {
        const imagesToLoad = [
            currentScene - 1,
            currentScene,
            currentScene + 1,
            currentScene + 2,
        ].filter(n => n >= 1 && n <= TOTAL_SCENES);

        imagesToLoad.forEach(sceneNum => {
            if (!loadedImages.has(sceneNum)) {
                const img = new Image();
                img.src = getImagePath(sceneNum);
                img.onload = () => {
                    setLoadedImages(prev => new Set([...prev, sceneNum]));
                };
            }
        });
    }, [currentScene, loadedImages]);

    // Hide tutorial after first interaction or after 5 seconds
    useEffect(() => {
        const timer = setTimeout(() => {
            setShowTutorial(false);
        }, 5000);
        return () => clearTimeout(timer);
    }, []);

    const dismissTutorial = () => {
        setShowTutorial(false);
        resetHideTimer();
    };

    const goToNextScene = () => {
        if (currentScene < TOTAL_SCENES && !isAnimating && !activeHotspot) {
            setSlideDirection('slide-left');
            setIsAnimating(true);
            dismissTutorial();
            resetHideTimer();
            setTimeout(() => {
                setCurrentScene(prev => prev + 1);
                setSlideDirection('');
                setIsAnimating(false);
            }, 300);
        }
    };

    const goToPrevScene = () => {
        if (currentScene > 1 && !isAnimating && !activeHotspot) {
            setSlideDirection('slide-right');
            setIsAnimating(true);
            dismissTutorial();
            resetHideTimer();
            setTimeout(() => {
                setCurrentScene(prev => prev - 1);
                setSlideDirection('');
                setIsAnimating(false);
            }, 300);
        }
    };

    // Hotspot click handler
    const handleHotspotClick = (e, hotspot) => {
        e.stopPropagation();
        setActiveHotspot(hotspot);
    };

    const closeHotspotModal = () => {
        setActiveHotspot(null);
        resetHideTimer();
    };

    // Touch handlers for swipe with real-time feedback
    const handleTouchStart = (e) => {
        if (activeHotspot) return;
        touchStartX.current = e.touches[0].clientX;
        setIsSwiping(true);
        dismissTutorial();
        resetHideTimer();
    };

    const handleTouchMove = (e) => {
        if (!isSwiping || activeHotspot) return;
        const currentX = e.touches[0].clientX;
        const diff = currentX - touchStartX.current;

        const maxOffset = 100;
        const limitedOffset = Math.max(-maxOffset, Math.min(maxOffset, diff));
        setSwipeOffset(limitedOffset);
    };

    const handleTouchEnd = () => {
        if (activeHotspot) return;
        const threshold = 50;

        if (swipeOffset < -threshold) {
            goToNextScene();
        } else if (swipeOffset > threshold) {
            goToPrevScene();
        }

        setSwipeOffset(0);
        setIsSwiping(false);
    };

    return (
        <div
            ref={containerRef}
            className="fixed inset-0 bg-black overflow-hidden"
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
            onMouseMove={handleInteraction}
            onClick={handleInteraction}
        >
            {/* Scene Image with Slide Animation + Swipe Offset */}
            <div
                className={`absolute inset-0 flex items-center justify-center transition-transform ${isSwiping ? 'duration-0' : 'duration-300'} ease-out ${slideDirection}`}
                style={{ transform: isSwiping ? `translateX(${swipeOffset}px)` : undefined }}
            >
                <img
                    src={getImagePath(currentScene)}
                    alt={`Scene ${currentScene}`}
                    className="w-full h-full object-contain"
                    loading="lazy"
                />

                {/* Hotspots for current scene */}
                {currentHotspots.map((hotspot) => (
                    <button
                        key={hotspot.id}
                        onClick={(e) => handleHotspotClick(e, hotspot)}
                        className="absolute cursor-pointer group z-30"
                        style={{
                            top: hotspot.position.top,
                            left: hotspot.position.left,
                            width: hotspot.size.width,
                            height: hotspot.size.height,
                        }}
                    >
                        {/* Water Ripple Effect - responsive size */}
                        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                            {/* Ripple rings - smaller base size for portrait */}
                            <div className="absolute w-12 h-12 sm:w-16 sm:h-16 rounded-full border-2 sm:border-4 border-white/50 backdrop-blur-[1px] animate-ripple-1"></div>
                            <div className="absolute w-12 h-12 sm:w-16 sm:h-16 rounded-full border-2 sm:border-4 border-white/40 backdrop-blur-[1px] animate-ripple-2"></div>
                            <div className="absolute w-12 h-12 sm:w-16 sm:h-16 rounded-full border-2 sm:border-4 border-white/30 animate-ripple-3"></div>
                            {/* Center pulse */}
                            <div className="relative w-4 h-4 sm:w-5 sm:h-5 rounded-full bg-white/70 shadow-lg pointer-events-auto animate-pulse-glow"></div>
                        </div>
                    </button>
                ))}
            </div>

            {/* Hotspot Modal */}
            {activeHotspot && (
                <div
                    className="absolute inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4"
                    onClick={closeHotspotModal}
                >
                    <div
                        className="bg-white rounded-2xl max-w-lg w-full max-h-[80vh] overflow-y-auto shadow-2xl animate-scale-in"
                        onClick={(e) => e.stopPropagation()}
                    >
                        {/* Header */}
                        <div className="sticky top-0 bg-gradient-to-r from-[#FFD1DC] to-[#FFB6C1] p-4 rounded-t-2xl">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <span className="text-2xl">{activeHotspot.content.icon}</span>
                                    <div>
                                        <h2 className="text-lg font-bold text-gray-800">{activeHotspot.content.title}</h2>
                                        {activeHotspot.content.subtitle && (
                                            <p className="text-xs text-gray-600">{activeHotspot.content.subtitle}</p>
                                        )}
                                    </div>
                                </div>
                                <button
                                    onClick={closeHotspotModal}
                                    className="w-8 h-8 rounded-full bg-white/30 flex items-center justify-center text-gray-800 hover:bg-white/50 transition-colors"
                                >
                                    <span className="material-symbols-outlined text-lg">close</span>
                                </button>
                            </div>
                        </div>

                        {/* Content */}
                        <div className="p-4 space-y-4">
                            {/* Image Grid - LINE style (compact) */}
                            {activeHotspot.content.images && activeHotspot.content.images.length > 0 && (
                                <div className={`grid gap-1 rounded-xl overflow-hidden max-h-40 ${activeHotspot.content.images.length === 1 ? 'grid-cols-1' :
                                    activeHotspot.content.images.length === 2 ? 'grid-cols-2' :
                                        activeHotspot.content.images.length === 3 ? 'grid-cols-3' :
                                            activeHotspot.content.images.length === 4 ? 'grid-cols-4' :
                                                'grid-cols-5'
                                    }`}>
                                    {activeHotspot.content.images.map((img, idx) => (
                                        <div
                                            key={idx}
                                            className={`overflow-hidden cursor-pointer ${activeHotspot.content.images.length === 1 ? 'aspect-video' :
                                                activeHotspot.content.images.length === 3 && idx === 0 ? 'row-span-2 aspect-square' :
                                                    'aspect-square'
                                                }`}
                                            onClick={() => setZoomedImage(img)}
                                        >
                                            <img
                                                src={img}
                                                alt={`${activeHotspot.content.title} ${idx + 1}`}
                                                className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                                            />
                                        </div>
                                    ))}
                                </div>
                            )}

                            <p className="text-gray-700 text-sm leading-relaxed whitespace-pre-line">
                                {activeHotspot.content.description}
                            </p>

                            {/* Minimap */}
                            {activeHotspot.content.coordinates && (
                                <div className="space-y-2">
                                    <div className="rounded-xl overflow-hidden border border-gray-200 shadow-sm">
                                        <iframe
                                            src={`https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d5000!2d${activeHotspot.content.coordinates.lng}!3d${activeHotspot.content.coordinates.lat}!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sth!2sth!4v1`}
                                            width="100%"
                                            height="150"
                                            style={{ border: 0 }}
                                            allowFullScreen=""
                                            loading="lazy"
                                            referrerPolicy="no-referrer-when-downgrade"
                                            title="Location Map"
                                        ></iframe>
                                    </div>

                                    {/* Open in Google Maps button */}
                                    <a
                                        href={activeHotspot.content.mapUrl}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex items-center justify-center gap-2 w-full py-2.5 bg-gradient-to-r from-[#4285F4] to-[#34A853] text-white rounded-xl text-sm font-medium hover:opacity-90 transition-opacity"
                                    >
                                        <span className="material-symbols-outlined text-lg">map</span>
                                        เปิดใน Google Maps
                                    </a>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            )}

            {/* Image Lightbox */}
            {zoomedImage && (
                <div
                    className="fixed inset-0 bg-black/90 z-[100] flex items-center justify-center animate-fade-in"
                    onClick={() => setZoomedImage(null)}
                >
                    {/* Close button */}
                    <button
                        onClick={() => setZoomedImage(null)}
                        className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center text-white hover:bg-white/30 transition-colors z-10"
                    >
                        <span className="material-symbols-outlined text-xl">close</span>
                    </button>

                    {/* Zoomed image */}
                    <img
                        src={zoomedImage}
                        alt="Zoomed"
                        className="max-w-[90vw] max-h-[90vh] object-contain rounded-lg shadow-2xl animate-zoom-in"
                        onClick={(e) => e.stopPropagation()}
                    />
                </div>
            )}

            {/* Loading indicator */}
            {!loadedImages.has(currentScene) && (
                <div className="absolute inset-0 flex items-center justify-center bg-black/50 z-30">
                    <div className="w-8 h-8 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                </div>
            )}

            {/* Tutorial Overlay */}
            {showTutorial && (
                <div
                    className="absolute inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center"
                    onClick={dismissTutorial}
                >
                    <div className="text-center text-white p-8 animate-fade-in">
                        <div className="flex items-center justify-center gap-8 mb-6">
                            <div className="flex items-center gap-2 animate-swipe-left">
                                <span className="material-symbols-outlined text-4xl">swipe_left</span>
                            </div>
                            <div className="w-16 h-16 rounded-full bg-white/20 flex items-center justify-center">
                                <span className="material-symbols-outlined text-3xl">touch_app</span>
                            </div>
                            <div className="flex items-center gap-2 animate-swipe-right">
                                <span className="material-symbols-outlined text-4xl">swipe_right</span>
                            </div>
                        </div>

                        <h2 className="text-xl font-bold mb-2">ปัดเพื่อเปลี่ยนหน้า</h2>
                        <p className="text-white/70 text-sm mb-4">
                            ปัดซ้าย → ไปหน้าถัดไป<br />
                            ปัดขวา → ย้อนกลับ
                        </p>

                        <button className="px-6 py-2 bg-gradient-to-r from-[#FFD1DC] to-[#FFB6C1] text-gray-800 rounded-full font-semibold text-sm">
                            แตะเพื่อเริ่ม
                        </button>
                    </div>
                </div>
            )}

            {/* Swipe Direction Indicator */}
            {isSwiping && Math.abs(swipeOffset) > 30 && (
                <div className={`absolute top-1/2 -translate-y-1/2 z-30 ${swipeOffset > 0 ? 'left-4' : 'right-4'}`}>
                    <div className="w-12 h-12 rounded-full bg-white/30 backdrop-blur-sm flex items-center justify-center text-white">
                        <span className="material-symbols-outlined text-2xl">
                            {swipeOffset > 0 ? 'arrow_back' : 'arrow_forward'}
                        </span>
                    </div>
                </div>
            )}

            {/* Controls Container - Auto-hide like YouTube */}
            <div className={`transition-opacity duration-300 ${showControls ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
                {/* Progress Bar (Instagram-style) */}
                <div className="absolute top-4 left-4 right-4 flex gap-1 z-20">
                    {Array.from({ length: TOTAL_SCENES }, (_, i) => (
                        <div
                            key={i}
                            className={`h-1 flex-1 rounded-full transition-all ${i + 1 < currentScene
                                ? 'bg-white'
                                : i + 1 === currentScene
                                    ? 'bg-white'
                                    : 'bg-white/30'
                                }`}
                        />
                    ))}
                </div>

                {/* Navigation Arrows */}
                <button
                    onClick={goToPrevScene}
                    disabled={currentScene === 1 || isAnimating}
                    className={`absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-black/30 backdrop-blur-sm flex items-center justify-center text-white transition-all z-20 ${currentScene === 1 ? 'opacity-0' : 'opacity-70 hover:opacity-100 hover:scale-110'}`}
                >
                    <span className="material-symbols-outlined text-xl sm:text-2xl">chevron_left</span>
                </button>

                <button
                    onClick={goToNextScene}
                    disabled={currentScene >= TOTAL_SCENES || isAnimating}
                    className={`absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-black/30 backdrop-blur-sm flex items-center justify-center text-white transition-all z-20 ${currentScene >= TOTAL_SCENES ? 'opacity-0' : 'opacity-70 hover:opacity-100 hover:scale-110'}`}
                >
                    <span className="material-symbols-outlined text-xl sm:text-2xl">chevron_right</span>
                </button>

                {/* Bottom Bar */}
                <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/50 to-transparent z-20">
                    <div className="flex items-center justify-between">
                        {/* Logo */}
                        <div className="flex items-center gap-2">
                            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#FFD1DC] to-[#FFB6C1] flex items-center justify-center text-white font-bold text-xs shadow-lg">
                                NH
                            </div>
                            <span className="text-xs font-display font-medium text-white drop-shadow-lg">
                                Na Haeo <span className="text-[#FFD1DC]">Glow</span>
                            </span>
                        </div>

                        {/* Right side controls */}
                        <div className="flex items-center gap-3">
                            {/* Page Counter */}
                            <div className="bg-black/40 backdrop-blur-sm px-3 py-1 rounded-full text-white text-xs">
                                {currentScene} / {TOTAL_SCENES}
                            </div>

                            {/* Fullscreen Button */}
                            <button
                                onClick={toggleFullscreen}
                                className="w-10 h-10 rounded-full bg-black/40 backdrop-blur-sm flex items-center justify-center text-white hover:bg-black/60 transition-all"
                            >
                                <span className="material-symbols-outlined text-xl">
                                    {isFullscreen ? 'fullscreen_exit' : 'fullscreen'}
                                </span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Tap Areas (Left = prev, Right = next) */}
            <div
                className="absolute left-0 top-16 w-1/3 h-[calc(100%-8rem)] z-10 cursor-pointer"
                onClick={goToPrevScene}
            />
            <div
                className="absolute right-0 top-16 w-1/3 h-[calc(100%-8rem)] z-10 cursor-pointer"
                onClick={goToNextScene}
            />

            {/* Show controls hint (when hidden) */}
            {!showControls && (
                <div className="absolute bottom-4 left-4 z-10">
                    <div className="w-2 h-2 rounded-full bg-white/30 animate-pulse"></div>
                </div>
            )}

            {/* Styles */}
            <style>{`
                .slide-left {
                    animation: slideOutLeft 0.3s ease-out forwards;
                }
                
                .slide-right {
                    animation: slideOutRight 0.3s ease-out forwards;
                }
                
                @keyframes slideOutLeft {
                    0% { transform: translateX(0); opacity: 1; }
                    50% { opacity: 0.5; }
                    100% { transform: translateX(-30px); opacity: 0; }
                }
                
                @keyframes slideOutRight {
                    0% { transform: translateX(0); opacity: 1; }
                    50% { opacity: 0.5; }
                    100% { transform: translateX(30px); opacity: 0; }
                }

                @keyframes fadeIn {
                    from { opacity: 0; transform: scale(0.95); }
                    to { opacity: 1; transform: scale(1); }
                }

                @keyframes swipeLeftAnim {
                    0%, 100% { transform: translateX(0); opacity: 0.5; }
                    50% { transform: translateX(-15px); opacity: 1; }
                }

                @keyframes swipeRightAnim {
                    0%, 100% { transform: translateX(0); opacity: 0.5; }
                    50% { transform: translateX(15px); opacity: 1; }
                }

                @keyframes scaleIn {
                    from { opacity: 0; transform: scale(0.9); }
                    to { opacity: 1; transform: scale(1); }
                }

                .animate-fade-in {
                    animation: fadeIn 0.3s ease-out;
                }

                .animate-swipe-left {
                    animation: swipeLeftAnim 1.5s ease-in-out infinite;
                }

                .animate-swipe-right {
                    animation: swipeRightAnim 1.5s ease-in-out infinite;
                }

                .animate-scale-in {
                    animation: scaleIn 0.3s ease-out;
                }

                @keyframes zoomIn {
                    from { 
                        opacity: 0; 
                        transform: scale(0.5); 
                    }
                    to { 
                        opacity: 1; 
                        transform: scale(1); 
                    }
                }

                .animate-zoom-in {
                    animation: zoomIn 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
                }

                /* Water Ripple Effect - smaller but more intense */
                @keyframes ripple {
                    0% {
                        transform: scale(0.3);
                        opacity: 1;
                        border-width: 4px;
                        filter: blur(0px);
                    }
                    50% {
                        opacity: 0.7;
                        filter: blur(1px);
                    }
                    100% {
                        transform: scale(2);
                        opacity: 0;
                        border-width: 2px;
                        filter: blur(2px);
                    }
                }

                @keyframes pulseGlow {
                    0%, 100% {
                        transform: scale(1);
                        box-shadow: 0 0 10px rgba(255,255,255,0.5);
                    }
                    50% {
                        transform: scale(1.2);
                        box-shadow: 0 0 20px rgba(255,255,255,0.8);
                    }
                }

                .animate-ripple-1 {
                    animation: ripple 2.5s cubic-bezier(0.25, 0.46, 0.45, 0.94) infinite;
                }

                .animate-ripple-2 {
                    animation: ripple 2.5s cubic-bezier(0.25, 0.46, 0.45, 0.94) infinite 0.6s;
                }

                .animate-ripple-3 {
                    animation: ripple 2.5s cubic-bezier(0.25, 0.46, 0.45, 0.94) infinite 1.2s;
                }

                .animate-pulse-glow {
                    animation: pulseGlow 2s ease-in-out infinite;
                }
            `}</style>
        </div>
    );
}
