import React from 'react';
import { ShieldCheck, Heart } from 'lucide-react';

interface FooterProps {
  onOpenLegal: (type: 'about' | 'terms' | 'privacy' | 'contact') => void;
  onNavigate: (sectionId: string) => void;
  onOpenAdmin: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenLegal, onNavigate, onOpenAdmin }) => {
  return (
    <footer className="bg-slate-900 text-slate-400 text-sm border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-10">
          {/* Brand Col */}
          <div className="md:col-span-2 space-y-3">
            <div className="flex items-center gap-2">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-emerald-500 to-teal-400 flex items-center justify-center text-white text-lg font-bold">
                🎬
              </div>
              <span className="text-lg font-bold text-white">
                ভিডিও দেখে আয় করুন
              </span>
            </div>
            <p className="text-xs text-slate-400 max-w-sm leading-relaxed">
              অনুমোদিত ভিডিও টাস্ক সম্পূর্ণ করে প্রতিদিন রিওয়ার্ড সংগ্রহ করুন এবং ন্যূনতম ৳৩০০ ব্যালেন্স হলে সরাসরি বিকাশ, নগদ অথবা রকেটে দ্রুত পেমেন্ট উত্তোলন করুন।
            </p>
            <div className="pt-2 flex items-center gap-2 text-xs text-emerald-400 font-medium">
              <ShieldCheck className="w-4 h-4" />
              <span>১০০% বিশ্বস্ত ও নিরাপদ আর্নিং প্ল্যাটফর্ম</span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-200 mb-3">
              কুইক মেনু (Quick Links)
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button
                  onClick={() => onNavigate('home')}
                  className="hover:text-emerald-400 transition cursor-pointer"
                >
                  হোম (Home)
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('videos')}
                  className="hover:text-emerald-400 transition cursor-pointer"
                >
                  ভিডিও টাস্ক (Videos)
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('balance')}
                  className="hover:text-emerald-400 transition cursor-pointer"
                >
                  আমার ব্যালেন্স (My Balance)
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('referral')}
                  className="hover:text-emerald-400 transition cursor-pointer"
                >
                  রেফারেল প্রোগ্রাম (Referral)
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('withdraw')}
                  className="hover:text-emerald-400 transition cursor-pointer"
                >
                  টাকা উত্তোলন (Withdraw)
                </button>
              </li>
            </ul>
          </div>

          {/* Policies & Support */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-200 mb-3">
              নীতিমালা ও সাপোর্ট
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button
                  id="footer-link-about"
                  onClick={() => onOpenLegal('about')}
                  className="hover:text-emerald-400 transition cursor-pointer"
                >
                  About (আমাদের সম্পর্কে)
                </button>
              </li>
              <li>
                <button
                  id="footer-link-terms"
                  onClick={() => onOpenLegal('terms')}
                  className="hover:text-emerald-400 transition cursor-pointer"
                >
                  Terms (শর্তাবলী)
                </button>
              </li>
              <li>
                <button
                  id="footer-link-privacy"
                  onClick={() => onOpenLegal('privacy')}
                  className="hover:text-emerald-400 transition cursor-pointer"
                >
                  Privacy Policy (গোপনীয়তা নীতি)
                </button>
              </li>
              <li>
                <button
                  id="footer-link-contact"
                  onClick={() => onOpenLegal('contact')}
                  className="hover:text-emerald-400 transition cursor-pointer"
                >
                  Contact (যোগাযোগ / সাপোর্ট)
                </button>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Copyright with Admin Link */}
        <div className="pt-8 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p
            id="footer-copyright-text"
            className="cursor-default select-none"
          >
            © 2026 ভিডিও দেখে আয় করুন. সর্বস্বত্ব সংরক্ষিত (Copyright All Rights Reserved).
          </p>

          <div className="flex items-center gap-4">
            <button
              id="footer-admin-login-btn"
              onClick={onOpenAdmin}
              className="px-3 py-1 bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-emerald-400 rounded-lg text-[11px] font-semibold transition cursor-pointer border border-slate-700/60 flex items-center gap-1.5"
            >
              <span>🔒 এডমিন কন্ট্রোল (Admin)</span>
            </button>
            <div className="flex items-center gap-1 text-slate-500">
              <span>Made with</span>
              <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" />
              <span>for Bangladesh</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
