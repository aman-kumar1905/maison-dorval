export type MetalType = '18k Yellow Gold' | '18k Rose Gold' | '18k White Gold' | 'Platinum 950' | 'Sterling Silver 925';

export type CategorySlug = 'gold' | 'diamond' | 'silver' | 'bridal' | 'gemstone';

export interface Product {
  id: string;
  name: string;
  subtitle: string;
  category: CategorySlug;
  price: number;
  currency: string;
  metal: MetalType;
  caratWeight?: string;
  diamondGrade?: string;
  gemstone?: string;
  primaryImage: string;
  secondaryImage: string;
  description: string;
  details: string[];
  isNewArrival?: boolean;
  isBespokeOnly?: boolean;
  isSignature?: boolean;
}

export interface Collection {
  id: string;
  name: string;
  tagline: string;
  description: string;
  year: string;
  pieceCount: number;
  coverImage: string;
  accentQuote: string;
  featuredProducts: string[]; // Product IDs
}

export interface CategoryItem {
  id: CategorySlug;
  title: string;
  frenchTitle: string;
  shortDesc: string;
  image: string;
  itemCount: number;
  highlightPiece: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
  selectedSize?: string;
  selectedMetal?: MetalType;
  engravingText?: string;
}

export interface Testimonial {
  id: string;
  clientName: string;
  title: string;
  location: string;
  quote: string;
  jewelleryCommissioned: string;
  year: string;
}

export interface InstagramPost {
  id: string;
  image: string;
  caption: string;
  likes: string;
  productTag?: string;
}

export interface DemoAppointment {
  id: string;
  subject: string;
  name: string;
  email: string;
  phone: string;
  boutique: string;
  date: string;
  time: string;
  notes?: string;
  createdAt: string;
}

export interface DemoOrder {
  id: string;
  items: CartItem[];
  total: number;
  currency: string;
  clientName: string;
  email: string;
  phone: string;
  deliveryMethod: 'courier' | 'salon';
  address?: string;
  city?: string;
  postalCode?: string;
  country?: string;
  salon?: string;
  giftNote?: string;
  createdAt: string;
}

