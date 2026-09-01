import React, { useState } from 'react';
import {
  Wallet,
  Users,
  CheckCircle2,
  ArrowRight,
  Lock,
  Unlock,
  AlertCircle,
  PlusCircle,
  RefreshCw,
  ArrowDownToLine,
  Sparkles,
  Zap
} from 'lucide-react';
import { UserProfile } from '../types';

interface BalanceCardProps {
  user: UserProfile;
  minWithdraw?: number;
  requiredValidReferrals?: number;
  enforceReferralRequirement?: boolean;
  onNavigateToWithdraw: () => void;
  onNavigateToReferral: () => void;
  onNavigateToVideos: () => void;
  onAddTestBonus?: () => void;
  onAddTestReferral?: () => void;
  onResetUserData?: () => void;
}

export const BalanceCard: React.FC<BalanceCardProps> = ({
  user,
  minWithdraw = 300,
  requiredValidReferrals = 20,
  enforceReferralRequirement = false,
  onNavigateToWithdraw,
  onNavigateToReferral,
  onNavigateToVideos,
  onAddTestBonus,
  onAddTestReferral,
  onResetUserData,
}) => {
  const [showSimulator, setShowSimulator] = useState(false);

  const MIN_WITHDRAW_BALANCE = minWithdraw;
  const REQUIRED_VALID_REFERRALS = requiredValidReferrals;

  const isBalanceEligible = user.balance >= MIN_WITHDRAW_BALANCE;
  const isReferralEligible = !enforceReferralRequirement || user.validReferrals >= REQUIRED_VALID_REFERRALS;
  const isWithdrawUnlocked = isBalanceEligible && isReferralEligible;

  // Percentage calculations
  const balancePercent = Math.min(100, Math.round((user.balance / Math.max(1, MIN_WITHDRAW_BALANCE)) * 100));
  const referralPercent = Math.min(100, Math.round((user.validReferrals / Math.max(1, REQUIRED_VALID_REFERRALS)) * 100));

  return (
    <div id="balance" className="my-8 scroll-mt-20">
      <div className="bg-gradient-to-br from-slate-900 via-slate-800 to-emerald-950 text-white rounded-3xl p-6 sm:p-8 shadow-xl border border-emerald-500/20 relative overflow-hidden">
        {/* Background glow & mesh */}
        <div className="absolute top-0 right-0 w-72 h-72 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-60 h-60 bg-teal-500/10 rounded-full blur-2xl pointer-events-none" />

        <div className="relative z-10">
          {/* Card Top Title & Status */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-700/60">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 border border-emerald-400/30 flex items-center justify-center text-emerald-400">
                <Wallet className="w-6 h-6" />
              </div>
              <div>
                <span className="text-xs font-semibold text-emerald-400 uppercase tracking-wider">
                  User Wallet & Activity
                </span>
                <h3 className="text-xl sm:text-2xl font-bold text-white">আমার একাউন্ট ড্যাশবোর্ড</h3>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <span
                className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold ${
                  isWithdrawUnlocked
                    ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                    : 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                }`}
              >
                {isWithdrawUnlocked ? (
                  <>
                    <Unlock className="w-3.5 h-3.5" />
                    <span>উইথড্র সক্রিয় (Eligible)</span>
                  </>
                ) : (
                  <>
                    <Lock className="w-3.5 h-3.5" />
                    <span>উইথড্র প্রস্তুত (Withdraw Ready)</span>
                  </>
                )}
              </span>

              {/* Toggle Simulator helper button */}
              <button
                id="toggle-simulator-btn"
                onClick={() => setShowSimulator(!showSimulator)}
                className="px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-medium border border-slate-700 transition cursor-pointer"
                title="টেস্ট ব্যালেন্স বা রেফারেল যোগ করার টুলস"
              >
                {showSimulator ? 'সিমুলেটর বন্ধ' : '🧪 টেস্ট কন্ট্রোল'}
              </button>
            </div>
          </div>

          {/* Core Metrics 3-Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 my-6">
            {/* Metric 1: বর্তমান Balance */}
            <div className="bg-slate-800/80 rounded-2xl p-5 border border-slate-700/80 hover:border-emerald-500/40 transition">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-medium text-slate-400">বর্তমান ব্যালেন্স (Wallet)</span>
                <div className="w-7 h-7 rounded-lg bg-emerald-500/10 text-emerald-400 flex items-center justify-center text-xs font-bold">
                  ৳
                </div>
              </div>
              <div className="text-3xl sm:text-4xl font-extrabold text-emerald-400 tracking-tight mb-2">
                ৳{user.balance.toFixed(2)}
              </div>
              <div className="space-y-1">
                <div className="flex justify-between text-[11px] text-slate-400">
                  <span>সর্বনিম্ন উত্তোলন: ৳{MIN_WITHDRAW_BALANCE}</span>
                  <span className={isBalanceEligible ? 'text-emerald-400 font-bold' : 'text-slate-300'}>
                    {balancePercent}%
                  </span>
                </div>
                <div className="w-full bg-slate-700/60 rounded-full h-1.5 overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all duration-500 ${
                      isBalanceEligible ? 'bg-emerald-400' : 'bg-emerald-500'
                    }`}
                    style={{ width: `${balancePercent}%` }}
                  />
                </div>
              </div>
            </div>

            {/* Metric 2: Referral */}
            <div className="bg-slate-800/80 rounded-2xl p-5 border border-slate-700/80 hover:border-teal-500/40 transition">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-medium text-slate-400">রেফারেল (Referral)</span>
                <div className="w-7 h-7 rounded-lg bg-teal-500/10 text-teal-400 flex items-center justify-center">
                  <Users className="w-4 h-4" />
                </div>
              </div>
              <div className="flex items-baseline gap-2 mb-2">
                <div className="text-3xl sm:text-4xl font-extrabold text-teal-400 tracking-tight">
                  {user.validReferrals}
                </div>
                <span className="text-xs text-slate-400">
                  (মোট রেফারেল: {user.totalReferrals})
                </span>
              </div>
              <div className="space-y-1">
                <div className="flex justify-between text-[11px] text-slate-400">
                  <span>ভ্যালিড রেফারেল লক্ষ্য: {REQUIRED_VALID_REFERRALS}</span>
                  <span className={isReferralEligible ? 'text-emerald-400 font-bold' : 'text-slate-300'}>
                    {referralPercent}%
                  </span>
                </div>
                <div className="w-full bg-slate-700/60 rounded-full h-1.5 overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all duration-500 ${
                      isReferralEligible ? 'bg-teal-400' : 'bg-teal-500'
                    }`}
                    style={{ width: `${referralPercent}%` }}
                  />
                </div>
              </div>
            </div>

            {/* Metric 3: Completed Tasks */}
            <div className="bg-slate-800/80 rounded-2xl p-5 border border-slate-700/80 hover:border-amber-500/40 transition">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-medium text-slate-400">সম্পন্ন টাস্ক (Tasks)</span>
                <div className="w-7 h-7 rounded-lg bg-amber-500/10 text-amber-400 flex items-center justify-center">
                  <CheckCircle2 className="w-4 h-4" />
                </div>
              </div>
              <div className="text-3xl sm:text-4xl font-extrabold text-amber-400 tracking-tight mb-2">
                {user.completedTasksCount}
              </div>
              <p className="text-[11px] text-slate-400">
                প্রতি টাস্কে ৫/১০ সেকেন্ড দেখে ৳১ - ৳২ আয়
              </p>
            </div>
          </div>

          {/* Action Bar (Withdraw Button Always Clickable and Interactive!) */}
          <div className="pt-2">
            <div className="bg-gradient-to-r from-emerald-950/90 via-slate-900 to-teal-950/90 border border-emerald-500/40 rounded-2xl p-4 sm:p-5 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-emerald-500 text-slate-950 flex items-center justify-center font-bold shrink-0 shadow-md">
                  <ArrowDownToLine className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white flex items-center gap-2">
                    <span>টাকা উত্তোলন (Withdraw)</span>
                    <span className="text-xs text-emerald-400 font-mono">
                      (বর্তমান ব্যালেন্স: ৳{user.balance.toFixed(2)})
                    </span>
                  </h4>
                  <p className="text-xs text-slate-300">
                    বিকাশ, নগদ অথবা রকেটের মাধ্যমে সরাসরি আপনার একাউন্টে টাকা গ্রহণ করুন।
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2 w-full sm:w-auto">
                <button
                  id="balance-card-withdraw-btn"
                  onClick={onNavigateToWithdraw}
                  className="w-full sm:w-auto px-6 py-3 bg-gradient-to-r from-emerald-500 to-teal-400 hover:from-emerald-400 hover:to-teal-300 text-slate-950 font-bold rounded-xl shadow-lg shadow-emerald-500/30 transition flex items-center justify-center gap-2 cursor-pointer text-sm transform hover:scale-[1.02]"
                >
                  <ArrowDownToLine className="w-4 h-4" />
                  <span>Withdraw করুন</span>
                </button>
              </div>
            </div>
          </div>

          {/* Quick Demo Simulator Drawer */}
          {showSimulator && (
            <div className="mt-4 pt-4 border-t border-slate-700/70 bg-slate-900/90 rounded-xl p-4 border border-dashed border-emerald-500/30 animate-in fade-in">
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-bold text-emerald-400">
                  🧪 টেস্টিং সিমুলেটর (Testing Controls for Live Preview)
                </span>
                <span className="text-[11px] text-slate-400">
                  টেস্টিংয়ের জন্য দ্রুত ব্যালেন্স ও রেফারেল যোগ করুন
                </span>
              </div>
              <div className="flex flex-wrap gap-2">
                {onAddTestBonus && (
                  <button
                    id="sim-add-balance-btn"
                    onClick={onAddTestBonus}
                    className="px-3 py-1.5 bg-emerald-600/40 hover:bg-emerald-600/60 text-emerald-200 rounded-lg text-xs font-medium border border-emerald-500/40 flex items-center gap-1.5 cursor-pointer"
                  >
                    <PlusCircle className="w-3.5 h-3.5" />
                    + ৳৫০ ব্যালেন্স যোগ করুন
                  </button>
                )}
                {onAddTestReferral && (
                  <button
                    id="sim-add-referral-btn"
                    onClick={onAddTestReferral}
                    className="px-3 py-1.5 bg-teal-600/40 hover:bg-teal-600/60 text-teal-200 rounded-lg text-xs font-medium border border-teal-500/40 flex items-center gap-1.5 cursor-pointer"
                  >
                    <Users className="w-3.5 h-3.5" />
                    + ৫টি ভ্যালিড রেফারেল যোগ করুন
                  </button>
                )}
                {onResetUserData && (
                  <button
                    id="sim-reset-btn"
                    onClick={onResetUserData}
                    className="px-3 py-1.5 bg-rose-600/30 hover:bg-rose-600/50 text-rose-300 rounded-lg text-xs font-medium border border-rose-500/40 flex items-center gap-1.5 cursor-pointer ml-auto"
                  >
                    <RefreshCw className="w-3.5 h-3.5" />
                    রিসেট ডাটা (৳০)
                  </button>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
