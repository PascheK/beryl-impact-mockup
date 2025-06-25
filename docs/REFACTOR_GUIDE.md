# Refactoring Guide

This document outlines suggestions for structuring the scroll-based storytelling
application to keep components reusable and the project maintainable.

## Folder Structure

```
src/
  app/
  components/
    common/        # generic UI elements
    layout/        # layout wrappers / navigation
  hooks/           # custom reusable hooks
  sections/
    before/
    during/
    after/
  utils/
  types/
```

- **components/common** – `BulletPointCard`, `FactHighlight`, `InfoTable`, etc.
- **components/layout** – `Navbar`, `AppWrapper`, `LoadingOverlay`.
- **sections/** – each major section (before, during, after) with its own
  `IntroSection`, `FullScrollSection`, `OutroSection`.
- **hooks/** – reusable logic such as `useScrollVideo`.

## Custom Hook Example

`useScrollVideo` centralizes GSAP/ScrollTrigger logic for scroll-synced videos:

```ts
const { containerRef, videoRef, wrapperRef, currentTime } = useScrollVideo({
  src: '/videos/test.mp4',
  scrollSpeed: 500,
  activate: videoReady,
  onReady: () => setVideoReady(true),
})
```

The hook returns refs and the current playback time, decoupling video logic from
presentation components.

## Performance

- Heavy components such as section intros or data tables can be loaded using
  Next.js `dynamic()` when appropriate.
- Memoize overlay arrays with `useMemo` to avoid unnecessary re-renders.

## Naming and Component Patterns

- Use `SectionIntro`, `SectionOutro`, and `SectionContent` naming for clarity.
- Prefer functional components in `components/common` for simple UI pieces.
- Keep overlay configuration data separate from UI logic (e.g., in `utils`).

## Styling

- Consolidate base classes (e.g., overlay styles) in utility variables to keep
  Tailwind usage DRY.
- Ensure buttons and interactive elements use focus/hover states for
  accessibility.

## Accessibility

- Provide `aria-label`s for navigation buttons and descriptive text for icon
  elements.
- Ensure color contrast meets accessibility guidelines.

These practices should make the project easier to extend and prepare it for
production use.
