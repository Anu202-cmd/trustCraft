import React, { useState } from 'react';
import { Smartphone, Monitor, Maximize2 } from 'lucide-react';

interface IPhoneFrameProps {
  children: React.ReactNode;
}

export const IPhoneFrame: React.FC<IPhoneFrameProps> = ({ children }) => {
  const [deviceMode, setDeviceMode] = useState<'iphone' | 'fluid'>('iphone');

  return (
    <div className="min-h-screen bg-[#070E1A] text-slate-100 flex flex-col items-center justify-start py-0 md:py-6 selection:bg-orange-500 selection:text-white">
      
      {/* Device Mode Switcher Toolbar (Hidden on small mobile screens, visible on tablet & desktop) */}
      <div className="hidden md:flex items-center justify-between w-full max-w-4xl px-4 py-2 mb-3 select-none">
        <div className="flex items-center gap-2">
          <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></div>
          <span className="text-xs font-bold text-slate-300 font-display">
            Artisan Trust · iOS HIG Mobile Experience
          </span>
        </div>

        <div className="flex items-center gap-1 bg-slate-900/90 p-1 rounded-xl border border-slate-700/60 shadow-inner">
          <button
            type="button"
            onClick={() => setDeviceMode('iphone')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer ${
              deviceMode === 'iphone'
                ? 'bg-slate-800 text-white shadow-xs border border-slate-600'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Smartphone size={14} />
            <span>iPhone 16 Pro (iOS)</span>
          </button>

          <button
            type="button"
            onClick={() => setDeviceMode('fluid')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer ${
              deviceMode === 'fluid'
                ? 'bg-slate-800 text-white shadow-xs border border-slate-600'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Monitor size={14} />
            <span>Pleine Largeur / Responsive</span>
          </button>
        </div>
      </div>

      {/* Main Container */}
      {deviceMode === 'iphone' ? (
        /* Realistic iPhone 16 Pro Chassis */
        <div className="relative w-full max-w-[430px] md:max-w-[410px] h-full md:h-[870px] bg-[#0F172A] rounded-none md:rounded-[54px] shadow-[0_25px_80px_rgba(0,0,0,0.85)] border-0 md:border-[10px] md:border-[#222834] overflow-hidden flex flex-col transition-all">
          
          {/* Glass reflection gradient highlight */}
          <div className="pointer-events-none absolute inset-0 rounded-[44px] ring-1 ring-white/10 z-50"></div>

          {/* Screen Content Wrapper */}
          <div className="w-full h-full flex flex-col bg-[#F8FAFC] text-[#0B1C30] overflow-y-auto no-scrollbar relative">
            {children}
          </div>
        </div>
      ) : (
        /* Full Screen / Responsive Fluid Canvas */
        <div className="w-full max-w-5xl bg-[#F8FAFC] text-[#0B1C30] min-h-screen md:rounded-3xl shadow-2xl overflow-hidden flex flex-col transition-all border border-slate-800">
          {children}
        </div>
      )}

    </div>
  );
};
