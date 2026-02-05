import { useState, useRef, useEffect } from 'react';

// Total number of scenes
const TOTAL_SCENES = 19;

export default function StoryPage() {
    const [currentScene, setCurrentScene] = useState(1);
    const [isAnimating, setIsAnimating] = useState(false);
    const [slideDirection, setSlideDirection] = useState('');
    const [swipeOffset, setSwipeOffset] = useState(0);
    const [isSwiping, setIsSwiping] = useState(false);
    const [showTutorial, setShowTutorial] = useState(true);
    const touchStartX = useRef(0);

    // Hide tutorial after first interaction or after 5 seconds
    useEffect(() => {
        const timer = setTimeout(() => {
            setShowTutorial(false);
        }, 5000);
        return () => clearTimeout(timer);
    }, []);

    const dismissTutorial = () => {
        setShowTutorial(false);
    };

    const goToNextScene = () => {
        if (currentScene < TOTAL_SCENES && !isAnimating) {
            setSlideDirection('slide-left');
            setIsAnimating(true);
            dismissTutorial();
            setTimeout(() => {
                setCurrentScene(prev => prev + 1);
                setSlideDirection('');
                setIsAnimating(false);
            }, 300);
        }
    };

    const goToPrevScene = () => {
        if (currentScene > 1 && !isAnimating) {
            setSlideDirection('slide-right');
            setIsAnimating(true);
            dismissTutorial();
            setTimeout(() => {
                setCurrentScene(prev => prev - 1);
                setSlideDirection('');
                setIsAnimating(false);
            }, 300);
        }
    };

    // Touch handlers for swipe with real-time feedback
    const handleTouchStart = (e) => {
        touchStartX.current = e.touches[0].clientX;
        setIsSwiping(true);
        dismissTutorial();
    };

    const handleTouchMove = (e) => {
        if (!isSwiping) return;
        const currentX = e.touches[0].clientX;
        const diff = currentX - touchStartX.current;

        // Limit swipe offset
        const maxOffset = 100;
        const limitedOffset = Math.max(-maxOffset, Math.min(maxOffset, diff));
        setSwipeOffset(limitedOffset);
    };

    const handleTouchEnd = () => {
        const threshold = 50;

        if (swipeOffset < -threshold) {
            goToNextScene(); // Swipe left = next
        } else if (swipeOffset > threshold) {
            goToPrevScene(); // Swipe right = prev
        }

        setSwipeOffset(0);
        setIsSwiping(false);
    };

    return (
        <div
            className="fixed inset-0 bg-black overflow-hidden"
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
        >
            {/* Scene Image with Slide Animation + Swipe Offset */}
            <div
                className={`absolute inset-0 flex items-center justify-center transition-transform ${isSwiping ? 'duration-0' : 'duration-300'} ease-out ${slideDirection}`}
                style={{ transform: isSwiping ? `translateX(${swipeOffset}px)` : undefined }}
            >
                <img
                    src={`/images/scene/scene/${currentScene}.png`}
                    alt={`Scene ${currentScene}`}
                    className="w-full h-full landscape:object-cover portrait:object-contain"
                />
            </div>

            {/* Tutorial Overlay */}
            {showTutorial && (
                <div
                    className="absolute inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center"
                    onClick={dismissTutorial}
                >
                    <div className="text-center text-white p-8 animate-fade-in">
                        {/* Swipe Animation */}
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

            {/* Tap Areas (Left = prev, Right = next) */}
            <div
                className="absolute left-0 top-16 w-1/3 h-[calc(100%-8rem)] z-10 cursor-pointer"
                onClick={goToPrevScene}
            />
            <div
                className="absolute right-0 top-16 w-1/3 h-[calc(100%-8rem)] z-10 cursor-pointer"
                onClick={goToNextScene}
            />

            {/* Logo */}
            <div className="absolute bottom-4 left-4 flex items-center gap-2 z-20">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#FFD1DC] to-[#FFB6C1] flex items-center justify-center text-white font-bold text-xs shadow-lg">
                    NH
                </div>
                <span className="text-xs font-display font-medium text-white drop-shadow-lg">
                    Na Haeo <span className="text-[#FFD1DC]">Glow</span>
                </span>
            </div>

            {/* Page Counter */}
            <div className="absolute bottom-4 right-4 bg-black/40 backdrop-blur-sm px-3 py-1 rounded-full text-white text-xs z-20">
                {currentScene} / {TOTAL_SCENES}
            </div>

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

                .animate-fade-in {
                    animation: fadeIn 0.3s ease-out;
                }

                .animate-swipe-left {
                    animation: swipeLeftAnim 1.5s ease-in-out infinite;
                }

                .animate-swipe-right {
                    animation: swipeRightAnim 1.5s ease-in-out infinite;
                }
            `}</style>
        </div>
    );
}
