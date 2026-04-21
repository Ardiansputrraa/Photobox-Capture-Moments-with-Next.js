import Link from "next/link";
import { Camera, Sparkles, Star, Heart, Zap } from "lucide-react";

const features = [
  {
    icon: <Camera className="w-6 h-6" />,
    title: "Live Camera",
    desc: "Preview webcam real-time dengan mirror mode",
    color: "from-pink-400 to-rose-400",
  },
  {
    icon: <Sparkles className="w-6 h-6" />,
    title: "Grid Templates",
    desc: "5 template grid: Strip, 2×2, 3×1, L-Shape, dan Free",
    color: "from-violet-400 to-purple-500",
  },
  {
    icon: <Star className="w-6 h-6" />,
    title: "Cute Frames",
    desc: "Frame aesthetic: Pastel, Retro, Minimal, Floral, Y2K",
    color: "from-amber-400 to-orange-400",
  },
  {
    icon: <Heart className="w-6 h-6" />,
    title: "Filters",
    desc: "Filter kamera: Vintage, B&W, Warm, Cool, Vivid",
    color: "from-teal-400 to-cyan-400",
  },
  {
    icon: <Zap className="w-6 h-6" />,
    title: "Instant Download",
    desc: "Download hasil foto sebagai PNG langsung",
    color: "from-fuchsia-400 to-pink-500",
  },
];

const sampleStrips = [
  { colors: ["#fecdd3", "#fed7aa", "#fde68a", "#d9f99d"], label: "Pastel Vibes" },
  { colors: ["#e0e7ff", "#ddd6fe", "#fbcfe8", "#bfdbfe"], label: "Cotton Candy" },
  { colors: ["#fef9c3", "#fde68a", "#fcd34d", "#fbbf24"], label: "Sunny Day" },
];

export default function HomePage() {
  return (
    <main className="min-h-screen overflow-hidden">
      {/* Background decoration */}
      <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-96 h-96 rounded-full bg-gradient-to-br from-pink-300/30 to-violet-300/30 blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-96 h-96 rounded-full bg-gradient-to-tr from-amber-200/30 to-pink-200/30 blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-gradient-to-br from-violet-100/20 to-pink-100/20 blur-3xl" />
      </div>

      {/* Header */}
      <header className="relative z-10 flex items-center justify-between px-6 py-5 max-w-6xl mx-auto">
        <div className="flex items-center gap-2">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-pink-500 to-violet-500 flex items-center justify-center shadow-lg">
            <Camera className="w-5 h-5 text-white" />
          </div>
          <span className="font-outfit font-bold text-xl text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-violet-500">
            PhotoBox
          </span>
        </div>
        <Link
          href="/photobox"
          id="header-cta-btn"
          className="px-4 py-2 rounded-full bg-gradient-to-r from-pink-500 to-violet-500 text-white text-sm font-semibold shadow-lg shadow-pink-200 hover:shadow-pink-300 hover:scale-105 transition-all duration-200"
        >
          Mulai Foto →
        </Link>
      </header>

      {/* Hero Section */}
      <section className="relative z-10 max-w-6xl mx-auto px-6 pt-12 pb-20 text-center">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass border border-pink-200 text-sm text-pink-500 font-medium mb-6 animate-slide-up">
          <Sparkles className="w-4 h-4" />
          Aesthetic Photo Booth Experience
        </div>

        <h1 className="font-outfit font-extrabold text-5xl md:text-7xl leading-tight mb-6 animate-slide-up"
          style={{ animationDelay: "0.1s" }}>
          Foto Bareng,{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-violet-500 to-pink-400">
            Kenangan
          </span>
          <br />
          Selamanya ✨
        </h1>

        <p className="text-lg text-[var(--text-muted)] max-w-xl mx-auto mb-10 animate-slide-up"
          style={{ animationDelay: "0.2s" }}>
          Photobox aesthetic langsung dari browser. Pilih grid template, frame lucu,
          filter cantik — terus download hasilnya!
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center animate-slide-up" style={{ animationDelay: "0.3s" }}>
          <Link
            href="/photobox"
            id="hero-start-btn"
            className="group px-8 py-4 rounded-2xl bg-gradient-to-r from-pink-500 to-violet-500 text-white font-outfit font-bold text-lg shadow-2xl shadow-pink-200 hover:shadow-pink-300 hover:scale-105 transition-all duration-300 flex items-center justify-center gap-3"
          >
            <Camera className="w-5 h-5 group-hover:rotate-12 transition-transform" />
            Mulai Photobox
          </Link>
          <a
            href="#features"
            id="hero-features-btn"
            className="px-8 py-4 rounded-2xl glass border border-pink-200 text-pink-500 font-outfit font-semibold text-lg hover:bg-pink-50 transition-all duration-200 flex items-center justify-center gap-2"
          >
            Lihat Fitur ↓
          </a>
        </div>

        {/* Sample strips preview */}
        <div className="mt-20 flex justify-center gap-6 animate-slide-up" style={{ animationDelay: "0.4s" }}>
          {sampleStrips.map((strip, i) => (
            <div
              key={i}
              className="animate-float group"
              style={{ animationDelay: `${i * 0.5}s` }}
            >
              <div className="relative w-24 rounded-2xl overflow-hidden shadow-xl shadow-pink-200/50 border-4 border-white hover:scale-105 transition-transform duration-300">
                {strip.colors.map((color, j) => (
                  <div
                    key={j}
                    className="w-full h-16 flex items-center justify-center"
                    style={{ backgroundColor: color }}
                  >
                    <Camera className="w-6 h-6 text-white/70" />
                  </div>
                ))}
                <div className="py-2 bg-white text-center">
                  <p className="text-[10px] font-outfit font-semibold text-pink-400">{strip.label}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="relative z-10 max-w-6xl mx-auto px-6 py-20">
        <div className="text-center mb-14">
          <h2 className="font-outfit font-bold text-4xl mb-3">
            Semua yang Kamu Butuhkan 🎁
          </h2>
          <p className="text-[var(--text-muted)]">Fitur lengkap, desain aesthetic, gratis selamanya</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((f, i) => (
            <div
              key={i}
              className="glass rounded-2xl p-6 hover:scale-[1.02] hover:shadow-xl hover:shadow-pink-100 transition-all duration-300 group"
            >
              <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${f.color} flex items-center justify-center text-white mb-4 shadow-lg group-hover:scale-110 transition-transform`}>
                {f.icon}
              </div>
              <h3 className="font-outfit font-bold text-lg mb-2">{f.title}</h3>
              <p className="text-sm text-[var(--text-muted)] leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Bottom */}
      <section className="relative z-10 max-w-6xl mx-auto px-6 py-20 text-center">
        <div className="glass rounded-3xl p-12 border border-pink-100 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-pink-50/50 to-violet-50/50" />
          <div className="relative z-10">
            <div className="text-5xl mb-4">📸</div>
            <h2 className="font-outfit font-bold text-4xl mb-4">Siap Bikin Kenangan?</h2>
            <p className="text-[var(--text-muted)] mb-8">Langsung buka kamera dan mulai foto sekarang!</p>
            <Link
              href="/photobox"
              id="bottom-cta-btn"
              className="inline-flex items-center gap-3 px-10 py-4 rounded-2xl bg-gradient-to-r from-pink-500 to-violet-500 text-white font-outfit font-bold text-xl shadow-2xl shadow-pink-200 hover:scale-105 hover:shadow-pink-300 transition-all duration-300"
            >
              <Camera className="w-6 h-6" />
              Mulai Sekarang
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 text-center py-8 text-sm text-[var(--text-muted)]">
        <p>Made with <span className="text-pink-400">♥</span> — PhotoBox Aesthetic ✨</p>
      </footer>
    </main>
  );
}
