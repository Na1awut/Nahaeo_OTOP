import { useState } from 'react';

export default function Navbar() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const scrollToSection = (id) => {
        const element = document.getElementById(id);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
        setIsMenuOpen(false);
    };

    return (
        <>
            {/* Navigation */}
            <nav className="relative z-50 px-6 py-5 flex justify-between items-center max-w-7xl mx-auto">
                <div className="flex items-center gap-3">
                    <div className="w-11 h-11 rounded-full bg-gradient-to-br from-[#FFD1DC] to-[#FFB6C1] flex items-center justify-center text-white font-bold text-sm shadow-pink-glow">
                        NH
                    </div>
                    <span className="text-xl font-display font-medium tracking-tight text-gray-800">
                        Na Haeo <span className="text-[#FFB6C1] font-light">Botanics</span>
                    </span>
                </div>

                <div className="hidden md:flex gap-10 text-sm font-medium text-[#6B6B6B]">
                    <button onClick={() => scrollToSection('story')} className="hover:text-[#FFB6C1] transition-colors duration-300">
                        เรื่องราว
                    </button>
                    <button onClick={() => scrollToSection('collection')} className="hover:text-[#FFB6C1] transition-colors duration-300">
                        สินค้า
                    </button>
                    <button onClick={() => scrollToSection('ar')} className="hover:text-[#FFB6C1] transition-colors duration-300">
                        WebAR
                    </button>
                    <button onClick={() => scrollToSection('contact')} className="hover:text-[#FFB6C1] transition-colors duration-300">
                        ติดต่อ
                    </button>
                </div>

                <div className="flex items-center gap-3">
                    <button
                        onClick={() => scrollToSection('collection')}
                        className="hidden sm:block btn-gradient px-7 py-3 rounded-full text-sm font-semibold text-gray-800 shadow-pink-glow"
                    >
                        ช้อปเลย
                    </button>
                    <button
                        onClick={() => setIsMenuOpen(true)}
                        className="md:hidden w-11 h-11 rounded-full glass flex items-center justify-center text-gray-600 hover:text-[#FFB6C1] transition-colors"
                    >
                        <span className="material-symbols-outlined text-2xl">menu</span>
                    </button>
                </div>
            </nav>

            {/* Mobile Menu Overlay */}
            {isMenuOpen && (
                <div className="fixed inset-0 z-[100]">
                    <div className="absolute inset-0 modal-overlay modal-enter" onClick={() => setIsMenuOpen(false)} />
                    <div className="absolute right-0 top-0 h-full w-80 max-w-[85vw] bg-white/95 backdrop-blur-xl shadow-2xl modal-content-enter">
                        <div className="p-6">
                            <div className="flex justify-between items-center mb-10">
                                <span className="text-lg font-display font-semibold text-gray-800">เมนู</span>
                                <button
                                    onClick={() => setIsMenuOpen(false)}
                                    className="w-10 h-10 rounded-full glass flex items-center justify-center text-gray-500 hover:text-[#FFB6C1] transition-colors"
                                >
                                    <span className="material-symbols-outlined">close</span>
                                </button>
                            </div>
                            <div className="flex flex-col gap-6">
                                <button onClick={() => scrollToSection('story')} className="text-lg font-medium text-gray-700 hover:text-[#FFB6C1] transition-colors flex items-center gap-3">
                                    <span className="material-symbols-outlined text-[#FFD1DC]">auto_stories</span>
                                    เรื่องราว
                                </button>
                                <button onClick={() => scrollToSection('collection')} className="text-lg font-medium text-gray-700 hover:text-[#FFB6C1] transition-colors flex items-center gap-3">
                                    <span className="material-symbols-outlined text-[#FFE5B4]">shopping_bag</span>
                                    สินค้า
                                </button>
                                <button onClick={() => scrollToSection('ar')} className="text-lg font-medium text-gray-700 hover:text-[#FFB6C1] transition-colors flex items-center gap-3">
                                    <span className="material-symbols-outlined text-[#98FF98]">view_in_ar</span>
                                    WebAR
                                </button>
                                <button onClick={() => scrollToSection('contact')} className="text-lg font-medium text-gray-700 hover:text-[#FFB6C1] transition-colors flex items-center gap-3">
                                    <span className="material-symbols-outlined text-[#FFB6C1]">mail</span>
                                    ติดต่อ
                                </button>
                            </div>
                            <div className="mt-10 pt-6 border-t border-gray-200">
                                <button
                                    onClick={() => { setIsMenuOpen(false); scrollToSection('collection'); }}
                                    className="w-full btn-gradient px-7 py-4 rounded-2xl text-sm font-semibold text-gray-800 shadow-pink-glow"
                                >
                                    ช้อปเลย
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
