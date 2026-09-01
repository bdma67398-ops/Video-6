import React, { useState, useEffect } from 'react';
import {
  Wallet,
  ShieldCheck,
  CheckCircle2,
  Clock,
  AlertTriangle,
  ArrowDownToLine,
  Phone,
  DollarSign,
  Lock,
  Unlock,
  Sparkles,
  Zap,
  PlusCircle,
  Film,
  UserCheck,
  TrendingUp
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { UserProfile, Transaction } from '../types';

interface LiveWithdrawFeedItem {
  id: string;
  userName: string;
  maskedPhone: string;
  amount: number;
  method: 'bKash' | 'Nagad' | 'Rocket';
  timeAgoMinutes: number;
  trxId: string;
  status: 'Approved' | 'Processing';
}

const INITIAL_LIVE_WITHDRAWS: LiveWithdrawFeedItem[] = [
  {
    id: 'feed-1',
    userName: 'মো: তানভীর হাসান',
    maskedPhone: '01712***890',
    amount: 300,
    method: 'bKash',
    timeAgoMinutes: 5,
    trxId: 'BK9X76TR',
    status: 'Approved',
  },
  {
    id: 'feed-2',
    userName: 'রাকিব আহমেদ',
    maskedPhone: '01898***432',
    amount: 500,
    method: 'Nagad',
    timeAgoMinutes: 20,
    trxId: 'NG5M22OP',
    status: 'Approved',
  },
  {
    id: 'feed-3',
    userName: 'সাদিয়া ইসলাম',
    maskedPhone: '01911***344',
    amount: 200,
    method: 'Rocket',
    timeAgoMinutes: 35,
    trxId: 'RK8K99QQ',
    status: 'Approved',
  },
  {
    id: 'feed-4',
    userName: 'মেহেদী হাসান শুভ',
    maskedPhone: '01655***788',
    amount: 450,
    method: 'bKash',
    timeAgoMinutes: 52,
    trxId: 'BK3L11AA',
    status: 'Approved',
  },
  {
    id: 'feed-5',
    userName: 'সুমাইয়া আক্তার',
    maskedPhone: '01733***566',
    amount: 250,
    method: 'Nagad',
    timeAgoMinutes: 75,
    trxId: 'NG7J44BB',
    status: 'Approved',
  },
  {
    id: 'feed-6',
    userName: 'কামরুল ইসলাম',
    maskedPhone: '01511***466',
    amount: 600,
    method: 'bKash',
    timeAgoMinutes: 110,
    trxId: 'BK4N88CC',
    status: 'Approved',
  },
  {
    id: 'feed-7',
    userName: 'আরিফুল ইসলাম রিফাত',
    maskedPhone: '01844***677',
    amount: 350,
    method: 'Rocket',
    timeAgoMinutes: 145,
    trxId: 'RK2V55DD',
    status: 'Approved',
  },
  {
    id: 'feed-8',
    userName: 'ফারহানা ইয়াসমিন',
    maskedPhone: '01399***766',
    amount: 400,
    method: 'bKash',
    timeAgoMinutes: 190,
    trxId: 'BK6P33EE',
    status: 'Approved',
  },
  {
    id: 'feed-9',
    userName: 'জাহিদ হোসেন রানা',
    maskedPhone: '01788***122',
    amount: 550,
    method: 'Nagad',
    timeAgoMinutes: 240,
    trxId: 'NG9Y11FF',
    status: 'Approved',
  },
  {
    id: 'feed-10',
    userName: 'নাজমুল করিম',
    maskedPhone: '01955***311',
    amount: 300,
    method: 'bKash',
    timeAgoMinutes: 310,
    trxId: 'BK1Q99GG',
    status: 'Approved',
  },
];

interface WithdrawSectionProps {
  user: UserProfile;
  transactions: Transaction[];
  onWithdrawSubmit: (data: { amount: number; method: 'bKash' | 'Nagad' | 'Rocket'; accountNumber: string }) => void;
  minWithdraw?: number;
  requiredValidReferrals?: number;
  enforceReferralRequirement?: boolean;
  onAddTestBonus?: () => void;
  onNavigateToVideos?: () => void;
}

export const WithdrawSection: React.FC<WithdrawSectionProps> = ({
  user,
  transactions,
  onWithdrawSubmit,
  minWithdraw = 300,
  requiredValidReferrals = 20,
  enforceReferralRequirement = false,
  onAddTestBonus,
  onNavigateToVideos,
}) => {
  const MIN_WITHDRAW = minWithdraw;
  const REQUIRED_VALID_REF = requiredValidReferrals;

  const [selectedMethod, setSelectedMethod] = useState<'bKash' | 'Nagad' | 'Rocket'>('bKash');
  const [amount, setAmount] = useState<string>(MIN_WITHDRAW.toString());
  const [accountNumber, setAccountNumber] = useState<string>(user.phone || '');
  const [errorMsg, setErrorMsg] = useState<string>('');
  const [successMsg, setSuccessMsg] = useState<string>('');
  const [lastTrxId, setLastTrxId] = useState<string>('');

  // 10 Live Dynamic Transactions State
  const [liveWithdraws, setLiveWithdraws] = useState<LiveWithdrawFeedItem[]>(INITIAL_LIVE_WITHDRAWS);

  // Subtle real-time increment effect for realism
  useEffect(() => {
    const interval = setInterval(() => {
      setLiveWithdraws((prev) =>
        prev.map((item, index) => {
          if (index === 0 && item.timeAgoMinutes > 12) {
            // cycle a new recent item
            return {
              ...item,
              timeAgoMinutes: 3,
              userName: 'মো: আল-আমিন হোসেন',
              amount: 350,
              trxId: 'BK' + Math.random().toString(36).substring(2, 8).toUpperCase(),
            };
          }
          return {
            ...item,
            timeAgoMinutes: item.timeAgoMinutes + 1,
          };
        })
      );
    }, 60000); // every 1 min
    return () => clearInterval(interval);
  }, []);

  const formatTimeAgo = (minutes: number): string => {
    if (minutes < 1) return 'এইমাত্র';
    if (minutes < 60) return `${minutes} মিনিট আগে`;
    const hours = Math.floor(minutes / 60);
    const remainingMins = minutes % 60;
    if (remainingMins === 0) return `${hours} ঘণ্টা আগে`;
    return `${hours} ঘণ্টা ${remainingMins} মিনিট আগে`;
  };

  const isBalanceEligible = user.balance >= MIN_WITHDRAW;
  const isReferralEligible = !enforceReferralRequirement || user.validReferrals >= REQUIRED_VALID_REF;
  const isEligible = isBalanceEligible && isReferralEligible;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');
    setSuccessMsg('');

    const numAmount = parseFloat(amount);

    // 1. Amount validation
    if (isNaN(numAmount) || numAmount <= 0) {
      setErrorMsg('উত্তোলনের জন্য একটি সঠিক টাকার পরিমাণ লিখুন।');
      return;
    }

    if (numAmount < MIN_WITHDRAW) {
      setErrorMsg(`সর্বনিম্ন উত্তোলনের পরিমাণ ৳${MIN_WITHDRAW} হতে হবে।`);
      return;
    }

    if (numAmount > user.balance) {
      setErrorMsg(`আপনার ব্যালেন্স (৳${user.balance.toFixed(2)}) অপর্যাপ্ত! আপনি ব্যালেন্সের চেয়ে বেশি তুলতে পারবেন না।`);
      return;
    }

    // 2. Referral enforcement check
    if (enforceReferralRequirement && user.validReferrals < REQUIRED_VALID_REF) {
      setErrorMsg(
        `উইথড্র করার জন্য অন্তত ${REQUIRED_VALID_REF}টি ভ্যালিড রেফারেল আবশ্যক। (আপনার আছে: ${user.validReferrals}টি)`
      );
      return;
    }

    // 3. Phone number validation
    let cleanPhone = accountNumber.trim().replace(/[\s-+]/g, '');
    if (cleanPhone.startsWith('880')) {
      cleanPhone = '0' + cleanPhone.substring(3);
    }

    if (!cleanPhone.match(/^01[3-9]\d{8}$/)) {
      setErrorMsg('সঠিক ১১ ডিজিটের মোবাইল নম্বর লিখুন (যেমন: 017XXXXXXXX, 018XXXXXXXX, 019XXXXXXXX)');
      return;
    }

    // Process Withdrawal
    const generatedTrxId = (selectedMethod.charAt(0) + Math.random().toString(36).substring(2, 8)).toUpperCase();
    setLastTrxId(generatedTrxId);

    // Also prepend to live feed so user sees their own transaction instantly at the top
    const userFeedItem: LiveWithdrawFeedItem = {
      id: 'feed-user-' + Date.now(),
      userName: user.name || 'আপনি (My Account)',
      maskedPhone: cleanPhone.substring(0, 5) + '***' + cleanPhone.substring(8),
      amount: numAmount,
      method: selectedMethod,
      timeAgoMinutes: 0,
      trxId: generatedTrxId,
      status: 'Approved',
    };

    setLiveWithdraws((prev) => [userFeedItem, ...prev.slice(0, 9)]);

    onWithdrawSubmit({
      amount: numAmount,
      method: selectedMethod,
      accountNumber: cleanPhone,
    });

    try {
      confetti({
        particleCount: 100,
        spread: 80,
        origin: { y: 0.6 },
      });
    } catch (err) {}

    setSuccessMsg(
      `🎉 ৳${numAmount} উত্তোলনের অনুরোধ সফলভাবে গ্রহণ করা হয়েছে! TrxID: ${generatedTrxId}। অল্প কিছুক্ষণের মধ্যেই আপনার ${selectedMethod} একাউন্টে টাকা পাঠানো হবে।`
    );
  };

  const handleSetMaxAmount = () => {
    if (user.balance > 0) {
      setAmount(Math.floor(user.balance).toString());
    } else {
      setAmount(MIN_WITHDRAW.toString());
    }
  };

  return (
    <section id="withdraw" className="py-12 sm:py-16 bg-white border-b border-slate-200 scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold mb-2">
            <ArrowDownToLine className="w-3.5 h-3.5 text-emerald-600" />
            <span>Withdrawal Center (টাকা উত্তোলন সেকশন)</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            টাকা উত্তোলন করুন (bKash / Nagad / Rocket)
          </h2>
          <p className="text-slate-600 text-sm sm:text-base mt-2">
            আপনার অর্জিত রিওয়ার্ড বিকাশ, নগদ অথবা রকেটে নিরাপদে ক্যাশ আউট করুন।
          </p>
        </div>

        {/* Withdrawal Status & Eligibility Banner */}
        <div className="max-w-4xl mx-auto mb-8">
          <div
            className={`rounded-2xl p-5 border flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 ${
              isEligible
                ? 'bg-emerald-50/90 border-emerald-300 text-emerald-950 shadow-xs'
                : 'bg-amber-50/80 border-amber-300 text-amber-950 shadow-xs'
            }`}
          >
            <div className="flex items-start gap-3.5">
              <div
                className={`w-10 h-10 rounded-xl flex items-center justify-center font-bold text-white shrink-0 ${
                  isEligible ? 'bg-emerald-600 shadow-md' : 'bg-amber-600 shadow-md'
                }`}
              >
                {isEligible ? <CheckCircle2 className="w-6 h-6" /> : <Unlock className="w-5 h-5" />}
              </div>
              <div>
                <h4 className="font-bold text-base flex items-center gap-2">
                  <span>{isEligible ? 'উইথড্র সুবিধা সক্রিয় রয়েছে' : 'উইথড্র শর্তাবলী ও তথ্য'}</span>
                  <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold uppercase ${
                    isEligible ? 'bg-emerald-200 text-emerald-900' : 'bg-amber-200 text-amber-900'
                  }`}>
                    {isEligible ? 'Ready to Withdraw' : 'Check Balance'}
                  </span>
                </h4>
                <div className="flex flex-wrap gap-y-1 gap-x-4 text-xs mt-1">
                  <span className={isBalanceEligible ? 'text-emerald-700 font-semibold' : 'text-amber-800'}>
                    • সর্বনিম্ন উত্তোলন: <strong>৳{MIN_WITHDRAW}</strong> (আপনার বর্তমান ব্যালেন্স: <strong>৳{user.balance.toFixed(2)}</strong>)
                  </span>
                  {enforceReferralRequirement && (
                    <span className={isReferralEligible ? 'text-emerald-700 font-semibold' : 'text-amber-800'}>
                      • প্রয়োজনীয় ভ্যালিড রেফারেল: <strong>{REQUIRED_VALID_REF}</strong> (আপনার আছে: <strong>{user.validReferrals}</strong>)
                    </span>
                  )}
                </div>
              </div>
            </div>

            {/* Quick Test Helper if balance is below min */}
            {!isBalanceEligible && onAddTestBonus && (
              <button
                type="button"
                onClick={onAddTestBonus}
                className="px-3.5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold transition flex items-center gap-1.5 shrink-0 shadow-xs cursor-pointer"
              >
                <PlusCircle className="w-4 h-4" />
                <span>+ ৳৫০ টেস্ট ব্যালেন্স যোগ করুন</span>
              </button>
            )}
          </div>
        </div>

        {/* Form and Transaction History */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 max-w-5xl mx-auto">
          {/* Withdrawal Form (7 Cols) */}
          <div className="lg:col-span-7 bg-slate-50 rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                <Wallet className="w-5 h-5 text-emerald-600" />
                <span>উইথড্র রিকোয়েস্ট ফরম</span>
              </h3>
              <span className="text-xs bg-emerald-100 text-emerald-800 font-bold px-2.5 py-1 rounded-lg">
                ব্যালেন্স: ৳{user.balance.toFixed(2)}
              </span>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Payment Method Selector */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-2">
                  পেমেন্ট মেথড নির্বাচন করুন (Select Method)
                </label>
                <div className="grid grid-cols-3 gap-3">
                  {/* bKash */}
                  <button
                    type="button"
                    id="method-bkash-btn"
                    onClick={() => setSelectedMethod('bKash')}
                    className={`py-3 px-3 rounded-2xl border-2 font-bold text-sm flex flex-col items-center justify-center gap-1 transition cursor-pointer ${
                      selectedMethod === 'bKash'
                        ? 'border-[#E2136E] bg-[#E2136E]/10 text-[#E2136E] shadow-xs'
                        : 'border-slate-200 bg-white text-slate-700 hover:border-slate-300'
                    }`}
                  >
                    <span className="text-base">বিকাশ</span>
                    <span className="text-[10px] font-semibold opacity-80">bKash</span>
                  </button>

                  {/* Nagad */}
                  <button
                    type="button"
                    id="method-nagad-btn"
                    onClick={() => setSelectedMethod('Nagad')}
                    className={`py-3 px-3 rounded-2xl border-2 font-bold text-sm flex flex-col items-center justify-center gap-1 transition cursor-pointer ${
                      selectedMethod === 'Nagad'
                        ? 'border-[#F7941D] bg-[#F7941D]/10 text-[#F7941D] shadow-xs'
                        : 'border-slate-200 bg-white text-slate-700 hover:border-slate-300'
                    }`}
                  >
                    <span className="text-base">নগদ</span>
                    <span className="text-[10px] font-semibold opacity-80">Nagad</span>
                  </button>

                  {/* Rocket */}
                  <button
                    type="button"
                    id="method-rocket-btn"
                    onClick={() => setSelectedMethod('Rocket')}
                    className={`py-3 px-3 rounded-2xl border-2 font-bold text-sm flex flex-col items-center justify-center gap-1 transition cursor-pointer ${
                      selectedMethod === 'Rocket'
                        ? 'border-[#8C3494] bg-[#8C3494]/10 text-[#8C3494] shadow-xs'
                        : 'border-slate-200 bg-white text-slate-700 hover:border-slate-300'
                    }`}
                  >
                    <span className="text-base">রকেট</span>
                    <span className="text-[10px] font-semibold opacity-80">Rocket</span>
                  </button>
                </div>
              </div>

              {/* Withdraw Amount */}
              <div>
                <div className="flex justify-between items-center mb-1.5">
                  <label className="block text-xs font-bold text-slate-700">
                    উত্তোলনের পরিমাণ (টাকা)
                  </label>
                  <button
                    type="button"
                    onClick={handleSetMaxAmount}
                    className="text-xs text-emerald-600 hover:text-emerald-700 font-bold underline cursor-pointer"
                  >
                    সর্বোচ্চ (Max: ৳{user.balance.toFixed(2)})
                  </button>
                </div>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-500 font-bold text-base">
                    ৳
                  </div>
                  <input
                    id="withdraw-amount-input"
                    type="number"
                    min={MIN_WITHDRAW}
                    step="1"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    placeholder={MIN_WITHDRAW.toString()}
                    className="w-full pl-9 pr-4 py-3 bg-white border border-slate-300 rounded-xl text-slate-900 font-bold text-base focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none transition"
                  />
                </div>
                {/* Quick Selection Pills */}
                <div className="flex flex-wrap gap-2 mt-2">
                  {[50, 100, 200, 300, 500, 1000].map((quickAmt) => (
                    <button
                      key={quickAmt}
                      type="button"
                      onClick={() => setAmount(quickAmt.toString())}
                      className={`px-3 py-1 text-xs font-semibold rounded-lg border transition cursor-pointer ${
                        amount === quickAmt.toString()
                          ? 'bg-emerald-600 text-white border-emerald-600'
                          : 'bg-white hover:bg-slate-100 text-slate-700 border-slate-200'
                      }`}
                    >
                      ৳{quickAmt}
                    </button>
                  ))}
                </div>
              </div>

              {/* Account Number */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">
                  আপনার {selectedMethod} পার্সোনাল নাম্বার
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                    <Phone className="w-4 h-4" />
                  </div>
                  <input
                    id="withdraw-number-input"
                    type="tel"
                    required
                    value={accountNumber}
                    onChange={(e) => setAccountNumber(e.target.value)}
                    placeholder="017XXXXXXXX বা 018XXXXXXXX"
                    className="w-full pl-10 pr-4 py-3 bg-white border border-slate-300 rounded-xl text-slate-900 text-sm font-semibold focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none transition"
                  />
                </div>
                <p className="text-[11px] text-slate-500 mt-1">
                  নম্বরটি সঠিক ও চালু থাকা আবশ্যক।
                </p>
              </div>

              {/* Error Alert */}
              {errorMsg && (
                <div className="p-3.5 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs font-medium flex items-start gap-2 animate-in fade-in">
                  <AlertTriangle className="w-4 h-4 shrink-0 mt-0.5" />
                  <div className="flex-1">
                    <span>{errorMsg}</span>
                    {user.balance < MIN_WITHDRAW && onNavigateToVideos && (
                      <button
                        type="button"
                        onClick={onNavigateToVideos}
                        className="block mt-1 text-emerald-700 hover:underline font-bold"
                      >
                        🎬 এখনই ভিডিও টাস্ক করে ব্যালেন্স বাড়ান →
                      </button>
                    )}
                  </div>
                </div>
              )}

              {/* Success Alert */}
              {successMsg && (
                <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-300 text-emerald-900 text-xs font-medium flex items-start gap-2.5 animate-in zoom-in-95">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                  <div className="flex-1 space-y-1">
                    <p className="font-bold text-sm text-emerald-800">উইথড্র রিকোয়েস্ট সফল!</p>
                    <p className="text-emerald-700">{successMsg}</p>
                  </div>
                </div>
              )}

              {/* Submit Button */}
              <button
                type="submit"
                id="submit-withdraw-btn"
                className="w-full py-3.5 px-4 rounded-xl font-bold text-sm transition flex items-center justify-center gap-2 cursor-pointer shadow-lg bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-600 hover:from-emerald-700 hover:to-teal-700 text-white shadow-emerald-600/30 transform hover:scale-[1.01] active:scale-[0.99]"
              >
                <ArrowDownToLine className="w-4 h-4" />
                <span>টাকা উত্তোলন রিকোয়েস্ট পাঠান (Withdraw Now)</span>
              </button>
            </form>
          </div>

          {/* 10 Live Real-Time Transactions Feed Section (5 Cols) */}
          <div className="lg:col-span-5 bg-slate-50 rounded-3xl p-6 sm:p-7 border border-slate-200 shadow-sm flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-3 border-b border-slate-200/80 pb-3">
                <div>
                  <h3 className="text-base font-extrabold text-slate-900 flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping" />
                    <span>দৈনিক ১০টি লাইভ লেনদেন</span>
                  </h3>
                  <p className="text-[11px] text-slate-500 mt-0.5">
                    রিয়েল-টাইম মেম্বার পেমেন্ট ও সফল ক্যাশআউট হিস্টোরি
                  </p>
                </div>
                <span className="px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-extrabold border border-emerald-200">
                  ১০টি সফল লেনদেন
                </span>
              </div>

              {/* 10 Live Feed List */}
              <div className="space-y-2.5 max-h-[440px] overflow-y-auto pr-1">
                {liveWithdraws.map((item, idx) => (
                  <div
                    key={item.id}
                    id={`live-feed-item-${item.id}`}
                    className={`bg-white rounded-2xl p-3 sm:p-3.5 border transition-all ${
                      idx === 0
                        ? 'border-emerald-400/90 shadow-sm bg-emerald-50/30 ring-1 ring-emerald-500/20'
                        : 'border-slate-200/90 hover:border-slate-300 shadow-2xs'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-2">
                      {/* Left info: User Name & Masked Mobile */}
                      <div>
                        <div className="flex items-center gap-1.5">
                          <UserCheck className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                          <span className="font-bold text-slate-900 text-xs sm:text-sm">
                            {item.userName}
                          </span>
                        </div>
                        <div className="text-[11px] text-slate-500 font-mono mt-0.5 pl-5">
                          {item.maskedPhone} • <span className="font-semibold text-slate-700">{item.method}</span>
                        </div>
                      </div>

                      {/* Right info: Amount & Status Badge */}
                      <div className="text-right shrink-0">
                        <div className="font-black text-emerald-600 text-sm">
                          ৳{item.amount}
                        </div>
                        <span className="inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-300 mt-0.5">
                          <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                          সম্পন্ন
                        </span>
                      </div>
                    </div>

                    {/* Bottom: Relative Time (e.g. 5 মিনিট আগে, 20 মিনিট আগে) & TrxID */}
                    <div className="mt-2 pt-2 border-t border-slate-100 flex items-center justify-between text-[10px] sm:text-[11px] text-slate-500 font-medium">
                      <span className="flex items-center gap-1 text-slate-600 font-semibold">
                        <Clock className="w-3 h-3 text-amber-500" />
                        <span className="text-emerald-700">{formatTimeAgo(item.timeAgoMinutes)}</span> টাকা উত্তোলন করেছে
                      </span>
                      <span className="font-mono text-slate-400">TrxID: {item.trxId}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Security Badge */}
            <div className="mt-5 pt-3 border-t border-slate-200/80 text-xs text-slate-500 flex items-center justify-between">
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                <span className="font-medium text-[11px]">১০০% নিরাপদ বিকাশ, নগদ ও রকেট পেমেন্ট</span>
              </div>
              <span className="text-[10px] text-emerald-700 font-bold bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                স্বয়ংক্রিয় প্রসেসিং
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
