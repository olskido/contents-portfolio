// ============================================
// PROJECTS DATA — Edit this to add your work
// ============================================

// Media item types: 'image' | 'video' | 'gif'
// Project types: 'meme' | 'art' | 'thread' | 'article' | 'website' | 'mixed'

export const TWITTER_HANDLE = 'olskido'; // ← replace with your actual handle

export const SITE_CONFIG = {
  displayName: 'deeaaddd🍼🍼',
  altName: 'Olskido',
  tagline: 'Content Maker · Meme Architect · Digital Artist',
  bio: 'I make things the internet remembers. Memes, threads, art, campaigns — if it needs to be felt, I build it.',
  twitterUrl: 'https://twitter.com/olskiddo',
  twitterHandle: '@olskiddo',
};

const awifFiles = import.meta.glob('../assets/AWIF/*.{png,jpg,jpeg,webp,mp4}', { eager: true, import: 'default' });
const solunaFiles = import.meta.glob('../assets/Soluna-movement/*.{png,jpg,jpeg,webp,mp4}', { eager: true, import: 'default' });
const blocklordFiles = import.meta.glob('../assets/blocklord/*.{png,jpg,jpeg,webp,mp4}', { eager: true, import: 'default' });
const runnerFiles = import.meta.glob('../assets/runner/*.{png,jpg,jpeg,webp,mp4}', { eager: true, import: 'default' });
const therianFiles = import.meta.glob('../assets/therian/*.{png,jpg,jpeg,webp,mp4}', { eager: true, import: 'default' });
const henryFiles = import.meta.glob('../assets/Henry/*.{png,jpg,jpeg,webp,mp4}', { eager: true, import: 'default' });
const shadowcourtFiles = import.meta.glob('../assets/shadowcourt/*.{png,jpg,jpeg,webp,mp4}', { eager: true, import: 'default' });
const gizmoFiles = import.meta.glob('../assets/gizmo/*.{png,jpg,jpeg,webp,mp4}', { eager: true, import: 'default' });
const nedFiles = import.meta.glob('../assets/ned/*.{png,jpg,jpeg,webp,mp4}', { eager: true, import: 'default' });
const sacksboyFiles = import.meta.glob('../assets/sacksboy/*.{png,jpg,jpeg,webp,mp4}', { eager: true, import: 'default' });
const warbrosFiles = import.meta.glob('../assets/warbros/*.{png,jpg,jpeg,webp,mp4}', { eager: true, import: 'default' });
const warjackFiles = import.meta.glob('../assets/warjack/*.{png,jpg,jpeg,webp,mp4}', { eager: true, import: 'default' });

const genMedia = (files, prefix) => {
  return Object.entries(files).map(([path, url], i) => {
    const isVid = path.endsWith('.mp4');
    return {
      id: `${prefix}-${i}`,
      type: isVid ? 'video' : 'image',
      src: url,
      placeholder: isVid ? '🎥' : '🖼️',
      caption: path.split('/').pop()
    };
  });
};

export const PROJECTS = [
  {
    id: 'henry',
    title: 'Henry',
    subtitle: 'Project Content',
    type: 'mixed',
    tags: ['Crypto', 'Thread', 'Art'],
    description: 'Visual storytelling, character design, and comprehensive campaign threads for Henry.',
    color: '#4fc3f7',
    accentColor: '#0288d1',
    media: genMedia(henryFiles, 'henry'),
    articles: [
      { title: 'Henry Thread', url: 'https://x.com/twitter/status/2025625425649492476', platform: 'X/Twitter' }
    ],
    websiteUrl: null,
    featured: true,
    year: 2026,
  },
  {
    id: 'shadowcourt',
    title: 'Shadowcourt',
    subtitle: 'Worldbuilding Art',
    type: 'art',
    tags: ['Illustration', 'Worldbuilding'],
    description: 'Detailed illustration work and atmospheric lore art for the Shadowcourt universe.',
    color: '#9c6fbf',
    accentColor: '#6a1b9a',
    media: genMedia(shadowcourtFiles, 'shadowcourt'),
    articles: [],
    websiteUrl: null,
    featured: true,
    year: 2026,
  },
  {
    id: 'awif',
    title: 'AWIF',
    subtitle: 'AWIF Project Content',
    type: 'mixed',
    tags: ['Crypto', 'Meme', 'Art'],
    description: 'A comprehensive collection of visuals, artwork, and web design for the AWIF project. End-to-end creative ecosystem on Solana.',
    color: '#d4832a',
    accentColor: '#f0a040',
    media: genMedia(awifFiles, 'awif'),
    articles: [
      { title: 'My First Article', url: 'https://x.com/compose/articles/edit/2024798639466463232', platform: 'X/Twitter' }
    ],
    websiteUrl: 'https://awif-solana.vercel.app',
    featured: true,
    year: 2026,
  },
  {
    id: 'soluna',
    title: 'Soluna Movement',
    subtitle: 'Visual Direction & Concept',
    type: 'art',
    tags: ['Art', 'Design'],
    description: 'Visual direction, branding snippets, and original artwork conceptualized around the Soluna movement.',
    color: '#4fc3f7',
    accentColor: '#0288d1',
    media: genMedia(solunaFiles, 'soluna'),
    articles: [
      { title: 'Soluna Thread', url: 'https://x.com/twitter/status/2024500890825089065', platform: 'X/Twitter' }
    ],
    websiteUrl: null,
    featured: true,
    year: 2026,
  },
  {
    id: 'blocklord',
    title: 'Blocklord',
    subtitle: 'Character & World Art',
    type: 'art',
    tags: ['Illustration', 'Game Art'],
    description: 'Key art, character illustration, and atmospheric visual development for Blocklord.',
    color: '#c8a2c8',
    accentColor: '#9c6fbf',
    media: genMedia(blocklordFiles, 'blocklord'),
    articles: [],
    websiteUrl: null,
    featured: false,
    year: 2026,
  },
  {
    id: 'runner',
    title: 'Runner',
    subtitle: 'Motion & Visuals',
    type: 'mixed',
    tags: ['Animation', 'Action'],
    description: 'High-impact motion videos and key visuals for the Runner project.',
    color: '#4ade80',
    accentColor: '#22c55e',
    media: genMedia(runnerFiles, 'runner'),
    articles: [],
    websiteUrl: null,
    featured: false,
    year: 2026,
  },
  {
    id: 'therian',
    title: 'Therian',
    subtitle: 'Origin Story & Lore',
    type: 'mixed',
    tags: ['Video', 'Story', 'Art'],
    description: 'Video scripts, origin story pieces, and dark illustration work setting the stage for Therian.',
    color: '#f472b6',
    accentColor: '#ec4899',
    media: genMedia(therianFiles, 'therian'),
    articles: [],
    websiteUrl: null,
    featured: true,
    year: 2026,
  },
  {
    id: 'gizmo',
    title: 'Gizmo',
    subtitle: 'Gizmo Collection',
    type: 'art',
    tags: ['Art', 'Illustration'],
    description: 'A collection of visual art and illustrations for Gizmo.',
    color: '#34d399',
    accentColor: '#10b981',
    media: genMedia(gizmoFiles, 'gizmo'),
    articles: [],
    websiteUrl: null,
    featured: true,
    year: 2026,
  },
  {
    id: 'ned',
    title: 'Ned',
    subtitle: 'Ned Artwork',
    type: 'art',
    tags: ['Art', 'Design'],
    description: 'Explorations and design work for Ned.',
    color: '#f87171',
    accentColor: '#ef4444',
    media: genMedia(nedFiles, 'ned'),
    articles: [],
    websiteUrl: null,
    featured: false,
    year: 2026,
  },
  {
    id: 'sacksboy',
    title: 'Sacksboy',
    subtitle: 'Sacksboy Gallery',
    type: 'art',
    tags: ['Art', 'Character'],
    description: 'Character design and illustrations of Sacksboy.',
    color: '#60a5fa',
    accentColor: '#3b82f6',
    media: genMedia(sacksboyFiles, 'sacksboy'),
    articles: [],
    websiteUrl: null,
    featured: false,
    year: 2026,
  },
  {
    id: 'warbros',
    title: 'Warbros',
    subtitle: 'Warbros Gallery',
    type: 'art',
    tags: ['Art', 'Design'],
    description: 'A collection of visual art and illustrations for Warbros.',
    color: '#fbbf24',
    accentColor: '#d97706',
    media: genMedia(warbrosFiles, 'warbros'),
    articles: [],
    websiteUrl: 'https://warbros.xyz',
    featured: false,
    year: 2026,
  },
  {
    id: 'warjack',
    title: 'Warjack',
    subtitle: 'Warjack Artwork',
    type: 'art',
    tags: ['Art', 'Design'],
    description: 'Explorations and design work for Warjack.',
    color: '#9ca3af',
    accentColor: '#4b5563',
    media: genMedia(warjackFiles, 'warjack'),
    articles: [],
    websiteUrl: null,
    featured: false,
    year: 2026,
  }
];


export const SHOWCASE_ITEMS = [
  { id: 's1', type: 'image', src: awifFiles['../assets/AWIF/awffif.jpg'], placeholder: '�️', projectId: 'awif', label: 'AWIF Campaign' },
  { id: 's2', type: 'image', src: solunaFiles['../assets/Soluna-movement/1.jpeg'], placeholder: '🎨', projectId: 'soluna', label: 'Soluna Art' },
  { id: 's3', type: 'image', src: blocklordFiles['../assets/blocklord/lord2.png'], placeholder: '⚔️', projectId: 'blocklord', label: 'Blocklord Characters' },
  { id: 's4', type: 'video', src: runnerFiles['../assets/runner/runner most .mp4'], placeholder: '🏃', projectId: 'runner', label: 'Runner Action' },
  { id: 's5', type: 'video', src: therianFiles['../assets/therian/Video_Script_Generation_Origin_Story.mp4'], placeholder: '�', projectId: 'therian', label: 'Therian Origin Lore' },
];

export const TYPE_LABELS = {
  meme: 'Meme',
  art: 'Art',
  thread: 'Thread / Article',
  article: 'Article',
  website: 'Website',
  mixed: 'Mixed',
};

export const TYPE_COLORS = {
  meme: '#d4832a',
  art: '#c8a2c8',
  thread: '#4ade80',
  article: '#4ade80',
  website: '#fb923c',
  mixed: '#1d9bf0',
};
