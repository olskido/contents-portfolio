# Olskido Portfolio — Setup Guide

## Quick Start

```bash
cd olskido-portfolio
npm install
npm run dev
```

Open http://localhost:5173

---

## Adding Your Real Content

### 1. Update Your Twitter Handle
Open `src/data/projects.js` and change:
```js
export const TWITTER_HANDLE = 'YourTwitterHandle'; // ← your actual @handle
```
And update:
```js
export const SITE_CONFIG = {
  twitterUrl: 'https://twitter.com/YourActualHandle',
  twitterHandle: '@YourActualHandle',
};
```

### 2. Add Your Projects

Each project in `PROJECTS` array looks like this:

```js
{
  id: 'unique-id',          // unique string
  title: 'Project Name',
  subtitle: 'Short tagline',
  type: 'meme',             // meme | art | thread | website | mixed
  tags: ['Tag1', 'Tag2'],
  description: 'What this project is about.',
  color: '#d4832a',         // brand color for this project
  accentColor: '#f0a040',   // slightly different accent
  media: [
    {
      id: 'm1',
      type: 'image',        // image | video
      src: '/media/your-project/file.jpg',  // path from /public folder
      placeholder: '🎨',    // shown while loading / if no src
      caption: 'Caption text',
    },
    {
      id: 'm2',
      type: 'video',
      src: '/media/your-project/video.mp4',
      placeholder: '🎬',
      caption: 'Video caption',
    },
  ],
  articles: [               // threads / articles you wrote
    { title: 'My Thread Title', url: 'https://twitter.com/...', platform: 'X/Twitter' },
    { title: 'My Article', url: 'https://medium.com/...', platform: 'Medium' },
  ],
  websiteUrl: 'https://yourwebsite.com',  // null if no website
  featured: true,           // shows in Featured row
  year: 2026,
}
```

### 3. Add Your Media Files

Put your images and videos in a `/public/media/` folder:

```
public/
  media/
    henry-penguin/
      art1.jpg
      banner.png
      thread-cover.jpg
    meme-drop-01/
      meme1.jpg
      meme2.jpg
    ...
```

Then in your project's media array:
```js
src: '/media/henry-penguin/art1.jpg'
```

### 4. Showcase Items (Hero Carousel)
Also in `projects.js`, update `SHOWCASE_ITEMS` to feature your best work:
```js
export const SHOWCASE_ITEMS = [
  { id: 's1', type: 'image', src: '/media/project/hero.jpg', placeholder: '🎨', projectId: 'your-project-id', label: 'Label Text' },
  ...
];
```

---

## Project Structure

```
src/
  components/
    hero/          → HeroSection (landing with avatar, stats, marquee)
    layout/        → Navbar
    showcase/      → MediaCarousel (auto-cycling 7s showcase wall)
    projects/      → ProjectGrid, ProjectFolder (cycling on hover), ProjectModal
    websites/      → WebsitePreview (iframe browser chrome), WebsitesSection
    twitter/       → TwitterFeed (live embed sidebar), ThreadsSection
  data/
    projects.js    ← EDIT THIS to add all your work
  styles/
    globals.css    → Design system, variables, animations
  assets/
    avatar.png     → Your profile picture
```

## Key Features Built

- **7-second auto-carousel** — cycles through showcase items, pauses on hover, manual controls
- **Video support** — 7s auto-play, muted by default, sound toggle button
- **Project folders** — hover cycles through media previews, click opens full modal
- **Project modal** — full media viewer with navigation, video controls, articles list, website preview
- **Website iframe previewer** — browser chrome UI, device switching (desktop/tablet/mobile)
- **Twitter live feed** — embedded timeline sidebar (tweets + replies tabs)
- **100+ projects ready** — grid auto-adjusts, never congests
- **List/Grid view toggle** — for when you have many projects
- **Filter by type** — meme, art, thread, website, mixed
- **Search** — real-time project search
- **Particle canvas** — animated background particles
- **Cursor glow** — amber light follows your cursor
- **Smooth section navigation** — navbar tracks your scroll position

## Build for Production

```bash
npm run build
npm run preview
```

The `dist/` folder is ready to deploy to Vercel, Netlify, or any static host.
