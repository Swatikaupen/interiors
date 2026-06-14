import { useEffect, useRef, useState } from 'react';
import landscapeVideoUrl from '../assets/videos/landscape-background.mp4';
import kehaCasaImg from '../assets/images/conf-keha-casa-01-double-height-atrium-orb-lighting-installation.jpg';
import evoluzionImg from '../assets/images/conf-evoluzione-boutique-05-central-atrium-and-display-towers.jpg';
import ciscoImg from '../assets/images/conf-cisco-b17-campus-bangalore-04-4th-floor-camp-us-forest-campsite-site-photograph.jpg';
import fashionImg from '../assets/images/conf-fashion-flagship-concept.jpg';
import foyerImg from '../assets/images/portfolio-entry-foyer.jpg';
import craneDiningImg from '../assets/images/portfolio-crane-mural-dining-room.jpg';

interface Exhibit {
  id: string;
  title: string;
  tagline: string;
  category: string;
  year: string;
  image: string;
}

const navItems = [
  { label: 'Home', href: '#home', active: true },
  { label: 'Studio', href: '#studio', active: false },
  { label: 'About', href: '#about', active: false },
  { label: 'Journal', href: '#journal', active: false },
  { label: 'Reach Us', href: '#reach-us', active: false },
];

const exhibits: Exhibit[] = [
  {
    id: '01',
    title: 'Keha Casa',
    tagline: 'Where form meets sensation',
    category: 'Hospitality Design',
    year: '2023',
    image: kehaCasaImg,
  },
  {
    id: '02',
    title: 'Evoluzione',
    tagline: 'Dressing rooms as stage and soul',
    category: 'Retail Design',
    year: '2022',
    image: evoluzionImg,
  },
  {
    id: '03',
    title: 'Cisco Campus B17',
    tagline: 'The architecture of deep focus',
    category: 'Commercial Design',
    year: '2023',
    image: ciscoImg,
  },
  {
    id: '04',
    title: 'Fashion Flagship',
    tagline: 'Concept born from movement',
    category: 'Concept Design',
    year: '2024',
    image: fashionImg,
  },
  {
    id: '05',
    title: 'Residential Foyer',
    tagline: 'First impressions, last forever',
    category: 'Residential Design',
    year: '2022',
    image: foyerImg,
  },
  {
    id: '06',
    title: 'Crane Mural Dining',
    tagline: 'Ritual given a room to breathe',
    category: 'Residential Design',
    year: '2021',
    image: craneDiningImg,
  },
];

const EXHIBIT_TOTAL = exhibits.length.toString().padStart(2, '0');

function ExhibitCard({ exhibit, index }: { exhibit: Exhibit; index: number }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const isEven = index % 2 === 0;

  useEffect(() => {
    const el = cardRef.current;
    if (!el) return undefined;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15 },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={cardRef}
      className={`flex min-h-screen items-center px-8 py-20 md:px-16 lg:px-24 ${
        isEven ? 'flex-col md:flex-row' : 'flex-col md:flex-row-reverse'
      }`}
    >
      {/* Large image */}
      <div
        className="relative w-full overflow-hidden md:w-[58%]"
        style={{
          height: '70vh',
          opacity: visible ? 1 : 0,
          transform: visible ? 'translateX(0)' : isEven ? 'translateX(-50px)' : 'translateX(50px)',
          transition: 'opacity 1s ease-out, transform 1s ease-out',
        }}
      >
        <img
          src={exhibit.image}
          alt={exhibit.title}
          className="h-full w-full object-cover"
          loading="lazy"
        />
        <div className="absolute bottom-5 left-5 font-body text-[10px] tracking-[0.3em] text-white/60 uppercase">
          {exhibit.id} — {EXHIBIT_TOTAL}
        </div>
      </div>

      {/* Text panel */}
      <div
        className={`flex flex-col justify-center px-0 pt-10 md:w-[42%] md:px-14 md:pt-0 ${
          isEven ? 'items-start text-left' : 'items-end text-right'
        }`}
        style={{
          opacity: visible ? 1 : 0,
          transform: visible ? 'translateY(0)' : 'translateY(30px)',
          transition: 'opacity 1s ease-out 0.2s, transform 1s ease-out 0.2s',
        }}
      >
        <span className="mb-5 font-body text-[10px] tracking-[0.3em] text-muted uppercase">
          {exhibit.category} · {exhibit.year}
        </span>

        <h2 className="font-display font-normal leading-[0.95] tracking-tight text-foreground"
            style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)' }}>
          {exhibit.title}
        </h2>

        <div className={`my-8 h-px w-8 bg-foreground/20 ${isEven ? '' : 'self-end'}`} />

        <p className="font-display text-xl font-normal italic text-muted sm:text-2xl">
          &ldquo;{exhibit.tagline}&rdquo;
        </p>

        <button
          type="button"
          className={`mt-10 flex items-center gap-3 font-body text-[11px] tracking-[0.25em] text-foreground uppercase transition-opacity hover:opacity-40 ${
            isEven ? '' : 'flex-row-reverse'
          }`}
        >
          <span className="block h-px w-10 bg-foreground" />
          View Installation
        </button>
      </div>
    </div>
  );
}

function App() {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const frameRef = useRef<number | null>(null);
  const restartTimeoutRef = useRef<number | null>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return undefined;

    const fadeDuration = 0.5;

    const setVideoOpacity = (opacity: number) => {
      video.style.opacity = String(Math.max(0, Math.min(1, opacity)));
    };

    const monitorPlayback = () => {
      const { currentTime, duration } = video;

      if (Number.isFinite(duration) && duration > 0) {
        if (currentTime < fadeDuration) {
          setVideoOpacity(currentTime / fadeDuration);
        } else if (duration - currentTime < fadeDuration) {
          setVideoOpacity((duration - currentTime) / fadeDuration);
        } else {
          setVideoOpacity(1);
        }
      }

      frameRef.current = requestAnimationFrame(monitorPlayback);
    };

    const restartVideo = () => {
      setVideoOpacity(0);
      restartTimeoutRef.current = window.setTimeout(() => {
        video.currentTime = 0;
        void video.play();
      }, 100);
    };

    video.addEventListener('ended', restartVideo);
    setVideoOpacity(0);
    void video.play();
    frameRef.current = requestAnimationFrame(monitorPlayback);

    return () => {
      video.removeEventListener('ended', restartVideo);
      if (frameRef.current !== null) cancelAnimationFrame(frameRef.current);
      if (restartTimeoutRef.current !== null) window.clearTimeout(restartTimeoutRef.current);
    };
  }, []);

  return (
    <div className="w-full bg-background text-foreground">
      {/* ─── Hero ─── */}
      <section className="relative min-h-screen w-full overflow-hidden">
        {/* Video background */}
        <div
          className="absolute z-0 overflow-hidden"
          style={{ inset: 'auto 0 0 0', top: '300px' }}
        >
          <video
            ref={videoRef}
            aria-hidden="true"
            className="h-full w-full object-cover"
            muted
            playsInline
            preload="auto"
            src={landscapeVideoUrl}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-background via-transparent to-background" />
        </div>

        {/* Navigation */}
        <nav className="relative z-10 px-6 py-6 sm:px-8">
          <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 sm:gap-8">
            <a
              href="#home"
              className="font-display text-3xl tracking-tight text-foreground transition-opacity hover:opacity-70"
              aria-label="Swatika Upendran home"
            >
              Swatika Upendran
            </a>

            <div className="hidden items-center gap-9 md:flex">
              {navItems.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  className={`font-body text-sm transition-colors hover:text-foreground ${
                    item.active ? 'text-foreground' : 'text-muted'
                  }`}
                >
                  {item.label}
                </a>
              ))}
            </div>

            <a
              href="#exhibition"
              className="rounded-full bg-foreground px-6 py-2.5 font-body text-sm text-background transition-transform duration-300 hover:scale-[1.03]"
            >
              Begin Journey
            </a>
          </div>
        </nav>

        {/* Hero content */}
        <div
          id="home"
          className="relative z-10 flex h-[calc(100vh-96px)] flex-col items-center justify-center px-6 pb-40 text-center"
          style={{ paddingTop: 'calc(8rem - 75px)' }}
        >
          <h1 className="animate-fade-rise max-w-7xl font-display text-5xl font-normal leading-[0.95] tracking-[-2.46px] text-foreground sm:text-7xl md:text-8xl">
            Beyond <em className="font-normal italic text-muted">silence,</em> we build{' '}
            <em className="font-normal italic text-muted">the eternal.</em>
          </h1>

          <p className="animate-fade-rise-delay mt-8 max-w-2xl font-body text-base leading-relaxed text-muted sm:text-lg">
            Building platforms for brilliant minds, fearless makers, and thoughtful souls. Through the
            noise, we craft digital havens for deep work and pure flows.
          </p>

          <a
            href="#exhibition"
            className="animate-fade-rise-delay-2 mt-12 rounded-full bg-foreground px-14 py-5 font-body text-base text-background transition-transform duration-300 hover:scale-[1.03]"
          >
            Begin Journey
          </a>
        </div>
      </section>

      {/* ─── Exhibition Gallery ─── */}
      <section id="exhibition" className="bg-background">
        {/* Gallery entrance header */}
        <div className="border-b border-foreground/10 px-8 py-16 md:px-16 lg:px-24">
          <div className="mx-auto flex max-w-7xl items-end justify-between">
            <div>
              <p className="mb-3 font-body text-[10px] tracking-[0.3em] text-muted uppercase">
                The Collection
              </p>
              <h2 className="font-display text-6xl font-normal text-foreground sm:text-8xl">
                Exhibition
              </h2>
            </div>
            <div className="pb-1 text-right">
              <p className="font-body text-[10px] tracking-[0.2em] text-muted uppercase">
                {EXHIBIT_TOTAL} Works
              </p>
              <p className="mt-1 font-body text-[10px] text-muted">
                Interior Design · 2021–2024
              </p>
            </div>
          </div>
        </div>

        {/* Exhibit cards */}
        <div>
          {exhibits.map((exhibit, index) => (
            <div key={exhibit.id} className="border-b border-foreground/5">
              <ExhibitCard exhibit={exhibit} index={index} />
            </div>
          ))}
        </div>

        {/* Gallery close */}
        <div className="px-8 py-24 text-center md:px-16">
          <p className="font-display text-lg font-normal italic text-muted">
            Each space a story. Each story, a beginning.
          </p>
          <div className="mx-auto mt-6 h-px w-12 bg-foreground/20" />
        </div>
      </section>
    </div>
  );
}

export default App;
