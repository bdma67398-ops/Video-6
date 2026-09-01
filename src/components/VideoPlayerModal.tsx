import React, { useState, useEffect, useRef } from 'react';
import {
  X,
  Play,
  Pause,
  CheckCircle2,
  Clock,
  Volume2,
  VolumeX,
  Radio,
  ExternalLink,
  ShieldCheck,
  Flame,
  Heart,
  Eye,
  Share2,
  Sparkles,
  RotateCcw,
  Image as ImageIcon,
  Smartphone,
  Monitor,
  Maximize2
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { VideoTask, AdControlSettings } from '../types';

interface VideoPlayerModalProps {
  task: VideoTask | null;
  adControls?: AdControlSettings;
  onClose: () => void;
  onCompleteTask?: (task: VideoTask) => void;
  onInstantEarn?: (customUrl?: string) => void;
}

// Helper to extract YouTube embed URL if applicable
function getYouTubeEmbedUrl(url: string): string | null {
  if (!url) return null;
  try {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=|shorts\/)([^#&?]*).*/;
    const match = url.match(regExp);
    if (match && match[2].length >= 11) {
      return `https://www.youtube-nocookie.com/embed/${match[2].substring(0, 11)}?autoplay=1&mute=0&controls=1&enablejsapi=1&rel=0`;
    }
  } catch (e) {}
  return null;
}

const DEFAULT_DIRECT_AD_URL = 'https://www.profitableratecpmnetwork.com/shs3z39g3?key=9903a3623487949a2b994ecd28805c9c';

export const VideoPlayerModal: React.FC<VideoPlayerModalProps> = ({
  task,
  adControls,
  onClose,
  onCompleteTask,
  onInstantEarn,
}) => {
  if (!task) return null;

  const isImageTask = task.mediaType === 'image' || (!task.videoUrl && !!task.imageUrl);
  const directAdUrl = task.adUrl || adControls?.directAdUrl || DEFAULT_DIRECT_AD_URL;
  const isDirectAdEnabled = adControls?.directAdEnabled ?? true;
  const adDurationSec = 30; // 30 seconds per user request
  const adHeadline = 'ফুল ভিডিও দেখতে হলে আপনাকে ৩০ সেকেন্ড অ্যাড দেখতে হবে';

  // For the video playback after ad unlock, ensure we have a valid video source
  const effectiveVideoUrl = task.videoUrl || 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4';
  const youtubeEmbedUrl = getYouTubeEmbedUrl(task.videoUrl);

  const [timeLeft, setTimeLeft] = useState<number>(task.durationSec);
  const [watchedSec, setWatchedSec] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(!isDirectAdEnabled);
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [isCompleted, setIsCompleted] = useState<boolean>(false);
  const [videoError, setVideoError] = useState<boolean>(false);
  
  // Aspect Ratio Mode: 9:16 (Vertical Full), 16:9 (Landscape), fit (Original uncropped)
  const [aspectRatioMode, setAspectRatioMode] = useState<'9:16' | '16:9' | 'fit'>(
    task.aspectRatio === '16:9' ? '16:9' : '9:16'
  );
  const [isFullImageZoomOpen, setIsFullImageZoomOpen] = useState<boolean>(false);

  // Like & Share inside modal
  const [isLiked, setIsLiked] = useState<boolean>(false);
  const [likesCount, setLikesCount] = useState<number>(task.likesCount || 1840);
  const [isCopied, setIsCopied] = useState<boolean>(false);

  // 30-Second Ad Requirement Popup State (Mandatory when clicking task)
  const [hasWatchedAd, setHasWatchedAd] = useState<boolean>(!isDirectAdEnabled);
  const [isAdPromptOpen, setIsAdPromptOpen] = useState<boolean>(isDirectAdEnabled);
  const [isAdTimerRunning, setIsAdTimerRunning] = useState<boolean>(false);
  const [adTimeLeft, setAdTimeLeft] = useState<number>(adDurationSec);
  const [adCompleted, setAdCompleted] = useState<boolean>(false);

  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Reset state when task changes - Always prompt 30s ad first
  useEffect(() => {
    setTimeLeft(task.durationSec);
    setWatchedSec(0);
    setIsCompleted(false);
    setIsPlaying(!isDirectAdEnabled);
    setVideoError(false);
    setIsLiked(false);
    setLikesCount(task.likesCount || 1840);
    setIsCopied(false);
    setAspectRatioMode(task.aspectRatio === '16:9' ? '16:9' : '9:16');
    setIsFullImageZoomOpen(false);

    // Reset ad state - require 30s ad first
    setHasWatchedAd(!isDirectAdEnabled);
    setIsAdPromptOpen(isDirectAdEnabled);
    setIsAdTimerRunning(false);
    setAdTimeLeft(adDurationSec);
    setAdCompleted(false);
  }, [task, adDurationSec, isDirectAdEnabled]);

  // Handle HTML5 video autoplay once ad is watched or for non-ad flow
  useEffect(() => {
    if (videoRef.current && !youtubeEmbedUrl && !isAdPromptOpen && isPlaying) {
      videoRef.current.currentTime = 0;
      videoRef.current.muted = false;
      const playPromise = videoRef.current.play();
      if (playPromise !== undefined) {
        playPromise
          .then(() => setIsPlaying(true))
          .catch(() => {
            // If sound autoplay fails, mute and play
            if (videoRef.current) {
              videoRef.current.muted = true;
              setIsMuted(true);
              videoRef.current.play().catch(() => {});
            }
            setIsPlaying(true);
          });
      }
    }
  }, [task, youtubeEmbedUrl, isAdPromptOpen, isPlaying]);

  // Dynamic Animated Motion Canvas (Guaranteed Fallback Stream)
  useEffect(() => {
    if (!videoError && !youtubeEmbedUrl) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let frame = 0;

    const render = () => {
      frame++;
      const w = (canvas.width = 640);
      const h = (canvas.height = 360);

      // Background gradient
      const grad = ctx.createLinearGradient(0, 0, w, h);
      grad.addColorStop(0, '#1e1b4b');
      grad.addColorStop(0.5, '#0f172a');
      grad.addColorStop(1, '#881337');
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, w, h);

      // Tech Grid Pattern
      ctx.strokeStyle = 'rgba(244, 63, 94, 0.12)';
      ctx.lineWidth = 1;
      const gridSize = 25;
      for (let x = 0; x < w; x += gridSize) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, h);
        ctx.stroke();
      }
      for (let y = 0; y < h; y += gridSize) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(w, y);
        ctx.stroke();
      }

      // Animated Spectrum Bars
      const bars = 24;
      const barWidth = 14;
      const spacing = 8;
      const startX = (w - (bars * (barWidth + spacing))) / 2;

      for (let i = 0; i < bars; i++) {
        const freq = Math.sin(frame * 0.08 + i * 0.4) * 0.5 + 0.5;
        const barHeight = 25 + freq * 110;
        const y = (h / 2) - (barHeight / 2) + 15;
        const x = startX + i * (barWidth + spacing);

        const barGrad = ctx.createLinearGradient(0, y, 0, y + barHeight);
        barGrad.addColorStop(0, '#fda4af');
        barGrad.addColorStop(0.5, '#f43f5e');
        barGrad.addColorStop(1, '#9f1239');

        ctx.fillStyle = barGrad;
        ctx.beginPath();
        ctx.roundRect(x, y, barWidth, barHeight, 6);
        ctx.fill();
      }

      // Top Video Title Overlay
      ctx.fillStyle = '#ffffff';
      ctx.font = 'bold 16px sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText(task.banglaTitle, w / 2, 45);

      // HD Badge
      ctx.fillStyle = '#f43f5e';
      ctx.font = 'bold 12px sans-serif';
      ctx.fillText('🔴 HD VIRAL VIDEO STREAMING', w / 2, 70);

      if (isPlaying && !isAdPromptOpen) {
        animationFrameId = requestAnimationFrame(render);
      }
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [videoError, youtubeEmbedUrl, isPlaying, isAdPromptOpen, task]);

  // Main video watch timer
  useEffect(() => {
    if (!isPlaying || isCompleted || isAdPromptOpen) return;

    const timer = setInterval(() => {
      setWatchedSec((prevWatched) => prevWatched + 1);

      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          setIsCompleted(true);
          try {
            confetti({
              particleCount: 60,
              spread: 70,
              origin: { y: 0.6 },
            });
          } catch (e) {}
          if (onCompleteTask) {
            onCompleteTask(task);
          }
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isPlaying, isCompleted, isAdPromptOpen, task, onCompleteTask]);

  // 30-Second Ad Countdown Logic
  useEffect(() => {
    if (!isAdTimerRunning || adCompleted) return;

    const adTimer = setInterval(() => {
      setAdTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(adTimer);
          setIsAdTimerRunning(false);
          setAdCompleted(true);
          try {
            confetti({
              particleCount: 70,
              spread: 80,
              origin: { y: 0.4 },
            });
          } catch (e) {}
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(adTimer);
  }, [isAdTimerRunning, adCompleted]);

  // User clicks "অ্যাড দেখুন" to open direct ad link
  const handleOpenDirectAd = () => {
    try {
      window.open(directAdUrl, '_blank', 'noopener,noreferrer');
    } catch (e) {}
    // Start 30s countdown
    setIsAdTimerRunning(true);
    setAdTimeLeft(30);
  };

  // User clicks "এখন ভিডিও দেখুন" button after 30 seconds ad completion
  const handleResumeVideoAfterAd = () => {
    setIsAdPromptOpen(false);
    setHasWatchedAd(true);
    setIsPlaying(true);
    if (videoRef.current && !youtubeEmbedUrl) {
      videoRef.current.currentTime = 0;
      const playPromise = videoRef.current.play();
      if (playPromise !== undefined) {
        playPromise.catch(() => {
          if (videoRef.current) {
            videoRef.current.muted = true;
            setIsMuted(true);
            videoRef.current.play().catch(() => {});
          }
        });
      }
    }
  };

  const togglePlay = () => {
    if (isAdPromptOpen) return;
    if (videoRef.current && !youtubeEmbedUrl && !videoError) {
      if (isPlaying) {
        videoRef.current.pause();
        setIsPlaying(false);
      } else {
        videoRef.current.play().catch(() => {});
        setIsPlaying(true);
      }
    } else {
      setIsPlaying(!isPlaying);
    }
  };

  const toggleMute = () => {
    if (videoRef.current && !youtubeEmbedUrl) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const handleToggleLike = () => {
    setIsLiked(!isLiked);
    setLikesCount((prev) => (isLiked ? prev - 1 : prev + 1));
  };

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(`${window.location.origin}/#video-${task.id}`);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    }
  };

  const handleReplay = () => {
    setTimeLeft(task.durationSec);
    setWatchedSec(0);
    setIsCompleted(false);
    setIsPlaying(true);
    if (videoRef.current) {
      videoRef.current.currentTime = 0;
      videoRef.current.play().catch(() => {});
    }
  };

  const taskMediaImage = task.imageUrl || task.thumbnail || 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&auto=format&fit=crop&q=80';
  const progressPercentage = Math.round(((task.durationSec - timeLeft) / task.durationSec) * 100);
  const adProgressPercentage = Math.round(((adDurationSec - adTimeLeft) / adDurationSec) * 100);
  const displayViews = task.viewsCount ? (task.viewsCount > 1000 ? `${(task.viewsCount / 1000).toFixed(1)}k` : task.viewsCount) : '52.4k';
  const displayLikes = likesCount > 1000 ? `${(likesCount / 1000).toFixed(1)}k` : likesCount;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/90 backdrop-blur-md animate-in fade-in duration-200">
      <div className="bg-slate-900 border border-rose-500/40 rounded-3xl w-full max-w-2xl overflow-hidden shadow-2xl relative text-white flex flex-col max-h-[95vh]">
        
        {/* Modal Top Bar */}
        <div className="px-4 sm:px-5 py-3 bg-slate-950 border-b border-slate-800 flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2 overflow-hidden min-w-0">
            {isImageTask ? (
              <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-bold border border-emerald-500/30 shrink-0">
                <ImageIcon className="w-3.5 h-3.5 text-emerald-400" />
                <span>ইমেজ টাস্ক</span>
              </div>
            ) : (
              <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-rose-500/20 text-rose-300 text-xs font-bold border border-rose-500/30 shrink-0">
                <Flame className="w-3.5 h-3.5 text-rose-400" />
                <span>ভিডিও</span>
              </div>
            )}
            <h3 className="text-xs sm:text-sm font-bold text-slate-100 truncate">
              {task.banglaTitle}
            </h3>
          </div>

          <div className="flex items-center gap-2">
            {/* 9:16 / 16:9 / Fit Size Selector Buttons */}
            <div className="flex items-center bg-slate-900 border border-slate-800 rounded-xl p-0.5 text-[11px]">
              <button
                type="button"
                onClick={() => setAspectRatioMode('9:16')}
                className={`px-2.5 py-1 rounded-lg font-bold flex items-center gap-1 transition cursor-pointer ${
                  aspectRatioMode === '9:16'
                    ? 'bg-gradient-to-r from-emerald-500 to-teal-500 text-white shadow-sm'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
                title="৯:১৬ ফুল স্ক্রিন সাইজ (Vertical Reels / Story)"
              >
                <Smartphone className="w-3 h-3" />
                <span>৯:১৬</span>
              </button>
              <button
                type="button"
                onClick={() => setAspectRatioMode('16:9')}
                className={`px-2.5 py-1 rounded-lg font-bold flex items-center gap-1 transition cursor-pointer ${
                  aspectRatioMode === '16:9'
                    ? 'bg-gradient-to-r from-emerald-500 to-teal-500 text-white shadow-sm'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
                title="১৬:৯ ওয়াইড ল্যান্ডস্কেপ (Landscape)"
              >
                <Monitor className="w-3 h-3" />
                <span>১৬:৯</span>
              </button>
              <button
                type="button"
                onClick={() => setAspectRatioMode('fit')}
                className={`px-2 py-1 rounded-lg font-bold flex items-center gap-1 transition cursor-pointer ${
                  aspectRatioMode === 'fit'
                    ? 'bg-gradient-to-r from-emerald-500 to-teal-500 text-white shadow-sm'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
                title="সম্পূর্ণ ছবি ফিট (Full Image Fit)"
              >
                <Maximize2 className="w-3 h-3" />
                <span>ফিট</span>
              </button>
            </div>

            <button
              id="close-video-modal-btn"
              onClick={onClose}
              className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition cursor-pointer shrink-0"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Media Screen Area (Image or Video) with Selected Aspect Ratio */}
        <div className="relative bg-slate-950 flex items-center justify-center overflow-hidden select-none">
          <div
            className={`relative w-full overflow-hidden flex items-center justify-center transition-all duration-300 ${
              aspectRatioMode === '9:16'
                ? 'aspect-[9/16] max-h-[58vh] sm:max-h-[64vh] max-w-[360px] mx-auto my-2 rounded-2xl border border-slate-800 shadow-2xl bg-black'
                : aspectRatioMode === 'fit'
                ? 'h-[50vh] sm:h-[58vh] w-full bg-black'
                : 'aspect-video w-full bg-black'
            }`}
          >
            {/* If task is Image Task and not in ad prompt */}
            {isImageTask ? (
              <div className="relative w-full h-full flex items-center justify-center overflow-hidden group">
                {/* Ambient Blurred Background */}
                <img
                  src={taskMediaImage}
                  alt=""
                  className="absolute inset-0 w-full h-full object-cover blur-2xl opacity-40 scale-125 pointer-events-none"
                  referrerPolicy="no-referrer"
                />

                {/* Main High-Res Image (9:16 or Fit) */}
                <img
                  src={taskMediaImage}
                  alt={task.banglaTitle}
                  onClick={() => setIsFullImageZoomOpen(true)}
                  className={`relative z-10 w-full h-full cursor-zoom-in transition-transform duration-300 ${
                    aspectRatioMode === '9:16' ? 'object-cover' : 'object-contain'
                  }`}
                  referrerPolicy="no-referrer"
                />

                {/* 9:16 Badge */}
                <div className="absolute top-3 right-3 z-20 px-2 py-0.5 rounded-lg bg-black/70 backdrop-blur-md text-[10px] text-emerald-400 font-bold border border-emerald-500/30 flex items-center gap-1">
                  <Smartphone className="w-3 h-3" />
                  <span>{aspectRatioMode === '9:16' ? '৯:১৬ সাইজ' : aspectRatioMode === '16:9' ? '১৬:৯ সাইজ' : 'ফুল ফিট'}</span>
                </div>
              </div>
            ) : youtubeEmbedUrl ? (
              /* 1. YouTube Iframe Support */
              <iframe
                src={youtubeEmbedUrl}
                title={task.banglaTitle}
                className="w-full h-full border-0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            ) : !videoError ? (
              /* 2. Direct HTML5 Video Player */
              <video
                ref={videoRef}
                src={effectiveVideoUrl}
                poster={task.imageUrl || task.thumbnail}
                autoPlay
                muted={isMuted}
                playsInline
                loop
                onError={() => {
                  setVideoError(true);
                }}
                className={`w-full h-full ${aspectRatioMode === '9:16' ? 'object-cover' : 'object-contain'}`}
              />
            ) : (
              /* 3. High Definition Canvas Stream Player */
              <div className="relative w-full h-full flex items-center justify-center">
                <canvas ref={canvasRef} className="w-full h-full object-cover" />
                <div className="absolute bottom-3 left-3 bg-black/70 backdrop-blur-md px-2.5 py-1 rounded-lg text-[10px] text-rose-400 border border-rose-500/30 flex items-center gap-1.5">
                  <Radio className="w-3 h-3 animate-pulse text-rose-400" />
                  <span>HD ফুল ভিডিও স্ট্রিম প্লেয়ার ✓</span>
                </div>
              </div>
            )}

            {/* 30-SECOND AD PREREQUISITE POPUP OVERLAY */}
            {isAdPromptOpen && (
              <div
                id="direct-ad-interstitial-overlay"
                className="absolute inset-0 z-40 bg-slate-950/95 backdrop-blur-md flex flex-col items-center justify-center p-4 text-center animate-in fade-in zoom-in-95 duration-200 overflow-y-auto"
              >
                <div className="max-w-md w-full bg-slate-900 border-2 border-rose-500/60 rounded-2xl p-4 sm:p-5 shadow-2xl flex flex-col items-center gap-3">
                  
                  {/* Header Badge */}
                  <div className="flex items-center gap-2 px-3.5 py-1 rounded-full bg-rose-500/20 border border-rose-400/50 text-rose-300 text-xs font-black animate-pulse">
                    <Flame className="w-4 h-4 text-rose-400" />
                    <span>ফুল ভিডিও / ইমেজ ভেরিফিকেশন</span>
                  </div>

                  {/* Primary Message */}
                  <div>
                    <h4 className="text-sm sm:text-base font-black text-white leading-snug">
                      {adHeadline}
                    </h4>
                    <p className="text-[11px] sm:text-xs text-slate-300 mt-1.5 leading-relaxed">
                      সম্পূর্ণ কন্টেন্ট দেখতে নিচের <span className="text-amber-300 font-bold">"অ্যাড দেখুন"</span> বোতামে ক্লিক করুন এবং ৩০ সেকেন্ড অপেক্ষা করুন। ৩০ সেকেন্ড পর <span className="text-emerald-400 font-bold">"এখন দেখুন"</span> অপশন আসবে।
                    </p>
                  </div>

                  {/* State 1: Before / During Countdown */}
                  {!adCompleted ? (
                    <div className="w-full space-y-2.5 pt-1">
                      {!isAdTimerRunning ? (
                        <div className="space-y-2">
                          <button
                            id="open-direct-ad-btn"
                            onClick={handleOpenDirectAd}
                            className="w-full py-3 px-4 bg-gradient-to-r from-rose-600 via-red-600 to-amber-600 hover:from-rose-500 hover:to-amber-500 text-white font-black text-sm rounded-xl shadow-lg shadow-rose-600/30 flex items-center justify-center gap-2 cursor-pointer transition transform hover:scale-[1.02] active:scale-[0.98]"
                          >
                            <ExternalLink className="w-4 h-4" />
                            <span>অ্যাড দেখুন (৩০ সেকেন্ড)</span>
                          </button>
                          <p className="text-[10px] text-slate-400">
                            বিজ্ঞাপন পেজটি ওপেন হওয়ার সাথে সাথেই ৩০ সেকেন্ডের কাউন্টডাউন চালু হবে।
                          </p>
                        </div>
                      ) : (
                        <div className="space-y-2 bg-slate-950 p-3.5 rounded-xl border border-slate-800">
                          <div className="flex items-center justify-between text-xs font-bold">
                            <span className="text-amber-400 flex items-center gap-1.5">
                              <Clock className="w-4 h-4 animate-spin text-amber-400" />
                              ৩০ সেকেন্ড অ্যাড চলছে...
                            </span>
                            <span className="text-emerald-400 font-mono text-sm font-black bg-emerald-950/80 px-2 py-0.5 rounded border border-emerald-500/40">
                              {adTimeLeft}s
                            </span>
                          </div>

                          {/* Ad Countdown Progress Bar */}
                          <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden">
                            <div
                              className="h-full bg-gradient-to-r from-rose-500 via-amber-400 to-emerald-400 transition-all duration-1000 ease-linear rounded-full"
                              style={{ width: `${adProgressPercentage}%` }}
                            />
                          </div>

                          <p className="text-[10px] text-amber-300/90 font-medium">
                            পেজটি ব্যাক না করে ৩০ সেকেন্ড শেষ হওয়া পর্যন্ত অপেক্ষা করুন।
                          </p>
                        </div>
                      )}
                    </div>
                  ) : (
                    /* State 2: 30 Seconds Ad Completed -> "এখন ভিডিও দেখুন" Button! */
                    <div className="w-full space-y-2.5 pt-1 animate-in zoom-in-95">
                      <div className="p-2.5 bg-emerald-950/60 border border-emerald-500/40 rounded-xl flex items-center justify-center gap-2 text-emerald-300 font-bold text-xs">
                        <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                        <span>অ্যাড দেখা সম্পন্ন! ফুল কন্টেন্ট আনলকড ✓</span>
                      </div>

                      <button
                        id="resume-video-after-ad-btn"
                        onClick={handleResumeVideoAfterAd}
                        className="w-full py-3 px-4 bg-gradient-to-r from-emerald-500 via-teal-500 to-emerald-600 hover:from-emerald-400 hover:to-teal-400 text-slate-950 font-black text-sm rounded-xl shadow-lg shadow-emerald-500/25 flex items-center justify-center gap-2 cursor-pointer transition transform hover:scale-[1.02]"
                      >
                        <Play className="w-4 h-4 fill-current" />
                        <span>{isImageTask ? 'এখন সম্পূর্ণ ছবি দেখুন' : 'এখন ভিডিও দেখুন'}</span>
                      </button>
                    </div>
                  )}

                  {/* Direct Link Information */}
                  <div className="text-[10px] text-slate-500 flex items-center gap-1">
                    <ShieldCheck className="w-3 h-3 text-emerald-400" />
                    <span>ভেরিফাইড স্পনসর নেটওয়ার্ক</span>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Floating Player Status Badge */}
          <div className="absolute top-3 left-3 z-20 flex items-center gap-2">
            <div className="px-3 py-1 rounded-full bg-slate-950/85 backdrop-blur-md border border-rose-500/50 flex items-center gap-2 text-xs font-bold shadow-lg">
              <Clock className="w-3.5 h-3.5 text-rose-400" />
              {isCompleted ? (
                <span className="text-emerald-400 font-bold">টাস্ক সম্পন্ন!</span>
              ) : (
                <span>
                  সময়: <span className="text-rose-400 text-sm font-mono">{timeLeft}s</span> / {task.durationSec}s
                </span>
              )}
            </div>

            <div className="px-2.5 py-1 rounded-full bg-black/70 backdrop-blur-md border border-white/10 text-slate-200 text-xs font-medium">
              👁️ {displayViews} ভিউজ
            </div>
          </div>

          {/* Floating Controls for Video tasks */}
          {!isImageTask && !youtubeEmbedUrl && !isAdPromptOpen && (
            <div className="absolute bottom-3 right-3 z-20 flex items-center gap-2">
              <button
                onClick={toggleMute}
                className="p-2 rounded-xl bg-slate-950/80 hover:bg-slate-900 text-white border border-slate-700 backdrop-blur-md transition cursor-pointer"
                title={isMuted ? 'আনমিউট করুন' : 'মিউট করুন'}
              >
                {isMuted ? <VolumeX className="w-4 h-4 text-amber-400" /> : <Volume2 className="w-4 h-4 text-emerald-400" />}
              </button>
              <button
                onClick={togglePlay}
                className="p-2 rounded-xl bg-slate-950/80 hover:bg-slate-900 text-white border border-slate-700 backdrop-blur-md transition cursor-pointer"
                title={isPlaying ? 'পজ করুন' : 'প্লে করুন'}
              >
                {isPlaying ? <Pause className="w-4 h-4 text-white" /> : <Play className="w-4 h-4 text-rose-400 fill-current" />}
              </button>
            </div>
          )}

          {/* Bottom Progress Line */}
          <div className="absolute bottom-0 left-0 right-0 h-1.5 bg-slate-800/80">
            <div
              className={`h-full transition-all duration-300 ${
                isImageTask
                  ? 'bg-gradient-to-r from-emerald-500 to-teal-400'
                  : 'bg-gradient-to-r from-rose-500 to-red-500'
              }`}
              style={{ width: `${progressPercentage}%` }}
            />
          </div>
        </div>

        {/* Modal Bottom Content: Like, Views, Share & Replay */}
        <div className="p-4 sm:p-5 bg-slate-900 flex flex-col gap-3.5">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <h4 className="text-sm sm:text-base font-bold text-white leading-snug">
                {task.banglaTitle}
              </h4>
              <div className="flex items-center gap-3 mt-1 text-xs text-slate-400">
                <span className="flex items-center gap-1">
                  <Eye className="w-3.5 h-3.5 text-rose-400" />
                  {displayViews} ভিউজ
                </span>
                <span>•</span>
                <span className="text-slate-300">ক্যাটাগরি: {task.category}</span>
                <span>•</span>
                <span className={isImageTask ? 'text-emerald-400 font-semibold' : 'text-rose-400 font-semibold'}>
                  {isImageTask ? 'HD ইমেজ টাস্ক' : 'HD 1080p'}
                </span>
              </div>
            </div>

            {/* Like & Share Action Buttons */}
            <div className="flex items-center gap-2 shrink-0">
              <button
                type="button"
                id="modal-like-btn"
                onClick={handleToggleLike}
                className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold transition cursor-pointer ${
                  isLiked
                    ? 'bg-rose-500 text-white shadow-md shadow-rose-500/30'
                    : 'bg-slate-800 text-slate-200 hover:bg-slate-700 border border-slate-700'
                }`}
              >
                <Heart className={`w-4 h-4 ${isLiked ? 'fill-white text-white' : 'text-rose-400'}`} />
                <span>{displayLikes} লাইক</span>
              </button>

              <button
                type="button"
                id="modal-share-btn"
                onClick={handleShare}
                className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold bg-slate-800 text-slate-200 hover:bg-slate-700 border border-slate-700 transition cursor-pointer"
              >
                <Share2 className="w-4 h-4 text-slate-400" />
                <span>{isCopied ? 'কপি হয়েছে!' : 'শেয়ার'}</span>
              </button>

              {isCompleted && (
                <button
                  type="button"
                  id="modal-replay-btn"
                  onClick={handleReplay}
                  className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold bg-emerald-600 hover:bg-emerald-500 text-white transition cursor-pointer"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>পুনরায় দেখুন</span>
                </button>
              )}
            </div>
          </div>

          {/* Instant Money Earn Button Right Below Player */}
          {adControls?.underVideoAdEnabled !== false && (
            <div className="pt-2 border-t border-slate-800">
              <button
                type="button"
                id="modal-instant-money-earn-btn"
                onClick={() => onInstantEarn ? onInstantEarn(adControls?.underVideoAdUrl || directAdUrl) : window.open(adControls?.underVideoAdUrl || directAdUrl, '_blank')}
                className="w-full py-3 px-4 bg-gradient-to-r from-amber-500 via-rose-600 to-emerald-600 hover:from-amber-600 hover:to-rose-700 text-white font-black text-xs sm:text-sm rounded-xl shadow-lg shadow-rose-950/40 hover:scale-[1.01] active:scale-98 transition transform flex items-center justify-center gap-2 cursor-pointer border border-yellow-300 animate-pulse"
              >
                <Sparkles className="w-4 h-4 text-yellow-300" />
                <span>⚡ ক্লিক করে ইনস্ট্যান্ট টাকা আয় শুরু করুন (ক্লিক বোনাস)</span>
              </button>
            </div>
          )}

          {/* Viral Notice */}
          <div className="pt-2 border-t border-slate-800 text-[11px] text-slate-400 flex items-center justify-between flex-wrap gap-2">
            <div className="flex items-center gap-1.5">
              {isImageTask ? (
                <>
                  <ImageIcon className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span>প্রতিদিন আকর্ষণীয় ও নতুন নতুন ট্রেন্ডিং ইমেজ টাস্ক আপডেট করা হয়।</span>
                </>
              ) : (
                <>
                  <Flame className="w-3.5 h-3.5 text-rose-500 shrink-0" />
                  <span>প্রতিদিন নতুন নতুন ট্রেন্ডিং ভাইরাল ভিডিও আপডেট করা হয়।</span>
                </>
              )}
            </div>
            <span className={`text-[10px] font-medium ${isImageTask ? 'text-emerald-400' : 'text-rose-400'}`}>
              {isImageTask ? '✓ ভেরিফাইড ইমেজ টাস্ক' : '✓ লাইভ ভাইরাল স্ট্রিমিং'}
            </span>
          </div>
        </div>
      </div>

      {/* FULL-IMAGE LIGHTBOX MODAL (100% UNCONSTRAINED FULL RES VIEW) */}
      {isFullImageZoomOpen && isImageTask && (
        <div
          id="full-image-lightbox-modal"
          className="fixed inset-0 z-60 bg-black/95 backdrop-blur-xl flex flex-col items-center justify-center p-3 animate-in fade-in zoom-in-95 duration-200"
          onClick={() => setIsFullImageZoomOpen(false)}
        >
          <div className="absolute top-4 right-4 z-70 flex items-center gap-3">
            <span className="px-3 py-1 bg-slate-900/90 text-emerald-300 border border-emerald-500/40 rounded-full text-xs font-bold">
              📱 ৯:১৬ অরিজিনাল ফুল স্ক্রিন ছবি
            </span>
            <button
              onClick={() => setIsFullImageZoomOpen(false)}
              className="p-2 rounded-full bg-slate-800/90 hover:bg-slate-700 text-white transition cursor-pointer"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
          <div className="relative max-h-[92vh] max-w-[95vw] overflow-hidden rounded-2xl border border-slate-700/50 shadow-2xl flex items-center justify-center">
            <img
              src={taskMediaImage}
              alt={task.banglaTitle}
              className="max-h-[90vh] w-auto object-contain rounded-xl"
              referrerPolicy="no-referrer"
            />
          </div>
        </div>
      )}
    </div>
  );
};
