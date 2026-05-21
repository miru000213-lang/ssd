import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { HelpCircle, RefreshCw, ShoppingCart, Heart, Compass } from 'lucide-react';
import { Product } from '../types';
import { PRODUCTS, QUIZ_QUESTIONS } from '../data';

interface BreadQuizProps {
  currentTheme: 'heritage' | 'atelier';
  onAddToCart: (product: Product) => void;
}

export default function BreadQuiz({ currentTheme, onAddToCart }: BreadQuizProps) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [scores, setScores] = useState<Record<string, number>>({
    soboro: 0,
    chive: 0,
    myeongran: 0,
    bomunsan: 0
  });
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [recommendedProduct, setRecommendedProduct] = useState<Product | null>(null);

  const colors = {
    bg: currentTheme === 'heritage' ? 'bg-[#f5f3ef]/50 border-[#d2c4bb]/30' : 'bg-[#1a1c1c]/90 border-[#4e4639]/40',
    headerText: currentTheme === 'heritage' ? 'text-[#322214]' : 'text-[#e9c176]',
    bodyText: currentTheme === 'heritage' ? 'text-[#4e453e]' : 'text-[#d1c5b4]',
    accent: currentTheme === 'heritage' ? 'bg-[#322214] text-white' : 'bg-[#e9c176] text-[#412d00]',
    quizCard: currentTheme === 'heritage' ? 'bg-white border-[#d2c4bb]/20 shadow-amber-950/5' : 'bg-[#121414] border-[#4e4639]/30 shadow-black/80',
    optionBtn: currentTheme === 'heritage' ? 'border-[#d2c4bb]/50 hover:bg-[#fbf9f5] hover:border-[#322214]' : 'border-[#4e4639]/50 hover:bg-[#1e2020] hover:border-[#e9c176]',
  };

  const handleOptionSelect = (scoreKey: string) => {
    // Update scores
    const newScores = { ...scores, [scoreKey]: (scores[scoreKey] || 0) + 1 };
    setScores(newScores);

    if (currentQuestionIndex < QUIZ_QUESTIONS.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      // Find the bread with highest score
      let highestKey = 'soboro';
      let maxVal = -1;
      
      Object.entries(newScores).forEach(([key, value]) => {
        const val = value as number;
        if (val > maxVal) {
          maxVal = val;
          highestKey = key;
        }
      });

      const matched = PRODUCTS.find(p => p.id === highestKey) || PRODUCTS[0];
      setRecommendedProduct(matched);
      setQuizCompleted(true);
    }
  };

  const resetQuiz = () => {
    setCurrentQuestionIndex(0);
    setScores({ soboro: 0, chive: 0, myeongran: 0, bomunsan: 0 });
    setQuizCompleted(false);
    setRecommendedProduct(null);
  };

  return (
    <div 
      id="bread-quiz-root" 
      className={`p-6 md:p-10 rounded-3xl border transition-all duration-700 ${colors.bg} overflow-hidden`}
    >
      <div className="max-w-xl mx-auto">
        <div className="flex items-center gap-2 mb-4 justify-center">
          <Compass className={`w-5 h-5 ${currentTheme === 'heritage' ? 'text-[#7c5726]' : 'text-[#e9c176]'}`} />
          <span className={`font-sans tracking-[0.2em] text-[10px] font-semibold uppercase ${colors.bodyText}`}>
            Bread Sommelier
          </span>
        </div>

        <h3 className={`font-serif text-2xl text-center mb-1 ${colors.headerText}`}>
          나와 꼭 닮은 성심당 영혼의 빵 찾기
        </h3>
        <p className={`text-xs text-center mb-8 font-sans ${colors.bodyText}`}>
          식감과 취향, 음료 배리에이션에 기반한 성심당 빵 테이스팅 추천 가이드
        </p>

        <AnimatePresence mode="wait">
          {!quizCompleted ? (
            <motion.div
              key={currentQuestionIndex}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="space-y-4"
            >
              {/* Progress dots */}
              <div className="flex justify-center gap-1.5 mb-6">
                {QUIZ_QUESTIONS.map((_, i) => (
                  <div
                    key={i}
                    className={`h-1.5 rounded-full transition-all duration-300 ${
                      i === currentQuestionIndex 
                        ? (currentTheme === 'heritage' ? 'w-6 bg-[#322214]' : 'w-6 bg-[#e9c176]')
                        : (currentTheme === 'heritage' ? 'w-1.5 bg-stone-300' : 'w-1.5 bg-stone-700')
                    }`}
                  />
                ))}
              </div>

              {/* Question card */}
              <div className={`p-6 rounded-2xl border ${colors.quizCard} text-center shadow-md`}>
                <p className={`font-sans font-medium text-base mb-6 ${colors.headerText}`}>
                  {QUIZ_QUESTIONS[currentQuestionIndex].question}
                </p>

                <div className="space-y-3">
                  {QUIZ_QUESTIONS[currentQuestionIndex].options.map((opt, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleOptionSelect(opt.score)}
                      className={`w-full p-4 text-left font-sans text-sm rounded-xl border transition-all duration-300 focus:outline-none ${colors.optionBtn}`}
                    >
                      {opt.text}
                    </button>
                  ))}
                </div>
              </div>
            </motion.div>
          ) : (
            recommendedProduct && (
              <motion.div
                key="result"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ type: 'spring', damping: 25 }}
                className="text-center"
              >
                <div className={`p-6 rounded-2xl border ${colors.quizCard} shadow-lg relative`}>
                  {/* Result Badge */}
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                    <span className={`px-4 py-1.5 rounded-full text-[10px] font-sans font-semibold tracking-widest uppercase border ${colors.accent}`}>
                      YOUR SOUL BREAD
                    </span>
                  </div>

                  {/* Product visual preview */}
                  <div className="w-32 h-32 mx-auto rounded-full overflow-hidden border border-outline/20 mt-4 mb-6 relative group">
                    <img 
                      src={recommendedProduct.imageUrl} 
                      alt={recommendedProduct.name}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                  </div>

                  <h4 className={`font-serif text-xl ${colors.headerText} mb-0.5`}>
                    {recommendedProduct.name}
                  </h4>
                  <p className="font-sans text-xs text-primary font-medium tracking-wider uppercase mb-3">
                    {recommendedProduct.englishName}
                  </p>

                  <p className={`text-sm ${colors.bodyText} px-4 mb-6 leading-relaxed`}>
                    {recommendedProduct.description}
                  </p>

                  <div className="flex flex-col sm:flex-row gap-3 justify-center items-center">
                    <button
                      onClick={() => onAddToCart(recommendedProduct)}
                      className={`w-full sm:w-auto px-6 py-3 rounded-full font-sans text-xs font-semibold tracking-wider flex items-center justify-center gap-2 transition-all ${colors.accent} hover:opacity-90 active:scale-95`}
                    >
                      <ShoppingCart className="w-3.5 h-3.5" />
                      <span>{recommendedProduct.price.toLocaleString()}원 주문 담기</span>
                    </button>

                    <button
                      onClick={resetQuiz}
                      className={`w-full sm:w-auto px-6 py-3 rounded-full font-sans text-xs font-semibold tracking-wider border border-outline/30 flex items-center justify-center gap-2 hover:bg-black/5 dark:hover:bg-white/5 active:scale-95 text-[#9a8f80] ${
                        currentTheme === 'heritage' ? 'hover:text-[#322214]' : 'hover:text-[#e2e2e2]'
                      }`}
                    >
                      <RefreshCw className="w-3.5 h-3.5" />
                      <span>다시 진단하기</span>
                    </button>
                  </div>
                </div>
              </motion.div>
            )
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
