# Sandaruwan Silva — portfolio redesign

The homepage is now an editorial portfolio focused on urban informatics, spatial intelligence, and creative technology. Cream, olive, and terracotta colours connect a custom city model to map illustrations and typography.

## Interactions

- Drag the city or use its rotation buttons / left and right arrow keys.
- Switch the city lab between urban form, green spaces, and illustrative data intensity.
- Select a skill discipline to explore the tools and description.
- Expand capabilities, journey chapters, and experience rows for detail.
- Copy the public email address, open LinkedIn / GitHub, or view the existing profile PDF.
- Pause motion globally. System reduced-motion preferences are respected.

The city is generated from deterministic 3D geometry and projected onto a Canvas 2D surface. It needs no external model, WebGL, or heavy animation library. Rendering stops while offscreen. The diagrams and model are explicitly illustrative, rather than claims about completed projects or measured city datasets.

## Editing

- `data/profile.ts`: biography, experience, education, skills, services, contact details.
- `app/components/Portfolio.tsx`: structure, illustrations, interface copy.
- `app/portfolio.css`: responsive layout and visual system.
- `app/components/city-renderer.ts`: model geometry, colours, projection and interaction.
- `app/components/CityScene.tsx`: React integration and accessible rotation controls.

`public/Profile.pdf` serves the existing profile document. The admin page and its existing behaviour are retained.

## Build and deploy

Use `npm ci`, then `npm run build`. The Next.js static export writes to `out/`, including `public/CNAME` and the PDF. The existing `nextjs.yml` remains the single production deployment workflow on `main`; `deploy.yml` now validates review branches and pull requests instead of competing for deployment or attempting to copy a missing root CNAME.

A merge into `main` triggers the existing GitHub Pages deployment.
