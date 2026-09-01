export interface UserProfile {
  id: string;
  name: string;
  phone: string;
  email: string;
  balance: number;
  totalReferrals: number;
  validReferrals: number;
  completedTasksCount: number;
  referralCode: string;
  isLoggedIn: boolean;
  cooldownUntil: number | null; // timestamp in ms
}

export interface VideoTask {
  id: string;
  title: string;
  banglaTitle: string;
  category: string;
  reward: number; // e.g. 1 or 2 BDT
  durationSec: number; // 5, 10, 20, 25 seconds
  thumbnail: string;
  videoUrl: string;
  mediaType?: 'image' | 'video'; // Support image tasks and video tasks
  imageUrl?: string; // Direct image URL for image tasks
  aspectRatio?: '9:16' | '16:9' | '1:1' | 'auto'; // Aspect ratio option (9:16 vertical full size or 16:9)
  viewsCount: number;
  likesCount?: number;
  sharesCount?: number;
  adUrl?: string; // Specific Ad network link for this task
  isCompleted?: boolean;
}

export interface Transaction {
  id: string;
  date: string;
  amount: number;
  method: 'bKash' | 'Nagad' | 'Rocket';
  accountNumber: string;
  status: 'Pending' | 'Approved' | 'Rejected';
  trxId: string;
}

export interface AdItem {
  id: string;
  title: string;
  description: string;
  sponsorName: string;
  badge: string;
  imageUrl: string;
  linkText: string;
  targetUrl: string;
}

export interface AdControlSettings {
  // Native Banner
  nativeBannerEnabled: boolean;
  nativeBanners: AdItem[];
  nativeBannerScript?: string;

  // Social Bar
  socialBarEnabled: boolean;
  socialBarTitle: string;
  socialBarDescription: string;
  socialBarLinkText: string;
  socialBarLinkUrl: string;
  socialBarBadge: string;
  socialBarScript?: string;

  // Popunder
  popunderEnabled: boolean;
  popunderUrl: string;
  popunderTrigger: 'first_click' | 'task_complete' | 'timer';
  popunderTimerSec: number;
  popunderScript?: string;

  // Direct Ad Link / 20-second Interstitial Video Ad
  directAdEnabled: boolean;
  directAdUrl: string;
  directAdUrls?: string[];
  videoAdTriggerSec: number; // 5 or 10 seconds
  adRequiredDurationSec: number; // 20 seconds
  directAdHeadline?: string;
}

export interface PlatformSettings {
  minWithdrawAmount: number;
  requiredValidReferrals: number;
  enforceReferralRequirement?: boolean;
  cooldownHours: number;
  rewardPer5Sec: number;
  rewardPer10Sec: number;
  adsEnabled: boolean;
  telegramLink: string;
  noticeBanner: string;
  adminUsername?: string;
  adminPassword?: string;
  adControls: AdControlSettings;
}
