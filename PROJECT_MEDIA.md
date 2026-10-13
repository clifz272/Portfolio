# Project visuals

Added locally on 13 October 2026.

The three concept illustrations were created with the built-in image generation tool, then encoded as WebP for the website. They are explanatory artwork and are captioned as concept illustrations. They are not photos of Clifton's actual builds.

## Saved website assets

- `dist/assets/projects/sandscape-concept.webp`
- `dist/assets/projects/shuttle-concept.webp`
- `dist/assets/projects/live-bus-concept.webp`
- `dist/assets/projects/clinic-route-example.webp`
- `dist/assets/projects/clinic-app-screenshot.webp`
- `dist/assets/projects/clinic-bush.png`
- `dist/assets/projects/clinic-stairs.png`
- `dist/assets/projects/sandscape-workflow.svg`
- `dist/assets/projects/shuttle-workflow.svg`
- `dist/assets/projects/clinic-workflow.svg`
- `dist/assets/projects/live-bus-workflow.svg`

The workflow SVGs explain the scope already recorded in projects.json and PROJECT_SOURCES.md. They can be regenerated with `node scripts/create-project-diagrams.mjs`. The live-bus workflow is explicitly planned work.

## Clinic route example

The route image uses the map, plotting assets, and the `load_maze`, `build_graph`, `dijkstra_animated`, `create_base_figure`, and `update_overlay` functions from [the team repository](https://github.com/HZ-2502222/INF1008_P5_3). Only those reviewed functions were used for this image; the Streamlit app and its simulation were not launched during its generation. The sample route is A to B to E, with rain preference and stair avoidance enabled. Both computed routes were checked to reach their destinations and contain no stair cells. This is a generated example of the team code's output, not a screenshot of a deployed application.

Source identities: app.py `b7934618ad959b995a628a393eb64786cc396fcd`; map.txt `49a0117542437e547b8b2f0b405c01a1636882d8`. Downloaded sources and original generation files remain in ignored .sites-local tooling folders; the original image generation outputs also remain in the Codex generated-images folder.

## Original GitHub visuals added on 14 October 2026

The Clinic app screenshot was captured through the browser from the unmodified `app.py` running locally, using the repository's dark Streamlit theme, map, and PNG assets. It shows an A to B route with rain and wheelchair preferences enabled. Its displayed result is 4 normal steps, 52 sheltered steps, zero stairs, 56 total steps, and a total weight of 452. These are sample route results from the app, not portfolio performance claims. The animation button was not triggered. The app's collision path has a hard-coded chance of zero and was not entered; no audio was played. The temporary app server is stopped after capture.

The screenshot is 1280 by 720 pixels, encoded as WebP at quality 86 without cropping or changing its contents: 69,150 bytes. Its original PNG and the encoding script remain under ignored `.sites-local/clinic-media/`. Streamlit and its dependencies are isolated under `.sites-local/python-clinic/`; the portfolio itself still needs no installed dependencies.

The two "Map assets" PNGs are exact copies of their GitHub files, with matching Git blob hashes:

| Local asset | Repository file | Git blob SHA |
| --- | --- | --- |
| clinic-bush.png | [bush.png](https://github.com/HZ-2502222/INF1008_P5_3/blob/e5ce91cefd3113b94fb8893e66f101b863f4aee0/bush.png) | fb20153c4245d1c3cff7e9d7521143bd8e6663f9 |
| clinic-stairs.png | [stairs.png](https://github.com/HZ-2502222/INF1008_P5_3/blob/e5ce91cefd3113b94fb8893e66f101b863f4aee0/stairs.png) | ce1586ddeeed4861d68c868964d46d80ca86e3d0 |

The original bush texture is 169 by 152 pixels; the stair graphic is 512 by 512 pixels. They are shown as map assets with direct source links, not labelled as photos of Clifton's builds. The third original PNG, blk.png, has visible Shutterstock watermarks. It is retained in the authentic app output but has not been imported as a standalone portfolio photo or altered to remove marks.

No finished screenshots or build photos were present in the reviewed SandScape tree or empty Shuttle repository. Those readers keep their clearly captioned concept artwork and workflows.

## Image generation prompts

### sandscape

Use case: stylized-concept. Asset type: wide 3:2 project illustration for a minimalist midnight-blue computer-engineering portfolio. Create a beautiful, clearly illustrated conceptual AR sandbox: a small open rectangular tray of tactile sand with sculpted terrain, a compact stereo depth camera suspended above it on a slim rig, and a discreet projector casting crisp topographic contours and cyan-to-periwinkle elevation colours onto the sand. This is a standalone conceptual illustration, not a photograph or fabricated screenshot of a real student's build. Premium editorial 3D render, tactile matte materials, restrained detail, dark navy #0b1020 backdrop, cool blue #a9befa accents, softly lit terrain, isometric three-quarter view. Objects fully inside frame with generous negative space, composition horizontal. The project combines depth-camera input, Raspberry Pi processing, and projected terrain visuals; show a small generic circuit board beside the tray without branding. Avoid people, logos, text, watermarks, UI panels, space planets, photoreal workshop scene, or unrelated landscape painting.

### shuttle

Use case: stylized-concept. Asset type: wide 3:2 project illustration for a minimalist midnight-blue computer-engineering portfolio. Create a premium editorial 3D concept illustration representing a shuttle and passenger scheduling system: one simple miniature shuttle bus on a few clean curved route lines, three abstract passenger tokens waiting at two stops, and a small clock disc to suggest arrival timing. Clearly an illustration, not a real product photo or software screenshot. Tactile matte objects, crisp quiet geometry, isometric three-quarter view, midnight navy #0b1020 background with pale periwinkle #a9befa and soft icy-blue accents, understated soft light, no bright multicolour. Fully framed with generous breathing room, horizontal composition. Avoid readable text, fake dashboards, invented numerical schedules, badges, people with faces, logos, watermarks, planets or stars.

### live-bus

Use case: stylized-concept. Asset type: wide 3:2 project illustration for a minimalist midnight-blue computer-engineering portfolio. Create a premium editorial 3D concept illustration representing an in-progress live bus data integration project: a miniature simplified bus at one side, a small stream of distinct blue data blocks moving toward two quiet database cylinders, one structured with orderly layers and one with a few flexible grouped blocks. This is conceptual artwork, not a screenshot, not evidence of a finished application. Refined matte objects with a little translucent blue material, crisp geometry, midnight navy #0b1020 background and soft periwinkle #a9befa accents, isometric three-quarter angle, calm soft lighting. All objects inside the frame with generous margins, horizontal 3:2 composition. Avoid text, dashboards, made-up API metrics or code, logos, watermarks, futuristic neon clutter, planets or stars.
