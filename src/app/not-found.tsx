import Link from "next/link";
import { Camera, Home, Sparkles } from "lucide-react";

export default function NotFound() {
  return (
    <main className="min-h-screen flex items-center justify-center px-6 overflow-hidden">
      {/* Background decoration */}
      <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-96 h-96 rounded-full bg-gradient-to-br from-pink-300/30 to-violet-300/30 blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-96 h-96 rounded-full bg-gradient-to-tr from-amber-200/30 to-pink-200/30 blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-gradient-to-br from-violet-100/20 to-pink-100/20 blur-3xl" />
      </div>

      <div className="relative z-10 max-w-xl mx-auto text-center">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass border border-pink-200 text-sm text-pink-500 font-medium mb-6 animate-slide-up">
          <Sparkles className="w-4 h-4" />
          Halaman tidak ditemukan
        </div>

        <h1
          className="font-outfit font-extrabold text-7xl md:text-9xl leading-none mb-4 animate-slide-up"
          style={{ animationDelay: "0.1s" }}
        >
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-violet-500 to-pink-400">
            4
          </span>
          <span className="inline-block animate-float">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-violet-500 to-pink-400">
              0
            </span>
          </span>
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-violet-500 to-pink-400">
            4
          </span>
        </h1>

        <div
          className="text-6xl mb-6 animate-slide-up"
          style={{ animationDelay: "0.2s" }}
        >
          📸
        </div>

        <h2
          className="font-outfit font-bold text-3xl md:text-4xl mb-4 animate-slide-up"
          style={{ animationDelay: "0.3s" }}
        >
          Halaman Tidak Ditemukan
        </h2>

        <p
          className="text-lg text-[var(--text-muted)] mb-10 animate-slide-up"
          style={{ animationDelay: "0.4s" }}
        >
          Sepertinya halaman yang kamu cari sudah hilang atau pindah.
          Yuk balik ke beranda dan mulai foto!
        </p>

        <div
          className="flex flex-col sm:flex-row gap-4 justify-center animate-slide-up"
          style={{ animationDelay: "0.5s" }}
        >
          <Link
            href="/"
            className="group px-8 py-4 rounded-2xl bg-gradient-to-r from-pink-500 to-violet-500 text-white font-outfit font-bold text-lg shadow-2xl shadow-pink-200 hover:shadow-pink-300 hover:scale-105 transition-all duration-300 flex items-center justify-center gap-3"
          >
            <Home className="w-5 h-5 group-hover:-rotate-12 transition-transform" />
            Kembali ke Beranda
          </Link>
          <Link
            href="/photobox"
            className="px-8 py-4 rounded-2xl glass border border-pink-200 text-pink-500 font-outfit font-semibold text-lg hover:bg-pink-50 transition-all duration-200 flex items-center justify-center gap-2"
          >
            <Camera className="w-5 h-5" />
            Mulai Photobox
          </Link>
        </div>
      </div>
    </main>
  );
}
