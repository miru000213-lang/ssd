import { motion, AnimatePresence } from 'motion/react';
import { X, Plus, Minus, ShoppingBag, Trash2, CheckCircle2, Heart } from 'lucide-react';
import { CartItem, ThemeMode } from '../types';

interface OrderCartProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  onUpdateQuantity: (productId: string, delta: number) => void;
  onRemoveItem: (productId: string) => void;
  onClearCart: () => void;
  currentTheme: ThemeMode;
}

export default function OrderCart({
  isOpen,
  onClose,
  cartItems,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
  currentTheme
}: OrderCartProps) {
  const isHeritage = currentTheme === 'heritage';
  const totalPrice = cartItems.reduce((acc, curr) => acc + curr.product.price * curr.quantity, 0);

  const colors = {
    bg: isHeritage ? 'bg-[#fbf9f5] text-[#322214]' : 'bg-[#151717] text-[#e9c176]',
    border: isHeritage ? 'border-[#d2c4bb]/30' : 'border-[#4e4639]/40',
    itemBg: isHeritage ? 'bg-[#f5f3ef]' : 'bg-[#1e2020]',
    secondaryText: isHeritage ? 'text-[#7c6f64]' : 'text-[#a49988]',
    buttonBg: isHeritage ? 'bg-[#322214] text-[#fbf9f5]' : 'bg-[#e9c176] text-[#2c1f00]',
    accentText: isHeritage ? 'text-[#7c5726]' : 'text-[#e9c176]',
    emptyBg: isHeritage ? 'text-amber-900/10' : 'text-amber-500/10'
  };

  const handleSimulatedCheckout = () => {
    onClearCart();
    alert('🎉 성심당 명예 제빵 신사/숙녀님!\n주문이 대전 본점 화덕으로 직접 전송되었습니다. 갓 구운 고소한 소보로의 온기가 곧 퍼져 나갑니다! (시뮬레이션 완료)');
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop Overlay */}
          <motion.div
            id="cart-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black z-50 pointer-events-auto cursor-pointer"
          />

          {/* Cart Panel Drawer */}
          <motion.div
            id="cart-drawer"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 220 }}
            className={`fixed top-0 right-0 w-full max-w-md h-full z-50 shadow-2xl flex flex-col pointer-events-auto border-l ${colors.bg}`}
          >
            {/* Drawer Header */}
            <div className={`p-6 flex justify-between items-center border-b ${colors.border}`}>
              <div className="flex items-center gap-2.5">
                <ShoppingBag className="w-5 h-5 text-primary" />
                <h3 className="font-serif text-lg font-medium">따뜻한 장바구니</h3>
              </div>
              <button
                onClick={onClose}
                className={`p-2 rounded-full hover:bg-black/5 dark:hover:bg-white/5 transition-colors ${colors.secondaryText}`}
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Drawer Body - Items */}
            <div className="flex-1 overflow-y-auto p-6 space-y-4">
              {cartItems.length === 0 ? (
                <div className="h-full flex flex-col justify-center items-center text-center px-4 py-20">
                  <ShoppingBag className={`w-16 h-16 mb-4 ${colors.emptyBg}`} />
                  <p className="font-serif text-base font-semibold mb-1">장바구니가 비어 있습니다</p>
                  <p className={`text-xs max-w-[240px] leading-relaxed ${colors.secondaryText}`}>
                    대표 시그니처 빵과 소보로 퀴즈 기프트에서 추천된 구수한 빵들을 담아 보세요.
                  </p>
                </div>
              ) : (
                cartItems.map((item, idx) => (
                  <motion.div
                    key={item.product.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.05 }}
                    className={`flex gap-4 p-3.5 rounded-2xl border ${colors.border} ${colors.itemBg}`}
                  >
                    {/* Item Image */}
                    <div className="w-16 h-16 rounded-xl overflow-hidden bg-stone-100 flex-shrink-0 border border-black/5">
                      <img
                        src={item.product.imageUrl}
                        alt={item.product.name}
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover"
                      />
                    </div>

                    {/* Item Content */}
                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between items-start mb-1">
                        <h4 className="font-serif text-sm font-semibold truncate pr-2">
                          {item.product.name}
                        </h4>
                        <button
                          onClick={() => onRemoveItem(item.product.id)}
                          className="text-stone-400 hover:text-red-500 transition-colors p-0.5"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                      <p className={`text-xs uppercase tracking-wider mb-2 font-mono ${colors.secondaryText}`}>
                        {item.product.englishName}
                      </p>

                      <div className="flex justify-between items-center">
                        <span className="text-xs font-semibold">
                          ₩{(item.product.price * item.quantity).toLocaleString()}
                        </span>

                        {/* Quantity Counter Action */}
                        <div className="flex items-center gap-1 bg-black/5 dark:bg-white/5 rounded-full p-1 border border-black/5">
                          <button
                            onClick={() => onUpdateQuantity(item.product.id, -1)}
                            className="p-1 rounded-full text-stone-500 hover:bg-black/10 dark:hover:bg-white/10"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="w-6 text-center text-xs font-semibold">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => onUpdateQuantity(item.product.id, 1)}
                            className="p-1 rounded-full text-stone-500 hover:bg-black/10 dark:hover:bg-white/10"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))
              )}
            </div>

            {/* Drawer Footer - Summary */}
            {cartItems.length > 0 && (
              <div className={`p-6 border-t ${colors.border} space-y-4`}>
                <div className="space-y-2">
                  <div className="flex justify-between text-xs">
                    <span className={colors.secondaryText}>아이템 종류</span>
                    <span className="font-semibold">{cartItems.length}종</span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span className={colors.secondaryText}>배송지</span>
                    <span className="font-semibold text-right">대전 본점 (현장 방문 수령)</span>
                  </div>
                  <div className={`h-px w-full my-1 border-t border-dashed ${colors.border}`} />
                  <div className="flex justify-between items-baseline pt-1">
                    <span className="font-serif text-sm font-medium">합계 금액</span>
                    <span className="text-xl font-bold font-mono">
                      ₩{totalPrice.toLocaleString()}
                    </span>
                  </div>
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={onClearCart}
                    className="px-4 py-3 rounded-xl border border-outline/30 text-xs font-semibold hover:bg-red-500/10 hover:text-red-500 hover:border-red-500/30 transition-all active:scale-95 text-stone-400"
                  >
                    비우기
                  </button>
                  <button
                    onClick={handleSimulatedCheckout}
                    className={`flex-1 py-3.5 rounded-xl text-center text-xs font-semibold tracking-wider transition-all duration-300 transform active:scale-[0.98] ${colors.buttonBg} hover:opacity-95 shadow-md`}
                  >
                    주문 완료하기 (방문 수령)
                  </button>
                </div>

                <p className="text-[10px] text-center leading-relaxed text-stone-400">
                  성심당의 모든 빵은 대전광역시 매장 외부 반출 시 품질 및 정체성 보존을 촉구하는 역사와 철학이 담겨있으므로, 현장 방문 구매를 장려합니다.
                </p>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
