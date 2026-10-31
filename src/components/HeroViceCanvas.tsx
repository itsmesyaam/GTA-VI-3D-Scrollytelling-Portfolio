'use client';

import React, { useEffect, useRef, useState, useCallback } from 'react';
import * as THREE from 'three';
import { Volume2, VolumeX, Shield, Play, ChevronDown } from 'lucide-react';
import { HERO_IDENTITY } from '../data/portfolioData';

interface HeroViceCanvasProps {
  activeSector: string;
  onExploreClick: () => void;
}

export const HeroViceCanvas: React.FC<HeroViceCanvasProps> = ({
  activeSector,
  onExploreClick,
}) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const [hasEntered, setHasEntered] = useState<boolean>(false);
  const [audioEnabled, setAudioEnabled] = useState<boolean>(false);
  const audioContextRef = useRef<AudioContext | null>(null);
  const synthNodesRef = useRef<{
    oscillators: OscillatorNode[];
    gainNode: GainNode | null;
    filterNode: BiquadFilterNode | null;
  }>({
    oscillators: [],
    gainNode: null,
    filterNode: null,
  });

  // Three.js References for clean disposal
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const animationFrameId = useRef<number | null>(null);
  const targetCameraPos = useRef<THREE.Vector3>(new THREE.Vector3(0, 15, 28));
  const currentCameraPos = useRef<THREE.Vector3>(new THREE.Vector3(0, 15, 28));

  // Audio Synthesizer: Procedural Vice City Sunset Pad (Web Audio API)
  const initSynthAudio = useCallback(() => {
    try {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (!AudioCtx) return;

      if (!audioContextRef.current) {
        audioContextRef.current = new AudioCtx();
      }

      const ctx = audioContextRef.current;
      if (ctx.state === 'suspended') {
        ctx.resume();
      }

      // Master Gain
      const masterGain = ctx.createGain();
      masterGain.gain.setValueAtTime(0.001, ctx.currentTime);
      masterGain.gain.exponentialRampToValueAtTime(0.08, ctx.currentTime + 3);

      // Lowpass Filter to create warm retro analog feel
      const filter = ctx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(450, ctx.currentTime);
      filter.Q.setValueAtTime(3.5, ctx.currentTime);

      // Filter LFO for slow ambient sweep
      const lfo = ctx.createOscillator();
      lfo.frequency.setValueAtTime(0.12, ctx.currentTime);
      const lfoGain = ctx.createGain();
      lfoGain.gain.setValueAtTime(180, ctx.currentTime);
      lfo.connect(lfoGain);
      lfoGain.connect(filter.frequency);
      lfo.start();

      // D Minor 9th chord frequencies: D2, A2, F3, C4, E4
      const frequencies = [73.42, 110.0, 174.61, 261.63, 329.63];
      const oscs: OscillatorNode[] = [];

      frequencies.forEach((freq, idx) => {
        const osc = ctx.createOscillator();
        const detuneAmount = (idx - 2) * 5.5; // Chorus detuning
        osc.type = idx % 2 === 0 ? 'sawtooth' : 'triangle';
        osc.frequency.setValueAtTime(freq, ctx.currentTime);
        osc.detune.setValueAtTime(detuneAmount, ctx.currentTime);

        const subGain = ctx.createGain();
        subGain.gain.setValueAtTime(0.25 / frequencies.length, ctx.currentTime);

        osc.connect(subGain);
        subGain.connect(filter);
        osc.start();
        oscs.push(osc);
      });

      filter.connect(masterGain);
      masterGain.connect(ctx.destination);

      synthNodesRef.current = {
        oscillators: oscs,
        gainNode: masterGain,
        filterNode: filter,
      };
      setAudioEnabled(true);
    } catch (e) {
      console.warn('Web Audio API not allowed before user interaction', e);
    }
  }, []);

  const toggleAudio = () => {
    if (!audioEnabled) {
      initSynthAudio();
    } else {
      if (synthNodesRef.current.gainNode && audioContextRef.current) {
        synthNodesRef.current.gainNode.gain.setTargetAtTime(0.0001, audioContextRef.current.currentTime, 0.4);
      }
      setAudioEnabled(false);
    }
  };

  // Spline target position calculation based on active sector
  useEffect(() => {
    switch (activeSector) {
      case '01-hq':
        targetCameraPos.current.set(0, 14, 28);
        break;
      case '02-arsenal':
        targetCameraPos.current.set(-14, 10, 14);
        break;
      case '03-heists':
        targetCameraPos.current.set(16, 12, -2);
        break;
      case '04-track-record':
        targetCameraPos.current.set(-10, 8, -18);
        break;
      case '05-comms':
        targetCameraPos.current.set(0, 4, -32);
        break;
      default:
        targetCameraPos.current.set(0, 14, 28);
    }
  }, [activeSector]);

  // Three.js Scene Setup & Disposal Lifecycle
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // Check motion preferences
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // Scene
    const scene = new THREE.Scene();
    sceneRef.current = scene;
    scene.fog = new THREE.FogExp2(0x07070c, 0.024);

    // Camera
    const camera = new THREE.PerspectiveCamera(
      60,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.set(0, 15, 28);
    cameraRef.current = camera;

    // Renderer
    const renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance',
    });
    rendererRef.current = renderer;
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.2;

    // 1. Synthwave Grid Floor
    const gridHelper = new THREE.GridHelper(180, 70, 0x00f0ff, 0xff2a85);
    gridHelper.position.y = -2;
    // Lower opacity on grid
    if (gridHelper.material instanceof THREE.Material) {
      gridHelper.material.transparent = true;
      gridHelper.material.opacity = 0.45;
    }
    scene.add(gridHelper);

    // 2. Leonida Sunset Sun
    const sunGeometry = new THREE.CircleGeometry(16, 64);
    const sunMaterial = new THREE.ShaderMaterial({
      uniforms: {
        colorTop: { value: new THREE.Color(0xff8a00) },
        colorBottom: { value: new THREE.Color(0xff2a85) },
      },
      vertexShader: `
        varying vec2 vUv;
        void main() {
          vUv = uv;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        uniform vec3 colorTop;
        uniform vec3 colorBottom;
        varying vec2 vUv;
        void main() {
          // Horizontal blind strips
          float stripe = sin(vUv.y * 70.0);
          if (vUv.y < 0.6 && stripe > 0.4) {
            discard;
          }
          vec3 col = mix(colorBottom, colorTop, vUv.y);
          gl_FragColor = vec4(col, 0.95);
        }
      `,
      transparent: true,
      side: THREE.DoubleSide,
    });
    const sunMesh = new THREE.Mesh(sunGeometry, sunMaterial);
    sunMesh.position.set(0, 18, -90);
    scene.add(sunMesh);

    // 3. Low-Poly Neon Skyline Monoliths
    const buildingsGroup = new THREE.Group();
    const buildingGeom = new THREE.BoxGeometry(1, 1, 1);
    const buildingMat = new THREE.MeshBasicMaterial({
      color: 0x0c0e16,
      wireframe: false,
    });

    const wireframeMatCyan = new THREE.LineBasicMaterial({
      color: 0x00f0ff,
      transparent: true,
      opacity: 0.5,
    });
    const wireframeMatMagenta = new THREE.LineBasicMaterial({
      color: 0xff2a85,
      transparent: true,
      opacity: 0.5,
    });

    const buildingCount = 45;
    for (let i = 0; i < buildingCount; i++) {
      const height = THREE.MathUtils.randFloat(8, 32);
      const width = THREE.MathUtils.randFloat(3, 7);
      const depth = THREE.MathUtils.randFloat(3, 7);
      const x = (i % 2 === 0 ? 1 : -1) * THREE.MathUtils.randFloat(18, 55);
      const z = THREE.MathUtils.randFloat(-70, 20);

      const building = new THREE.Mesh(buildingGeom, buildingMat);
      building.scale.set(width, height, depth);
      building.position.set(x, height / 2 - 2, z);

      // Wireframe edges
      const edges = new THREE.EdgesGeometry(buildingGeom);
      const wireframe = new THREE.LineSegments(
        edges,
        i % 2 === 0 ? wireframeMatCyan : wireframeMatMagenta
      );
      wireframe.scale.set(width, height, depth);
      wireframe.position.copy(building.position);

      buildingsGroup.add(building);
      buildingsGroup.add(wireframe);
    }
    scene.add(buildingsGroup);

    // Mouse Parallax
    let mouseX = 0;
    let mouseY = 0;
    const handleMouseMove = (e: MouseEvent) => {
      mouseX = (e.clientX / window.innerWidth - 0.5) * 2;
      mouseY = (e.clientY / window.innerHeight - 0.5) * 2;
    };
    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    // Handle Window Resize
    const handleResize = () => {
      if (!cameraRef.current || !rendererRef.current) return;
      cameraRef.current.aspect = window.innerWidth / window.innerHeight;
      cameraRef.current.updateProjectionMatrix();
      rendererRef.current.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener('resize', handleResize);

    // Animation Render Loop
    let clock = new THREE.Clock();
    const animate = () => {
      const delta = clock.getDelta();
      const elapsedTime = clock.getElapsedTime();

      // Slow scroll effect on grid
      if (!prefersReducedMotion) {
        gridHelper.position.z = (elapsedTime * 6) % 2.5;

        // Smooth camera lerp along spline targets
        currentCameraPos.current.lerp(targetCameraPos.current, 0.04);
        camera.position.x = currentCameraPos.current.x + mouseX * 1.5;
        camera.position.y = currentCameraPos.current.y - mouseY * 1.2;
        camera.position.z = currentCameraPos.current.z;

        // Camera looks ahead into distance
        camera.lookAt(0, 4, currentCameraPos.current.z - 30);
      }

      renderer.render(scene, camera);
      animationFrameId.current = requestAnimationFrame(animate);
    };

    animate();
    setIsLoaded(true);

    // Strict WebGL Asset Disposal Lifecycle
    return () => {
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
      }
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);

      // Dispose Geometries and Materials
      gridHelper.geometry.dispose();
      sunGeometry.dispose();
      sunMaterial.dispose();
      buildingGeom.dispose();
      buildingMat.dispose();
      wireframeMatCyan.dispose();
      wireframeMatMagenta.dispose();

      // Clean Scene Children
      buildingsGroup.clear();
      scene.clear();

      // Dispose WebGL Context
      renderer.dispose();
      renderer.forceContextLoss();

      // Halt Synth Audio
      if (audioContextRef.current && audioContextRef.current.state !== 'closed') {
        audioContextRef.current.close().catch(() => {});
      }
    };
  }, []);

  const handleEnterLeonida = () => {
    setHasEntered(true);
    initSynthAudio();
    onExploreClick();
  };

  return (
    <div
      ref={containerRef}
      className="relative w-full h-screen overflow-hidden bg-[#07070C] select-none"
    >
      {/* 3D WebGL Canvas Layer */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 z-0 w-full h-full pointer-events-none"
      />

      {/* Retro Scanline / CRT Vignette Overlay */}
      <div className="absolute inset-0 z-[1] pointer-events-none bg-[radial-gradient(circle_at_center,transparent_0%,rgba(7,7,12,0.85)_85%)]" />
      <div className="absolute inset-0 z-[1] pointer-events-none bg-[linear-gradient(rgba(0,240,255,0.02)_1px,transparent_1px)] bg-[size:100%_4px]" />

      {/* Theatrical Rockstar Preloader & Intro Modal */}
      {!hasEntered && (
        <div className="absolute inset-0 z-50 flex flex-col items-center justify-center bg-[#07070C]/95 backdrop-blur-2xl px-6 transition-all duration-700">
          <div className="relative max-w-xl w-full p-8 rounded-none border border-[#00F0FF]/30 bg-[#0C0E16]/90 shadow-[0_0_50px_rgba(255,42,133,0.25)] text-center clip-notch">
            {/* Top Bar Indicator */}
            <div className="flex items-center justify-between border-b border-white/10 pb-3 mb-6">
              <span className="font-mono text-xs uppercase tracking-[0.25em] text-[#00F0FF] flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#10FFA0] animate-ping" />
                SECURE SATELLITE UPLINK // LEONIDA SECTOR
              </span>
              <span className="font-mono text-xs text-[#FF2A85] border border-[#FF2A85]/40 px-2 py-0.5">
                V2.6 VERIFIED
              </span>
            </div>

            {/* Pulsing Palm Silhouette & Rockstar Logo Motif */}
            <div className="mx-auto mb-6 w-24 h-24 relative flex items-center justify-center">
              <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-[#FF2A85] via-[#FF8A00] to-[#00F0FF] opacity-30 blur-xl animate-pulse" />
              {/* Palm Silhouette SVG */}
              <svg
                viewBox="0 0 100 100"
                className="w-20 h-20 fill-[#FF2A85] drop-shadow-[0_0_15px_#FF2A85]"
              >
                <path d="M50 90 C 49 65 47 45 48 35 C 44 28 35 25 20 28 C 30 35 38 42 45 48 C 30 45 15 50 8 60 C 22 58 35 55 46 54 C 47 62 48 78 50 90 Z" />
                <path d="M52 35 C 56 28 65 25 80 28 C 70 35 62 42 55 48 C 70 45 85 50 92 60 C 78 58 65 55 54 54 C 53 62 52 78 50 90 C 51 65 53 45 52 35 Z" />
                <path d="M50 35 C 50 20 45 8 38 2 C 45 10 48 20 50 35 Z" />
                <path d="M50 35 C 50 20 55 8 62 2 C 55 10 52 20 50 35 Z" />
              </svg>
            </div>

            {/* Typography */}
            <h1 className="font-display text-5xl md:text-6xl uppercase tracking-wider text-white font-extrabold mb-2 drop-shadow-[0_4px_20px_rgba(255,42,133,0.6)]">
              SYAM S
            </h1>
            <p className="font-mono text-sm uppercase tracking-[0.2em] text-[#00F0FF] mb-4">
              TECHNICAL PROJECT MANAGER & SYSTEMS ARCHITECT
            </p>
            <p className="text-gray-300 text-sm leading-relaxed mb-8 font-sans px-4">
              {HERO_IDENTITY.executivePositioning.slice(0, 185)}...
            </p>

            {/* Enter Button with Sound Toggle Trigger */}
            <div className="flex flex-col sm:flex-row gap-4 items-center justify-center">
              <button
                onClick={handleEnterLeonida}
                className="w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-[#FF2A85] via-[#FF8A00] to-[#00F0FF] text-white font-display text-xl uppercase tracking-widest font-bold shadow-[0_0_30px_rgba(255,42,133,0.5)] hover:shadow-[0_0_45px_rgba(0,240,255,0.8)] transition-all duration-300 transform hover:-translate-y-0.5 active:translate-y-0"
              >
                ENTER LEONIDA // 3D DOSSIER
              </button>
            </div>

            <div className="mt-6 flex items-center justify-center gap-6 text-xs font-mono text-gray-400">
              <span className="flex items-center gap-1.5">
                <Shield className="w-3.5 h-3.5 text-[#00F0FF]" />
                Zero-Trust Hardened
              </span>
              <span>•</span>
              <span className="text-[#10FFA0]">60 FPS Spatial Depth</span>
              <span>•</span>
              <span>Sub-Second Vitals</span>
            </div>
          </div>
        </div>
      )}

      {/* Floating Audio Ambient Synth Controller */}
      <div className="absolute top-6 left-6 z-30 flex items-center gap-3">
        <button
          onClick={toggleAudio}
          className="flex items-center gap-2 px-3 py-1.5 bg-[#0C0E16]/80 backdrop-blur-md border border-[#00F0FF]/30 text-[#00F0FF] font-mono text-xs uppercase hover:border-[#FF2A85] transition-colors"
          title="Toggle Leonida Ambient Synthwave Shimmer"
        >
          {audioEnabled ? (
            <>
              <Volume2 className="w-4 h-4 text-[#10FFA0] animate-pulse" />
              <span>SYNTH AUDIO: ON</span>
            </>
          ) : (
            <>
              <VolumeX className="w-4 h-4 text-gray-400" />
              <span>SYNTH AUDIO: OFF</span>
            </>
          )}
        </button>
      </div>

      {/* Hero Foreground Content Overlay */}
      {hasEntered && (
        <div className="absolute inset-0 z-10 flex flex-col justify-between p-6 sm:p-12 pointer-events-none">
          {/* Top Title Telemetry */}
          <div className="max-w-2xl mt-16 pointer-events-auto">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#FF2A85]/20 border border-[#FF2A85]/50 text-[#FF2A85] font-mono text-xs uppercase tracking-widest mb-4">
              <span className="w-2 h-2 rounded-full bg-[#FF2A85] animate-ping" />
              PORTFOLIO // LEONIDA STATE CLEARANCE
            </div>
            <h1 className="font-display text-6xl sm:text-7xl lg:text-8xl font-black uppercase text-white tracking-wide leading-none drop-shadow-[0_10px_35px_rgba(255,42,133,0.4)]">
              SYAM S
            </h1>
            <p className="font-mono text-base sm:text-lg text-[#00F0FF] mt-2 tracking-widest uppercase">
              TECHNICAL PROJECT MANAGER // SYSTEMS ARCHITECT
            </p>
            <p className="mt-4 text-sm sm:text-base text-gray-300 font-sans max-w-xl leading-relaxed">
              Bridges deep full-stack engineering competency (Python, React, SQL, Cloud CI/CD) with structured Agile delivery, developer-ready PRD/BRD specifications, and 40% release velocity acceleration.
            </p>
          </div>

          {/* Bottom Telemetry & Scroll Cue */}
          <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-6 pointer-events-auto">
            <div className="flex items-center gap-4 bg-[#0C0E16]/80 backdrop-blur-md border border-[#00F0FF]/30 p-4 clip-notch">
              <div>
                <div className="font-mono text-[10px] uppercase text-gray-400 tracking-wider">
                  CURRENT COORDINATE SECTOR
                </div>
                <div className="font-mono text-sm font-bold text-[#00F0FF] uppercase">
                  SECTOR {activeSector.toUpperCase()}
                </div>
              </div>
              <div className="h-8 w-[1px] bg-white/20" />
              <div>
                <div className="font-mono text-[10px] uppercase text-gray-400 tracking-wider">
                  BASE OF OPS
                </div>
                <div className="font-mono text-sm font-bold text-[#FF8A00] uppercase">
                  KOCHI, KERALA [IST]
                </div>
              </div>
            </div>

            <button
              onClick={onExploreClick}
              className="flex items-center gap-2 px-6 py-3 bg-[#0C0E16]/90 border border-[#FF2A85] text-white font-mono text-xs uppercase tracking-widest hover:bg-[#FF2A85]/20 hover:shadow-[0_0_20px_#FF2A85] transition-all"
            >
              <span>DESCEND TO ARSENAL & MISSIONS</span>
              <ChevronDown className="w-4 h-4 text-[#FF2A85] animate-bounce" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
