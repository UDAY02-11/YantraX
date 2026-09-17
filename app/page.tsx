import { AnnouncementBar } from '@/components/layout/AnnouncementBar';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { HomepageSections } from '@/components/home/HomepageSections';

export default function Home() {
  return (
    <>
      <AnnouncementBar />
      <Header />
      <main>
        <HomepageSections />
      </main>
      <Footer />
    </>
  );
}
