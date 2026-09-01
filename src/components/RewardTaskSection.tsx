import React, { useState } from 'react';
import { Play, Clock, Heart, Eye, Share2, Flame, ExternalLink, Sparkles, CheckCircle2, ShieldCheck, X, Image as ImageIcon } from 'lucide-react';
import { VideoTask } from '../types';

interface RewardTaskSectionProps {
  tasks: VideoTask[];
  onStartTask: (task: VideoTask) => void;
  onInstantEarn?: () => void;
  cooldownUntil?: number | null;
  onSetCooldown?: (hours: number) => void;
  onClearCooldown?: () => void;
}

export const RewardTaskSection: React.FC<RewardTaskSectionProps> = ({
  tasks,
  onStartTask,
  onInstantEarn,
}) => {
  // Local state for interactive likes
  const [likedMap, setLikedMap] = useState<Record<string, boolean>>({});
  const [likesCountMap, setLikesCountMap] = useState<Record<string, number>>({});
  const [copiedTaskId, setCopiedTaskId] = useState<string | null>(null);

  // More Videos Ad Modal State
  const [isMoreVideosModalOpen, setIsMoreVideosModalOpen] = useState<boolean>(false);
  const [adTimerRunning, setAdTimerRunning] = useState<boolean>(false);
  const [adTimeLeft, setAdTimeLeft] = useState<number>(20);
  const [adFinished, setAdFinished] = useState<boolean>(false);

  const directAdUrl = 'https://www.profitableratecpmnetwork.com/shs3z39g3?key=9903a3623487949a2b994ecd28805c9c';
  const telegramChannelUrl = 'https://t.me/+6WMf5P3PMaowZjk1';

  // Toggle Like
  const handleToggleLike = (e: React.MouseEvent, taskId: string, initialLikes: number = 1000) => {
    e.stopPropagation();
    const isLiked = likedMap[taskId] || false;
    const currentLikes = likesCountMap[taskId] ?? initialLikes;

    setLikedMap((prev) => ({ ...prev, [taskId]: !isLiked }));
    setLikesCountMap((prev) => ({
      ...prev,
      [taskId]: isLiked ? currentLikes - 1 : currentLikes + 1,
    }));
  };

  // Share action
  const handleShare = (e: React.MouseEvent, task: VideoTask) => {
    e.stopPropagation();
    if (navigator.clipboard) {
      navigator.clipboard.writeText(`${window.location.origin}/#video-${task.id}`);
      setCopiedTaskId(task.id);
      setTimeout(() => setCopiedTaskId(null), 2000);
    }
  };

  // Open "Watch More Videos" popup
  const handleOpenMoreVideosModal = () => {
    setIsMoreVideosModalOpen(true);
    setAdTimerRunning(false);
    setAdTimeLeft(20);
    setAdFinished(false);
  };

  // Start Ad Visit for More Videos
  const handleStartAdVisit = () => {
    try {
      window.open(directAdUrl, '_blank', 'noopener,noreferrer');
    } catch (e) {}
    setAdTimerRunning(true);
    setAdTimeLeft(20);
  };

  // Ad 20s Countdown effect
  React.useEffect(() => {
    let timer: NodeJS.Timeout;
    if (adTimerRunning && adTimeLeft > 0) {
      timer = setInterval(() => {
        setAdTimeLeft((prev) => {
          if (prev <= 1) {
            clearInterval(timer);
            setAdTimerRunning(false);
            setAdFinished(true);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [adTimerRunning, adTimeLeft]);

  return (
    <section id="videos" className="py-10 sm:py-14 bg-slate-50 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-extrabold mb-2 border border-emerald-200 shadow-2xs">
              <ImageIcon className="w-4 h-4 text-emerald-600 animate-pulse" />
              <span>ইমেজ গ্যালারি ও রিওয়ার্ড ভিডিও টাস্ক</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              আজকের ট্রেন্ডিং ইমেজ ও ভাইরাল ভিডিও
            </h2>
            <p className="text-sm text-slate-600 mt-1 max-w-2xl">
              যেকোনো ছবিতে ক্লিক করুন, ৩০ সেকেন্ড বিজ্ঞাপন দেখে ফুল ভিডিও আনলক করুন এবং নিশ্চিত ক্যাশ রিওয়ার্ড আয় করুন।
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="px-3 py-1 rounded-xl bg-white border border-slate-200 text-xs font-semibold text-slate-700 shadow-2xs flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
              সক্রিয় টাস্ক ({tasks.length}টি)
            </span>
          </div>
        </div>

        {/* 6 Viral Videos Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {tasks.slice(0, 6).map((task) => {
            const isLiked = likedMap[task.id] || false;
            const currentLikes = likesCountMap[task.id] ?? (task.likesCount || 1520);
            const displayViews = (task.viewsCount ? (task.viewsCount > 1000 ? `${(task.viewsCount / 1000).toFixed(1)}k` : task.viewsCount) : '45.2k');
            const displayLikes = currentLikes > 1000 ? `${(currentLikes / 1000).toFixed(1)}k` : currentLikes;
            const isImageTask = task.mediaType === 'image' || (!task.videoUrl && !!task.imageUrl);
            const cardThumbnail = task.imageUrl || task.thumbnail;

            return (
              <div
                key={task.id}
                id={`task-card-${task.id}`}
                onClick={() => onStartTask(task)}
                className={`bg-white rounded-2xl overflow-hidden border shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col group cursor-pointer ${
                  isImageTask ? 'border-slate-200 hover:border-emerald-300' : 'border-slate-200 hover:border-rose-300'
                }`}
              >
                {/* Media Thumbnail with Badges */}
                <div className="relative aspect-video bg-slate-900 overflow-hidden">
                  <img
                    src={cardThumbnail}
                    alt={task.banglaTitle}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                  {/* Category / Type Pill */}
                  <span className="absolute top-3 left-3 px-2.5 py-1 rounded-lg bg-black/70 backdrop-blur-md text-white text-[11px] font-bold border border-white/15 flex items-center gap-1">
                    {isImageTask ? <ImageIcon className="w-3 h-3 text-emerald-400" /> : <Flame className="w-3 h-3 text-rose-400" />}
                    <span>{isImageTask ? 'ইমেজ টাস্ক' : (task.category || 'ভাইরাল')}</span>
                  </span>

                  {/* Duration Badge top right */}
                  <div className="absolute top-3 right-3 flex items-center gap-1 px-2.5 py-1 rounded-lg bg-black/70 backdrop-blur-md text-slate-200 text-xs font-semibold border border-white/10">
                    <Clock className="w-3.5 h-3.5 text-rose-400" />
                    <span>{task.durationSec}s</span>
                  </div>

                  {/* Center Big Action Button Overlay */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-90 group-hover:opacity-100 transition">
                    <div className={`w-14 h-14 rounded-full text-white flex items-center justify-center shadow-2xl group-hover:scale-110 transition-all duration-300 ${
                      isImageTask ? 'bg-emerald-600 group-hover:bg-emerald-500' : 'bg-rose-600 group-hover:bg-rose-500'
                    }`}>
                      {isImageTask ? (
                        <ImageIcon className="w-6 h-6" />
                      ) : (
                        <Play className="w-6 h-6 fill-current ml-0.5" />
                      )}
                    </div>
                  </div>

                  {/* Views & Category on Thumbnail Bottom */}
                  <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-white text-xs">
                    <div className="flex items-center gap-1.5 bg-black/60 backdrop-blur-md px-2.5 py-0.5 rounded-md text-[11px] font-medium">
                      <Eye className="w-3.5 h-3.5 text-rose-400" />
                      <span>{displayViews} ভিউজ</span>
                    </div>
                    <div className="flex items-center gap-1">
                      {task.aspectRatio === '9:16' && (
                        <span className="bg-emerald-950/90 text-emerald-300 text-[10px] font-bold px-1.5 py-0.5 rounded border border-emerald-500/40">
                          📱 ৯:১৬
                        </span>
                      )}
                      <span className={`text-white text-[10px] font-bold px-2 py-0.5 rounded ${
                        isImageTask ? 'bg-emerald-600/90' : 'bg-rose-500/90'
                      }`}>
                        {isImageTask ? 'HD ফটো' : 'HD 1080p'}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Task Details & Interaction Area */}
                <div className="p-5 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className={`font-bold text-slate-900 text-base leading-snug transition line-clamp-2 ${
                      isImageTask ? 'group-hover:text-emerald-600' : 'group-hover:text-rose-600'
                    }`}>
                      {task.banglaTitle}
                    </h3>
                  </div>

                  {/* Like, Views & Watch Action Footer */}
                  <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between gap-2">
                    {/* Like & Share Action Buttons */}
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        id={`like-btn-${task.id}`}
                        onClick={(e) => handleToggleLike(e, task.id, task.likesCount || 1520)}
                        className={`flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-semibold transition cursor-pointer ${
                          isLiked
                            ? 'bg-rose-50 text-rose-600 border border-rose-200 shadow-2xs'
                            : 'bg-slate-100 text-slate-600 hover:bg-rose-50 hover:text-rose-600'
                        }`}
                        title="লাইক দিন"
                      >
                        <Heart className={`w-3.5 h-3.5 ${isLiked ? 'fill-rose-600 text-rose-600' : 'text-slate-500'}`} />
                        <span>{displayLikes}</span>
                      </button>

                      <button
                        type="button"
                        id={`share-btn-${task.id}`}
                        onClick={(e) => handleShare(e, task)}
                        className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-semibold bg-slate-100 text-slate-600 hover:bg-slate-200 transition cursor-pointer"
                        title="লিংক কপি ও শেয়ার করুন"
                      >
                        <Share2 className="w-3.5 h-3.5 text-slate-500" />
                        <span>{copiedTaskId === task.id ? 'কপি হয়েছে!' : 'শেয়ার'}</span>
                      </button>
                    </div>

                    {/* View / Watch Button */}
                    <button
                      id={`start-task-btn-${task.id}`}
                      onClick={(e) => {
                        e.stopPropagation();
                        onStartTask(task);
                      }}
                      className={`px-4 py-2 text-white font-bold text-xs rounded-xl shadow-sm hover:shadow-md transition flex items-center gap-1.5 cursor-pointer ${
                        isImageTask
                          ? 'bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700'
                          : 'bg-gradient-to-r from-rose-600 to-red-600 hover:from-rose-700 hover:to-red-700'
                      }`}
                    >
                      {isImageTask ? (
                        <>
                          <ImageIcon className="w-3.5 h-3.5" />
                          <span>ছবি দেখুন</span>
                        </>
                      ) : (
                        <>
                          <Play className="w-3.5 h-3.5 fill-current" />
                          <span>ভিডিও দেখুন</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* PROMINENT "ক্লিক করে ইনস্ট্যান্ট টাকা আয় শুরু করুন" SECTION DIRECTLY UNDER THE VIDEOS */}
        <div className="mt-8 mb-4 max-w-4xl mx-auto">
          <div className="p-6 sm:p-7 bg-gradient-to-r from-amber-500 via-rose-600 to-emerald-600 rounded-3xl shadow-xl border-2 border-yellow-300 text-white relative overflow-hidden transform transition duration-300 hover:shadow-2xl">
            <div className="absolute top-0 right-0 -mt-6 -mr-6 w-36 h-36 bg-white/20 rounded-full blur-2xl pointer-events-none" />
            <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-5">
              <div className="text-left space-y-1.5 flex-1">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/30 border border-yellow-300/60 text-yellow-300 text-xs font-black uppercase tracking-wider">
                  <Sparkles className="w-3.5 h-3.5 text-yellow-300 animate-bounce" />
                  <span>🔥 স্পেশাল ইনস্ট্যান্ট ক্যাশ অফার</span>
                </div>
                <h3 className="text-xl sm:text-2xl font-black text-white leading-tight">
                  ক্লিক করে ইনস্ট্যান্ট টাকা আয় শুরু করুন
                </h3>
                <p className="text-xs sm:text-sm text-yellow-100 font-medium leading-relaxed">
                  ভিডিও দেখার পাশাপাশি নিচে ক্লিক করুন এবং প্রতি ক্লিকে সাথে সাথে নিশ্চিত স্পনসর রিওয়ার্ড ও ইনস্ট্যান্ট বোনাস ব্যালেন্স পান!
                </p>
                <div className="flex flex-wrap items-center gap-3 pt-1 text-[11px] font-bold text-white/95">
                  <span className="flex items-center gap-1 bg-white/20 px-2 py-0.5 rounded-md">✓ কোনো লগইন দরকার নেই</span>
                  <span className="flex items-center gap-1 bg-white/20 px-2 py-0.5 rounded-md">✓ আনলিমিটেড ক্লিক</span>
                  <span className="flex items-center gap-1 bg-white/20 px-2 py-0.5 rounded-md">✓ বিকাশ/নগদে ক্যাশআউট</span>
                </div>
              </div>

              <button
                id="instant-money-earn-btn-main"
                onClick={() => onInstantEarn ? onInstantEarn() : window.open(directAdUrl, '_blank')}
                className="w-full md:w-auto px-8 py-4 bg-yellow-400 hover:bg-yellow-300 text-slate-950 font-black text-base sm:text-lg rounded-2xl shadow-xl shadow-yellow-950/30 hover:scale-105 active:scale-95 transition transform flex items-center justify-center gap-3 cursor-pointer shrink-0 border-2 border-white animate-pulse"
              >
                <Flame className="w-6 h-6 text-rose-600 fill-rose-600" />
                <span>ক্লিক করে ইনস্ট্যান্ট টাকা আয় শুরু করুন</span>
              </button>
            </div>
          </div>
        </div>

        {/* Big "Watch More Videos" Button Under the 6 Videos */}
        <div className="mt-10 text-center">
          <div className="p-6 sm:p-8 bg-gradient-to-br from-slate-900 via-rose-950 to-slate-900 rounded-3xl border border-rose-500/30 shadow-xl max-w-3xl mx-auto text-white relative overflow-hidden">
            <div className="absolute -right-10 -bottom-10 w-40 h-40 bg-rose-500/10 rounded-full blur-3xl" />
            <div className="relative z-10 flex flex-col sm:flex-row items-center justify-between gap-5">
              <div className="text-left">
                <div className="flex items-center gap-2 mb-2">
                  <span className="px-2.5 py-0.5 rounded-full bg-rose-500/20 text-rose-300 border border-rose-500/30 text-[11px] font-bold">
                    🚀 এক্সক্লুসিভ টেলিগ্রাম কালেকশন
                  </span>
                  <span className="text-xs text-amber-300 font-semibold">হট ভাইরাল ভিডিও</span>
                </div>
                <h3 className="text-lg sm:text-xl font-black text-white">
                  আরও ১,০০০+ আনলিমিটেড ভাইরাল ভিডিও দেখতে চান?
                </h3>
                <p className="text-xs text-slate-300 mt-1">
                  দৈনিক নতুন নতুন সুপার ট্রেন্ডিং ভিডিও পেতে আমাদের প্রাইভেট ভাইরাল গ্রুপে যুক্ত হোন।
                </p>
              </div>

              <button
                id="watch-more-videos-btn"
                onClick={handleOpenMoreVideosModal}
                className="w-full sm:w-auto px-7 py-3.5 bg-gradient-to-r from-rose-500 via-red-500 to-pink-500 hover:from-rose-600 hover:to-red-600 text-white font-black text-sm sm:text-base rounded-2xl shadow-lg shadow-rose-500/30 hover:scale-105 active:scale-95 transition transform flex items-center justify-center gap-2.5 cursor-pointer shrink-0"
              >
                <Sparkles className="w-5 h-5 text-yellow-300 animate-spin" style={{ animationDuration: '3s' }} />
                <span>আরও ভিডিও দেখুন</span>
              </button>
            </div>
          </div>
        </div>

      </div>

      {/* POPUP MODAL FOR "WATCH MORE VIDEOS" WITH AD SETUP & TELEGRAM REDIRECT */}
      {isMoreVideosModalOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/85 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in duration-200">
          <div className="bg-slate-900 border border-rose-500/40 rounded-3xl w-full max-w-lg shadow-2xl overflow-hidden text-white relative flex flex-col">
            
            {/* Modal Header */}
            <div className="bg-slate-950 px-6 py-4 border-b border-slate-800 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-rose-500/20 text-rose-400 border border-rose-500/30 flex items-center justify-center font-black text-sm">
                  🔥
                </div>
                <div>
                  <h3 className="font-bold text-white text-base">আরও ভাইরাল ভিডিও দেখুন</h3>
                  <p className="text-[11px] text-slate-400">টেলিগ্রাম প্রাইভেট ভাইরাল চ্যানেল আনলকার</p>
                </div>
              </div>
              <button
                id="close-more-videos-modal-btn"
                onClick={() => setIsMoreVideosModalOpen(false)}
                className="p-1.5 text-slate-400 hover:text-white rounded-xl hover:bg-slate-800 transition cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 space-y-5">
              {!adFinished ? (
                <div className="space-y-4 text-center">
                  <div className="w-16 h-16 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-amber-400 flex items-center justify-center mx-auto shadow-lg">
                    <Flame className="w-8 h-8 text-amber-400 animate-pulse" />
                  </div>

                  <div>
                    <h4 className="text-base sm:text-lg font-black text-amber-300">
                      স্পনসর বিজ্ঞাপনটি ২০ সেকেন্ড ভিজিট করুন
                    </h4>
                    <p className="text-xs text-slate-300 mt-2 leading-relaxed max-w-sm mx-auto">
                      আরও আনলিমিটেড ভাইরাল ভিডিও এক্সেস করতে নিচের বোতামে ট্যাপ করে স্পনসর পেজটি ২০ সেকেন্ড ওপেন রাখুন।
                    </p>
                  </div>

                  {!adTimerRunning ? (
                    <button
                      id="start-ad-visit-btn"
                      onClick={handleStartAdVisit}
                      className="w-full py-4 px-6 bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 hover:from-amber-600 hover:to-orange-600 text-slate-950 font-black text-sm sm:text-base rounded-2xl shadow-xl shadow-amber-500/25 flex items-center justify-center gap-2.5 cursor-pointer transition transform hover:scale-[1.02] active:scale-[0.98]"
                    >
                      <ExternalLink className="w-5 h-5" />
                      <span>বিজ্ঞাপন দেখুন ও ২০ সেকেন্ড অপেক্ষা করুন</span>
                    </button>
                  ) : (
                    <div className="space-y-3 bg-slate-950 p-4 rounded-2xl border border-slate-800">
                      <div className="flex items-center justify-between text-xs font-bold">
                        <span className="text-amber-400 flex items-center gap-1.5">
                          <Clock className="w-4 h-4 animate-spin text-amber-400" />
                          বিজ্ঞাপন ভেরিফিকেশন চলছে...
                        </span>
                        <span className="text-emerald-400 font-mono text-base font-black bg-emerald-950/80 px-2.5 py-0.5 rounded-lg border border-emerald-500/40">
                          {adTimeLeft}s বাকি
                        </span>
                      </div>

                      {/* Progress Bar */}
                      <div className="w-full h-3 bg-slate-800 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-amber-500 to-emerald-400 transition-all duration-1000 ease-linear rounded-full"
                          style={{ width: `${((20 - adTimeLeft) / 20) * 100}%` }}
                        />
                      </div>

                      <p className="text-[11px] text-amber-300 font-medium">
                        বিজ্ঞাপন সাইটটি ওপেন রাখুন, সময় শেষ হলে সরাসরি ভিডিও চ্যানেল ওপেন হবে।
                      </p>
                    </div>
                  )}

                  <div className="pt-2 text-[10px] text-slate-500 flex items-center justify-center gap-1">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                    <span>ভেরিফাইড স্পনসর নেটওয়ার্ক</span>
                  </div>
                </div>
              ) : (
                /* Step 2: Ad Completed -> Watch More Videos Button linking to Telegram */
                <div className="space-y-5 text-center animate-in zoom-in-95">
                  <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 flex items-center justify-center mx-auto shadow-lg">
                    <CheckCircle2 className="w-9 h-9" />
                  </div>

                  <div>
                    <h4 className="text-lg font-black text-emerald-300">
                      বিজ্ঞাপন দেখা সফল হয়েছে!
                    </h4>
                    <p className="text-xs text-slate-300 mt-1">
                      এখন নিচের বোতামে ক্লিক করে আমাদের টেলিগ্রাম চ্যানেলে আরও সব ভাইরাল ভিডিও দেখুন।
                    </p>
                  </div>

                  <a
                    id="watch-more-videos-telegram-link"
                    href={telegramChannelUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => setIsMoreVideosModalOpen(false)}
                    className="w-full py-4 px-6 bg-gradient-to-r from-emerald-500 via-teal-500 to-emerald-600 hover:from-emerald-400 hover:to-teal-400 text-slate-950 font-black text-base rounded-2xl shadow-xl shadow-emerald-500/30 flex items-center justify-center gap-2.5 cursor-pointer transition transform hover:scale-[1.02] block text-center"
                  >
                    <Play className="w-5 h-5 fill-current" />
                    <span>এখন ভিডিও দেখুন আরও (টেলিগ্রাম চ্যানেল)</span>
                  </a>
                </div>
              )}
            </div>

          </div>
        </div>
      )}

    </section>
  );
};
