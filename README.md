# Cohort | Study Pod Platform

> "Showing up is never a struggle when someone is waiting for you at the table."

[![Deploy to GitHub Pages](https://github.com/AlbaraaM7/CohortStudy/actions/workflows/deploy.yml/badge.svg)](https://github.com/AlbaraaM7/CohortStudy/actions/workflows/deploy.yml)

**Live Demo URL**: [https://albaraam7.github.io/CohortStudy/](https://albaraam7.github.io/CohortStudy/)  
**Interior Briefing**: [https://albaraam7.github.io/CohortStudy/#/problem-solution](https://albaraam7.github.io/CohortStudy/#/problem-solution)  
**Submission Tag**: `#designathon2026`

---

## About Cohort

Cohort is a scrolling study-pod web application built for **DesignAthon 2026** (hosted by the Graphic Design Club at RIT Dubai in partnership with +twe).

### The Problem
Students trying to find compatible study partners before midterm and final exams rely on noisy, bloated WhatsApp groups with hundreds of people. Due to bystander apathy and lack of personal accountability, plans fall apart and students end up cramming alone in panic the night before an exam.

### The Solution
Cohort replaces chaotic group chats with small, focused study pods capped at three to five students. A student submits their course code, target deadline, and study style. The system groups compatible students into micro-pods with:
- **Shared Syllabus Checklists**: Step-by-step progress tracking with real-time completion percentages.
- **Unbroken Habit Streak Counter**: Daily check-ins where showing up becomes a visible habit.
- **Interactive Pod Desk**: Built-in 25-minute Pomodoro focus timer and pod discussion notice board.

---

## Key Features

1. **Two-Second Clarity Rule**: Visitors immediately understand the value proposition, live metrics, and primary action above the fold.
2. **First-Run Tutorial Walkthrough**: An interactive, skippable spotlight tour guiding new visitors through the core workflow before they are expected to use it. Includes persistent replay triggers and session storage memory.
3. **Live Color Palette Switcher**: 5 real-time color themes (Warm Ember, Terracotta & Clay, Sage & Pine, Golden Ochre, Velvet Plum) that dynamically update CSS custom properties and conic gradient glows.
4. **Dedicated Problem & Solution Page**: A non-technical briefing page formatted for general readers and competition judges, featuring student survey findings, behavioral research, and societal impact with zero code and zero wireframes.

---

## React Bits Components Integrated

| Component | Tier | Description & Placement |
| :--- | :--- | :--- |
| **`BorderGlow`** | Free (Verbatim) | Cursor-proximity radial conic gradient glow for pod cards, pod creation banners, and closing callouts. |
| **`ModalCards`** | Pro | Expandable pod cards that open into full-screen interactive desks with checklists, Pomodoro timer, and discussion board. |
| **`ComparisonSlider`** | Pro | Draggable split-screen slider vividly contrasting "Studying Alone" against "Studying with a Pod". |
| **`ScrollStack`** | Pro | Pinned sticky card stack that guides students through the three-step workflow. |
| **`LogoLoop`** | Free | Infinite looping ticker showcasing active campus pods across RIT Dubai, AUS, Stanford, MIT, and more. |
| **`ScrollFloat`** | Free | GSAP ScrollTrigger-powered character floating animation for key section headlines. |

---

## Local Development

```bash
# Clone the repository
git clone https://github.com/AlbaraaM7/CohortStudy.git
cd CohortStudy

# Install dependencies
npm install

# Start development server
npm run dev

# Build production bundle
npm run build
```

---

## License & Credits

Designed and developed for **DesignAthon 2026** by Albaraa Mussa.
Components and visual effects adapted from React Bits.
Public static release. No login or setup required.
