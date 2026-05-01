import { Metadata } from 'next';
import Image from 'next/image';
import { BoothLocator } from '@/components/maps/BoothLocator';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  title: 'Find Your Polling Booth | ElectIQ',
  description: 'Locate your nearest polling booth, check wait times, and verify accessibility options on our interactive map.',
};

export default function LocatorPage() {
  return (
    <main className="min-h-screen bg-[var(--bg-secondary)]">
      <Navigation />

      {/* Visual storytelling banner */}
      <div className="relative w-full h-52 sm:h-64 mt-16">
        <Image src="/feature-map.png" alt="Aerial view of Indian community polling station" fill priority className="object-cover" sizes="100vw" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 to-[var(--bg-secondary)]" />
        <div className="absolute bottom-6 left-0 right-0 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/15 backdrop-blur-sm text-white text-sm font-semibold mb-3">
            <span className="w-2 h-2 rounded-full bg-[var(--accent)] animate-pulse" />
            Live Polling Data (Demo)
          </div>
          <h1 className="text-3xl md:text-5xl font-extrabold text-white drop-shadow-lg tracking-tight">
            Know exactly where to <span className="text-[var(--saffron-300)]">cast your vote.</span>
          </h1>
          <p className="text-white/70 text-base md:text-lg mt-2 max-w-2xl">
            Find your polling station, check wait times, and verify accessibility.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-8 py-10 relative z-10">
        <BoothLocator />

        {/* Guidelines Section */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-xl border border-[var(--border-default)] hover:shadow-[var(--shadow-md)] transition-shadow">
            <h3 className="text-[var(--text-primary)] font-bold mb-2 text-lg">What to carry?</h3>
            <p className="text-[var(--text-secondary)] text-sm mb-3 leading-relaxed">
              You must carry your EPIC (Voter ID card). If you don&apos;t have it, you can carry any of the 12 approved photo ID proofs like Aadhaar, PAN Card, or Driving License.
            </p>
            <a href="/chat" className="text-[var(--accent)] text-sm font-semibold hover:underline">Ask ElectIQ for the full list →</a>
          </div>

          <div className="bg-white p-6 rounded-xl border border-[var(--border-default)] hover:shadow-[var(--shadow-md)] transition-shadow">
            <h3 className="text-[var(--text-primary)] font-bold mb-2 text-lg">Inside the booth</h3>
            <p className="text-[var(--text-secondary)] text-sm leading-relaxed">
              Mobile phones, cameras, and any campaign material are strictly prohibited inside the polling station.
            </p>
          </div>

          <div className="bg-white p-6 rounded-xl border border-[var(--border-default)] hover:shadow-[var(--shadow-md)] transition-shadow">
            <h3 className="text-[var(--text-primary)] font-bold mb-2 text-lg">Accessibility</h3>
            <p className="text-[var(--text-secondary)] text-sm leading-relaxed">
              Most booths have ramps and wheelchairs. Priority voting is provided for senior citizens and persons with disabilities.
            </p>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  );
}
