import { Product, BoutiqueLocation } from './types';

export const PRODUCTS: Product[] = [
  {
    id: 'soboro',
    name: '튀김소보로',
    englishName: 'Fried Soboro',
    price: 1700,
    description: '도넛과 소보로, 단팥 앙금의 삼위일체. 1980년부터 이어져 온 매일 불티나게 팔리는 성심당의 상징적인 전설의 영양 도넛빵입니다.',
    badge: 'BEST SELLER',
    badgeColorLight: 'bg-amber-100 text-amber-800 border-amber-200',
    badgeColorDark: 'bg-amber-900/40 text-amber-300 border-amber-800/40',
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBnAp-ge1iX5WV78EUiMNx6VmCGbGQRwTLCNzAwTzou5ryZ16dP-STj7tZynQhUc5TOswgoaByGmOhzdLfGpEdMKiM5QgbXCaLr3wMkzYD23tt4O5qwq4aG7-74sI_qOhQ13RVffzolFIs320lcKqtJbKEEM46wVDW62uLr4wY0xAO--Dw19P3fHoYjF7Hpk9QOMrgtcBtJz7LENc-pFaSbCXSDUwI7BhsV8NiwijYXoUA-gmLfuXhjMcLRaMal5-3_tsG4OqVkM_0'
  },
  {
    id: 'chive',
    name: '판타롱부추빵',
    englishName: 'Pantallon Chive Bread',
    price: 2000,
    description: '파릇파릇 신선하고 푸짐한 부추와 고소한 달걀, 부드러운 햄이 절묘하게 조화되어 담백하면서도 싱그러운 부추 특유의 추억을 부르는 식감입니다.',
    badge: 'SIGNATURE',
    badgeColorLight: 'bg-emerald-100 text-emerald-800 border-emerald-200',
    badgeColorDark: 'bg-emerald-950/40 text-emerald-300 border-emerald-800/40',
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBPfFUO1rksyk--kagU9Hr37oYLbf8Lpk-c7V3e9WpfrI7S2IniCGB5UNDyxA_VoKyRPu-UXykfp10q_PpSY4YN7O3H65cL1CkwUthuX6WajodIepSyoNhgDjDey5W7TjKl-tiJMpQq6P1lxnA21qeKH-djeNAn2PEeoiKI-JlFSCXIUFUgSpH0QFJwUMFEgIsKfs4hMGfTwUXXkNWRPnVdOlvZH3q-dZueuOxyI717AQWWNcjeBc2LSXzBVGmKimEcISRUyC80aq8'
  },
  {
    id: 'myeongran',
    name: '명란바게트',
    englishName: 'Myeongran Baguette',
    price: 3800,
    description: '바삭바삭한 프랑스식 바게트와 짭조름한 최고급 명란젓, 그리고 고소한 버터의 은은한 조화. 한 번 먹기 시작하면 멈출 수 없는 대유행 시그니처.',
    badge: 'CRAFT',
    badgeColorLight: 'bg-stone-200 text-stone-800 border-stone-300',
    badgeColorDark: 'bg-stone-800/40 text-stone-300 border-stone-700/40',
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuArZyP6seJO58zWXolmWm2VaSFbDo2HEZ9APBWfmHjdEYIJyfY28vcNOZ-WMuRz0Es6T9dJ829sEvlGXzor6kVl5jsqhaq4u1bRtmwCHqpmsUflogFQL7myZugceRW1oWAe6o6l3RYKQTqSj6H-7U5Y4-pbo_X8MtmdqAc8HOjM0ORdNKz4yVI8iErkqU_jvE98Sm6yIS9pU6bfk6Ghz540r3swib0NP85a9M4DXAwG3j4nxf8JHweqEO-G4h4EkMSc6pXMWm_BqOc'
  },
  {
    id: 'bomunsan',
    name: '보문산 메아리',
    englishName: 'Bomunsan Echo',
    price: 6000,
    description: '겹겹이 쌓아 내린 한 줄 한 줄 페이스트리의 마법. 촉촉한 버터 향과 은은히 퍼지는 달콤한 골드 시럽이 대전의 보문산 메아리처럼 가득 스며듭니다.',
    badge: 'HEALTHY',
    badgeColorLight: 'bg-sky-100 text-sky-800 border-sky-200',
    badgeColorDark: 'bg-sky-950/40 text-sky-300 border-sky-800/40',
    // High-quality beautiful spiral pastry
    imageUrl: 'https://images.unsplash.com/photo-1555507036-ab1f4038808a?q=80&w=800&auto=format&fit=crop'
  }
];

export const BOUTIQUES: BoutiqueLocation[] = [
  {
    id: 'main',
    name: '성심당 본점',
    englishName: 'Main Boutique',
    description: '1956년부터 시작되어 대전의 명소이자 한국 제과업계의 상징이 된 역사적인 공간입니다. 오직 대전에서만 맛볼 수 있는 신선한 명품 빵들이 365일 따뜻하게 구워집니다.',
    address: '대전광역시 중구 은행동 대종로480번길 15',
    hours: '매일 08:00 – 22:00 (연중무휴)',
    phone: '1588-8069',
    coordinates: { x: 48, y: 52 },
    directionNote: '대전역 1번 출구에서 보행 및 도보 5분 거리 (중앙로역 2번 출구 앞)',
    naverMapUrl: 'https://map.naver.com/v5/search/%EC%84%B1%EC%8B%AC%EB%8B%B9%20%EB%B3%B8%EC%A0%90',
    kakaoMapUrl: 'https://map.kakao.com/?q=%EC%84%B1%EC%8B%AC%EB%8B%B9%20%EB%B3%B8%EC%A0%90',
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAcHj84y0iqA_fs7DoHz7epkQrL02E4LGMFuBU_h7WdXg2J_HOfQ_Nh8VTuA_aBx-zp0hdpNl88fyCQEjh_kEDD-3ODgj6MV6Z7ntn_rX_iIRt5EBkaCn6LCNCx63D_VJ6GqrwXs-OpPv_e7h3sxvcPLvTA1eXb0tMQtwqQcRS8f5jkskXE0ba6BgBsG5y0lG93xphFLQbEMdgvB2qBMvsXl2Df1n7-WGU2xXr5BkDl3ZXjrZTqd9KmvPNL2LtrXguA3JTe8V6Ovm4'
  },
  {
    id: 'kitchen',
    name: '테라스 키친',
    englishName: 'Terrace Kitchen',
    description: '성심당 본점 2층의 대한민국 제1호 베이커리 레스토랑. 1992년부터 성심당의 갓 구운 빵과 오리지널 양식 페어링을 즐길 수 있는 안락한 패밀리 다이닝 테이블입니다.',
    address: '대전광역시 중구 은행동 대종로480번길 15 (2층)',
    hours: '매일 11:30 – 21:00 (마지막 주문 20:30)',
    phone: '1588-8069 (내선 2번)',
    coordinates: { x: 50, y: 46 },
    directionNote: '본점 베이커리 2층 전용 나선 계단 또는 엘리베이터 이동',
    naverMapUrl: 'https://map.naver.com/v5/search/%ED%85%8C%EB%9D%BC%EC%8A%A4%ED%82%A4%EC%B9%9C',
    kakaoMapUrl: 'https://map.kakao.com/?q=%ED%85%8C%EB%9D%BC%EC%8A%A4%ED%ED%82%A4%EC%B9%9C',
    imageUrl: 'https://images.unsplash.com/photo-1544025162-d76694265947?q=80&w=800&auto=format&fit=crop'
  },
  {
    id: 'cake',
    name: '성심당 케익부띠끄',
    englishName: 'Cake Boutique',
    description: '프랑스풍 고급 구움과자와 우아하고 보석 같은 조각 케이크, 롤케이크, 수제 타르트가 눈부시게 빛나는 달콤함의 정원을 지향하는 디저트 전문 부띠끄입니다.',
    address: '대전광역시 중구 은행동 대종로 480',
    hours: '매일 08:30 – 21:30 (금/토요일은 22:00까지)',
    phone: '1588-8069 (내선 3번)',
    coordinates: { x: 42, y: 55 },
    directionNote: '본점에서 큰 도로변 방면 우측 도보 1분 (코너 모퉁이 위치)',
    naverMapUrl: 'https://map.naver.com/v5/search/%EC%84%B1%EC%8B%AC%EB%8B%B9%20%EC%BC%20%EC%9D%B5%EB%B6%80%EB%9D%A0%EB%81%BB',
    kakaoMapUrl: 'https://map.kakao.com/?q=%EC%84%B1%EC%8B%AC%EB%8B%B9%20%EC%BC%80%EC%9D%B5%EB%B6%80%EB%9D%A0%EB%81%BB',
    imageUrl: 'https://images.unsplash.com/photo-1551024601-bec78aea704b?q=80&w=800&auto=format&fit=crop'
  }
];

export const STORY_TIMELINE = [
  {
    year: '1956',
    title: '나눔과 상생의 밀가루 시작',
    description: '창업주 임길순 부부가 흥남철수선에서 구조된 후 대전역 앞 천막에서 전쟁 피해로 배고픈 이웃들에게 빵을 찌고 나누어 주며 성심당의 따뜻한 첫 걸음을 떼었습니다.'
  },
  {
    year: '1970',
    title: '은행동 빵의 터전',
    description: '현재의 은행동 사옥 본점 자리로 이전하여 본격적으로 대전 시민들의 온기를 담아내는 지역 최고의 베이커리로 뿌리를 확고히 내리기 시작했습니다.'
  },
  {
    year: '1980',
    title: '전설의 튀김소보로 탄생',
    description: '그 시절 모두 세상을 바꾼 소보로와 빵, 단팥도넛의 합체를 연구하여 대한민국 제과 역사상 최초로 특허를 인정받고 현재 누적 8천만 개가 넘는 판매 신화를 창조했습니다.'
  },
  {
    year: '2014',
    title: '교황 프란치스코 오찬 납품',
    description: '교황 프란치스코 한국 방문 시 식사용 건강 호밀빵과 전통 빵들을 엄선 가득 담아 직접 한마음 봉헌하고 정갈하게 구워 올려 신선한 극찬을 수여받았습니다.'
  },
  {
    year: '2026',
    title: '68년 대전의 자랑스러운 유산',
    description: '당일 판매하고 남은 모든 빵은 여전히 지역 내 보육원과 노숙인 쉼터에 매일 밤 전액 기부하는 고집적인 나눔을 68년 동안 한 번도 끊이지 않고 영원히 계승하고 있습니다.'
  }
];

export const QUIZ_QUESTIONS = [
  {
    id: 1,
    question: 'Q1. 가장 좋아하는 빵의 기본 베이스 맛은 무엇인가요?',
    options: [
      { text: '달콤하고 오랜 옛 추억의 맛 (팥, 설탕, 도넛)', score: 'soboro' },
      { text: '신선하고 깔끔하고 아삭한 맛 (채소, 계란, 구수한 만두 느낌)', score: 'chive' },
      { text: '짭쪼름하고 중독적인 풍미 (명란젓, 버터향, 바삭한 마늘바게트)', score: 'myeongran' },
      { text: '겹겹이 찢어지며 달콤하고 우유와 어울리는 버터 식감 (페이스트리)', score: 'bomunsan' }
    ]
  },
  {
    id: 2,
    question: 'Q2. 당신이 추구하는 평온하고 즐거운 한 입의 감촉은?',
    options: [
      { text: '겉은 바삭하고 속은 꾸덕한 최강의 식감', score: 'soboro' },
      { text: '촉촉하고 폭신해서 사르르 부드러운 만지는 매력', score: 'chive' },
      { text: '딱딱하고 담백한 전통 하드 크러스트의 경쾌한 아작함', score: 'myeongran' },
      { text: '천천히 한 겹의 결을 손으로 만지며 찢을 때의 설렘', score: 'bomunsan' }
    ]
  },
  {
    id: 3,
    question: 'Q3. 이 빵과 함께 곁들이고 싶은 오늘의 완벽한 음료는?',
    options: [
      { text: '갓 내린 쓰디쓴 뜨거운 블랙 아메리카노 또는 에스프레소', score: 'soboro' },
      { text: '고소하고 미지근한 흰 우유가 담긴 시골 머그컵', score: 'chive' },
      { text: '시원하고 알싸한 청량감 넘치거나 차가운 수제 맥주 조합', score: 'myeongran' },
      { text: '꽃향기 나고 상큼 풍미의 따뜻한 얼그레이/드립 티 라떼', score: 'bomunsan' }
    ]
  }
];
