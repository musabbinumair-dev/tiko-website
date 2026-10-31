import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';

interface InstallModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const InstallModal: React.FC<InstallModalProps> = ({ isOpen, onClose }) => {
  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div id="faq" className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/60 backdrop-blur-md"
            aria-hidden="true"
          />

          {/* Modal Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 16 }}
            transition={{ type: 'spring', stiffness: 350, damping: 26 }}
            className="relative w-full max-w-md bg-[#161618] border border-white/10 rounded-3xl p-6 shadow-[0_24px_50px_rgba(0,0,0,0.8),inset_0_1px_1px_rgba(255,255,255,0.15)] text-white font-['Outfit'] select-none z-10"
          >
            {/* Header */}
            <div className="flex items-center justify-between pb-4 border-b border-white/10">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-full bg-[#C8DB6A]/15 text-[#C8DB6A] flex items-center justify-center">
                  <svg className="w-4 h-4 stroke-[2.5]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                  </svg>
                </div>
                <h3 className="text-lg font-bold tracking-tight">How to install Tiko</h3>
              </div>
              <button
                type="button"
                onClick={onClose}
                aria-label="Close"
                className="text-white/40 hover:text-white transition-colors cursor-pointer p-1 rounded-full"
              >
                <svg className="w-5 h-5 stroke-[2]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Steps */}
            <div className="mt-5 space-y-4 text-sm">
              <div className="flex items-start gap-3.5">
                <div className="w-6 h-6 rounded-full bg-white/10 text-[#C8DB6A] font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
                  1
                </div>
                <div>
                  <h4 className="font-semibold text-white">Open the APK</h4>
                  <p className="text-white/70 text-xs mt-0.5 leading-relaxed">
                    Once downloaded, tap <span className="text-white font-medium">tiko.apk</span> from your browser's download prompt or notification bar.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3.5">
                <div className="w-6 h-6 rounded-full bg-white/10 text-[#C8DB6A] font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
                  2
                </div>
                <div>
                  <h4 className="font-semibold text-white">Enable unknown apps</h4>
                  <p className="text-white/70 text-xs mt-0.5 leading-relaxed">
                    If Android displays a security warning, tap <span className="text-white font-medium">Settings</span> and toggle on <span className="text-white font-medium">"Allow from this source"</span>.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3.5">
                <div className="w-6 h-6 rounded-full bg-white/10 text-[#C8DB6A] font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
                  3
                </div>
                <div>
                  <h4 className="font-semibold text-white">Tap Install</h4>
                  <p className="text-white/70 text-xs mt-0.5 leading-relaxed">
                    Tap <span className="text-white font-medium">Install</span> on the system dialog and launch Tiko once installation is complete!
                  </p>
                </div>
              </div>
            </div>

            {/* Close action */}
            <div className="mt-6 pt-4 border-t border-white/10 flex justify-end">
              <button
                type="button"
                onClick={onClose}
                className="w-full py-2.5 bg-white text-black font-semibold rounded-full hover:bg-neutral-100 transition-colors cursor-pointer text-sm"
              >
                Got it
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
