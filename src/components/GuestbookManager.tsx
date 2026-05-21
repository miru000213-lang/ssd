import { useState, useEffect, FormEvent } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { PenTool, Send, Heart, Star, Sparkles, BookOpen } from 'lucide-react';
import { GuestbookEntry, ThemeMode } from '../types';

interface GuestbookManagerProps {
  currentTheme: ThemeMode;
}

const DEFAULT_MEMORIES: GuestbookEntry[] = [
  {
    id: 'memory-1',
    author: '대전 토박이 김유민',
    content: '성심당의 부추빵은 제 어린 시절 추억 그 자체입니다. 어머니 손 잡고 대전역 천막부터 다니던 그 고소하고 담백한 온기가 30년이 지나 가정을 꾸린 지금도 여전해서 늘 감사할 따름이에요.',
    rating: 5,
    sticker: 'heart',
    date: '2026. 05. 20'
  },
  {
    id: 'memory-2',
    author: '빵지순례자 BreadLover',
    content: '대전 성심당 본점 가려고 서울에서 SRT 아침차 타고 달려왔어요! 갓 튀겨낸 튀김소보로 호호 불면서 먹는 첫 입은 세상을 다 가진 맛입니다. 왜 대전 시민분들이 자랑하는 명소인지 단번에 공감했습니다.',
    rating: 5,
    sticker: 'bread',
    date: '2026. 05. 18'
  },
  {
    id: 'memory-3',
    author: '아틀리에 탐험가',
    content: '밤 시간에 연출되는 심야 아틀리에 분위기도 멋집니다. 명란바게트에 무알콜 에일을 페어링했는데 환상적인 맛이에요. 대전의 문화 대표 브랜드로서 자부심을 느끼고 갑니다.',
    rating: 4,
    sticker: 'star',
    date: '2026. 05. 15'
  }
];

export default function GuestbookManager({ currentTheme }: GuestbookManagerProps) {
  const isHeritage = currentTheme === 'heritage';
  const [entries, setEntries] = useState<GuestbookEntry[]>([]);
  const [author, setAuthor] = useState('');
  const [content, setContent] = useState('');
  const [rating, setRating] = useState(5);
  const [sticker, setSticker] = useState<'bread' | 'heart' | 'star' | 'coffee'>('bread');

  useEffect(() => {
    const saved = localStorage.getItem('sungsimdang_guestbook');
    if (saved) {
      try {
        setEntries(JSON.parse(saved));
      } catch (e) {
        setEntries(DEFAULT_MEMORIES);
      }
    } else {
      setEntries(DEFAULT_MEMORIES);
      localStorage.setItem('sungsimdang_guestbook', JSON.stringify(DEFAULT_MEMORIES));
    }
  }, []);

  const saveEntries = (newEntries: GuestbookEntry[]) => {
    setEntries(newEntries);
    localStorage.setItem('sungsimdang_guestbook', JSON.stringify(newEntries));
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!author.trim() || !content.trim()) return;

    const newEntry: GuestbookEntry = {
      id: `memory-${Date.now()}`,
      author: author.trim(),
      content: content.trim(),
      rating,
      sticker,
      date: new Date().toLocaleDateString('ko-KR', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit'
      }).replace(/\.$/, '')
    };

    const updated = [newEntry, ...entries];
    saveEntries(updated);
    setAuthor('');
    setContent('');
    setRating(5);
    setSticker('bread');
  };

  const stickerEmoji = {
    bread: '🍞',
    heart: '❤️',
    star: '⭐',
    coffee: '☕'
  };

  const colors = {
    bg: isHeritage ? 'bg-[#f5f3ef]/50 border-[#d2c4bb]/30' : 'bg-[#1a1c1c]/90 border-[#4e4639]/40',
    titleText: isHeritage ? 'text-[#322214]' : 'text-[#e9c176]',
    bodyText: isHeritage ? 'text-[#4e453e]' : 'text-[#d1c5b4]',
    inputBg: isHeritage ? 'bg-white border-[#d2c4bb]/50 text-[#322214] focus:border-[#322214]' : 'bg-[#121414] border-[#4e4639]/60 text-[#d1c5b4] focus:border-[#e9c176]',
    cardBg: isHeritage ? 'bg-[#faf6f2]' : 'bg-[#141616]',
    submitBtn: isHeritage ? 'bg-[#322214] text-white hover:bg-[#432f1e]' : 'bg-[#e9c176] text-[#412d00] hover:bg-[#f1cd8f]',
    stickerSel: isHeritage ? 'border-[#322214]' : 'border-[#e9c176]'
  };

  return (
    <div 
      id="guestbook-container"
      className={`p-6 md:p-10 rounded-3xl border transition-all duration-700 ${colors.bg}`}
    >
      <div className="flex flex-col lg:flex-row gap-10">
        {/* Right Side / Form */}
        <div className="w-full lg:w-2/5 space-y-6">
          <div className="flex items-center gap-2">
            <BookOpen className={`w-5 h-5 ${isHeritage ? 'text-[#7c5726]' : 'text-[#e9c176]'}`} />
            <span className={`font-sans tracking-[0.2em] text-[10px] font-semibold uppercase ${colors.bodyText}`}>
              Memory Book
            </span>
          </div>

          <h3 className={`font-serif text-2xl ${colors.titleText}`}>
            진심을 나누는 방명록
          </h3>
          <p className={`text-xs -mt-3 font-sans leading-relaxed ${colors.bodyText}`}>
            성심당을 방문했던 따스하고 달콤한 순간의 추억, 혹은 갓 구워낸 빵을 마주했던 진심 어린 설렘의 기록을 남겨 보세요.
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className={`block text-xs font-semibold mb-1.5 font-sans ${colors.bodyText}`}>성함 또는 필명</label>
              <input
                type="text"
                placeholder="홍길동"
                value={author}
                onChange={e => setAuthor(e.target.value)}
                maxLength={20}
                required
                className={`w-full px-4 py-2.5 rounded-xl text-sm font-sans focus:outline-none transition-all border ${colors.inputBg}`}
              />
            </div>

            <div>
              <label className={`block text-xs font-semibold mb-1.5 font-sans ${colors.bodyText}`}>나의 성심 지수</label>
              <div className="flex gap-2">
                {[1, 2, 3, 4, 5].map(val => (
                  <button
                    key={val}
                    type="button"
                    onClick={() => setRating(val)}
                    className="p-1 focus:outline-none transition-transform hover:scale-110 active:scale-95"
                  >
                    <Heart 
                      className={`w-6 h-6 transition-colors ${
                        val <= rating 
                          ? 'fill-red-500 text-red-500' 
                          : 'text-stone-300 dark:text-stone-700'
                      }`} 
                    />
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-4 gap-2">
              {(['bread', 'heart', 'star', 'coffee'] as const).map(type => (
                <button
                  key={type}
                  type="button"
                  onClick={() => setSticker(type)}
                  className={`py-2 px-1 rounded-xl text-xs border flex flex-col items-center gap-1 transition-all ${
                    sticker === type 
                      ? `${colors.stickerSel} bg-black/5 dark:bg-white/5 font-bold` 
                      : 'border-transparent opacity-60 hover:opacity-100'
                  }`}
                >
                  <span className="text-xl">{stickerEmoji[type]}</span>
                  <span className={`text-[10px] font-sans ${colors.bodyText}`}>
                    {type === 'bread' ? '따뜻빵' : type === 'heart' ? '온정' : type === 'star' ? '축복' : '여유'}
                  </span>
                </button>
              ))}
            </div>

            <div>
              <label className={`block text-xs font-semibold mb-1.5 font-sans ${colors.bodyText}`}>남기고 싶은 추억 한 토막</label>
              <textarea
                placeholder="성심당 빵 테이스팅 혹은 대전 순례의 기분을 자유롭게 적어 주세요..."
                value={content}
                onChange={e => setContent(e.target.value)}
                maxLength={250}
                required
                rows={4}
                className={`w-full px-4 py-2.5 rounded-xl text-sm font-sans focus:outline-none resize-none transition-all border ${colors.inputBg}`}
              />
            </div>

            <button
              type="submit"
              className={`w-full py-3 rounded-full text-xs font-semibold tracking-wider flex items-center justify-center gap-2 transition-all active:scale-95 shadow-md ${colors.submitBtn}`}
            >
              <Send className="w-3.5 h-3.5" />
              <span>추억의 헌사 발행하기</span>
            </button>
          </form>
        </div>

        {/* Left Side / List */}
        <div className="w-full lg:w-3/5 h-[480px] overflow-y-auto pr-2 space-y-4">
          <AnimatePresence initial={false}>
            {entries.map((entry, idx) => (
              <motion.div
                key={entry.id}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                transition={{ duration: 0.3 }}
                className={`p-5 rounded-2xl border relative flex flex-col justify-between shadow-sm ${colors.cardBg} ${colors.bg.split(' ')[1]}`}
              >
                {/* Sticker overlay style */}
                <span className="absolute top-4 right-4 text-3xl select-none filter drop-shadow-sm rotate-6">
                  {stickerEmoji[entry.sticker]}
                </span>

                <div className="space-y-3 pb-2 pr-8">
                  <div className="flex gap-1">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Heart
                        key={i}
                        className={`w-3.5 h-3.5 ${
                          i < entry.rating 
                            ? 'fill-red-500 text-red-500' 
                            : 'text-stone-300 dark:text-stone-800'
                        }`}
                      />
                    ))}
                  </div>

                  <p className={`text-sm leading-relaxed font-sans ${colors.bodyText}`}>
                    {entry.content}
                  </p>
                </div>

                <div className="flex justify-between items-center pt-2 border-t border-black/5 dark:border-white/5">
                  <span className={`text-xs font-semibold font-serif ${colors.titleText}`}>
                    {entry.author}
                  </span>
                  <span className="text-[10px] font-mono text-stone-400">
                    {entry.date}
                  </span>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
