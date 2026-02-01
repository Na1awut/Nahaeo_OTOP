# 📁 โครงสร้างโปรเจค Na Haeo Botanics

## โครงสร้างไฟล์

```
nahaeo/
├── landing_page.html          # หน้าเว็บหลัก
├── assets/                    # ไฟล์ทรัพยากรทั้งหมด
│   ├── models/               # โมเดล 3D (.glb, .gltf, .usdz)
│   │   ├── wat-si-pho-chai/  # วัดศรีโพธิ์ชัย
│   │   ├── phu-khao-ngom/    # ภูเก้าง้อม
│   │   ├── ton-dok-mai/      # ต้นดอกไม้ยักษ์
│   │   └── products/         # สินค้า
│   │       ├── rose-petal/   # ลิปบาล์ม กลีบกุหลาบ
│   │       ├── peach-honey/  # ลิปบาล์ม พีชน้ำผึ้ง
│   │       └── fresh-mint/   # ลิปบาล์ม มิ้นต์สดชื่น
│   ├── images/               # รูปภาพ
│   │   ├── landmarks/        # รูปสถานที่
│   │   └── products/         # รูปสินค้า
│   └── videos/               # วิดีโอ
└── .agent/                   # ไฟล์ AI skill
```

## การใช้งานโมเดล 3D

### รูปแบบไฟล์ที่รองรับ
- `.glb` - สำหรับ Web (แนะนำ)
- `.gltf` - สำหรับ Web
- `.usdz` - สำหรับ iOS AR Quick Look

### ตัวอย่างการใส่โมเดล
```html
<model-viewer 
    src="./assets/models/wat-si-pho-chai/model.glb"
    ios-src="./assets/models/wat-si-pho-chai/model.usdz"
    alt="วัดศรีโพธิ์ชัย"
    ar
    ar-modes="webxr scene-viewer quick-look"
    camera-controls>
</model-viewer>
```

## สถานที่สำคัญ

| โฟลเดอร์ | สถานที่ | รายละเอียด |
|---------|--------|-----------|
| `wat-si-pho-chai` | วัดศรีโพธิ์ชัย | วัดเก่าแก่สไตล์ล้านช้าง |
| `phu-khao-ngom` | ภูเก้าง้อม | จุดชมวิวที่สวยงาม |
| `ton-dok-mai` | ต้นดอกไม้ | ประเพณีแห่ต้นดอกไม้ประเพณี 400 ปี |

## สินค้า

| โฟลเดอร์ | สินค้า | กลิ่น |
|---------|-------|------|
| `rose-petal` | Na Haeo Botanics | กลีบกุหลาบ |
| `peach-honey` | Na Haeo Creamy | พีชน้ำผึ้ง |
| `fresh-mint` | Na Haeo Mint | มิ้นต์สดชื่น |

---

> 📌 **หมายเหตุ:** เมื่อมีโมเดล 3D พร้อม ให้วางไฟล์ในโฟลเดอร์ที่เกี่ยวข้อง
> แล้วอัปเดต path ใน `landing_page.html`
