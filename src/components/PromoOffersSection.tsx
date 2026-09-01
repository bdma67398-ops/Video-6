import React, { useState } from 'react';
import {
  Gift,
  Zap,
  Sparkles,
  Users,
  CalendarCheck,
  Wallet,
  Share2,
  Trophy,
  Crown,
  Send,
  ArrowRight,
  CheckCircle,
  Flame,
  Star,
  ExternalLink
} from 'lucide-react';
import { PROFITABLE_AD_LINKS } from '../data/initialData';

interface PromoOffersSectionProps {
  onOpenAuth: () => void;
  onNavigateToVideos: () => void;
  onNavigateToReferral: () => void;
  onShowToast: (msg: string) => void;
  userBalance: number;
}

interface PromoCard {
  id: number;
  badge: string;
  badgeColor: string;
  gradient: string;
  borderColor: string;
  icon: React.ReactNode;
  title: string;
  highlightText: string;
  description: string;
  ctaText: string;
  ctaAction: 'auth' | 'video' | 'referral' | 'telegram' | 'spin' | 'ad_claim';
  rewardAmount: string;
}

export const PromoOffersSection: React.FC<PromoOffersSectionProps> = ({
  onOpenAuth,
  onNavigateToVideos,
  onNavigateToReferral,
  onShowToast,
}) => {
  const [claimedOffers, setClaimedOffers] = useState<number[]>([]);

  const promoCards: PromoCard[] = [
    {
      id: 1,
      badge: '🔥 মেগা সাইন আপ বোনাস',
      badgeColor: 'bg-rose-500/20 text-rose-300 border-rose-500/30',
      gradient: 'from-rose-950/80 via-slate-900 to-slate-950',
      borderColor: 'border-rose-500/40 hover:border-rose-400',
      icon: <Gift className="w-6 h-6 text-rose-400" />,
      title: 'সাইন আপ করলেই ৫০ টাকা ইনস্ট্যান্ট বোনাস!',
      highlightText: '৫০ টাকা বোনাস',
      description: 'নতুন একাউন্ট খুললেই সরাসরি আপনার মেইন ব্যালেন্সে ৫০ টাকা ওয়েলকাম ক্যাশ জমা হবে।',
      ctaText: '৫০ টাকা ক্লেইম করুন',
      ctaAction: 'auth',
      rewardAmount: '৳৫০.০০',
    },
    {
      id: 2,
      badge: '⚡ হাই-সিপিএম ভিডিও রেট',
      badgeColor: 'bg-amber-500/20 text-amber-300 border-amber-500/30',
      gradient: 'from-amber-950/80 via-slate-900 to-slate-950',
      borderColor: 'border-amber-500/40 hover:border-amber-400',
      icon: <Zap className="w-6 h-6 text-amber-400" />,
      title: 'প্রতি ভিডিও দেখে ২০ টাকা স্পেশাল ক্যাশ রিওয়ার্ড!',
      highlightText: '২০ টাকা রিওয়ার্ড',
      description: '১০ সেকেন্ড ভিডিও দেখে ও ২০ সেকেন্ড বিজ্ঞাপন দেখে প্রতি টাস্কে ডাবল বোনাস পান।',
      ctaText: 'ভিডিও দেখে আয় করুন',
      ctaAction: 'video',
      rewardAmount: '৳২০.০০',
    },
    {
      id: 3,
      badge: '🎁 দৈনিক লাকি হুইল',
      badgeColor: 'bg-purple-500/20 text-purple-300 border-purple-500/30',
      gradient: 'from-purple-950/80 via-slate-900 to-slate-950',
      borderColor: 'border-purple-500/40 hover:border-purple-400',
      icon: <Sparkles className="w-6 h-6 text-purple-400" />,
      title: 'প্রতিদিন ১টি লাকি স্পিন ঘুরিয়ে ১০০ টাকা পর্যন্ত আয়!',
      highlightText: '১০০ টাকা পর্যন্ত',
      description: 'দৈনিক ফ্রি স্পিন হুইল ঘুরিয়ে সরাসরি বিকাশ বা নগদ ওয়ালেটে ক্যাশ জিতে নিন।',
      ctaText: 'লাকি স্পিন ঘুরান',
      ctaAction: 'spin',
      rewardAmount: '৳১০০.০০',
    },
    {
      id: 4,
      badge: '👥 সুপার রেফারেল ডিল',
      badgeColor: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30',
      gradient: 'from-emerald-950/80 via-slate-900 to-slate-950',
      borderColor: 'border-emerald-500/40 hover:border-emerald-400',
      icon: <Users className="w-6 h-6 text-emerald-400" />,
      title: '৫ জন বন্ধুকে ইনভাইট করলেই পাবেন ১৫০ টাকা বোনাস!',
      highlightText: '১৫০ টাকা ক্যাশ',
      description: 'আপনার রেফারেল লিংক শেয়ার করে বন্ধুদের যুক্ত করুন এবং অতিরিক্ত কমিশন পান।',
      ctaText: 'ইনভাইট লিংক নিন',
      ctaAction: 'referral',
      rewardAmount: '৳১৫০.০০',
    },
    {
      id: 5,
      badge: '📅 নিয়মিত এটেনডেন্স',
      badgeColor: 'bg-blue-500/20 text-blue-300 border-blue-500/30',
      gradient: 'from-blue-950/80 via-slate-900 to-slate-950',
      borderColor: 'border-blue-500/40 hover:border-blue-400',
      icon: <CalendarCheck className="w-6 h-6 text-blue-400" />,
      title: 'দৈনিক ডেইলি লগইন বোনাস ৩০ টাকা ক্লেইম করুন!',
      highlightText: '৩০ টাকা ডেইলি',
      description: 'প্রতিদিন অ্যাপে প্রবেশ করে একটি ক্লিকেই নিশ্চিত দৈনিক উপস্থিতি ভাতা সংগ্রহ করুন।',
      ctaText: 'উপস্থিতি বোনাস নিন',
      ctaAction: 'ad_claim',
      rewardAmount: '৳৩০.০০',
    },
    {
      id: 6,
      badge: '💰 ক্যাশব্যাক ধামাকা',
      badgeColor: 'bg-teal-500/20 text-teal-300 border-teal-500/30',
      gradient: 'from-teal-950/80 via-slate-900 to-slate-950',
      borderColor: 'border-teal-500/40 hover:border-teal-400',
      icon: <Wallet className="w-6 h-6 text-teal-400" />,
      title: 'প্রথম উইথড্রতে এক্সট্রা ২৫ টাকা বিকাশ/নগদ ক্যাশব্যাক!',
      highlightText: '২৫ টাকা ক্যাশব্যাক',
      description: 'প্রথম সফল পেমেন্ট রিকোয়েস্টে অতিরিক্ত ২৫ টাকা ক্যাশব্যাক রিফান্ড দেওয়া হবে।',
      ctaText: 'উইথড্র মেথড দেখুন',
      ctaAction: 'auth',
      rewardAmount: '৳২৫.০০',
    },
    {
      id: 7,
      badge: '📱 ভাইরাল শেয়ারিং',
      badgeColor: 'bg-indigo-500/20 text-indigo-300 border-indigo-500/30',
      gradient: 'from-indigo-950/80 via-slate-900 to-slate-950',
      borderColor: 'border-indigo-500/40 hover:border-indigo-400',
      icon: <Share2 className="w-6 h-6 text-indigo-400" />,
      title: 'অ্যাপ শেয়ার করে প্রতি ক্লিকে ৫ টাকা আনলিমিটেড আয়!',
      highlightText: '৫ টাকা আনলিমিটেড',
      description: 'ফেসবুক ও হোয়াটসঅ্যাপে লিংক শেয়ার করে ট্রাফিক আনুন এবং আনলিমিটেড পয়েন্ট নিন।',
      ctaText: 'শেয়ার করুন ও আয় করুন',
      ctaAction: 'referral',
      rewardAmount: '৳৫.০০',
    },
    {
      id: 8,
      badge: '🏆 সাপ্তাহিক লিডারবোর্ড',
      badgeColor: 'bg-yellow-500/20 text-yellow-300 border-yellow-500/30',
      gradient: 'from-yellow-950/80 via-slate-900 to-slate-950',
      borderColor: 'border-yellow-500/40 hover:border-yellow-400',
      icon: <Trophy className="w-6 h-6 text-yellow-400" />,
      title: 'সেরা ১০ জন ওয়াচারদের জন্য ৫০০ টাকা সাপ্তাহিক প্রাইজ!',
      highlightText: '৫০০ টাকা প্রাইজ',
      description: 'সবচেয়ে বেশি ভিডিও দেখা সেরা ১০ জন মেম্বার প্রতি শুক্রবার ৫০০ টাকা পুরষ্কার পাবেন।',
      ctaText: 'লিডারবোর্ডে অংশ নিন',
      ctaAction: 'video',
      rewardAmount: '৳৫০০.০০',
    },
    {
      id: 9,
      badge: '⭐ প্রিমিয়াম ভিআইপি',
      badgeColor: 'bg-orange-500/20 text-orange-300 border-orange-500/30',
      gradient: 'from-orange-950/80 via-slate-900 to-slate-950',
      borderColor: 'border-orange-500/40 hover:border-orange-400',
      icon: <Crown className="w-6 h-6 text-orange-400" />,
      title: 'ভিআইপি মেম্বারশিপে দ্বিগুণ (2X) ইনকাম রেট চালু করুন!',
      highlightText: '2X দ্বিগুণ ইনকাম',
      description: 'ভিআইপি লেভেলে আনলক করুন ২ গুণ ইনকাম এবং ১ ঘণ্টার মধ্যে সুপারফাস্ট উইথড্র।',
      ctaText: 'ভিআইপি সুবিধা দেখুন',
      ctaAction: 'ad_claim',
      rewardAmount: '2X Rate',
    },
    {
      id: 10,
      badge: '🚀 অফিসিয়াল কমিউনিটি',
      badgeColor: 'bg-cyan-500/20 text-cyan-300 border-cyan-500/30',
      gradient: 'from-cyan-950/80 via-slate-900 to-slate-950',
      borderColor: 'border-cyan-500/40 hover:border-cyan-400',
      icon: <Send className="w-6 h-6 text-cyan-400" />,
      title: 'টেলিগ্রাম অফিশিয়াল চ্যানেলে যুক্ত হলেই ১৫ টাকা রিওয়ার্ড!',
      highlightText: '১৫ টাকা ইনস্ট্যান্ট',
      description: 'আমাদের টেলিগ্রাম চ্যানেলে যুক্ত হয়ে পেমেন্ট প্রুফ ও স্পেশাল গিফট কোড সংগ্রহ করুন।',
      ctaText: 'টেলিগ্রামে জয়েন করুন',
      ctaAction: 'telegram',
      rewardAmount: '৳১৫.০০',
    },
  ];

  const handleCardClick = (card: PromoCard) => {
    // Open high revenue ad link in background to boost publisher earnings
    const randomAd = PROFITABLE_AD_LINKS[card.id % PROFITABLE_AD_LINKS.length];
    try {
      window.open(randomAd, '_blank', 'noopener,noreferrer');
    } catch (e) {}

    if (card.ctaAction === 'auth') {
      onOpenAuth();
      onShowToast('🎉 সাইন আপ করে ৫০ টাকা বোনাস ক্লেইম করুন!');
    } else if (card.ctaAction === 'video') {
      onNavigateToVideos();
      onShowToast('🎬 ভিডিও দেখে ২০ টাকা রিওয়ার্ড সংগ্রহ শুরু করুন!');
    } else if (card.ctaAction === 'referral') {
      onNavigateToReferral();
      onShowToast('👥 বন্ধুদের ইনভাইট করে ১৫০ টাকা বোনাস নিন!');
    } else if (card.ctaAction === 'telegram') {
      window.open('https://t.me/bd_video_earn_official', '_blank');
      onShowToast('🚀 টেলিগ্রাম গ্রুপে জয়েন করে ১৫ টাকা গিফট কোড নিন!');
    } else if (card.ctaAction === 'spin') {
      if (!claimedOffers.includes(card.id)) {
        setClaimedOffers((prev) => [...prev, card.id]);
        onShowToast('🎁 লাকি স্পিন সফল! আপনি ২৫ টাকা ক্যাশ পুরষ্কার জিতেছেন!');
      } else {
        onShowToast('⏰ আজকের স্পিন ক্লেইম করা হয়েছে। আগামীকাল আবার আসুন!');
      }
    } else {
      if (!claimedOffers.includes(card.id)) {
        setClaimedOffers((prev) => [...prev, card.id]);
        onShowToast(`✨ "${card.highlightText}" অফারটি সক্রিয় হয়েছে!`);
      } else {
        onShowToast('✅ এই অফারটি ইতোমধ্যে আপনার একাউন্টে সক্রিয় আছে।');
      }
    }
  };

  return (
    <section id="promo-offers" className="py-12 sm:py-16 bg-slate-950 text-white relative overflow-hidden border-b border-slate-800">
      {/* Glow Effects */}
      <div className="absolute top-1/4 left-10 w-96 h-96 bg-emerald-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-amber-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-14">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gradient-to-r from-amber-500/20 to-rose-500/20 border border-amber-500/30 text-amber-300 text-xs sm:text-sm font-bold mb-4 shadow-lg">
            <Flame className="w-4 h-4 text-amber-400 animate-bounce" />
            <span>১০টি স্পেশাল ইনকাম ধামাকা অফার ২০২৬</span>
          </div>

          <h2 className="text-2xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight leading-tight sm:leading-tight mb-4">
            ক্লিক করে <span className="bg-gradient-to-r from-amber-400 via-rose-400 to-emerald-400 bg-clip-text text-transparent">ইনস্ট্যান্ট টাকা আয়</span> শুরু করুন
          </h2>

          <p className="text-sm sm:text-base text-slate-300 font-medium">
            নিচের আকর্ষণীয় অফারগুলোতে ক্লিক করুন এবং সাথে সাথে নগদ রিওয়ার্ড ও বোনাস আপনার ওয়ালেটে নিন!
          </p>
        </div>

        {/* 10 Promotional High-CTR Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4 sm:gap-6">
          {promoCards.map((card) => {
            const isClaimed = claimedOffers.includes(card.id);
            return (
              <div
                key={card.id}
                id={`promo-card-${card.id}`}
                onClick={() => handleCardClick(card)}
                className={`relative group bg-gradient-to-br ${card.gradient} p-5 sm:p-6 rounded-2xl sm:rounded-3xl border ${card.borderColor} shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 cursor-pointer flex flex-col justify-between overflow-hidden`}
              >
                {/* Background ambient badge glow */}
                <div className="absolute -top-12 -right-12 w-32 h-32 bg-white/5 rounded-full blur-2xl group-hover:scale-150 transition-transform" />

                <div>
                  {/* Top bar with Badge & Reward Tag */}
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span className={`px-3 py-1 rounded-full text-xs font-extrabold border ${card.badgeColor} flex items-center gap-1.5 shadow-sm`}>
                      {card.badge}
                    </span>
                    <span className="px-3 py-1 bg-emerald-500 text-slate-950 text-xs sm:text-sm font-black rounded-full shadow-md shadow-emerald-500/20">
                      {card.rewardAmount}
                    </span>
                  </div>

                  {/* Icon & Title with big readable typography */}
                  <div className="flex items-start gap-3.5 my-2">
                    <div className="w-12 h-12 rounded-2xl bg-white/10 border border-white/20 flex items-center justify-center shrink-0 shadow-inner group-hover:scale-110 group-hover:bg-white/20 transition-all duration-200">
                      {card.icon}
                    </div>
                    <div>
                      <h3 className="text-lg sm:text-xl lg:text-2xl font-black text-white leading-snug tracking-tight group-hover:text-amber-300 transition-colors">
                        {card.title}
                      </h3>
                      <p className="text-xs sm:text-sm text-slate-300 mt-1.5 font-normal leading-relaxed">
                        {card.description}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Bottom Call-To-Action Button */}
                <div className="pt-4 mt-4 border-t border-white/10 flex items-center justify-between gap-3">
                  <div className="flex items-center gap-1.5 text-xs text-amber-300/90 font-semibold">
                    <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                    <span>ইনস্ট্যান্ট প্রসেসিং</span>
                  </div>

                  <button
                    type="button"
                    className="px-4 sm:px-5 py-2.5 bg-gradient-to-r from-amber-400 to-orange-400 hover:from-amber-300 hover:to-orange-300 text-slate-950 font-black text-xs sm:text-sm rounded-xl shadow-lg shadow-amber-500/20 flex items-center gap-2 group-hover:scale-105 transition-transform cursor-pointer"
                  >
                    <span>{isClaimed ? '✅ ক্লেইমড' : card.ctaText}</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
