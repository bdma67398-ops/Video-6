import React from 'react';
import { PlayCircle, Sparkles, CheckCircle2, ShieldCheck, Zap, ArrowRight, Gift } from 'lucide-react';

interface HeroSectionProps {
  onStartEarning: () => void;
  onWatchVideos: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onStartEarning,
  onWatchVideos,
}) => {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-emerald-50/70 via-teal-50/30 to-white pt-10 pb-12 sm:pt-16 sm:pb-20 border-b border-emerald-100/60">
      {/* Decorative backdrop elements */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-emerald-200/30 rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute bottom-0 left-1/3 w-80 h-80 bg-teal-200/25 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Top verified trust chip */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-100/80 border border-emerald-200 text-emerald-800 text-xs sm:text-sm font-semibold mb-6 shadow-xs">
          <Sparkles className="w-4 h-4 text-emerald-600 animate-pulse" />
          <span>দৈনিক ভিডিও টাস্ক ও ইনস্ট্যান্ট রিওয়ার্ড প্ল্যাটফর্ম ২০২৬</span>
        </div>

        {/* Main Hero Headline */}
        <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 tracking-tight leading-tight sm:leading-tight mb-5 max-w-4xl mx-auto">
          ভিডিও দেখুন, <span className="bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-700 bg-clip-text text-transparent">Task সম্পূর্ণ করুন</span>, Reward পান
        </h1>

        {/* Small Description */}
        <p className="text-base sm:text-xl text-slate-600 max-w-2xl mx-auto mb-8 sm:mb-10 font-normal leading-relaxed">
          অনুমোদিত ভিডিও task সম্পূর্ণ করে reward সংগ্রহ করুন।
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 max-w-md mx-auto mb-10">
          <button
            id="hero-start-earning-btn"
            onClick={onStartEarning}
            className="w-full sm:w-auto px-8 py-3.5 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-bold text-base rounded-xl shadow-lg shadow-emerald-600/30 hover:shadow-emerald-600/40 transform hover:-translate-y-0.5 transition duration-200 flex items-center justify-center gap-2 cursor-pointer"
          >
            <Gift className="w-5 h-5" />
            <span>Start Earning</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          <button
            id="hero-watch-videos-btn"
            onClick={onWatchVideos}
            className="w-full sm:w-auto px-7 py-3.5 bg-white hover:bg-slate-50 text-slate-800 font-bold text-base rounded-xl border border-slate-200 hover:border-emerald-300 shadow-xs hover:shadow-md transition duration-200 flex items-center justify-center gap-2 cursor-pointer"
          >
            <PlayCircle className="w-5 h-5 text-emerald-600" />
            <span>Watch Videos</span>
          </button>
        </div>

        {/* Feature Highlights Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-3xl mx-auto text-left">
          <div className="bg-white/80 backdrop-blur-xs p-4 rounded-xl border border-emerald-100 shadow-xs flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-emerald-50 flex items-center justify-center text-emerald-600 shrink-0">
              <Zap className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-slate-900">৫-১০ সেকেন্ড ভিডিও</h4>
              <p className="text-xs text-slate-500">দ্রুত ও সহজ ভিডিও টাস্ক</p>
            </div>
          </div>

          <div className="bg-white/80 backdrop-blur-xs p-4 rounded-xl border border-emerald-100 shadow-xs flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-teal-50 flex items-center justify-center text-teal-600 shrink-0">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-slate-900">bKash / Nagad পেমেন্ট</h4>
              <p className="text-xs text-slate-500">ন্যূনতম ৳৩০০ তে উইথড্র</p>
            </div>
          </div>

          <div className="bg-white/80 backdrop-blur-xs p-4 rounded-xl border border-emerald-100 shadow-xs flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-amber-50 flex items-center justify-center text-amber-600 shrink-0">
              <CheckCircle2 className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-slate-900">রেফারেল বোনাস</h4>
              <p className="text-xs text-slate-500">২০ ভ্যালিড রেফারে উইথড্র আনলক</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
