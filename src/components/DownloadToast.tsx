import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';

interface DownloadToastProps {
  show: boolean;
  onClose: () => void;
  onHowToInstall: () => void;
}

export const DownloadToast: React.FC<DownloadToastProps> = ({
  show,
  onClose,
  onHowToInstall,
}) => {
  useEffect(() => {
    if (!show) return;
    const timer = setTimeout(() => {
      onClose();
    }, 6000);
    return () => clearTimeout(timer);
  }, [show, onClose]);

  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 pointer-events-none select-none max-w-[90vw]">
      <AnimatePresence>
        {show && (
          <motion.div
            initial={{ opacity: 0, y: 24, scale: 0.94 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.94 }}
            transition={{ type: 'spring', stiffness: 380, damping: 28 }}
            className="pointer-events-auto flex items-center gap-3 px-5 py-3 rounded-full bg-[#161618]/90 border border-white/15 backdrop-blur-2xl shadow-[0_16px_40px_rgba(0,0,0,0.65),inset_0_1px_1px_rgba(255,255,255,0.15)] text-white text-sm font-['Outfit']"
          >
            {/* Green download check icon */}
            <div className="w-5 h-5 rounded-full bg-[#C8DB6A]/20 text-[#C8DB6A] flex items-center justify-center shrink-0">
              <svg
                className="w-3 h-3 stroke-[2.5]"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
              </svg>
            </div>

            {/* Message */}
            <span className="font-medium text-white/95">
              Download started: <span className="font-semibold text-white">tiko.apk</span>
            </span>

            {/* Dot separator */}
            <span className="text-white/25">•</span>

            {/* Link to install steps */}
            <button
              type="button"
              onClick={onHowToInstall}
              className="text-[#C8DB6A] hover:text-[#d7e97d] font-semibold underline underline-offset-2 transition-colors cursor-pointer whitespace-nowrap"
            >
              How to install
            </button>

            {/* Close button */}
            <button
              type="button"
              onClick={onClose}
              aria-label="Close notification"
              className="ml-1 text-white/40 hover:text-white transition-colors cursor-pointer p-0.5 rounded-full"
            >
              <svg className="w-4 h-4 stroke-[2]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
