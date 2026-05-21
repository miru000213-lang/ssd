import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ShoppingBag, 
  MapPin, 
  ExternalLink, 
  ChevronRight, 
  MapPinHouse, 
  Clock, 
  Phone, 
  Info, 
  Heart,
  ChevronLeft,
  CalendarCheck,
  Flame,
  User,
  Coffee,
  Sparkles
} from 'lucide-react';

import { Product, CartItem, ThemeMode } from './types';
import { PRODUCTS, BOUTIQUES, STORY_TIMELINE } from './data';
import ThemeSelector from './components/ThemeSelector';
import BreadQuiz from './components/BreadQuiz';
import OrderCart from './components/OrderCart';
import GuestbookManager from './components/GuestbookManager';

export default function App() {
  const [currentTheme, setCurrentTheme] = useState<ThemeMode>('heritage');
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [selectedLocationId, setSelectedLocationId] = useState<string>('main');
  const [activeTimelineIndex, setActiveTimelineIndex] = useState(0);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const isHeritage = currentTheme === 'heritage';

  // Shopping Cart Actions
  const handleAddToCart = (product: Product) => {
    setCartItems(prev => {
      const existing = prev.find(item => item.product.id === product.id);
      if (existing) {
        return prev.map(item => 
          item.product.id === product.id 
            ? { ...item, quantity: item.quantity + 1 } 
            : item
        );
      }
      return [...prev, { product, quantity: 1 }];
    });
    // Trigger slide drawer open to give delightful visual feedback
    setIsCartOpen(true);
  };

  const handleUpdateQuantity = (productId: string, delta: number) => {
    setCartItems(prev => prev.map(item => {
      if (item.product.id === productId) {
        const nextQty = item.quantity + delta;
        return { ...item, quantity: nextQty > 0 ? nextQty : 1 };
      }
      return item;
    }));
  };

  const handleRemoveItem = (productId: string) => {
    setCartItems(prev => prev.filter(item => item.product.id !== productId));
  };

  const handleClearCart = () => {
    setCartItems([]);
  };

  const activeLocation = BOUTIQUES.find(b => b.id === selectedLocationId) || BOUTIQUES[0];

  const colors = {
    bg: isHeritage ? 'bg-[#fbf9f5]' : 'bg-[#0f1111]',
    text: isHeritage ? 'text-[#322214]' : 'text-[#fbf9f5]',
    paragraph: isHeritage ? 'text-[#5d534a]' : 'text-[#cabeae]',
    border: isHeritage ? 'border-[#d2c4bb]/30' : 'border-[#4e4639]/40',
    cardBg: isHeritage ? 'bg-white shadow-amber-900/5 hover:shadow-xl' : 'bg-[#151717] shadow-black/80 hover:shadow-2xl hover:border-[#e9c176]/30',
    headerBg: isHeritage ? 'bg-[#fbf9f5]/85 border-[#d2c4bb]/20' : 'bg-[#0f1111]/90 border-[#4e4639]/30',
    badge: isHeritage ? 'bg-[#efeeea] text-[#322214]' : 'bg-[#1d1f1f] text-[#e9c176]',
    activeTab: isHeritage ? 'bg-[#322214] text-white' : 'bg-[#e9c176] text-[#412d00]',
    inactiveTab: isHeritage ? 'bg-[#efeeea] text-[#726559]' : 'bg-[#181a1a] text-[#8e8272]',
  };

  return (
    <div id="sungsimdang-root" className={`min-h-screen transition-colors duration-700 font-sans ${colors.bg} ${colors.text} selection:bg-amber-100 selection:text-amber-900`}>
      
      {/* GLOBAL HEADER */}
      <header className={`sticky top-0 z-40 backdrop-blur-md border-b transition-all duration-500 py-4 ${colors.headerBg}`}>
        <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <span className="font-serif text-xl tracking-widest font-bold">聖心堂</span>
            <span className="px-2 py-0.5 text-[8px] tracking-[0.15em] font-sans font-bold border border-current rounded-sm">SINCE 1956</span>
          </div>

          {/* Quick links */}
          <nav className="hidden md:flex items-center gap-8 text-[11px] font-semibold tracking-[0.1em] uppercase">
            <a href="#story-section" className="hover:text-primary transition-colors">HISTORY</a>
            <a href="#menu-section" className="hover:text-primary transition-colors">COLLECTION</a>
            <a href="#map-section" className="hover:text-primary transition-colors">PILGRIMAGE MAP</a>
            <a href="#guestbook-section" className="hover:text-primary transition-colors">MEMORIES</a>
          </nav>

          <div className="flex items-center gap-4">
            {/* Theme switcher */}
            <ThemeSelector currentTheme={currentTheme} onThemeChange={setCurrentTheme} />

            {/* Shopping Cart Trigger */}
            <button
              id="cart-trigger-btn"
              onClick={() => setIsCartOpen(true)}
              className="relative p-2.5 rounded-full hover:bg-black/5 dark:hover:bg-white/5 transition-colors focus:outline-none"
            >
              <ShoppingBag className="w-5 h-5" />
              {cartItems.length > 0 && (
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute -top-1 -right-1 bg-red-500 text-white font-mono text-[9px] font-bold w-4.5 h-4.5 rounded-full flex items-center justify-center shadow-md animate-bounce"
                >
                  {cartItems.reduce((acc, curr) => acc + curr.quantity, 0)}
                </motion.span>
              )}
            </button>
          </div>
        </div>
      </header>

      {/* HERO SECTION */}
      <section id="hero-section" className="relative overflow-hidden py-16 lg:py-24 border-b border-black/5 dark:border-white/5">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          <div className="lg:col-span-5 space-y-6 lg:pr-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-current/20 text-[10px] tracking-widest uppercase font-semibold font-sans">
              <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-ping" />
              <span>대전의 자랑스러운 유산</span>
            </div>

            <AnimatePresence mode="wait">
              {isHeritage ? (
                <motion.div
                  key="heritage-title"
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: 0.5 }}
                  className="space-y-4"
                >
                  <h1 className="font-serif text-4xl sm:text-5xl font-bold leading-tight tracking-tight text-[#322214]">
                    빵 굽는 온기에<br />마음까지 따뜻해지는<br />행복한 순간
                  </h1>
                  <p className="font-sans text-sm text-[#7c6f64] leading-relaxed max-w-lg">
                    성심당은 카톨릭 정신에 기반하여 창업된 이후, 당일 판매하고 남은 모든 빵을 가난하고 소외된 한 분 한 분께 매일 밤 전액 기부하는 68년 전통의 상생을 실천해 왔습니다.
                  </p>
                </motion.div>
              ) : (
                <motion.div
                  key="atelier-title"
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: 0.5 }}
                  className="space-y-4"
                >
                  <h1 className="font-display-brand text-4xl sm:text-5xl font-bold leading-none tracking-tight text-[#e9c176] uppercase">
                    Sacrament<br />of Golden Flour
                  </h1>
                  <p className="font-sans text-sm text-[#cabeae] leading-relaxed max-w-lg">
                    Discover the midnight workshop, where meticulously nurtured sourdough meets contemporary sophistication. Experience bread crafting redefined for the modern gourmet.
                  </p>
                </motion.div>
              )}
            </AnimatePresence>

            <div className="flex flex-wrap gap-4 pt-4">
              <a
                href="#menu-section"
                className={`px-8 py-3.5 rounded-full font-sans text-xs font-semibold tracking-wider transition-all duration-300 transform active:scale-95 shadow-lg ${
                  isHeritage 
                    ? 'bg-[#322214] text-white hover:bg-[#4a392a]' 
                    : 'bg-[#e9c176] text-[#412d00] hover:bg-[#f3d395]'
                }`}
              >
                메뉴 보러가기
              </a>
              <a
                href="#story-section"
                className={`px-8 py-3.5 rounded-full font-sans text-xs font-semibold tracking-wider transition-all duration-300 transform active:scale-95 border hover:bg-black/5 dark:hover:bg-white/5 ${
                  isHeritage 
                    ? 'border-[#322214] text-[#322214]' 
                    : 'border-[#e9c176] text-[#e9c176]'
                }`}
              >
                68년 역사 한 토막
              </a>
            </div>
          </div>

          <div className="lg:col-span-7 relative">
            {/* Visual Flour/Bakery Art Showcase */}
            <div className="relative aspect-video lg:aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl border border-black/10 dark:border-white/10">
              <AnimatePresence mode="wait">
                {isHeritage ? (
                  <motion.img
                    key="heritage-hero-img"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuCxAQRERIsGQfJzlkI95_be4l3cWKGjiwswSFFJCs_gh2ECK-jiO717aSqki98zPicg9XaI4u-urKKBuXfAbrXYUmHzKAthindaTwlWg-Bi70LLiB9185_iYx-M_SpjN6YnXBPr9leD58C90dqJDL0FaIWjUHdRoeLvTmWNJE7iVEDKdMqWrmgP7reZmEJrjhLTV3kJ8YpOs4ReYUgRYBGzkpAdiJ73ulY44R-2CCPrmZXRm6V4um7nCcCoEWg7FyKy9xHi6PuoRRY"
                    alt="SungSimDang Bakers Craft"
                    referrerPolicy="no-referrer"
                    initial={{ opacity: 0, scale: 1.05 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.8 }}
                    className="w-full h-full object-cover filter brightness-[0.95]"
                  />
                ) : (
                  <motion.img
                    key="atelier-hero-img"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuC-tmR71SRJla_1K1piBPwQQNE1Ndg6K9fMZcfBRBaHzjcnqu09eCSNe0lBXgI0pXLVDHQZUQl2-5OlBRcDefXjdj-lUWI5rLNsy1RVTMLjLzxZXjCp6xbbdaGSOu4MzcZUlEOK59lqylB3BxVIpI8vfWJYRix6c4dnUhR9bkdQOWqu1oa_jBD1wYyJjiwkySJ9d0vhTCbRE2ykqfnN4eN4HJYpoit1g16xe3Dampc6QUlsg5h8uvoV4QS6QV1A9PoykMgrMmBuTpo"
                    alt="SungSimDang Sourdough Counter"
                    referrerPolicy="no-referrer"
                    initial={{ opacity: 0, scale: 1.05 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.8 }}
                    className="w-full h-full object-cover filter brightness-[0.85] contrast-[1.05]"
                  />
                )}
              </AnimatePresence>

              {/* Float statement sticker */}
              <div className={`absolute bottom-6 left-6 right-6 p-4 rounded-2xl backdrop-blur-md border ${
                isHeritage 
                  ? 'bg-white/80 border-[#d2c4bb]/30 shadow-md text-[#322214]' 
                  : 'bg-[#0f1111]/80 border-[#4e4639]/50 shadow-black/60 text-[#e9c176]'
              }`}>
                <p className="font-serif italic text-xs leading-relaxed text-center font-medium">
                  {isHeritage 
                    ? '"모든 이가 다 좋게 여기는 일을 하십시오" (롬 12:17)' 
                    : '"Every creation is a reflection of local sincerity and sacred flavor."'
                  }
                </p>
              </div>
            </div>

            {/* Accent decorative ring */}
            <div className={`absolute -top-6 -right-6 w-36 h-36 rounded-full border border-dashed opacity-25 ${
              isHeritage ? 'border-[#322214]' : 'border-[#e9c176]'
            }`} />
          </div>

        </div>
      </section>

      {/* HISTORIC LANDMARK STATS BANNER */}
      <section className="py-12 border-b border-black/5 dark:border-white/5">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 sm:grid-cols-3 gap-8 text-center">
          <div className="space-y-1.5 p-4 rounded-2xl bg-black/2.5 dark:bg-white/2.5">
            <h3 className="font-serif text-3xl font-bold tracking-tight">68주년</h3>
            <p className="text-xs text-stone-400 font-sans tracking-wide">대전 밀가루의 지속적인 역사 (Since 1956)</p>
          </div>
          <div className="space-y-1.5 p-4 rounded-2xl bg-black/2.5 dark:bg-white/2.5">
            <h3 className="font-serif text-3xl font-bold tracking-tight">100% 한결</h3>
            <p className="text-xs text-stone-400 font-sans tracking-wide">외부 도시 타지점 거절, 오롯한 대전의 브랜드</p>
          </div>
          <div className="space-y-1.5 p-4 rounded-2xl bg-black/2.5 dark:bg-white/2.5">
            <h3 className="font-serif text-3xl font-bold tracking-tight">365일 온기</h3>
            <p className="text-xs text-stone-400 font-sans tracking-wide">전쟁 대피시부터 시작된 당일 밤 무료 기부 나눔</p>
          </div>
        </div>
      </section>

      {/* INTERACTIVE HISTORY CHRONICLE */}
      <section id="story-section" className="py-20 max-w-7xl mx-auto px-6 border-b border-black/5 dark:border-white/5">
        <div className="text-center max-w-xl mx-auto mb-16 space-y-3">
          <span className="text-[10px] uppercase font-sans tracking-[0.25em] font-bold text-stone-400">HERITAGE STORY</span>
          <h2 className={`font-serif text-3xl font-bold ${isHeritage ? 'text-[#322214]' : 'text-[#e9c176]'}`}>
            따뜻한 밀가루의 여정
          </h2>
          <p className="text-xs font-sans text-stone-400 leading-relaxed">
            전쟁의 폐허 속 열차의 연기 가득 메웠던 옛 대전역의 찐빵 천막부터 시작하여, 오늘날까지 이어온 성심당의 따뜻한 발자취입니다.
          </p>
        </div>

        {/* Milestone Selector Carousel */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-stretch">
          
          {/* Milestone Select Buttons */}
          <div className="lg:col-span-5 flex flex-col gap-3 justify-center">
            {STORY_TIMELINE.map((item, idx) => (
              <button
                key={item.year}
                onClick={() => setActiveTimelineIndex(idx)}
                className={`w-full text-left p-5 rounded-2xl border transition-all duration-300 focus:outline-none flex items-center justify-between ${
                  idx === activeTimelineIndex
                    ? `${colors.activeTab} shadow-md scale-[1.02] border-transparent`
                    : `bg-transparent ${colors.border} hover:bg-black/2.5 dark:hover:bg-white/2.5 text-inherit`
                }`}
              >
                <div className="flex items-center gap-4">
                  <span className="font-serif text-lg font-bold tracking-wide">{item.year}</span>
                  <span className="font-sans text-xs font-semibold truncate max-w-[200px]">{item.title}</span>
                </div>
                <ChevronRight className="w-4 h-4 opacity-50" />
              </button>
            ))}
          </div>

          {/* Chronological Card Slide */}
          <div className="lg:col-span-7 flex">
            <div className={`p-8 md:p-10 rounded-3xl border ${colors.cardBg} w-full transition-all duration-500 flex flex-col justify-between relative overflow-hidden flex-1`}>
              
              {/* Background watermark */}
              <div className="absolute -bottom-10 -right-10 text-9xl font-serif font-black select-none text-black/5 dark:text-white/5 opacity-40">
                {STORY_TIMELINE[activeTimelineIndex].year}
              </div>

              <div className="space-y-6 relative z-10">
                <div className="flex items-center gap-2">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    isHeritage ? 'bg-[#322214]/10 text-[#322214]' : 'bg-[#e9c176]/10 text-[#e9c176]'
                  }`}>
                    <CalendarCheck className="w-4 h-4" />
                  </div>
                  <span className="font-serif text-sm font-semibold text-stone-400">밀가루의 연대표</span>
                </div>

                <div className="space-y-3">
                  <h3 className={`font-serif text-2xl font-bold ${colors.text}`}>
                    {STORY_TIMELINE[activeTimelineIndex].title}
                  </h3>
                  <p className={`font-sans text-sm leading-relaxed ${colors.paragraph} max-w-xl`}>
                    {STORY_TIMELINE[activeTimelineIndex].description}
                  </p>
                </div>
              </div>

              <div className="flex justify-between items-center pt-8 border-t border-black/5 dark:border-white/5 relative z-10 mt-10">
                <span className="font-serif text-sm tracking-wider font-semibold opacity-50">聖心堂 COMMEMORATIVE</span>
                <span className="font-mono text-xs text-stone-400">INDEX {activeTimelineIndex + 1} / {STORY_TIMELINE.length}</span>
              </div>

            </div>
          </div>

        </div>
      </section>

      {/* SIGNATURE SELECTION (PRODUCT GRID) */}
      <section id="menu-section" className="py-20 max-w-7xl mx-auto px-6 border-b border-black/5 dark:border-white/5">
        <div className="text-center max-w-xl mx-auto mb-16 space-y-3">
          <span className="text-[10px] uppercase font-sans tracking-[0.25em] font-bold text-stone-400">THE SIGNATURES</span>
          <h2 className={`font-serif text-3xl font-bold ${isHeritage ? 'text-[#322214]' : 'text-[#e9c176]'}`}>
            명품 시그니처 콜렉션
          </h2>
          <p className="text-xs font-sans text-stone-400 leading-relaxed">
            성심당 본점에서 갓 구워져 나오는 전설적인 대표 메뉴들입니다. 사진을 클릭하면 풍미와 영양 상세 정보를 보실 수 있습니다.
          </p>
        </div>

        {/* Product Grid */}
        <div id="product-grid" className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {PRODUCTS.map((prod) => (
            <div
              key={prod.id}
              className={`group rounded-2xl border overflow-hidden flex flex-col justify-between transition-all duration-500 h-full ${colors.cardBg}`}
            >
              {/* Image box */}
              <div 
                onClick={() => setSelectedProduct(prod)}
                className="aspect-square w-full overflow-hidden bg-stone-100 relative cursor-pointer border-b border-black/5 dark:border-white/5"
              >
                <img
                  src={prod.imageUrl}
                  alt={prod.name}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                
                {/* Floating badge */}
                <span className={`absolute top-4 left-4 px-3 py-1 rounded-full text-[9px] font-sans font-bold tracking-wider uppercase border ${
                  isHeritage ? prod.badgeColorLight : prod.badgeColorDark
                }`}>
                  {prod.badge}
                </span>

                {/* Click and view prompt overlay */}
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <span className="text-[11px] font-semibold text-white tracking-widest bg-black/60 px-4 py-2 rounded-full font-sans uppercase">
                    상세 풍미 보기
                  </span>
                </div>
              </div>

              {/* Product Info content */}
              <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                <div className="space-y-1">
                  <div className="flex justify-between items-baseline">
                    <h3 className="font-serif text-base font-bold truncate pr-2 group-hover:text-amber-500 transition-colors">
                      {prod.name}
                    </h3>
                    <span className="font-mono text-sm font-bold">
                      ₩{prod.price.toLocaleString()}
                    </span>
                  </div>
                  <p className="text-[10px] tracking-wider uppercase opacity-50 font-mono">
                    {prod.englishName}
                  </p>
                  <p className={`text-xs ${colors.paragraph} line-clamp-2 md:line-clamp-3 leading-relaxed pt-1`}>
                    {prod.description}
                  </p>
                </div>

                <button
                  onClick={() => handleAddToCart(prod)}
                  className={`w-full py-2.5 rounded-full font-sans text-xs font-semibold tracking-wider flex items-center justify-center gap-1.5 transition-all duration-300 transform active:scale-95 border ${
                    isHeritage 
                      ? 'bg-[#322214] text-white hover:bg-[#4a392a] border-transparent' 
                      : 'border-[#e9c176] text-[#e9c176] hover:bg-[#e9c176]/10'
                  }`}
                >
                  <ShoppingBag className="w-3.5 h-3.5" />
                  <span>주문 담기</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* BREAD SOMMELIER QUIZ SECTION */}
      <section className="py-16 max-w-4xl mx-auto px-6 border-b border-black/5 dark:border-white/5">
        <BreadQuiz currentTheme={currentTheme} onAddToCart={handleAddToCart} />
      </section>

      {/* EAST PILGRIMAGE MAP AREA */}
      <section id="map-section" className="py-20 max-w-7xl mx-auto px-6 border-b border-black/5 dark:border-white/5">
        <div className="text-center max-w-xl mx-auto mb-16 space-y-3">
          <span className="text-[10px] uppercase font-sans tracking-[0.25em] font-bold text-stone-400">PILGRIMAGE MAP</span>
          <h2 className={`font-serif text-3xl font-bold ${isHeritage ? 'text-[#322214]' : 'text-[#e9c176]'}`}>
            대전 본점 타운 순례 지도
          </h2>
          <p className="text-xs font-sans text-stone-400 leading-relaxed">
            성심당 본점이 위치한 대전 중앙광장 타운 주변의 패밀리 매장 안내입니다. 지도의 핀을 클릭해 대중교통 및 상세 주소를 쉽게 찾아가세요.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-stretch">
          
          {/* Visual Hot-linked Map Interactive */}
          <div className="lg:col-span-7 flex flex-col justify-center">
            <div className="relative rounded-3xl overflow-hidden shadow-xl border border-black/10 dark:border-white/10 aspect-video lg:aspect-[4/3] bg-stone-100 group">
              <img
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuB2HGxodj2ZRm6wqDC6JFQgJNgOpv54f7IC_Lyu9nHG4HtaMjzc-gX7-G5Lb1-Q_6egvx19BOVP2EBTXjhOvkJg3ATnUPhIKgSr6j1pbZngamCspxpRDwrd5fD147WqFflxByJ3nxOW6JFHHovB0n5XhYBdyshjZ40G8m839SWEqXSfC4Lv3Idn8THg43H7MWZTBbFD28yP5fLZPXNG83f8Y0Ly--ufkWJYTV-mqRemRxgwR9Ly1S8QbMQbGC1QdQovqpB7I9YCj34"
                alt="SungSimDang Town Pilgrimage Map"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover group-hover:scale-[1.01] transition-transform duration-700 select-none"
              />

              {/* Pin hotspots overlaying the static map image */}
              {BOUTIQUES.map((boutique) => (
                <button
                  key={boutique.id}
                  onClick={() => setSelectedLocationId(boutique.id)}
                  style={{ left: `${boutique.coordinates.x}%`, top: `${boutique.coordinates.y}%` }}
                  className={`absolute -translate-x-1/2 -translate-y-1/2 p-2 rounded-full shadow-lg transition-all duration-300 focus:outline-none flex items-center justify-center animate-pulse ${
                    selectedLocationId === boutique.id
                      ? (isHeritage ? 'bg-[#322214] text-white scale-125 z-20 shadow-amber-900/40 ring-4 ring-amber-100' : 'bg-[#e9c176] text-[#412d00] scale-125 z-20 shadow-amber-500/30 ring-4 ring-opacity-20 ring-yellow-400')
                      : 'bg-white text-stone-800 hover:scale-110 z-10'
                  }`}
                  title={boutique.name}
                >
                  <MapPin className="w-5 h-5 pointer-events-none" />
                </button>
              ))}

              {/* Watermark tooltip helpful assist */}
              <div className="absolute top-4 left-4">
                <span className="px-3 py-1 rounded-full text-[8px] font-sans font-bold bg-black/60 text-stone-200 uppercase tracking-widest backdrop-blur-sm shadow-md">
                  지도 위 핀을 눌러 상세 정보 전환
                </span>
              </div>
            </div>
          </div>

          {/* Details Card of selected Pin */}
          <div className="lg:col-span-5 flex">
            <div className={`p-8 rounded-3xl border ${colors.cardBg} w-full transition-all duration-500 flex flex-col justify-between align-stretch`}>
              
              <div className="space-y-6">
                <div className="flex justify-between items-start">
                  <div>
                    <span className="px-3 py-1 rounded-full text-[9px] font-sans font-bold bg-stone-100 dark:bg-stone-900 border border-black/5 dark:border-white/5 tracking-wider uppercase text-[#c79a54]">
                      {activeLocation.englishName}
                    </span>
                    <h3 className={`font-serif text-2xl font-bold mt-2 ${colors.text}`}>
                      {activeLocation.name}
                    </h3>
                  </div>
                </div>

                {/* Cover image of active boutique */}
                <div className="w-full h-36 rounded-2xl overflow-hidden border border-black/5 dark:border-white/5 shadow-inner">
                  <img
                    src={activeLocation.imageUrl}
                    alt={activeLocation.name}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover filter brightness-[0.95]"
                  />
                </div>

                <p className={`text-xs leading-relaxed font-sans ${colors.paragraph}`}>
                  {activeLocation.description}
                </p>

                {/* Directory items */}
                <div className="space-y-3.5 pt-2 text-xs border-t border-black/5 dark:border-white/5">
                  <div className="flex gap-2.5 items-start">
                    <MapPinHouse className="w-4 h-4 text-stone-400 shrink-0 mt-0.5" />
                    <span className="leading-relaxed">{activeLocation.address}</span>
                  </div>
                  <div className="flex gap-2.5 items-start">
                    <Clock className="w-4 h-4 text-stone-400 shrink-0 mt-0.5" />
                    <span>{activeLocation.hours}</span>
                  </div>
                  <div className="flex gap-2.5 items-start">
                    <Phone className="w-4 h-4 text-stone-400 shrink-0 mt-0.5" />
                    <span>{activeLocation.phone}</span>
                  </div>
                  <div className="flex gap-2.5 items-start">
                    <Info className="w-4 h-4 text-stone-404 shrink-0 mt-0.5 text-blue-500/80" />
                    <span className="text-stone-400 font-serif italic text-[11px]">{activeLocation.directionNote}</span>
                  </div>
                </div>
              </div>

              {/* Map app external redirection triggers */}
              <div className="grid grid-cols-2 gap-2.5 pt-6 mt-6 border-t border-black/5 dark:border-white/5">
                <a
                  href={activeLocation.naverMapUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="py-2.5 px-3 rounded-lg border border-stone-200 dark:border-stone-800 text-center font-sans text-[11px] font-semibold tracking-wider hover:bg-black/5 dark:hover:bg-white/5 flex items-center justify-center gap-1 bg-stone-50 dark:bg-stone-900"
                >
                  <ExternalLink className="w-3 h-3" />
                  <span>네이버 지도 길찾기</span>
                </a>
                <a
                  href={activeLocation.kakaoMapUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="py-2.5 px-3 rounded-lg border border-stone-200 dark:border-stone-800 text-center font-sans text-[11px] font-semibold tracking-wider hover:bg-black/5 dark:hover:bg-white/5 flex items-center justify-center gap-1 bg-stone-50 dark:bg-stone-900"
                >
                  <ExternalLink className="w-3 h-3" />
                  <span>카카오맵 길찾기</span>
                </a>
              </div>

            </div>
          </div>

        </div>
      </section>

      {/* GUESTBOOK LEDGER COMPONENT SECTION */}
      <section id="guestbook-section" className="py-20 max-w-7xl mx-auto px-6 border-b border-black/5 dark:border-white/5">
        <GuestbookManager currentTheme={currentTheme} />
      </section>

      {/* LIGHTBOX DETAIL MODAL */}
      <AnimatePresence>
        {selectedProduct && (
          <>
            {/* Backdrop overlay */}
            <motion.div
              id="lightbox-backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.6 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedProduct(null)}
              className="fixed inset-0 bg-black z-50 pointer-events-auto cursor-pointer"
            />

            {/* Modal dialog block */}
            <motion.div
              id="lightbox-dialog"
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ type: 'spring', damping: 25 }}
              className={`fixed inset-x-6 sm:inset-x-auto top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 max-w-lg w-full z-50 rounded-3xl border p-6 shadow-2xl overflow-hidden pointer-events-auto flex flex-col ${colors.bg} ${colors.border}`}
            >
              {/* Cover high-quality hotlink */}
              <div className="w-full aspect-video rounded-2xl overflow-hidden border border-black/10 dark:border-white/10 relative shadow-inner">
                <img
                  src={selectedProduct.imageUrl}
                  alt={selectedProduct.name}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
                
                {/* Floating dismiss button */}
                <button
                  onClick={() => setSelectedProduct(null)}
                  className="absolute top-4 right-4 p-2 bg-black/60 hover:bg-black/80 text-white rounded-full transition-colors focus:outline-none"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Detail narrative contents */}
              <div className="pt-6 space-y-4">
                <div>
                  <span className={`px-2.5 py-1 rounded-full text-[9px] font-sans font-bold border ${
                    isHeritage ? selectedProduct.badgeColorLight : selectedProduct.badgeColorDark
                  }`}>
                    {selectedProduct.badge}
                  </span>
                  <div className="flex justify-between items-baseline mt-3">
                    <h3 className={`font-serif text-2xl font-bold ${colors.text}`}>
                      {selectedProduct.name}
                    </h3>
                    <span className="font-mono text-lg font-bold">
                      ₩{selectedProduct.price.toLocaleString()}
                    </span>
                  </div>
                  <p className="text-xs uppercase tracking-wider opacity-50 font-mono mt-1">
                    {selectedProduct.englishName}
                  </p>
                </div>

                <p className={`text-xs leading-relaxed font-sans ${colors.paragraph}`}>
                  {selectedProduct.description}
                </p>

                {/* Fun facts metrics */}
                <div className="grid grid-cols-2 gap-3.5 py-4 px-4 rounded-2xl bg-black/5 dark:bg-white/5 border border-black/5 dark:border-white/5 text-[11px] font-sans">
                  <div>
                    <span className="block text-stone-400 mb-0.5">품질 관리 기준</span>
                    <span className="font-semibold">{isHeritage ? '당일 소진, 당일 밤 전액 기부' : '전처리 누룩 효소 자연 발효'}</span>
                  </div>
                  <div>
                    <span className="block text-stone-400 mb-0.5">최적의 보관 가이드</span>
                    <span className="font-semibold">밀봉 후 즉시 실온/냉동 보관</span>
                  </div>
                </div>

                {/* Dialog footer button */}
                <div className="pt-4 flex gap-3">
                  <button
                    onClick={() => setSelectedProduct(null)}
                    className="flex-1 py-3 rounded-xl border border-outline/30 text-xs font-semibold hover:bg-black/5 dark:hover:bg-white/5 transition-colors"
                  >
                    닫기
                  </button>
                  <button
                    onClick={() => {
                      handleAddToCart(selectedProduct);
                      setSelectedProduct(null);
                    }}
                    className={`flex-1 py-3 rounded-xl text-center text-xs font-semibold tracking-wider transition-all duration-300 transform active:scale-95 ${colors.activeTab}`}
                  >
                    장바구니 담기
                  </button>
                </div>
              </div>

            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* FULL SLIDEOUT CART DRAWER MOUNT */}
      <OrderCart
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onClearCart={handleClearCart}
        currentTheme={currentTheme}
      />

      {/* FOOTER Landmark coords */}
      <footer className="py-12 border-t border-black/5 dark:border-white/5 text-center text-xs text-stone-400 tracking-wide font-sans space-y-4">
        <p>© 2026 SungSimDang Boutique. All Rights Reserved.</p>
        <p className="max-w-md mx-auto text-[10px] leading-relaxed text-stone-500">
          본 웹 서비스는 전설적인 대전의 성심당 역사와 상징적인 빵들의 매력을 알리고자 정교하게 구현된 브랜드 헌사 아틀리에입니다. 실제 주문은 실시간 시뮬레이션으로 수행됩니다.
        </p>
      </footer>

    </div>
  );
}

// Inline missing X symbol for standard dialog dismiss
function X(props: any) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={2}
      stroke="currentColor"
      {...props}
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
    </svg>
  );
}

