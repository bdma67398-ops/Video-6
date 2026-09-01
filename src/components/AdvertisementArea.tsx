import React, { useState } from 'react';
import { Megaphone, ExternalLink, Sparkles, X, Info, LayoutTemplate, MessageSquare, MousePointerClick } from 'lucide-react';
import { AdControlSettings, AdItem } from '../types';

interface AdvertisementAreaProps {
  enabled?: boolean;
  adControls?: AdControlSettings;
}

export const AdvertisementArea: React.FC<AdvertisementAreaProps> = ({
  enabled = true,
  adControls,
}) => {
  const [socialBarVisible, setSocialBarVisible] = useState(true);

  if (!enabled) return null;

  const nativeEnabled = adControls ? adControls.nativeBannerEnabled : true;
  const socialEnabled = adControls ? adControls.socialBarEnabled : true;
  const popunderEnabled = adControls ? adControls.popunderEnabled : true;
  const banners = adControls?.nativeBanners || [];

  const socialTitle = adControls?.socialBarTitle || 'বিশেষ অফার: নতুন মেম্বারদের জন্য এক্সক্লুসিভ রিওয়ার্ড বোনাস';
  const socialDesc = adControls?.socialBarDescription || 'আমাদের অফিশিয়াল টেলিগ্রাম ও সোশ্যাল কমিউনিটিতে জয়েন করে আপডেট থাকুন।';
  const socialBtn = adControls?.socialBarLinkText || 'বিস্তারিত দেখুন';
  const socialUrl = adControls?.socialBarLinkUrl || 'https://t.me/bd_video_earn_official';
  const socialBadge = adControls?.socialBarBadge || 'Social Bar';

  // If both native and social are disabled
  if (!nativeEnabled && !socialEnabled && !popunderEnabled) {
    return null;
  }

  return (
    <section id="advertisement-area" className="py-12 bg-slate-100/70 border-b border-slate-200 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Notice Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-slate-200 flex items-center justify-center text-slate-700 text-xs font-bold">
              <Megaphone className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm sm:text-base font-bold text-slate-800">
                Advertisement Area (অনুমোদিত বিজ্ঞাপন জোন)
              </h3>
              <span className="text-[11px] text-slate-500">
                Authorized Native Banners, Social Bar & Sponsored Promos
              </span>
            </div>
          </div>

          {/* CRITICAL COMPLIANCE NOTICE: Reward-এর সঙ্গে বিজ্ঞাপন দেখা/ক্লিক করার শর্ত থাকবে না */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-amber-50 border border-amber-300 text-amber-900 text-xs font-semibold shadow-2xs">
            <Info className="w-4 h-4 text-amber-600 shrink-0" />
            <span>Reward-এর সঙ্গে বিজ্ঞাপন দেখা/ক্লিক করার শর্ত থাকবে না।</span>
          </div>
        </div>

        {/* 1. Social Bar Placement (Floating/Inline Notification Bar) */}
        {socialEnabled && socialBarVisible && (
          <div
            id="social-bar-ad"
            className="mb-6 bg-gradient-to-r from-teal-900 via-emerald-900 to-slate-900 text-white rounded-2xl p-4 sm:p-5 shadow-sm border border-emerald-500/30 flex flex-col sm:flex-row items-center justify-between gap-4 animate-in fade-in duration-300"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-300 flex items-center justify-center shrink-0">
                <Sparkles className="w-5 h-5 animate-pulse" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="px-2 py-0.5 rounded-md bg-emerald-500/30 text-emerald-300 text-[10px] font-bold uppercase tracking-wider">
                    {socialBadge}
                  </span>
                  <span className="text-xs font-bold text-white">
                    {socialTitle}
                  </span>
                </div>
                <p className="text-xs text-slate-300 mt-0.5">
                  {socialDesc}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              <a
                href={socialUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs rounded-xl transition flex items-center gap-1.5 shadow-sm"
              >
                <span>{socialBtn}</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
              <button
                id="close-social-bar-btn"
                onClick={() => setSocialBarVisible(false)}
                className="p-2 text-slate-400 hover:text-white rounded-xl hover:bg-slate-800 transition cursor-pointer"
                title="বিজ্ঞাপন বন্ধ করুন"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* 2. Native Banner Placements */}
        {nativeEnabled && banners.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            {banners.map((ad: AdItem) => (
              <div
                key={ad.id}
                id={`native-banner-${ad.id}`}
                className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-200 shadow-2xs hover:shadow-sm transition flex flex-col sm:flex-row items-center gap-4 group"
              >
                <img
                  src={ad.imageUrl}
                  alt={ad.title}
                  className="w-full sm:w-28 h-24 sm:h-24 object-cover rounded-xl shrink-0"
                  referrerPolicy="no-referrer"
                />
                <div className="flex-1 w-full">
                  <div className="flex items-center justify-between gap-2 mb-1">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 bg-slate-100 px-2 py-0.5 rounded-md">
                      {ad.badge}
                    </span>
                    <span className="text-[11px] text-slate-400 font-medium">
                      {ad.sponsorName}
                    </span>
                  </div>
                  <h4 className="font-bold text-slate-900 text-sm group-hover:text-emerald-700 transition">
                    {ad.title}
                  </h4>
                  <p className="text-xs text-slate-500 mt-1 line-clamp-2">
                    {ad.description}
                  </p>
                  <div className="mt-3 flex items-center justify-between">
                    <span className="text-[11px] text-slate-400">স্পনসরড বিজ্ঞাপন</span>
                    <a
                      href={ad.targetUrl || '#'}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs font-bold text-emerald-700 hover:text-emerald-800 flex items-center gap-1 cursor-pointer"
                    >
                      <span>{ad.linkText || 'বিস্তারিত দেখুন'}</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* 3. Popunder / অন্যান্য অনুমোদিত placement Info Bar */}
        <div className="bg-white/80 rounded-2xl p-4 border border-slate-200 text-xs text-slate-600 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-1 rounded-md bg-slate-100 font-mono text-[11px] font-bold text-slate-700 flex items-center gap-1.5">
              <MousePointerClick className="w-3.5 h-3.5 text-emerald-600" />
              Popunder & Ad Placements
            </span>
            <span className="text-xs text-slate-500">
              {popunderEnabled
                ? `Popunder সক্রিয় আছে (টার্গেট: ${adControls?.popunderUrl || 'Default Link'})`
                : 'Popunder বর্তমানে নিষ্ক্রিয় রয়েছে'}
            </span>
          </div>
          <span className="text-[11px] text-slate-400 shrink-0">
            বিজ্ঞাপন কন্ট্রোল আইডি: #ADS-2026-ADMIN
          </span>
        </div>
      </div>
    </section>
  );
};
