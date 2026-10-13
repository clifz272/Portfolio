# Clifton Ng's portfolio

A lightweight, buildless portfolio with native HTML, CSS, and JavaScript. No dependency installation or build step is required.

## Preview

Run `npm run dev` from this directory and open http://127.0.0.1:4173.

## Add projects later

The portfolio intentionally ships with no project details. Edit `dist/projects.json` to add real projects. Each entry supports `title`, `summary`, `year`, `tags`, `image`, `imageAlt`, `details`, and `url`. Only `title` is required. Keep the array empty until real content is available.

- Save project images under `dist/assets/` and reference them as `assets/your-image.webp`.
- `details` opens an accessible project dialog. Paragraphs can be separated with newline characters.
- `url` is an optional external HTTP(S) project link.
- Missing images or links are omitted rather than replaced by fake work.

All biographical content is in `dist/index.html`; theme and layout tokens are in `dist/galaxy.css`. Contact email is also used by the copy action in `dist/app.js`. The procedural starfield is implemented in `dist/galaxy.js`.

## Design

The latest brief specifies a quiet galaxy theme, no landscape picture, and phone optimization. The portfolio uses native CSS and canvas, with guidance from the installed GitHub design skills UI/UX Pro Max and Impeccable.

Design variance 6, motion intensity 4, visual density 3. Midnight blue surfaces, lunar blue accents, self-hosted Manrope typography, and procedural stars and orbital geometry. The initial theme is dark; a persistent light-mode toggle is available. Animation stops under reduced-motion preferences, while the hero is offscreen, and while the tab is hidden. A persistent pause control is also available. Phone animation is capped at 24 frames per second with 48 stars and a pixel-ratio cap of 1.5. The canvas is decorative; all text and actions use accessible HTML.

## Sources and assets

Personal details come from the supplied Clifton_Ng_Resume.docx. LinkedIn could not be read automatically; the portfolio links to the corrected `www.linkedin.com/in/cliftonnjh` URL. Home address and phone number are not displayed in page content. The supplied résumé is available as a DOCX download.

There is no landscape image in the website. The galaxy background is rendered from code and requires no image download.

Manrope is self-hosted from the Google Fonts repository. License: SIL Open Font License, included under `dist/assets/OFL.txt`. Icons come from the official Tabler Icons repository, with its MIT license under `dist/assets/icons/LICENSE`.

## Hosting

The Site identity and static publishing directory are tracked in `.openai/hosting.json`. Use the Sites workflow to update the existing Site; do not create a second Site for future edits.
