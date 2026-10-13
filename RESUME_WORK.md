# Portfolio checkpoint

Saved on 14 October 2026, Singapore time.

## Restart after turning the laptop on

Open PowerShell and run:

```powershell
cd D:\Programing\Clifton_Portfolio\site
npm run dev
```

Then open http://127.0.0.1:4173/. The portfolio is buildless; no dependency installation is required. Run `npm run check` to check the JavaScript syntax. A laptop shutdown stops the preview server but does not remove the saved website files.

## Current result

- Quiet galaxy design, self-hosted typography, phone navigation, light/dark themes, and restrained animations with pause and reduced-motion support.
- All four academic projects remain. Live Bus Data Integration is marked in progress. SandScape-AR remains included.
- "Download my resume" uses plain resume, without accents. The downloadable document is still the original supplied DOCX.
- Project readers include visuals, captions, previous/next navigation, keyboard focus restoration, and full-size image links.
- The latest GitHub-visual request is completed with an authentic screenshot of the Clinic app and exact copies of its original blocked-terrain texture and stair graphic. Source links point to the reviewed GitHub commit. The earlier Clinic route example and workflow remain available.
- SandScape, Shuttle, and Live Bus retain clearly labelled concept illustrations and documented workflows. No actual build photos were found in the SandScape repository; Shuttle's repository is empty; no Live Bus repository was supplied.

## Constraints to keep

- Keep future changes local unless the user explicitly asks to publish. Do not deploy, push, or update any public copy merely to preview changes.
- Keep the chill, minimal galaxy direction and phone-friendly controls. Do not restore the original landscape/painting reference image.
- Do not turn generated concept artwork into claims that it shows Clifton's actual build. Preserve source links and honest captions.
- Use the master-CV tab of the supplied Google Doc for biographical claims; the separate job-description tab is not Clifton's experience.
- The existing source ZIP at the workspace root predates these recent changes. The site directory and this Git checkpoint contain the current version.

## Where to continue editing

- `dist/projects.json`: project details, contributions, tags, status, links, and media.
- `dist/index.html`: biography, education, experience, contact, and download link.
- `dist/galaxy.css`: layout, colour tokens, gallery, and responsive rules.
- `dist/app.js`: menu, theme, project reader, visual switching, and copy feedback.
- `dist/galaxy.js`: procedural sky and motion controls.
- `PROJECT_SOURCES.md` and `PROJECT_MEDIA.md`: source evidence, asset paths, generation prompts, and provenance.
- `PRODUCT.md` and `DESIGN.md`: product brief and current design system.

There is no remaining implementation required for the latest request. If Clifton uploads real project photos or screenshots later, replace or extend the relevant media entries with those assets and their source captions.

## Source references

- GitHub profile: https://github.com/clifz272
- SandScape: https://github.com/clifz272/SandScape-AR
- Shuttle: https://github.com/clifz272/Shuttle-And-Passenger-Scheduling-System
- Clinic team: https://github.com/HZ-2502222/INF1008_P5_3
- Reviewed Clinic commit: e5ce91cefd3113b94fb8893e66f101b863f4aee0
- Master CV: https://docs.google.com/document/d/1Yu3BG76X1x9_KCbS7MvpiJHMAuyoPUIcx9YIkUd2Enk/edit?tab=t.gfij94da6stc

## Verification

JavaScript syntax and whitespace checks passed. All 11 project media files returned HTTP 200 with the correct content type. The copied PNGs match their GitHub blob hashes. Browser checks covered desktop, tablet, and 320/375-pixel phone layouts, visual switching by pointer and keyboard, both themes, source-link visibility, opening an original PNG at full size, and Escape/focus/scroll restoration. These are browser layout checks, not tests on physical phones.

## Optional tooling retained locally

Ignored `.sites-local/clinic-media/` contains the reviewed Clinic source, map, images, original screenshot, and screenshot encoder. `.sites-local/python-clinic/` contains isolated screenshot-capture dependencies; `.sites-local/python-media/` contains the earlier route-image tooling. None is needed to run the portfolio. The temporary Clinic app server is stopped after capture; only the portfolio preview is needed for normal editing.
