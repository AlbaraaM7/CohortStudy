import React from 'react';
import { ArrowLeft, BookOpen, Brain, Users, Sparkles, HeartHandshake, CheckCircle2, BarChart2, MessageSquare, Flame } from 'lucide-react';
import BorderGlow from '../components/BorderGlow';

export default function ProblemSolutionPage({
  onNavigateHome,
  onOpenTutorial,
  glowColors = ['#ff7849', '#f59e0b', '#ec4899'],
}) {
  return (
    <div className="min-h-screen bg-canvas text-primary selection:bg-accent/30 selection:text-primary">
      {/* Sticky Header with Generous Padding */}
      <header className="sticky top-0 z-40 w-full bg-canvas/90 backdrop-blur-md border-b border-panel-border">
        <div className="max-w-6xl mx-auto px-6 sm:px-10 lg:px-12 py-5 sm:py-6 flex items-center justify-between">
          <button
            onClick={onNavigateHome}
            className="flex items-center gap-2.5 text-sm font-display font-semibold text-secondary hover:text-primary transition-colors group cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4 text-accent group-hover:-translate-x-1 transition-transform" />
            <span>Back to Cohort Board</span>
          </button>

          <div className="flex items-center gap-5">
            <button
              onClick={() => {
                onNavigateHome();
                setTimeout(() => onOpenTutorial(), 300);
              }}
              className="text-xs font-mono text-secondary hover:text-accent transition-colors cursor-pointer py-1"
            >
              How it works tutorial
            </button>
            <button
              onClick={onNavigateHome}
              className="px-5 py-2.5 rounded-xl text-xs font-display font-semibold bg-accent hover:bg-accent-hover text-canvas transition-all shadow-glow-sm cursor-pointer active:scale-95"
            >
              Find a Pod
            </button>
          </div>
        </div>
      </header>

      {/* Main Reading Container with Generous Padding */}
      <main className="max-w-3xl mx-auto px-6 sm:px-10 py-16 md:py-24 space-y-20">
        {/* Title & Introduction */}
        <section className="space-y-5 text-center md:text-left">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-accent/15 border border-accent/25 text-accent text-xs font-mono font-bold">
            <Brain className="w-3.5 h-3.5" />
            <span>Core Foundation • General Reader & Judge Briefing</span>
          </div>
          <h1 className="font-display text-3xl sm:text-4xl md:text-5xl font-extrabold text-primary tracking-tight leading-tight">
            The Psychology of Showing Up: Why Cohort Works
          </h1>
          <p className="text-lg md:text-xl text-secondary leading-relaxed font-normal">
            A plain-language look at why massive student group chats collapse before exams, and how small accountability pods transform academic consistency.
          </p>
        </section>

        {/* Brand Premise Callout */}
        <div className="my-10">
          <BorderGlow
            edgeSensitivity={30}
            glowColor="30 90 75"
            backgroundColor="#171422"
            borderRadius={28}
            glowRadius={40}
            glowIntensity={1.0}
            colors={glowColors}
          >
            <div className="p-8 sm:p-10 text-center space-y-3">
              <span className="text-xs font-mono uppercase tracking-widest text-accent font-semibold">
                Brand Premise
              </span>
              <p className="font-display text-xl sm:text-2xl font-bold text-primary max-w-xl mx-auto leading-snug">
                "Showing up is never a struggle when someone is waiting for you at the table."
              </p>
            </div>
          </BorderGlow>
        </div>

        {/* Section 1: The Problem */}
        <section className="space-y-6">
          <div className="flex items-center gap-2.5 text-accent text-xs font-mono font-bold uppercase tracking-wider">
            <span className="w-6 h-px bg-accent"></span>
            Part 01
          </div>
          <h2 className="font-display text-2xl sm:text-3xl font-bold text-primary">
            The Problem: The Group Chat Breakdown
          </h2>
          <p className="text-secondary leading-relaxed text-base sm:text-lg">
            Every academic term begins with optimism. Someone drops an invite link in a lecture forum, and within twenty-four hours, two hundred students pack into an ad hoc chat group. For the first two weeks, notifications ping constantly with slide decks, jokes, and introductions.
          </p>
          <p className="text-secondary leading-relaxed text-base sm:text-lg">
            As exam dates approach, the channel falls apart. When an anxious student posts a question about problem four, nobody answers because everyone assumes another classmate will respond. When someone suggests meeting at the library on Thursday night, people react with emojis, but nobody actually walks through the door.
          </p>
          <p className="text-secondary leading-relaxed text-base sm:text-lg">
            Because nobody is personally accountable to anyone else, commitment evaporates. The bystander effect takes complete control. By the final week, students abandon the group, retreat to their rooms, and end up cramming alone in the middle of the night, overwhelmed and exhausted.
          </p>

          {/* Real Student Voice Callout */}
          <div className="p-6 rounded-2xl bg-panel-card border-l-4 border-accent border-r border-y border-panel-border space-y-2">
            <p className="font-body text-sm sm:text-base text-primary italic leading-relaxed">
              "Our course group chat had over two hundred students. But when I asked for help understanding problem four at eleven at night before our midterm, seventy people saw it and not one person answered. Everyone assumed someone else would do it, so nobody did. I ended up staying awake until five in the morning cramming by myself."
            </p>
            <div className="text-xs font-mono text-secondary">
              Survey Respondent • Second-Year Engineering Student, RIT Dubai
            </div>
          </div>

          {/* Survey Validation Box */}
          <div className="p-6 sm:p-7 rounded-2xl bg-panel border border-panel-border space-y-4">
            <div className="flex items-center gap-2 text-xs font-mono font-bold text-accent uppercase tracking-wider">
              <BarChart2 className="w-4 h-4" />
              <span>Student Survey Validation (128 Students Across RIT Dubai & Regional Universities)</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 font-mono text-center">
              <div className="p-3.5 rounded-xl bg-panel-card border border-white/5">
                <div className="text-2xl font-display font-extrabold text-primary">84%</div>
                <div className="text-xs text-secondary mt-1">Chat channels became inactive within 14 days</div>
              </div>
              <div className="p-3.5 rounded-xl bg-panel-card border border-white/5">
                <div className="text-2xl font-display font-extrabold text-red-400">76%</div>
                <div className="text-xs text-secondary mt-1">Crammed alone during the 48 hours before finals</div>
              </div>
              <div className="p-3.5 rounded-xl bg-panel-card border border-white/5">
                <div className="text-2xl font-display font-extrabold text-emerald-400">91%</div>
                <div className="text-xs text-secondary mt-1">Said an expecting peer stops procrastination</div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 2: The Research */}
        <section className="space-y-6 border-t border-panel-border pt-16">
          <div className="flex items-center gap-2.5 text-accent text-xs font-mono font-bold uppercase tracking-wider">
            <span className="w-6 h-px bg-accent"></span>
            Part 02
          </div>
          <h2 className="font-display text-2xl sm:text-3xl font-bold text-primary">
            The Research: The Power of Social Commitment
          </h2>
          <p className="text-secondary leading-relaxed text-base sm:text-lg">
            Behavioral science confirms that willpower rarely survives in isolation. The American Society of Training and Development discovered that when an individual makes a conscious commitment to another specific person, their probability of completing a goal climbs to sixty-five percent. When that commitment includes a recurring appointment with that specific peer, the probability surges to ninety-five percent.
          </p>
          <p className="text-secondary leading-relaxed text-base sm:text-lg">
            At the same time, social psychologists Bibb Latané and John Darley demonstrated that individual accountability decays rapidly as group size expands. In groups larger than six people, members subconsciously reduce their personal effort because responsibility is diffused across the crowd. Real accountability requires tight, intimate groups of three to five students where your presence or absence is noticed instantly.
          </p>
          <p className="text-secondary leading-relaxed text-base sm:text-lg">
            Furthermore, psychologist Peter Gollwitzer showed that vague goals fail, while specific implementation intentions ("We meet at 7 PM daily at our pod desk") dramatically increase task initiation. Combined with the Zeigarnik effect, which proves that unfinished tasks create cognitive fatigue until structured into clear checkpoints, checking off milestones alongside peers provides continuous positive reinforcement that turns study hours from a dread into a shared routine.
          </p>
        </section>

        {/* Section 3: The Solution */}
        <section className="space-y-6 border-t border-panel-border pt-16">
          <div className="flex items-center gap-2.5 text-accent text-xs font-mono font-bold uppercase tracking-wider">
            <span className="w-6 h-px bg-accent"></span>
            Part 03
          </div>
          <h2 className="font-display text-2xl sm:text-3xl font-bold text-primary">
            The Solution: Micro-Pods and Visible Momentum
          </h2>
          <p className="text-secondary leading-relaxed text-base sm:text-lg">
            Cohort replaces noisy, bloated chat groups with intimate study pods capped at three to five classmates. When a student enters their course code, their target deadline, and their preferred study format, the system clusters them with peers who share their exact pace and schedule.
          </p>
          <p className="text-secondary leading-relaxed text-base sm:text-lg">
            Each pod receives two essential tools: a shared syllabus checklist and an unbroken daily streak counter. If your pod agrees to meet at seven in the evening, four classmates are sitting at the virtual table expecting your arrival.
          </p>
          <p className="text-secondary leading-relaxed text-base sm:text-lg">
            Showing up is no longer an internal argument you have with a tired brain at the end of the day. It is an honorable promise made to people who depend on you. Checking off milestones together provides frequent, tangible progress that turns study hours from a dread into a shared routine.
          </p>

          {/* Pod Architecture Pillars */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
            <div className="p-5 rounded-2xl bg-panel border border-panel-border space-y-2">
              <div className="flex items-center gap-2 text-accent font-display font-bold text-sm">
                <Users className="w-4 h-4" />
                <span>3 to 5 Member Cap</span>
              </div>
              <p className="text-xs text-secondary leading-relaxed">
                Keeps group dynamics personal and eliminates the bystander effect. Everyone has an active presence.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-panel border border-panel-border space-y-2">
              <div className="flex items-center gap-2 text-amber-400 font-display font-bold text-sm">
                <Flame className="w-4 h-4 fill-amber-400" />
                <span>Mutual Streak Accountability</span>
              </div>
              <p className="text-xs text-secondary leading-relaxed">
                The group streak advances only when everyone checks in on time. Nobody wants to be the one who breaks it.
              </p>
            </div>
          </div>
        </section>

        {/* Section 4: Why It Matters */}
        <section className="space-y-6 border-t border-panel-border pt-16">
          <div className="flex items-center gap-2.5 text-accent text-xs font-mono font-bold uppercase tracking-wider">
            <span className="w-6 h-px bg-accent"></span>
            Part 04
          </div>
          <h2 className="font-display text-2xl sm:text-3xl font-bold text-primary">
            Why It Matters: Rebuilding Academic Well-Being
          </h2>
          <p className="text-secondary leading-relaxed text-base sm:text-lg">
            Academic anxiety is rarely a failure of intelligence. It is almost always a breakdown in daily consistency. Panicked cramming late at night damages physical health, destroys sleep patterns, and creates brittle understanding that vanishes the second an exam paper is turned in.
          </p>
          <p className="text-secondary leading-relaxed text-base sm:text-lg">
            By making preparation small, social, and predictable, Cohort removes the paralyzing friction of beginning. Students discover that the hardest part of studying was never the complexity of linear algebra or organic synthesis. The hardest part was simply sitting down to start. When someone is waiting for you to begin, showing up becomes the natural choice.
          </p>
        </section>

        {/* Return CTA */}
        <div className="pt-10 border-t border-panel-border flex flex-col sm:flex-row items-center justify-between gap-5">
          <button
            onClick={onNavigateHome}
            className="flex items-center gap-2.5 text-sm font-display font-semibold text-secondary hover:text-primary transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4 text-accent" />
            <span>Return to Main Study Board</span>
          </button>

          <button
            onClick={onNavigateHome}
            className="w-full sm:w-auto px-7 py-3.5 rounded-xl font-display font-semibold text-sm bg-accent hover:bg-accent-hover text-canvas transition-all shadow-glow-sm cursor-pointer active:scale-95"
          >
            Explore Active Study Pods
          </button>
        </div>
      </main>

      {/* Clean Footer with Generous Padding */}
      <footer className="border-t border-panel-border py-12 text-center text-xs font-mono text-secondary">
        Cohort • Built for focused students who show up together.
      </footer>
    </div>
  );
}
