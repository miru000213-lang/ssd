export interface Product {
  id: string;
  name: string;
  englishName: string;
  price: number;
  description: string;
  badge: string;
  badgeColorLight: string;
  badgeColorDark: string;
  imageUrl: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface BoutiqueLocation {
  id: string;
  name: string;
  englishName: string;
  description: string;
  address: string;
  hours: string;
  phone: string;
  coordinates: { x: number; y: number }; // Simulated percentage positions on visual interactive map
  directionNote: string;
  naverMapUrl: string;
  kakaoMapUrl: string;
  imageUrl: string;
}

export interface GuestbookEntry {
  id: string;
  author: string;
  content: string;
  rating: number; // 1-5 hearts
  sticker: 'bread' | 'heart' | 'star' | 'coffee';
  date: string;
}

export type ThemeMode = 'heritage' | 'atelier';
