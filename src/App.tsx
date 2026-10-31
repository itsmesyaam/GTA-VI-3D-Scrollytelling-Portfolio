import React, { useEffect, useRef, useState, useCallback } from 'react';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import { SceneManager } from './three/SceneManager';
import { GpuPreloader } from './components/GpuPreloader';
import { FilmBar } from './components/FilmBar';
import { ChaptersMenu, CHAPTERS } from './components/ChaptersMenu';
import { CinematicScrubber } from './components/CinematicScrubber';
import { ChapterOverlays } from './components/ChapterOverlays';
import { CustomCursor } from './components/CustomCursor';
import { soundEngine } from './audio/soundEngine';

gsap.registerPlugin(ScrollTrigger);

export const App: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const sceneManagerRef = useRef<SceneManager | null>(null);
  const lenisRef = useRef<Lenis | null>(null);
  const animationFrameId = useRef<number | null>(null);

  const [hasEnteredFilm, setHasEnteredFilm] = useState<boolean>(false);
  const [scrollProgress, setScrollProgress] = useState<number>(0);
  const [currentChapterIndex, setCurrentChapterIndex] = useState<number>(0);
  const [isChaptersOpen, setIsChaptersOpen] = useState<boolean>(false);

  // Mouse Parallax coordinates (-1.0 to 1.0)
  const mouseCoords = useRef<{ x: number; y: number }>({ x: 0, y: 0 });

  // 1. Initialize Three.js Scene
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const sceneManager = new SceneManager({ canvas });
    sceneManagerRef.current = sceneManager;

    const handleResize = () => {
      sceneManager.handleResize();
      ScrollTrigger.refresh();
    };

    const handleMouseMove = (e: MouseEvent) => {
      mouseCoords.current.x = (e.clientX / window.innerWidth - 0.5) * 2;
      mouseCoords.current.y = (e.clientY / window.innerHeight - 0.5) * 2;
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      sceneManager.destroy();
    };
  }, []);

  // 2. Initialize Lenis Smooth Scrolling and GSAP ScrollTrigger
  useEffect(() => {
    if (!hasEnteredFilm) return;

    const lenis = new Lenis({
      duration: 1.4,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      smoothWheel: true,
    });
    lenisRef.current = lenis;

    // Connect Lenis to GSAP ScrollTrigger
    lenis.on('scroll', ScrollTrigger.update);

    // Continuous Animation Frame Loop
    const raf = (time: number) => {
      lenis.raf(time);

      if (sceneManagerRef.current) {
        sceneManagerRef.current.update(
          scrollProgress,
          mouseCoords.current.x,
          mouseCoords.current.y
        );
      }

      animationFrameId.current = requestAnimationFrame(raf);
    };

    animationFrameId.current = requestAnimationFrame(raf);

    // GSAP ScrollTrigger for 9 Screenplay Chapters
    const st = ScrollTrigger.create({
      trigger: '#film-scroll-container',
      start: 'top top',
      end: 'bottom bottom',
      scrub: 0.5,
      onUpdate: (self) => {
        const progress = self.progress;
        setScrollProgress(progress);

        // Map progress (0.0 to 1.0) to 9 Chapters (0 to 8)
        const chapterIdx = Math.min(8, Math.floor(progress * 9));
        setCurrentChapterIndex(chapterIdx);
      },
    });

    return () => {
      if (animationFrameId.current) cancelAnimationFrame(animationFrameId.current);
      lenis.destroy();
      st.kill();
    };
  }, [hasEnteredFilm, scrollProgress]);

  // Handle seeking to specific chapter
  const handleScrollToChapter = useCallback((index: number) => {
    const targetElement = document.getElementById(CHAPTERS[index].id);
    if (targetElement && lenisRef.current) {
      lenisRef.current.scrollTo(targetElement, { offset: 0, duration: 1.6 });
    } else if (targetElement) {
      targetElement.scrollIntoView({ behavior: 'smooth' });
    }
  }, []);

  const currentChapterSlug = CHAPTERS[currentChapterIndex]?.slugline || CHAPTERS[0].slugline;

  return (
    <div className="relative w-full bg-[#05050A] text-white overflow-hidden">
      {/* Interactive HUD Reticle Cursor */}
      <CustomCursor />

      {/* Full-Viewport Fixed Three.js WebGL Canvas */}
      <canvas
        ref={canvasRef}
        className="fixed inset-0 w-screen h-screen z-0 pointer-events-none"
        style={{ width: '100vw', height: '100vh' }}
      />

      {/* GPU Preloader Overlay */}
      {!hasEnteredFilm && (
        <GpuPreloader
          onEnter={() => {
            setHasEnteredFilm(true);
            soundEngine.toggleMute(); // Start ambient pad
          }}
        />
      )}

      {/* Fixed Top Film Bar */}
      <FilmBar
        currentChapterSlug={currentChapterSlug}
        isChaptersOpen={isChaptersOpen}
        onToggleChapters={() => setIsChaptersOpen((prev) => !prev)}
      />

      {/* Slide-Out Chapters Screenplay Index */}
      <ChaptersMenu
        isOpen={isChaptersOpen}
        currentChapterIndex={currentChapterIndex}
        onClose={() => setIsChaptersOpen(false)}
        onSelectChapter={handleScrollToChapter}
      />

      {/* Fixed Bottom Film Scrubber & Letterbox Vignettes */}
      <CinematicScrubber
        scrollProgress={scrollProgress}
        currentChapterIndex={currentChapterIndex}
        onSeekChapter={handleScrollToChapter}
      />

      {/* Continuous 9-Chapter Scrollable Screenplay Container */}
      <div id="film-scroll-container" className="relative z-10 w-full">
        <ChapterOverlays
          currentChapterIndex={currentChapterIndex}
          onScrollToChapter={handleScrollToChapter}
        />
      </div>
    </div>
  );
};

export default App;
