import type { Metadata, Viewport } from 'next';
import './globals.css';
import { ShopProvider } from '@/context/ShopContext';
import SmoothScroll from '@/components/common/SmoothScroll';
import CartDrawer from '@/components/modals/CartDrawer';
import QuickViewModal from '@/components/modals/QuickViewModal';
import VIPAppointmentModal from '@/components/modals/VIPAppointmentModal';
import SearchModal from '@/components/modals/SearchModal';

export const metadata: Metadata = {
  title: "MAISON D'ORVAL | Haute Joaillerie Paris • Place Vendôme",
  description:
    'French High Jewellery Maison established in 1894 on Place Vendôme. Sovereign 18-karat fairmined gold, Type IIa certified solitaire diamonds, and bespoke bridal suites.',
  keywords: [
    'Haute Joaillerie',
    'Luxury Jewellery',
    'Place Vendôme',
    'Diamond Rings',
    'Gold Necklaces',
    'Bridal Jewellery',
    'Maison D’Orval',
    'Bespoke Jewellery Paris',
  ],
  authors: [{ name: "Maison D'Orval" }],
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  themeColor: '#070709',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark scroll-smooth">
      <body className="min-h-screen bg-[#070709] text-[#faf7f2] font-sans antialiased selection:bg-[#c5a059] selection:text-[#070709]">
        <ShopProvider>
          <SmoothScroll>
            {children}
            <CartDrawer />
            <QuickViewModal />
            <VIPAppointmentModal />
            <SearchModal />
          </SmoothScroll>
        </ShopProvider>
      </body>
    </html>
  );
}
