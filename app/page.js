'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';

const FLOATING_ITEMS = ['🌸', '💕', '🌷', '🐱', '💗', '🌹', '💝', '✿', '🐾', '💐', '🎀', '💖', '⭐', '✨'];

const CONFETTI_COLORS = [
  '#FF69B4', '#FF1493', '#FF1744', '#FFB6C1',
  '#FF7F7F', '#FFD700', '#FF6B6B', '#E91E63',
  '#F48FB1', '#FF80AB', '#FFDAB9', '#FFE4E1'
];

const ART_GALLERY = [
  { src: '/art/flowers.png', alt: 'Pixel Art Flowers', tilt: -4 },
  { src: '/art/purple-cat.png', alt: 'Neon Purple Cat', tilt: 3 },
  { src: '/art/pink-cat.png', alt: 'Pink Cat with Clouds', tilt: -2 },
  { src: '/art/stairway.png', alt: 'Stairway to the Sky', tilt: 4 },
  { src: '/art/calico-cat.png', alt: 'Cute Calico Cat', tilt: -3 },
  { src: '/art/portrait.png', alt: 'Portrait', tilt: 2 },
  { src: '/art/cat-couple.png', alt: 'Cat Couple', tilt: -1 },
];

export default function Home() {
  const [showCelebration, setShowCelebration] = useState(false);
  const [floatingElements, setFloatingElements] = useState([]);
  const [confetti, setConfetti] = useState([]);
  const [sparkles, setSparkles] = useState([]);
  const [letterOpened, setLetterOpened] = useState(false);
  const revealRef = useRef(null);
  const galleryRef = useRef(null);
  const [revealVisible, setRevealVisible] = useState(false);
  const [galleryVisible, setGalleryVisible] = useState(false);

  useEffect(() => {
    const elements = Array.from({ length: 40 }, (_, i) => ({
      id: i,
      emoji: FLOATING_ITEMS[Math.floor(Math.random() * FLOATING_ITEMS.length)],
      left: Math.random() * 100,
      duration: 10 + Math.random() * 20,
      delay: Math.random() * 15,
      size: 1.2 + Math.random() * 2,
    }));
    setFloatingElements(elements);

    const sparks = Array.from({ length: 30 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      top: Math.random() * 100,
      delay: Math.random() * 5,
      duration: 2 + Math.random() * 3,
      size: 3 + Math.random() * 6,
    }));
    setSparkles(sparks);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            if (entry.target === revealRef.current) setRevealVisible(true);
            if (entry.target === galleryRef.current) setGalleryVisible(true);
          }
        });
      },
      { threshold: 0.2 }
    );
    if (revealRef.current) observer.observe(revealRef.current);
    if (galleryRef.current) observer.observe(galleryRef.current);
    return () => observer.disconnect();
  }, []);

  const handleLetterClick = () => {
    setLetterOpened(true);
  };

  const handleYesClick = () => {
    const newConfetti = Array.from({ length: 100 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      color: CONFETTI_COLORS[Math.floor(Math.random() * CONFETTI_COLORS.length)],
      duration: 2 + Math.random() * 3,
      delay: Math.random() * 1.5,
      size: 6 + Math.random() * 14,
      shape: Math.random() > 0.5 ? 'square' : 'circle',
      emoji: Math.random() > 0.6 ? ['💖', '💕', '✨', '🌸', '💗', '🐱', '🎀', '🌹', '🌻'][Math.floor(Math.random() * 9)] : null,
    }));
    setConfetti(newConfetti);
    setShowCelebration(true);
  };

  const scrollToGallery = () => {
    galleryRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      <div className="scanline-overlay" />

      <div className="sparkle-field">
        {sparkles.map((s) => (
          <div
            key={s.id}
            className="sparkle-dot"
            style={{
              left: `${s.left}%`,
              top: `${s.top}%`,
              animationDelay: `${s.delay}s`,
              animationDuration: `${s.duration}s`,
              width: `${s.size}px`,
              height: `${s.size}px`,
            }}
          />
        ))}
      </div>

      <div className="floating-elements">
        {floatingElements.map((el) => (
          <div
            key={el.id}
            className="pixel-float"
            style={{
              left: `${el.left}%`,
              animationDuration: `${el.duration}s`,
              animationDelay: `${el.delay}s`,
              fontSize: `${el.size}rem`,
            }}
          >
            {el.emoji}
          </div>
        ))}
      </div>

      <div className="main-container">
        {/* ===== SECTION 1: HERO ===== */}
        <section className="hero-section">
          <div className="hero-bg">
            <Image
              src="/art/stairway.png"
              alt="Stairway to the sky"
              fill
              style={{ objectFit: 'cover' }}
              priority
            />
            <div className="hero-bg-overlay" />
          </div>

          <div className="pixel-heart-container">
            <div className="pixel-heart">💖</div>
          </div>

          <div className="message-card">
            <div className="card-sparkle card-sparkle-1">✦</div>
            <div className="card-sparkle card-sparkle-2">✦</div>
            <div className="card-sparkle card-sparkle-3">✧</div>
            <h2>✦ A Little Note For You ✦</h2>
            <p className="message-text">
              We just met yesterday, and yes, it was a little awkward — but honestly,
              I loved every moment of it. The way you smile, the little pauses,
              even the awkwardness… it all fascinated me. I&apos;d really like to explore
              more of who you are, to spend more time together and see where this goes.
            </p>
          </div>

          <div className="scroll-hint" onClick={scrollToGallery} role="button" tabIndex={0}>
            <span className="scroll-arrow">▼</span>
            <span className="scroll-label">scroll down</span>
          </div>
        </section>

        {/* ===== SECTION 2: ART GALLERY ===== */}
        <section className="gallery-section" ref={galleryRef}>
          <h2 className={`gallery-title ${galleryVisible ? 'visible' : ''}`}>
            I&apos;ve been looking at your art and...
            <span className="gallery-wow">wow 🎨</span>
          </h2>

          <div className={`gallery-grid ${galleryVisible ? 'visible' : ''}`}>
            {ART_GALLERY.map((art, i) => (
              <div
                key={art.src}
                className="polaroid-card"
                style={{
                  '--tilt': `${art.tilt}deg`,
                  '--delay': `${i * 0.12}s`,
                }}
              >
                <div className="polaroid-img-wrap">
                  <Image
                    src={art.src}
                    alt={art.alt}
                    width={400}
                    height={400}
                    style={{ objectFit: 'cover', width: '100%', height: '100%' }}
                  />
                </div>
                <p className="polaroid-label">{art.alt}</p>
              </div>
            ))}
          </div>

          <p className={`gallery-caption ${galleryVisible ? 'visible' : ''}`}>
            You&apos;re ridiculously talented ✨
          </p>
        </section>

        {/* ===== SECTION 3: CATS WITH LETTER → HER FLOWER ART ===== */}
        <section className="reveal-section" ref={revealRef}>
          {!letterOpened ? (
            <div className={`cat-letter-scene ${revealVisible ? 'visible' : ''}`}>
              <div className="us-label">Us? 💕</div>
              <div className="cat-with-letter" onClick={handleLetterClick} role="button" tabIndex={0}>
                <div className="cat-couple-image">
                  <Image
                    src="/art/cat-couple.png"
                    alt="Cat couple"
                    width={350}
                    height={350}
                    style={{ objectFit: 'contain' }}
                  />
                </div>
                <div className="letter-on-cats">
                  <div className="letter-icon">💌</div>
                </div>
              </div>
              <p className="click-hint">
                <span className="click-hint-arrow">👆</span>
                tap the letter!
              </p>
            </div>
          ) : (
            <div className="bouquet-reveal">
              {/* Her actual pixel art flowers — displayed big and beautiful */}
              <div className="flower-art-frame">
                <Image
                  src="/art/flowers.png"
                  alt="Beautiful pixel art flowers"
                  width={450}
                  height={450}
                  style={{ objectFit: 'contain', imageRendering: 'pixelated' }}
                  priority
                />
              </div>

              <h2 className="bouquet-question">
                So… will you<br />be my Valentine? 💖
              </h2>

              <button className="yes-button" onClick={handleYesClick}>
                Yes!
              </button>
            </div>
          )}
        </section>
      </div>

      {/* ===== CELEBRATION OVERLAY ===== */}
      {showCelebration && (
        <>
          <div className="confetti-container">
            {confetti.map((c) => (
              <div
                key={c.id}
                className="confetti-piece"
                style={{
                  left: `${c.left}%`,
                  animationDuration: `${c.duration}s`,
                  animationDelay: `${c.delay}s`,
                  width: c.emoji ? 'auto' : `${c.size}px`,
                  height: c.emoji ? 'auto' : `${c.size}px`,
                  background: c.emoji ? 'transparent' : c.color,
                  borderRadius: c.shape === 'circle' ? '50%' : '0',
                  fontSize: c.emoji ? '2rem' : 'inherit',
                }}
              >
                {c.emoji || ''}
              </div>
            ))}
          </div>

          <div className="celebration-section">
            <div className="celebration-art">
              <Image
                src="/art/calico-cat.png"
                alt="Cute calico cat"
                width={200}
                height={200}
                style={{ objectFit: 'contain', borderRadius: '12px' }}
              />
            </div>
            <div className="celebration-heart">💖</div>
            <h1 className="celebration-title">
              Yaaay!! 🎉
            </h1>
            <p className="celebration-message">
              You just made me the happiest person ever!
              I can&apos;t wait to create beautiful memories together.
              This is going to be amazing! 💕
            </p>
            <div className="celebration-art-row">
              <Image src="/art/purple-cat.png" alt="Purple cat" width={100} height={100} style={{ objectFit: 'contain', borderRadius: '8px' }} />
              <span className="celebration-cats">🐱 💕 🐱</span>
              <Image src="/art/pink-cat.png" alt="Pink cat" width={100} height={100} style={{ objectFit: 'contain', borderRadius: '8px' }} />
            </div>
          </div>
        </>
      )}
    </>
  );
}
