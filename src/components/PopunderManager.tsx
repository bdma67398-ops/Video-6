import React, { useEffect, useRef, useState } from 'react';
import { AdControlSettings } from '../types';
import { ExternalLink, X, ShieldAlert, Sparkles } from 'lucide-react';

interface PopunderManagerProps {
  adControls: AdControlSettings;
  adsEnabled: boolean;
  onPopunderTriggered?: () => void;
}

export const PopunderManager: React.FC<PopunderManagerProps> = ({
  adControls,
  adsEnabled,
  onPopunderTriggered,
}) => {
  const [hasFired, setHasFired] = useState(false);
  const [showSimulatedBanner, setShowSimulatedBanner] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const { popunderEnabled, popunderUrl, popunderTrigger, popunderTimerSec } = adControls;

  useEffect(() => {
    if (!adsEnabled || !popunderEnabled || !popunderUrl || hasFired) return;

    const firePopunder = () => {
      if (hasFired) return;
      setHasFired(true);

      // Attempt popup/popunder
      try {
        const opened = window.open(popunderUrl, '_blank', 'noopener,noreferrer');
        if (!opened || opened.closed || typeof opened.closed === 'undefined') {
          // If popup is blocked by browser or iframe sandbox, show elegant banner fallback
          setShowSimulatedBanner(true);
        }
      } catch (e) {
        setShowSimulatedBanner(true);
      }

      if (onPopunderTriggered) {
        onPopunderTriggered();
      }
    };

    if (popunderTrigger === 'first_click') {
      const handleGlobalClick = (e: MouseEvent) => {
        // Prevent triggering when clicking close buttons or inputs if needed
        const target = e.target as HTMLElement;
        if (target && (target.closest('#admin-close-btn') || target.closest('input') || target.closest('textarea'))) {
          return;
        }
        firePopunder();
      };

      window.addEventListener('click', handleGlobalClick, { once: true });
      return () => {
        window.removeEventListener('click', handleGlobalClick);
      };
    } else if (popunderTrigger === 'timer') {
      const delayMs = (popunderTimerSec || 10) * 1000;
      timerRef.current = setTimeout(() => {
        firePopunder();
      }, delayMs);

      return () => {
        if (timerRef.current) clearTimeout(timerRef.current);
      };
    }
  }, [adsEnabled, popunderEnabled, popunderUrl, popunderTrigger, popunderTimerSec, hasFired, onPopunderTriggered]);

  if (!adsEnabled || !popunderEnabled || !showSimulatedBanner) {
    return null;
  }

  return (
    <div className="fixed bottom-4 right-4 z-40 max-w-sm animate-in slide-in-from-bottom-5 duration-300">
      <div className="bg-slate-900/95 backdrop-blur-md border border-amber-500/40 text-white p-4 rounded-2xl shadow-2xl flex items-start justify-between gap-3">
        <div className="flex items-start gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center shrink-0 mt-0.5">
            <Sparkles className="w-4 h-4" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="px-1.5 py-0.5 rounded bg-amber-500/30 text-amber-300 text-[10px] font-bold">
                Popunder Offer
              </span>
              <span className="text-xs font-bold text-slate-100">স্পেশাল প্রমোশন</span>
            </div>
            <p className="text-[11px] text-slate-300 mt-1 line-clamp-2">
              অ্যাডমিন দ্বারা নির্ধারিত স্পনসরড অফারটি ভিজিট করুন।
            </p>
            <a
              href={popunderUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-2 inline-flex items-center gap-1.5 px-3 py-1 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs rounded-lg transition"
            >
              <span>অফার পেজে যান</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </div>

        <button
          onClick={() => setShowSimulatedBanner(false)}
          className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800 transition"
          title="বন্ধ করুন"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
