import React, { useState } from 'react';
import {
  Globe2,
  PlayCircle,
  TrendingUp,
  Eye,
  Sparkles,
  ArrowRight,
  Flame,
  CheckCircle2,
  Tv,
  Coins
} from 'lucide-react';
import { PROFITABLE_AD_LINKS } from '../data/initialData';
import { VideoTask } from '../types';

interface CountryVideosSectionProps {
  tasks: VideoTask[];
  onStartTask: (task: VideoTask) => void;
  onInstantEarn?: () => void;
  onShowToast: (msg: string) => void;
}

interface CountryHub {
  id: number;
  countryName: string;
  banglaName: string;
  flag: string;
  headline: string;
  subText: string;
  earningRate: string;
  liveViewers: string;
  category: string;
  bgGradient: string;
  borderColor: string;
  badge: string;
  badgeColor: string;
}

export const CountryVideosSection: React.FC<CountryVideosSectionProps> = ({
  tasks,
  onStartTask,
  onInstantEarn,
  onShowToast,
}) => {
  const [selectedFilter, setSelectedFilter] = useState<string>('all');

  const countries: CountryHub[] = [
    {
      id: 1,
      countryName: 'Bangladesh',
      banglaName: 'বাংলাদেশ',
      flag: '🇧🇩',
      headline: 'এখানে বাংলাদেশি ভিডিও পাবেন',
      subText: 'বাংলা নাটক, মিউজিক ও নিউজ ভিডিও দেখে ইনস্ট্যান্ট টাকা আয় করুন।',
      earningRate: '৳২০ - ৳৪০',
      liveViewers: '৪,৫২০ জন সক্রিয়',
      category: 'bd',
      bgGradient: 'from-emerald-950/90 via-slate-900 to-slate-950',
      borderColor: 'border-emerald-500/40 hover:border-emerald-400',
      badge: '🔥 টপ ট্রেন্ডিং',
      badgeColor: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30',
    },
    {
      id: 2,
      countryName: 'India',
      banglaName: 'ভারত',
      flag: '🇮🇳',
      headline: 'এখানে ভারতীয় ভিডিও পাবেন',
      subText: 'বলিউড, বাংলা ও হিন্দি বিনোদনমূলক ছোট ভিডিও এবং হাই রিওয়ার্ড।',
      earningRate: '৳২৫ - ৳৫০',
      liveViewers: '৩,৮১০ জন সক্রিয়',
      category: 'asia',
      bgGradient: 'from-amber-950/90 via-slate-900 to-slate-950',
      borderColor: 'border-amber-500/40 hover:border-amber-400',
      badge: '⚡ হাই ভিউজ',
      badgeColor: 'bg-amber-500/20 text-amber-300 border-amber-500/30',
    },
    {
      id: 3,
      countryName: 'United States',
      banglaName: 'আমেরিকা (USA)',
      flag: '🇺🇸',
      headline: 'এখানে আমেরিকান ভিডিও পাবেন',
      subText: 'ইউএসএ ভাইরাল ক্লিপস ও প্রিমিয়াম সর্বোচ্চ ডলার কনভার্টেড সিপিএম।',
      earningRate: '৳৪০ - ৳৮০',
      liveViewers: '৫,১২০ জন সক্রিয়',
      category: 'global',
      bgGradient: 'from-blue-950/90 via-slate-900 to-slate-950',
      borderColor: 'border-blue-500/40 hover:border-blue-400',
      badge: '💎 প্রিমিয়াম ডলার রেট',
      badgeColor: 'bg-blue-500/20 text-blue-300 border-blue-500/30',
    },
    {
      id: 4,
      countryName: 'Saudi Arabia',
      banglaName: 'সৌদি আরব (KSA)',
      flag: '🇸🇦',
      headline: 'এখানে সৌদি আরবের ভিডিও পাবেন',
      subText: 'আরবি ও প্রবাসীদের বিশেষ ভিডিও টাস্ক এবং নির্ভরযোগ্য রিওয়ার্ড।',
      earningRate: '৳৩০ - ৳৬০',
      liveViewers: '৩,২০০ জন সক্রিয়',
      category: 'middle_east',
      bgGradient: 'from-emerald-950/90 via-slate-900 to-slate-950',
      borderColor: 'border-emerald-500/40 hover:border-emerald-400',
      badge: '🌟 সুপার পপুলার',
      badgeColor: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30',
    },
    {
      id: 5,
      countryName: 'United Arab Emirates',
      banglaName: 'দুবাই / UAE',
      flag: '🇦🇪',
      headline: 'এখানে দুবাই / UAE ভিডিও পাবেন',
      subText: 'দুবাই লাক্সারি ও এক্সক্লুসিভ লাইফস্টাইল ভিডিও দিয়ে দ্রুত ইনকাম।',
      earningRate: '৳৩৫ - ৳৭০',
      liveViewers: '২,৯৫০ জন সক্রিয়',
      category: 'middle_east',
      bgGradient: 'from-amber-950/90 via-slate-900 to-slate-950',
      borderColor: 'border-amber-500/40 hover:border-amber-400',
      badge: '👑 গোল্ড রিওয়ার্ড',
      badgeColor: 'bg-amber-500/20 text-amber-300 border-amber-500/30',
    },
    {
      id: 6,
      countryName: 'Kuwait',
      banglaName: 'কুয়েত',
      flag: '🇰🇼',
      headline: 'এখানে কুয়েতের ভিডিও পাবেন',
      subText: 'কুয়েতি দিনার সমপরিমাণ উচ্চ সিপিএম বিশিষ্ট শর্ট ভিডিও ক্লিপস।',
      earningRate: '৳৩০ - ৳৬৫',
      liveViewers: '১,৮৯০ জন সক্রিয়',
      category: 'middle_east',
      bgGradient: 'from-teal-950/90 via-slate-900 to-slate-950',
      borderColor: 'border-teal-500/40 hover:border-teal-400',
      badge: '💰 মেগা রেট',
      badgeColor: 'bg-teal-500/20 text-teal-300 border-teal-500/30',
    },
    {
      id: 7,
      countryName: 'Qatar',
      banglaName: 'কাতার',
      flag: '🇶🇦',
      headline: 'এখানে কাতারের ভিডিও পাবেন',
      subText: 'কাতার স্পোর্টস, ট্রাভেল ও কালচারাল হাই ডেফিনিশন ভিডিও।',
      earningRate: '৳৩০ - ৳৬০',
      liveViewers: '১,৭২০ জন সক্রিয়',
      category: 'middle_east',
      bgGradient: 'from-rose-950/90 via-slate-900 to-slate-950',
      borderColor: 'border-rose-500/40 hover:border-rose-400',
      badge: '🏆 স্পেশাল স্পোর্টস',
      badgeColor: 'bg-rose-500/20 text-rose-300 border-rose-500/30',
    },
    {
      id: 8,
      countryName: 'Malaysia',
      banglaName: 'মালয়েশিয়া',
      flag: '🇲🇾',
      headline: 'এখানে মালয়েশিয়ার ভিডিও পাবেন',
      subText: 'প্রবাসী ভাইদের পছন্দের সহজ ও চমৎকার মালয়েশিয়ান কন্টেন্ট।',
      earningRate: '৳২৫ - ৳৫৫',
      liveViewers: '২,৬৪০ জন সক্রিয়',
      category: 'asia',
      bgGradient: 'from-red-950/90 via-slate-900 to-slate-950',
      borderColor: 'border-red-500/40 hover:border-red-400',
      badge: '🔥 প্রবাসী ফেভারিট',
      badgeColor: 'bg-red-500/20 text-red-300 border-red-500/30',
    },
    {
      id: 9,
      countryName: 'Oman',
      banglaName: 'ওমান',
      flag: '🇴🇲',
      headline: 'এখানে ওমানের ভিডিও পাবেন',
      subText: 'ওমান ট্রাভেল ও প্রকৃতিভিত্তিক সুন্দর ও দ্রুত আর্নিং ভিডিও।',
      earningRate: '৳২৫ - ৳৫০',
      liveViewers: '১,৪৩০ জন সক্রিয়',
      category: 'middle_east',
      bgGradient: 'from-orange-950/90 via-slate-900 to-slate-950',
      borderColor: 'border-orange-500/40 hover:border-orange-400',
      badge: '✨ ইনস্ট্যান্ট ক্যাশ',
      badgeColor: 'bg-orange-500/20 text-orange-300 border-orange-500/30',
    },
    {
      id: 10,
      countryName: 'Singapore',
      banglaName: 'সিঙ্গাপুর',
      flag: '🇸🇬',
      headline: 'এখানে সিঙ্গাপুরের ভিডিও পাবেন',
      subText: 'সিঙ্গাপুর হাই-টেক ও স্মার্ট সিটি ভিডিও ক্লিপস উইথ ডাবল কয়েন।',
      earningRate: '৳৩৫ - ৳৭৫',
      liveViewers: '২,১০০ জন সক্রিয়',
      category: 'asia',
      bgGradient: 'from-cyan-950/90 via-slate-900 to-slate-950',
      borderColor: 'border-cyan-500/40 hover:border-cyan-400',
      badge: '🚀 আল্ট্রা স্পিড',
      badgeColor: 'bg-cyan-500/20 text-cyan-300 border-cyan-500/30',
    },
    {
      id: 11,
      countryName: 'United Kingdom',
      banglaName: 'যুক্তরাজ্য (UK)',
      flag: '🇬🇧',
      headline: 'এখানে যুক্তরাজ্যের (UK) ভিডিও পাবেন',
      subText: 'লন্ডন প্রিমিয়ার ভিডিও টাস্ক ও ব্রিটিশ পাউন্ড হাই কনভার্সন রেট।',
      earningRate: '৳৪০ - ৳৮৫',
      liveViewers: '৩,৩৪০ জন সক্রিয়',
      category: 'global',
      bgGradient: 'from-blue-950/90 via-slate-900 to-slate-950',
      borderColor: 'border-blue-500/40 hover:border-blue-400',
      badge: '💎 ভিআইপি পাউন্ড সিপিএম',
      badgeColor: 'bg-blue-500/20 text-blue-300 border-blue-500/30',
    },
    {
      id: 12,
      countryName: 'Canada',
      banglaName: 'কানাডা',
      flag: '🇨🇦',
      headline: 'এখানে কানাডিয়ান ভিডিও পাবেন',
      subText: 'কানাডা ন্যাচার ও লাইফস্টাইল শর্ট ক্লিপস দেখে ইনস্ট্যান্ট ইনকাম।',
      earningRate: '৳৩৫ - ৳৭০',
      liveViewers: '২,৭৮০ জন সক্রিয়',
      category: 'global',
      bgGradient: 'from-red-950/90 via-slate-900 to-slate-950',
      borderColor: 'border-red-500/40 hover:border-red-400',
      badge: '🍁 সুপার আর্ন',
      badgeColor: 'bg-red-500/20 text-red-300 border-red-500/30',
    },
    {
      id: 13,
      countryName: 'Italy',
      banglaName: 'ইতালি',
      flag: '🇮🇹',
      headline: 'এখানে ইতালির ভিডিও পাবেন',
      subText: 'ইউরোপের বিখ্যাত ইতালিয়ান কালচার ও ট্যুরিজম ভিডিও ওয়াচ করুন।',
      earningRate: '৳৩০ - ৳৬৫',
      liveViewers: '২,০৫০ জন সক্রিয়',
      category: 'global',
      bgGradient: 'from-emerald-950/90 via-slate-900 to-slate-950',
      borderColor: 'border-emerald-500/40 hover:border-emerald-400',
      badge: '🍕 ইউরোপ টপ',
      badgeColor: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30',
    },
    {
      id: 14,
      countryName: 'France',
      banglaName: 'ফ্রান্স',
      flag: '🇫🇷',
      headline: 'এখানে ফ্রান্সের ভিডিও পাবেন',
      subText: 'প্যারিস আর্ট ও ফ্যাশন ভিডিও দেখে ওয়ালেটে যোগ করুন রিওয়ার্ড।',
      earningRate: '৳৩০ - ৳৬৫',
      liveViewers: '১,৯৮০ জন সক্রিয়',
      category: 'global',
      bgGradient: 'from-indigo-950/90 via-slate-900 to-slate-950',
      borderColor: 'border-indigo-500/40 hover:border-indigo-400',
      badge: '🗼 প্রিমিয়াম ওয়াচ',
      badgeColor: 'bg-indigo-500/20 text-indigo-300 border-indigo-500/30',
    },
    {
      id: 15,
      countryName: 'Germany',
      banglaName: 'জার্মানি',
      flag: '🇩🇪',
      headline: 'এখানে জার্মানির ভিডিও পাবেন',
      subText: 'জার্মান অটোমোবাইল ও ইঞ্জিনিয়ারিং শর্টস উইথ ম্যাক্সিমাম বোনাস।',
      earningRate: '৳৩৫ - ৳৭৫',
      liveViewers: '২,৪২০ জন সক্রিয়',
      category: 'global',
      bgGradient: 'from-amber-950/90 via-slate-900 to-slate-950',
      borderColor: 'border-amber-500/40 hover:border-amber-400',
      badge: '⚙️ হাই স্পিড ক্যাশ',
      badgeColor: 'bg-amber-500/20 text-amber-300 border-amber-500/30',
    },
    {
      id: 16,
      countryName: 'Australia',
      banglaName: 'অস্ট্রেলিয়া',
      flag: '🇦🇺',
      headline: 'এখানে অস্ট্রেলিয়ান ভিডিও পাবেন',
      subText: 'অস্ট্রেলিয়ার সুন্দর সৈকত ও ওয়াইল্ডলাইফ ক্লিপস দেখে আয় করুন।',
      earningRate: '৳৩৫ - ৳৭০',
      liveViewers: '২,১৫০ জন সক্রিয়',
      category: 'global',
      bgGradient: 'from-teal-950/90 via-slate-900 to-slate-950',
      borderColor: 'border-teal-500/40 hover:border-teal-400',
      badge: '🦘 গোল্ডেন টাস্ক',
      badgeColor: 'bg-teal-500/20 text-teal-300 border-teal-500/30',
    },
    {
      id: 17,
      countryName: 'Japan',
      banglaName: 'জাপান',
      flag: '🇯🇵',
      headline: 'এখানে জাপানের ভিডিও পাবেন',
      subText: 'জাপানিজ এনিমে, টেকনোলজি ও রোবোটিক্স আকর্ষণীয় ছোট ভিডিও।',
      earningRate: '৳৩০ - ৳৬৫',
      liveViewers: '২,৮৯০ জন সক্রিয়',
      category: 'asia',
      bgGradient: 'from-rose-950/90 via-slate-900 to-slate-950',
      borderColor: 'border-rose-500/40 hover:border-rose-400',
      badge: '🌸 টেক ট্রেন্ড',
      badgeColor: 'bg-rose-500/20 text-rose-300 border-rose-500/30',
    },
    {
      id: 18,
      countryName: 'South Korea',
      banglaName: 'দক্ষিণ কোরিয়া',
      flag: '🇰🇷',
      headline: 'এখানে দক্ষিণ কোরিয়ার ভিডিও পাবেন',
      subText: 'কে-পপ ও কোরিয়ান ড্রামা ক্লিপস সাথে নিশ্চিত আনলিমিটেড পয়েন্ট।',
      earningRate: '৳৩০ - ৳৬০',
      liveViewers: '৩,১৫০ জন সক্রিয়',
      category: 'asia',
      bgGradient: 'from-purple-950/90 via-slate-900 to-slate-950',
      borderColor: 'border-purple-500/40 hover:border-purple-400',
      badge: '🎵 কে-পপ ট্রেন্ড',
      badgeColor: 'bg-purple-500/20 text-purple-300 border-purple-500/30',
    },
    {
      id: 19,
      countryName: 'Turkey',
      banglaName: 'তুরস্ক',
      flag: '🇹🇷',
      headline: 'এখানে তুরস্কের ভিডিও পাবেন',
      subText: 'তুর্কি হিস্টোরিক্যাল সিরিজ ও সুন্দর ইস্তাম্বুল ট্রাভেল শর্টস।',
      earningRate: '৳২৫ - ৳৫৫',
      liveViewers: '২,৩২০ জন সক্রিয়',
      category: 'middle_east',
      bgGradient: 'from-red-950/90 via-slate-900 to-slate-950',
      borderColor: 'border-red-500/40 hover:border-red-400',
      badge: '🕌 ড্রামা স্পেশাল',
      badgeColor: 'bg-red-500/20 text-red-300 border-red-500/30',
    },
    {
      id: 20,
      countryName: 'Pakistan',
      banglaName: 'পাকিস্তান',
      flag: '🇵🇰',
      headline: 'এখানে পাকিস্তানের ভিডিও পাবেন',
      subText: 'উর্দু ড্রামা, ক্রিকেট ম্যাচ হাইলাইটস ও বিনোদনমূলক মজার ক্লিপস।',
      earningRate: '৳২০ - ৳৪৫',
      liveViewers: '২,৭০০ জন সক্রিয়',
      category: 'asia',
      bgGradient: 'from-emerald-950/90 via-slate-900 to-slate-950',
      borderColor: 'border-emerald-500/40 hover:border-emerald-400',
      badge: '🏏 ক্রিকেট স্পেশাল',
      badgeColor: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30',
    },
  ];

  const filteredCountries = countries.filter((c) => {
    if (selectedFilter === 'all') return true;
    return c.category === selectedFilter;
  });

  const handleCountryClick = (country: CountryHub) => {
    // Open high revenue Profitable Ad Link in background
    const adUrl = PROFITABLE_AD_LINKS[(country.id - 1) % PROFITABLE_AD_LINKS.length];
    try {
      window.open(adUrl, '_blank', 'noopener,noreferrer');
    } catch (e) {}

    // Find suitable task or trigger first task
    const taskToPlay = tasks[(country.id - 1) % tasks.length] || tasks[0];
    if (taskToPlay) {
      onStartTask({
        ...taskToPlay,
        title: `${country.banglaName} স্পেশাল ভিডিও #${country.id}`,
        banglaTitle: `${country.headline} - ওয়াচ করুন`,
        reward: 2.0,
      });
      onShowToast(`🎬 "${country.headline}" লোড হচ্ছে! ৩০ সেকেন্ড বিজ্ঞাপন দেখে ফুল ভিডিও উপভোগ করুন।`);
    }
  };

  return (
    <section id="country-videos" className="py-12 sm:py-20 bg-slate-900 text-white relative overflow-hidden border-b border-slate-800">
      {/* Background Decor */}
      <div className="absolute top-0 right-1/4 w-80 h-80 bg-teal-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-80 h-80 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Title Header */}
        <div className="text-center max-w-4xl mx-auto mb-10 sm:mb-14">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs sm:text-sm font-bold mb-4 shadow-sm">
            <Globe2 className="w-4 h-4 text-emerald-400 animate-spin" />
            <span>২০টি দেশের এক্সক্লুসিভ হাই-সিপিএম ভিডিও জোন</span>
          </div>

          <h2 className="text-2xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight leading-tight sm:leading-tight mb-4">
            বিশ্বের সেরা <span className="bg-gradient-to-r from-emerald-400 via-teal-300 to-amber-300 bg-clip-text text-transparent">২০ দেশের ভিডিও</span> এক জায়গায়
          </h2>

          <p className="text-sm sm:text-base text-slate-300 font-medium max-w-2xl mx-auto">
            আপনার পছন্দের দেশের ভিডিও নির্বাচন করুন, বিজ্ঞাপন দেখুন এবং সর্বোচ্চ রেটে টাকা আয় করুন!
          </p>

          {/* Region Filter Chips */}
          <div className="flex flex-wrap items-center justify-center gap-2 mt-6">
            {[
              { id: 'all', label: '🌍 সব ২০টি দেশ (All 20)' },
              { id: 'bd', label: '🇧🇩 বাংলাদেশ (Bangladesh)' },
              { id: 'middle_east', label: '🕌 মধ্যপ্রাচ্য (Middle East)' },
              { id: 'asia', label: '🌏 এশিয়া (Asia)' },
              { id: 'global', label: '🌐 আমেরিকা ও ইউরোপ (US & EU)' },
            ].map((filter) => (
              <button
                key={filter.id}
                onClick={() => setSelectedFilter(filter.id)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer border ${
                  selectedFilter === filter.id
                    ? 'bg-emerald-500 text-slate-950 border-emerald-400 shadow-md shadow-emerald-500/20 scale-105'
                    : 'bg-slate-800/80 text-slate-300 border-slate-700 hover:border-slate-500 hover:text-white'
                }`}
              >
                {filter.label}
              </button>
            ))}
          </div>
        </div>

        {/* 20 Countries Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6">
          {filteredCountries.map((country) => (
            <div
              key={country.id}
              id={`country-card-${country.id}`}
              onClick={() => handleCountryClick(country)}
              className={`group bg-gradient-to-br ${country.bgGradient} p-5 sm:p-6 rounded-2xl sm:rounded-3xl border ${country.borderColor} shadow-xl hover:shadow-2xl hover:shadow-emerald-900/30 transition-all duration-300 transform hover:-translate-y-1.5 cursor-pointer flex flex-col justify-between relative overflow-hidden`}
            >
              {/* Subtle Flag Watermark in corner */}
              <div className="absolute -right-2 -bottom-2 text-7xl sm:text-8xl opacity-10 select-none pointer-events-none group-hover:scale-125 transition-transform duration-300">
                {country.flag}
              </div>

              <div>
                {/* Top Badge & Live Viewers */}
                <div className="flex items-center justify-between gap-2 mb-3">
                  <span className={`px-2.5 py-0.5 rounded-full text-[11px] font-extrabold border ${country.badgeColor} flex items-center gap-1 shadow-xs`}>
                    {country.badge}
                  </span>

                  <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-slate-800/90 text-emerald-400 text-[10px] font-bold border border-emerald-500/30">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                    <span>{country.liveViewers}</span>
                  </div>
                </div>

                {/* Country Flag & Big Headline */}
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-3xl sm:text-4xl shrink-0 drop-shadow-md group-hover:scale-110 transition-transform">
                    {country.flag}
                  </span>
                  <div>
                    <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                      {country.banglaName} • {country.countryName}
                    </span>
                    <h3 className="text-lg sm:text-xl font-black text-white leading-tight group-hover:text-emerald-300 transition-colors">
                      {country.headline}
                    </h3>
                  </div>
                </div>

                {/* Description */}
                <p className="text-xs sm:text-sm text-slate-300 mt-2 font-normal leading-relaxed">
                  {country.subText}
                </p>
              </div>

              {/* Bottom Reward Pill & Action Button */}
              <div className="pt-4 mt-4 border-t border-white/10 flex items-center justify-between gap-2">
                <div className="flex items-center gap-1.5">
                  <Coins className="w-4 h-4 text-amber-400 shrink-0" />
                  <div>
                    <p className="text-[10px] text-slate-400 font-semibold">সম্ভাব্য রিওয়ার্ড</p>
                    <p className="text-xs sm:text-sm font-black text-amber-300 font-mono">
                      {country.earningRate}
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  className="px-3.5 sm:px-4 py-2 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-slate-950 font-black text-xs rounded-xl shadow-md shadow-emerald-500/20 flex items-center gap-1.5 group-hover:scale-105 transition-transform cursor-pointer"
                >
                  <PlayCircle className="w-3.5 h-3.5" />
                  <span>ভিডিও দেখুন</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* PROMINENT "ক্লিক করে ইনস্ট্যান্ট টাকা আয় শুরু করুন" ACTION BANNER */}
        <div className="mt-10 max-w-4xl mx-auto">
          <div className="p-6 sm:p-7 bg-gradient-to-r from-amber-500 via-rose-600 to-emerald-600 rounded-3xl shadow-2xl border-2 border-yellow-300 text-white relative overflow-hidden">
            <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-5">
              <div className="text-left space-y-1.5 flex-1">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/30 border border-yellow-300/60 text-yellow-300 text-xs font-black">
                  <Sparkles className="w-3.5 h-3.5 text-yellow-300" />
                  <span>⚡ হাই CPM ইনস্ট্যান্ট আর্নিং</span>
                </div>
                <h3 className="text-xl sm:text-2xl font-black text-white">
                  ক্লিক করে ইনস্ট্যান্ট টাকা আয় শুরু করুন
                </h3>
                <p className="text-xs sm:text-sm text-yellow-100 font-medium">
                  যেকোনো দেশের ভিডিওর পাশাপাশি ডাইরেক্ট ক্লিকে নিশ্চিত স্পনসর বোনাস আর্ন করুন এবং সাথে সাথে ব্যালেন্সে জমা করুন।
                </p>
              </div>

              <button
                id="country-section-instant-money-btn"
                onClick={() => onInstantEarn ? onInstantEarn(PROFITABLE_AD_LINKS[0]) : window.open(PROFITABLE_AD_LINKS[0], '_blank')}
                className="w-full md:w-auto px-8 py-4 bg-yellow-400 hover:bg-yellow-300 text-slate-950 font-black text-base sm:text-lg rounded-2xl shadow-xl hover:scale-105 active:scale-95 transition transform flex items-center justify-center gap-2.5 cursor-pointer shrink-0 border-2 border-white animate-pulse"
              >
                <Flame className="w-6 h-6 text-rose-600 fill-rose-600" />
                <span>ক্লিক করে ইনস্ট্যান্ট টাকা আয় শুরু করুন</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
