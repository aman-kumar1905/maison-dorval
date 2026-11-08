import AnnouncementBar from '@/components/layout/AnnouncementBar';
import Navbar from '@/components/layout/Navbar';
import Hero from '@/components/sections/Hero';
import CategoryShowcase from '@/components/sections/CategoryShowcase';
import SignatureCollections from '@/components/sections/SignatureCollections';
import FeaturedProducts from '@/components/sections/FeaturedProducts';
import BridalEditorial from '@/components/sections/BridalEditorial';
import CraftsmanshipStory from '@/components/sections/CraftsmanshipStory';
import Testimonials from '@/components/sections/Testimonials';
import MaisonGallery from '@/components/sections/MaisonGallery';
import Footer from '@/components/layout/Footer';

export default function Home() {
  return (
    <main className="min-h-screen bg-[#070709] text-[#faf7f2] flex flex-col">
      {/* 1. Elegant Announcement Bar */}
      <AnnouncementBar />

      {/* 2. Premium Navigation with Logo and Category Menus */}
      <Navbar />

      {/* 3. Cinematic Full-Screen Hero Section */}
      <Hero />

      {/* 4. Shop by Category: Gold, Diamond, Silver, Bridal and Gemstone */}
      <CategoryShowcase />

      {/* 5. Signature Collections */}
      <SignatureCollections />

      {/* 6. Featured Jewellery Products */}
      <FeaturedProducts />

      {/* 7. Full-Width Bridal Editorial Section */}
      <BridalEditorial />

      {/* 8. Craftsmanship and Brand Story */}
      <CraftsmanshipStory />

      {/* 9. Curated Customer Testimonials */}
      <Testimonials />

      {/* 10. Instagram-Inspired Gallery */}
      <MaisonGallery />

      {/* 11. Premium Multi-Column Footer */}
      <Footer />
    </main>
  );
}
