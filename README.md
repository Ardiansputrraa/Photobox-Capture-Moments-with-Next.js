# 📸 PhotoBox — Aesthetic Photo Booth Web App

<div align="center">

![PhotoBox Banner](https://img.shields.io/badge/PhotoBox-Aesthetic%20Photo%20Booth-ff69b4?style=for-the-badge&logo=camera&logoColor=white)

**Aplikasi photo booth berbasis browser yang aesthetic, modern, dan powerful.**  
Ambil foto langsung dari webcam, pilih frame & filter cantik, lalu download hasilnya sebagai photo strip!

[![Next.js](https://img.shields.io/badge/Next.js-16.2.4-black?style=flat-square&logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19.2.4-61DAFB?style=flat-square&logo=react)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178C6?style=flat-square&logo=typescript)](https://www.typescriptlang.org/)
[![TailwindCSS](https://img.shields.io/badge/Tailwind-v4-38BDF8?style=flat-square&logo=tailwindcss)](https://tailwindcss.com/)
[![License](https://img.shields.io/badge/License-MIT-green?style=flat-square)](LICENSE)

</div>

---

## ✨ Fitur Utama

| Fitur | Deskripsi |
|---|---|
| 📷 **Live Camera** | Preview webcam real-time dengan mirror mode yang bisa diaktifkan/matikan |
| 🎞️ **Grid Templates** | 5 template layout foto: Classic Strip, Triple Strip, 2×2 Grid, Duo, Trio L-Shape |
| 🌸 **Cute Frames** | 6 pilihan frame aesthetic: No Frame, Pastel Dream, Retro Film, Minimal, Floral Garden, Y2K Glam |
| 🎨 **Photo Filters** | 7 filter kamera: Original, B&W, Vintage, Warm, Cool, Vivid, Soft |
| ⏱️ **Countdown Timer** | Countdown 3 detik sebelum shutter — cukup waktu untuk pose! |
| ⚡ **Instant Download** | Generate dan download photo strip berkualitas tinggi sebagai file PNG |
| 🗑️ **Photo Management** | Klik thumbnail foto untuk menghapus & ambil ulang foto tertentu |

---

## 🖼️ Screenshot

> Jalankan aplikasi dengan `npm run dev` dan buka `http://localhost:3000` untuk melihat tampilan lengkap.

### Halaman Utama (Landing Page)
- Hero section dengan animasi floating photo strip
- Section fitur dengan card glass morphism
- CTA untuk langsung mulai foto

### Halaman Photobox (`/photobox`)
- Preview kamera live di sisi kiri
- Panel pilihan template, frame, dan filter
- Shutter button dengan progress indicator
- Photo strip preview real-time di sisi kanan

---

## 🗂️ Struktur Proyek

```
photobox-app/
├── src/
│   ├── app/
│   │   ├── layout.tsx              # Root layout (font, metadata)
│   │   ├── globals.css             # Global styles & design tokens
│   │   ├── page.tsx                # Landing page (/)
│   │   └── photobox/
│   │       └── page.tsx            # Halaman utama photobox (/photobox)
│   │
│   ├── components/
│   │   └── photobox/
│   │       ├── CameraView.tsx      # Komponen live webcam preview
│   │       ├── CountdownOverlay.tsx # Overlay countdown timer
│   │       ├── FilterPicker.tsx    # Picker filter foto
│   │       ├── FramePicker.tsx     # Picker frame/template strip
│   │       ├── PhotoStrip.tsx      # Preview & download photo strip
│   │       ├── ShutterButton.tsx   # Tombol shutter dengan progress
│   │       └── TemplatePicker.tsx  # Picker layout grid foto
│   │
│   ├── hooks/
│   │   ├── useCamera.ts            # Hook: akses & kontrol webcam
│   │   ├── useCountdown.ts         # Hook: countdown timer
│   │   └── usePhotoCapture.ts      # Hook: capture foto & generate strip
│   │
│   └── lib/
│       ├── canvas.ts               # Utility: render photo strip ke canvas
│       ├── filters.ts              # Konfigurasi & definisi filter CSS
│       ├── frames.ts               # Konfigurasi & definisi frame/sticker
│       └── templates.ts            # Konfigurasi layout grid & canvas
│
├── public/                         # Aset statis
├── next.config.ts                  # Konfigurasi Next.js
├── tailwind.config.ts              # Konfigurasi Tailwind CSS v4
├── tsconfig.json                   # Konfigurasi TypeScript
└── package.json
```

---

## 🚀 Getting Started

### Prasyarat

Pastikan kamu sudah menginstal:
- **Node.js** versi `18.x` atau lebih baru
- **npm** versi `9.x` atau lebih baru (atau bisa menggunakan `yarn` / `pnpm`)

### Instalasi

```bash
# 1. Clone repository ini
git clone https://github.com/username/photobox-app.git

# 2. Masuk ke direktori proyek
cd photobox-app

# 3. Install semua dependensi
npm install
```

### Menjalankan Development Server

```bash
npm run dev
```

Buka browser dan akses **[http://localhost:3000](http://localhost:3000)**.

### Build untuk Produksi

```bash
# Build production bundle
npm run build

# Jalankan server produksi
npm run start
```

### Lint

```bash
npm run lint
```

---

## 🧩 Komponen & Arsitektur

### Halaman (`src/app/`)

| File | Rute | Deskripsi |
|---|---|---|
| `page.tsx` | `/` | Landing page dengan hero, fitur, dan CTA |
| `photobox/page.tsx` | `/photobox` | Aplikasi photo booth utama |

### Komponen (`src/components/photobox/`)

| Komponen | Deskripsi |
|---|---|
| `CameraView` | Menampilkan live feed dari webcam. Mengelola state loading dan error. Memiliki tombol flip/mirror. |
| `CountdownOverlay` | Overlay fullscreen yang menampilkan hitungan mundur (3, 2, 1) dengan animasi. |
| `ShutterButton` | Tombol utama untuk mengambil foto dengan progress ring yang menunjukkan berapa foto sudah diambil. |
| `TemplatePicker` | Selector layout grid (strip, 2x2, duo, dll). Mengganti template akan me-reset semua foto. |
| `FramePicker` | Selector frame/tema strip (Pastel, Retro, Y2K, dll) yang mempengaruhi warna dan stiker. |
| `FilterPicker` | Selector filter foto dengan preview dari foto pertama yang sudah diambil sebagai thumbnail. |
| `PhotoStrip` | Menampilkan thumbnail foto yang sudah diambil, tombol generate strip, dan hasil akhir untuk didownload. |

### Custom Hooks (`src/hooks/`)

#### `useCamera`
Mengelola seluruh lifecycle webcam:
- Meminta izin kamera dari browser (`getUserMedia`)
- Menyediakan `videoRef` untuk dihubungkan ke elemen `<video>`
- `startCamera()` — mulai stream kamera
- `stopCamera()` — hentikan stream & bebaskan resource
- `toggleMirror()` — balik tampilan horizontal
- Auto-cleanup stream saat komponen unmount

#### `useCountdown`
Timer countdown yang bisa dipakai ulang:
- `start(seconds)` — mulai countdown, mengembalikan Promise yang resolve saat selesai
- `count` — angka hitungan saat ini
- `isActive` — apakah countdown sedang berjalan

#### `usePhotoCapture`
Mengelola proses pengambilan dan pemrosesan foto:
- `capturePhoto()` — capture frame dari video ke canvas, lalu apply filter
- `generateStrip()` — merender semua foto ke canvas final dengan frame & stiker
- `removePhoto(index)` — hapus foto pada index tertentu
- `reset()` — kosongkan semua foto dan strip
- `photos` — array data URL foto yang sudah diambil
- `stripDataUrl` — data URL PNG final dari photo strip

### Library (`src/lib/`)

#### `filters.ts`
Mendefinisikan 7 filter foto menggunakan CSS `filter` property:

| ID | Label | CSS Filter |
|---|---|---|
| `none` | Original | - |
| `grayscale` | B&W | `grayscale(100%)` |
| `vintage` | Vintage | `sepia(60%) contrast(1.1) brightness(0.95)` |
| `warm` | Warm | `saturate(1.3) hue-rotate(-15deg) brightness(1.05)` |
| `cool` | Cool | `saturate(0.9) hue-rotate(20deg) brightness(1.05)` |
| `vivid` | Vivid | `saturate(1.8) contrast(1.1)` |
| `soft` | Soft | `brightness(1.1) contrast(0.9) saturate(0.8)` |

#### `frames.ts`
Mendefinisikan 6 tema frame untuk photo strip:

| ID | Label | Tema |
|---|---|---|
| `none` | No Frame | Polos putih |
| `pastel` | Pastel Dream 🌸 | Pink soft dengan stiker bunga |
| `retro` | Retro Film 📷 | Kuning vintage dengan stiker kamera |
| `minimal` | Minimal 🤍 | Abu-abu bersih dengan simbol geometri |
| `floral` | Floral Garden 🌿 | Hijau segar dengan stiker tumbuhan |
| `y2k` | Y2K Glam 💜 | Ungu cerah dengan stiker galaksi |

#### `templates.ts`
Mendefinisikan 5 layout grid foto beserta ukuran canvas output:

| ID | Label | Jumlah Foto | Ukuran Canvas |
|---|---|---|---|
| `strip-4` | Classic Strip | 4 | 360 × 1080 px |
| `strip-3` | Triple Strip | 3 | 360 × 900 px |
| `grid-2x2` | Grid 2×2 | 4 | 720 × 720 px |
| `duo` | Duo | 2 | 720 × 400 px |
| `trio-l` | Trio L-Shape | 3 | 720 × 720 px |

#### `canvas.ts`
Utility untuk merender photo strip ke elemen `<canvas>` HTML:
- Menggambar background frame (warna, border)
- Merender setiap foto ke slot canvas yang sesuai
- Menambahkan stiker dekoratif dari konfigurasi frame
- Menambahkan label/watermark di bagian bawah strip
- Mengeksport hasil sebagai data URL PNG

---

## 🎨 Design System

Proyek ini menggunakan **Tailwind CSS v4** dengan design system yang konsisten:

### Warna Utama
- **Primary Gradient**: `from-pink-500 to-violet-500`
- **Background**: Soft white dengan blur gradient dekoratif
- **Glass Morphism**: `backdrop-blur` + `bg-white/60` + `border border-white/40`

### Font
- **Outfit** — digunakan untuk heading, tombol, dan branding
- **Inter / System Font** — untuk body text

### Animasi
- `animate-slide-up` — elemen masuk dari bawah ke atas
- `animate-float` — efek mengambang naik-turun (pada preview strip)
- `animate-shutter` — flash putih saat mengambil foto
- `animate-spin` — loading spinner kamera

---

## 📋 Alur Penggunaan

```
1. Buka aplikasi → Landing Page
       ↓
2. Klik "Mulai Photobox" → Halaman /photobox
       ↓
3. Izinkan akses kamera di browser
       ↓
4. Pilih Template (Classic Strip / Grid 2×2 / Duo / dll)
       ↓
5. Pilih Frame (Pastel / Retro / Y2K / dll)
       ↓
6. Pilih Filter (Vintage / Warm / B&W / dll)
       ↓
7. Klik Shutter → Countdown 3 detik → Foto diambil
   (Ulangi sampai semua slot foto terisi)
       ↓
8. Klik "Generate Strip" → Strip PNG dibuat
       ↓
9. Klik "Download" → File tersimpan di komputer
```

---

## 🔒 Izin Browser

Aplikasi ini memerlukan **izin akses kamera** dari browser. Pastikan:
- Browser mendukung `MediaDevices.getUserMedia` (semua browser modern ✅)
- Akses kamera diizinkan saat prompt muncul
- Jika menggunakan HTTPS (produksi), kamera akan otomatis tersedia
- Di `localhost`, kamera juga tersedia tanpa HTTPS

---

## 🛠️ Tech Stack

| Teknologi | Versi | Fungsi |
|---|---|---|
| [Next.js](https://nextjs.org/) | 16.2.4 | React framework (App Router) |
| [React](https://reactjs.org/) | 19.2.4 | UI library |
| [TypeScript](https://www.typescriptlang.org/) | 5.x | Type safety |
| [Tailwind CSS](https://tailwindcss.com/) | v4 | Utility-first styling |
| [Lucide React](https://lucide.dev/) | 1.8.x | Icon library |

---

## 🤝 Kontribusi

Kontribusi sangat diterima! Berikut langkah untuk berkontribusi:

```bash
# 1. Fork repository ini
# 2. Buat branch fitur baru
git checkout -b feature/nama-fitur-kamu

# 3. Commit perubahan
git commit -m "feat: tambah fitur xyz"

# 4. Push ke branch kamu
git push origin feature/nama-fitur-kamu

# 5. Buat Pull Request
```

### Ide Pengembangan
- [ ] Tambah lebih banyak template grid (Polaroid, Widescreen, dll)
- [ ] Tambah stiker/emoji overlay yang bisa ditarik ke foto
- [ ] Dukungan kamera depan/belakang di perangkat mobile
- [ ] Opsi share langsung ke media sosial
- [ ] Simpan foto ke galeri lokal (localStorage)
- [ ] Dark mode toggle

---

## 📝 Lisensi

Proyek ini dilisensikan di bawah **MIT License** — bebas digunakan, dimodifikasi, dan didistribusikan.

---

<div align="center">

Made with ♥ by **Ardian**

⭐ Jika proyek ini bermanfaat, jangan lupa beri bintang!

</div>
