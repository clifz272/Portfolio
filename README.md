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

All biographical content is in `dist/index.html`; theme and layout tokens are in `dist/styles.css`. Contact email is also used by the copy action in `dist/app.js`.

## Design

Reading this as a personal engineering portfolio for recruiters and collaborators, with a calm, nature-inspired language. Native CSS implements the aesthetic rather than borrowing a product design system.

Design variance 6, motion intensity 4, visual density 3. Warm green neutrals, self-hosted Outfit typography, original landscape artwork, restrained entrances and scroll reveals. Dark mode respects system preference and has a persistent manual toggle. Reduced-motion preferences disable motion.

## Sources and assets

Personal details come from the supplied Clifton_Ng_Resume.docx. LinkedIn could not be read automatically; the portfolio links to the corrected `www.linkedin.com/in/cliftonnjh` URL. Home address and phone number are not displayed in page content. The supplied résumé is available as a DOCX download.

Landscape: original artwork generated with the built-in ImageGen tool. Final website asset: `dist/assets/landscape.webp`. Generation prompt: a peaceful impressionist oil painting of a winding meadow path, sage and olive greenery, distant blue hills, billowing clouds, and afternoon light, with visible brush strokes and canvas texture; no text, people, logos, or watermarks. Full prompt retained in `artwork-prompt.txt`.

Outfit font files are self-hosted from Google Fonts. License: SIL Open Font License, included under `dist/assets/OFL.txt`.

## Hosting

The Site identity and static publishing directory are tracked in `.openai/hosting.json`. Use the Sites workflow to update the existing Site; do not create a second Site for future edits.
