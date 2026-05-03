---
name: Industrial Editorial
colors:
  surface: '#f9f9f9'
  surface-dim: '#dadada'
  surface-bright: '#f9f9f9'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f3f3f4'
  surface-container: '#eeeeee'
  surface-container-high: '#e8e8e8'
  surface-container-highest: '#e2e2e2'
  on-surface: '#1a1c1c'
  on-surface-variant: '#434656'
  inverse-surface: '#2f3131'
  inverse-on-surface: '#f0f1f1'
  outline: '#737688'
  outline-variant: '#c3c5d9'
  surface-tint: '#004dea'
  primary: '#0041c8'
  on-primary: '#ffffff'
  primary-container: '#0055ff'
  on-primary-container: '#e3e6ff'
  inverse-primary: '#b6c4ff'
  secondary: '#5e5e5e'
  on-secondary: '#ffffff'
  secondary-container: '#e2e2e2'
  on-secondary-container: '#646464'
  tertiary: '#705d00'
  on-tertiary: '#ffffff'
  tertiary-container: '#caa900'
  on-tertiary-container: '#4c3e00'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#dce1ff'
  primary-fixed-dim: '#b6c4ff'
  on-primary-fixed: '#001551'
  on-primary-fixed-variant: '#0039b3'
  secondary-fixed: '#e2e2e2'
  secondary-fixed-dim: '#c6c6c6'
  on-secondary-fixed: '#1b1b1b'
  on-secondary-fixed-variant: '#474747'
  tertiary-fixed: '#ffe170'
  tertiary-fixed-dim: '#e9c400'
  on-tertiary-fixed: '#221b00'
  on-tertiary-fixed-variant: '#544600'
  background: '#f9f9f9'
  on-background: '#1a1c1c'
  surface-variant: '#e2e2e2'
typography:
  display-xl:
    fontFamily: Inter
    fontSize: 120px
    fontWeight: '800'
    lineHeight: 100%
    letterSpacing: -0.04em
  headline-lg:
    fontFamily: Inter
    fontSize: 48px
    fontWeight: '700'
    lineHeight: 110%
    letterSpacing: -0.02em
  headline-md:
    fontFamily: Inter
    fontSize: 24px
    fontWeight: '700'
    lineHeight: 120%
    letterSpacing: -0.01em
  body-lg:
    fontFamily: Inter
    fontSize: 18px
    fontWeight: '400'
    lineHeight: 160%
    letterSpacing: '0'
  body-md:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 160%
    letterSpacing: '0'
  label-caps:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: '700'
    lineHeight: 100%
    letterSpacing: 0.1em
  mono-label:
    fontFamily: Inter
    fontSize: 11px
    fontWeight: '500'
    lineHeight: 100%
    letterSpacing: 0.05em
spacing:
  unit: 8px
  gutter: 24px
  margin-page: 64px
  section-gap: 160px
  modular-unit: 40px
---

## Brand & Style

This design system is built upon the intersection of precise engineering and high-end editorial curation. It adopts an **Industrial Minimalism** aesthetic, drawing inspiration from technical blueprints and the functional clarity of Swiss design. The visual narrative is defined by "The Blueprint Mentality"—treating the portfolio not just as a gallery, but as a documented technical achievement.

The emotional response should be one of "Structured Innovation." It feels premium through its restraint, professional through its precision, and cinematic through its use of scale and high-contrast compositions. Key stylistic drivers include:
*   **Technical Documentation:** Use of instructional UI details, such as coordinate systems, serial numbers, and "Figure 01" labeling.
*   **Cinematic Pacing:** Large-scale imagery and intentional voids (negative space) to create a sense of rhythm and importance.
*   **Functional Rawness:** Visible structural elements like fine hairlines and modular blocks that suggest the underlying logic of the software developer's craft.

## Colors

The palette is strictly functional, avoiding gradients to maintain a flat, industrial "printed" quality. 

*   **Black & White:** Form the architectural foundation. White provides the expansive "manual" background, while Black is used for heavy typographic weight and structural borders.
*   **Signal Blue:** Reserved for primary actions, progress indicators, and "active" states. It represents the energy of code and connectivity.
*   **Caution Yellow:** Used sparingly for metadata, tags, and small alerts. It mimics the functional markers found in industrial environments and physical manuals.
*   **Greyscale Tones:** Used only for secondary technical details, such as grid lines or disabled states, ensuring they do not distract from the primary content.

## Typography

This design system utilizes **Inter** exclusively to achieve a utilitarian, systematic appearance. The hierarchy is driven by extreme scale variance.

*   **Display Typography:** Used for section headers or project titles. These should be set with tight tracking to feel like a solid block of "ink."
*   **Editorial Styling:** Body text follows a classic column width (max 65 characters) to ensure readability, reminiscent of high-end journals or manuals.
*   **Technical Labels:** Small, all-caps labels are used to annotate the UI. These are the "manual details"—often paired with Yellow backgrounds or thin Black outlines to denote metadata like "YEAR," "TECH STACK," or "VERSION."

## Layout & Spacing

The layout is governed by a **12-column modular grid** with an emphasis on asymmetry. 

*   **Modular Rhythm:** Layouts should feel constructed. Use consistent 8px increments for internal component spacing, but use wide 160px gaps between major sections to provide cinematic "breathing room."
*   **The "Offset" Principle:** Align core content to the grid, but allow technical labels or serial numbers to sit in the margins. This creates an "exploded view" effect common in product manuals.
*   **Asymmetry:** Avoid centered layouts. Flush-left alignment is the standard. Large imagery should often span 8 columns, leaving 4 columns of whitespace for technical annotations or secondary text.

## Elevation & Depth

To maintain the industrial-manual aesthetic, this design system rejects shadows and blurs. Depth is communicated through **Structural Layering and Bold Borders**.

*   **Hard Outlines:** Surfaces are defined by 1px or 2px solid black borders. There is no concept of "z-axis" height; instead, depth is perceived as "stacked sheets" of information.
*   **Inversion:** High-contrast color blocks (Black containers on White backgrounds) create a visual hierarchy without needing elevation.
*   **Technical Lines:** Use horizontal and vertical "hairlines" (0.5px - 1px) to connect related elements, simulating the look of a technical schematic or a blueprint.

## Shapes

The shape language is strictly **Sharp (0px)**. 

Every element—buttons, cards, input fields, and containers—must have 90-degree corners. This reinforces the precision of industrial design and the "cut" feel of a printed document. 

Avoid circles or rounded pills even for buttons; use rectangles with generous internal padding to maintain the architectural integrity. The only exceptions are specific iconography or circular technical markers (like a "recording" indicator or a status dot).

## Components

*   **Buttons:** Rectangular, sharp-edged. Primary buttons use the Signal Blue background with White text. Secondary buttons use a Black 1px outline. Use "Label-caps" typography for button labels.
*   **The "Technical Tag":** Small rectangular chips with a Caution Yellow background and Black mono-label text. Used for status indicators (e.g., [LIVE], [STABLE], [V.1.0]).
*   **Content Cards:** Defined by 1px Black outlines. Headlines sit at the top-left, while a "Figure Number" (e.g., 01, 02) sits at the top-right in a small mono-font.
*   **Lists:** Editorial-style bullet points using small square markers instead of circles. Horizontal hairlines separate list items to maintain the modular grid look.
*   **Inputs:** Underlined or fully boxed with sharp corners. Label text sits above the input field, left-aligned, in a small caps format.
*   **Annotated Image:** Images should be framed by a 1px border. Technical lines may "point" to specific features within the image, leading to a small text block in the margin, imitating a product manual.