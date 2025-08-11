# 🎨 Capture-Now - CSS Classes Guide

## 🌈 Color Palette

### Background Colors
```css
bg-background    /* #0a0a0f - Main dark background */
bg-surface       /* #151520 - Secondary surfaces */
bg-card          /* #242438 - Card backgrounds */
bg-hover         /* #2a2a42 - Hover states */
```

### Text Colors
```css
text-foreground  /* #f8fafc - Primary white text */
text-muted       /* #6b7280 - Muted gray text */
text-accent      /* #60a5fa - Blue accent text */
```

### Theme Colors
```css
/* Primary Purple */
bg-primary       /* #8b5cf6 - Main purple */
bg-primary-light /* #a78bfa - Light purple */
bg-primary-dark  /* #7c3aed - Dark purple */
text-primary     /* Purple text */

/* Secondary Blue */
bg-secondary     /* #3b82f6 - Main blue */
bg-secondary-light /* #60a5fa - Light blue */
bg-secondary-dark  /* #2563eb - Dark blue */
text-secondary   /* Blue text */
```

### State Colors
```css
bg-success / text-success    /* #22c55e - Green */
bg-warning / text-warning    /* #f59e0b - Yellow */
bg-error / text-error        /* #ef4444 - Red */
```

### Borders
```css
border-border       /* #374151 - Default border */
border-border-focus /* #8b5cf6 - Focus border */
```

## ✨ Special Classes

### Gradients
```css
text-gradient       /* Purple → Blue gradient for text */
bg-gradient-primary /* Purple → Blue gradient for backgrounds */
```

### Effects
```css
glass-effect        /* Glass effect with backdrop-blur */
card-hover          /* Hover animation for cards */
focus-ring          /* Custom focus ring */
```

### Animations
```css
animate-fade-in-up  /* Fade in from bottom */
animate-pulse-glow  /* Pulse with glow effect */
```

### Shadows
```css
shadow-purple-sm   /* Small purple shadow */
shadow-purple-md   /* Medium purple shadow */
shadow-purple-lg   /* Large purple shadow */
shadow-purple-xl   /* Extra large purple shadow */
```

## 📱 Example Components

### Basic Card
```jsx
<div className="bg-card border border-border rounded-xl p-6 card-hover">
  <h3 className="text-accent font-semibold mb-4">Title</h3>
  <p className="text-foreground">Note content...</p>
</div>
```

### Primary Button
```jsx
<button className="bg-gradient-primary px-6 py-2 rounded-lg text-foreground font-medium hover:opacity-90 transition-opacity">
  Save
</button>
```

### Secondary Button
```jsx
<button className="bg-surface border border-border text-primary hover:border-border-focus transition-colors px-4 py-2 rounded-lg">
  Cancel
</button>
```

### Input with Glass Effect
```jsx
<div className="glass-effect rounded-xl p-4">
  <input className="w-full bg-transparent text-foreground placeholder-muted border-none outline-none" />
</div>
```

### Tag/Badge
```jsx
<span className="px-3 py-1 bg-primary/20 text-primary rounded-full text-sm">
  tag
</span>
```

### Title with Gradient
```jsx
<h1 className="text-4xl font-bold text-gradient">
  Capture-Now
</h1>
```

### Header with Navigation
```jsx
<header className="bg-surface border-b border-border">
  <nav className="flex items-center justify-between p-4">
    <h1 className="text-gradient font-bold text-xl">Capture-Now</h1>
    <div className="space-x-4">
      <a className="text-muted hover:text-accent transition-colors">Link</a>
    </div>
  </nav>
</header>
```

### Stats Card
```jsx
<div className="bg-surface border border-border rounded-xl p-6 text-center">
  <div className="text-3xl font-bold text-primary mb-2">12</div>
  <div className="text-muted">Label</div>
</div>
```

## 🎯 Recommended Combinations

### For Important Cards
```css
bg-card border-border-focus shadow-purple-lg
```

### For Highlighted Text
```css
text-accent font-semibold
```

### For Interactive Elements
```css
hover:bg-hover transition-colors cursor-pointer
```

### For Form Inputs
```css
bg-card border border-border text-foreground placeholder-muted focus:border-border-focus
```

## 🔤 Typography

### Font Families
```css
font-sans    /* Inter - For general UI */
font-mono    /* JetBrains Mono - For code/dates */
```

### Text Hierarchy
```css
text-foreground  /* Primary content */
text-accent      /* Important highlights */
text-muted       /* Secondary content */
```

## 🎨 Color Usage Guidelines

### Backgrounds
- Use `bg-background` for main page background
- Use `bg-surface` for elevated surfaces (headers, footers)
- Use `bg-card` for content containers
- Use `bg-hover` for interactive hover states

### Text
- Use `text-foreground` for main content
- Use `text-accent` for links and highlights
- Use `text-muted` for labels and secondary info

### Accents
- Use `bg-primary` and `text-primary` for main actions
- Use `bg-secondary` and `text-secondary` for secondary actions
- Use state colors (`success`, `warning`, `error`) for feedback

You're all set! 🚀 Use these clean classes to build a consistent interface.
