export default function Footer() {
    return (
        <footer id="contact" className="bg-gradient-to-r from-[#FFD1DC]/30 via-[#FFE5B4]/20 to-[#98FF98]/20 border-t border-white/50 pt-16 pb-10">
            <div className="max-w-7xl mx-auto px-6">
                <div className="flex flex-col md:flex-row justify-between items-center gap-8">
                    <div className="text-center md:text-left">
                        <div className="flex items-center justify-center md:justify-start gap-3 mb-3">
                            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#FFD1DC] to-[#FFB6C1] flex items-center justify-center text-white font-bold text-sm shadow-pink-glow">
                                NH
                            </div>
                            <h5 className="font-display text-xl font-bold text-gray-900">นาแห้ว โบทานิกส์</h5>
                        </div>
                        <p className="text-sm text-[#6B6B6B] font-light">OTOP ระดับเยี่ยม จากจังหวัดเลย ประเทศไทย</p>
                        <p className="text-sm text-[#6B6B6B] font-light mt-1">เชื่อมต่อประเพณีและเทคโนโลยี</p>
                    </div>
                    <div className="flex gap-4">
                        <a className="w-11 h-11 rounded-full glass flex items-center justify-center text-gray-500 hover:text-[#FFB6C1] hover:bg-[#FFD1DC]/50 transition-all duration-300" href="#">
                            <span className="material-symbols-outlined text-lg">public</span>
                        </a>
                        <a className="w-11 h-11 rounded-full glass flex items-center justify-center text-gray-500 hover:text-[#FFB6C1] hover:bg-[#FFD1DC]/50 transition-all duration-300" href="#">
                            <span className="material-symbols-outlined text-lg">share</span>
                        </a>
                        <a className="w-11 h-11 rounded-full glass flex items-center justify-center text-gray-500 hover:text-[#FFB6C1] hover:bg-[#FFD1DC]/50 transition-all duration-300" href="#">
                            <span className="material-symbols-outlined text-lg">mail</span>
                        </a>
                    </div>
                </div>
                <div className="border-t border-white/40 mt-12 pt-8 text-center">
                    <p className="text-xs text-[#6B6B6B] font-light">© 2026 นาแห้ว โบทานิกส์ สงวนลิขสิทธิ์ • สร้างด้วย 💖 ในประเทศไทย</p>
                </div>
            </div>
        </footer>
    );
}
