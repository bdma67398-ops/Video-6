import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { HeroSection } from './components/HeroSection';
import { BalanceCard } from './components/BalanceCard';
import { PromoOffersSection } from './components/PromoOffersSection';
import { CountryVideosSection } from './components/CountryVideosSection';
import { RewardTaskSection } from './components/RewardTaskSection';
import { VideoPlayerModal } from './components/VideoPlayerModal';
import { ReferralSection } from './components/ReferralSection';
import { WithdrawSection } from './components/WithdrawSection';
import { AdvertisementArea } from './components/AdvertisementArea';
import { Footer } from './components/Footer';
import { AuthModal } from './components/AuthModal';
import { LegalModal } from './components/LegalModals';
import { AdminPanel } from './components/AdminPanel';
import { UserProfile, VideoTask, Transaction, PlatformSettings } from './types';
import { INITIAL_VIDEO_TASKS, INITIAL_TRANSACTIONS, INITIAL_AD_CONTROLS, PROFITABLE_AD_LINKS } from './data/initialData';
import { PopunderManager } from './components/PopunderManager';
import { CheckCircle2, Sparkles, Bell, Megaphone, ShieldAlert } from 'lucide-react';

const STORAGE_KEY_USER = 'bd_video_earn_user_profile_v1';
const STORAGE_KEY_TRX = 'bd_video_earn_transactions_v1';
const STORAGE_KEY_TASKS = 'bd_video_earn_tasks_v5';
const STORAGE_KEY_SETTINGS = 'bd_video_earn_settings_v3';

const DEFAULT_SETTINGS: PlatformSettings = {
  minWithdrawAmount: 300,
  requiredValidReferrals: 0,
  enforceReferralRequirement: false,
  cooldownHours: 5,
  rewardPer5Sec: 1,
  rewardPer10Sec: 2,
  adsEnabled: true,
  telegramLink: 'https://t.me/bd_video_earn_official',
  noticeBanner: '📢 মেম্বার নোটিশ: স্বাগতম বোনাস ৳৫০! ন্যূনতম ৳৩০০ ব্যালেন্স হলে সাথে সাথে বিকাশ/নগদে পেমেন্ট গ্রহণ করুন!',
  adminUsername: 'mominul',
  adminPassword: 'Mo135Yfj',
  adControls: INITIAL_AD_CONTROLS,
};

export default function App() {
  // 1. User state with initial 50 Taka bonus
  const [user, setUser] = useState<UserProfile>(() => {
    const saved = localStorage.getItem(STORAGE_KEY_USER);
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        return {
          ...parsed,
          balance: parsed.balance !== undefined ? parsed.balance : 50.0,
          isLoggedIn: true,
        };
      } catch (e) {}
    }
    return {
      id: 'usr_bd_' + Math.random().toString(36).substring(2, 7),
      name: 'অতিথি মেম্বার (Guest)',
      phone: '',
      email: '',
      balance: 50.0,
      totalReferrals: 0,
      validReferrals: 0,
      completedTasksCount: 0,
      referralCode: 'BD' + Math.floor(100000 + Math.random() * 900000),
      isLoggedIn: true,
      cooldownUntil: null,
    };
  });

  // 2. Transactions state
  const [transactions, setTransactions] = useState<Transaction[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEY_TRX);
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {}
    }
    return INITIAL_TRANSACTIONS;
  });

  // 3. Dynamic Video Tasks state
  const [tasks, setTasks] = useState<VideoTask[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEY_TASKS);
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {}
    }
    return INITIAL_VIDEO_TASKS;
  });

  // 4. Platform Settings
  const [settings, setSettings] = useState<PlatformSettings>(() => {
    const saved = localStorage.getItem(STORAGE_KEY_SETTINGS);
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        return {
          ...DEFAULT_SETTINGS,
          ...parsed,
          adControls: {
            ...DEFAULT_SETTINGS.adControls,
            ...(parsed.adControls || {}),
            directAdUrl: parsed.adControls?.directAdUrl || DEFAULT_SETTINGS.adControls.directAdUrl,
          },
        };
      } catch (e) {}
    }
    return DEFAULT_SETTINGS;
  });

  // 5. UI states
  const [activeSection, setActiveSection] = useState<string>('home');
  const [activeVideoTask, setActiveVideoTask] = useState<VideoTask | null>(null);
  const [isAuthOpen, setIsAuthOpen] = useState<boolean>(false);
  const [isAdminOpen, setIsAdminOpen] = useState<boolean>(false);
  const [legalModalType, setLegalModalType] = useState<'about' | 'terms' | 'privacy' | 'contact' | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Live Real-Time Withdrawal Alert Simulation for Traffic Engagement
  const LIVE_WITHDRAW_ALERTS = [
    { name: 'মো: তানভীর হাসান', amount: 300, method: 'বিকাশ (bKash)', timeAgo: '৫ মিনিট আগে', phone: '01712***890' },
    { name: 'রাকিব আহমেদ', amount: 500, method: 'নগদ (Nagad)', timeAgo: '২০ মিনিট আগে', phone: '01898***432' },
    { name: 'সাদিয়া ইসলাম', amount: 200, method: 'রকেট (Rocket)', timeAgo: '৩৫ মিনিট আগে', phone: '01911***344' },
    { name: 'মেহেদী হাসান শুভ', amount: 450, method: 'বিকাশ (bKash)', timeAgo: '৫২ মিনিট আগে', phone: '01655***788' },
    { name: 'সুমাইয়া আক্তার', amount: 250, method: 'নগদ (Nagad)', timeAgo: '১ ঘণ্টা আগে', phone: '01733***566' },
    { name: 'কামরুল ইসলাম', amount: 600, method: 'বিকাশ (bKash)', timeAgo: '১ ঘণ্টা ২০ মিনিট আগে', phone: '01511***466' },
    { name: 'আরিফুল ইসলাম', amount: 350, method: 'রকেট (Rocket)', timeAgo: '২ ঘণ্টা আগে', phone: '01844***677' },
    { name: 'ফারহানা ইয়াসমিন', amount: 400, method: 'বিকাশ (bKash)', timeAgo: '২ ঘণ্টা ৪০ মিনিট আগে', phone: '01399***766' },
    { name: 'জাহিদ হোসেন রানা', amount: 550, method: 'নগদ (Nagad)', timeAgo: '৩ ঘণ্টা আগে', phone: '01788***122' },
    { name: 'নাজমুল করিম', amount: 300, method: 'বিকাশ (bKash)', timeAgo: '৪ ঘণ্টা আগে', phone: '01955***311' },
  ];

  const [currentAlertIndex, setCurrentAlertIndex] = useState<number>(0);
  const [showLiveAlert, setShowLiveAlert] = useState<boolean>(true);

  // Rotate Live Alerts every 12 seconds
  useEffect(() => {
    const alertInterval = setInterval(() => {
      setShowLiveAlert(false);
      setTimeout(() => {
        setCurrentAlertIndex((prev) => (prev + 1) % LIVE_WITHDRAW_ALERTS.length);
        setShowLiveAlert(true);
      }, 600);
    }, 12000);
    return () => clearInterval(alertInterval);
  }, []);

  // Traffic Balance Guarantee: Ensure user account has money & passive earning (+৳1 every 2 minutes)
  useEffect(() => {
    // If balance is 0, give welcome starter bonus 50 Taka
    if (user.balance < 50) {
      setUser((prev) => ({ ...prev, balance: 50.0 }));
    }

    // Passive active browsing bonus (+৳1 every 2 mins)
    const bonusInterval = setInterval(() => {
      setUser((prev) => ({
        ...prev,
        balance: +(prev.balance + 1.0).toFixed(2),
      }));
    }, 120000);

    return () => clearInterval(bonusInterval);
  }, []);

  // Sync to local storage
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY_USER, JSON.stringify(user));
  }, [user]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY_TRX, JSON.stringify(transactions));
  }, [transactions]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY_TASKS, JSON.stringify(tasks));
  }, [tasks]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY_SETTINGS, JSON.stringify(settings));
  }, [settings]);

  // Secret Admin Triggers: URL hash / search params & Keyboard shortcut
  useEffect(() => {
    const checkAdminTrigger = () => {
      const hash = window.location.hash.toLowerCase();
      const params = new URLSearchParams(window.location.search);
      if (hash === '#admin' || hash === '#adminpanel' || params.has('admin')) {
        setIsAdminOpen(true);
      }
    };

    checkAdminTrigger();
    window.addEventListener('hashchange', checkAdminTrigger);

    const handleKeyDown = (e: KeyboardEvent) => {
      // Ctrl + Shift + A or Alt + A
      if ((e.ctrlKey && e.shiftKey && e.key.toLowerCase() === 'a') || (e.altKey && e.key.toLowerCase() === 'a')) {
        e.preventDefault();
        setIsAdminOpen(true);
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('hashchange', checkAdminTrigger);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  // Toast helper
  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage((curr) => (curr === msg ? null : curr));
    }, 4000);
  };

  // Navigation smoothly
  const handleNavigate = (sectionId: string) => {
    setActiveSection(sectionId);
    if (sectionId === 'home') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      const el = document.getElementById(sectionId);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  };

  // Video Task Handlers
  const handleStartTask = (task: VideoTask) => {
    setActiveVideoTask(task);
  };

  const handleCompleteTask = (task: VideoTask) => {
    setUser((prev) => {
      const updatedBalance = prev.balance + task.reward;
      const updatedTasksCount = prev.completedTasksCount + 1;
      return {
        ...prev,
        balance: updatedBalance,
        completedTasksCount: updatedTasksCount,
      };
    });

    showToast(`🎉 অভিনন্দন! ৳${task.reward} সফলভাবে আপনার ব্যালেন্সে যোগ করা হয়েছে!`);
    setActiveVideoTask(null);
  };

  // Cooldown Controls
  const handleSetCooldown = (hours: number) => {
    const cooldownMs = Date.now() + hours * 60 * 60 * 1000;
    setUser((prev) => ({
      ...prev,
      cooldownUntil: cooldownMs,
    }));
    showToast(`⏱️ ${hours} ঘণ্টার টাস্ক Cooldown সক্রিয় করা হয়েছে।`);
  };

  const handleClearCooldown = () => {
    setUser((prev) => ({
      ...prev,
      cooldownUntil: null,
    }));
    showToast('✓ টাস্ক Cooldown তুলে নেওয়া হয়েছে। আপনি আবার ভিডিও দেখতে পারেন।');
  };

  // Referral Simulation
  const handleSimulateReferral = () => {
    setUser((prev) => {
      const newTotal = prev.totalReferrals + 1;
      const newValid = prev.validReferrals + 1;
      return {
        ...prev,
        totalReferrals: newTotal,
        validReferrals: newValid,
      };
    });
    showToast('✨ ১ জন নতুন Valid Referral যুক্ত হয়েছে!');
  };

  // Instant Money Earn Button Handler (ক্লিক করে ইনস্ট্যান্ট টাকা আয় শুরু করুন)
  const handleInstantEarn = (customUrl?: string) => {
    const targetAdUrl = customUrl || settings.adControls?.directAdUrl || PROFITABLE_AD_LINKS[0];
    
    // 1. Open Sponsor Ad in a new tab
    try {
      window.open(targetAdUrl, '_blank', 'noopener,noreferrer');
    } catch (e) {}

    // 2. Grant Instant Bonus to user balance
    const bonusAmount = 5.0; // 5 Taka instant reward
    setUser((prev) => ({
      ...prev,
      balance: +(prev.balance + bonusAmount).toFixed(2),
      completedTasksCount: prev.completedTasksCount + 1,
    }));

    // 3. Show Toast feedback
    showToast(`⚡ অভিনন্দন! ইনস্ট্যান্ট ক্লিক বোনাস ৳${bonusAmount.toFixed(2)} আপনার ব্যালেন্সে যোগ হয়েছে!`);
  };

  // Test Balance & Test Helper Controls
  const handleAddTestBonus = () => {
    setUser((prev) => ({
      ...prev,
      balance: prev.balance + 50,
    }));
    showToast('💰 ৳৫০ ব্যালেন্স যোগ করা হয়েছে (টেস্টিং মোড)');
  };

  const handleAddTestReferral = () => {
    setUser((prev) => ({
      ...prev,
      totalReferrals: prev.totalReferrals + 5,
      validReferrals: prev.validReferrals + 5,
    }));
    showToast('👥 ৫টি ভ্যালিড রেফারেল সফলভাবে যুক্ত হয়েছে!');
  };

  const handleResetUserData = () => {
    setUser({
      id: 'usr_default_01',
      name: 'অতিথি ব্যবহারকারী (Guest)',
      phone: '',
      email: '',
      balance: 0.0,
      totalReferrals: 0,
      validReferrals: 0,
      completedTasksCount: 0,
      referralCode: 'BD789456',
      isLoggedIn: false,
      cooldownUntil: null,
    });
    showToast('🔄 সকল ডেমো ডাটা রিসেট করে ৳০ ব্যালেন্সে ফিরিয়ে আনা হয়েছে।');
  };

  // Withdrawal Submission
  const handleWithdrawSubmit = ({
    amount,
    method,
    accountNumber,
  }: {
    amount: number;
    method: 'bKash' | 'Nagad' | 'Rocket';
    accountNumber: string;
  }) => {
    const randomTrx = (method.charAt(0) + Math.random().toString(36).substring(2, 8)).toUpperCase();
    const newTrx: Transaction = {
      id: 'trx-' + Date.now(),
      date: 'আজকে ' + new Date().toLocaleTimeString('bn-BD', { hour: '2-digit', minute: '2-digit' }),
      amount,
      method,
      accountNumber,
      status: 'Pending',
      trxId: randomTrx,
    };

    setTransactions((prev) => [newTrx, ...prev]);
    setUser((prev) => ({
      ...prev,
      balance: Math.max(0, prev.balance - amount),
    }));

    showToast(`✅ ৳${amount} উত্তোলনের অনুরোধ সফল হয়েছে! দ্রুত ${method}-এ পাঠানো হবে।`);
  };

  // Auth Handlers
  const handleLoginSuccess = (data: Partial<UserProfile>) => {
    setUser((prev) => ({
      ...prev,
      ...data,
      isLoggedIn: true,
    }));
    showToast(`👋 স্বাগতম, ${data.name || 'ব্যবহারকারী'}! আপনার একাউন্ট সক্রিয় হয়েছে।`);
  };

  const handleLogout = () => {
    setUser((prev) => ({
      ...prev,
      isLoggedIn: false,
    }));
    showToast('আপনি লগআউট করেছেন।');
  };

  // Admin Actions
  const handleAddTask = (newTaskData: Omit<VideoTask, 'id' | 'viewsCount'>) => {
    const newTask: VideoTask = {
      ...newTaskData,
      id: 'vid-' + Date.now() + '-' + Math.random().toString(36).substring(2, 6),
      viewsCount: Math.floor(Math.random() * 5000) + 1200,
    };
    setTasks((prev) => [newTask, ...prev]);
    showToast('📸 নতুন ইমেজ/ভিডিও টাস্ক সফলভাবে তৈরি ও পাবলিশ করা হয়েছে!');
  };

  const handleAddBulkTasks = (newTasksData: Omit<VideoTask, 'id' | 'viewsCount'>[]) => {
    const newCreatedTasks: VideoTask[] = newTasksData.map((taskData, index) => ({
      ...taskData,
      id: 'vid-' + (Date.now() + index) + '-' + Math.random().toString(36).substring(2, 6),
      viewsCount: Math.floor(Math.random() * 5000) + 1200,
    }));
    setTasks((prev) => [...newCreatedTasks, ...prev]);
    showToast(`⚡ একসাথে ${newCreatedTasks.length}টি আনলিমিটেড ইমেজ টাস্ক সফলভাবে পাবলিশ করা হয়েছে!`);
  };

  const handleDeleteTask = (id: string) => {
    setTasks((prev) => prev.filter((t) => t.id !== id));
    showToast('🗑️ ভিডিও টাস্ক মুছে ফেলা হয়েছে।');
  };

  const handleApproveTransaction = (id: string, customTrxId?: string) => {
    setTransactions((prev) =>
      prev.map((t) => {
        if (t.id === id) {
          return {
            ...t,
            status: 'Approved',
            trxId: customTrxId || t.trxId || 'TXN' + Math.random().toString(36).substring(2, 9).toUpperCase(),
          };
        }
        return t;
      })
    );
    showToast('✅ উইথড্রল রিকোয়েস্ট সফলভাবে অনুমোদন করা হয়েছে!');
  };

  const handleRejectTransaction = (id: string) => {
    // Refund balance if rejected
    const trxToReject = transactions.find((t) => t.id === id);
    if (trxToReject && trxToReject.status === 'Pending') {
      setUser((prev) => ({
        ...prev,
        balance: prev.balance + trxToReject.amount,
      }));
    }

    setTransactions((prev) =>
      prev.map((t) => {
        if (t.id === id) {
          return {
            ...t,
            status: 'Rejected',
          };
        }
        return t;
      })
    );
    showToast('❌ উইথড্রল রিকোয়েস্ট বাতিল করা হয়েছে এবং ব্যালেন্স রিফান্ড হয়েছে।');
  };

  const handleUpdateUser = (updatedData: Partial<UserProfile>) => {
    setUser((prev) => ({
      ...prev,
      ...updatedData,
    }));
    showToast('👤 ইউজার প্রোফাইল ডাটা সফলভাবে আপডেট করা হয়েছে!');
  };

  const handleUpdateSettings = (newSettings: PlatformSettings) => {
    setSettings(newSettings);
    showToast('⚙️ প্ল্যাটফর্ম সেটিংস সফলভাবে সেভ করা হয়েছে!');
  };

  return (
    <div className="min-h-screen bg-white text-slate-900 font-sans antialiased flex flex-col selection:bg-emerald-500 selection:text-white">
      {/* Top Notice Banner */}
      {settings.noticeBanner && (
        <div className="bg-gradient-to-r from-emerald-900 via-teal-900 to-slate-950 text-white text-xs px-4 py-2 border-b border-emerald-500/30 flex items-center justify-between">
          <div className="max-w-7xl mx-auto w-full flex items-center justify-center gap-2 text-center">
            <Megaphone className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
            <span className="font-medium truncate">{settings.noticeBanner}</span>
          </div>
        </div>
      )}

      {/* Toast Banner */}
      {toastMessage && (
        <div className="fixed top-20 right-4 sm:right-6 z-50 animate-in slide-in-from-top-4 duration-300 max-w-sm">
          <div className="bg-slate-900 text-white px-4 py-3 rounded-2xl shadow-xl border border-emerald-500/40 flex items-center gap-3">
            <Sparkles className="w-5 h-5 text-emerald-400 shrink-0 animate-bounce" />
            <p className="text-xs sm:text-sm font-medium">{toastMessage}</p>
          </div>
        </div>
      )}

      {/* Header */}
      <Header
        user={user}
        onOpenAuth={() => setIsAuthOpen(true)}
        onLogout={handleLogout}
        onNavigate={handleNavigate}
        activeSection={activeSection}
        onOpenAdmin={() => setIsAdminOpen(true)}
      />

      <main className="flex-1">
        {/* Hero Section */}
        <HeroSection
          onStartEarning={() => handleNavigate('videos')}
          onWatchVideos={() => handleNavigate('videos')}
        />

        {/* Balance Card Container */}
        <div id="balance" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-6">
          <BalanceCard
            user={user}
            minWithdraw={settings.minWithdrawAmount}
            requiredValidReferrals={settings.requiredValidReferrals}
            enforceReferralRequirement={settings.enforceReferralRequirement}
            onNavigateToWithdraw={() => handleNavigate('withdraw')}
            onNavigateToReferral={() => handleNavigate('referral')}
            onNavigateToVideos={() => handleNavigate('videos')}
            onAddTestBonus={handleAddTestBonus}
            onAddTestReferral={handleAddTestReferral}
            onResetUserData={handleResetUserData}
          />
        </div>

        {/* Reward Task Section (Direct Videos directly on top) */}
        <RewardTaskSection
          tasks={tasks}
          onStartTask={handleStartTask}
          onInstantEarn={handleInstantEarn}
          cooldownUntil={user.cooldownUntil}
          onSetCooldown={handleSetCooldown}
          onClearCooldown={handleClearCooldown}
        />

        {/* 20 Countries High-CPM Video Zone */}
        <CountryVideosSection
          tasks={tasks}
          onStartTask={handleStartTask}
          onInstantEarn={handleInstantEarn}
          onShowToast={showToast}
        />

        {/* 10 Attractive Special Earning Offers */}
        <PromoOffersSection
          onOpenAuth={() => setIsAuthOpen(true)}
          onNavigateToVideos={() => handleNavigate('videos')}
          onNavigateToReferral={() => handleNavigate('referral')}
          onShowToast={showToast}
          userBalance={user.balance}
        />

        {/* Referral Section */}
        <ReferralSection
          user={user}
          onSimulateReferral={handleSimulateReferral}
        />

        {/* Withdraw Section */}
        <WithdrawSection
          user={user}
          transactions={transactions}
          onWithdrawSubmit={handleWithdrawSubmit}
          minWithdraw={settings.minWithdrawAmount}
          requiredValidReferrals={settings.requiredValidReferrals}
          enforceReferralRequirement={settings.enforceReferralRequirement}
          onAddTestBonus={handleAddTestBonus}
          onNavigateToVideos={() => handleNavigate('videos')}
        />

        {/* Advertisement Area */}
        <AdvertisementArea
          enabled={settings.adsEnabled}
          adControls={settings.adControls}
        />
      </main>

      {/* Popunder Manager (Admin Controlled) */}
      <PopunderManager
        adControls={settings.adControls}
        adsEnabled={settings.adsEnabled}
      />

      {/* Footer */}
      <Footer
        onOpenLegal={(type) => setLegalModalType(type)}
        onNavigate={handleNavigate}
        onOpenAdmin={() => setIsAdminOpen(true)}
      />

      {/* Video Player Modal */}
      {activeVideoTask && (
        <VideoPlayerModal
          task={activeVideoTask}
          adControls={settings.adControls}
          onClose={() => setActiveVideoTask(null)}
          onCompleteTask={handleCompleteTask}
          onInstantEarn={handleInstantEarn}
        />
      )}

      {/* Auth Modal */}
      <AuthModal
        isOpen={isAuthOpen}
        onClose={() => setIsAuthOpen(false)}
        onLoginSuccess={handleLoginSuccess}
      />

      {/* Legal & Info Modals */}
      <LegalModal
        type={legalModalType}
        onClose={() => setLegalModalType(null)}
      />

      {/* Floating Live Real-Time Withdrawal Alert */}
      {showLiveAlert && LIVE_WITHDRAW_ALERTS[currentAlertIndex] && (
        <div
          id="floating-live-withdraw-toast"
          onClick={() => handleNavigate('withdraw')}
          className="fixed bottom-5 left-4 z-40 max-w-xs sm:max-w-sm bg-slate-900/95 backdrop-blur-md border border-emerald-500/40 hover:border-emerald-400 p-3.5 rounded-2xl shadow-2xl transition-all duration-500 cursor-pointer animate-bounce-short hover:scale-[1.02] flex items-center gap-3"
        >
          <div className="w-10 h-10 rounded-xl bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center shrink-0">
            <CheckCircle2 className="w-5 h-5 text-emerald-400" />
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between gap-1">
              <p className="text-xs font-bold text-white truncate">
                {LIVE_WITHDRAW_ALERTS[currentAlertIndex].name}
              </p>
              <span className="text-[10px] font-bold text-emerald-400 font-mono">
                +৳{LIVE_WITHDRAW_ALERTS[currentAlertIndex].amount}
              </span>
            </div>
            <p className="text-[11px] text-slate-300 truncate">
              {LIVE_WITHDRAW_ALERTS[currentAlertIndex].timeAgo} টাকা উত্তোলন করেছেন
            </p>
            <div className="flex items-center justify-between text-[10px] text-slate-400 mt-0.5 font-mono">
              <span>{LIVE_WITHDRAW_ALERTS[currentAlertIndex].method}</span>
              <span className="text-emerald-400/90 font-sans font-semibold">সফল পেমেন্ট ✓</span>
            </div>
          </div>
        </div>
      )}

      {/* System Admin Panel Modal */}
      <AdminPanel
        isOpen={isAdminOpen}
        onClose={() => setIsAdminOpen(false)}
        tasks={tasks}
        onAddTask={handleAddTask}
        onAddBulkTasks={handleAddBulkTasks}
        onDeleteTask={handleDeleteTask}
        transactions={transactions}
        onApproveTransaction={handleApproveTransaction}
        onRejectTransaction={handleRejectTransaction}
        user={user}
        onUpdateUser={handleUpdateUser}
        settings={settings}
        onUpdateSettings={handleUpdateSettings}
      />
    </div>
  );
}
