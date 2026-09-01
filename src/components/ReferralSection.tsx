import React, { useState } from 'react';
import { Users, Copy, Check, Share2, Sparkles, UserPlus, ShieldAlert, Award } from 'lucide-react';
import { UserProfile } from '../types';

interface ReferralSectionProps {
  user: UserProfile;
  onSimulateReferral: () => void;
}

export const ReferralSection: React.FC<ReferralSectionProps> = ({
  user,
  onSimulateReferral,
}) => {
  const [copied, setCopied] = useState(false);

  const referralUrl = typeof window !== 'undefined' 
    ? `${window.location.origin}/?ref=${user.referralCode}`
    : `https://bd-earn.app/ref/${user.referralCode}`;

  const handleCopyLink = () => {
    navigator.clipboard.writeText(referralUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleShareWhatsApp = () => {
    const text = encodeURIComponent(
      `🎬 ভিডিও দেখে আয় করুন! প্রতিদিন সহজে ভিডিও টাস্ক কমপ্লিট করে বিকাশ ও নগদে টাকা উত্তোলন করুন। জয়েন করুন এই লিংকে: ${referralUrl}`
    );
    window.open(`https://api.whatsapp.com/send?text=${text}`, '_blank');
  };

  const handleShareFacebook = () => {
    window.open(
      `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(referralUrl)}`,
      '_blank'
    );
  };

  const REQUIRED_VALID_FOR_WITHDRAW = 20;
  const remainingForWithdraw = Math.max(0, REQUIRED_VALID_FOR_WITHDRAW - user.validReferrals);

  return (
    <section id="referral" className="py-12 sm:py-16 bg-slate-50 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-teal-100 text-teal-800 text-xs font-bold mb-2">
            <Users className="w-3.5 h-3.5 text-teal-600" />
            <span>Referral Program (রেফারেল প্রোগ্রাম)</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            বন্ধু ও পরিবারকে রেফার করুন
          </h2>
          <p className="text-slate-600 text-sm sm:text-base mt-2">
            আপনার নিজস্ব রেফারেল লিংক শেয়ার করুন। ২০টি ভ্যালিড রেফারেল পূরণ হলে সরাসরি উইথড্র সুবিধা আনলক হবে।
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left: Referral Link & Share Box (7 Cols) */}
          <div className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm">
            <h3 className="text-lg font-bold text-slate-900 mb-1 flex items-center gap-2">
              <span>আপনার Referral Link</span>
              <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
                Active
              </span>
            </h3>
            <p className="text-xs text-slate-500 mb-5">
              নিচের লিংকটি কপি করে সোশ্যাল মিডিয়া বা বন্ধুদের কাছে পাঠিয়ে দিন:
            </p>

            {/* Link Copy Bar */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 bg-slate-100 p-2 rounded-2xl border border-slate-200 mb-5">
              <input
                id="referral-link-input"
                type="text"
                readOnly
                value={referralUrl}
                className="bg-transparent px-3 py-2 text-xs sm:text-sm font-mono text-slate-800 font-semibold focus:outline-none flex-1 truncate"
              />
              <button
                id="copy-referral-link-btn"
                onClick={handleCopyLink}
                className={`px-5 py-2.5 rounded-xl font-bold text-xs sm:text-sm transition flex items-center justify-center gap-2 cursor-pointer ${
                  copied
                    ? 'bg-emerald-600 text-white shadow-xs'
                    : 'bg-emerald-600 hover:bg-emerald-700 text-white shadow-xs'
                }`}
              >
                {copied ? (
                  <>
                    <Check className="w-4 h-4" />
                    <span>Copied! (কপি হয়েছে)</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4" />
                    <span>Copy Link (লিংক কপি)</span>
                  </>
                )}
              </button>
            </div>

            {/* Social Share Shortcuts */}
            <div className="space-y-3">
              <span className="text-xs font-bold text-slate-700 block">
                সরাসরি শেয়ার করুন (One-Click Share):
              </span>
              <div className="flex flex-wrap gap-2.5">
                <button
                  id="share-whatsapp-btn"
                  onClick={handleShareWhatsApp}
                  className="px-4 py-2 bg-[#25D366]/10 hover:bg-[#25D366]/20 text-[#128C7E] border border-[#25D366]/30 rounded-xl text-xs font-semibold flex items-center gap-2 transition cursor-pointer"
                >
                  <Share2 className="w-3.5 h-3.5" />
                  <span>WhatsApp</span>
                </button>
                <button
                  id="share-facebook-btn"
                  onClick={handleShareFacebook}
                  className="px-4 py-2 bg-[#1877F2]/10 hover:bg-[#1877F2]/20 text-[#1877F2] border border-[#1877F2]/30 rounded-xl text-xs font-semibold flex items-center gap-2 transition cursor-pointer"
                >
                  <Share2 className="w-3.5 h-3.5" />
                  <span>Facebook</span>
                </button>
                <button
                  id="simulate-referral-btn"
                  onClick={onSimulateReferral}
                  className="px-4 py-2 bg-emerald-50 hover:bg-emerald-100 text-emerald-700 border border-emerald-300 rounded-xl text-xs font-semibold flex items-center gap-2 transition cursor-pointer ml-auto"
                  title="১ জন নতুন ভ্যালিড রেফারেল যোগ করার পরীক্ষা"
                >
                  <UserPlus className="w-3.5 h-3.5" />
                  <span>+১ ভ্যালিড রেফারেল সিমুলেট</span>
                </button>
              </div>
            </div>

            {/* Valid Referral Explanation */}
            <div className="mt-6 pt-5 border-t border-slate-100 bg-emerald-50/50 -mx-6 -mb-6 p-6 rounded-b-3xl text-xs text-slate-600">
              <div className="flex items-start gap-2.5">
                <Award className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-slate-800">ভ্যালিড রেফারেল কি?</strong>
                  <p className="mt-0.5">
                    আপনার রেফারেল লিংক ব্যবহার করে সাইন আপ করার পর যখন উক্ত ব্যবহারকারী অন্তত ১টি ভিডিও টাস্ক সম্পন্ন করবে, তখন তিনি "Valid Referral" হিসেবে গণ্য হবেন।
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Referral Stats Counters (5 Cols) */}
          <div className="lg:col-span-5 space-y-4">
            {/* Total Referrals Card */}
            <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm flex items-center justify-between">
              <div>
                <span className="text-xs font-medium text-slate-500 block">
                  Total Referrals (মোট রেফারেল)
                </span>
                <span className="text-3xl sm:text-4xl font-extrabold text-slate-900 mt-1 block">
                  {user.totalReferrals} জন
                </span>
                <span className="text-[11px] text-slate-400">
                  আপনার লিংকে মোট যোগদানকারী
                </span>
              </div>
              <div className="w-14 h-14 rounded-2xl bg-teal-50 text-teal-600 flex items-center justify-center">
                <Users className="w-7 h-7" />
              </div>
            </div>

            {/* Valid Referrals Card */}
            <div className="bg-white rounded-3xl p-6 border border-emerald-200 shadow-sm flex items-center justify-between relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-50 rounded-full blur-xl pointer-events-none" />
              <div className="relative z-10">
                <span className="text-xs font-semibold text-emerald-700 block">
                  Valid Referrals (সক্রিয় ভ্যালিড রেফারেল)
                </span>
                <span className="text-3xl sm:text-4xl font-extrabold text-emerald-700 mt-1 block">
                  {user.validReferrals} / {REQUIRED_VALID_FOR_WITHDRAW}
                </span>
                <span className="text-[11px] text-slate-500">
                  {remainingForWithdraw === 0
                    ? '✓ উইথড্র কোটা পূরণ হয়েছে!'
                    : `উইথড্র করতে আরও ${remainingForWithdraw}টি ভ্যালিড রেফার প্রয়োজন`}
                </span>
              </div>
              <div className="w-14 h-14 rounded-2xl bg-emerald-100 text-emerald-700 flex items-center justify-center relative z-10">
                <Award className="w-7 h-7" />
              </div>
            </div>

            {/* Referral Progress Box */}
            <div className="bg-gradient-to-br from-slate-900 to-slate-800 text-white rounded-3xl p-6 shadow-sm">
              <div className="flex justify-between items-center text-xs mb-2">
                <span className="text-slate-300 font-medium">উইথড্র রেফারেল অগ্রগতি</span>
                <span className="text-emerald-400 font-bold font-mono">
                  {Math.min(100, Math.round((user.validReferrals / REQUIRED_VALID_FOR_WITHDRAW) * 100))}%
                </span>
              </div>
              <div className="w-full bg-slate-700 rounded-full h-2.5 overflow-hidden mb-3">
                <div
                  className="bg-gradient-to-r from-emerald-400 to-teal-400 h-full rounded-full transition-all duration-500"
                  style={{
                    width: `${Math.min(100, Math.round((user.validReferrals / REQUIRED_VALID_FOR_WITHDRAW) * 100))}%`,
                  }}
                />
              </div>
              <p className="text-[11px] text-slate-400 leading-tight">
                ২০টি ভ্যালিড রেফারেল সম্পন্ন হলে বিকাশ বা নগদে ন্যূনতম ৳২০০ উত্তোলন আনলক হয়ে যাবে।
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
