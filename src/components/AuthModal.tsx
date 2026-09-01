import React, { useState } from 'react';
import { X, LogIn, UserPlus, Phone, Lock, User, CheckCircle2 } from 'lucide-react';
import { UserProfile } from '../types';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLoginSuccess: (user: Partial<UserProfile>) => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({
  isOpen,
  onClose,
  onLoginSuccess,
}) => {
  if (!isOpen) return null;

  const [mode, setMode] = useState<'login' | 'register'>('login');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!phone || phone.trim().length < 11) {
      setError('সঠিক ১১ ডিজিটের মোবাইল নম্বর প্রদান করুন');
      return;
    }

    if (!password || password.length < 4) {
      setError('পাসওয়ার্ড অন্তত ৪ অক্ষরের হতে হবে');
      return;
    }

    if (mode === 'register' && !name.trim()) {
      setError('আপনার নাম লিখুন');
      return;
    }

    onLoginSuccess({
      name: name.trim() || (mode === 'register' ? 'নতুন ব্যবহারকারী' : 'ইউজার ' + phone.slice(-4)),
      phone: phone.trim(),
      isLoggedIn: true,
    });
    onClose();
  };

  const handleQuickDemoLogin = () => {
    onLoginSuccess({
      name: 'মোঃ তানভীর হাসান',
      phone: '01712345678',
      email: 'tanvir@gmail.com',
      isLoggedIn: true,
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl w-full max-w-md overflow-hidden shadow-2xl border border-slate-200 relative">
        {/* Header with Close */}
        <div className="px-6 py-4 bg-slate-50 border-b border-slate-100 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-xl">🎬</span>
            <h3 className="font-bold text-slate-800 text-base">
              {mode === 'login' ? 'লগইন করুন (Login)' : 'নতুন অ্যাকাউন্ট তৈরি করুন (Register)'}
            </h3>
          </div>
          <button
            id="close-auth-modal-btn"
            onClick={onClose}
            className="p-1 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-200/50 transition cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab switch */}
        <div className="flex border-b border-slate-100 p-2 gap-2 bg-slate-50/50">
          <button
            id="auth-tab-login"
            onClick={() => {
              setMode('login');
              setError('');
            }}
            className={`flex-1 py-2.5 rounded-xl font-bold text-xs sm:text-sm transition cursor-pointer flex items-center justify-center gap-1.5 ${
              mode === 'login'
                ? 'bg-white text-emerald-700 shadow-xs border border-slate-200'
                : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            <LogIn className="w-4 h-4" />
            <span>Login (লগইন)</span>
          </button>

          <button
            id="auth-tab-register"
            onClick={() => {
              setMode('register');
              setError('');
            }}
            className={`flex-1 py-2.5 rounded-xl font-bold text-xs sm:text-sm transition cursor-pointer flex items-center justify-center gap-1.5 ${
              mode === 'register'
                ? 'bg-white text-emerald-700 shadow-xs border border-slate-200'
                : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            <UserPlus className="w-4 h-4" />
            <span>Register (রেজিস্টার)</span>
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {mode === 'register' && (
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                আপনার নাম (Full Name)
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                  <User className="w-4 h-4" />
                </div>
                <input
                  id="auth-name-input"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="যেমন: মোঃ সাকিব রহমান"
                  className="w-full pl-9 pr-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-emerald-500 focus:bg-white outline-none"
                />
              </div>
            </div>
          )}

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              মোবাইল নম্বর (Phone Number)
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                <Phone className="w-4 h-4" />
              </div>
              <input
                id="auth-phone-input"
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="017XXXXXXXX"
                className="w-full pl-9 pr-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-emerald-500 focus:bg-white outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              পাসওয়ার্ড (Password)
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                <Lock className="w-4 h-4" />
              </div>
              <input
                id="auth-password-input"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full pl-9 pr-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-emerald-500 focus:bg-white outline-none"
              />
            </div>
          </div>

          {error && (
            <p className="text-xs font-medium text-rose-600 bg-rose-50 p-2.5 rounded-lg border border-rose-200">
              {error}
            </p>
          )}

          <button
            type="submit"
            id="auth-submit-btn"
            className="w-full py-3 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-bold text-sm rounded-xl shadow-md transition cursor-pointer"
          >
            {mode === 'login' ? 'লগইন করুন' : 'অ্যাকাউন্ট তৈরি করুন'}
          </button>

          {/* Quick Demo Login helper */}
          <div className="pt-2 border-t border-slate-100 text-center">
            <button
              type="button"
              id="quick-demo-login-btn"
              onClick={handleQuickDemoLogin}
              className="text-xs text-emerald-700 hover:text-emerald-800 font-semibold bg-emerald-50 hover:bg-emerald-100 px-3 py-2 rounded-lg border border-emerald-200 w-full transition cursor-pointer flex items-center justify-center gap-1.5"
            >
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>⚡ ১-ক্লিক ডেমো অ্যাকাউন্ট দিয়ে প্রবেশ করুন</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
