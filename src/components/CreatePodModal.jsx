import React, { useState } from 'react';
import { X, Sparkles, Users, Calendar, Clock, BookOpen, Check } from 'lucide-react';
import BorderGlow from './BorderGlow';

export default function CreatePodModal({ isOpen, onClose, onCreatePod, initialCourseCode = '' }) {
  const [courseCode, setCourseCode] = useState(initialCourseCode);
  const [campus, setCampus] = useState('RIT Dubai');
  const [courseTitle, setCourseTitle] = useState('');
  const [examDate, setExamDate] = useState('');
  const [studyStyle, setStudyStyle] = useState('Quiet Focus');
  const [timeSlot, setTimeSlot] = useState('Daily 7:00 PM - 9:00 PM GST');
  const [isMatching, setIsMatching] = useState(false);
  const [matchSuccess, setMatchSuccess] = useState(false);

  // Sync initialCourseCode if passed
  React.useEffect(() => {
    if (initialCourseCode) {
      setCourseCode(initialCourseCode);
    }
  }, [initialCourseCode]);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!courseCode.trim()) return;

    setIsMatching(true);

    // Simulate pod clustering algorithm
    setTimeout(() => {
      setIsMatching(false);
      setMatchSuccess(true);

      const newPod = {
        id: `pod-user-${Date.now()}`,
        campus: campus,
        courseCode: courseCode.toUpperCase().trim(),
        courseTitle: courseTitle.trim() || `${courseCode.toUpperCase()} Intensive Study Group`,
        description: `Student-initiated pod at ${campus} focused on upcoming exam preparation. Committed to daily check-ins and shared progress.`,
        examDate: examDate || 'Next Friday',
        timeSlot: timeSlot,
        style: studyStyle,
        streakDays: 1,
        capacity: 4,
        members: [
          {
            name: 'You (Organizer)',
            major: 'Enrolled Student',
            year: 'Classmate',
            avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80',
            status: 'Organizer',
          },
          {
            name: 'Jordan M.',
            major: 'Computer Science',
            year: 'Sophomore',
            avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80',
            status: 'Matched',
          },
          {
            name: 'Samira H.',
            major: 'Data Science',
            year: 'Junior',
            avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&auto=format&fit=crop&q=80',
            status: 'Matched',
          },
        ],
        checklist: [
          { title: 'Confirm weekly study schedule in pod desk', targetDate: 'Today', assignedTo: 'All', completed: true },
          { title: 'Upload initial lecture review notes', targetDate: 'Tomorrow', assignedTo: 'Jordan', completed: false },
          { title: 'Complete first practice problem set together', targetDate: 'In 2 days', assignedTo: 'Samira', completed: false },
        ],
      };

      setTimeout(() => {
        onCreatePod(newPod);
        setMatchSuccess(false);
        onClose();
      }, 1100);
    }, 1200);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-canvas/80 backdrop-blur-md animate-fade-in"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-xl bg-panel border border-white/15 rounded-3xl p-6 md:p-8 shadow-2xl animate-scale-up"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-6 right-6 p-2 rounded-full bg-panel-card hover:bg-panel-hover text-secondary hover:text-primary transition-colors border border-white/10"
        >
          <X className="w-5 h-5" />
        </button>

        {isMatching ? (
          <div className="py-12 text-center space-y-4">
            <div className="w-16 h-16 mx-auto rounded-full bg-accent/20 border border-accent/40 flex items-center justify-center text-accent animate-spin">
              <Sparkles className="w-8 h-8" />
            </div>
            <h3 className="font-display font-bold text-2xl text-primary">
              Scanning compatible classmates...
            </h3>
            <p className="text-secondary text-sm max-w-sm mx-auto leading-relaxed">
              Matching your course code ({courseCode.toUpperCase()}) and study style with pending student posts.
            </p>
          </div>
        ) : matchSuccess ? (
          <div className="py-12 text-center space-y-4">
            <div className="w-16 h-16 mx-auto rounded-full bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400">
              <Check className="w-8 h-8 stroke-[3]" />
            </div>
            <h3 className="font-display font-bold text-2xl text-primary">
              Pod Formed!
            </h3>
            <p className="text-secondary text-sm max-w-sm mx-auto leading-relaxed">
              You have been placed with two compatible peers for {courseCode.toUpperCase()}. Adding pod to the board now.
            </p>
          </div>
        ) : (
          <div>
            <div className="mb-6">
              <span className="px-3 py-1 text-xs font-mono font-bold rounded-lg bg-accent/15 text-accent border border-accent/25">
                New Study Pod
              </span>
              <h3 className="font-display font-bold text-2xl text-primary mt-2">
                Post your course and find a pod
              </h3>
              <p className="text-secondary text-sm mt-1">
                Tell us your class and preferences. We pair you with three to five students aiming for the same target date.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono text-secondary mb-1.5 font-semibold">
                    University / Campus *
                  </label>
                  <select
                    value={campus}
                    onChange={(e) => setCampus(e.target.value)}
                    className="w-full bg-panel-card border border-panel-border rounded-xl px-3.5 py-2.5 text-sm text-primary focus:outline-none focus:border-accent font-mono"
                  >
                    <option value="RIT Dubai">RIT Dubai</option>
                    <option value="American Univ. of Sharjah">American Univ. of Sharjah (AUS)</option>
                    <option value="Khalifa University">Khalifa University</option>
                    <option value="NYU Abu Dhabi">NYU Abu Dhabi</option>
                    <option value="Univ. of Wollongong Dubai">Univ. of Wollongong Dubai</option>
                    <option value="Stanford University">Stanford University</option>
                    <option value="MIT">MIT</option>
                    <option value="General / Open Campus">General / Open Campus</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-mono text-secondary mb-1.5 font-semibold">
                    Course Code *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. GCIS 123 or CS 106B"
                    value={courseCode}
                    onChange={(e) => setCourseCode(e.target.value)}
                    className="w-full bg-panel-card border border-panel-border rounded-xl px-3.5 py-2.5 text-sm text-primary placeholder:text-secondary/50 focus:outline-none focus:border-accent font-mono"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-mono text-secondary mb-1.5 font-semibold">
                  Target Exam or Deadline Date
                </label>
                <input
                  type="text"
                  placeholder="e.g. December 18 or Next Friday"
                  value={examDate}
                  onChange={(e) => setExamDate(e.target.value)}
                  className="w-full bg-panel-card border border-panel-border rounded-xl px-3.5 py-2.5 text-sm text-primary placeholder:text-secondary/50 focus:outline-none focus:border-accent"
                />
              </div>

              <div>
                <label className="block text-xs font-mono text-secondary mb-1.5 font-semibold">
                  Course Title (Optional)
                </label>
                <input
                  type="text"
                  placeholder="e.g. Design & Analysis of Algorithms"
                  value={courseTitle}
                  onChange={(e) => setCourseTitle(e.target.value)}
                  className="w-full bg-panel-card border border-panel-border rounded-xl px-3.5 py-2.5 text-sm text-primary placeholder:text-secondary/50 focus:outline-none focus:border-accent"
                />
              </div>

              <div>
                <label className="block text-xs font-mono text-secondary mb-1.5 font-semibold">
                  Study Style Preference
                </label>
                <div className="grid grid-cols-2 gap-3">
                  {['Quiet Focus', 'Talk-It-Through / Discussion'].map((style) => (
                    <button
                      key={style}
                      type="button"
                      onClick={() => setStudyStyle(style)}
                      className={`p-3 rounded-xl border text-xs font-mono text-left transition-all ${
                        studyStyle === style
                          ? 'bg-accent/15 border-accent text-primary font-bold'
                          : 'bg-panel-card border-panel-border text-secondary hover:text-primary'
                      }`}
                    >
                      {style}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-xs font-mono text-secondary mb-1.5 font-semibold">
                  Preferred Daily Study Window
                </label>
                <select
                  value={timeSlot}
                  onChange={(e) => setTimeSlot(e.target.value)}
                  className="w-full bg-panel-card border border-panel-border rounded-xl px-3.5 py-2.5 text-sm text-primary focus:outline-none focus:border-accent font-mono"
                >
                  <option value="Daily 7:00 PM - 9:00 PM GST">Evening Prime (7:00 PM - 9:00 PM GST / UAE)</option>
                  <option value="Daily 4:00 PM - 6:00 PM GST">Late Afternoon (4:00 PM - 6:00 PM GST / UAE)</option>
                  <option value="Daily 8:00 PM - 10:00 PM GST">Night Session (8:00 PM - 10:00 PM GST / UAE)</option>
                  <option value="Daily 7:00 PM - 9:00 PM EST">Evening Focus (7:00 PM - 9:00 PM EST / US)</option>
                  <option value="Daily 10:00 AM - 12:00 PM GST">Morning Sprint (10:00 AM - 12:00 PM GST)</option>
                </select>
              </div>

              <div className="pt-3">
                <button
                  type="submit"
                  className="w-full py-3.5 rounded-xl font-display font-semibold text-sm bg-accent hover:bg-accent-hover text-canvas transition-all shadow-glow-sm flex items-center justify-center gap-2 active:scale-98"
                >
                  <Sparkles className="w-4 h-4" />
                  Find My Compatible Pod
                </button>
                <p className="text-center text-[11px] font-mono text-secondary mt-2">
                  Pods are capped at 5 members. Instant simulation with realistic peers.
                </p>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
