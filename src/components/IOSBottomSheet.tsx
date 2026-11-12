import React from 'react';
import { X } from 'lucide-react';

interface IOSBottomSheetProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  subtitle?: string;
  children: React.ReactNode;
}

export const IOSBottomSheet: React.FC<IOSBottomSheetProps> = ({
  isOpen,
  onClose,
  title,
  subtitle,
  children,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden flex flex-col justify-end bg-black/50 backdrop-blur-xs transition-opacity duration-300">
      
      {/* Backdrop touch to dismiss */}
      <div 
        className="absolute inset-0 cursor-pointer" 
        onClick={onClose}
        aria-label="Dismiss sheet"
      />

      {/* Slide-up iOS Bottom Sheet Container */}
      <div 
        className="relative z-10 bg-white rounded-t-[32px] shadow-2xl border-t border-slate-200/80 max-h-[88vh] flex flex-col overflow-hidden animate-in slide-in-from-bottom duration-300"
        role="dialog"
      >
        {/* iOS Drag Handle */}
        <div className="pt-3 pb-1 flex justify-center cursor-pointer" onClick={onClose}>
          <div className="w-10 h-1.5 bg-slate-300 rounded-full hover:bg-slate-400 transition-colors"></div>
        </div>

        {/* Optional Sheet Navigation Header */}
        {(title || subtitle) && (
          <div className="px-5 py-3 border-b border-slate-100 flex items-center justify-between shrink-0">
            <div>
              {title && (
                <h3 className="font-display font-bold text-base text-[#0F254A] leading-tight">
                  {title}
                </h3>
              )}
              {subtitle && (
                <p className="text-xs text-slate-500 mt-0.5">
                  {subtitle}
                </p>
              )}
            </div>
            
            <button
              type="button"
              onClick={onClose}
              className="w-7 h-7 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 flex items-center justify-center transition-colors cursor-pointer"
              aria-label="Close"
            >
              <X size={16} />
            </button>
          </div>
        )}

        {/* Scrollable Sheet Body */}
        <div className="overflow-y-auto p-5 space-y-4 no-scrollbar">
          {children}
        </div>
      </div>
    </div>
  );
};
