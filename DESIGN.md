---
name: Clifton Ng — Quiet Galaxy
description: A minimal portfolio with a calm procedural sky and clear, unboxed reading sections.
colors:
  paper: "#0b1020"
  surface: "#11192b"
  text: "#e7ecf5"
  muted: "#a2aec2"
  accent: "#a9befa"
  accent-hover: "#c5d2ff"
  accent-text: "#101b36"
  line: "#2c3850"
  pill: "#192640"
  orbit: "#899fde"
  planet-light: "#304875"
  planet-dark: "#0b1122"
  paper-light: "#f2f5fb"
  surface-light: "#e6ebf6"
  text-light: "#182640"
  muted-light: "#4b5d78"
  accent-light: "#345ba8"
  accent-hover-light: "#234983"
  accent-text-light: "#f8faff"
  line-light: "#bdc9dd"
  pill-light: "#dde5f4"
  orbit-light: "#7187b9"
  planet-light-light: "#b4c4e7"
  planet-dark-light: "#e5ebf6"
typography:
  display:
    fontFamily: "Manrope, Arial, sans-serif"
    fontSize: "clamp(55px, 6.8vw, 88px)"
    fontWeight: 600
    lineHeight: 1.1
    letterSpacing: "-0.04em"
  headline:
    fontFamily: "Manrope, Arial, sans-serif"
    fontSize: "clamp(29px, 3.2vw, 42px)"
    fontWeight: 600
    lineHeight: 1.2
    letterSpacing: "-0.035em"
  title:
    fontFamily: "Manrope, Arial, sans-serif"
    fontSize: "20px"
    fontWeight: 600
    lineHeight: 1.25
    letterSpacing: "-0.02em"
  body:
    fontFamily: "Manrope, Arial, sans-serif"
    fontSize: "16px"
    fontWeight: 400
    lineHeight: 1.75
  section-body:
    fontFamily: "Manrope, Arial, sans-serif"
    fontSize: "15px"
    fontWeight: 400
    lineHeight: 1.75
  tagline:
    fontFamily: "Manrope, Arial, sans-serif"
    fontSize: "clamp(18px, 2vw, 23px)"
    fontWeight: 400
    lineHeight: 1.5
    letterSpacing: "-0.025em"
  button:
    fontFamily: "Manrope, Arial, sans-serif"
    fontSize: "14px"
    fontWeight: 600
    lineHeight: 1.5
  label:
    fontFamily: "Manrope, Arial, sans-serif"
    fontSize: "12px"
    fontWeight: 400
    lineHeight: 1.75
rounded:
  surface: "16px"
  pill: "999px"
  circle: "50%"
spacing:
  compact: "8px"
  small: "16px"
  gutter: "20px"
  medium: "24px"
  large: "28px"
  action: "32px"
  touch: "44px"
components:
  button-primary:
    backgroundColor: "{colors.accent}"
    textColor: "{colors.accent-text}"
    typography: "{typography.button}"
    rounded: "{rounded.pill}"
    padding: "13px 23px"
  button-primary-hover:
    backgroundColor: "{colors.accent-hover}"
  button-primary-light:
    backgroundColor: "{colors.accent-light}"
    textColor: "{colors.accent-text-light}"
    typography: "{typography.button}"
    rounded: "{rounded.pill}"
    padding: "13px 23px"
  text-link:
    textColor: "{colors.accent}"
    padding: "6px 0"
  theme-toggle:
    textColor: "{colors.text}"
    typography: "{typography.label}"
    rounded: "{rounded.pill}"
    padding: "8px 15px"
  skill-chip:
    backgroundColor: "{colors.pill}"
    textColor: "{colors.accent}"
    typography: "{typography.label}"
    rounded: "{rounded.pill}"
    padding: "5px 13px"
  empty-projects:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.text}"
    rounded: "{rounded.surface}"
    padding: "35px"
  navigation-link:
    textColor: "{colors.muted}"
  navigation-link-current:
    textColor: "{colors.text}"
  experience-disclosure:
    textColor: "{colors.text}"
    padding: "28px 0"
---

# Design System: Clifton Ng — Quiet Galaxy

## Overview

**Creative North Star: "Quiet Galaxy"**

Midnight surfaces, lunar text, and restrained periwinkle actions carry Clifton's chill, minimal personality. A sparse procedural sky and fine orbital geometry provide atmosphere while the content stays readable and mostly unboxed. The identity uses one type family, generous section spacing, and a small set of clear controls.

The first visit starts in dark mode. A manual theme control switches to the corresponding light palette and persists the visitor's choice. The shipped landscape photograph has been removed; the sky is native canvas and CSS geometry, with SVG files for interface icons.

**Key Characteristics:**
- Quiet blue atmosphere with a single action accent.
- Self-hosted Manrope across headings, body, and controls.
- Flat reading sections, fine dividers, and pill-shaped actions.
- Decorative hero motion with pause and reduced-motion support.
- Compact phone layouts with large interactive targets.

## Colors

The palette is cool and low-noise; tonal surface changes establish hierarchy without introducing competing accents. The frontmatter preserves the shipped CSS values. Tokens ending in `-light` are the alternate light-mode values; header color follows the paper color in each theme.

### Primary

- **Periwinkle action** (`accent`): primary buttons, text links, the name's punctuation, skill text, focus outlines, and small orbital satellites.
- **Pale periwinkle response** (`accent-hover`): primary button hover state.
- **Deep action ink** (`accent-text`): text and icons on the dark theme's filled action.
- **Blue action, deeper blue response, and pale action ink** (`accent-light`, `accent-hover-light`, `accent-text-light`): the same functions in light mode.

### Neutral

- **Midnight paper** (`paper`): the page, sticky header, and dialog base.
- **Raised midnight tone** (`surface`): the project empty state, contact band, and quiet control hover backgrounds.
- **Lunar text** (`text`) and **blue-gray secondary text** (`muted`): headings and body hierarchy.
- **Fine blue divider** (`line`): section boundaries, disclosure rows, control outlines, and scrollbar color.
- **Blue chip tone** (`pill`): skill chips and disclosure hover feedback.
- **Orbital blue** (`orbit`): thin elliptical geometry and monogram outline; geometry uses transparent color mixes.
- **Planet tones** (`planet-light`, `planet-dark`): the small radial-gradient orbital core.
- **Cool paper, pale blue surfaces, dark text, and slate secondary text** (the corresponding `-light` tokens): preserve those roles in light mode.

**The One Accent Rule.** Use the theme's existing blue accent for actions and emphasis; keep ordinary paragraphs in secondary text and headings in primary text.

## Typography

**Display Font:** Manrope, with Arial and sans-serif fallbacks.  
**Body Font:** Manrope, with the same fallback stack.

The variable font is self-hosted at `dist/assets/manrope.ttf`, covers weights (200–800), uses swap loading, and is preloaded by the page. Headings use medium weight, tight tracking, balanced wrapping, and no display-face substitution.

### Hierarchy

- **Display:** the large name, using the frontmatter display role. At the tablet breakpoint it becomes `clamp(55px, 7.5vw, 76px)`; on phones it becomes `clamp(49px, 12vw, 68px)`.
- **Headline:** main section headings. Phone section headings use (31px) with line height (1.25); contact headings use (32px), falling to (29px) on the narrowest phones.
- **Title:** general subsection headings. Experience role titles use (22px) on desktop and (20px) on phones; education and skills group headings use (16px).
- **Body:** the global reading base. Section copy uses the section-body role. Hero introduction uses line height (1.85), at (16px) on desktop and (15px) on phones; its measure is capped at (425px), then (365px) on phones.
- **Tagline:** a softer accent line beneath the name; phone size is (18px).
- **Button:** filled action text. Hero actions become (13px) on phones.
- **Label:** dates, chips, footer text, and small controls. Dates use tabular numerals. Navigation uses (13px) on desktop and (15px) inside the phone menu.

**The Single Family Rule.** Carry hierarchy through Manrope's size, weight, tracking, and color; the shipped interface has no separate display or mono face.

## Layout

The desktop container is capped at (1120px), with a width of `min(1120px, calc(100% - 96px))`. At (1023px) and below, it uses (32px) side gutters; at (767px) and below, (20px); at (389px) and below, (16px). Major section padding steps from (110px) to (88px) to (68px). Projects and contact use their own slightly tighter bands.

The hero pairs a left text column with an absolutely positioned orbital form. On phones, the name and introduction retain the reading column while the orbit shrinks to (360px), moves beyond the right edge, and drops to opacity (.43). The hero has a phone minimum height of (560px), with (66px) top and (105px) bottom padding. Short landscape viewports at no more than (900px) wide and (520px) high use a (450px) hero minimum and tighter padding.

About and experience are two-column layouts on desktop and single-column layouts on phones with a (42px) gap. Education remains two columns on ordinary phones and becomes one column below (390px). Contact actions stack below the copy on phones, and the footer wraps. Copy feedback enters normal flow on phones and may break long email text.

The header is sticky, opaque, and accounts for the top safe-area inset. Its navigation height is (76px) on desktop and (68px) on phones. Phone navigation opens below it as a two-column menu with targets of at least (48px). Anchor offset is (104px) on desktop and (88px) on phones. The footer accounts for the bottom safe-area inset.

**The Stationary Reading Rule.** About, projects, experience, and contact remain at rest; do not add scroll-triggered section entrances. The shipped correction removed reading-section reveal motion.

## Elevation & Depth

The interface uses no box shadows. Depth comes from paper-to-surface tonal changes, a thin divider system, faint orbital outlines, and a radial gradient inside the decorative planet. The sticky header is opaque; there is no backdrop blur. The project dialog uses a dark translucent backdrop rather than a shadow.

**The Tonal Depth Rule.** Separate content with the existing surface tones and fine lines; reserve the spherical gradient and orbital transparency for the native galaxy decoration.

## Shapes

Buttons, theme controls, skill chips, and dialog close controls use full pill curves. The project empty state and project dialog use the surface radius. The monogram, satellites, disclosure affordance, and planet use circles. Orbital ellipses are thin outlined circles transformed in CSS. Reading sections and experience rows retain open rectangular space with straight dividers.

## Components

### Buttons and text actions

Filled actions are calm, rounded, and high-contrast. The primary button uses accent fill, accent-text content, (13px 23px) padding, a (50px) minimum height, and a (23px) text-to-icon gap. Contact's primary action uses a (200px) minimum width and (54px) minimum height. Hover changes the fill and lifts the action by (2px); active scales to (.98). Phone hero buttons tighten their horizontal padding and icon gap.

Text actions use accent color, a (44px) minimum height, and an underline that becomes visible on hover. Links, buttons, and disclosure summaries show a (2px) accent outline with (5px) offset on keyboard focus. The skip link is a filled pill that becomes visible on focus.

### Theme and navigation

The theme control is an outlined pill with a (44px) minimum height; its label names the mode it will switch to. Theme preference is saved under `clifton-galaxy-theme`. Operating-system theme changes do not switch the selected theme.

Navigation links use muted text at rest, primary text on hover or current location, and a thin animated underline on desktop. Phones use a labelled menu icon and a two-column dropdown with a (180ms) clipped transition. The current phone section receives the existing chip tone. Selecting an anchor, pressing Escape, or clicking outside the navigation closes it. The current section is marked with `aria-current="location"`. The theme action pairs its label with a sun or moon icon; screens below (360px) retain an accessible icon-only control to preserve header space.

### Chips and empty state

Skill chips are static metadata pills with pill-tone backgrounds, accent text, and (5px 13px) padding. They wrap with an (8px) gap.

The project empty state is a flat tonal fallback panel, padded (35px), with a (180px) minimum height. Phones reduce it to (26px) padding and (155px) minimum height.

### Project stories

The populated gallery uses two open columns on desktop and one on phones. Articles have a bottom divider, no enclosing card fill, and wrap their technology pills. Titles use (23px) desktop and (21px) phone type; context and meaningful status use (12px) metadata. Summaries use (15px) body type. Read actions use outlined pills with horizontal arrows; verified repository links keep external arrows. Both have (44px) touch height. Source availability notes sit below actions. In-progress status uses the existing accent; no progress percentage is invented. Keyboard focus strengthens the article divider, while pointer hover adds restrained border and arrow feedback.

The native dialog separates project scope, personal contribution, and highlights, and retains technology pills for context when browsing. It uses the existing paper and line tokens, (16px) radius, and a maximum height of (85dvh). A sticky top bar holds the project count and close control, while a sticky footer holds previous/next project buttons. At the first and last projects the unavailable direction is disabled. Switching projects resets the scroll and focuses the new heading; closing returns focus to the original read action. Background scrolling is locked while the dialog is open. Pointer entrances take (220ms), exits (120ms), and project changes (180ms). Keyboard actions remain immediate. The empty-state error offers a retry action.

The reader's visual gallery offers an illustration or actual route example alongside a high-level workflow diagram. Clinic also shows an authentic screenshot of the original Streamlit app and a two-column group of original map assets. Selected visual buttons use the existing chip and orbital border tones, (44px) target heights, and `aria-pressed`. A caption explains each visual's provenance and meaning; source links use underlined accent text and external arrows. Each image links to a larger version in a new tab. Frames are (3:2), capped at (330px) on desktop and (230px) on phones, contain the artwork without cropping, and retain the source artwork's midnight background across both themes. The original map assets use an automatic-height surface-tone frame with small contained images and separate source-file links. Images use local WebP or original PNG assets, declared dimensions, asynchronous decoding, and lazy loading. They are only created when a project is opened, so the main gallery remains unboxed text. Pointer-driven image changes use a brief (160ms) fade; keyboard and reduced-motion changes are immediate.

### Experience disclosures

Native details and summary elements keep each role unboxed, separated by a bottom line. Summary padding is (28px) vertically, then (24px) on phones. The first desktop row removes its top padding. A (44px) circular affordance contains an SVG plus, rotates (45deg) when open, and receives the pill tone on hover. Details copy is secondary text at (14px), with a maximum width of (480px).

### Procedural sky and motion control

The canvas starfield and CSS orbital system are decorative, hidden from assistive technology, and ignore pointer input. The sky uses deterministic stars with seed (8912): (125) stars on wider heroes and (48) below (768px). Canvas device-pixel ratio is capped at (1.5), paint rate at (30fps) on wider heroes and (24fps) on phones, and it stops when the hero is outside the viewport or the document is hidden.

The orbital form rotates once per (60s), linearly. Only the hero heading and introduction receive a short settle on entry: opacity (.8→1) and vertical offset (8px→0), over (.8s) and (.9s). Reading sections do not animate. Control state transitions use the (.25s) duration and `cubic-bezier(.16, 1, .3, 1)` where present; text-link underline uses (.2s).

The visible sky control has a (44px) minimum height and labels Pause motion, Resume motion, or Motion off. Manual pause persists under `clifton-motion-paused` and freezes the canvas and orbit. A single shooting star crosses the hero after roughly two seconds and then every (8–14s); no more than one exists at a time. Orbital satellites move along the existing ring geometry over (24s) and (36s). All sky loops pause offscreen and when the document is hidden. Reduced-motion preference disables the motion control, leaves a static sky, removes animation and transitions, and changes anchor scrolling to automatic. The sky pause is not a pause for the one-time hero settle. If a 2D canvas context is unavailable, the sky control is hidden. A stationary "Get to know me" action connects the hero to the About section.

Contact shows the actual email address as a copy action. Success replaces the copy icon with a check and announces completion for six seconds. Pointer feedback is brief; role disclosures reveal their content over (180ms). These are action responses rather than new scroll entrances. Hover motion is restricted to fine pointers.

## Do's and Don'ts

### Do:

- **Do** use the matching dark or light token roles together when adding a control or surface.
- **Do** retain self-hosted Manrope, open content sections, and fine dividers.
- **Do** preserve the phone gutter steps and minimum touch heights when adding navigation or actions.
- **Do** keep decorative sky motion pausable and honor reduced-motion preference.
- **Do** use SVG interface icons and native canvas/CSS for the current galaxy atmosphere.

### Don't:

- **Don't** add scroll-triggered entrances to the stationary reading sections.
- **Don't** restore the removed landscape photograph to this galaxy interface.
- **Don't** invent project imagery, contributions, repositories, or completion claims. Label work in progress and source uploads honestly.
- **Don't** add shadows or blur as a default treatment to these flat content surfaces.
