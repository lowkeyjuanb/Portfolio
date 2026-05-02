---
name: Architect Dark
colors:
  surface: '#0b1326'
  surface-dim: '#0b1326'
  surface-bright: '#31394d'
  surface-container-lowest: '#060e20'
  surface-container-low: '#131b2e'
  surface-container: '#171f33'
  surface-container-high: '#222a3d'
  surface-container-highest: '#2d3449'
  on-surface: '#dae2fd'
  on-surface-variant: '#c7c4d7'
  inverse-surface: '#dae2fd'
  inverse-on-surface: '#283044'
  outline: '#908fa0'
  outline-variant: '#464554'
  surface-tint: '#c0c1ff'
  primary: '#c0c1ff'
  on-primary: '#1000a9'
  primary-container: '#8083ff'
  on-primary-container: '#0d0096'
  inverse-primary: '#494bd6'
  secondary: '#7bd0ff'
  on-secondary: '#00354a'
  secondary-container: '#00a6e0'
  on-secondary-container: '#00374d'
  tertiary: '#bcc7de'
  on-tertiary: '#263143'
  tertiary-container: '#8691a7'
  on-tertiary-container: '#1f2a3c'
  error: '#ffb4ab'
  on-error: '#690005'
  error-container: '#93000a'
  on-error-container: '#ffdad6'
  primary-fixed: '#e1e0ff'
  primary-fixed-dim: '#c0c1ff'
  on-primary-fixed: '#07006c'
  on-primary-fixed-variant: '#2f2ebe'
  secondary-fixed: '#c4e7ff'
  secondary-fixed-dim: '#7bd0ff'
  on-secondary-fixed: '#001e2c'
  on-secondary-fixed-variant: '#004c69'
  tertiary-fixed: '#d8e3fb'
  tertiary-fixed-dim: '#bcc7de'
  on-tertiary-fixed: '#111c2d'
  on-tertiary-fixed-variant: '#3c475a'
  background: '#0b1326'
  on-background: '#dae2fd'
  surface-variant: '#2d3449'
typography:
  h1:
    fontFamily: Inter
    fontSize: 4rem
    fontWeight: '800'
    lineHeight: '1.1'
    letterSpacing: -0.02em
  h2:
    fontFamily: Inter
    fontSize: 2.5rem
    fontWeight: '700'
    lineHeight: '1.2'
    letterSpacing: -0.01em
  h3:
    fontFamily: Inter
    fontSize: 1.75rem
    fontWeight: '600'
    lineHeight: '1.3'
  body-lg:
    fontFamily: Inter
    fontSize: 1.125rem
    fontWeight: '400'
    lineHeight: '1.75'
  body-md:
    fontFamily: Inter
    fontSize: 1rem
    fontWeight: '400'
    lineHeight: '1.6'
  code-label:
    fontFamily: Space Grotesk
    fontSize: 0.875rem
    fontWeight: '500'
    lineHeight: '1.5'
    letterSpacing: 0.05em
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  base: 4px
  container-max: 1280px
  gutter: 24px
  section-padding: 120px
  stack-sm: 8px
  stack-md: 16px
  stack-lg: 32px
---

## Brand & Style

This design system is engineered to project technical mastery, precision, and high-end software craftsmanship. The brand personality is authoritative yet understated, mirroring the profile of a senior developer who prioritizes system architecture and clean execution over decorative clutter. 

The aesthetic sits at the intersection of **Minimalism** and **Glassmorphism**. It utilizes a deep, charcoal-based dark mode to reduce eye strain and provide a canvas for vibrant, high-energy accents. Visual depth is achieved through layered translucency and subtle atmospheric glows rather than heavy textures. Abstract grid overlays and monospaced accents provide a "system-level" feel, suggesting a developer who works close to the metal while maintaining a polished, user-centric perspective.

## Colors

The palette is anchored in a deep charcoal-blue (`#0f172a`) to establish a premium, tech-focused environment. Contrast is managed through a hierarchy of grays: high-contrast white (`#f8fafc`) for primary headings and muted slate for body text and metadata.

The accent strategy uses a vibrant Indigo-to-Electric Blue gradient. This is reserved for primary actions, progress indicators, and interactive states. Subtle gradients should be applied as background radial glows (e.g., a deep violet glow in the top-right corner) to break the monotony of the dark background without sacrificing readability.

## Typography

This design system utilizes **Inter** for its systematic, neutral, and highly legible characteristics across all UI tiers. To emphasize the technical nature of the portfolio, **Space Grotesk** is used sparingly for labels, tags, and small technical metadata to provide a geometric, futuristic edge.

Visual hierarchy is driven by extreme scale differences and weight. Headlines should be bold and tight, while body copy maintains generous line heights to ensure long-form technical case studies remain readable. Use uppercase for `code-label` elements to denote categories or tech-stack tags.

## Layout & Spacing

The layout follows a **Fixed Grid** model for desktop, centered on a 1280px container with a 12-column structure. Spacing is governed by a strict 4px/8px baseline power-of-two scale to ensure mathematical consistency.

Generous whitespace is mandatory to maintain a "premium" feel. Sections should be separated by significant vertical padding (`120px+`) to allow each project or skill set to breathe. Use a 24px gutter for grid items, ensuring that complex data visualizations or code blocks do not feel cramped.

## Elevation & Depth

Depth is communicated through **Glassmorphism** and tonal layering rather than traditional drop shadows. 

1. **Base Layer:** The deepest background (`#0f172a`).
2. **Surface Layer:** Cards and containers use a slightly lighter slate (`#1e293b`) with a 1px stroke of `border-glass` to define edges.
3. **Overlay Layer:** Modals and tooltips utilize `backdrop-filter: blur(12px)` with a semi-transparent background (`rgba(30, 41, 59, 0.7)`).

Shadows, when used, are extra-diffused and tinted with the primary indigo color (`rgba(99, 102, 241, 0.2)`) to create a subtle neon underglow effect on primary buttons and active cards.

## Shapes

The design system uses a **Rounded** language (8px to 12px) to soften the "industrial" feel of the tech-focused palette. 

- **Small elements (Checkboxes, Tags):** 4px (rounded-sm)
- **Standard elements (Buttons, Inputs):** 8px (default)
- **Large elements (Cards, Container Sections):** 16px (rounded-lg)

Maintain strict consistency in corner radii across nested elements (e.g., if a card has a 16px radius, the inner padding should be 16px and internal buttons should be 8px).

## Components

### Buttons
- **Primary:** Solid indigo gradient background, white text, subtle indigo outer glow on hover.
- **Secondary:** Transparent background with a 1px glass border; fills with a subtle slate on hover.
- **Ghost:** No border or background; text turns primary indigo on hover.

### Cards (Project/Experience)
Cards feature a 1px top and left border in a lighter tint to simulate a light source. Use a background blur when cards overlap decorative background gradients.

### Inputs & Form Fields
Fields should use a dark, inset background (`#020617`) with a 1px border that transitions to the primary indigo color on focus. Use the `code-label` typography for field labels.

### Chips & Tags
Small, low-contrast capsules (e.g., "React", "Node.js"). Background: `rgba(255, 255, 255, 0.05)`, Text: `text-secondary`.

### Additional Elements
- **Code Blocks:** Syntax-highlighted blocks with a custom scrollbar and a "Copy" button in the top-right corner.
- **Progress Indicators:** Thin, vibrant lines or circular dots for skill proficiency, utilizing the electric blue accent.
- **Grid Pattern:** A subtle, repeating 20px dot or line grid used in the background of hero sections to reinforce the "systems" theme.