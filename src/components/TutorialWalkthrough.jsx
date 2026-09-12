import React, { useState, useEffect, useCallback } from 'react';
import { X, ArrowRight, ArrowLeft, Check, Sparkles } from 'lucide-react';
import './TutorialWalkthrough.css';

const TUTORIAL_STEPS = [
  {
    targetId: 'hero-create-pod-btn',
    title: 'Start with your course',
    copy: 'Enter your class code, your upcoming exam date, and whether you study best in silent focus or open discussion. It takes sixty seconds.',
    position: 'bottom',
  },
  {
    targetId: 'sample-pod-card-highlight',
    title: 'Get placed in a small pod',
    copy: 'We match you with three to five peers who share your schedule and style. Small groups mean nobody gets lost in the crowd.',
    position: 'top',
  },
  {
    targetId: 'sample-streak-badge',
    title: 'Keep your streak going',
    copy: 'Every day your pod checks in together, your streak ticks up. When you know four other students are waiting, skipping is not an option.',
    position: 'bottom',
  },
  {
    targetId: 'sample-checklist-highlight',
    title: 'Stay on pace together',
    copy: 'Tackle your syllabus step by step with a shared daily to-do list. When a pod mate checks off an item, everyone sees the win.',
    position: 'top',
  },
];

export default function TutorialWalkthrough({ isOpen, onClose }) {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [targetRect, setTargetRect] = useState(null);

  const currentStep = TUTORIAL_STEPS[currentStepIndex];

  // Measure target DOM element and reposition spotlight
  const updateSpotlight = useCallback(() => {
    if (!isOpen) return;
    const targetElement = document.getElementById(currentStep.targetId);
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
      const rect = targetElement.getBoundingClientRect();
      setTargetRect({
        top: rect.top,
        left: rect.left,
        width: rect.width,
        height: rect.height,
        bottom: rect.bottom,
        right: rect.right,
      });
    }
  }, [isOpen, currentStep]);

  useEffect(() => {
    if (!isOpen) return;

    // Multi-stage timers to measure accurately as smooth scroll animates and settles
    updateSpotlight();
    const timer1 = setTimeout(() => updateSpotlight(), 150);
    const timer2 = setTimeout(() => updateSpotlight(), 450);

    const handleResize = () => updateSpotlight();
    const handleScroll = () => {
      const targetElement = document.getElementById(currentStep.targetId);
      if (targetElement) {
        const rect = targetElement.getBoundingClientRect();
        setTargetRect({
          top: rect.top,
          left: rect.left,
          width: rect.width,
          height: rect.height,
          bottom: rect.bottom,
          right: rect.right,
        });
      }
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('scroll', handleScroll);
    };
  }, [isOpen, currentStepIndex, updateSpotlight, currentStep]);

  if (!isOpen) return null;

  const handleNext = () => {
    if (currentStepIndex < TUTORIAL_STEPS.length - 1) {
      setCurrentStepIndex(currentStepIndex + 1);
    } else {
      handleDismiss();
    }
  };

  const handlePrev = () => {
    if (currentStepIndex > 0) {
      setCurrentStepIndex(currentStepIndex - 1);
    }
  };

  const handleDismiss = () => {
    sessionStorage.setItem('cohort_tutorial_dismissed', 'true');
    setCurrentStepIndex(0);
    onClose();
  };

  // Compute tooltip position
  const getTooltipStyles = () => {
    if (!targetRect) {
      return { top: '50%', left: '50%', transform: 'translate(-50%, -50%)' };
    }

    const margin = 18;
    const tooltipWidth = Math.min(360, window.innerWidth - 32);

    let top = targetRect.bottom + margin;
    let left = targetRect.left + (targetRect.width / 2) - (tooltipWidth / 2);

    // Keep horizontally in bounds
    if (left < 16) left = 16;
    if (left + tooltipWidth > window.innerWidth - 16) {
      left = window.innerWidth - tooltipWidth - 16;
    }

    // If tooltip overflows below screen, position above the target
    if (top + 220 > window.innerHeight && targetRect.top > 240) {
      top = targetRect.top - margin - 220;
    }

    return {
      top: `${Math.max(16, top)}px`,
      left: `${left}px`,
      width: `${tooltipWidth}px`,
    };
  };

  return (
    <div className="fixed inset-0 z-50 pointer-events-auto">
      {/* Background Dark Mask with Cutout Spotlight */}
      {targetRect && (
        <div
          className="fixed pointer-events-none transition-all duration-300 ease-out spotlight-box"
          style={{
            top: `${targetRect.top - 8}px`,
            left: `${targetRect.left - 8}px`,
            width: `${targetRect.width + 16}px`,
            height: `${targetRect.height + 16}px`,
            borderRadius: '20px',
            boxShadow: '0 0 0 9999px rgba(10, 8, 16, 0.86), 0 0 35px 8px rgba(255, 120, 73, 0.45)',
            border: '2px solid rgba(255, 120, 73, 0.9)',
          }}
        />
      )}

      {/* Click outside to dismiss backdrop */}
      <div
        className="fixed inset-0 bg-transparent cursor-pointer"
        onClick={handleDismiss}
        aria-label="Dismiss walkthrough"
      />

      {/* Floating Tooltip Card */}
      <div
        className="fixed z-50 bg-panel border border-accent/40 rounded-3xl p-6 shadow-2xl text-primary animate-scale-up pointer-events-auto"
        style={getTooltipStyles()}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Header with Interactive Step Dots */}
        <div className="flex items-center justify-between gap-3 mb-3">
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full text-[11px] font-mono font-bold bg-accent/20 text-accent border border-accent/30 flex items-center gap-1">
              <Sparkles className="w-3 h-3" />
              Step {currentStepIndex + 1} of {TUTORIAL_STEPS.length}
            </span>
            <div className="flex items-center gap-1 ml-1">
              {TUTORIAL_STEPS.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentStepIndex(idx)}
                  className={`h-2 rounded-full transition-all cursor-pointer ${
                    idx === currentStepIndex
                      ? 'w-4 bg-accent'
                      : 'w-2 bg-panel-border hover:bg-secondary'
                  }`}
                  aria-label={`Jump to step ${idx + 1}`}
                  title={`Step ${idx + 1}`}
                />
              ))}
            </div>
          </div>

          <button
            onClick={handleDismiss}
            className="p-1 rounded-full text-secondary hover:text-primary hover:bg-white/5 transition-colors cursor-pointer"
            title="Skip walkthrough"
            aria-label="Skip walkthrough"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Step Content */}
        <h4 className="font-display font-bold text-lg text-primary mb-2">
          {currentStep.title}
        </h4>
        <p className="text-secondary text-sm leading-relaxed mb-5">
          {currentStep.copy}
        </p>

        {/* Navigation Controls */}
        <div className="flex items-center justify-between pt-2 border-t border-panel-border">
          <button
            onClick={handleDismiss}
            className="text-xs font-mono text-secondary hover:text-primary transition-colors underline underline-offset-4"
          >
            Skip walkthrough
          </button>

          <div className="flex items-center gap-2">
            {currentStepIndex > 0 && (
              <button
                onClick={handlePrev}
                className="p-2 rounded-xl bg-panel-card hover:bg-panel-hover text-secondary hover:text-primary transition-colors border border-panel-border"
                aria-label="Previous step"
              >
                <ArrowLeft className="w-4 h-4" />
              </button>
            )}

            <button
              onClick={handleNext}
              className="px-4 py-2 rounded-xl font-display font-semibold text-xs bg-accent hover:bg-accent-hover text-canvas transition-all shadow-glow-sm flex items-center gap-1.5 active:scale-95"
            >
              {currentStepIndex === TUTORIAL_STEPS.length - 1 ? (
                <>
                  <span>Finish</span>
                  <Check className="w-3.5 h-3.5 stroke-[3]" />
                </>
              ) : (
                <>
                  <span>Next</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
