import React, { useState, useRef, useCallback, useEffect } from 'react';
import { AlertCircle, CheckCircle2, Flame, Clock, Users, ArrowLeftRight, Coffee, Sparkles } from 'lucide-react';
import './ComparisonSlider.css';

export default function ComparisonSlider({
  initialPosition = 50,
  dividerColor = '#ff7849',
  dividerWidth = 3,
  className = '',
}) {
  const [sliderPosition, setSliderPosition] = useState(initialPosition);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef(null);

  const updatePosition = useCallback((clientX) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setSliderPosition(percentage);
  }, []);

  const handleMouseDown = () => setIsDragging(true);
  const handleTouchStart = () => setIsDragging(true);

  useEffect(() => {
    const handleMouseUp = () => setIsDragging(false);
    const handleMouseMove = (e) => {
      if (isDragging) updatePosition(e.clientX);
    };
    const handleTouchMove = (e) => {
      if (isDragging && e.touches[0]) updatePosition(e.touches[0].clientX);
    };

    window.addEventListener('mouseup', handleMouseUp);
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('touchend', handleMouseUp);
    window.addEventListener('touchmove', handleTouchMove);

    return () => {
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('touchend', handleMouseUp);
      window.removeEventListener('touchmove', handleTouchMove);
    };
  }, [isDragging, updatePosition]);

  return (
    <div className={`comparison-slider-wrapper ${className}`}>
      {/* Quick Switch Buttons */}
      <div className="flex items-center justify-center gap-2 mb-4">
        <button
          onClick={() => setSliderPosition(20)}
          className={`px-3 py-1 text-xs font-mono rounded-full border transition-all ${
            sliderPosition < 35
              ? 'bg-red-500/20 text-red-300 border-red-500/40'
              : 'bg-panel-card text-secondary border-panel-border hover:text-primary'
          }`}
        >
          View: Cramming Alone
        </button>
        <button
          onClick={() => setSliderPosition(50)}
          className={`px-3 py-1 text-xs font-mono rounded-full border transition-all ${
            sliderPosition >= 35 && sliderPosition <= 65
              ? 'bg-accent/20 text-accent border-accent/40'
              : 'bg-panel-card text-secondary border-panel-border hover:text-primary'
          }`}
        >
          50 / 50 Comparison
        </button>
        <button
          onClick={() => setSliderPosition(80)}
          className={`px-3 py-1 text-xs font-mono rounded-full border transition-all ${
            sliderPosition > 65
              ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40'
              : 'bg-panel-card text-secondary border-panel-border hover:text-primary'
          }`}
        >
          View: Studying with Pod
        </button>
      </div>

      {/* Main Draggable Slider Box */}
      <div
        ref={containerRef}
        onClick={(e) => updatePosition(e.clientX)}
        className="relative w-full h-[460px] md:h-[400px] rounded-3xl overflow-hidden border border-white/15 select-none bg-[#110e1a] shadow-2xl cursor-ew-resize"
      >
        {/* RIGHT LAYER: Studying with Cohort Pod (Full width background) */}
        <div className="absolute inset-0 w-full h-full p-6 md:p-8 flex flex-col justify-between bg-gradient-to-br from-[#1a1428] via-[#1c182c] to-[#251b38] text-primary">
          <div>
            <div className="flex items-center justify-between gap-4 mb-4">
              <span className="px-3 py-1 rounded-full text-xs font-mono font-bold bg-emerald-500/15 text-emerald-300 border border-emerald-500/30 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5" />
                With Cohort Study Pod
              </span>
              <div className="flex items-center gap-1 px-3 py-1 rounded-full bg-amber-500/15 border border-amber-500/30 text-amber-400 font-mono text-xs font-bold">
                <Flame className="w-3.5 h-3.5 fill-amber-400" />
                <span>9-Day Habit Streak</span>
              </div>
            </div>

            <h3 className="font-display text-2xl md:text-3xl font-bold text-primary mb-2">
              Quiet focus blocks and shared momentum
            </h3>
            <p className="text-secondary text-sm md:text-base max-w-xl leading-relaxed">
              Four classmates log on for a scheduled 90-minute session. Microphones muted, cameras optional, but everyone sees the shared timer and checklist ticking down together.
            </p>
          </div>

          {/* Pod Status Snapshot */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 my-3">
            <div className="bg-panel-card/90 border border-panel-border p-3.5 rounded-2xl">
              <div className="flex items-center gap-2 text-xs text-secondary font-mono mb-1">
                <Clock className="w-3.5 h-3.5 text-accent" />
                Daily Ritual
              </div>
              <div className="font-display font-bold text-sm text-primary">
                7:00 PM Sharp
              </div>
              <div className="text-[11px] text-emerald-400 mt-0.5">
                4 / 4 arrived on time
              </div>
            </div>

            <div className="bg-panel-card/90 border border-panel-border p-3.5 rounded-2xl">
              <div className="flex items-center gap-2 text-xs text-secondary font-mono mb-1">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                Syllabus Progress
              </div>
              <div className="font-display font-bold text-sm text-primary">
                85% Covered
              </div>
              <div className="text-[11px] text-secondary mt-0.5">
                3 modules ahead of exam
              </div>
            </div>

            <div className="bg-panel-card/90 border border-panel-border p-3.5 rounded-2xl">
              <div className="flex items-center gap-2 text-xs text-secondary font-mono mb-1">
                <Users className="w-3.5 h-3.5 text-accent" />
                Accountability
              </div>
              <div className="font-display font-bold text-sm text-primary">
                Zero Flakes
              </div>
              <div className="text-[11px] text-secondary mt-0.5">
                Mutual commitment works
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between text-xs font-mono text-secondary pt-2 border-t border-white/10">
            <span>Result: Consistent daily habits</span>
            <span className="text-emerald-400 font-bold">Exam readiness: High</span>
          </div>
        </div>

        {/* LEFT LAYER: Studying Alone (Clipped layer) */}
        <div
          className="absolute inset-y-0 left-0 overflow-hidden bg-gradient-to-br from-[#121118] via-[#14121a] to-[#1a1722] border-r"
          style={{
            width: `${sliderPosition}%`,
            borderColor: dividerColor,
          }}
        >
          <div
            className="w-full h-full p-6 md:p-8 flex flex-col justify-between text-zinc-300"
            style={{ minWidth: containerRef.current ? `${containerRef.current.clientWidth}px` : '600px' }}
          >
            <div>
              <div className="flex items-center justify-between gap-4 mb-4">
                <span className="px-3 py-1 rounded-full text-xs font-mono font-bold bg-zinc-800 text-zinc-400 border border-zinc-700 flex items-center gap-1.5">
                  <AlertCircle className="w-3.5 h-3.5 text-red-400" />
                  Studying Alone
                </span>
                <div className="flex items-center gap-1 px-3 py-1 rounded-full bg-zinc-900 border border-zinc-800 text-zinc-500 font-mono text-xs">
                  <span>Streak: 0 Days</span>
                </div>
              </div>

              <h3 className="font-display text-2xl md:text-3xl font-bold text-zinc-200 mb-2">
                2:00 AM panic, endless tabs, zero backup
              </h3>
              <p className="text-zinc-400 text-sm md:text-base max-w-xl leading-relaxed">
                You open a noisy WhatsApp group with 200 people. Someone posted a meme three hours ago; your question about problem four got buried. You put off studying until midnight.
              </p>
            </div>

            {/* Solo Stats */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 my-3">
              <div className="bg-zinc-900/80 border border-zinc-800 p-3.5 rounded-2xl">
                <div className="flex items-center gap-2 text-xs text-zinc-400 font-mono mb-1">
                  <Coffee className="w-3.5 h-3.5 text-zinc-500" />
                  Work Schedule
                </div>
                <div className="font-display font-bold text-sm text-zinc-200">
                  Late Night Ad-hoc
                </div>
                <div className="text-[11px] text-zinc-500 mt-0.5">
                  Distracted after 15 mins
                </div>
              </div>

              <div className="bg-zinc-900/80 border border-zinc-800 p-3.5 rounded-2xl">
                <div className="flex items-center gap-2 text-xs text-zinc-400 font-mono mb-1">
                  <AlertCircle className="w-3.5 h-3.5 text-zinc-500" />
                  Syllabus Progress
                </div>
                <div className="font-display font-bold text-sm text-zinc-200">
                  30% Reviewed
                </div>
                <div className="text-[11px] text-red-400/80 mt-0.5">
                  Exam is in three days
                </div>
              </div>

              <div className="bg-zinc-900/80 border border-zinc-800 p-3.5 rounded-2xl">
                <div className="flex items-center gap-2 text-xs text-zinc-400 font-mono mb-1">
                  <Users className="w-3.5 h-3.5 text-zinc-500" />
                  Peer Support
                </div>
                <div className="font-display font-bold text-sm text-zinc-200">
                  Silent WhatsApp
                </div>
                <div className="text-[11px] text-zinc-500 mt-0.5">
                  Nobody notices if you quit
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between text-xs font-mono text-zinc-500 pt-2 border-t border-zinc-800">
              <span>Result: Solo cramming and anxiety</span>
              <span className="text-red-400/90 font-bold">Exam readiness: Uncertain</span>
            </div>
          </div>
        </div>

        {/* DRAGGABLE DIVIDER LINE & HANDLE */}
        <div
          className="absolute inset-y-0 z-20 flex items-center justify-center cursor-ew-resize pointer-events-none"
          style={{
            left: `${sliderPosition}%`,
            transform: 'translateX(-50%)',
          }}
        >
          {/* Vertical Glowing Line */}
          <div
            className="h-full"
            style={{
              width: `${dividerWidth}px`,
              backgroundColor: dividerColor,
              boxShadow: `0 0 15px 1px ${dividerColor}`,
            }}
          />

          {/* Central Circular Knob */}
          <div
            onMouseDown={handleMouseDown}
            onTouchStart={handleTouchStart}
            className="absolute pointer-events-auto flex items-center justify-center w-11 h-11 rounded-full bg-accent text-canvas shadow-glow-md border-2 border-primary active:scale-95 transition-transform"
            aria-label="Drag comparison handle"
          >
            <ArrowLeftRight className="w-5 h-5 text-canvas stroke-[2.5]" />
          </div>
        </div>
      </div>

      <p className="text-center text-xs font-mono text-secondary mt-3">
        Drag the center slider left or right to contrast the two study realities
      </p>
    </div>
  );
}
