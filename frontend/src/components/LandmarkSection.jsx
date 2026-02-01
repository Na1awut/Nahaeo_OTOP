import { useState } from 'react';

const models = [
    {
        id: 'phu-khao-ngom',
        name: 'ภูเก้าง้อม',
        subtitle: 'จุดชมวิว',
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBPwVSCggPDBPWEYIGLhjM-x0grnLvXDakHNgDYv9MGHV79uM-XN6gg3aL-AcoD_rgXUqGPz2rzQbcw3XuN2H5dJlY1lTmR13yLOEVMtoQKptzf3ZEthYmoVbu3Hm-Fq_QcqHwNrHd4WCQpooLpQSWEmULGt0T0bj8qNmBeMKnmd38hQJgr0KVmNS9mEet83h8vcPKg_ErCFTN51qHsTqxeTef0tLQPZIppMmEcJvxeLcLToopWxb2o9AC_0uETCXX4I1zXcp4c1OhP',
        modelImage: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBPwVSCggPDBPWEYIGLhjM-x0grnLvXDakHNgDYv9MGHV79uM-XN6gg3aL-AcoD_rgXUqGPz2rzQbcw3XuN2H5dJlY1lTmR13yLOEVMtoQKptzf3ZEthYmoVbu3Hm-Fq_QcqHwNrHd4WCQpooLpQSWEmULGt0T0bj8qNmBeMKnmd38hQJgr0KVmNS9mEet83h8vcPKg_ErCFTN51qHsTqxeTef0tLQPZIppMmEcJvxeLcLToopWxb2o9AC_0uETCXX4I1zXcp4c1OhP'
    },
    {
        id: 'wat-si-pho-chai',
        name: 'วัดศรีโพธิ์ชัย',
        subtitle: 'วัดเก่าแก่',
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCKJI5SZQaeOTaT6wk-3UO8QpU6QIbJocp_rsVH_0zn4_fSmMTBcND3HQrGk4LdFKD-a5KT_JGJ8QPrJfIdSvalYCR-MeOBK7TPWO1Pj6fpNRPtpRKpjD1JjKEfgwQGO_tC6HRYkKCK8TpFAJ0qeNCaSJgq1OwNPAmscwlh5g4A888PnW3gx2S53EGjPjbf92b5hz1DBO5_9fZUwSOa0-4qHNPA2W9jgQn6cWTSOgHSKaXoT_JcjvniaMDv8dG7roCa6Qi1EAVwBQF3',
        modelImage: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCCE7kfDXau4Ko8Oss4iGSTZhIhoJWRXH6GzJFOOXWfEQUy9Hi-GR67klZiHCqikj-kPCfsn6yjnggE7w8hprFBPuYG1-rjQOlVnhyNR4mUfMXbsBg97Q3G0Umi1GZho81x2ZFEDcix0dbfwghFcb2eiTJYkAlQuXCZMqVty0_oeMf9Un3iBZSpdrrUhvsDwfJh3C8hVpy1cGwzhQ5E06MGpahq7dSJQVdSqIwlA_Ei5SB5A9SKKtMe9Pbe_7JcJkJ-6eP0Y60InDiQ'
    },
    {
        id: 'ton-dok-mai',
        name: 'ต้นดอกไม้ยักษ์',
        subtitle: 'ประเพณีแห่ต้นดอกไม้',
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCRufQItL33eJ3E-xrzx4n6_6GMAm2mau6lIQ74C_dGokNRqPvHXmQ7f_VMBX37qO39F1GiOZLTu6Cz4ARXvSbmClMmem1KxDqdsvvHZYLQAy_l3XD3Gvk2dgWoHAFJKYRaxi3KZiTTrcovusQCW9g5z1OQvARC2-88PfSxHKPJ9Ms9MPIHll5TsxfWlwuyCPneXanGHmH1TFf-o8olUVbvgnqwiB5HrPTQfv5_XGPz_2WYpWYKjWmALq6mFidNYs6mMbkzKiLCIg_7',
        modelImage: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCRufQItL33eJ3E-xrzx4n6_6GMAm2mau6lIQ74C_dGokNRqPvHXmQ7f_VMBX37qO39F1GiOZLTu6Cz4ARXvSbmClMmem1KxDqdsvvHZYLQAy_l3XD3Gvk2dgWoHAFJKYRaxi3KZiTTrcovusQCW9g5z1OQvARC2-88PfSxHKPJ9Ms9MPIHll5TsxfWlwuyCPneXanGHmH1TFf-o8olUVbvgnqwiB5HrPTQfv5_XGPz_2WYpWYKjWmALq6mFidNYs6mMbkzKiLCIg_7'
    }
];

export default function LandmarkSection() {
    const [activeModel, setActiveModel] = useState('wat-si-pho-chai');

    const currentModel = models.find(m => m.id === activeModel) || models[1];

    return (
        <section id="ar" className="py-28 relative overflow-hidden">
            <div className="max-w-7xl mx-auto px-6">
                <div className="text-center mb-14">
                    <h2 className="font-display text-3xl md:text-4xl font-bold text-gray-900 mb-4">สำรวจจิตวิญญาณนาแห้วใน 3D</h2>
                    <p className="text-[#6B6B6B] font-light max-w-2xl mx-auto">
                        โต้ตอบกับมรดกดิจิทัล หมุน ซูม และค้นพบรายละเอียดสถาปัตยกรรมศักดิ์สิทธิ์ของเลย
                    </p>
                </div>

                {/* 3D Viewer Container */}
                <div className="glass-strong rounded-[2.5rem] p-5 md:p-8 shadow-soft relative overflow-hidden">
                    <div className="relative aspect-[16/9] md:aspect-[21/9] w-full flex items-center justify-center rounded-[2rem] overflow-hidden bg-gradient-to-b from-gray-100 to-gray-200 group cursor-grab active:cursor-grabbing">
                        <div className="absolute inset-0 bg-gradient-to-br from-[#FFD1DC]/10 via-transparent to-[#98FF98]/10"></div>
                        <img
                            alt={currentModel.name}
                            className="relative z-10 object-contain h-[85%] w-auto drop-shadow-2xl transition-transform duration-700 group-hover:scale-105"
                            src={currentModel.modelImage}
                        />

                        {/* Controls */}
                        <div className="absolute bottom-6 right-6 z-20 flex gap-3">
                            <button className="w-12 h-12 rounded-full glass-strong flex items-center justify-center text-gray-600 hover:text-[#FFB6C1] hover:bg-white transition-all duration-300">
                                <span className="material-symbols-outlined text-xl">open_in_full</span>
                            </button>
                            <button className="w-12 h-12 rounded-full glass-strong flex items-center justify-center text-gray-600 hover:text-[#FFB6C1] hover:bg-white transition-all duration-300">
                                <span className="material-symbols-outlined text-xl">view_in_ar</span>
                            </button>
                        </div>

                        {/* Rotating Badge */}
                        <div className="absolute top-6 left-6 z-20">
                            <div className="glass px-4 py-2 rounded-full text-sm font-medium text-gray-700 flex items-center gap-2">
                                <span className="material-symbols-outlined text-lg animate-spin" style={{ animationDuration: '20s' }}>sync</span>
                                หมุนอัตโนมัติ
                            </div>
                        </div>
                    </div>

                    {/* Model Selector */}
                    <div className="absolute bottom-12 left-0 right-0 flex justify-center z-30 px-4">
                        <div className="flex gap-3 p-2.5 rounded-2xl glass-strong shadow-soft overflow-x-auto max-w-full">
                            {models.map((model) => (
                                <button
                                    key={model.id}
                                    onClick={() => setActiveModel(model.id)}
                                    className={`flex items-center gap-3 px-3 py-2 pr-5 rounded-xl transition-all shrink-0 ${activeModel === model.id
                                            ? 'bg-white/80 shadow-sm'
                                            : 'hover:bg-white/60'
                                        }`}
                                >
                                    <div className={`w-12 h-12 rounded-xl overflow-hidden shadow-sm ${activeModel === model.id ? 'bg-[#FFD1DC]/30' : 'bg-gray-200'
                                        }`}>
                                        <img alt={model.name} className="w-full h-full object-cover" src={model.image} />
                                    </div>
                                    <div className="text-left hidden sm:block">
                                        <div className={`text-sm font-${activeModel === model.id ? 'bold' : 'semibold'} ${activeModel === model.id ? 'text-gray-900' : 'text-gray-800'
                                            }`}>{model.name}</div>
                                        <div className={`text-xs ${activeModel === model.id ? 'text-[#FFB6C1]' : 'text-[#6B6B6B]'}`}>
                                            {model.subtitle}
                                        </div>
                                    </div>
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
