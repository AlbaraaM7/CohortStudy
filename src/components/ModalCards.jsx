import React, { useState, useEffect, useRef } from 'react';
import {
  X,
  Flame,
  CheckCircle2,
  Circle,
  Clock,
  Users,
  Calendar,
  BookOpen,
  ShieldCheck,
  Sparkles,
  Play,
  Pause,
  RotateCcw,
  MessageSquare,
  Send,
  ListTodo,
  Timer,
} from 'lucide-react';
import BorderGlow from './BorderGlow';
import './ModalCards.css';

export default function ModalCards({
  pods = [],
  onJoinPod,
  glowColors = ['#ff7849', '#f59e0b', '#ec4899'],
  className = '',
}) {
  const [selectedPod, setSelectedPod] = useState(null);
  const [podChecklists, setPodChecklists] = useState({});
  const [joinedPods, setJoinedPods] = useState({});
  const [checkedInPods, setCheckedInPods] = useState({});
  const [activeTab, setActiveTab] = useState('checklist'); // 'checklist' | 'timer' | 'chat'
  const [checkInToast, setCheckInToast] = useState('');

  // Focus Timer state (25 min pomodoro)
  const [timerSeconds, setTimerSeconds] = useState(25 * 60);
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const timerIntervalRef = useRef(null);

  // Pod Discussion chat state
  const [chatMessages, setChatMessages] = useState({
    'pod-1': [
      { sender: 'Elena Rostova', text: 'Finished practice problems 1 to 4 on binary search trees.', time: '2:15 PM' },
      { sender: 'Marcus Chen', text: 'Uploaded my balance proof notes to our shared folder.', time: '3:40 PM' },
      { sender: 'Priya Patel', text: 'Ready for tonight’s 7 PM focus block. See everyone soon!', time: '6:30 PM' },
    ],
    'pod-2': [
      { sender: 'Amina Al-Mansoor', text: 'Slutsky substitution breakdown completed. Formula sheet updated.', time: '1:10 PM' },
      { sender: 'Lucas Vance', text: 'Working through Cournot duopoly payoffs before 4 PM session.', time: '2:45 PM' },
    ],
  });
  const [newMessageText, setNewMessageText] = useState('');

  // Close modal on Escape key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setSelectedPod(null);
      }
    };
    if (selectedPod) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => {
      document.body.style.overflow = 'auto';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [selectedPod]);

  // Pomodoro countdown effect
  useEffect(() => {
    if (isTimerRunning) {
      timerIntervalRef.current = setInterval(() => {
        setTimerSeconds((prev) => {
          if (prev <= 1) {
            clearInterval(timerIntervalRef.current);
            setIsTimerRunning(false);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } else {
      clearInterval(timerIntervalRef.current);
    }
    return () => clearInterval(timerIntervalRef.current);
  }, [isTimerRunning]);

  const toggleTimer = () => setIsTimerRunning(!isTimerRunning);
  const resetTimer = () => {
    setIsTimerRunning(false);
    setTimerSeconds(25 * 60);
  };

  const formatTimer = (totalSeconds) => {
    const mins = Math.floor(totalSeconds / 60);
    const secs = totalSeconds % 60;
    return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  };

  // Toggle checklist item
  const toggleChecklistItem = (podId, itemIndex) => {
    setPodChecklists((prev) => {
      const podList = prev[podId] ? [...prev[podId]] : [...pods.find((p) => p.id === podId).checklist];
      podList[itemIndex] = {
        ...podList[itemIndex],
        completed: !podList[itemIndex].completed,
      };
      return { ...prev, [podId]: podList };
    });
  };

  const handleJoin = (podId) => {
    setJoinedPods((prev) => ({ ...prev, [podId]: true }));
    if (onJoinPod) onJoinPod(podId);
  };

  const handleCheckIn = (podId) => {
    setCheckedInPods((prev) => ({ ...prev, [podId]: true }));
    const pod = pods.find((p) => p.id === podId) || selectedPod;
    const newStreak = (pod ? pod.streakDays : 1) + 1;
    setCheckInToast(`Checked in! Your pod reached a ${newStreak}-day streak.`);
    setTimeout(() => {
      setCheckInToast('');
    }, 3500);
  };

  const handleSendMessage = (podId) => {
    if (!newMessageText.trim()) return;
    const newMsg = {
      sender: 'You',
      text: newMessageText.trim(),
      time: 'Just now',
    };
    setChatMessages((prev) => ({
      ...prev,
      [podId]: [...(prev[podId] || []), newMsg],
    }));
    setNewMessageText('');
  };

  return (
    <div className={`modal-cards-container ${className}`}>
      {/* Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
        {pods.map((pod, idx) => {
          const currentChecklist = podChecklists[pod.id] || pod.checklist;
          const completedCount = currentChecklist.filter((c) => c.completed).length;
          const isJoined = joinedPods[pod.id];
          const isCheckedIn = checkedInPods[pod.id];
          const displayStreak = isCheckedIn ? pod.streakDays + 1 : pod.streakDays;

          return (
            <div
              key={pod.id}
              id={idx === 0 ? 'sample-pod-card-highlight' : undefined}
              className="group cursor-pointer transition-transform duration-300 hover:-translate-y-1"
              onClick={() => setSelectedPod(pod)}
            >
              <BorderGlow
                edgeSensitivity={30}
                glowColor="30 90 75"
                backgroundColor="#181523"
                borderRadius={28}
                glowRadius={42}
                glowIntensity={1.0}
                coneSpread={28}
                colors={glowColors}
                className="h-full"
              >
                <div className="p-7 sm:p-8 flex flex-col justify-between h-full relative">
                  {/* Top Bar: Course Code & Streak */}
                  <div>
                    <div className="flex items-start justify-between gap-3 mb-3.5">
                      <div>
                        <div className="flex items-center gap-2 flex-wrap mb-2">
                          <span className="inline-block px-3 py-1 text-xs font-mono font-bold tracking-wider rounded-lg bg-accent/15 text-accent border border-accent/25">
                            {pod.courseCode}
                          </span>
                          {pod.campus && (
                            <span className="inline-block px-2.5 py-0.5 text-[11px] font-mono font-semibold rounded-md bg-panel-card text-secondary border border-panel-border">
                              {pod.campus}
                            </span>
                          )}
                        </div>
                        <h3 className="font-display font-bold text-xl sm:text-2xl text-primary group-hover:text-accent transition-colors">
                          {pod.courseTitle}
                        </h3>
                      </div>
                      <div
                        id={idx === 0 ? 'sample-streak-badge' : undefined}
                        className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 font-mono text-xs font-semibold shrink-0"
                      >
                        <Flame className="w-4 h-4 fill-amber-400 text-amber-400 animate-pulse" />
                        <span>{displayStreak} day streak</span>
                      </div>
                    </div>

                    <p className="text-secondary text-sm line-clamp-2 mb-5 leading-relaxed">
                      {pod.description}
                    </p>

                    {/* Metadata tags */}
                    <div className="space-y-2.5 mb-6">
                      <div className="flex items-center gap-2 text-xs text-secondary font-medium">
                        <Calendar className="w-3.5 h-3.5 text-accent" />
                        <span>
                          Target: <strong className="text-primary font-mono">{pod.examDate}</strong>
                        </span>
                      </div>
                      <div className="flex items-center gap-2 text-xs text-secondary font-medium">
                        <Clock className="w-3.5 h-3.5 text-accent" />
                        <span>
                          Schedule: <strong className="text-primary">{pod.timeSlot}</strong>
                        </span>
                      </div>
                      <div className="flex items-center gap-2 text-xs text-secondary font-medium">
                        <BookOpen className="w-3.5 h-3.5 text-accent" />
                        <span>
                          Format:{' '}
                          <span className="inline-block px-2.5 py-0.5 rounded bg-panel-card text-primary text-[11px] font-mono border border-panel-border">
                            {pod.style}
                          </span>
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Bottom Bar: Checklist summary & Members */}
                  <div className="pt-5 border-t border-panel-border/80">
                    <div id={idx === 0 ? 'sample-checklist-highlight' : undefined} className="mb-4">
                      <div className="flex items-center justify-between text-xs mb-1.5 font-mono">
                        <span className="text-secondary">Checklist progress</span>
                        <span className="text-accent font-semibold">
                          {completedCount} / {currentChecklist.length}
                        </span>
                      </div>
                      <div className="w-full h-2 bg-panel-card rounded-full overflow-hidden border border-white/5">
                        <div
                          className="h-full bg-gradient-to-r from-accent to-amber-400 transition-all duration-300"
                          style={{ width: `${(completedCount / currentChecklist.length) * 100}%` }}
                        />
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2.5">
                        <div className="flex -space-x-2 overflow-hidden">
                          {pod.members.map((m, mIdx) => (
                            <img
                              key={mIdx}
                              className="inline-block h-7 w-7 rounded-full ring-2 ring-panel object-cover"
                              src={m.avatar}
                              alt={m.name}
                            />
                          ))}
                        </div>
                        <span className="text-xs text-secondary font-mono">
                          {pod.members.length} / {pod.capacity} spots
                        </span>
                      </div>

                      <span className="text-xs font-semibold text-accent flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                        {isJoined ? 'Joined pod' : 'Open desk'} &rarr;
                      </span>
                    </div>
                  </div>
                </div>
              </BorderGlow>
            </div>
          );
        })}
      </div>

      {/* Full-Screen Modal Card View */}
      {selectedPod && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-8 bg-canvas/85 backdrop-blur-md animate-fade-in"
          onClick={() => setSelectedPod(null)}
        >
          <div
            className="modal-cards-sheet relative w-full max-w-5xl max-h-[92vh] overflow-y-auto bg-panel border border-white/15 rounded-3xl p-6 sm:p-8 md:p-10 shadow-2xl animate-scale-up"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button & Keyboard Hint */}
            <div className="absolute top-6 right-6 flex items-center gap-2">
              <span className="hidden sm:inline-block text-[10px] font-mono text-secondary px-2 py-1 rounded bg-panel-card border border-panel-border">
                ESC
              </span>
              <button
                onClick={() => setSelectedPod(null)}
                className="p-2.5 rounded-full bg-panel-card hover:bg-panel-hover text-secondary hover:text-primary transition-colors border border-white/10 cursor-pointer"
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Check-In Toast Banner */}
            {checkInToast && (
              <div className="mb-6 p-4 rounded-2xl bg-emerald-500/15 border border-emerald-500/40 text-emerald-300 font-mono text-xs flex items-center justify-between gap-3 animate-fade-in">
                <div className="flex items-center gap-2.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
                  <span className="font-semibold">{checkInToast}</span>
                </div>
                <span className="text-[11px] text-emerald-400/80">Group accountability active</span>
              </div>
            )}

            {/* Modal Header */}
            <div className="flex flex-wrap items-start justify-between gap-5 pr-16 mb-8 border-b border-panel-border pb-8">
              <div>
                <div className="flex items-center gap-2.5 flex-wrap mb-2.5">
                  <span className="px-3.5 py-1 text-sm font-mono font-bold rounded-lg bg-accent/15 text-accent border border-accent/30">
                    {selectedPod.courseCode}
                  </span>
                  {selectedPod.campus && (
                    <span className="px-3 py-1 text-xs font-mono font-semibold rounded-lg bg-panel-card text-secondary border border-panel-border">
                      {selectedPod.campus}
                    </span>
                  )}
                  <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-semibold font-mono">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    <span>Pod Active & Meeting Daily</span>
                  </div>
                </div>
                <h2 className="font-display text-2xl sm:text-3xl md:text-4xl font-bold text-primary">
                  {selectedPod.courseTitle}
                </h2>
                <p className="text-secondary text-sm md:text-base mt-2 max-w-2xl leading-relaxed">
                  {selectedPod.description}
                </p>
              </div>

              {/* Streak Pill */}
              <div className="bg-panel-card border border-panel-border rounded-2xl p-4 sm:p-5 flex items-center gap-4 text-left">
                <div className="w-13 h-13 rounded-xl bg-amber-500/15 border border-amber-500/30 flex items-center justify-center text-amber-400">
                  <Flame className="w-8 h-8 fill-amber-400" />
                </div>
                <div>
                  <div className="font-mono text-2xl sm:text-3xl font-bold text-primary">
                    {checkedInPods[selectedPod.id] ? selectedPod.streakDays + 1 : selectedPod.streakDays} Days
                  </div>
                  <div className="text-xs text-secondary font-medium">
                    {checkedInPods[selectedPod.id] ? 'Streak Maintained Today' : 'Unbroken Pod Streak'}
                  </div>
                </div>
              </div>
            </div>

            {/* Tab Navigation for Pod Desk */}
            <div className="flex items-center gap-2 mb-6 border-b border-panel-border pb-3">
              <button
                onClick={() => setActiveTab('checklist')}
                className={`px-4 py-2 rounded-xl text-xs font-mono font-bold flex items-center gap-2 transition-all cursor-pointer ${
                  activeTab === 'checklist'
                    ? 'bg-accent text-canvas shadow-sm'
                    : 'bg-panel-card text-secondary hover:text-primary'
                }`}
              >
                <ListTodo className="w-4 h-4" />
                <span>Shared Checklist</span>
              </button>

              <button
                onClick={() => setActiveTab('timer')}
                className={`px-4 py-2 rounded-xl text-xs font-mono font-bold flex items-center gap-2 transition-all cursor-pointer ${
                  activeTab === 'timer'
                    ? 'bg-accent text-canvas shadow-sm'
                    : 'bg-panel-card text-secondary hover:text-primary'
                }`}
              >
                <Timer className="w-4 h-4" />
                <span>Focus Timer (25m)</span>
              </button>

              <button
                onClick={() => setActiveTab('chat')}
                className={`px-4 py-2 rounded-xl text-xs font-mono font-bold flex items-center gap-2 transition-all cursor-pointer ${
                  activeTab === 'chat'
                    ? 'bg-accent text-canvas shadow-sm'
                    : 'bg-panel-card text-secondary hover:text-primary'
                }`}
              >
                <MessageSquare className="w-4 h-4" />
                <span>Pod Discussion ({((chatMessages[selectedPod.id] || []).length)})</span>
              </button>
            </div>

            {/* Grid Layout: Left Column (Members & Details), Right Column (Tabbed Content) */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              {/* Left Column */}
              <div className="lg:col-span-5 space-y-6">
                {/* Pod Logistics Card */}
                <div className="bg-panel-card/70 border border-panel-border rounded-2xl p-5 sm:p-6 space-y-4">
                  <h4 className="text-xs font-mono uppercase tracking-wider text-secondary font-semibold">
                    Pod Commitments
                  </h4>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-secondary">Target Exam:</span>
                    <span className="font-mono font-semibold text-primary">{selectedPod.examDate}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-secondary">Daily Window:</span>
                    <span className="font-semibold text-primary">{selectedPod.timeSlot}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-secondary">Study Format:</span>
                    <span className="px-2.5 py-0.5 rounded bg-panel text-accent font-mono text-xs border border-panel-border">
                      {selectedPod.style}
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-secondary">Capacity:</span>
                    <span className="font-mono text-primary font-semibold">
                      {selectedPod.members.length} / {selectedPod.capacity} Students
                    </span>
                  </div>
                </div>

                {/* Member Roster */}
                <div className="bg-panel-card/70 border border-panel-border rounded-2xl p-5 sm:p-6">
                  <h4 className="text-xs font-mono uppercase tracking-wider text-secondary font-semibold mb-4">
                    Committed Members ({selectedPod.members.length})
                  </h4>
                  <div className="space-y-4">
                    {selectedPod.members.map((member, mIdx) => (
                      <div key={mIdx} className="flex items-center justify-between gap-3">
                        <div className="flex items-center gap-3.5">
                          <img
                            src={member.avatar}
                            alt={member.name}
                            className="w-10 h-10 rounded-full object-cover ring-2 ring-accent/30"
                          />
                          <div>
                            <div className="font-display font-semibold text-sm text-primary">
                              {member.name}
                            </div>
                            <div className="text-xs text-secondary">
                              {member.major} • {member.year}
                            </div>
                          </div>
                        </div>
                        <span className="text-[11px] font-mono px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                          {member.status || 'Checked in'}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Interactive Daily Check-In Bar */}
                <div className="bg-panel-card/70 border border-panel-border rounded-2xl p-5 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono text-secondary uppercase font-semibold">Today's Session</span>
                    <span className="text-xs font-mono text-accent">Active Now</span>
                  </div>
                  <button
                    onClick={() => handleCheckIn(selectedPod.id)}
                    className={`w-full py-3 rounded-xl font-display font-bold text-xs transition-all flex items-center justify-center gap-2 cursor-pointer ${
                      checkedInPods[selectedPod.id]
                        ? 'bg-emerald-600/20 text-emerald-400 border border-emerald-500/40 cursor-default'
                        : 'bg-amber-500 hover:bg-amber-400 text-canvas shadow-sm active:scale-95'
                    }`}
                  >
                    <Flame className="w-4 h-4 fill-current" />
                    <span>
                      {checkedInPods[selectedPod.id]
                        ? 'Checked in for today! Streak +1'
                        : 'Check In for Today’s Pod'}
                    </span>
                  </button>
                  <p className="text-[11px] text-secondary text-center leading-relaxed">
                    One tap verifies attendance and advances the group streak.
                  </p>
                </div>
              </div>

              {/* Right Column: Tabbed Content */}
              <div className="lg:col-span-7 space-y-6">
                {/* TAB 1: Shared Checklist */}
                {activeTab === 'checklist' && (
                  <>
                    <div className="bg-panel-card/70 border border-panel-border rounded-2xl p-6 sm:p-7 space-y-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="font-display font-bold text-lg text-primary">
                            Shared Exam Checklist
                          </h4>
                          <p className="text-xs text-secondary mt-0.5">
                            Click tasks to simulate checking off syllabus milestones with your pod.
                          </p>
                        </div>
                        <div className="font-mono text-xs px-3 py-1 rounded-lg bg-panel border border-panel-border text-accent font-semibold">
                          {(podChecklists[selectedPod.id] || selectedPod.checklist).filter((c) => c.completed).length} of{' '}
                          {(podChecklists[selectedPod.id] || selectedPod.checklist).length} done ({Math.round(
                            ((podChecklists[selectedPod.id] || selectedPod.checklist).filter((c) => c.completed).length /
                              ((podChecklists[selectedPod.id] || selectedPod.checklist).length || 1)) *
                              100
                          )}%)
                        </div>
                      </div>

                      {/* Visual Progress Bar */}
                      <div className="w-full bg-panel rounded-full h-2 overflow-hidden border border-panel-border">
                        <div
                          className="bg-gradient-to-r from-accent to-emerald-400 h-full transition-all duration-500 rounded-full"
                          style={{
                            width: `${Math.round(
                              ((podChecklists[selectedPod.id] || selectedPod.checklist).filter((c) => c.completed).length /
                                ((podChecklists[selectedPod.id] || selectedPod.checklist).length || 1)) *
                                100
                            )}%`,
                          }}
                        />
                      </div>

                      {/* Checklist Items */}
                      <div className="space-y-3">
                        {(podChecklists[selectedPod.id] || selectedPod.checklist).map((item, idx) => (
                          <div
                            key={idx}
                            onClick={() => toggleChecklistItem(selectedPod.id, idx)}
                            className={`flex items-start gap-3.5 p-4 rounded-xl border transition-all cursor-pointer ${
                              item.completed
                                ? 'bg-emerald-950/20 border-emerald-500/30 text-secondary'
                                : 'bg-panel/80 border-panel-border text-primary hover:border-accent/40'
                            }`}
                          >
                            {item.completed ? (
                              <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                            ) : (
                              <Circle className="w-5 h-5 text-secondary shrink-0 mt-0.5" />
                            )}
                            <div className="flex-1">
                              <p
                                className={`text-sm leading-relaxed ${
                                  item.completed ? 'line-through text-secondary' : 'font-medium'
                                }`}
                              >
                                {item.title}
                              </p>
                              <span className="text-xs text-secondary/70 font-mono mt-1 block">
                                Target: {item.targetDate} • Logged by {item.assignedTo}
                              </span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* 7-Day Pod Attendance Streak Track */}
                    <div className="bg-panel-card/70 border border-panel-border rounded-2xl p-6">
                      <h4 className="font-display font-bold text-sm text-primary mb-3 flex items-center gap-2">
                        <Sparkles className="w-4 h-4 text-accent" />
                        7-Day Pod Attendance Momentum
                      </h4>
                      <div className="grid grid-cols-7 gap-2 text-center font-mono">
                        {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day, dIdx) => (
                          <div key={dIdx} className="bg-panel rounded-xl p-2.5 border border-panel-border">
                            <span className="text-[11px] text-secondary block mb-1.5">{day}</span>
                            <div className="w-7 h-7 mx-auto rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 flex items-center justify-center text-xs font-bold">
                              ✓
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </>
                )}

                {/* TAB 2: Focus Timer (Pomodoro) */}
                {activeTab === 'timer' && (
                  <div className="bg-panel-card/70 border border-panel-border rounded-2xl p-8 text-center space-y-6">
                    <div>
                      <span className="px-3 py-1 rounded-full text-xs font-mono font-bold bg-accent/15 text-accent border border-accent/30">
                        Quiet Focus Room
                      </span>
                      <h4 className="font-display font-bold text-2xl text-primary mt-2">
                        25-Minute Pod Focus Block
                      </h4>
                      <p className="text-xs text-secondary mt-1 max-w-sm mx-auto">
                        Microphones muted, cameras optional. Everyone works through their checklist items simultaneously.
                      </p>
                    </div>

                    <div className="py-6">
                      <div className="font-mono text-6xl sm:text-7xl font-extrabold text-primary tracking-tight">
                        {formatTimer(timerSeconds)}
                      </div>
                      <div className="text-xs font-mono text-accent mt-2">
                        {isTimerRunning ? 'Session active: Focus block running' : 'Ready to begin study sprint'}
                      </div>
                    </div>

                    <div className="flex items-center justify-center gap-4">
                      <button
                        onClick={toggleTimer}
                        className="px-6 py-3 rounded-xl font-display font-bold text-sm bg-accent hover:bg-accent-hover text-canvas flex items-center gap-2 shadow-sm cursor-pointer active:scale-95"
                      >
                        {isTimerRunning ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 fill-current" />}
                        <span>{isTimerRunning ? 'Pause Sprint' : 'Start Focus Sprint'}</span>
                      </button>

                      <button
                        onClick={resetTimer}
                        className="p-3 rounded-xl bg-panel hover:bg-panel-hover text-secondary hover:text-primary border border-panel-border transition-colors cursor-pointer"
                        title="Reset timer to 25:00"
                      >
                        <RotateCcw className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                )}

                {/* TAB 3: Pod Chat & Notes */}
                {activeTab === 'chat' && (
                  <div className="bg-panel-card/70 border border-panel-border rounded-2xl p-6 flex flex-col h-[460px] justify-between">
                    <div>
                      <div className="pb-3 border-b border-panel-border mb-4">
                        <h4 className="font-display font-bold text-base text-primary">Pod Notice Board</h4>
                        <p className="text-xs text-secondary">Coordination and shared study notes</p>
                      </div>

                      <div className="space-y-3 overflow-y-auto max-h-[300px] pr-2">
                        {(chatMessages[selectedPod.id] || []).map((msg, mIdx) => (
                          <div
                            key={mIdx}
                            className={`p-3 rounded-xl text-xs space-y-1 ${
                              msg.sender === 'You'
                                ? 'bg-accent/15 border border-accent/30 text-primary ml-8'
                                : 'bg-panel border border-panel-border text-secondary mr-8'
                            }`}
                          >
                            <div className="flex items-center justify-between font-mono font-bold text-[11px] text-primary">
                              <span>{msg.sender}</span>
                              <span className="text-secondary/60 font-normal">{msg.time}</span>
                            </div>
                            <p className="text-primary/90">{msg.text}</p>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="pt-3 border-t border-panel-border flex items-center gap-2">
                      <input
                        type="text"
                        placeholder="Drop a note to your pod..."
                        value={newMessageText}
                        onChange={(e) => setNewMessageText(e.target.value)}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter') handleSendMessage(selectedPod.id);
                        }}
                        className="flex-1 bg-panel border border-panel-border rounded-xl px-3.5 py-2.5 text-xs text-primary placeholder:text-secondary/50 focus:outline-none focus:border-accent"
                      />
                      <button
                        onClick={() => handleSendMessage(selectedPod.id)}
                        className="p-2.5 rounded-xl bg-accent hover:bg-accent-hover text-canvas transition-colors cursor-pointer"
                        title="Send note"
                      >
                        <Send className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                )}

                {/* Join Pod CTA Footer */}
                <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-panel-border">
                  <div className="text-xs text-secondary">
                    Simulated workspace. Click below to join and claim your slot.
                  </div>
                  <button
                    onClick={() => handleJoin(selectedPod.id)}
                    className={`w-full sm:w-auto px-7 py-3 rounded-xl font-display font-bold text-sm transition-all shadow-md cursor-pointer ${
                      joinedPods[selectedPod.id]
                        ? 'bg-emerald-600 text-white cursor-default'
                        : 'bg-accent hover:bg-accent-hover text-canvas hover:shadow-glow-sm active:scale-95'
                    }`}
                  >
                    {joinedPods[selectedPod.id] ? 'Joined This Pod ✓' : 'Join This Study Pod'}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
