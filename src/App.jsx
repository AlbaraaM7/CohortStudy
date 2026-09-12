import React, { useState, useEffect } from 'react';
import {
  Users,
  Flame,
  CheckCircle2,
  Calendar,
  Clock,
  BookOpen,
  ArrowRight,
  ShieldCheck,
  Plus,
  Sparkles,
  Search,
  HelpCircle,
  ChevronDown,
  Quote,
  Compass,
  X,
  SlidersHorizontal,
} from 'lucide-react';

import BorderGlow from './components/BorderGlow';
import ModalCards from './components/ModalCards';
import ComparisonSlider from './components/ComparisonSlider';
import ScrollStack from './components/ScrollStack';
import LogoLoop from './components/LogoLoop';
import ScrollFloat from './components/ScrollFloat';
import PaletteSwitcher from './components/PaletteSwitcher';
import TutorialWalkthrough from './components/TutorialWalkthrough';
import CreatePodModal from './components/CreatePodModal';
import ProblemSolutionPage from './pages/ProblemSolutionPage';
import { INITIAL_PODS } from './data/samplePods';
import { PALETTES } from './data/palettes';

export default function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [pods, setPods] = useState(INITIAL_PODS);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('streak'); // 'streak' | 'urgency' | 'spots'
  const [createPodPrefill, setCreatePodPrefill] = useState('');
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isTutorialOpen, setIsTutorialOpen] = useState(false);
  const [openFaqIndex, setOpenFaqIndex] = useState(null);
  const [activePaletteId, setActivePaletteId] = useState(() => {
    return localStorage.getItem('cohort_palette') || 'ember';
  });

  const activePalette = PALETTES.find((p) => p.id === activePaletteId) || PALETTES[0];

  // Apply palette variables to document
  useEffect(() => {
    const root = document.documentElement;
    Object.entries(activePalette.variables).forEach(([key, val]) => {
      root.style.setProperty(key, val);
    });
    localStorage.setItem('cohort_palette', activePaletteId);
  }, [activePaletteId, activePalette]);

  // Sync with URL hash for navigation
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash;
      if (hash === '#/problem-solution') {
        setCurrentPage('problem-solution');
        window.scrollTo(0, 0);
      } else {
        setCurrentPage('home');
      }
    };

    handleHashChange();
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  // First-run tutorial check
  useEffect(() => {
    const tutorialDismissed = sessionStorage.getItem('cohort_tutorial_dismissed');
    if (!tutorialDismissed && currentPage === 'home') {
      const timer = setTimeout(() => {
        setIsTutorialOpen(true);
      }, 750);
      return () => clearTimeout(timer);
    }
  }, [currentPage]);

  const navigateTo = (page) => {
    if (page === 'problem-solution') {
      window.location.hash = '#/problem-solution';
    } else {
      window.location.hash = '';
    }
  };

  const handleCreatePod = (newPod) => {
    setPods((prev) => [newPod, ...prev]);
  };

  const handleResetTutorial = () => {
    sessionStorage.removeItem('cohort_tutorial_dismissed');
    setIsTutorialOpen(true);
  };

  // Filter pods by search & category
  const categories = ['All', 'Computer Science', 'Economics', 'Biology', 'Mathematics', 'Chemistry', 'Psychology'];

  const filteredPods = pods
    .filter((pod) => {
      const matchesCategory = selectedCategory === 'All' || pod.category === selectedCategory;
      const matchesSearch =
        pod.courseCode.toLowerCase().includes(searchQuery.toLowerCase()) ||
        pod.courseTitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (pod.campus && pod.campus.toLowerCase().includes(searchQuery.toLowerCase())) ||
        pod.style.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    })
    .sort((a, b) => {
      if (sortBy === 'streak') {
        return b.streakDays - a.streakDays;
      }
      if (sortBy === 'spots') {
        const spotsA = a.capacity - a.members.length;
        const spotsB = b.capacity - b.members.length;
        return spotsB - spotsA;
      }
      if (sortBy === 'urgency') {
        return a.examDate.localeCompare(b.examDate);
      }
      return 0;
    });

  // University course logo items for LogoLoop
  const courseLogos = [
    {
      node: (
        <div className="flex items-center gap-2.5 px-4 py-2.5 rounded-2xl bg-panel border border-panel-border text-xs font-mono text-secondary hover:text-primary hover:border-accent/40 transition-colors shadow-sm">
          <span className="w-2.5 h-2.5 rounded-full bg-orange-500 shrink-0" />
          <span className="font-bold text-primary font-display text-sm">RIT Dubai</span>
          <span className="text-secondary/80">GCIS 123 & MATH 182</span>
        </div>
      ),
      title: 'RIT Dubai Computing & Engineering',
    },
    {
      node: (
        <div className="flex items-center gap-2.5 px-4 py-2.5 rounded-2xl bg-panel border border-panel-border text-xs font-mono text-secondary hover:text-primary hover:border-accent/40 transition-colors shadow-sm">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 shrink-0" />
          <span className="font-bold text-primary font-display text-sm">AUS</span>
          <span className="text-secondary/80">COE 221 & MTH 205</span>
        </div>
      ),
      title: 'American University of Sharjah',
    },
    {
      node: (
        <div className="flex items-center gap-2.5 px-4 py-2.5 rounded-2xl bg-panel border border-panel-border text-xs font-mono text-secondary hover:text-primary hover:border-accent/40 transition-colors shadow-sm">
          <span className="w-2.5 h-2.5 rounded-full bg-accent shrink-0" />
          <span className="font-bold text-primary font-display text-sm">Stanford</span>
          <span className="text-secondary/80">CS 106B & EE 180</span>
        </div>
      ),
      title: 'Stanford CS & EE',
    },
    {
      node: (
        <div className="flex items-center gap-2.5 px-4 py-2.5 rounded-2xl bg-panel border border-panel-border text-xs font-mono text-secondary hover:text-primary hover:border-accent/40 transition-colors shadow-sm">
          <span className="w-2.5 h-2.5 rounded-full bg-amber-400 shrink-0" />
          <span className="font-bold text-primary font-display text-sm">MIT</span>
          <span className="text-secondary/80">6.006 & 18.06 Linear Alg</span>
        </div>
      ),
      title: 'MIT EECS & Math',
    },
    {
      node: (
        <div className="flex items-center gap-2.5 px-4 py-2.5 rounded-2xl bg-panel border border-panel-border text-xs font-mono text-secondary hover:text-primary hover:border-accent/40 transition-colors shadow-sm">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 shrink-0" />
          <span className="font-bold text-primary font-display text-sm">UC Berkeley</span>
          <span className="text-secondary/80">Data 8 & CS 61B</span>
        </div>
      ),
      title: 'UC Berkeley Data 8 & 61B',
    },
    {
      node: (
        <div className="flex items-center gap-2.5 px-4 py-2.5 rounded-2xl bg-panel border border-panel-border text-xs font-mono text-secondary hover:text-primary hover:border-accent/40 transition-colors shadow-sm">
          <span className="w-2.5 h-2.5 rounded-full bg-orange-400 shrink-0" />
          <span className="font-bold text-primary font-display text-sm">Harvard</span>
          <span className="text-secondary/80">Econ 10 & Gov 20</span>
        </div>
      ),
      title: 'Harvard Econ 10 & Gov',
    },
    {
      node: (
        <div className="flex items-center gap-2.5 px-4 py-2.5 rounded-2xl bg-panel border border-panel-border text-xs font-mono text-secondary hover:text-primary hover:border-accent/40 transition-colors shadow-sm">
          <span className="w-2.5 h-2.5 rounded-full bg-pink-400 shrink-0" />
          <span className="font-bold text-primary font-display text-sm">Columbia</span>
          <span className="text-secondary/80">Bio 2005 Pre-Med</span>
        </div>
      ),
      title: 'Columbia Pre-Med & Bio',
    },
    {
      node: (
        <div className="flex items-center gap-2.5 px-4 py-2.5 rounded-2xl bg-panel border border-panel-border text-xs font-mono text-secondary hover:text-primary hover:border-accent/40 transition-colors shadow-sm">
          <span className="w-2.5 h-2.5 rounded-full bg-teal-400 shrink-0" />
          <span className="font-bold text-primary font-display text-sm">Carnegie Mellon</span>
          <span className="text-secondary/80">15-122 Principles of Comp</span>
        </div>
      ),
      title: 'Carnegie Mellon SCS & ECE',
    },
    {
      node: (
        <div className="flex items-center gap-2.5 px-4 py-2.5 rounded-2xl bg-panel border border-panel-border text-xs font-mono text-secondary hover:text-primary hover:border-accent/40 transition-colors shadow-sm">
          <span className="w-2.5 h-2.5 rounded-full bg-purple-400 shrink-0" />
          <span className="font-bold text-primary font-display text-sm">Oxford</span>
          <span className="text-secondary/80">PPE & Organic Chem</span>
        </div>
      ),
      title: 'Oxford PPE & Chemistry',
    },
    {
      node: (
        <div className="flex items-center gap-2.5 px-4 py-2.5 rounded-2xl bg-panel border border-panel-border text-xs font-mono text-secondary hover:text-primary hover:border-accent/40 transition-colors shadow-sm">
          <span className="w-2.5 h-2.5 rounded-full bg-blue-400 shrink-0" />
          <span className="font-bold text-primary font-display text-sm">UCLA</span>
          <span className="text-secondary/80">Psych 100A & Bio 7</span>
        </div>
      ),
      title: 'UCLA Psych & Bio',
    },
  ];

  const faqs = [
    {
      question: 'What happens if a pod member flakes or stops showing up?',
      answer:
        'If a student misses two scheduled sessions in a row without a notice, their slot opens to the waitlist and the remaining members can vote to replace them. Because pods stay small at three to five people, non-attendance is visible immediately.',
    },
    {
      question: 'Is Cohort only for exam week, or can we run pods all semester?',
      answer:
        'While many students form pods ten days before midterms or finals, dozens of cohorts run recurring weekly checkpoints from week one through graduation to keep up with weekly problem sets and readings.',
    },
    {
      question: 'Can I leave a pod or switch groups if my schedule changes?',
      answer:
        'Yes. You can leave a pod at any point from your desk. You will be prompted to leave a short handoff note for your classmates, and you can instantly post for a different time window.',
    },
    {
      question: 'How do quiet focus pods work compared to discussion pods?',
      answer:
        'Quiet focus pods run timed Pomodoro sessions. Members log in, state their target task in chat, mute their microphones, and study alongside each other. Discussion pods are vocal and collaborative, designed for working through problem sets and case studies step by step.',
    },
    {
      question: 'How does the streak counter verify that people actually showed up?',
      answer:
        'When your session window begins, members click a simple one-tap check-in button on the pod desk. When eighty percent of the pod checks in within the first fifteen minutes, the group streak counter increments.',
    },
  ];

  if (currentPage === 'problem-solution') {
    return (
      <>
        <ProblemSolutionPage
          onNavigateHome={() => navigateTo('home')}
          onOpenTutorial={() => setIsTutorialOpen(true)}
          glowColors={activePalette.glowColors}
        />
        <PaletteSwitcher
          activePaletteId={activePaletteId}
          onSelectPalette={setActivePaletteId}
        />
      </>
    );
  }

  return (
    <div className="min-h-screen bg-canvas text-primary selection:bg-accent/30 selection:text-primary">
      {/* 1. STICKY TOP NAVIGATION BAR WITH GENEROUS PADDING */}
      <header className="sticky top-0 z-40 w-full bg-canvas/90 backdrop-blur-md border-b border-panel-border transition-colors">
        <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-12 py-5 sm:py-6 flex items-center justify-between">
          {/* Brand Logo */}
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="flex items-center gap-3.5 group cursor-pointer"
          >
            <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-accent to-amber-500 flex items-center justify-center text-canvas shadow-glow-sm group-hover:scale-105 transition-transform">
              <Users className="w-5 h-5 stroke-[2.5]" />
            </div>
            <div>
              <span className="font-display font-extrabold text-2xl tracking-tight text-primary group-hover:text-accent transition-colors">
                Cohort
              </span>
              <span className="hidden sm:inline-block ml-2.5 text-[11px] font-mono uppercase tracking-widest text-secondary/80">
                Study Pods
              </span>
            </div>
          </a>

          {/* Desktop Nav Links */}
          <nav className="hidden md:flex items-center gap-8 text-sm font-display font-semibold text-secondary">
            <button
              onClick={() => setIsTutorialOpen(true)}
              className="hover:text-accent transition-colors flex items-center gap-2 cursor-pointer py-1"
            >
              <Compass className="w-4 h-4 text-accent" />
              <span>How It Works</span>
            </button>
            <a href="#pods-board" className="hover:text-primary transition-colors py-1">
              Browse Pods
            </a>
            <a href="#comparison" className="hover:text-primary transition-colors py-1">
              Why Cohort
            </a>
            <a href="#faq" className="hover:text-primary transition-colors py-1">
              FAQ
            </a>
            <button
              onClick={() => navigateTo('problem-solution')}
              className="px-4 py-2 rounded-xl bg-panel-card text-accent border border-accent/25 hover:bg-accent/15 transition-all text-xs font-mono font-bold"
            >
              Problem & Solution &rarr;
            </button>
          </nav>

          {/* Action CTAs */}
          <div className="flex items-center gap-4">
            <button
              onClick={() => setIsTutorialOpen(true)}
              className="md:hidden p-3 rounded-2xl bg-panel-card text-accent border border-panel-border"
              title="How it works"
            >
              <Compass className="w-5 h-5" />
            </button>
            <button
              onClick={() => setIsCreateModalOpen(true)}
              className="px-5 sm:px-6 py-3 rounded-xl font-display font-semibold text-xs sm:text-sm bg-accent hover:bg-accent-hover text-canvas transition-all shadow-glow-sm flex items-center gap-2.5 active:scale-95 cursor-pointer"
            >
              <Plus className="w-4 h-4 stroke-[3]" />
              <span>Find a Pod</span>
            </button>
          </div>
        </div>
      </header>

      {/* 2. HERO SECTION WITH EXPANDED SPACIOUS PADDING */}
      <section className="relative pt-16 pb-24 md:pt-28 md:pb-36 overflow-hidden">
        {/* Background glow circle */}
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-accent/10 blur-[140px] rounded-full pointer-events-none" />

        <div className="max-w-5xl mx-auto px-6 sm:px-10 lg:px-12 text-center relative z-10 space-y-9">
          {/* Live Status Pill */}
          <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-panel border border-panel-border text-xs font-mono font-medium shadow-sm">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
            <span className="text-secondary">418 students studying across</span>
            <span className="text-primary font-bold">34 active course pods</span>
            <span className="text-secondary">today</span>
          </div>

          {/* 2-SECOND CLARITY HEADLINE */}
          <h1 className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold text-primary tracking-tight leading-[1.08] max-w-4xl mx-auto">
            Find a study pod for your hardest course before exam week.
          </h1>

          {/* Subheadline */}
          <p className="font-body text-base sm:text-lg md:text-xl text-secondary max-w-2xl mx-auto leading-relaxed">
            Tell us your course code and study style. We match you with 3 to 5 classmates who commit to showing up every day.
          </p>

          {/* Hero CTAs */}
          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-5">
            <button
              id="hero-create-pod-btn"
              onClick={() => setIsCreateModalOpen(true)}
              className="w-full sm:w-auto px-9 py-4 rounded-2xl font-display font-bold text-base bg-accent hover:bg-accent-hover text-canvas transition-all shadow-glow-md flex items-center justify-center gap-2.5 active:scale-95 cursor-pointer"
            >
              <Sparkles className="w-5 h-5 stroke-[2.5]" />
              <span>Find Your Study Pod</span>
            </button>

            <a
              href="#pods-board"
              className="w-full sm:w-auto px-8 py-4 rounded-2xl font-display font-semibold text-base bg-panel hover:bg-panel-hover text-primary border border-panel-border transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>Browse Open Pods</span>
              <ArrowRight className="w-4 h-4 text-secondary" />
            </a>
          </div>

          {/* 3 Value Pillars */}
          <div className="pt-8 grid grid-cols-1 sm:grid-cols-3 gap-5 max-w-3xl mx-auto text-left font-mono text-xs">
            <div className="p-4 rounded-2xl bg-panel/70 border border-panel-border flex items-center gap-3.5">
              <div className="w-9 h-9 rounded-xl bg-accent/15 text-accent flex items-center justify-center shrink-0">
                <Users className="w-4 h-4" />
              </div>
              <span className="text-secondary">
                <strong className="text-primary block font-display text-sm font-semibold">3 to 5 Classmates</strong>
                Zero lurking or bystander apathy
              </span>
            </div>

            <div className="p-4 rounded-2xl bg-panel/70 border border-panel-border flex items-center gap-3.5">
              <div className="w-9 h-9 rounded-xl bg-amber-500/15 text-amber-400 flex items-center justify-center shrink-0">
                <Flame className="w-4 h-4 fill-amber-400" />
              </div>
              <span className="text-secondary">
                <strong className="text-primary block font-display text-sm font-semibold">Shared Streak Counter</strong>
                Showing up becomes a visible habit
              </span>
            </div>

            <div className="p-4 rounded-2xl bg-panel/70 border border-panel-border flex items-center gap-3.5">
              <div className="w-9 h-9 rounded-xl bg-emerald-500/15 text-emerald-400 flex items-center justify-center shrink-0">
                <CheckCircle2 className="w-4 h-4" />
              </div>
              <span className="text-secondary">
                <strong className="text-primary block font-display text-sm font-semibold">Syllabus Checklists</strong>
                Tackle daily targets side by side
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* 2.5 INTEGRATED REACT BITS LOGOLOOP COMPONENT */}
      <section className="py-14 border-y border-panel-border bg-[#0b0912]">
        <div className="max-w-7xl mx-auto px-6 sm:px-10 text-center mb-8 space-y-2">
          <p className="text-xs font-mono uppercase tracking-widest text-accent font-semibold">
            Campus Network
          </p>
          <h3 className="font-display text-xl sm:text-2xl font-bold text-primary">
            Active study pods running across foundational university courses
          </h3>
          <p className="text-xs font-mono text-secondary max-w-xl mx-auto">
            Hover to pause the stream and inspect course codes.
          </p>
        </div>

        <div className="relative overflow-hidden py-3">
          <LogoLoop
            logos={courseLogos}
            speed={55}
            direction="left"
            logoHeight={46}
            gap={24}
            hoverSpeed={0}
            scaleOnHover
            fadeOut
            fadeOutColor={activePalette.variables['--canvas']}
            ariaLabel="Active university course study pods"
          />
        </div>
      </section>

      {/* 3. COMPARISON SLIDER SECTION WITH EXPANDED PADDING */}
      <section id="comparison" className="py-24 md:py-36 border-b border-panel-border bg-[#100e19]">
        <div className="max-w-5xl mx-auto px-6 sm:px-10 lg:px-12 space-y-10">
          <div className="text-center space-y-3.5 max-w-2xl mx-auto">
            <span className="px-3 py-1 text-xs font-mono font-bold rounded-lg bg-accent/15 text-accent border border-accent/25">
              Before & After
            </span>
            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-extrabold text-primary">
              Cramming alone vs. studying with a pod
            </h2>
            <p className="text-secondary text-sm sm:text-base leading-relaxed">
              When plans are vague and informal, people flake. Drag the slider to see how small, accountable pods transform chaotic exam weeks into structured calm.
            </p>
          </div>

          <ComparisonSlider
            initialPosition={50}
            dividerColor={activePalette.previewColor}
            dividerWidth={3}
          />
        </div>
      </section>

      {/* 4. HOW IT WORKS (SCROLL STACK) WITH EXPANDED PADDING */}
      <section id="how-it-works" className="py-24 md:py-36 max-w-5xl mx-auto px-6 sm:px-10 lg:px-12 space-y-14">
        <div className="text-center space-y-3.5 max-w-2xl mx-auto">
          <span className="px-3 py-1 text-xs font-mono font-bold rounded-lg bg-accent/15 text-accent border border-accent/25">
            Three Simple Steps
          </span>
          <ScrollFloat
            animationDuration={1}
            ease="back.inOut(2)"
            scrollStart="center bottom+=50%"
            scrollEnd="bottom bottom-=40%"
            stagger={0.02}
            containerClassName="text-center"
            textClassName="!text-3xl sm:!text-4xl md:!text-5xl font-display font-extrabold text-primary"
          >
            How Cohort turns plans into showing up
          </ScrollFloat>
          <p className="text-secondary text-sm sm:text-base leading-relaxed">
            No messy calendar coordination. No sprawling Discord channels. Just your course code, compatible classmates, and daily momentum.
          </p>
        </div>

        <ScrollStack />
      </section>

      {/* 5. LIVE SAMPLE POD BOARD (BORDER GLOW & MODAL CARDS) */}
      <section id="pods-board" className="py-24 md:py-36 border-t border-panel-border bg-[#0d0b14]">
        <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-12 space-y-12">
          {/* Board Header & Controls */}
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <span className="px-3 py-1 text-xs font-mono font-bold rounded-lg bg-accent/15 text-accent border border-accent/25">
                  Live Simulated Board
                </span>
                <span className="text-xs font-mono text-secondary">
                  Click any card to open the interactive pod desk
                </span>
              </div>
              <ScrollFloat
                animationDuration={1}
                ease="back.inOut(2)"
                scrollStart="center bottom+=50%"
                scrollEnd="bottom bottom-=40%"
                stagger={0.02}
                containerClassName="text-left"
                textClassName="!text-3xl sm:!text-4xl md:!text-5xl font-display font-extrabold text-primary"
              >
                Active Study Pods Ready to Join
              </ScrollFloat>
              <p className="text-secondary text-sm sm:text-base max-w-2xl leading-relaxed">
                Real simulated groups matching current course schedules. Click any card to inspect member rosters, examine the daily checklist, and track group streaks.
              </p>
            </div>

            {/* Search & Sort Controls */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full lg:w-auto">
              {/* Search Input */}
              <div className="relative w-full sm:w-72">
                <Search className="w-4 h-4 text-secondary absolute left-4 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Search course or campus..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-11 pr-10 py-3 rounded-xl bg-panel border border-panel-border text-sm text-primary placeholder:text-secondary/60 focus:outline-none focus:border-accent font-mono"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery('')}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-secondary hover:text-primary transition-colors p-1 rounded-full cursor-pointer"
                    title="Clear search"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>

              {/* Sort By Dropdown */}
              <div className="flex items-center gap-2 bg-panel border border-panel-border rounded-xl px-3.5 py-2.5 text-xs font-mono text-secondary shrink-0">
                <SlidersHorizontal className="w-3.5 h-3.5 text-accent" />
                <span className="text-secondary/70">Sort:</span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="bg-transparent text-primary font-bold focus:outline-none cursor-pointer"
                >
                  <option value="streak" className="bg-panel text-primary">Highest Streak</option>
                  <option value="spots" className="bg-panel text-primary">Spots Available</option>
                  <option value="urgency" className="bg-panel text-primary">Exam Urgency</option>
                </select>
              </div>
            </div>
          </div>

          {/* Category Filter Pills */}
          <div className="flex flex-wrap gap-2.5 pb-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-xl text-xs font-mono transition-all cursor-pointer ${
                  selectedCategory === cat
                    ? 'bg-accent text-canvas font-bold shadow-glow-sm'
                    : 'bg-panel text-secondary border border-panel-border hover:text-primary hover:bg-panel-hover'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* ModalCards Pod Grid or Empty State */}
          {filteredPods.length > 0 ? (
            <ModalCards pods={filteredPods} glowColors={activePalette.glowColors} />
          ) : (
            <div className="text-center py-16 px-6 rounded-3xl bg-panel border border-panel-border space-y-5">
              <div className="w-14 h-14 rounded-2xl bg-accent/15 border border-accent/30 text-accent flex items-center justify-center mx-auto">
                <Search className="w-7 h-7" />
              </div>
              <div className="space-y-2 max-w-md mx-auto">
                <h3 className="font-display font-bold text-xl text-primary">
                  No active study pods found for "{searchQuery}"
                </h3>
                <p className="text-secondary text-sm leading-relaxed">
                  Be the first student to launch a pod for this course. We will cluster classmates with you as they search.
                </p>
              </div>
              <button
                onClick={() => {
                  setCreatePodPrefill(searchQuery);
                  setIsCreateModalOpen(true);
                }}
                className="px-6 py-3 rounded-xl font-display font-semibold text-sm bg-accent hover:bg-accent-hover text-canvas transition-all shadow-glow-sm inline-flex items-center gap-2 cursor-pointer active:scale-95"
              >
                <Plus className="w-4 h-4 stroke-[3]" />
                <span>Start Pod for {searchQuery.toUpperCase()}</span>
              </button>
            </div>
          )}

          {/* "Create Pod" Card CTA within the board */}
          <div className="pt-6">
            <BorderGlow
              edgeSensitivity={30}
              glowColor="30 90 75"
              backgroundColor="#191526"
              borderRadius={28}
              glowRadius={42}
              glowIntensity={1.0}
              coneSpread={28}
              colors={activePalette.glowColors}
            >
              <div className="p-8 sm:p-12 md:p-14 flex flex-col md:flex-row items-center justify-between gap-8 text-center md:text-left">
                <div className="space-y-3 max-w-xl">
                  <span className="text-xs font-mono font-bold text-accent uppercase tracking-wider">
                    Don't see your specific class?
                  </span>
                  <h3 className="font-display text-2xl sm:text-3xl font-bold text-primary">
                    Start a new pod for your course in sixty seconds
                  </h3>
                  <p className="text-secondary text-sm sm:text-base leading-relaxed">
                    Post your course code and exam date. Other enrolled students searching for the same class will be automatically matched to your pod.
                  </p>
                </div>

                <button
                  onClick={() => setIsCreateModalOpen(true)}
                  className="px-9 py-4 rounded-2xl font-display font-bold text-sm bg-accent hover:bg-accent-hover text-canvas transition-all shadow-glow-md flex items-center gap-2.5 shrink-0 active:scale-95 cursor-pointer"
                >
                  <Plus className="w-4 h-4 stroke-[3]" />
                  <span>Create Study Pod</span>
                </button>
              </div>
            </BorderGlow>
          </div>
        </div>
      </section>

      {/* 6. STUDENT TESTIMONIALS WITH EXPANDED PADDING */}
      <section className="py-24 md:py-36 max-w-6xl mx-auto px-6 sm:px-10 lg:px-12 space-y-14">
        <div className="text-center space-y-3.5 max-w-2xl mx-auto">
          <span className="px-3 py-1 text-xs font-mono font-bold rounded-lg bg-accent/15 text-accent border border-accent/25">
            Student Stories
          </span>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-extrabold text-primary">
            From chaotic group chats to shared consistency
          </h2>
          <p className="text-secondary text-sm sm:text-base leading-relaxed">
            Students share how small groups and daily streaks turned exam anxiety into predictable routines.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              quote:
                'Our CS 106B group chat had 140 people and zero accountability. In my 4-person Cohort pod, we showed up every evening at seven. We hit an 18-day streak and all passed.',
              name: 'Marcus Chen',
              course: 'Computer Science 106B',
              avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80',
            },
            {
              quote:
                'I used to put off studying until midnight. Knowing three other people were sitting in a silent focus room waiting for me completely cured my procrastination.',
              name: 'Elena Rostova',
              course: 'Intermediate Microeconomics',
              avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80',
            },
            {
              quote:
                'The shared checklist turned our massive organic chemistry syllabus into bite-sized daily goals. Checking off tasks together made the week feel manageable.',
              name: 'Devon Miller',
              course: 'Organic Chemistry 142',
              avatar: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=100&auto=format&fit=crop&q=80',
            },
          ].map((item, idx) => (
            <div
              key={idx}
              className="bg-panel border border-panel-border p-7 sm:p-8 rounded-3xl flex flex-col justify-between space-y-7 hover:border-accent/30 transition-colors shadow-lg"
            >
              <div className="space-y-4">
                <Quote className="w-8 h-8 text-accent/40" />
                <p className="text-sm sm:text-base leading-relaxed text-secondary italic">
                  "{item.quote}"
                </p>
              </div>

              <div className="flex items-center gap-3.5 pt-5 border-t border-panel-border">
                <img
                  src={item.avatar}
                  alt={item.name}
                  className="w-11 h-11 rounded-full object-cover ring-2 ring-accent/30"
                />
                <div>
                  <div className="font-display font-semibold text-sm text-primary">{item.name}</div>
                  <div className="text-xs font-mono text-secondary">{item.course}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 7. FAQ SECTION WITH EXPANDED PADDING */}
      <section id="faq" className="py-24 md:py-36 border-t border-panel-border bg-[#0e0c15]">
        <div className="max-w-4xl mx-auto px-6 sm:px-10 lg:px-12 space-y-12">
          <div className="text-center space-y-3.5">
            <span className="px-3 py-1 text-xs font-mono font-bold rounded-lg bg-accent/15 text-accent border border-accent/25">
              Common Questions
            </span>
            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-extrabold text-primary">
              Frequently Asked Questions
            </h2>
            <p className="text-secondary text-sm sm:text-base leading-relaxed">
              Clear answers to practical questions about how small pods stay accountable and flake-free.
            </p>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, idx) => {
              const isOpen = openFaqIndex === idx;
              return (
                <div
                  key={idx}
                  className="bg-panel border border-panel-border rounded-2xl overflow-hidden transition-colors"
                >
                  <button
                    onClick={() => setOpenFaqIndex(isOpen ? null : idx)}
                    className="w-full p-6 sm:p-7 text-left flex items-center justify-between gap-4 cursor-pointer"
                  >
                    <span className="font-display font-bold text-base sm:text-lg text-primary">
                      {faq.question}
                    </span>
                    <ChevronDown
                      className={`w-5 h-5 text-secondary shrink-0 transition-transform duration-300 ${
                        isOpen ? 'rotate-180 text-accent' : ''
                      }`}
                    />
                  </button>

                  {isOpen && (
                    <div className="px-6 sm:px-7 pb-7 text-secondary text-sm sm:text-base leading-relaxed border-t border-panel-border/60 pt-5 animate-fade-in">
                      {faq.answer}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 8. FINAL CALL TO ACTION WITH EXPANDED PADDING */}
      <section className="py-24 md:py-36 border-t border-panel-border">
        <div className="max-w-4xl mx-auto px-6 sm:px-10 lg:px-12 text-center">
          <BorderGlow
            edgeSensitivity={30}
            glowColor="30 90 75"
            backgroundColor="#171422"
            borderRadius={32}
            glowRadius={46}
            glowIntensity={1.0}
            colors={activePalette.glowColors}
          >
            <div className="p-10 sm:p-14 md:p-20 space-y-7">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-accent/20 border border-accent/30 text-accent text-xs font-mono font-bold">
                <Flame className="w-3.5 h-3.5 fill-accent" />
                <span>Stop Cramming Alone</span>
              </div>

              <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-extrabold text-primary leading-tight max-w-2xl mx-auto">
                Ready to show up with people who count on you?
              </h2>

              <p className="text-secondary text-base sm:text-lg max-w-xl mx-auto leading-relaxed">
                Join an open study pod or post your course code. Match with compatible peers in less than sixty seconds.
              </p>

              <div className="pt-3 flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-5">
                <button
                  onClick={() => setIsCreateModalOpen(true)}
                  className="w-full sm:w-auto px-9 py-4 rounded-2xl font-display font-bold text-base bg-accent hover:bg-accent-hover text-canvas transition-all shadow-glow-md flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Sparkles className="w-5 h-5 stroke-[2.5]" />
                  <span>Find Your Study Pod</span>
                </button>

                <button
                  onClick={() => navigateTo('problem-solution')}
                  className="w-full sm:w-auto px-8 py-4 rounded-2xl font-display font-semibold text-sm bg-panel-card hover:bg-panel-hover text-primary border border-panel-border transition-colors cursor-pointer"
                >
                  Read Problem & Solution Briefing
                </button>
              </div>
            </div>
          </BorderGlow>
        </div>
      </section>

      {/* 9. FOOTER WITH EXPANDED PADDING */}
      <footer className="border-t border-panel-border py-14 md:py-18 bg-canvas text-secondary text-xs font-mono">
        <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-12 flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="flex items-center gap-3.5">
            <div className="w-8 h-8 rounded-xl bg-accent text-canvas flex items-center justify-center font-bold font-display text-base">
              C
            </div>
            <span className="font-display font-bold text-base text-primary">Cohort</span>
            <span className="text-secondary/70">
              Showing up is easier when someone is waiting for you.
            </span>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-8 text-xs font-mono">
            <button
              onClick={() => navigateTo('problem-solution')}
              className="hover:text-primary transition-colors cursor-pointer"
            >
              Problem & Solution
            </button>
            <button
              onClick={() => setIsTutorialOpen(true)}
              className="hover:text-primary transition-colors cursor-pointer"
            >
              How It Works
            </button>
            <button
              onClick={handleResetTutorial}
              className="hover:text-accent transition-colors underline underline-offset-4 cursor-pointer"
              title="Clear session flag and re-run tutorial walkthrough"
            >
              Reset Walkthrough Demo
            </button>
          </div>

          <div className="text-secondary/70">
            Design Concept • Public Static Release
          </div>
        </div>
      </footer>

      {/* MODALS & OVERLAYS */}
      <CreatePodModal
        isOpen={isCreateModalOpen}
        onClose={() => {
          setIsCreateModalOpen(false);
          setCreatePodPrefill('');
        }}
        onCreatePod={handleCreatePod}
        initialCourseCode={createPodPrefill}
      />

      <TutorialWalkthrough
        isOpen={isTutorialOpen}
        onClose={() => setIsTutorialOpen(false)}
      />

      <PaletteSwitcher
        activePaletteId={activePaletteId}
        onSelectPalette={setActivePaletteId}
      />
    </div>
  );
}
