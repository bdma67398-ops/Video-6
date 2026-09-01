import React from 'react';
import { PlaySquare, Clock, Coins, Wallet, ArrowRight, ShieldCheck, Check } from 'lucide-react';

export const HowItWorksSection: React.FC = () => {
  const steps = [
    {
      stepNumber: '১',
      title: 'ভিডিও/Task নির্বাচন করুন',
      subtitle: 'Select Video Task',
      description: 'উপরে থাকা অনুমোদিত ভিডিও তালিকা থেকে যেকোনো একটি টাস্ক নির্বাচন করে "Start Task" বাটনে চাপ দিন।',
      icon: PlaySquare,
      iconColor: 'bg-emerald-50 text-emerald-600 border-emerald-200',
    },
    {
      stepNumber: '২',
      title: 'নির্ধারিত সময় সম্পূর্ণ করুন',
      subtitle: 'Complete Timer (5-10s)',
      description: 'টাস্ক অনুযায়ী মাত্র ৫ সেকেন্ড অথবা ১০ সেকেন্ড ভিডিওটি সক্রিয়ভাবে উপভোগ করুন। টাইমার শেষ হওয়া পর্যন্ত অপেক্ষা করুন।',
      icon: Clock,
      iconColor: 'bg-teal-50 text-teal-600 border-teal-200',
    },
    {
      stepNumber: '৩',
      title: 'Reward পান',
      subtitle: 'Collect Cash Reward',
      description: 'ভিডিও দেখা সম্পন্ন হওয়ার সাথে সাথে নির্ধারিত ৳১ অথবা ৳২ ইনস্ট্যান্ট আপনার মেইন ব্যালেন্সে জমা হবে।',
      icon: Coins,
      iconColor: 'bg-amber-50 text-amber-600 border-amber-200',
    },
    {
      stepNumber: '৪',
      title: '20 valid referral পূরণ করে Withdraw করুন',
      subtitle: 'Unlock Withdraw (≥৳200 + 20 Ref)',
      description: 'ন্যূনতম ৳২০০ ব্যালেন্স এবং ২০টি ভ্যালিড রেফারেল অর্জন করে bKash বা Nagad-এ সরাসরি টাকা উত্তোলন করুন।',
      icon: Wallet,
      iconColor: 'bg-rose-50 text-rose-600 border-rose-200',
    },
  ];

  return (
    <section id="how-it-works" className="py-12 sm:py-16 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-xs font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
            সহজ ৪ ধাপের গাইডলাইন
          </span>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 mt-3 tracking-tight">
            How It Works (কিভাবে কাজ করবেন)
          </h2>
          <p className="text-slate-600 text-sm sm:text-base mt-2">
            মাত্র কয়েকটি ক্লিকেই প্রতিদিন ঘরে বসে ভিডিও দেখে রিওয়ার্ড সংগ্রহ করুন এবং বিকাশ ও নগদে উত্তোলন করুন।
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative">
          {steps.map((item, index) => {
            const Icon = item.icon;
            return (
              <div
                key={index}
                id={`how-it-works-step-${index + 1}`}
                className="bg-slate-50/70 rounded-2xl p-6 border border-slate-200/80 shadow-2xs hover:shadow-md hover:border-emerald-300 transition duration-200 flex flex-col justify-between relative group"
              >
                <div>
                  {/* Step badge */}
                  <div className="flex items-center justify-between mb-4">
                    <div
                      className={`w-12 h-12 rounded-xl flex items-center justify-center border shadow-xs ${item.iconColor}`}
                    >
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="w-8 h-8 rounded-full bg-slate-900 text-white font-mono font-bold text-sm flex items-center justify-center shadow-xs">
                      {item.stepNumber}
                    </span>
                  </div>

                  <h3 className="text-base sm:text-lg font-bold text-slate-900 group-hover:text-emerald-700 transition">
                    {item.title}
                  </h3>
                  <span className="text-[11px] font-semibold text-slate-400 block mb-2">
                    {item.subtitle}
                  </span>

                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    {item.description}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-200/60 flex items-center text-[11px] font-medium text-emerald-700">
                  <Check className="w-3.5 h-3.5 mr-1 text-emerald-600" />
                  <span>ধাপ {item.stepNumber} যাচাইকৃত</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
