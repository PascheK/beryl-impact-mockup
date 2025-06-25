# Project Architecture

This document describes the overall structure of the Beryl Impact scroll storytelling site and the responsibilities of its main components.

## Overview

The application is built with **Next.js 14** using the App Router and TypeScript. Animations are handled by **Framer Motion** and **GSAP ScrollTrigger**. Tailwind CSS 4.1 provides the styling layer. The site is divided into three major operational phases:

1. **Before** – Preparation activities before the hurricane
2. **During** – Emergency management and real-time response
3. **After** – Recovery and stabilisation actions

Each phase has an intro screen, a scroll-synced video with overlays, and an outro screen.

A global loading overlay ensures smooth transitions between sections, while the `HeroSection` introduces the experience.

## Component Responsibilities

- `AppWrapper` – wraps the entire app and provides layout structure.
- `LoadingOverlay` / `LoadingOverlayProvider` – context and component that show a page-level loading state when switching sections.
- `PresentationSection` – coordinates which phase (before/during/after) is visible and handles navigation between them.
- `FullScrollSection` – renders an intro, the scroll-synced video, any overlays, and an outro for a section.
- `ScrollVideoSection` – internal component that ties the HTML5 video to the scroll position using `useScrollVideo`.
- `Overlay` – animated overlay element that appears based on the current video time.

## FullScrollSection Logic

`FullScrollSection` composes the intro, video section and outro. It keeps track of video readiness and passes the current time to any overlay children. Overlays are only activated once the video metadata is loaded so that ScrollTrigger calculations are accurate.

```tsx
<FullScrollSection
  videoSrc="/videos/test.mp4"
  sectionId="before-section"
  scrollSpeed={500}
  introSection={<IntroSection />}
  outroSection={<OutroSection />}
  overlays={overlays}
/>
```

`useScrollVideo` controls the video playback and scaling via GSAP. The hook returns refs that are bound to the video container.

## Overlay Utilities

`src/utils/overlayUtils.tsx` exposes `renderOverlay` and `renderOverlays` helpers. Each overlay describes when it should appear and disappear, its alignment and type (info, warning, success, error) and the React content to render.

```tsx
renderOverlays([
  {
    key: 'example-1',
    appear: 3,
    disappear: 5,
    align: 'bottom left',
    type: 'info',
    content: <p>Sample overlay</p>,
  },
])
```

The utilities return a list of `<Overlay>` elements that `ScrollVideoSection` injects with the current video time. Visibility is computed in `Overlay` using `appear`/`disappear` values.

### Updating or Adding an Overlay

1. Locate the section component (e.g. `BeforeSection.tsx`).
2. Update the array passed to `renderOverlays` with your new item.
3. Provide a unique `key` and set `appear`/`disappear` timings in seconds.
4. The overlay content can be any React node. Use the `type` to style it.

## Internationalisation (i18n)

The project is not yet localised. To make it i18n-ready:

1. Introduce a library such as `next-intl` or `next-i18next`.
2. Store translation files in `i18n/<locale>.json` and load them through Next.js middleware.
3. Wrap text elements with a translation hook (e.g. `t('hero.title')`).
4. Provide language switcher UI if multiple locales are enabled.

## Performance & Animation Tips

- Use dynamic imports (`next/dynamic`) for heavy components to keep initial bundles small.
- Memoise overlay lists with `useMemo` to avoid re-creating React elements on every render.
- Optimise video files for web playback and specify `playsInline` for mobile devices.
- Avoid running ScrollTrigger logic until the video metadata is loaded.

## Contribution Guidelines

- Run `npm run lint` before pushing changes.
- Keep components small and focused; place reusable pieces under `components/common`.
- Document any new utilities in the `docs/` directory.
- Use meaningful commit messages and open pull requests for review.

