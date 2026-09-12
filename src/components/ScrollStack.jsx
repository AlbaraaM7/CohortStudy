import React, { useState } from 'react';
import { BookOpen, Users, Flame, CheckCircle, ArrowRight, Clock, Target, Calendar } from 'lucide-react';
import './ScrollStack.css';

export default function ScrollStack({ className = '' }) {
  const [activeStep, setActiveStep] = useState(0);

  const steps = [
    {
      stepNumber: '01',
      badge: 'Step 01 • Input Your Details',
      title: 'Post your course code, deadline, and study style',
      description:
        'Specify your course number, your upcoming exam or paper date, and whether you thrive in quiet focus sessions or talking through concepts out loud. It takes less than sixty seconds to post.',
      icon: BookOpen,
      color: 'from-orange-500/20 to-accent/10',
      borderColor: 'border-accent/30',
      mockup: (
        <div className="bg-panel-card p-5 rounded-2xl border border-panel-border space-y-3 font-mono text-xs">
          <div className="flex items-center justify-between pb-2 border-b border-panel-border">
            <span className="text-secondary">Course Code:</span>
            <span className="text-accent font-bold px-2 py-0.5 rounded bg-accent/10 border border-accent/20">CS 106B</span>
          </div>
          <div className="flex items-center justify-between pb-2 border-b border-panel-border">
            <span className="text-secondary">Target Exam:</span>
            <span className="text-primary font-bold">December 14</span>
          </div>
          <div className="flex items-center justify-between pb-2 border-b border-panel-border">
            <span className="text-secondary">Study Preference:</span>
            <span className="text-emerald-400 font-bold">Quiet Focus (Pomodoro)</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-secondary">Daily Slots:</span>
            <span className="text-primary">7:00 PM to 9:00 PM</span>
          </div>
        </div>
      ),
    },
    {
      stepNumber: '02',
      badge: 'Step 02 • Intelligent Placement',
      title: 'Get grouped into a tight pod of three to five students',
      description:
        'Large group chats suffer from bystander apathy where nobody speaks up. Cohort caps every study pod at three to five members with identical exam dates and compatible study hours.',
      icon: Users,
      color: 'from-amber-500/20 to-orange-500/10',
      borderColor: 'border-amber-500/30',
      mockup: (
        <div className="bg-panel-card p-5 rounded-2xl border border-panel-border space-y-3">
          <div className="flex items-center justify-between text-xs font-mono text-secondary mb-2">
            <span>Pod Roster: CS 106B Pod #4</span>
            <span className="text-emerald-400 font-bold">4 / 4 Matched</span>
          </div>
          <div className="grid grid-cols-2 gap-2">
            {[
              { name: 'Elena R.', role: 'CS Major • Soph.', tag: 'Quiet Focus' },
              { name: 'Marcus T.', role: 'Math Major • Jr.', tag: 'Quiet Focus' },
              { name: 'Priya K.', role: 'CS Major • Soph.', tag: 'Quiet Focus' },
              { name: 'You', role: 'Enrolled Classmate', tag: 'Ready' },
            ].map((peer, pIdx) => (
              <div key={pIdx} className="bg-panel p-2.5 rounded-xl border border-white/5 flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-accent/20 border border-accent/40 flex items-center justify-center text-accent text-xs font-bold font-mono">
                  {peer.name[0]}
                </div>
                <div>
                  <div className="font-display font-semibold text-xs text-primary">{peer.name}</div>
                  <div className="text-[10px] text-secondary font-mono">{peer.tag}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ),
    },
    {
      stepNumber: '03',
      badge: 'Step 03 • Habit Accountability',
      title: 'Clear shared checklists and keep your streak alive',
      description:
        'Showing up is a visible habit, not a maybe. Each pod works through a daily syllabus checklist. When everyone shows up for the scheduled session, your pod streak counter advances.',
      icon: Flame,
      color: 'from-emerald-500/20 to-teal-500/10',
      borderColor: 'border-emerald-500/30',
      mockup: (
        <div className="bg-panel-card p-5 rounded-2xl border border-panel-border space-y-3 font-mono">
          <div className="flex items-center justify-between">
            <span className="text-xs text-secondary">Pod Momentum:</span>
            <span className="text-xs font-bold text-amber-400 flex items-center gap-1">
              <Flame className="w-3.5 h-3.5 fill-amber-400" /> 8 Days Strong
            </span>
          </div>
          <div className="space-y-2">
            {[
              { task: 'Binary search tree rebalancing drill', done: true },
              { task: 'Graph search BFS vs DFS problem sets', done: true },
              { task: 'Review midterm 2023 practice exam', done: false },
            ].map((t, idx) => (
              <div key={idx} className="flex items-center gap-2 text-xs text-primary bg-panel p-2 rounded-lg border border-white/5">
                <CheckCircle className={`w-4 h-4 shrink-0 ${t.done ? 'text-emerald-400' : 'text-secondary/40'}`} />
                <span className={t.done ? 'line-through text-secondary' : 'font-medium'}>{t.task}</span>
              </div>
            ))}
          </div>
        </div>
      ),
    },
  ];

  return (
    <div className={`scroll-stack-wrapper ${className}`}>
      {/* Step Selector Tabs for Easy Navigation */}
      <div className="flex flex-wrap justify-center gap-2 mb-8">
        {steps.map((step, idx) => (
          <button
            key={idx}
            onClick={() => setActiveStep(idx)}
            className={`px-4 py-2 rounded-xl text-xs font-mono font-medium transition-all flex items-center gap-2 border ${
              activeStep === idx
                ? 'bg-accent text-canvas border-accent shadow-glow-sm font-bold'
                : 'bg-panel-card text-secondary border-panel-border hover:text-primary hover:bg-panel-hover'
            }`}
          >
            <span>{step.stepNumber}</span>
            <span>{step.badge.split('•')[1]?.trim() || step.badge}</span>
          </button>
        ))}
      </div>

      {/* Stacked Cards Container */}
      <div className="relative min-h-[460px]">
        {steps.map((step, idx) => {
          const StepIcon = step.icon;
          const isCurrent = activeStep === idx;
          const isPassed = activeStep > idx;

          return (
            <div
              key={idx}
              onClick={() => setActiveStep(idx)}
              className={`scroll-stack-card transition-all duration-500 cursor-pointer rounded-3xl p-6 md:p-8 border ${step.borderColor} bg-panel ${
                isCurrent
                  ? 'opacity-100 translate-y-0 scale-100 z-30 shadow-2xl ring-1 ring-white/10'
                  : isPassed
                  ? 'opacity-40 -translate-y-4 scale-[0.96] z-10 pointer-events-auto'
                  : 'opacity-0 translate-y-8 scale-[0.92] z-0 pointer-events-none'
              } ${isCurrent ? 'block' : 'hidden md:block'}`}
              style={{
                position: isCurrent ? 'relative' : 'absolute',
                top: 0,
                left: 0,
                right: 0,
              }}
            >
              <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
                {/* Text Content */}
                <div className="md:col-span-7 space-y-4">
                  <div className="flex items-center gap-3">
                    <span className="px-3 py-1 rounded-full text-xs font-mono font-bold bg-accent/15 text-accent border border-accent/25">
                      {step.badge}
                    </span>
                    <span className="text-xs font-mono text-secondary">Cohort Workflow</span>
                  </div>

                  <h3 className="font-display text-2xl md:text-3xl font-bold text-primary leading-tight">
                    {step.title}
                  </h3>

                  <p className="text-secondary text-sm md:text-base leading-relaxed">
                    {step.description}
                  </p>

                  <div className="pt-2 flex items-center gap-3">
                    {idx < steps.length - 1 ? (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setActiveStep(idx + 1);
                        }}
                        className="inline-flex items-center gap-2 text-xs font-mono font-semibold text-accent hover:text-accent-hover transition-colors"
                      >
                        Next Step <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    ) : (
                      <span className="text-xs font-mono text-emerald-400 font-semibold">
                        Ready to join a pod
                      </span>
                    )}
                  </div>
                </div>

                {/* Mockup Card */}
                <div className="md:col-span-5">
                  {step.mockup}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
