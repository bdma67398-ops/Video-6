import React, { useState, useRef } from 'react';
import {
  ShieldAlert,
  Users,
  CreditCard,
  Video,
  Settings,
  CheckCircle2,
  XCircle,
  Clock,
  Plus,
  Trash2,
  RefreshCw,
  Search,
  DollarSign,
  AlertTriangle,
  ArrowUpRight,
  Sliders,
  ExternalLink,
  ChevronRight,
  TrendingUp,
  Flame,
  Check,
  X,
  Megaphone,
  Upload,
  Film,
  Image as ImageIcon,
  Link as LinkIcon,
  Play,
  MousePointerClick,
  LayoutTemplate,
  MessageSquare,
  Sparkles,
  Eye,
  Code2,
  Layers,
  Lock,
  Key,
  LogOut,
  EyeOff,
  User
} from 'lucide-react';
import { VideoTask, Transaction, UserProfile, PlatformSettings, AdControlSettings, AdItem } from '../types';
import { PROFITABLE_AD_LINKS } from '../data/initialData';

export const CURATED_IMAGE_PRESETS = [
  {
    title: 'প্রাকৃতিক সৌন্দর্যের অসাধারণ ভাইরাল ফটোগ্রাফি',
    category: 'প্রকৃতি ও ভ্রমণ',
    url: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=800&auto=format&fit=crop&q=80',
    tag: 'প্রকৃতি'
  },
  {
    title: 'আধুনিক টেকনোলজি ও স্মার্ট গ্যাজেট আর্ট',
    category: 'প্রযুক্তি',
    url: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&auto=format&fit=crop&q=80',
    tag: 'টেকনোলজি'
  },
  {
    title: 'অনলাইন আর্নিং ও ফ্রিল্যান্সিং সাকসেস গ্রাফিক্স',
    category: 'ক্যারিয়ার',
    url: 'https://images.unsplash.com/photo-1553877522-43269d4ea984?w=800&auto=format&fit=crop&q=80',
    tag: 'ইনকাম'
  },
  {
    title: 'এক্সক্লুসিভ আল্ট্রা এইচডি আর্ট ও রঙিন ডিজাইন',
    category: 'ডিজাইন',
    url: 'https://images.unsplash.com/photo-1579546929518-9e396f3cc809?w=800&auto=format&fit=crop&q=80',
    tag: 'ওয়ালপেপার'
  },
  {
    title: 'সেরা সুস্বাদু খাবার ও রেসিপি ফটোগ্রাফি',
    category: 'লাইফস্টাইল',
    url: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800&auto=format&fit=crop&q=80',
    tag: 'ফুড'
  },
  {
    title: 'রোমাঞ্চকর স্পোর্টস ও ফিটনেস ভাইরাল মোমেন্টস',
    category: 'স্পোর্টস',
    url: 'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=800&auto=format&fit=crop&q=80',
    tag: 'স্পোর্টস'
  }
];

interface AdminPanelProps {
  isOpen: boolean;
  onClose: () => void;
  tasks: VideoTask[];
  onAddTask: (task: Omit<VideoTask, 'id' | 'viewsCount'>) => void;
  onAddBulkTasks?: (newTasks: Omit<VideoTask, 'id' | 'viewsCount'>[]) => void;
  onDeleteTask: (id: string) => void;
  transactions: Transaction[];
  onApproveTransaction: (id: string, customTrxId?: string) => void;
  onRejectTransaction: (id: string) => void;
  user: UserProfile;
  onUpdateUser: (updatedUser: Partial<UserProfile>) => void;
  settings: PlatformSettings;
  onUpdateSettings: (newSettings: PlatformSettings) => void;
}

export const AdminPanel: React.FC<AdminPanelProps> = ({
  isOpen,
  onClose,
  tasks,
  onAddTask,
  onAddBulkTasks,
  onDeleteTask,
  transactions,
  onApproveTransaction,
  onRejectTransaction,
  user,
  onUpdateUser,
  settings,
  onUpdateSettings,
}) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'withdrawals' | 'tasks' | 'ads' | 'users' | 'settings'>('overview');
  const [trxFilter, setTrxFilter] = useState<'All' | 'Pending' | 'Approved' | 'Rejected'>('All');
  const [searchQuery, setSearchQuery] = useState('');

  // Task creation form state
  const [isAddingTask, setIsAddingTask] = useState(false);
  const [taskMediaType, setTaskMediaType] = useState<'image' | 'video'>('image'); // Default to image per user request
  const [uploadMode, setUploadMode] = useState<'bulk' | 'file' | 'url' | 'preset'>('bulk');
  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [newTaskBangla, setNewTaskBangla] = useState('');
  const [newTaskCategory, setNewTaskCategory] = useState('ভাইরাল ছবি');
  const [newTaskReward, setNewTaskReward] = useState<number>(2);
  const [newTaskDuration, setNewTaskDuration] = useState<number>(10);
  const [newTaskAspectRatio, setNewTaskAspectRatio] = useState<'9:16' | '16:9' | '1:1'>('9:16');
  const [newTaskThumbnail, setNewTaskThumbnail] = useState(
    'https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=800&auto=format&fit=crop&q=80'
  );
  const [newTaskImageUrl, setNewTaskImageUrl] = useState(
    'https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=800&auto=format&fit=crop&q=80'
  );
  const [newTaskUrl, setNewTaskUrl] = useState(
    'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4'
  );
  const [newTaskAdUrl, setNewTaskAdUrl] = useState<string>(PROFITABLE_AD_LINKS[0]);
  const [imageFileName, setImageFileName] = useState<string>('');
  const [videoFileName, setVideoFileName] = useState<string>('');
  const [thumbnailFileName, setThumbnailFileName] = useState<string>('');

  // Unlimited Bulk Image Upload states
  const [bulkUploadedFiles, setBulkUploadedFiles] = useState<{ name: string; url: string }[]>([]);
  const [bulkUrlsText, setBulkUrlsText] = useState<string>('');
  const [isBulkUploading, setIsBulkUploading] = useState<boolean>(false);
  const [bulkUploadSuccessMsg, setBulkUploadSuccessMsg] = useState<string>('');

  const imageFileInputRef = useRef<HTMLInputElement>(null);
  const bulkFileInputRef = useRef<HTMLInputElement>(null);
  const videoFileInputRef = useRef<HTMLInputElement>(null);
  const thumbFileInputRef = useRef<HTMLInputElement>(null);

  // Settings form state
  const [tempSettings, setTempSettings] = useState<PlatformSettings>(settings);
  const [settingsSaved, setSettingsSaved] = useState(false);

  // Ad Sub-tab state
  const [adSubTab, setAdSubTab] = useState<'native' | 'social' | 'popunder' | 'direct' | 'underVideo'>('underVideo');
  const [isAddingNativeBanner, setIsAddingNativeBanner] = useState(false);
  const [bannerUploadMode, setBannerUploadMode] = useState<'upload' | 'url'>('upload');
  const [bannerFileName, setBannerFileName] = useState<string>('');
  const [newBannerTitle, setNewBannerTitle] = useState('');
  const [newBannerDesc, setNewBannerDesc] = useState('');
  const [newBannerSponsor, setNewBannerSponsor] = useState('স্পনসরড পার্টনার');
  const [newBannerBadge, setNewBannerBadge] = useState('Native Banner');
  const [newBannerImg, setNewBannerImg] = useState('https://images.unsplash.com/photo-1544197150-b99a580bb7a8?w=500&auto=format&fit=crop&q=80');
  const [newBannerUrl, setNewBannerUrl] = useState('https://t.me/bd_video_earn_official');
  const [newBannerLinkText, setNewBannerLinkText] = useState('অফারটি দেখুন');

  const bannerFileInputRef = useRef<HTMLInputElement>(null);

  // Manual User adjustment state
  const [adjustAmount, setAdjustAmount] = useState<string>('50');

  // Traffic / Registered Accounts State
  const [trafficFilter, setTrafficFilter] = useState<'all' | 'active' | 'inactive'>('all');
  const [trafficSearch, setTrafficSearch] = useState<string>('');
  const [trafficUsers, setTrafficUsers] = useState([
    {
      id: 'ACC-101',
      name: user.name || 'রাকিব হাসান',
      phone: user.phone || '01712345678',
      email: user.email || 'rakib.bd@gmail.com',
      joinedDate: '২০২৬-০৮-২০ ১০:৩০ AM',
      lastActive: 'এখন সক্রিয় (অনলাইন)',
      status: 'active' as const,
      device: 'Android Chrome (Mobile)',
      watchedVideos: user.completedTasksCount || 14,
      balance: user.balance || 28.00,
    },
    {
      id: 'ACC-102',
      name: 'তানভীর আহমেদ',
      phone: '01898765432',
      email: 'tanvir.ahmed@yahoo.com',
      joinedDate: '২০২৬-০৮-২১ ০২:১৫ PM',
      lastActive: '২ মিনিট আগে',
      status: 'active' as const,
      device: 'Samsung Galaxy A54 (Chrome)',
      watchedVideos: 18,
      balance: 36.00,
    },
    {
      id: 'ACC-103',
      name: 'সাদিয়া ইসলাম',
      phone: '01911223344',
      email: 'sadia.islam26@gmail.com',
      joinedDate: '২০২৬-০৮-২২ ০৯:০০ AM',
      lastActive: 'এখন ভিডিও দেখছে',
      status: 'active' as const,
      device: 'Xiaomi Redmi Note 12',
      watchedVideos: 11,
      balance: 22.00,
    },
    {
      id: 'ACC-104',
      name: 'মেহেদী হাসান শুভ',
      phone: '01655667788',
      email: 'mehedi.shuvo@gmail.com',
      joinedDate: '২০২৬-০৮-১৯ ০৫:৪৫ PM',
      lastActive: '৫ মিনিট আগে',
      status: 'active' as const,
      device: 'Windows 11 (Edge)',
      watchedVideos: 24,
      balance: 48.00,
    },
    {
      id: 'ACC-105',
      name: 'সুমাইয়া আক্তার',
      phone: '01733445566',
      email: 'sumaiya.akter@gmail.com',
      joinedDate: '২০২৬-০৮-১৭ ১১:২০ AM',
      lastActive: '২ দিন আগে (অফলাইন)',
      status: 'inactive' as const,
      device: 'Vivo Y20 (Mobile)',
      watchedVideos: 5,
      balance: 10.00,
    },
    {
      id: 'ACC-106',
      name: 'কামরুল ইসলাম',
      phone: '01511224466',
      email: 'kamrul.it@gmail.com',
      joinedDate: '২০২৬-০৮-১৬ ০৩:১০ PM',
      lastActive: '৪ দিন আগে (অফলাইন)',
      status: 'inactive' as const,
      device: 'Realme 9 Pro',
      watchedVideos: 3,
      balance: 6.00,
    },
    {
      id: 'ACC-107',
      name: 'আরিফুল ইসলাম রিফাত',
      phone: '01844556677',
      email: 'ariful.rifat@gmail.com',
      joinedDate: '২০২৬-০৮-২৩ ০৮:৫০ AM',
      lastActive: 'এখন সক্রিয়',
      status: 'active' as const,
      device: 'Oppo Reno 8',
      watchedVideos: 16,
      balance: 32.00,
    },
    {
      id: 'ACC-108',
      name: 'ফারহানা ইয়াসমিন',
      phone: '01399887766',
      email: 'farhana.yasmin@gmail.com',
      joinedDate: '২০২৬-০৮-১৪ ১২:০০ PM',
      lastActive: '১ সপ্তাহ আগে (অফলাইন)',
      status: 'inactive' as const,
      device: 'iPhone 14 (Safari)',
      watchedVideos: 2,
      balance: 4.00,
    }
  ]);

  const handleToggleTrafficStatus = (id: string) => {
    setTrafficUsers((prev) =>
      prev.map((t) => {
        if (t.id === id) {
          const nextStatus = t.status === 'active' ? 'inactive' : 'active';
          return {
            ...t,
            status: nextStatus,
            lastActive: nextStatus === 'active' ? 'এখন সক্রিয় (অনলাইন)' : 'অফলাইন করা হয়েছে',
          };
        }
        return t;
      })
    );
  };

  const totalRegisteredTraffic = trafficUsers.length + 134; // base + dynamic
  const activeTrafficCount = trafficUsers.filter((t) => t.status === 'active').length + 96;
  const inactiveTrafficCount = trafficUsers.filter((t) => t.status === 'inactive').length + 38;

  const filteredTrafficUsers = trafficUsers.filter((u) => {
    const matchesFilter =
      trafficFilter === 'all' ||
      (trafficFilter === 'active' && u.status === 'active') ||
      (trafficFilter === 'inactive' && u.status === 'inactive');

    const matchesSearch =
      u.name.toLowerCase().includes(trafficSearch.toLowerCase()) ||
      u.phone.toLowerCase().includes(trafficSearch.toLowerCase()) ||
      u.email.toLowerCase().includes(trafficSearch.toLowerCase()) ||
      u.id.toLowerCase().includes(trafficSearch.toLowerCase());

    return matchesFilter && matchesSearch;
  });

  // Admin Authentication State
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState<boolean>(() => {
    return sessionStorage.getItem('bd_video_earn_admin_auth') === 'true';
  });
  const [adminUserInput, setAdminUserInput] = useState<string>('');
  const [adminPassInput, setAdminPassInput] = useState<string>('');
  const [showAdminPass, setShowAdminPass] = useState<boolean>(false);
  const [authError, setAuthError] = useState<string>('');

  const currentAdminUsername = settings.adminUsername || 'mominul';
  const currentAdminPassword = settings.adminPassword || 'Mo135Yfj';

  const handleAdminLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError('');
    if (
      adminUserInput.trim() === currentAdminUsername &&
      adminPassInput === currentAdminPassword
    ) {
      setIsAdminAuthenticated(true);
      sessionStorage.setItem('bd_video_earn_admin_auth', 'true');
      setAdminPassInput('');
    } else {
      setAuthError('ভুল ইউজারনেম অথবা পাসওয়ার্ড! অনুগ্রহ করে সঠিক তথ্য দিন।');
    }
  };

  const handleAdminLogout = () => {
    setIsAdminAuthenticated(false);
    sessionStorage.removeItem('bd_video_earn_admin_auth');
    setAdminUserInput('');
    setAdminPassInput('');
    setAuthError('');
  };

  if (!isOpen) return null;

  // Stats calculation
  const totalPendingPayout = transactions
    .filter((t) => t.status === 'Pending')
    .reduce((sum, t) => sum + t.amount, 0);

  const totalApprovedPayout = transactions
    .filter((t) => t.status === 'Approved')
    .reduce((sum, t) => sum + t.amount, 0);

  const filteredTransactions = transactions.filter((t) => {
    const matchesFilter = trxFilter === 'All' || t.status === trxFilter;
    const matchesSearch =
      t.accountNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.trxId.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.method.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  // Image File Upload Handler (reads base64 Data URL for persistent local storage)
  const handleImageFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFileName(file.name);
      const reader = new FileReader();
      reader.onload = (event) => {
        const resultUrl = (event.target?.result as string) || '';
        setNewTaskImageUrl(resultUrl);
        setNewTaskThumbnail(resultUrl);
        if (!newTaskBangla) {
          setNewTaskBangla(file.name.replace(/\.[^/.]+$/, ''));
        }
      };
      reader.readAsDataURL(file);
    }
  };

  // UNLIMITED BULK IMAGE FILES UPLOAD HANDLER
  const handleBulkFilesSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    setIsBulkUploading(true);
    setBulkUploadSuccessMsg('');

    const loadedFiles: { name: string; url: string }[] = [];

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const dataUrl = await new Promise<string>((resolve) => {
        const reader = new FileReader();
        reader.onload = (ev) => resolve(ev.target?.result as string || '');
        reader.readAsDataURL(file);
      });

      if (dataUrl) {
        loadedFiles.push({
          name: file.name.replace(/\.[^/.]+$/, '').replace(/[-_]/g, ' '),
          url: dataUrl,
        });
      }
    }

    setBulkUploadedFiles((prev) => [...loadedFiles, ...prev]);
    setIsBulkUploading(false);
    setBulkUploadSuccessMsg(`🎉 ${loadedFiles.length}টি ছবি সফলভাবে লোড হয়েছে! নিচের "এখনই সব ছবি পাবলিশ করুন" বাটনে ক্লিক করুন।`);
  };

  // SUBMIT ALL BULK IMAGES TO LIVE TASKS
  const handlePublishAllBulkImages = () => {
    const sampleVideos = [
      'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
      'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4',
      'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4',
      'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyBlazes.mp4',
    ];

    const bulkTasksToCreate: Omit<VideoTask, 'id' | 'viewsCount'>[] = [];

    // 1. Process files from device upload
    bulkUploadedFiles.forEach((fileItem, idx) => {
      const fallbackVideo = sampleVideos[idx % sampleVideos.length];
      bulkTasksToCreate.push({
        title: fileItem.name || `HD Photo Task #${tasks.length + idx + 1}`,
        banglaTitle: newTaskBangla ? `${newTaskBangla} (${idx + 1})` : `${fileItem.name} - ৯:১৬ ফুল সাইজ ছবি`,
        category: newTaskCategory || 'ভাইরাল ছবি',
        reward: Number(newTaskReward) || 2,
        durationSec: Number(newTaskDuration) || 10,
        thumbnail: fileItem.url,
        videoUrl: fallbackVideo,
        mediaType: 'image',
        imageUrl: fileItem.url,
        aspectRatio: newTaskAspectRatio,
        adUrl: newTaskAdUrl || PROFITABLE_AD_LINKS[idx % PROFITABLE_AD_LINKS.length],
      });
    });

    // 2. Process URLs from textarea if present
    if (bulkUrlsText.trim()) {
      const urls = bulkUrlsText
        .split('\n')
        .map((u) => u.trim())
        .filter((u) => u.length > 5 && (u.startsWith('http://') || u.startsWith('https://') || u.startsWith('data:image')));

      urls.forEach((url, idx) => {
        const fallbackVideo = sampleVideos[idx % sampleVideos.length];
        bulkTasksToCreate.push({
          title: `HD Photo Task #${tasks.length + bulkUploadedFiles.length + idx + 1}`,
          banglaTitle: newTaskBangla ? `${newTaskBangla} (${bulkUploadedFiles.length + idx + 1})` : `অসাধারণ ৯:১৬ ফুল সাইজ ছবি (${bulkUploadedFiles.length + idx + 1})`,
          category: newTaskCategory || 'ভাইরাল ছবি',
          reward: Number(newTaskReward) || 2,
          durationSec: Number(newTaskDuration) || 10,
          thumbnail: url,
          videoUrl: fallbackVideo,
          mediaType: 'image',
          imageUrl: url,
          aspectRatio: newTaskAspectRatio,
          adUrl: newTaskAdUrl || PROFITABLE_AD_LINKS[idx % PROFITABLE_AD_LINKS.length],
        });
      });
    }

    if (bulkTasksToCreate.length === 0) {
      alert('অনুগ্রহ করে অন্তত ১টি ছবি সিলেক্ট করুন বা লিংক পেস্ট করুন!');
      return;
    }

    if (onAddBulkTasks) {
      onAddBulkTasks(bulkTasksToCreate);
    } else {
      bulkTasksToCreate.forEach((t) => onAddTask(t));
    }

    setBulkUploadedFiles([]);
    setBulkUrlsText('');
    setBulkUploadSuccessMsg(`✅ সফলভাবে ${bulkTasksToCreate.length}টি আনলিমিটেড ছবি ৯:১৬ ফুল সাইজে পাবলিশ হয়েছে!`);
    setIsAddingTask(false);
  };

  // Video File Upload Handler
  const handleVideoFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setVideoFileName(file.name);
      const fileUrl = URL.createObjectURL(file);
      setNewTaskUrl(fileUrl);
      if (!newTaskBangla) {
        setNewTaskBangla(file.name.replace(/\.[^/.]+$/, ''));
      }
    }
  };

  // Thumbnail File Upload Handler
  const handleThumbnailFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setThumbnailFileName(file.name);
      const reader = new FileReader();
      reader.onload = (event) => {
        const imgUrl = (event.target?.result as string) || '';
        setNewTaskThumbnail(imgUrl);
      };
      reader.readAsDataURL(file);
    }
  };

  // Banner Image File Upload Handler
  const handleBannerFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setBannerFileName(file.name);
      const reader = new FileReader();
      reader.onload = (event) => {
        const imgUrl = (event.target?.result as string) || '';
        setNewBannerImg(imgUrl);
        if (!newBannerTitle) {
          setNewBannerTitle(file.name.replace(/\.[^/.]+$/, ''));
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleCreateTaskSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTaskBangla.trim()) return;

    const isImage = taskMediaType === 'image';
    const mainImg = newTaskImageUrl || newTaskThumbnail || 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=800&auto=format&fit=crop&q=80';
    // Fallback sample video stream so player always plays when unlocked
    const sampleVideos = [
      'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
      'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4',
      'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4',
      'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyBlazes.mp4',
    ];
    const fallbackVideo = sampleVideos[Math.floor(Math.random() * sampleVideos.length)];

    onAddTask({
      title: newTaskTitle || newTaskBangla,
      banglaTitle: newTaskBangla,
      category: newTaskCategory,
      reward: Number(newTaskReward),
      durationSec: Number(newTaskDuration),
      thumbnail: mainImg,
      videoUrl: isImage ? fallbackVideo : (newTaskUrl || fallbackVideo),
      mediaType: 'image',
      imageUrl: mainImg,
      aspectRatio: newTaskAspectRatio,
      adUrl: newTaskAdUrl || PROFITABLE_AD_LINKS[0],
    });

    setNewTaskTitle('');
    setNewTaskBangla('');
    setImageFileName('');
    setVideoFileName('');
    setThumbnailFileName('');
    setIsAddingTask(false);
  };

  const handleSaveSettings = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    onUpdateSettings(tempSettings);
    setSettingsSaved(true);
    setTimeout(() => setSettingsSaved(false), 2500);
  };

  // Ad Handlers
  const handleUpdateAdControls = (newAdControls: Partial<AdControlSettings>) => {
    const updated = {
      ...tempSettings,
      adControls: {
        ...tempSettings.adControls,
        ...newAdControls,
      },
    };
    setTempSettings(updated);
    onUpdateSettings(updated);
    setSettingsSaved(true);
    setTimeout(() => setSettingsSaved(false), 2000);
  };

  const handleAddNativeBanner = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newBannerTitle) return;

    const newBanner: AdItem = {
      id: 'banner-' + Date.now(),
      title: newBannerTitle,
      description: newBannerDesc,
      sponsorName: newBannerSponsor,
      badge: newBannerBadge,
      imageUrl: newBannerImg,
      linkText: newBannerLinkText,
      targetUrl: newBannerUrl,
    };

    const currentBanners = tempSettings.adControls?.nativeBanners || [];
    handleUpdateAdControls({
      nativeBanners: [newBanner, ...currentBanners],
    });

    setNewBannerTitle('');
    setNewBannerDesc('');
    setIsAddingNativeBanner(false);
  };

  const handleDeleteNativeBanner = (id: string) => {
    const currentBanners = tempSettings.adControls?.nativeBanners || [];
    handleUpdateAdControls({
      nativeBanners: currentBanners.filter((b) => b.id !== id),
    });
  };

  if (!isAdminAuthenticated) {
    return (
      <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/85 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in duration-200">
        <div className="bg-slate-900 border border-slate-700/80 rounded-3xl w-full max-w-md shadow-2xl overflow-hidden text-slate-100 relative">
          
          {/* Header */}
          <div className="bg-slate-950/90 px-6 py-5 border-b border-slate-800 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 shadow-md shadow-amber-500/10">
                <ShieldAlert className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-bold text-white text-base flex items-center gap-2">
                  অ্যাডমিন লগইন
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-500/20 text-amber-300 border border-amber-500/30">
                    SECURED
                  </span>
                </h3>
                <p className="text-xs text-slate-400">Admin Authentication Required</p>
              </div>
            </div>
            <button
              id="admin-auth-close-btn"
              onClick={onClose}
              className="p-1.5 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Form */}
          <form onSubmit={handleAdminLogin} className="p-6 space-y-4">
            {authError && (
              <div className="p-3 bg-red-500/10 border border-red-500/30 rounded-xl text-xs text-red-400 flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 shrink-0" />
                <span>{authError}</span>
              </div>
            )}

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                অ্যাডমিন ইউজারনেম (Username)
              </label>
              <div className="relative">
                <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  id="admin-username-input"
                  type="text"
                  required
                  placeholder="ইউজারনেম লিখুন (e.g. mominul)"
                  value={adminUserInput}
                  onChange={(e) => setAdminUserInput(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 bg-slate-950 border border-slate-700/80 rounded-xl text-white text-sm focus:outline-none focus:border-amber-500 transition"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                অ্যাডমিন পাসওয়ার্ড (Password)
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  id="admin-password-input"
                  type={showAdminPass ? 'text' : 'password'}
                  required
                  placeholder="পাসওয়ার্ড লিখুন"
                  value={adminPassInput}
                  onChange={(e) => setAdminPassInput(e.target.value)}
                  className="w-full pl-10 pr-10 py-2.5 bg-slate-950 border border-slate-700/80 rounded-xl text-white text-sm focus:outline-none focus:border-amber-500 transition font-mono"
                />
                <button
                  type="button"
                  onClick={() => setShowAdminPass(!showAdminPass)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-200 cursor-pointer"
                >
                  {showAdminPass ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <button
              id="admin-login-submit-btn"
              type="submit"
              className="w-full py-3 px-4 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-slate-950 font-bold text-sm rounded-xl shadow-lg shadow-amber-500/20 flex items-center justify-center gap-2 cursor-pointer transition transform active:scale-[0.98] mt-2"
            >
              <Key className="w-4 h-4" />
              <span>লগইন করুন (Access Dashboard)</span>
            </button>
          </form>

          {/* Footer note */}
          <div className="px-6 py-3 bg-slate-950/50 border-t border-slate-800 text-center">
            <p className="text-[11px] text-slate-500">
              শুধুমাত্র প্ল্যাটফর্ম অ্যাডমিনিস্ট্রেটরদের জন্য সংরক্ষিত
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-2 sm:p-4 md:p-6 animate-in fade-in duration-200">
      <div className="bg-slate-900 border border-slate-700/80 rounded-2xl w-full max-w-6xl shadow-2xl flex flex-col max-h-[92vh] overflow-hidden text-slate-100">
        
        {/* Admin Header */}
        <div className="bg-slate-950 border-b border-slate-800 px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400">
              <ShieldAlert className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-lg font-bold text-white">সিস্টেম অ্যাডমিন কন্ট্রোল প্যানেল</h2>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                  FULL ACCESS ADMIN
                </span>
              </div>
              <p className="text-xs text-slate-400">
                Native Banner, Social Bar, Popunder, ইমেজ আপলোড ও উইথড্রল পরিচালনা করুন
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              id="admin-logout-btn"
              onClick={handleAdminLogout}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/30 rounded-xl text-xs font-semibold transition cursor-pointer"
              title="অ্যাডমিন লগআউট করুন"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">লগআউট</span>
            </button>
            <button
              id="admin-close-btn"
              onClick={onClose}
              className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex border-b border-slate-800 bg-slate-900/60 px-6 overflow-x-auto gap-2 py-2">
          <button
            id="tab-overview"
            onClick={() => setActiveTab('overview')}
            className={`px-4 py-2 rounded-lg text-xs sm:text-sm font-medium transition flex items-center gap-2 whitespace-nowrap cursor-pointer ${
              activeTab === 'overview'
                ? 'bg-emerald-500 text-white shadow-md'
                : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
            }`}
          >
            <TrendingUp className="w-4 h-4" />
            ওভারভিউ (Dashboard)
          </button>

          <button
            id="tab-tasks"
            onClick={() => setActiveTab('tasks')}
            className={`px-4 py-2 rounded-lg text-xs sm:text-sm font-medium transition flex items-center gap-2 whitespace-nowrap cursor-pointer ${
              activeTab === 'tasks'
                ? 'bg-emerald-500 text-white shadow-md'
                : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
            }`}
          >
            <ImageIcon className="w-4 h-4" />
            ইমেজ আপলোড ও টাস্ক ({tasks.length})
          </button>

          <button
            id="tab-ads"
            onClick={() => setActiveTab('ads')}
            className={`px-4 py-2 rounded-lg text-xs sm:text-sm font-medium transition flex items-center gap-2 whitespace-nowrap cursor-pointer ${
              activeTab === 'ads'
                ? 'bg-emerald-500 text-white shadow-md'
                : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
            }`}
          >
            <Megaphone className="w-4 h-4" />
            বিজ্ঞাপন কন্ট্রোল (Ads Network)
            <span className="px-1.5 py-0.5 rounded-full text-[10px] font-bold bg-amber-500/30 text-amber-300 border border-amber-500/40">
              3 Format
            </span>
          </button>

          <button
            id="tab-withdrawals"
            onClick={() => setActiveTab('withdrawals')}
            className={`px-4 py-2 rounded-lg text-xs sm:text-sm font-medium transition flex items-center gap-2 whitespace-nowrap cursor-pointer relative ${
              activeTab === 'withdrawals'
                ? 'bg-emerald-500 text-white shadow-md'
                : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
            }`}
          >
            <CreditCard className="w-4 h-4" />
            উইথড্রল রিকোয়েস্ট
            {transactions.filter((t) => t.status === 'Pending').length > 0 && (
              <span className="ml-1 px-1.5 py-0.5 rounded-full text-[10px] font-bold bg-amber-500 text-slate-950">
                {transactions.filter((t) => t.status === 'Pending').length}
              </span>
            )}
          </button>

          <button
            id="tab-users"
            onClick={() => setActiveTab('users')}
            className={`px-4 py-2 rounded-lg text-xs sm:text-sm font-medium transition flex items-center gap-2 whitespace-nowrap cursor-pointer ${
              activeTab === 'users'
                ? 'bg-emerald-500 text-white shadow-md'
                : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
            }`}
          >
            <Users className="w-4 h-4" />
            ট্রাফিক ও ইউজার একাউন্টস
            <span className="ml-1 px-1.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/30 text-emerald-300 border border-emerald-500/40">
              {activeTrafficCount} সক্রিয়
            </span>
          </button>

          <button
            id="tab-settings"
            onClick={() => setActiveTab('settings')}
            className={`px-4 py-2 rounded-lg text-xs sm:text-sm font-medium transition flex items-center gap-2 whitespace-nowrap cursor-pointer ${
              activeTab === 'settings'
                ? 'bg-emerald-500 text-white shadow-md'
                : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
            }`}
          >
            <Settings className="w-4 h-4" />
            প্ল্যাটফর্ম সেটিংস
          </button>
        </div>

        {/* Tab Contents */}
        <div className="p-4 sm:p-6 overflow-y-auto flex-1 space-y-6">

          {/* ============================================================ */}
          {/* 1. OVERVIEW TAB */}
          {/* ============================================================ */}
          {activeTab === 'overview' && (
            <div className="space-y-6">
              
              {/* Traffic Stats Row (Direct user requirement) */}
              <div className="bg-slate-900/90 border border-emerald-500/30 rounded-2xl p-5 shadow-lg">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4 border-b border-slate-800 pb-3">
                  <div className="flex items-center gap-2.5">
                    <div className="p-2 rounded-xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                      <Users className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="text-sm sm:text-base font-bold text-white flex items-center gap-2">
                        <span>লাইভ ট্রাফিক ও একাউন্ট পর্যবেক্ষণ</span>
                        <span className="flex h-2.5 w-2.5 relative">
                          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                          <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
                        </span>
                      </h3>
                      <p className="text-xs text-slate-400">রিয়েল-টাইমে মোট কতগুলো একাউন্ট তৈরি হয়েছে এবং কতজন সক্রিয়/ইনঅ্যাক্টিভ আছে</p>
                    </div>
                  </div>
                  <button
                    onClick={() => setActiveTab('users')}
                    className="px-3 py-1.5 bg-emerald-600/30 hover:bg-emerald-600/50 text-emerald-300 border border-emerald-500/40 rounded-xl text-xs font-bold transition flex items-center gap-1.5 self-start sm:self-auto cursor-pointer"
                  >
                    <span>ট্রাফিক একাউন্ট তালিকা দেখুন</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {/* Total Traffic Accounts */}
                  <div className="bg-slate-950/80 border border-slate-800 p-4 rounded-xl flex items-center justify-between">
                    <div>
                      <span className="text-xs text-slate-400 block font-medium">মোট ট্রাফিক একাউন্ট</span>
                      <div className="text-2xl sm:text-3xl font-black text-white mt-1">
                        {totalRegisteredTraffic} <span className="text-xs font-normal text-slate-400">জন</span>
                      </div>
                      <p className="text-[11px] text-slate-400 mt-1">সর্বমোট নিবন্ধিত ট্রাফিক আইডি</p>
                    </div>
                    <div className="w-12 h-12 rounded-2xl bg-blue-500/10 border border-blue-500/30 flex items-center justify-center text-blue-400 shrink-0">
                      <Users className="w-6 h-6" />
                    </div>
                  </div>

                  {/* Active Traffic */}
                  <div className="bg-slate-950/80 border border-emerald-500/30 p-4 rounded-xl flex items-center justify-between relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-16 h-16 bg-emerald-500/5 rounded-full blur-xl pointer-events-none" />
                    <div>
                      <div className="flex items-center gap-1.5 text-xs text-emerald-400 font-bold">
                        <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                        <span>সক্রিয় ট্রাফিক (Active)</span>
                      </div>
                      <div className="text-2xl sm:text-3xl font-black text-emerald-400 mt-1">
                        {activeTrafficCount} <span className="text-xs font-normal text-emerald-300/80">জন</span>
                      </div>
                      <p className="text-[11px] text-emerald-400/80 mt-1">বর্তমানে সাইটে সক্রিয় ও অনলাইনে আছে</p>
                    </div>
                    <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 shrink-0">
                      <CheckCircle2 className="w-6 h-6" />
                    </div>
                  </div>

                  {/* Inactive Traffic */}
                  <div className="bg-slate-950/80 border border-slate-800 p-4 rounded-xl flex items-center justify-between">
                    <div>
                      <div className="flex items-center gap-1.5 text-xs text-slate-400 font-medium">
                        <span className="w-2 h-2 rounded-full bg-slate-500" />
                        <span>ইনঅ্যাক্টিভ ট্রাফিক (Inactive)</span>
                      </div>
                      <div className="text-2xl sm:text-3xl font-black text-slate-300 mt-1">
                        {inactiveTrafficCount} <span className="text-xs font-normal text-slate-500">জন</span>
                      </div>
                      <p className="text-[11px] text-slate-400 mt-1">বর্তমানে নিষ্ক্রিয় বা অফলাইন একাউন্ট</p>
                    </div>
                    <div className="w-12 h-12 rounded-2xl bg-slate-800 border border-slate-700 flex items-center justify-center text-slate-400 shrink-0">
                      <XCircle className="w-6 h-6" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Metric Cards Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="bg-slate-800/60 border border-slate-700/60 rounded-xl p-4">
                  <div className="flex items-center justify-between text-slate-400 text-xs mb-2">
                    <span>পেন্ডিং উইথড্রল</span>
                    <Clock className="w-4 h-4 text-amber-400" />
                  </div>
                  <div className="text-2xl font-bold text-amber-400">৳{totalPendingPayout.toFixed(2)}</div>
                  <p className="text-[11px] text-slate-400 mt-1">
                    {transactions.filter((t) => t.status === 'Pending').length} টি অনুরোধ অনুমোদনের অপেক্ষায়
                  </p>
                </div>

                <div className="bg-slate-800/60 border border-slate-700/60 rounded-xl p-4">
                  <div className="flex items-center justify-between text-slate-400 text-xs mb-2">
                    <span>মোট পরিশোধকৃত (Paid)</span>
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  </div>
                  <div className="text-2xl font-bold text-emerald-400">৳{totalApprovedPayout.toFixed(2)}</div>
                  <p className="text-[11px] text-slate-400 mt-1">
                    {transactions.filter((t) => t.status === 'Approved').length} টি সফল পেমেন্ট
                  </p>
                </div>

                <div className="bg-slate-800/60 border border-slate-700/60 rounded-xl p-4">
                  <div className="flex items-center justify-between text-slate-400 text-xs mb-2">
                    <span>সক্রিয় ভিডিও টাস্ক</span>
                    <Film className="w-4 h-4 text-blue-400" />
                  </div>
                  <div className="text-2xl font-bold text-white">{tasks.length} টি</div>
                  <p className="text-[11px] text-slate-400 mt-1">৳১ ও ৳২ রিওয়ার্ড ভিত্তিক টাস্কসমূহ</p>
                </div>

                <div className="bg-slate-800/60 border border-slate-700/60 rounded-xl p-4">
                  <div className="flex items-center justify-between text-slate-400 text-xs mb-2">
                    <span>বিজ্ঞাপন ফরমেট স্ট্যাটাস</span>
                    <Megaphone className="w-4 h-4 text-purple-400" />
                  </div>
                  <div className="text-sm font-bold text-purple-300 flex items-center gap-2">
                    <span>Native Banner ({tempSettings.adControls?.nativeBannerEnabled ? 'অন' : 'অফ'})</span>
                  </div>
                  <p className="text-[11px] text-slate-400 mt-1">
                    Social Bar: {tempSettings.adControls?.socialBarEnabled ? 'Active' : 'Off'} | Popunder: {tempSettings.adControls?.popunderEnabled ? 'Active' : 'Off'}
                  </p>
                </div>
              </div>

              {/* Quick Actions & Recent Pending */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 bg-slate-800/40 border border-slate-700/60 rounded-xl p-5">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-sm font-semibold text-white flex items-center gap-2">
                      <Clock className="w-4 h-4 text-amber-400" />
                      সাম্প্রতিক পেন্ডিং উইথড্রলসমূহ
                    </h3>
                    <button
                      onClick={() => setActiveTab('withdrawals')}
                      className="text-xs text-emerald-400 hover:underline flex items-center gap-1 cursor-pointer"
                    >
                      সব দেখুন <ChevronRight className="w-3 h-3" />
                    </button>
                  </div>

                  {transactions.filter((t) => t.status === 'Pending').length === 0 ? (
                    <div className="p-8 text-center bg-slate-900/40 rounded-xl border border-dashed border-slate-800 text-slate-400 text-sm">
                      <CheckCircle2 className="w-8 h-8 text-emerald-400 mx-auto mb-2 opacity-60" />
                      বর্তমানে কোনো পেন্ডিং উইথড্রল রিকোয়েস্ট নেই!
                    </div>
                  ) : (
                    <div className="space-y-2">
                      {transactions
                        .filter((t) => t.status === 'Pending')
                        .slice(0, 4)
                        .map((trx) => (
                          <div
                            key={trx.id}
                            className="bg-slate-900/60 border border-slate-750 p-3 rounded-lg flex items-center justify-between gap-3 text-xs"
                          >
                            <div>
                              <div className="flex items-center gap-2 font-medium text-slate-200">
                                <span
                                  className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                                    trx.method === 'bKash'
                                      ? 'bg-pink-500/20 text-pink-400'
                                      : 'bg-orange-500/20 text-orange-400'
                                  }`}
                                >
                                  {trx.method}
                                </span>
                                <span>{trx.accountNumber}</span>
                                <span className="text-emerald-400 font-bold text-sm">৳{trx.amount}</span>
                              </div>
                              <span className="text-slate-400 text-[10px]">{trx.date}</span>
                            </div>

                            <div className="flex items-center gap-2">
                              <button
                                onClick={() => onApproveTransaction(trx.id)}
                                className="px-3 py-1 bg-emerald-500 hover:bg-emerald-600 text-white rounded text-[11px] font-medium flex items-center gap-1 transition shadow-sm cursor-pointer"
                              >
                                <Check className="w-3 h-3" /> অনুমোদন
                              </button>
                              <button
                                onClick={() => onRejectTransaction(trx.id)}
                                className="px-2.5 py-1 bg-rose-500/20 hover:bg-rose-500/30 text-rose-300 border border-rose-500/30 rounded text-[11px] transition cursor-pointer"
                              >
                                বাতিল
                              </button>
                            </div>
                          </div>
                        ))}
                    </div>
                  )}
                </div>

                {/* Ads & Platform Status */}
                <div className="bg-slate-800/40 border border-slate-700/60 rounded-xl p-5 flex flex-col justify-between">
                  <div>
                    <h3 className="text-sm font-semibold text-white mb-3 flex items-center gap-2">
                      <Megaphone className="w-4 h-4 text-amber-400" />
                      বিজ্ঞাপন নেটওয়ার্ক কন্ট্রোল
                    </h3>
                    <ul className="space-y-2.5 text-xs text-slate-300">
                      <li className="flex justify-between items-center py-1 border-b border-slate-700/50">
                        <span className="flex items-center gap-1.5">
                          <LayoutTemplate className="w-3.5 h-3.5 text-blue-400" />
                          Native Banner
                        </span>
                        <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                          tempSettings.adControls?.nativeBannerEnabled ? 'bg-emerald-500/20 text-emerald-400' : 'bg-rose-500/20 text-rose-400'
                        }`}>
                          {tempSettings.adControls?.nativeBannerEnabled ? 'সক্রিয় (Active)' : 'বন্ধ (Off)'}
                        </span>
                      </li>
                      <li className="flex justify-between items-center py-1 border-b border-slate-700/50">
                        <span className="flex items-center gap-1.5">
                          <MessageSquare className="w-3.5 h-3.5 text-emerald-400" />
                          Social Bar
                        </span>
                        <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                          tempSettings.adControls?.socialBarEnabled ? 'bg-emerald-500/20 text-emerald-400' : 'bg-rose-500/20 text-rose-400'
                        }`}>
                          {tempSettings.adControls?.socialBarEnabled ? 'সক্রিয় (Active)' : 'বন্ধ (Off)'}
                        </span>
                      </li>
                      <li className="flex justify-between items-center py-1">
                        <span className="flex items-center gap-1.5">
                          <MousePointerClick className="w-3.5 h-3.5 text-amber-400" />
                          Popunder Ads
                        </span>
                        <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                          tempSettings.adControls?.popunderEnabled ? 'bg-emerald-500/20 text-emerald-400' : 'bg-rose-500/20 text-rose-400'
                        }`}>
                          {tempSettings.adControls?.popunderEnabled ? 'সক্রিয় (Active)' : 'বন্ধ (Off)'}
                        </span>
                      </li>
                    </ul>
                  </div>

                  <button
                    onClick={() => setActiveTab('ads')}
                    className="w-full mt-4 py-2 bg-gradient-to-r from-amber-600 to-amber-500 hover:from-amber-500 hover:to-amber-400 text-slate-950 font-bold rounded-lg text-xs transition flex items-center justify-center gap-2 cursor-pointer shadow-md"
                  >
                    <Megaphone className="w-3.5 h-3.5" />
                    বিজ্ঞাপন কনফিগারেশন পরিচালনা করুন
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* ============================================================ */}
          {/* 2. IMAGE UPLOAD & REWARD TASKS TAB */}
          {/* ============================================================ */}
          {activeTab === 'tasks' && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-gradient-to-r from-slate-900 via-slate-900 to-indigo-950/40 p-4 rounded-2xl border border-indigo-500/20">
                <div>
                  <h3 className="text-base font-bold text-white flex items-center gap-2">
                    <ImageIcon className="w-5 h-5 text-emerald-400" />
                    ইমেজ আপলোড ও রিওয়ার্ড টাস্ক ম্যানেজমেন্ট
                  </h3>
                  <p className="text-xs text-slate-400 mt-0.5">
                    মোবাইল/পিসি থেকে ছবি আপলোড করুন অথবা লিংক দিয়ে ৫-১০ সেকেন্ডের আকর্ষণীয় আর্নিং টাস্ক তৈরি করুন।
                  </p>
                </div>

                <button
                  id="btn-add-task-modal"
                  onClick={() => setIsAddingTask(!isAddingTask)}
                  className="px-4 py-2.5 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white rounded-xl text-xs font-bold flex items-center gap-2 transition shadow-md shadow-emerald-950 cursor-pointer self-start sm:self-auto"
                >
                  <Plus className="w-4 h-4" />
                  {isAddingTask ? 'ফর্ম লুকান' : 'নতুন ইমেজ আপলোড করুন'}
                </button>
              </div>

              {/* Add / Upload Task Form */}
              {isAddingTask && (
                <form
                  onSubmit={handleCreateTaskSubmit}
                  className="bg-slate-950 border border-emerald-500/40 rounded-2xl p-5 space-y-5 animate-in fade-in duration-200 shadow-xl"
                >
                  {/* Form Header with Upload Mode Switcher */}
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 border-b border-slate-800 pb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-xl bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
                        <ImageIcon className="w-5 h-5" />
                      </div>
                      <div>
                        <h4 className="text-sm font-bold text-white flex items-center gap-2">
                          নতুন ইমেজ (ছবি) আপলোড ও রিওয়ার্ড টাস্ক তৈরি
                          <span className="px-2 py-0.5 rounded-full text-[10px] bg-emerald-500/20 text-emerald-300 font-semibold border border-emerald-500/30">
                            IMAGE ONLY
                          </span>
                        </h4>
                        <p className="text-[11px] text-slate-400">
                          ছবি আপলোড করুন; ইউজাররা ছবি দেখে ও ৩০ সেকেন্ড অ্যাড দেখে নিশ্চিত রিওয়ার্ড পাবে
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Mode Switcher: Bulk Unlimited vs Local Single File vs Online URL vs Preset */}
                  <div className="flex flex-wrap items-center gap-2 bg-slate-900/90 p-1.5 rounded-xl border border-slate-800 text-xs">
                    <span className="text-slate-400 font-semibold px-2 text-[11px]">ইমেজ আপলোড মোড:</span>
                    <button
                      type="button"
                      onClick={() => setUploadMode('bulk')}
                      className={`px-3 py-2 rounded-xl transition font-bold cursor-pointer flex items-center gap-2 ${
                        uploadMode === 'bulk'
                          ? 'bg-gradient-to-r from-amber-500 via-rose-500 to-emerald-500 text-white shadow-lg ring-2 ring-amber-400/50'
                          : 'text-amber-300 hover:text-white hover:bg-slate-800 border border-amber-500/30'
                      }`}
                    >
                      <Sparkles className="w-4 h-4 text-amber-300 animate-pulse" />
                      ⚡ আনলিমিটেড ইমেজ বাল্ক আপলোড (১ ক্লিকে সব ছবি)
                    </button>
                    <button
                      type="button"
                      onClick={() => setUploadMode('file')}
                      className={`px-3 py-1.5 rounded-lg transition font-medium cursor-pointer flex items-center gap-1.5 ${
                        uploadMode === 'file'
                          ? 'bg-emerald-500 text-white font-bold shadow-xs'
                          : 'text-slate-300 hover:text-white hover:bg-slate-800'
                      }`}
                    >
                      <Upload className="w-3.5 h-3.5" />
                      সিঙ্গেল ছবি আপলোড
                    </button>
                    <button
                      type="button"
                      onClick={() => setUploadMode('url')}
                      className={`px-3 py-1.5 rounded-lg transition font-medium cursor-pointer flex items-center gap-1.5 ${
                        uploadMode === 'url'
                          ? 'bg-emerald-500 text-white font-bold shadow-xs'
                          : 'text-slate-300 hover:text-white hover:bg-slate-800'
                      }`}
                    >
                      <LinkIcon className="w-3.5 h-3.5" />
                      অনলাইন লিংক (URL)
                    </button>
                    <button
                      type="button"
                      onClick={() => setUploadMode('preset')}
                      className={`px-3 py-1.5 rounded-lg transition font-medium cursor-pointer flex items-center gap-1.5 ${
                        uploadMode === 'preset'
                          ? 'bg-emerald-500 text-white font-bold shadow-xs'
                          : 'text-slate-300 hover:text-white hover:bg-slate-800'
                      }`}
                    >
                      <Layers className="w-3.5 h-3.5" />
                      ১-ক্লিক গ্যালারি
                    </button>
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Form Fields Left */}
                    <div className="lg:col-span-2 space-y-4 text-xs">
                      <div>
                        <label className="block text-slate-200 mb-1 font-semibold">
                          ইমেজ বাংলা শিরোনাম (Title) <span className="text-rose-400">*</span>
                        </label>
                        <input
                          type="text"
                          required
                          value={newTaskBangla}
                          onChange={(e) => setNewTaskBangla(e.target.value)}
                          placeholder="যেমন: অসাধারণ প্রাকৃতিক দৃশ্যের ছবি দেখুন ও আয় করুন..."
                          className="w-full px-3.5 py-2.5 bg-slate-900 border border-slate-700 rounded-xl text-white placeholder:text-slate-500 focus:outline-none focus:border-emerald-500 text-xs"
                        />
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-slate-200 mb-1 font-semibold">ক্যাটাগরি</label>
                          <select
                            value={newTaskCategory}
                            onChange={(e) => setNewTaskCategory(e.target.value)}
                            className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-xl text-white focus:outline-none focus:border-emerald-500 text-xs"
                          >
                            <option value="ভাইরাল ছবি">ভাইরাল ছবি</option>
                            <option value="প্রকৃতি ও ভ্রমণ">প্রকৃতি ও ভ্রমণ</option>
                            <option value="প্রযুক্তি">প্রযুক্তি</option>
                            <option value="ডিজাইন">ডিজাইন</option>
                            <option value="ফটোগ্রাফি">ফটোগ্রাফি</option>
                            <option value="ক্যারিয়ার">ক্যারিয়ার</option>
                            <option value="ওয়ালপেপার">ওয়ালপেপার</option>
                            <option value="লাইফস্টাইল">লাইফস্টাইল</option>
                            <option value="স্পোর্টস">স্পোর্টস</option>
                            <option value="এডুকেশন">এডুকেশন</option>
                            <option value="বিনোদন">বিনোদন</option>
                          </select>
                        </div>

                        <div>
                          <label className="block text-slate-200 mb-1 font-semibold">
                            ছবি দেখার সময়সীমা (টাইমার)
                          </label>
                          <div className="flex gap-2">
                            {[5, 10, 15, 20].map((sec) => (
                              <button
                                type="button"
                                key={sec}
                                onClick={() => setNewTaskDuration(sec)}
                                className={`flex-1 py-2 rounded-lg border text-xs font-bold transition cursor-pointer ${
                                  newTaskDuration === sec
                                    ? 'bg-emerald-500 border-emerald-400 text-white shadow-xs'
                                    : 'bg-slate-900 border-slate-700 text-slate-300 hover:border-slate-600'
                                }`}
                              >
                                {sec}s
                              </button>
                            ))}
                          </div>
                        </div>
                      </div>

                      <div>
                        <label className="block text-slate-200 mb-1 font-semibold">ব্যবহারকারী রিওয়ার্ড পুরস্কার (টাকা)</label>
                        <div className="flex gap-2">
                          {[1, 2, 3, 5, 10].map((amt) => (
                            <button
                              type="button"
                              key={amt}
                              onClick={() => setNewTaskReward(amt)}
                              className={`flex-1 py-2 rounded-xl border text-xs font-bold transition cursor-pointer ${
                                newTaskReward === amt
                                  ? 'bg-emerald-500 border-emerald-400 text-white shadow-sm'
                                  : 'bg-slate-900 border-slate-700 text-slate-300 hover:border-slate-600'
                              }`}
                            >
                              ৳{amt}
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* 9:16 vs 16:9 Aspect Ratio Option */}
                      <div className="p-3 bg-slate-900/90 border border-emerald-500/40 rounded-xl space-y-2">
                        <label className="block text-emerald-400 font-bold text-xs flex items-center justify-between">
                          <span className="flex items-center gap-1.5">
                            <ImageIcon className="w-4 h-4 text-emerald-400" />
                            ইমেজ সাইজ / অনুপাত (Aspect Ratio)
                          </span>
                          <span className="text-[11px] text-amber-300 font-normal">৯:১৬ রিকমেন্ডেড (ফুল স্ক্রিন)</span>
                        </label>
                        <div className="grid grid-cols-3 gap-2">
                          <button
                            type="button"
                            onClick={() => setNewTaskAspectRatio('9:16')}
                            className={`py-2 px-2.5 rounded-xl border text-xs font-bold transition cursor-pointer flex flex-col items-center gap-1 ${
                              newTaskAspectRatio === '9:16'
                                ? 'bg-gradient-to-b from-emerald-500 to-teal-600 text-white border-emerald-400 shadow-md ring-2 ring-emerald-500/50'
                                : 'bg-slate-950 border-slate-700 text-slate-300 hover:border-slate-600'
                            }`}
                          >
                            <span className="text-sm">📱 ৯:১৬</span>
                            <span className="text-[10px] font-normal opacity-90">ভার্টিক্যাল / ফুল ইমেজ</span>
                          </button>

                          <button
                            type="button"
                            onClick={() => setNewTaskAspectRatio('16:9')}
                            className={`py-2 px-2.5 rounded-xl border text-xs font-bold transition cursor-pointer flex flex-col items-center gap-1 ${
                              newTaskAspectRatio === '16:9'
                                ? 'bg-gradient-to-b from-emerald-500 to-teal-600 text-white border-emerald-400 shadow-md ring-2 ring-emerald-500/50'
                                : 'bg-slate-950 border-slate-700 text-slate-300 hover:border-slate-600'
                            }`}
                          >
                            <span className="text-sm">🖥️ ১৬:৯</span>
                            <span className="text-[10px] font-normal opacity-90">ওয়াইড ল্যান্ডস্কেপ</span>
                          </button>

                          <button
                            type="button"
                            onClick={() => setNewTaskAspectRatio('1:1')}
                            className={`py-2 px-2.5 rounded-xl border text-xs font-bold transition cursor-pointer flex flex-col items-center gap-1 ${
                              newTaskAspectRatio === '1:1'
                                ? 'bg-gradient-to-b from-emerald-500 to-teal-600 text-white border-emerald-400 shadow-md ring-2 ring-emerald-500/50'
                                : 'bg-slate-950 border-slate-700 text-slate-300 hover:border-slate-600'
                            }`}
                          >
                            <span className="text-sm">⬜ ১:১</span>
                            <span className="text-[10px] font-normal opacity-90">বর্গাকার স্কয়ার</span>
                          </button>
                        </div>
                      </div>

                      {/* --- UNLIMITED BULK IMAGE UPLOAD MODE --- */}
                      {uploadMode === 'bulk' && (
                        <div className="p-4 bg-gradient-to-b from-amber-950/40 via-slate-900 to-slate-950 border-2 border-amber-500/60 rounded-2xl space-y-4 shadow-xl">
                          <div className="flex items-center justify-between border-b border-amber-500/30 pb-3">
                            <div>
                              <h5 className="text-amber-300 font-bold text-sm flex items-center gap-2">
                                <Sparkles className="w-4 h-4 text-amber-400 animate-spin" />
                                আনলিমিটেড ইমেজ বাল্ক আপলোড (Unlimited Bulk Images)
                              </h5>
                              <p className="text-[11px] text-slate-300 mt-0.5">
                                একসাথে ১০, ২০, ৫০ বা ১০০টি ছবি সিলেক্ট করুন; সাথে সাথে সবগুলো টাস্ক হিসেবে ওয়েবসাইটে যুক্ত হবে।
                              </p>
                            </div>
                            <span className="px-2.5 py-1 bg-amber-500/20 text-amber-300 border border-amber-500/40 rounded-full text-xs font-mono font-bold">
                              {newTaskAspectRatio} ফুল সাইজ
                            </span>
                          </div>

                          {/* Method 1: Direct Multiple Files Selection */}
                          <div className="p-3.5 bg-slate-950/90 rounded-xl border border-dashed border-amber-400/60 hover:border-amber-400 transition space-y-2">
                            <label className="block text-slate-200 font-bold flex items-center justify-between text-xs">
                              <span className="text-amber-300 flex items-center gap-1.5">
                                <Upload className="w-4 h-4" /> অপশন ১: মোবাইল / কম্পিউটার গ্যালারি থেকে একসাথে সব ছবি সিলেক্ট করুন
                              </span>
                              <span className="text-emerald-400 text-[11px] font-bold">
                                {bulkUploadedFiles.length > 0 ? `${bulkUploadedFiles.length}টি ছবি রেডি` : 'মাল্টিপল ফাইল সাপোর্ট'}
                              </span>
                            </label>

                            <input
                              ref={bulkFileInputRef}
                              type="file"
                              accept="image/*"
                              multiple
                              onChange={handleBulkFilesSelect}
                              className="hidden"
                            />

                            <button
                              type="button"
                              disabled={isBulkUploading}
                              onClick={() => bulkFileInputRef.current?.click()}
                              className="w-full py-6 bg-gradient-to-r from-amber-500/10 via-rose-500/10 to-amber-500/10 hover:from-amber-500/20 hover:to-rose-500/20 border border-amber-500/40 rounded-xl flex flex-col items-center justify-center gap-2 text-white transition cursor-pointer group"
                            >
                              <div className="w-12 h-12 rounded-full bg-amber-500/20 text-amber-300 group-hover:scale-110 flex items-center justify-center transition shadow-lg shadow-amber-500/20">
                                <Upload className="w-6 h-6" />
                              </div>
                              <span className="font-black text-sm text-amber-200">
                                {isBulkUploading
                                  ? 'ছবিগুলো রিড করা হচ্ছে... অনুগ্রহ করে অপেক্ষা করুন...'
                                  : '📱 একসাথে সব ছবি সিলেক্ট করুন (Click to Select Multiple Photos)'}
                              </span>
                              <span className="text-[11px] text-slate-300">
                                গ্যালারি ওপেন করে একসাথে যতখুশি ছবি সিলেক্ট করে ওকে দিন
                              </span>
                            </button>

                            {/* Loaded Files Preview Grid */}
                            {bulkUploadedFiles.length > 0 && (
                              <div className="pt-2 space-y-2">
                                <div className="flex items-center justify-between text-xs">
                                  <span className="text-slate-300 font-semibold">নির্বাচিত ছবিসমূহ ({bulkUploadedFiles.length} টি):</span>
                                  <button
                                    type="button"
                                    onClick={() => setBulkUploadedFiles([])}
                                    className="text-rose-400 hover:text-rose-300 text-[11px] underline cursor-pointer"
                                  >
                                    সব ক্লিয়ার করুন
                                  </button>
                                </div>
                                <div className="grid grid-cols-4 sm:grid-cols-6 gap-2 max-h-36 overflow-y-auto p-2 bg-slate-900/80 rounded-lg border border-slate-800">
                                  {bulkUploadedFiles.map((f, i) => (
                                    <div key={i} className="relative aspect-square rounded-lg overflow-hidden border border-amber-500/40 group">
                                      <img src={f.url} alt={f.name} className="w-full h-full object-cover" />
                                      <span className="absolute bottom-0 inset-x-0 bg-black/80 text-[8px] text-white p-0.5 truncate text-center">
                                        {i + 1}. {f.name}
                                      </span>
                                    </div>
                                  ))}
                                </div>
                              </div>
                            )}
                          </div>

                          {/* Method 2: Multi-line URLs */}
                          <div className="space-y-1.5">
                            <label className="block text-slate-300 font-semibold text-xs flex items-center justify-between">
                              <span>অপশন ২: অথবা ছবির অনলাইন URL লিংক পেস্ট করুন (প্রতি লাইনে ১টি লিংক):</span>
                              <span className="text-amber-400 text-[10px]">Multi-line URLs</span>
                            </label>
                            <textarea
                              rows={3}
                              value={bulkUrlsText}
                              onChange={(e) => setBulkUrlsText(e.target.value)}
                              placeholder="https://images.unsplash.com/photo-1.jpg&#10;https://images.unsplash.com/photo-2.jpg&#10;https://images.unsplash.com/photo-3.jpg"
                              className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-700 rounded-xl text-white font-mono text-[11px] focus:outline-none focus:border-amber-500"
                            />
                          </div>

                          {bulkUploadSuccessMsg && (
                            <div className="p-3 bg-emerald-950/80 border border-emerald-500/60 rounded-xl text-emerald-300 text-xs font-semibold">
                              {bulkUploadSuccessMsg}
                            </div>
                          )}

                          {/* Bulk Publish Button */}
                          <button
                            type="button"
                            onClick={handlePublishAllBulkImages}
                            className="w-full py-3.5 bg-gradient-to-r from-amber-500 via-rose-500 to-emerald-500 hover:from-amber-600 hover:to-emerald-600 text-white font-black text-sm rounded-xl shadow-xl shadow-amber-950/50 flex items-center justify-center gap-2 cursor-pointer transition transform active:scale-98"
                          >
                            <Check className="w-5 h-5 stroke-[3]" />
                            এখনই সব ছবি এক ক্লিকে পাবলিশ করুন ({bulkUploadedFiles.length + (bulkUrlsText ? bulkUrlsText.split('\n').filter(u => u.trim().length > 5).length : 0)} টি ছবি)
                          </button>
                        </div>
                      )}

                      {/* --- Image Preset Gallery (1-Click) --- */}
                      {uploadMode === 'preset' && (
                        <div className="p-3.5 bg-slate-900 border border-emerald-500/30 rounded-xl space-y-2.5">
                          <label className="block text-emerald-400 font-bold text-xs flex items-center gap-1.5">
                            <Sparkles className="w-4 h-4 text-amber-400" />
                            রেডিমেড ট্রেন্ডিং ইমেজ গ্যালারি (যেকোনো ছবিতে ক্লিক করুন)
                          </label>
                          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                            {CURATED_IMAGE_PRESETS.map((preset, idx) => (
                              <div
                                key={idx}
                                onClick={() => {
                                  setNewTaskImageUrl(preset.url);
                                  setNewTaskThumbnail(preset.url);
                                  setNewTaskBangla(preset.title);
                                  setNewTaskCategory(preset.category);
                                }}
                                className={`group relative rounded-xl overflow-hidden border cursor-pointer transition ${
                                  newTaskImageUrl === preset.url
                                    ? 'border-emerald-400 ring-2 ring-emerald-500 shadow-md'
                                    : 'border-slate-800 hover:border-slate-600'
                                }`}
                              >
                                <img
                                  src={preset.url}
                                  alt={preset.title}
                                  className="w-full h-24 object-cover group-hover:scale-105 transition duration-300"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-end p-2">
                                  <span className="text-[10px] text-white font-medium line-clamp-1">{preset.tag}</span>
                                </div>
                                {newTaskImageUrl === preset.url && (
                                  <div className="absolute top-1.5 right-1.5 w-5 h-5 rounded-full bg-emerald-500 text-white flex items-center justify-center shadow">
                                    <Check className="w-3 h-3 stroke-[3]" />
                                  </div>
                                )}
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* --- Local File Upload Mode --- */}
                      {uploadMode === 'file' && (
                        <div className="p-4 bg-slate-900/90 border-2 border-dashed border-emerald-500/50 hover:border-emerald-400 rounded-xl space-y-2.5 transition">
                          <label className="block text-slate-200 font-semibold mb-1 flex items-center justify-between">
                            <span className="flex items-center gap-1.5 text-emerald-400">
                              <ImageIcon className="w-4 h-4" /> মোবাইল / কম্পিউটার থেকে ছবি ফাইল আপলোড করুন
                            </span>
                            <span className="text-slate-400 text-[11px] font-normal">JPG, PNG, WEBP, GIF সাপোর্টেড</span>
                          </label>
                          <input
                            ref={imageFileInputRef}
                            type="file"
                            accept="image/*"
                            onChange={handleImageFileUpload}
                            className="hidden"
                          />
                          <button
                            type="button"
                            onClick={() => imageFileInputRef.current?.click()}
                            className="w-full py-6 bg-slate-950 hover:bg-slate-850 border border-slate-700/80 rounded-xl flex flex-col items-center justify-center gap-2 text-slate-300 hover:text-white transition cursor-pointer group"
                          >
                            <div className="w-12 h-12 rounded-full bg-emerald-500/10 group-hover:bg-emerald-500/20 text-emerald-400 flex items-center justify-center transition">
                              <Upload className="w-6 h-6" />
                            </div>
                            <span className="font-bold text-xs text-white">
                              {imageFileName ? `নির্বাচিত ছবি: ${imageFileName}` : 'ছবি সিলেক্ট করতে এখানে ক্লিক করুন (Click to Select Image)'}
                            </span>
                            <span className="text-[11px] text-slate-400">
                              ছবিটি তাৎক্ষণিকভাবে সিস্টেমে যুক্ত হয়ে যাবে এবং ইউজাররা দেখে ইনকাম করতে পারবে
                            </span>
                          </button>
                        </div>
                      )}

                      {/* --- Online URL Mode --- */}
                      {uploadMode === 'url' && (
                        <div className="space-y-3">
                          <div>
                            <label className="block text-slate-200 mb-1 font-semibold">
                              অনলাইন ইমেজ URL লিংক (Direct Image URL)
                            </label>
                            <input
                              type="url"
                              value={newTaskImageUrl}
                              onChange={(e) => {
                                setNewTaskImageUrl(e.target.value);
                                setNewTaskThumbnail(e.target.value);
                              }}
                              placeholder="https://images.unsplash.com/.../photo.jpg"
                              className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-xl text-white text-xs font-mono focus:outline-none focus:border-emerald-500"
                            />
                          </div>
                        </div>
                      )}

                      {/* Monetization Ad Link Configuration */}
                      <div className="p-3 bg-slate-900/90 border border-amber-500/30 rounded-xl space-y-2">
                        <label className="block text-amber-300 font-semibold text-xs flex items-center justify-between">
                          <span>এই টাস্কে সংযুক্ত মনিটাইজেশন অ্যাড লিংক (Profitable CPM Ad)</span>
                          <span className="text-[10px] text-slate-400">টাস্ক চলাকালে ওপেন হবে</span>
                        </label>
                        <input
                          type="url"
                          value={newTaskAdUrl}
                          onChange={(e) => setNewTaskAdUrl(e.target.value)}
                          placeholder="https://www.profitableratecpmnetwork.com/..."
                          className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-lg text-white text-[11px] font-mono focus:outline-none focus:border-amber-500"
                        />
                        <div className="flex flex-wrap gap-1.5 pt-1">
                          {PROFITABLE_AD_LINKS.map((link, idx) => (
                            <button
                              key={idx}
                              type="button"
                              onClick={() => setNewTaskAdUrl(link)}
                              className={`px-2 py-1 rounded text-[10px] font-mono transition cursor-pointer border ${
                                newTaskAdUrl === link
                                  ? 'bg-amber-500 text-black border-amber-400 font-bold'
                                  : 'bg-slate-800 text-slate-300 border-slate-700 hover:border-amber-500/50'
                              }`}
                            >
                              Ad Link {idx + 1}
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Live Preview Right Column */}
                    <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 flex flex-col justify-between">
                      <div>
                        <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-2 flex items-center justify-between">
                          <span className="flex items-center gap-1.5 text-emerald-400">
                            <Eye className="w-3.5 h-3.5" />
                            লাইভ প্রিভিউ ({newTaskAspectRatio === '9:16' ? '৯:১৬ ফুল সাইজ' : newTaskAspectRatio === '16:9' ? '১৬:৯ ওয়াইড' : '১:১ স্কয়ার'})
                          </span>
                          <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 text-[10px] font-bold">
                            {newTaskAspectRatio === '9:16' ? '📱 ৯:১৬ ফুল ইমেজ' : '📸 ইমেজ টাস্ক'}
                          </span>
                        </span>
                        
                        <div className={`relative rounded-xl overflow-hidden bg-black mb-3 border border-slate-800 shadow-inner flex items-center justify-center ${
                          newTaskAspectRatio === '9:16'
                            ? 'aspect-[9/16] max-h-[340px] mx-auto w-full'
                            : newTaskAspectRatio === '1:1'
                            ? 'aspect-square max-h-[260px] mx-auto w-full'
                            : 'aspect-video w-full'
                        }`}>
                          <img
                            src={newTaskImageUrl || newTaskThumbnail || 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=800&auto=format&fit=crop&q=80'}
                            alt="Image Task Preview"
                            className="w-full h-full object-cover"
                            referrerPolicy="no-referrer"
                          />

                          <div className="absolute top-2 left-2 px-2 py-0.5 rounded-lg bg-slate-950/80 backdrop-blur-sm text-emerald-400 font-bold text-[11px] border border-emerald-500/30">
                            রিওয়ার্ড: ৳{newTaskReward}
                          </div>
                          <div className="absolute top-2 right-2 px-2 py-0.5 rounded-lg bg-slate-950/80 backdrop-blur-sm text-slate-200 text-[11px] font-bold flex items-center gap-1 border border-slate-700">
                            <Clock className="w-3 h-3 text-rose-400" /> {newTaskDuration}s
                          </div>
                          <div className="absolute bottom-2 left-2 px-2 py-0.5 rounded bg-black/70 text-slate-200 text-[10px] font-medium">
                            {newTaskCategory}
                          </div>
                          <div className="absolute bottom-2 right-2 px-1.5 py-0.5 rounded bg-emerald-950/80 border border-emerald-500/40 text-emerald-300 text-[9px] font-mono font-bold">
                            {newTaskAspectRatio}
                          </div>
                        </div>

                        <h5 className="font-bold text-white text-xs line-clamp-2 leading-relaxed">
                          {newTaskBangla || 'ইমেজ টাস্কের শিরোনাম এখানে প্রদর্শিত হবে'}
                        </h5>
                        <div className="mt-2 text-[11px] text-slate-400 space-y-1 bg-slate-950/60 p-2.5 rounded-lg border border-slate-800">
                          <p className="flex justify-between">
                            <span>ধরণ:</span>
                            <span className="text-emerald-400 font-semibold">ইমেজ দেখে আয়</span>
                          </p>
                          <p className="flex justify-between">
                            <span>টাইমার:</span>
                            <span className="text-white font-semibold">{newTaskDuration} সেকেন্ড</span>
                          </p>
                          <p className="flex justify-between">
                            <span>রিওয়ার্ড:</span>
                            <span className="text-emerald-400 font-bold">৳{newTaskReward} টাকা</span>
                          </p>
                        </div>
                      </div>

                      <div className="pt-4 border-t border-slate-800 flex gap-2">
                        <button
                          type="button"
                          onClick={() => setIsAddingTask(false)}
                          className="flex-1 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl text-xs font-medium cursor-pointer transition"
                        >
                          বাতিল
                        </button>
                        <button
                          type="submit"
                          className="flex-1 py-2.5 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white rounded-xl text-xs font-bold shadow-md flex items-center justify-center gap-1.5 cursor-pointer transition"
                        >
                          <Check className="w-4 h-4 stroke-[3]" /> পাবলিশ করুন
                        </button>
                      </div>
                    </div>
                  </div>
                </form>
              )}

              {/* Task Cards Grid */}
              <div>
                <div className="flex items-center justify-between mb-3">
                  <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center gap-2">
                    <span>চলতি টাস্ক তালিকা ({tasks.length} টি সক্রিয়)</span>
                  </h4>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {tasks.map((task) => {
                    const isImg = task.mediaType === 'image' || !task.videoUrl;
                    return (
                      <div
                        key={task.id}
                        className="bg-slate-950 border border-slate-800 rounded-2xl overflow-hidden flex flex-col justify-between group hover:border-emerald-500/50 hover:shadow-lg transition duration-300"
                      >
                        <div className="relative aspect-video overflow-hidden bg-slate-900">
                          <img
                            src={task.imageUrl || task.thumbnail}
                            alt={task.banglaTitle}
                            className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                            referrerPolicy="no-referrer"
                          />
                          <div className="absolute top-2 left-2 px-2.5 py-0.5 rounded-lg bg-slate-950/80 backdrop-blur-sm text-emerald-400 font-bold text-xs border border-emerald-500/30 flex items-center gap-1">
                            <span>রিওয়ার্ড: ৳{task.reward}</span>
                          </div>
                          
                          <div className="absolute top-2 right-2 px-2 py-0.5 rounded-lg bg-slate-950/80 backdrop-blur-sm text-slate-300 font-medium text-xs flex items-center gap-1">
                            <Clock className="w-3 h-3 text-emerald-400" /> {task.durationSec}s
                          </div>

                          <div className="absolute bottom-2 left-2 flex items-center gap-1.5">
                            <span className="px-2 py-0.5 rounded bg-black/70 text-white text-[10px] font-semibold border border-white/10">
                              {task.category || 'ভাইরাল'}
                            </span>
                            <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                              isImg ? 'bg-indigo-600/90 text-white' : 'bg-rose-600/90 text-white'
                            }`}>
                              {isImg ? '📸 ইমেজ টাস্ক' : '🎥 ভিডিও'}
                            </span>
                          </div>
                        </div>

                        <div className="p-4 flex-1 flex flex-col justify-between">
                          <div>
                            <h4 className="text-xs font-bold text-white line-clamp-2 mb-1 group-hover:text-emerald-400 transition">
                              {task.banglaTitle}
                            </h4>
                            <p className="text-[11px] text-slate-400 line-clamp-1">{task.title}</p>
                          </div>

                          <div className="flex items-center justify-between pt-3 border-t border-slate-850 mt-3 text-xs">
                            <span className="text-[10px] text-slate-500 font-mono">ID: {task.id}</span>
                            <button
                              onClick={() => onDeleteTask(task.id)}
                              className="px-2.5 py-1 bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 border border-rose-500/20 rounded-lg text-[11px] font-medium flex items-center gap-1 transition cursor-pointer"
                            >
                              <Trash2 className="w-3 h-3" /> মুছুন
                            </button>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          )}

          {/* ============================================================ */}
          {/* 3. ADS NETWORK CONTROLLER TAB (Native, Social Bar, Popunder) */}
          {/* ============================================================ */}
          {activeTab === 'ads' && (
            <div className="space-y-6">
              {/* Ad Format Tabs */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b border-slate-800 pb-4">
                <div>
                  <h3 className="text-base font-bold text-white flex items-center gap-2">
                    <Megaphone className="w-5 h-5 text-amber-400" />
                    বিজ্ঞাপন নেটওয়ার্ক ও অ্যাড ফরম্যাট কন্ট্রোল
                  </h3>
                  <p className="text-xs text-slate-400">
                    Native Banner, Social Bar এবং Popunder বিজ্ঞাপনের অন/অফ, লিংক এবং ব্যানার পরিচালনা করুন।
                  </p>
                </div>

                <div className="flex items-center gap-1 bg-slate-950 p-1 rounded-xl border border-slate-800">
                  <button
                    onClick={() => setAdSubTab('native')}
                    className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition flex items-center gap-1.5 cursor-pointer ${
                      adSubTab === 'native'
                        ? 'bg-amber-500 text-slate-950 shadow-md'
                        : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    <LayoutTemplate className="w-3.5 h-3.5" />
                    1. Native Banner
                  </button>

                  <button
                    onClick={() => setAdSubTab('social')}
                    className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition flex items-center gap-1.5 cursor-pointer ${
                      adSubTab === 'social'
                        ? 'bg-amber-500 text-slate-950 shadow-md'
                        : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    <MessageSquare className="w-3.5 h-3.5" />
                    2. Social Bar
                  </button>

                  <button
                    onClick={() => setAdSubTab('popunder')}
                    className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition flex items-center gap-1.5 cursor-pointer ${
                      adSubTab === 'popunder'
                        ? 'bg-amber-500 text-slate-950 shadow-md'
                        : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    <MousePointerClick className="w-3.5 h-3.5" />
                    3. Popunder
                  </button>

                  <button
                    onClick={() => setAdSubTab('direct')}
                    className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition flex items-center gap-1.5 cursor-pointer ${
                      adSubTab === 'direct'
                        ? 'bg-gradient-to-r from-amber-500 to-orange-500 text-slate-950 font-bold shadow-md'
                        : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    <Flame className="w-3.5 h-3.5 text-amber-400" />
                    4. Direct Link (২০s ভিডিও অ্যাড)
                  </button>
                </div>
              </div>

              {/* --- 3A. NATIVE BANNER CONTROLS --- */}
              {adSubTab === 'native' && (
                <div className="space-y-6 animate-in fade-in duration-200">
                  {/* Master Toggle */}
                  <div className="bg-slate-950 border border-slate-800 p-5 rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                      <div className="flex items-center gap-2">
                        <LayoutTemplate className="w-5 h-5 text-blue-400" />
                        <h4 className="text-sm font-bold text-white">Native Banner বিজ্ঞাপন মডিউল</h4>
                        <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                          tempSettings.adControls?.nativeBannerEnabled
                            ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40'
                            : 'bg-rose-500/20 text-rose-400 border border-rose-500/40'
                        }`}>
                          {tempSettings.adControls?.nativeBannerEnabled ? 'ACTIVE (সক্রিয়)' : 'DISABLED (বন্ধ)'}
                        </span>
                      </div>
                      <p className="text-xs text-slate-400 mt-1">
                        ব্যবহারকারীদের হোমপেজে স্পনসরড কার্ড ও ব্যানার ফরম্যাটে প্রদর্শিত হয়।
                      </p>
                    </div>

                    <div className="flex items-center gap-3">
                      <button
                        onClick={() =>
                          handleUpdateAdControls({
                            nativeBannerEnabled: !tempSettings.adControls?.nativeBannerEnabled,
                          })
                        }
                        className={`px-5 py-2.5 rounded-xl font-bold text-xs transition cursor-pointer shadow-md ${
                          tempSettings.adControls?.nativeBannerEnabled
                            ? 'bg-rose-600 hover:bg-rose-500 text-white'
                            : 'bg-emerald-600 hover:bg-emerald-500 text-white'
                        }`}
                      >
                        {tempSettings.adControls?.nativeBannerEnabled ? 'নেটিভ ব্যানার বন্ধ করুন' : 'নেটিভ ব্যানার চালু করুন'}
                      </button>

                      <button
                        onClick={() => setIsAddingNativeBanner(!isAddingNativeBanner)}
                        className="px-4 py-2.5 bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs rounded-xl flex items-center gap-1.5 transition cursor-pointer"
                      >
                        <Plus className="w-4 h-4" /> নতুন ব্যানার যোগ
                      </button>
                    </div>
                  </div>

                  {/* Add New Native Banner Form */}
                  {isAddingNativeBanner && (
                    <form
                      onSubmit={handleAddNativeBanner}
                      className="bg-slate-950 border border-blue-500/40 rounded-2xl p-5 space-y-4 animate-in fade-in duration-200"
                    >
                      <h4 className="text-sm font-bold text-blue-400 flex items-center gap-2 border-b border-slate-800 pb-3">
                        <Plus className="w-4 h-4" /> নতুন Native Banner যুক্ত করুন
                      </h4>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                        <div>
                          <label className="block text-slate-300 font-semibold mb-1">ব্যানার টাইটেল</label>
                          <input
                            type="text"
                            required
                            value={newBannerTitle}
                            onChange={(e) => setNewBannerTitle(e.target.value)}
                            placeholder="যেমন: হাই স্পিড ব্রডব্যান্ড অফার ২০২৬"
                            className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-lg text-white"
                          />
                        </div>

                        <div>
                          <label className="block text-slate-300 font-semibold mb-1">স্পনসর / ব্র্যান্ডের নাম</label>
                          <input
                            type="text"
                            value={newBannerSponsor}
                            onChange={(e) => setNewBannerSponsor(e.target.value)}
                            placeholder="যেমন: স্পনসরড পার্টনার বা টেক একাডেমি"
                            className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-lg text-white"
                          />
                        </div>

                        <div className="sm:col-span-2">
                          <label className="block text-slate-300 font-semibold mb-1">বিজ্ঞাপনের বিবরণ (Description)</label>
                          <input
                            type="text"
                            value={newBannerDesc}
                            onChange={(e) => setNewBannerDesc(e.target.value)}
                            placeholder="যেমন: দেশজুড়ে নিরবচ্ছিন্ন গতির ইন্টারনেট সংযোগ মাত্র ৭৯৯ টাকায়..."
                            className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-lg text-white"
                          />
                        </div>

                        {/* Banner Image Selection Mode (Upload / URL) */}
                        <div className="sm:col-span-2 bg-slate-900/90 border border-slate-800 p-3.5 rounded-xl space-y-3">
                          <div className="flex items-center justify-between">
                            <label className="text-slate-200 font-bold flex items-center gap-2">
                              <ImageIcon className="w-4 h-4 text-blue-400" />
                              <span>ব্যানার ছবি যুক্ত করুন (Image Source)</span>
                            </label>
                            <div className="flex rounded-lg bg-slate-950 p-1 border border-slate-800">
                              <button
                                type="button"
                                onClick={() => setBannerUploadMode('upload')}
                                className={`px-3 py-1 rounded-md text-[11px] font-semibold transition cursor-pointer flex items-center gap-1 ${
                                  bannerUploadMode === 'upload'
                                    ? 'bg-blue-600 text-white shadow-xs'
                                    : 'text-slate-400 hover:text-slate-200'
                                }`}
                              >
                                <Upload className="w-3 h-3" /> ফাইল আপলোড করুন
                              </button>
                              <button
                                type="button"
                                onClick={() => setBannerUploadMode('url')}
                                className={`px-3 py-1 rounded-md text-[11px] font-semibold transition cursor-pointer flex items-center gap-1 ${
                                  bannerUploadMode === 'url'
                                    ? 'bg-blue-600 text-white shadow-xs'
                                    : 'text-slate-400 hover:text-slate-200'
                                }`}
                              >
                                <LinkIcon className="w-3 h-3" /> ইমেজ URL লিংক
                              </button>
                            </div>
                          </div>

                          {bannerUploadMode === 'upload' ? (
                            <div>
                              <input
                                ref={bannerFileInputRef}
                                type="file"
                                accept="image/*"
                                onChange={handleBannerFileUpload}
                                className="hidden"
                              />
                              <div
                                onClick={() => bannerFileInputRef.current?.click()}
                                className="border-2 border-dashed border-blue-500/40 hover:border-blue-400 bg-slate-950/70 hover:bg-slate-950 rounded-xl p-4 flex flex-col items-center justify-center gap-2 cursor-pointer transition text-center"
                              >
                                <div className="w-10 h-10 rounded-full bg-blue-500/20 text-blue-400 flex items-center justify-center">
                                  <Upload className="w-5 h-5" />
                                </div>
                                <div>
                                  <p className="text-xs font-semibold text-slate-200">
                                    {bannerFileName ? `সিলেক্টেড ছবি: ${bannerFileName}` : 'কম্পিউটার বা মোবাইল থেকে ব্যানার ছবি সিলেক্ট করুন'}
                                  </p>
                                  <p className="text-[10px] text-slate-400 mt-0.5">
                                    PNG, JPG, WebP বা GIF (ক্লিক করে ফাইল সিলেক্ট করুন)
                                  </p>
                                </div>
                              </div>
                            </div>
                          ) : (
                            <div>
                              <input
                                type="url"
                                value={newBannerImg}
                                onChange={(e) => setNewBannerImg(e.target.value)}
                                placeholder="https://images.unsplash.com/..."
                                className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-lg text-white font-mono text-[11px]"
                              />
                            </div>
                          )}

                          {/* Image Thumbnail Preview */}
                          {newBannerImg && (
                            <div className="flex items-center gap-3 p-2 bg-slate-950 rounded-lg border border-slate-800">
                              <img
                                src={newBannerImg}
                                alt="Banner Preview"
                                className="w-16 h-12 object-cover rounded-md bg-slate-800 border border-slate-700 shrink-0"
                              />
                              <div className="text-[11px] text-slate-300">
                                <span className="text-emerald-400 font-semibold block">✓ ছবির প্রিভিউ প্রস্তুত</span>
                                <span className="text-slate-400 truncate max-w-xs block">{newBannerImg}</span>
                              </div>
                            </div>
                          )}
                        </div>

                        <div className="sm:col-span-2">
                          <label className="block text-slate-300 font-semibold mb-1">টার্গেট লিংক (Target Click URL)</label>
                          <input
                            type="url"
                            required
                            value={newBannerUrl}
                            onChange={(e) => setNewBannerUrl(e.target.value)}
                            placeholder="যেমন: https://t.me/your_channel অথবা https://website.com"
                            className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-lg text-white font-mono text-[11px]"
                          />
                          <p className="text-[10px] text-slate-400 mt-1">
                            বিজ্ঞাপনে ক্লিক করলে ব্যবহারকারীকে এই গন্তব্য লিংক বা টেলিগ্রাম চ্যানেলে নেওয়া হবে।
                          </p>
                        </div>
                      </div>

                      <div className="flex justify-end gap-2 pt-2">
                        <button
                          type="button"
                          onClick={() => setIsAddingNativeBanner(false)}
                          className="px-4 py-2 bg-slate-800 text-slate-300 rounded-lg text-xs"
                        >
                          বাতিল
                        </button>
                        <button
                          type="submit"
                          className="px-5 py-2 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-lg text-xs shadow-md"
                        >
                          সংরক্ষণ করুন
                        </button>
                      </div>
                    </form>
                  )}

                  {/* Native Banners List */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {(tempSettings.adControls?.nativeBanners || []).map((ad) => (
                      <div
                        key={ad.id}
                        className="bg-slate-950 border border-slate-800 rounded-xl p-4 flex gap-3.5 items-start justify-between"
                      >
                        <img
                          src={ad.imageUrl}
                          alt={ad.title}
                          className="w-20 h-20 rounded-lg object-cover bg-slate-900 shrink-0"
                        />
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1">
                            <span className="text-[10px] bg-slate-800 text-slate-300 px-2 py-0.5 rounded font-semibold">
                              {ad.badge}
                            </span>
                            <span className="text-[11px] text-slate-400">{ad.sponsorName}</span>
                          </div>
                          <h5 className="font-bold text-white text-xs truncate">{ad.title}</h5>
                          <p className="text-[11px] text-slate-400 line-clamp-2 mt-0.5">{ad.description}</p>
                          <a
                            href={ad.targetUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-[11px] text-blue-400 hover:underline flex items-center gap-1 mt-2"
                          >
                            <span>লিংক: {ad.targetUrl}</span>
                            <ExternalLink className="w-3 h-3" />
                          </a>
                        </div>
                        <button
                          onClick={() => handleDeleteNativeBanner(ad.id)}
                          className="p-1.5 bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 rounded-lg transition cursor-pointer"
                          title="ব্যানার মুছুন"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* --- 3B. SOCIAL BAR CONTROLS --- */}
              {adSubTab === 'social' && (
                <div className="space-y-6 animate-in fade-in duration-200">
                  {/* Master Toggle */}
                  <div className="bg-slate-950 border border-slate-800 p-5 rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                      <div className="flex items-center gap-2">
                        <MessageSquare className="w-5 h-5 text-emerald-400" />
                        <h4 className="text-sm font-bold text-white">Social Bar অ্যাডভার্টাইজিং বার</h4>
                        <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                          tempSettings.adControls?.socialBarEnabled
                            ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40'
                            : 'bg-rose-500/20 text-rose-400 border border-rose-500/40'
                        }`}>
                          {tempSettings.adControls?.socialBarEnabled ? 'ACTIVE (সক্রিয়)' : 'DISABLED (বন্ধ)'}
                        </span>
                      </div>
                      <p className="text-xs text-slate-400 mt-1">
                        ব্যবহারকারীদের কাছে আকর্ষণীয় নোটিফিকেশন বা সোশ্যাল মেসেজ বার আকারে প্রদর্শিত হয়।
                      </p>
                    </div>

                    <button
                      onClick={() =>
                        handleUpdateAdControls({
                          socialBarEnabled: !tempSettings.adControls?.socialBarEnabled,
                        })
                      }
                      className={`px-5 py-2.5 rounded-xl font-bold text-xs transition cursor-pointer shadow-md ${
                        tempSettings.adControls?.socialBarEnabled
                          ? 'bg-rose-600 hover:bg-rose-500 text-white'
                          : 'bg-emerald-600 hover:bg-emerald-500 text-white'
                      }`}
                    >
                      {tempSettings.adControls?.socialBarEnabled ? 'Social Bar বন্ধ করুন' : 'Social Bar চালু করুন'}
                    </button>
                  </div>

                  {/* Social Bar Settings Box */}
                  <div className="bg-slate-950 border border-slate-800 rounded-2xl p-5 space-y-4">
                    <h4 className="text-sm font-bold text-emerald-400 flex items-center gap-2 border-b border-slate-800 pb-3">
                      <Sliders className="w-4 h-4" /> Social Bar মেসেজ ও লিংক কাস্টমাইজেশন
                    </h4>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                      <div className="sm:col-span-2">
                        <label className="block text-slate-200 font-semibold mb-1">Social Bar শিরোনাম (Title)</label>
                        <input
                          type="text"
                          value={tempSettings.adControls?.socialBarTitle || ''}
                          onChange={(e) =>
                            setTempSettings({
                              ...tempSettings,
                              adControls: {
                                ...tempSettings.adControls,
                                socialBarTitle: e.target.value,
                              },
                            })
                          }
                          className="w-full px-3.5 py-2 bg-slate-900 border border-slate-700 rounded-lg text-white"
                        />
                      </div>

                      <div className="sm:col-span-2">
                        <label className="block text-slate-200 font-semibold mb-1">Social Bar বিবরণ বার্তা</label>
                        <input
                          type="text"
                          value={tempSettings.adControls?.socialBarDescription || ''}
                          onChange={(e) =>
                            setTempSettings({
                              ...tempSettings,
                              adControls: {
                                ...tempSettings.adControls,
                                socialBarDescription: e.target.value,
                              },
                            })
                          }
                          className="w-full px-3.5 py-2 bg-slate-900 border border-slate-700 rounded-lg text-white"
                        />
                      </div>

                      <div>
                        <label className="block text-slate-200 font-semibold mb-1">বাটন টেক্সট</label>
                        <input
                          type="text"
                          value={tempSettings.adControls?.socialBarLinkText || ''}
                          onChange={(e) =>
                            setTempSettings({
                              ...tempSettings,
                              adControls: {
                                ...tempSettings.adControls,
                                socialBarLinkText: e.target.value,
                              },
                            })
                          }
                          className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-lg text-white"
                        />
                      </div>

                      <div>
                        <label className="block text-slate-200 font-semibold mb-1">বাটন টার্গেট লিংক URL</label>
                        <input
                          type="url"
                          value={tempSettings.adControls?.socialBarLinkUrl || ''}
                          onChange={(e) =>
                            setTempSettings({
                              ...tempSettings,
                              adControls: {
                                ...tempSettings.adControls,
                                socialBarLinkUrl: e.target.value,
                              },
                            })
                          }
                          className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-lg text-white font-mono text-[11px]"
                        />
                      </div>
                    </div>

                    {/* Social Bar Live Preview */}
                    <div className="pt-2">
                      <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-2">
                        Social Bar লাইভ প্রিভিউ:
                      </span>
                      <div className="bg-gradient-to-r from-teal-900 via-emerald-900 to-slate-900 text-white rounded-xl p-3.5 border border-emerald-500/30 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
                        <div className="flex items-center gap-2.5">
                          <Sparkles className="w-4 h-4 text-emerald-300 shrink-0 animate-pulse" />
                          <div>
                            <span className="font-bold text-white block">
                              {tempSettings.adControls?.socialBarTitle}
                            </span>
                            <span className="text-[11px] text-slate-300">
                              {tempSettings.adControls?.socialBarDescription}
                            </span>
                          </div>
                        </div>
                        <span className="px-3 py-1 bg-emerald-500 text-slate-950 font-bold rounded-lg shrink-0">
                          {tempSettings.adControls?.socialBarLinkText}
                        </span>
                      </div>
                    </div>

                    <div className="flex justify-end pt-2">
                      <button
                        type="button"
                        onClick={() => handleSaveSettings()}
                        className="px-6 py-2.5 bg-emerald-500 hover:bg-emerald-600 text-white font-bold rounded-xl text-xs shadow-md flex items-center gap-1.5 cursor-pointer"
                      >
                        <Check className="w-4 h-4" /> Social Bar সংরক্ষণ করুন
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* --- 3C. POPUNDER CONTROLS --- */}
              {adSubTab === 'popunder' && (
                <div className="space-y-6 animate-in fade-in duration-200">
                  {/* Master Toggle */}
                  <div className="bg-slate-950 border border-slate-800 p-5 rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                      <div className="flex items-center gap-2">
                        <MousePointerClick className="w-5 h-5 text-amber-400" />
                        <h4 className="text-sm font-bold text-white">Popunder অ্যাডভার্টাইজিং সিস্টেম</h4>
                        <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                          tempSettings.adControls?.popunderEnabled
                            ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40'
                            : 'bg-rose-500/20 text-rose-400 border border-rose-500/40'
                        }`}>
                          {tempSettings.adControls?.popunderEnabled ? 'ACTIVE (সক্রিয়)' : 'DISABLED (বন্ধ)'}
                        </span>
                      </div>
                      <p className="text-xs text-slate-400 mt-1">
                        ব্যবহারকারী পেজে ক্লিক করলে অথবা নির্দিষ্ট টাইমার শেষে টার্গেট লিংক/অফার নতুন উইন্ডোতে লোড হয়।
                      </p>
                    </div>

                    <button
                      onClick={() =>
                        handleUpdateAdControls({
                          popunderEnabled: !tempSettings.adControls?.popunderEnabled,
                        })
                      }
                      className={`px-5 py-2.5 rounded-xl font-bold text-xs transition cursor-pointer shadow-md ${
                        tempSettings.adControls?.popunderEnabled
                          ? 'bg-rose-600 hover:bg-rose-500 text-white'
                          : 'bg-emerald-600 hover:bg-emerald-500 text-white'
                      }`}
                    >
                      {tempSettings.adControls?.popunderEnabled ? 'Popunder বন্ধ করুন' : 'Popunder চালু করুন'}
                    </button>
                  </div>

                  {/* Popunder Configuration */}
                  <div className="bg-slate-950 border border-slate-800 rounded-2xl p-5 space-y-4">
                    <h4 className="text-sm font-bold text-amber-400 flex items-center gap-2 border-b border-slate-800 pb-3">
                      <Sliders className="w-4 h-4" /> Popunder ট্রিগার ও ল্যান্ডিং URL সেটিংস
                    </h4>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                      <div className="sm:col-span-2">
                        <label className="block text-slate-200 font-semibold mb-1">
                          Popunder টার্গেট ল্যান্ডিং পেজ URL <span className="text-rose-400">*</span>
                        </label>
                        <p className="text-[11px] text-slate-400 mb-2">
                          ব্যবহারকারী পেজে ট্রিগার করলে এই লিংকে রিডাইরেক্ট/পপআপ হবে (যেমন: টেলিগ্রাম লিংক, অফার পেজ বা অ্যাড নেটওয়ার্ক লিংক)।
                        </p>
                        <input
                          type="url"
                          required
                          value={tempSettings.adControls?.popunderUrl || ''}
                          onChange={(e) =>
                            setTempSettings({
                              ...tempSettings,
                              adControls: {
                                ...tempSettings.adControls,
                                popunderUrl: e.target.value,
                              },
                            })
                          }
                          placeholder="https://t.me/..."
                          className="w-full px-3.5 py-2.5 bg-slate-900 border border-slate-700 rounded-xl text-white font-mono text-xs focus:outline-none focus:border-amber-500"
                        />
                      </div>

                      <div>
                        <label className="block text-slate-200 font-semibold mb-1">Popunder ট্রিগার টাইপ</label>
                        <select
                          value={tempSettings.adControls?.popunderTrigger || 'first_click'}
                          onChange={(e) =>
                            setTempSettings({
                              ...tempSettings,
                              adControls: {
                                ...tempSettings.adControls,
                                popunderTrigger: e.target.value as any,
                              },
                            })
                          }
                          className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-lg text-white"
                        >
                          <option value="first_click">ব্যবহারকারীর ১ম ক্লিকে (On First User Click)</option>
                          <option value="timer">নির্দিষ্ট সেকেন্ড পর পর (Timer Based)</option>
                          <option value="task_complete">ভিডিও টাস্ক সফলভাবে দেখার পর</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-slate-200 font-semibold mb-1">টাইমার ডিলে (সেকেন্ড)</label>
                        <input
                          type="number"
                          value={tempSettings.adControls?.popunderTimerSec || 15}
                          onChange={(e) =>
                            setTempSettings({
                              ...tempSettings,
                              adControls: {
                                ...tempSettings.adControls,
                                popunderTimerSec: Number(e.target.value),
                              },
                            })
                          }
                          className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-lg text-white font-bold"
                        />
                      </div>
                    </div>

                    <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-3 border-t border-slate-800">
                      <button
                        type="button"
                        onClick={() => {
                          if (tempSettings.adControls?.popunderUrl) {
                            window.open(tempSettings.adControls.popunderUrl, '_blank');
                          }
                        }}
                        className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-amber-400 rounded-xl text-xs font-semibold flex items-center gap-1.5 cursor-pointer"
                      >
                        <ExternalLink className="w-3.5 h-3.5" /> Popunder টেস্ট করুন
                      </button>

                      <button
                        type="button"
                        onClick={() => handleSaveSettings()}
                        className="px-6 py-2.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold rounded-xl text-xs shadow-md flex items-center gap-1.5 cursor-pointer"
                      >
                        <Check className="w-4 h-4" /> Popunder সেটিংস সংরক্ষণ করুন
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* --- 3D. DIRECT AD LINK CONTROLS (২০ সেকেন্ড ভিডিও অ্যাড) --- */}
              {adSubTab === 'direct' && (
                <div className="space-y-6 animate-in fade-in duration-200">
                  {/* Master Toggle */}
                  <div className="bg-slate-950 border border-slate-800 p-5 rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                      <div className="flex items-center gap-2">
                        <Flame className="w-5 h-5 text-amber-400" />
                        <h4 className="text-sm font-bold text-white">Direct Ad Link (ভিডিও ইন্টারস্টিশিয়াল অ্যাড)</h4>
                        <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                          tempSettings.adControls?.directAdEnabled
                            ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40'
                            : 'bg-rose-500/20 text-rose-400 border border-rose-500/40'
                        }`}>
                          {tempSettings.adControls?.directAdEnabled ? 'ACTIVE (সক্রিয়)' : 'DISABLED (বন্ধ)'}
                        </span>
                      </div>
                      <p className="text-xs text-slate-400 mt-1">
                        ব্যবহারকারী যেকোনো ভিডিও ৫ সেকেন্ড দেখার পর ভিডিও পজ হয়ে ২০ সেকেন্ড অ্যাড দেখার নোটিশ ভেসে উঠবে।
                      </p>
                    </div>

                    <button
                      onClick={() =>
                        handleUpdateAdControls({
                          directAdEnabled: !tempSettings.adControls?.directAdEnabled,
                        })
                      }
                      className={`px-5 py-2.5 rounded-xl font-bold text-xs transition cursor-pointer shadow-md ${
                        tempSettings.adControls?.directAdEnabled
                          ? 'bg-rose-600 hover:bg-rose-500 text-white'
                          : 'bg-emerald-600 hover:bg-emerald-500 text-white'
                      }`}
                    >
                      {tempSettings.adControls?.directAdEnabled ? 'Direct Ad বন্ধ করুন' : 'Direct Ad চালু করুন'}
                    </button>
                  </div>

                  {/* Settings Box */}
                  <div className="bg-slate-950 border border-slate-800 rounded-2xl p-5 space-y-4">
                    <h4 className="text-sm font-bold text-amber-400 flex items-center gap-2 border-b border-slate-800 pb-3">
                      <Sliders className="w-4 h-4" /> Direct Ad লিংক ও কাউন্টডাউন কনফিগারেশন
                    </h4>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                      <div className="sm:col-span-2">
                        <label className="block text-slate-200 font-semibold mb-1">
                          আপনার অ্যাক্টিভ Direct Ad লিংক URL
                        </label>
                        <input
                          type="url"
                          required
                          value={tempSettings.adControls?.directAdUrl || ''}
                          onChange={(e) =>
                            setTempSettings({
                              ...tempSettings,
                              adControls: {
                                ...tempSettings.adControls,
                                directAdUrl: e.target.value,
                              },
                            })
                          }
                          placeholder="https://www.profitableratecpmnetwork.com/..."
                          className="w-full px-3.5 py-2.5 bg-slate-900 border border-slate-700 rounded-xl text-white font-mono text-xs focus:outline-none focus:border-amber-500"
                        />
                        <p className="text-[10px] text-slate-400 mt-1">
                          বর্তমানে সক্রিয় অ্যাড লিংক: <span className="text-amber-400 font-mono select-all break-all">{tempSettings.adControls?.directAdUrl || 'নাই'}</span>
                        </p>

                        {/* 4 Profitable CPM Links Quick Switcher */}
                        <div className="mt-3 p-3 bg-slate-900/90 border border-slate-800 rounded-xl space-y-2">
                          <div className="flex items-center justify-between">
                            <span className="text-[11px] font-bold text-amber-400">💎 কনফিগার করা ৪টি Profitable CPM Ad লিংকসমূহ:</span>
                            <span className="text-[10px] text-slate-400">ক্লিক করে পরিবর্তন বা টেস্ট করুন</span>
                          </div>
                          <div className="space-y-1.5">
                            {PROFITABLE_AD_LINKS.map((link, idx) => {
                              const isCurrent = tempSettings.adControls?.directAdUrl === link;
                              return (
                                <div
                                  key={idx}
                                  className={`p-2 rounded-lg flex items-center justify-between gap-2 border transition ${
                                    isCurrent
                                      ? 'bg-amber-500/10 border-amber-500/50'
                                      : 'bg-slate-950 border-slate-800 hover:border-slate-700'
                                  }`}
                                >
                                  <div className="min-w-0 flex-1">
                                    <div className="flex items-center gap-2">
                                      <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-slate-800 text-amber-300">
                                        Ad #{idx + 1}
                                      </span>
                                      {isCurrent && (
                                        <span className="text-[10px] font-bold text-emerald-400">● সক্রিয় (Active)</span>
                                      )}
                                    </div>
                                    <p className="text-[11px] font-mono text-slate-300 truncate mt-0.5 select-all">
                                      {link}
                                    </p>
                                  </div>
                                  <div className="flex items-center gap-1.5 shrink-0">
                                    {!isCurrent && (
                                      <button
                                        type="button"
                                        onClick={() =>
                                          setTempSettings({
                                            ...tempSettings,
                                            adControls: {
                                              ...tempSettings.adControls,
                                              directAdUrl: link,
                                            },
                                          })
                                        }
                                        className="px-2.5 py-1 bg-amber-500/20 hover:bg-amber-500 text-amber-300 hover:text-black font-semibold rounded text-[10px] transition cursor-pointer"
                                      >
                                        সেট করুন
                                      </button>
                                    )}
                                    <a
                                      href={link}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      className="px-2 py-1 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded text-[10px] flex items-center gap-1 transition"
                                    >
                                      <ExternalLink className="w-3 h-3" />
                                      <span>টেস্ট</span>
                                    </a>
                                  </div>
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      </div>

                      <div className="sm:col-span-2">
                        <label className="block text-slate-200 font-semibold mb-1">
                          নোটিশ মেসেজ হেডলাইন (Headline Notice)
                        </label>
                        <input
                          type="text"
                          value={tempSettings.adControls?.directAdHeadline || 'ফুল ভিডিও দেখতে আপনাকে ২০ সেকেন্ড অ্যাড দেখতে হবে তাহলে ফুল ভিডিও দেখতে পাবেন'}
                          onChange={(e) =>
                            setTempSettings({
                              ...tempSettings,
                              adControls: {
                                ...tempSettings.adControls,
                                directAdHeadline: e.target.value,
                              },
                            })
                          }
                          className="w-full px-3.5 py-2 bg-slate-900 border border-slate-700 rounded-lg text-white"
                        />
                      </div>

                      <div>
                        <label className="block text-slate-200 font-semibold mb-1">
                          ভিডিও কত সেকেন্ড দেখার পর অ্যাড আসবে? (Trigger Time)
                        </label>
                        <div className="flex items-center gap-2">
                          <input
                            type="number"
                            min={1}
                            max={30}
                            value={tempSettings.adControls?.videoAdTriggerSec ?? 10}
                            onChange={(e) =>
                              setTempSettings({
                                ...tempSettings,
                                adControls: {
                                  ...tempSettings.adControls,
                                  videoAdTriggerSec: Number(e.target.value),
                                },
                              })
                            }
                            className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-lg text-white font-bold"
                          />
                          <span className="text-slate-400 text-xs font-semibold">সেকেন্ড</span>
                        </div>
                      </div>

                      <div>
                        <label className="block text-slate-200 font-semibold mb-1">
                          ব্যবহারকারীকে কত সেকেন্ড অ্যাড দেখতে হবে? (Ad Watch Duration)
                        </label>
                        <div className="flex items-center gap-2">
                          <input
                            type="number"
                            min={5}
                            max={60}
                            value={tempSettings.adControls?.adRequiredDurationSec ?? 20}
                            onChange={(e) =>
                              setTempSettings({
                                ...tempSettings,
                                adControls: {
                                  ...tempSettings.adControls,
                                  adRequiredDurationSec: Number(e.target.value),
                                },
                              })
                            }
                            className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-lg text-white font-bold text-amber-400"
                          />
                          <span className="text-slate-400 text-xs font-semibold">সেকেন্ড</span>
                        </div>
                      </div>
                    </div>

                    {/* How It Works Explanation Box */}
                    <div className="p-3.5 bg-slate-900/80 border border-slate-800 rounded-xl space-y-1.5 text-xs text-slate-300">
                      <div className="flex items-center gap-2 text-amber-400 font-bold">
                        <Flame className="w-4 h-4" />
                        <span>ভিডিও ইন্টারস্টিশিয়াল সিস্টেম কীভাবে কাজ করে:</span>
                      </div>
                      <ol className="list-decimal list-inside space-y-1 text-[11px] text-slate-400">
                        <li>ব্যবহারকারী যেকোনো ভিডিও প্লে করলে প্রথমে ১০ সেকেন্ড চলবে।</li>
                        <li>১০ সেকেন্ড পূর্ণ হওয়ার সাথে সাথে ভিডিও পজ হয়ে যাবে এবং পপআপে ভেসে উঠবে: <strong className="text-slate-200">"ফুল ভিডিও দেখতে আপনাকে ২০ সেকেন্ড অ্যাড দেখতে হবে তাহলে ফুল ভিডিও দেখতে পাবেন"</strong>।</li>
                        <li>ব্যবহারকারী বাটনে চাপলে আপনার কনফিগার করা Profitable CPM Ad লিংক (<code className="text-emerald-400 text-[10px]">profitableratecpmnetwork.com</code>) নতুন উইন্ডোতে ওপেন হবে এবং স্ক্রিনে ২০ সেকেন্ডের টাইমার কাউন্টডাউন চলবে।</li>
                        <li>২০ সেকেন্ড অতিক্রান্ত হলে ভিডিও অটো আনলক হবে এবং ইউজার সম্পূর্ণ ভিডিও দেখে টাকা ব্যালেন্সে যুক্ত করতে পারবে।</li>
                      </ol>
                    </div>

                    <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-3 border-t border-slate-800">
                      <button
                        type="button"
                        onClick={() => {
                          if (tempSettings.adControls?.directAdUrl) {
                            window.open(tempSettings.adControls.directAdUrl, '_blank');
                          }
                        }}
                        className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-amber-400 rounded-xl text-xs font-semibold flex items-center gap-1.5 cursor-pointer"
                      >
                        <ExternalLink className="w-3.5 h-3.5" /> Direct Ad লিংক টেস্ট করুন
                      </button>

                      <button
                        type="button"
                        onClick={() => handleSaveSettings()}
                        className="px-6 py-2.5 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-slate-950 font-bold rounded-xl text-xs shadow-md flex items-center gap-1.5 cursor-pointer"
                      >
                        <Check className="w-4 h-4" /> Direct Ad সেটিংস সংরক্ষণ করুন
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* ============================================================ */}
          {/* 4. WITHDRAWALS TAB */}
          {/* ============================================================ */}
          {activeTab === 'withdrawals' && (
            <div className="space-y-4">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                {/* Status Filters */}
                <div className="flex items-center gap-2 bg-slate-950 p-1 rounded-xl border border-slate-800">
                  {(['All', 'Pending', 'Approved', 'Rejected'] as const).map((filter) => (
                    <button
                      key={filter}
                      onClick={() => setTrxFilter(filter)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-medium transition cursor-pointer ${
                        trxFilter === filter
                          ? 'bg-emerald-500 text-white'
                          : 'text-slate-400 hover:text-slate-200'
                      }`}
                    >
                      {filter === 'All'
                        ? 'সকল'
                        : filter === 'Pending'
                        ? 'পেন্ডিং'
                        : filter === 'Approved'
                        ? 'অনুমোদিত'
                        : 'বাতিল'}
                    </button>
                  ))}
                </div>

                {/* Search */}
                <div className="relative w-full sm:w-64">
                  <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="নাম্বার বা ট্রানজেকশন খুঁজুন..."
                    className="w-full pl-9 pr-3 py-1.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white placeholder:text-slate-500 focus:outline-none focus:border-emerald-500"
                  />
                </div>
              </div>

              {/* Transactions Table */}
              <div className="bg-slate-950 border border-slate-800 rounded-xl overflow-x-auto">
                <table className="w-full text-left text-xs text-slate-300">
                  <thead className="bg-slate-900 border-b border-slate-800 text-slate-400 font-semibold uppercase tracking-wider">
                    <tr>
                      <th className="px-4 py-3">তারিখ ও সময়</th>
                      <th className="px-4 py-3">মাধ্যম</th>
                      <th className="px-4 py-3">একাউন্ট নাম্বার</th>
                      <th className="px-4 py-3">পরিমাণ</th>
                      <th className="px-4 py-3">TrxID</th>
                      <th className="px-4 py-3">স্ট্যাটাস</th>
                      <th className="px-4 py-3 text-right">একশন</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-850">
                    {filteredTransactions.length === 0 ? (
                      <tr>
                        <td colSpan={7} className="text-center py-8 text-slate-500">
                          কোনো উইথড্রল রেকর্ড পাওয়া যায়নি
                        </td>
                      </tr>
                    ) : (
                      filteredTransactions.map((trx) => (
                        <tr key={trx.id} className="hover:bg-slate-900/50 transition">
                          <td className="px-4 py-3 whitespace-nowrap text-slate-400">{trx.date}</td>
                          <td className="px-4 py-3 whitespace-nowrap">
                            <span
                              className={`px-2 py-0.5 rounded font-bold text-[10px] ${
                                trx.method === 'bKash'
                                  ? 'bg-pink-500/20 text-pink-400'
                                  : trx.method === 'Nagad'
                                  ? 'bg-orange-500/20 text-orange-400'
                                  : 'bg-purple-500/20 text-purple-400'
                              }`}
                            >
                              {trx.method}
                            </span>
                          </td>
                          <td className="px-4 py-3 font-mono font-medium text-slate-200">{trx.accountNumber}</td>
                          <td className="px-4 py-3 font-bold text-emerald-400 text-sm">৳{trx.amount}</td>
                          <td className="px-4 py-3 font-mono text-[11px] text-slate-400">{trx.trxId}</td>
                          <td className="px-4 py-3">
                            <span
                              className={`px-2 py-0.5 rounded-full text-[10px] font-semibold border ${
                                trx.status === 'Approved'
                                  ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30'
                                  : trx.status === 'Pending'
                                  ? 'bg-amber-500/10 text-amber-400 border-amber-500/30'
                                  : 'bg-rose-500/10 text-rose-400 border-rose-500/30'
                              }`}
                            >
                              {trx.status === 'Approved'
                                ? 'অনুমোদিত'
                                : trx.status === 'Pending'
                                ? 'পেন্ডিং'
                                : 'বাতিল'}
                            </span>
                          </td>
                          <td className="px-4 py-3 text-right whitespace-nowrap">
                            {trx.status === 'Pending' ? (
                              <div className="flex items-center justify-end gap-2">
                                <button
                                  onClick={() => onApproveTransaction(trx.id)}
                                  className="px-2.5 py-1 bg-emerald-500 hover:bg-emerald-600 text-white rounded text-[11px] font-medium transition shadow-sm cursor-pointer"
                                  title="অনুমোদন করুন"
                                >
                                  অনুমোদন
                                </button>
                                <button
                                  onClick={() => onRejectTransaction(trx.id)}
                                  className="px-2.5 py-1 bg-rose-500/20 hover:bg-rose-500/30 text-rose-300 border border-rose-500/30 rounded text-[11px] transition cursor-pointer"
                                  title="বাতিল করুন"
                                >
                                  বাতিল
                                </button>
                              </div>
                            ) : (
                              <span className="text-slate-500 text-[11px]">সম্পন্ন</span>
                            )}
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* ============================================================ */}
          {/* 5. USERS & TRAFFIC CONTROLLER TAB */}
          {/* ============================================================ */}
          {activeTab === 'users' && (
            <div className="space-y-6">
              
              {/* Traffic Management Header Card */}
              <div className="bg-slate-950 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-6">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-5">
                  <div>
                    <h3 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
                      <Users className="w-5 h-5 text-emerald-400" />
                      ট্রাফিক একাউন্ট ও লাইভ অ্যাক্টিভিটি ড্যাশবোর্ড
                    </h3>
                    <p className="text-xs text-slate-400 mt-1">
                      মোট নিবন্ধিত ট্রাফিক একাউন্ট, সক্রিয় ও ইনঅ্যাক্টিভ ব্যবহারকারীদের রিয়েল-টাইম তালিকা এবং নিয়ন্ত্রণ।
                    </p>
                  </div>

                  {/* Summary Metric Badges */}
                  <div className="flex flex-wrap items-center gap-2">
                    <div className="px-3 py-1.5 bg-slate-900 border border-slate-750 rounded-xl text-xs flex items-center gap-2">
                      <span className="text-slate-400">সর্বমোট একাউন্ট:</span>
                      <span className="font-bold text-white">{totalRegisteredTraffic} জন</span>
                    </div>
                    <div className="px-3 py-1.5 bg-emerald-950/60 border border-emerald-500/40 rounded-xl text-xs flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                      <span className="text-emerald-300">সক্রিয় ট্রাফিক:</span>
                      <span className="font-bold text-emerald-400">{activeTrafficCount} জন</span>
                    </div>
                    <div className="px-3 py-1.5 bg-slate-900 border border-slate-700 rounded-xl text-xs flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-slate-500" />
                      <span className="text-slate-400">ইনঅ্যাক্টিভ ট্রাফিক:</span>
                      <span className="font-bold text-slate-300">{inactiveTrafficCount} জন</span>
                    </div>
                  </div>
                </div>

                {/* Filter and Search Bar */}
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
                  {/* Status Filters */}
                  <div className="flex items-center gap-2 bg-slate-900 p-1 rounded-xl border border-slate-800 self-start">
                    <button
                      type="button"
                      onClick={() => setTrafficFilter('all')}
                      className={`px-3 py-1.5 rounded-lg text-xs font-bold transition cursor-pointer ${
                        trafficFilter === 'all'
                          ? 'bg-emerald-500 text-white shadow'
                          : 'text-slate-400 hover:text-white'
                      }`}
                    >
                      সব ট্রাফিক ({trafficUsers.length})
                    </button>
                    <button
                      type="button"
                      onClick={() => setTrafficFilter('active')}
                      className={`px-3 py-1.5 rounded-lg text-xs font-bold transition cursor-pointer flex items-center gap-1.5 ${
                        trafficFilter === 'active'
                          ? 'bg-emerald-600 text-white shadow'
                          : 'text-emerald-400/80 hover:text-emerald-300'
                      }`}
                    >
                      <span className="w-2 h-2 rounded-full bg-emerald-400" />
                      সক্রিয় ({trafficUsers.filter((t) => t.status === 'active').length})
                    </button>
                    <button
                      type="button"
                      onClick={() => setTrafficFilter('inactive')}
                      className={`px-3 py-1.5 rounded-lg text-xs font-bold transition cursor-pointer flex items-center gap-1.5 ${
                        trafficFilter === 'inactive'
                          ? 'bg-slate-700 text-white shadow'
                          : 'text-slate-400 hover:text-slate-200'
                      }`}
                    >
                      <span className="w-2 h-2 rounded-full bg-slate-500" />
                      ইনঅ্যাক্টিভ ({trafficUsers.filter((t) => t.status === 'inactive').length})
                    </button>
                  </div>

                  {/* Search Input */}
                  <div className="relative flex-1 max-w-xs">
                    <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      value={trafficSearch}
                      onChange={(e) => setTrafficSearch(e.target.value)}
                      placeholder="নাম, ফোন বা আইডি দিয়ে খুঁজুন..."
                      className="w-full pl-9 pr-3 py-2 bg-slate-900 border border-slate-800 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500"
                    />
                  </div>
                </div>

                {/* Traffic Accounts Table */}
                <div className="overflow-x-auto rounded-xl border border-slate-800">
                  <table className="w-full text-left text-xs text-slate-300">
                    <thead className="bg-slate-900/90 text-slate-400 uppercase text-[10px] tracking-wider border-b border-slate-800">
                      <tr>
                        <th className="px-4 py-3">ট্রাফিক একাউন্ট প্রোফাইল</th>
                        <th className="px-4 py-3">যোগদানের তারিখ</th>
                        <th className="px-4 py-3">সর্বশেষ অ্যাক্টিভিটি</th>
                        <th className="px-4 py-3 text-center">স্ট্যাটাস</th>
                        <th className="px-4 py-3 text-center">ভিডিও ওয়াচ</th>
                        <th className="px-4 py-3 text-right">ব্যালেন্স</th>
                        <th className="px-4 py-3 text-right">অ্যাকশন</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800/80 bg-slate-950/40 font-mono text-xs">
                      {filteredTrafficUsers.length === 0 ? (
                        <tr>
                          <td colSpan={7} className="px-4 py-8 text-center text-slate-500 font-sans">
                            কোনো ট্রাফিক একাউন্ট পাওয়া যায়নি।
                          </td>
                        </tr>
                      ) : (
                        filteredTrafficUsers.map((u) => (
                          <tr key={u.id} className="hover:bg-slate-900/50 transition">
                            <td className="px-4 py-3">
                              <div className="font-sans">
                                <div className="font-bold text-white flex items-center gap-1.5">
                                  <User className="w-3.5 h-3.5 text-emerald-400" />
                                  <span>{u.name}</span>
                                </div>
                                <div className="text-[11px] text-slate-400 mt-0.5">{u.phone} • {u.email}</div>
                                <div className="text-[10px] text-slate-500 font-mono">ID: {u.id} • {u.device}</div>
                              </div>
                            </td>
                            <td className="px-4 py-3 whitespace-nowrap text-slate-400 font-sans text-[11px]">
                              {u.joinedDate}
                            </td>
                            <td className="px-4 py-3 whitespace-nowrap font-sans text-[11px]">
                              <span className={u.status === 'active' ? 'text-emerald-400 font-semibold' : 'text-slate-500'}>
                                {u.lastActive}
                              </span>
                            </td>
                            <td className="px-4 py-3 text-center whitespace-nowrap font-sans">
                              <span
                                className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold border ${
                                  u.status === 'active'
                                    ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40'
                                    : 'bg-slate-800 text-slate-400 border-slate-700'
                                }`}
                              >
                                <span
                                  className={`w-1.5 h-1.5 rounded-full ${
                                    u.status === 'active' ? 'bg-emerald-400 animate-pulse' : 'bg-slate-500'
                                  }`}
                                />
                                {u.status === 'active' ? 'সক্রিয় (Active)' : 'ইনঅ্যাক্টিভ (Offline)'}
                              </span>
                            </td>
                            <td className="px-4 py-3 text-center whitespace-nowrap font-bold text-slate-200">
                              {u.watchedVideos} টি
                            </td>
                            <td className="px-4 py-3 text-right whitespace-nowrap font-bold text-emerald-400 text-sm">
                              ৳{u.balance.toFixed(2)}
                            </td>
                            <td className="px-4 py-3 text-right whitespace-nowrap font-sans">
                              <button
                                type="button"
                                onClick={() => handleToggleTrafficStatus(u.id)}
                                className={`px-2.5 py-1 rounded text-[11px] font-semibold transition cursor-pointer border ${
                                  u.status === 'active'
                                    ? 'bg-rose-500/20 hover:bg-rose-500/30 text-rose-300 border-rose-500/40'
                                    : 'bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-300 border-emerald-500/40'
                                }`}
                                title={u.status === 'active' ? 'ইনঅ্যাক্টিভ করুন' : 'সক্রিয় করুন'}
                              >
                                {u.status === 'active' ? 'ইনঅ্যাক্টিভ করুন' : 'সক্রিয় করুন'}
                              </button>
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>

                {/* Current Active Account Snapshot & Quick Controller */}
                <div className="border-t border-slate-800 pt-6 space-y-4">
                  <h4 className="text-sm font-bold text-white flex items-center gap-2">
                    <Sliders className="w-4 h-4 text-emerald-400" />
                    বর্তমান লগইন ইউজার ব্যালেন্স ও স্টেট কন্ট্রোলার
                  </h4>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    <div className="bg-slate-900 border border-slate-800 p-4 rounded-xl">
                      <span className="text-xs text-slate-400 block mb-1">ইউজার নাম ও আইডি</span>
                      <p className="text-sm font-bold text-white">{user.name}</p>
                      <span className="text-[10px] text-slate-500 font-mono">{user.id}</span>
                    </div>

                    <div className="bg-slate-900 border border-slate-800 p-4 rounded-xl">
                      <span className="text-xs text-slate-400 block mb-1">বর্তমান ওয়ালেট ব্যালেন্স</span>
                      <p className="text-xl font-bold text-emerald-400">৳{user.balance.toFixed(2)}</p>
                      <span className="text-[10px] text-slate-400">মোট কমপ্লিট টাস্ক: {user.completedTasksCount}</span>
                    </div>

                    <div className="bg-slate-900 border border-slate-800 p-4 rounded-xl">
                      <span className="text-xs text-slate-400 block mb-1">ভ্যালিড রেফারেল কাউন্ট</span>
                      <p className="text-xl font-bold text-amber-400">{user.validReferrals} জন</p>
                      <span className="text-[10px] text-slate-400">কোড: {user.referralCode}</span>
                    </div>

                    <div className="bg-slate-900 border border-slate-800 p-4 rounded-xl">
                      <span className="text-xs text-slate-400 block mb-1">টাস্ক Cooldown স্ট্যাটাস</span>
                      <p className="text-sm font-bold text-blue-400">
                        {user.cooldownUntil && user.cooldownUntil > Date.now()
                          ? 'সক্রিয় (Cooldown চলছে)'
                          : 'মুক্ত (Ready for Task)'}
                      </p>
                      <span className="text-[10px] text-slate-400">লগইন অবস্থা: {user.isLoggedIn ? 'Online' : 'Guest'}</span>
                    </div>
                  </div>

                  {/* Quick Modification Panel */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-slate-900/60 border border-slate-800/80 p-5 rounded-xl">
                    {/* Balance Adjustment */}
                    <div>
                      <h5 className="text-xs font-semibold text-emerald-400 uppercase tracking-wider mb-3 flex items-center gap-1.5">
                        <DollarSign className="w-4 h-4" /> ইউজার ব্যালেন্স ক্রেডিট / ডেবিট
                      </h5>
                      <div className="space-y-3">
                        <div className="flex gap-2">
                          <input
                            type="number"
                            value={adjustAmount}
                            onChange={(e) => setAdjustAmount(e.target.value)}
                            className="flex-1 px-3 py-2 bg-slate-950 border border-slate-700 rounded-lg text-xs text-white"
                            placeholder="পরিমাণ (যেমন ৫০ বা ২০০)"
                          />
                        </div>
                        <div className="flex gap-2">
                          <button
                            onClick={() => {
                              const val = parseFloat(adjustAmount) || 0;
                              onUpdateUser({ balance: user.balance + val });
                            }}
                            className="flex-1 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg text-xs font-medium transition cursor-pointer"
                          >
                            + ৳{adjustAmount} যোগ করুন
                          </button>
                          <button
                            onClick={() => {
                              const val = parseFloat(adjustAmount) || 0;
                              onUpdateUser({ balance: Math.max(0, user.balance - val) });
                            }}
                            className="flex-1 py-2 bg-rose-600/80 hover:bg-rose-600 text-white rounded-lg text-xs font-medium transition cursor-pointer"
                          >
                            - ৳{adjustAmount} বাদ দিন
                          </button>
                        </div>
                      </div>
                    </div>

                    {/* Referral & Cooldown adjustment */}
                    <div>
                      <h5 className="text-xs font-semibold text-amber-400 uppercase tracking-wider mb-3 flex items-center gap-1.5">
                        <Users className="w-4 h-4" /> রেফারেল ও Cooldown কন্ট্রোল
                      </h5>
                      <div className="space-y-3">
                        <div className="flex gap-2">
                          <button
                            onClick={() => {
                              onUpdateUser({
                                validReferrals: 20,
                                totalReferrals: Math.max(20, user.totalReferrals + 20),
                              });
                            }}
                            className="flex-1 py-2 bg-amber-600 hover:bg-amber-500 text-white rounded-lg text-xs font-medium transition cursor-pointer"
                          >
                            উইথড্রল আনলক করুন (২০ রেফারেল সেট)
                          </button>
                          <button
                            onClick={() => {
                              onUpdateUser({
                                cooldownUntil: null,
                              });
                            }}
                            className="flex-1 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-lg text-xs font-medium transition cursor-pointer"
                          >
                            Cooldown তাৎক্ষণিক তুলুন
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

              </div>
            </div>
          )}

          {/* ============================================================ */}
          {/* 6. PLATFORM SETTINGS TAB */}
          {/* ============================================================ */}
          {activeTab === 'settings' && (
            <form onSubmit={handleSaveSettings} className="space-y-6">
              <div className="bg-slate-950 border border-slate-800 rounded-2xl p-6 space-y-6">
                <div className="flex items-center justify-between border-b border-slate-800 pb-4">
                  <div>
                    <h3 className="text-base font-bold text-white flex items-center gap-2">
                      <Settings className="w-5 h-5 text-emerald-400" />
                      প্ল্যাটফর্ম রুলস ও পলিসি কনফিগারেশন
                    </h3>
                    <p className="text-xs text-slate-400">
                      উইথড্রল লিমিট, রেফারেল রিকোয়ারমেন্ট এবং নোটিশ ব্যানার কন্ট্রোল করুন।
                    </p>
                  </div>

                  {settingsSaved && (
                    <span className="px-3 py-1 bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 rounded-full text-xs font-semibold flex items-center gap-1">
                      <Check className="w-3.5 h-3.5" /> সেটিংস সফলভাবে আপডেট হয়েছে!
                    </span>
                  )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs">
                  {/* Min Withdraw */}
                  <div className="bg-slate-900 p-4 rounded-xl border border-slate-800">
                    <label className="block text-slate-200 font-semibold mb-1">
                      সর্বনিম্ন উত্তোলন সীমা (টাকায়)
                    </label>
                    <p className="text-[11px] text-slate-400 mb-2">
                      ব্যবহারকারী সর্বনিম্ন কত টাকা ব্যালেন্স হলে উইথড্র বাটন দেখতে পাবেন।
                    </p>
                    <input
                      type="number"
                      value={tempSettings.minWithdrawAmount}
                      onChange={(e) =>
                        setTempSettings({ ...tempSettings, minWithdrawAmount: Number(e.target.value) })
                      }
                      className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-lg text-white font-bold"
                    />
                  </div>

                  {/* Required Referrals */}
                  <div className="bg-slate-900 p-4 rounded-xl border border-slate-800">
                    <div className="flex items-center justify-between mb-1">
                      <label className="block text-slate-200 font-semibold">
                        প্রয়োজনীয় ভ্যালিড রেফারেল সংখ্যা
                      </label>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          checked={tempSettings.enforceReferralRequirement ?? false}
                          onChange={(e) =>
                            setTempSettings({ ...tempSettings, enforceReferralRequirement: e.target.checked })
                          }
                          className="sr-only peer"
                        />
                        <div className="w-8 h-4 bg-slate-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-3 after:w-3 after:transition-all peer-checked:bg-emerald-500"></div>
                        <span className="ml-2 text-[10px] text-slate-400">
                          {tempSettings.enforceReferralRequirement ? 'বাধ্যতামূলক' : 'ঐচ্ছিক/বন্ধ'}
                        </span>
                      </label>
                    </div>
                    <p className="text-[11px] text-slate-400 mb-2">
                      উইথড্র করার জন্য রেফারেল বাধ্যতামূলক করতে ডানপাশের সুইচ অন করুন।
                    </p>
                    <input
                      type="number"
                      value={tempSettings.requiredValidReferrals}
                      onChange={(e) =>
                        setTempSettings({ ...tempSettings, requiredValidReferrals: Number(e.target.value) })
                      }
                      className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-lg text-white font-bold"
                    />
                  </div>

                  {/* Cooldown Hours */}
                  <div className="bg-slate-900 p-4 rounded-xl border border-slate-800">
                    <label className="block text-slate-200 font-semibold mb-1">
                      টাস্ক Cooldown সময়কাল (ঘণ্টা)
                    </label>
                    <p className="text-[11px] text-slate-400 mb-2">
                      টাস্ক কমপ্লিট করার পর পরবর্তী টাস্ক আসার পূর্ববর্তী অপেক্ষার সময়।
                    </p>
                    <input
                      type="number"
                      value={tempSettings.cooldownHours}
                      onChange={(e) =>
                        setTempSettings({ ...tempSettings, cooldownHours: Number(e.target.value) })
                      }
                      className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-lg text-white font-bold"
                    />
                  </div>

                  {/* Telegram Channel Link */}
                  <div className="bg-slate-900 p-4 rounded-xl border border-slate-800">
                    <label className="block text-slate-200 font-semibold mb-1">
                      টেলিগ্রাম অফিশিয়াল লিংক
                    </label>
                    <p className="text-[11px] text-slate-400 mb-2">
                      সাপোর্ট ও মেম্বার কমিউনিটির জন্য টেলিগ্রাম চ্যানেল লিংক।
                    </p>
                    <input
                      type="url"
                      value={tempSettings.telegramLink}
                      onChange={(e) =>
                        setTempSettings({ ...tempSettings, telegramLink: e.target.value })
                      }
                      className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-lg text-white font-mono"
                    />
                  </div>

                  {/* Top Notice Banner */}
                  <div className="md:col-span-2 bg-slate-900 p-4 rounded-xl border border-slate-800">
                    <label className="block text-slate-200 font-semibold mb-1">
                      ওয়েবসাইটের টপ নোটিশ ব্যানার টেক্সট
                    </label>
                    <p className="text-[11px] text-slate-400 mb-2">
                      সকল ব্যবহারকারীর জন্য উপরে প্রদর্শিত নোটিশ মেসেজ।
                    </p>
                    <input
                      type="text"
                      value={tempSettings.noticeBanner}
                      onChange={(e) =>
                        setTempSettings({ ...tempSettings, noticeBanner: e.target.value })
                      }
                      className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-lg text-white"
                    />
                  </div>

                  {/* Admin Credentials Settings */}
                  <div className="md:col-span-2 bg-gradient-to-r from-slate-900 via-slate-900 to-amber-950/30 p-5 rounded-2xl border border-amber-500/30 space-y-3">
                    <div className="flex items-center gap-2 text-amber-400">
                      <Lock className="w-4 h-4" />
                      <h4 className="font-bold text-white text-xs sm:text-sm">
                        🔐 অ্যাডমিন একাউন্ট সিকিউরিটি ও ক্রেডেনশিয়াল (Admin Login Access)
                      </h4>
                    </div>
                    <p className="text-[11px] text-slate-400">
                      অ্যাডমিন প্যানেলে লগইন করার ইউজারনেম ও পাসওয়ার্ড এখান থেকে পরিবর্তন বা পরিচালনা করতে পারেন।
                    </p>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
                      <div>
                        <label className="block text-slate-300 font-semibold mb-1 text-[11px]">
                          অ্যাডমিন ইউজারনেম (Username)
                        </label>
                        <input
                          type="text"
                          value={tempSettings.adminUsername ?? 'mominul'}
                          onChange={(e) =>
                            setTempSettings({ ...tempSettings, adminUsername: e.target.value })
                          }
                          className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-lg text-white font-mono text-xs"
                          placeholder="mominul"
                        />
                      </div>

                      <div>
                        <label className="block text-slate-300 font-semibold mb-1 text-[11px]">
                          অ্যাডমিন পাসওয়ার্ড (Password)
                        </label>
                        <input
                          type="text"
                          value={tempSettings.adminPassword ?? 'Mo135Yfj'}
                          onChange={(e) =>
                            setTempSettings({ ...tempSettings, adminPassword: e.target.value })
                          }
                          className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-lg text-white font-mono text-xs"
                          placeholder="Mo135Yfj"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex justify-end pt-4 border-t border-slate-800">
                  <button
                    type="submit"
                    className="px-6 py-2.5 bg-emerald-500 hover:bg-emerald-600 text-white font-bold rounded-xl text-xs transition shadow-lg flex items-center gap-2 cursor-pointer"
                  >
                    <Check className="w-4 h-4" /> সেটিংস সংরক্ষণ করুন
                  </button>
                </div>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
