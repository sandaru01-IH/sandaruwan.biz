# Sandaruwan Sankalpa Silva - Personal Profile Website

A modern, cinematic personal profile website showcasing professional experience, skills, and achievements.

## Features

- 🎬 Cinematic landing slides with smooth animations
- 🌙 Dark & elegant design theme
- 📱 Fully responsive design
- ⚡ Built with Next.js 14+ and Framer Motion
- 🎨 Modern UI with glassmorphism effects
- 🚀 Optimized for GitHub Pages deployment

## Tech Stack

- **Framework**: Next.js 14+ (App Router)
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Language**: TypeScript
- **Deployment**: GitHub Pages

## Getting Started

### Prerequisites

- Node.js 18+ installed
- npm or yarn package manager

### Installation

1. Clone the repository:
```bash
git clone <your-repo-url>
cd Sandaruwan.biz
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Building for Production

```bash
npm run build
```

This will create an `out` directory with the static export ready for deployment.

## Deployment to GitHub Pages

### Automatic Deployment (Recommended)

The repository includes a GitHub Actions workflow that automatically deploys to GitHub Pages when you push to the `main` branch.

1. Push your code to GitHub
2. Go to your repository settings
3. Navigate to "Pages" section
4. Select "GitHub Actions" as the source
5. The workflow will automatically deploy on every push to `main`

### Manual Deployment

1. Build the project:
```bash
npm run build
```

2. Create a `.nojekyll` file in the `out` directory:
```bash
touch out/.nojekyll
```

3. Push the `out` directory to the `gh-pages` branch:
```bash
git subtree push --prefix out origin gh-pages
```

## Domain Configuration

The `CNAME` file is already configured for `sandaruwan.biz`. To connect your domain:

1. In your GitHub repository, go to Settings > Pages
2. Under "Custom domain", enter `sandaruwan.biz`
3. Update your DNS records:
   - Type: `CNAME`
   - Name: `@` or `www`
   - Value: `your-username.github.io`

## Project Structure

```
├── app/
│   ├── components/      # React components
│   ├── layout.tsx       # Root layout
│   ├── page.tsx         # Main page
│   └── globals.css      # Global styles
├── public/              # Static assets
├── .github/
│   └── workflows/       # GitHub Actions
└── CNAME                # Domain configuration
```

## License

© 2025 Sandaruwan Sankalpa Silva. All rights reserved.
