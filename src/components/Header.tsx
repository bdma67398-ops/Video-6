import React, { useState, useRef } from 'react';
import { PlayCircle, Wallet, Users, ArrowDownToLine, Menu, X, LogIn, LogOut, Sparkles, CheckCircle2 } from 'lucide-react';
import { UserProfile } from '../types';

interface HeaderProps {
  user: UserProfile;
  onOpenAuth: () => void;
  onLogout: () => void;
  onNavigate: (sectionId: string) => void;
  activeSection: string;
  onOpenAdmin: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  user,
  onOpenAuth,
  onLogout,
  onNavigate,
  activeSection,
  onOpenAdmin,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const secretClickCountRef = useRef(0);
  const secretClickTimerRef = useRef<NodeJS.Timeout | null>(null);

  const handleSecretLogoClick = () => {
    secretClickCountRef.current += 1;
    if (secretClickTimerRef.current) clearTimeout(secretClickTimerRef.current);
    
    if (secretClickCountRef.current >= 4) {
      secretClickCountRef.current = 0;
      onOpenAdmin();
      return;
    }
    
    secretClickTimerRef.current = setTimeout(() => {
      secretClickCountRef.current = 0;
    }, 1500);

    handleNavClick('home');
  };

  const navItems = [
    { id: 'home', label: 'Home', bangla: 'হোম' },
    { id: 'videos', label: 'Videos', bangla: '🎬 সরাসরি ভিডিও' },
    { id: 'country-videos', label: '20 Country Videos', bangla: '🌍 ২০ দেশের ভিডিও' },
    { id: 'promo-offers', label: 'Special Offers', bangla: '🔥 স্পেশাল অফার' },
    { id: 'balance', label: 'My Balance', bangla: 'আমার ব্যালেন্স' },
    { id: 'referral', label: 'Referral', bangla: 'রেফারেল' },
    { id: 'withdraw', label: 'Withdraw', bangla: 'উত্তোলন' },
  ];

  const handleNavClick = (id: string) => {
    onNavigate(id);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-emerald-100 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          {/* Logo with secret multi-click trigger for admin */}
          <button
            id="brand-logo-btn"
            onClick={handleSecretLogoClick}
            className="flex items-center gap-2.5 text-left group cursor-pointer focus:outline-none select-none"
            title="ভিডিও দেখে আয় করুন"
          >
            <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-gradient-to-tr from-emerald-600 to-teal-500 flex items-center justify-center text-white shadow-md shadow-emerald-600/20 group-hover:scale-105 transition-transform duration-200">
              <span className="text-xl">🎬</span>
            </div>
            <div>
              <span className="text-lg sm:text-xl font-bold bg-gradient-to-r from-emerald-700 to-teal-700 bg-clip-text text-transparent block">
                ভিডিও দেখে আয় করুন
              </span>
              <span className="text-xs text-slate-500 font-medium hidden sm:block">
                Watch & Earn Rewards
              </span>
            </div>
          </button>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1 lg:gap-2">
            {navItems.map((item) => {
              const isActive = activeSection === item.id;
              return (
                <button
                  key={item.id}
                  id={`nav-link-${item.id}`}
                  onClick={() => handleNavClick(item.id)}
                  className={`px-3.5 py-2 rounded-lg text-sm font-semibold transition-all duration-150 cursor-pointer ${
                    isActive
                      ? 'bg-emerald-50 text-emerald-700 shadow-xs'
                      : 'text-slate-600 hover:text-emerald-700 hover:bg-slate-50'
                  }`}
                >
                  <span>{item.bangla}</span>
                  <span className="text-[11px] text-slate-400 block font-normal -mt-0.5">
                    {item.label}
                  </span>
                </button>
              );
            })}
          </nav>

          {/* User Actions (No Login barrier for Traffic) */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Quick Balance Pill */}
            <div
              id="header-balance-pill"
              onClick={() => handleNavClick('balance')}
              className="flex items-center gap-2 px-3 sm:px-4 py-1.5 bg-emerald-50 border border-emerald-300/90 rounded-full cursor-pointer hover:bg-emerald-100 transition shadow-2xs"
              title="বর্তমান ব্যালেন্স দেখুন"
            >
              <div className="w-5 h-5 rounded-full bg-emerald-600 text-white flex items-center justify-center text-xs font-black shadow-xs">
                ৳
              </div>
              <span className="text-xs sm:text-sm font-extrabold text-emerald-800 font-mono">
                ৳{user.balance.toFixed(2)}
              </span>
            </div>

            {/* Instant Earn Direct Button for Traffic */}
            <button
              id="header-instant-earn-btn"
              onClick={() => handleNavClick('videos')}
              className="hidden sm:flex items-center gap-1.5 px-3.5 py-2 bg-gradient-to-r from-amber-500 via-rose-500 to-emerald-600 hover:from-amber-600 hover:to-rose-600 text-white rounded-xl text-xs sm:text-sm font-bold shadow-sm shadow-rose-500/20 transition transform hover:scale-105 cursor-pointer"
            >
              <Sparkles className="w-4 h-4 text-yellow-300" />
              <span>⚡ ইনস্ট্যান্ট আয়</span>
            </button>

            {/* Mobile Menu Button */}
            <button
              id="mobile-menu-toggle-btn"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-lg text-slate-600 hover:bg-slate-100 focus:outline-none"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-b border-slate-200 px-4 pt-2 pb-4 space-y-1.5 shadow-lg">
          {navItems.map((item) => (
            <button
              key={item.id}
              id={`mobile-nav-${item.id}`}
              onClick={() => handleNavClick(item.id)}
              className={`w-full text-left px-3.5 py-2.5 rounded-lg text-sm font-medium flex items-center justify-between ${
                activeSection === item.id
                  ? 'bg-emerald-50 text-emerald-700 font-semibold'
                  : 'text-slate-700 hover:bg-slate-50'
              }`}
            >
              <span>{item.bangla}</span>
              <span className="text-xs text-slate-400">{item.label}</span>
            </button>
          ))}
        </div>
      )}
    </header>
  );
};
