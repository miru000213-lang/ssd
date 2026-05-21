import { motion } from 'motion/react';
import { Sparkles, Utensils, Moon } from 'lucide-react';
import { ThemeMode } from '../types';

interface ThemeSelectorProps {
  currentTheme: ThemeMode;
  onThemeChange: (theme: ThemeMode) => void;
}

export default function ThemeSelector({ currentTheme, onThemeChange }: ThemeSelectorProps) {
  return (
    <div className="flex justify-center items-center py-2 px-1">
      <div 
        id="theme-selector-container"
        className={`relative flex p-1.5 rounded-full border transition-all duration-500 shadow-lg ${
          currentTheme === 'heritage'
            ? 'bg-[#efeeea] border-[#d2c4bb]/60 shadow-amber-900/5'
            : 'bg-[#1e2020] border-[#4e4639]/40 shadow-black/80'
        }`}
      >
        {/* Animated Background Selector */}
        <motion.div
          layoutId="activeThemeBg"
          className={`absolute top-1.5 bottom-1.5 rounded-full ${
            currentTheme === 'heritage'
              ? 'bg-[#322214]'
              : 'bg-[#e9c176]'
          }`}
          style={{
            left: currentTheme === 'heritage' ? '6px' : 'calc(50% + 1px)',
            width: 'calc(50% - 7px)'
          }}
          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
        />

        {/* Heritage Hearth Switch */}
        <button
          id="theme-btn-heritage"
          onClick={() => onThemeChange('heritage')}
          className={`relative z-10 flex items-center gap-2 px-5 py-2 rounded-full font-sans text-xs font-semibold tracking-wider transition-all duration-300 select-none ${
            currentTheme === 'heritage'
              ? 'text-[#fbf9f5]'
              : 'text-[#4e453e] hover:text-[#322214]'
          }`}
        >
          <Utensils className={`w-3.5 h-3.5 transition-transform duration-500 ${currentTheme === 'heritage' ? 'rotate-12 scale-110' : ''}`} />
          <span>온기 (Heritage)</span>
        </button>

        {/* Artisan Noir Switch */}
        <button
          id="theme-btn-atelier"
          onClick={() => onThemeChange('atelier')}
          className={`relative z-10 flex items-center gap-2 px-5 py-2 rounded-full font-sans text-xs font-semibold tracking-wider transition-all duration-300 select-none ${
            currentTheme === 'atelier'
              ? 'text-[#412d00]'
              : 'text-[#9a8f80] hover:text-[#e2e2e2]'
          }`}
        >
          <Moon className={`w-3.5 h-3.5 transition-all duration-500 ${currentTheme === 'atelier' ? '-rotate-12 scale-110' : ''}`} />
          <span>심야 (Atelier)</span>
        </button>
      </div>
    </div>
  );
}
