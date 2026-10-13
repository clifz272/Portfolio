const root = document.documentElement;
const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
document.addEventListener('pointerdown', () => { root.dataset.input = 'pointer'; }, {passive:true});
document.addEventListener('keydown', () => { root.dataset.input = 'keyboard'; });
const motionAllowed = () => !reducedMotion.matches && root.dataset.motion !== 'paused' && root.dataset.input !== 'keyboard';
function feedbackMotion(element, keyframes, duration = 180) {
  if (!motionAllowed() || typeof element.animate !== 'function') return null;
  return element.animate(keyframes, {duration, easing:'cubic-bezier(.16,1,.3,1)'});
}
const colorPreference = window.matchMedia('(prefers-color-scheme: dark)');
const themeButton = document.querySelector('.theme-toggle');
const currentTheme = () => root.dataset.theme || 'dark';
function updateThemeButton() {
  const nextTheme = currentTheme() === 'dark' ? 'light' : 'dark';
  themeButton.querySelector('.theme-label').textContent = `${nextTheme === 'dark' ? 'Dark' : 'Light'} mode`;
  themeButton.querySelector('img').src = `assets/icons/${nextTheme === 'dark' ? 'moon' : 'sun'}.svg`;
  themeButton.setAttribute('aria-label', `Switch to ${nextTheme} mode`);
  document.querySelector('meta[name="theme-color"]').content = currentTheme() === 'dark' ? '#0b1020' : '#f2f5fb';
}
updateThemeButton();
themeButton.addEventListener('click', () => {
  const nextTheme = currentTheme() === 'dark' ? 'light' : 'dark';
  root.dataset.theme = nextTheme;
  try { localStorage.setItem('clifton-galaxy-theme', nextTheme); } catch {}
  updateThemeButton();
});
colorPreference.addEventListener('change', updateThemeButton);

const menuButton = document.querySelector('.menu-toggle');
const navigation = document.querySelector('#navigation-links');
function updateMenu(opened) {
  navigation.classList.toggle('is-open', opened);
  menuButton.setAttribute('aria-expanded', String(opened));
  menuButton.setAttribute('aria-label', opened ? 'Close navigation' : 'Open navigation');
  menuButton.querySelector('span').textContent = opened ? 'Close' : 'Menu';
  menuButton.querySelector('img').src = `assets/icons/${opened ? 'x' : 'menu-2'}.svg`;
}
function closeMenu() { updateMenu(false); }
menuButton.addEventListener('click', () => {
  updateMenu(menuButton.getAttribute('aria-expanded') !== 'true');
});
navigation.addEventListener('click', event => { if (event.target.closest('a')) closeMenu(); });
document.addEventListener('keydown', event => { if (event.key === 'Escape') closeMenu(); });
document.addEventListener('click', event => { if (!event.target.closest('.navigation')) closeMenu(); });
window.matchMedia('(max-width: 767px)').addEventListener('change', closeMenu);
document.querySelectorAll('.journey details').forEach(details => {
  details.addEventListener('toggle', () => {
    if (details.open) feedbackMotion(details.querySelector('.role-details'), [{opacity:.55,clipPath:'inset(0 0 12% 0)'},{opacity:1,clipPath:'inset(0)'}]);
  });
});

if ('IntersectionObserver' in window) {
  const sectionObserver = new IntersectionObserver(entries => {
    for (const entry of entries) if (entry.isIntersecting) {
      navigation.querySelectorAll('a').forEach(link => {
        if (link.hash === `#${entry.target.id}`) link.setAttribute('aria-current', 'location');
        else link.removeAttribute('aria-current');
      });
    }
  }, { rootMargin: '-15% 0px -45% 0px', threshold: 0 });
  document.querySelectorAll('main section').forEach(section => sectionObserver.observe(section));
}

const email = 'cliftonnjh@gmail.com';
const copyButton = document.querySelector('.copy-email');
const copyStatus = document.querySelector('.copy-status');
const copyIcon = copyButton.querySelector('img');
let copyTimer;
copyButton.addEventListener('click', async () => {
  clearTimeout(copyTimer);
  try {
    await navigator.clipboard.writeText(email);
    copyStatus.textContent = 'Email address copied.';
    copyIcon.src = 'assets/icons/check.svg';
    copyButton.classList.add('is-copied');
    feedbackMotion(copyIcon, [{opacity:.4,transform:'scale(.8)'},{opacity:1,transform:'scale(1)'}], 160);
  } catch {
    copyStatus.textContent = email;
  }
  copyTimer = setTimeout(() => { copyStatus.textContent = ''; copyIcon.src = 'assets/icons/copy.svg'; copyButton.classList.remove('is-copied'); }, 6000);
});

// Project stories are stored separately so Clifton can keep adding to them.
const projectArea = document.querySelector('#projects-content');
const projectDialog = document.querySelector('#project-dialog');
const dialogContent = document.querySelector('#project-dialog-content');
const projectPosition = document.querySelector('#project-position');
const previousProject = document.querySelector('.project-previous');
const nextProject = document.querySelector('.project-next');
let projectStories = [];
let projectIndex = -1;
let projectTrigger = null;
let dialogAnimation = null;
function textElement(tag, className, value) {
  const element = document.createElement(tag);
  if (className) element.className = className;
  element.textContent = value;
  return element;
}
function actionIcon(name = 'arrow-up-right') {
  const icon = document.createElement('img');
  icon.className = 'icon'; icon.src = `assets/icons/${name}.svg`; icon.alt = ''; icon.width = 20; icon.height = 20;
  return icon;
}
function safeUrl(value, allowLocal = false) {
  if (typeof value !== 'string' || !value.trim()) return null;
  try {
    const parsed = new URL(value, location.href);
    if (!['https:', 'http:'].includes(parsed.protocol)) return null;
    if (!allowLocal && parsed.origin === location.origin) return null;
    return parsed.href;
  } catch { return null; }
}
function projectImage(project) {
  const url = safeUrl(project.image, true);
  if (!url) return null;
  const image = document.createElement('img');
  image.className = 'project-image'; image.src = url; image.alt = project.imageAlt || `${project.title} project`; image.loading = 'lazy'; image.width = 900; image.height = 600;
  return image;
}
function projectVisuals(project) {
  const items = Array.isArray(project.media) ? project.media.map(item => ({
    ...item,
    src: safeUrl(item?.src, true),
    sourceUrl: safeUrl(item?.sourceUrl),
    assets: Array.isArray(item?.assets) ? item.assets.map(asset => ({...asset,src:safeUrl(asset?.src,true),sourceUrl:safeUrl(asset?.sourceUrl)})).filter(asset => asset.src) : []
  })).filter(item => item.src || item.assets.length) : [];
  if (!items.length) return projectImage(project);
  const gallery = document.createElement('section'); gallery.className = 'project-media'; gallery.setAttribute('aria-label', 'Project visuals');
  const figure = document.createElement('figure');
  const frame = document.createElement('div'); frame.className = 'project-visual-frame';
  const caption = textElement('figcaption', 'project-visual-caption', ''); caption.setAttribute('aria-live', 'polite');
  const captionText = textElement('span', '', '');
  const source = textElement('a', 'visual-source', 'View source'); source.target = '_blank'; source.rel = 'noopener noreferrer'; source.append(actionIcon());
  caption.append(captionText,source); figure.append(frame,caption);
  const controls = document.createElement('div'); controls.className = 'project-visual-tabs'; controls.setAttribute('role', 'group'); controls.setAttribute('aria-label', 'Choose a project visual');
  const buttons = items.map((item,index) => {
    const button = textElement('button', '', item.label || `Visual ${index + 1}`); button.type = 'button';
    button.addEventListener('click', event => select(index,event.detail > 0)); controls.append(button); return button;
  });
  function select(index,pointerDriven = false) {
    const item = items[index];
    buttons.forEach((button,i) => button.setAttribute('aria-pressed', String(i === index)));
    frame.replaceChildren(); frame.classList.remove('image-unavailable');
    frame.classList.toggle('has-map-assets', item.assets.length > 0);
    captionText.textContent = item.caption || '';
    source.hidden = !item.sourceUrl;
    if (item.sourceUrl) { source.href = item.sourceUrl; source.setAttribute('aria-label', `View source for ${project.title}: ${item.label || 'project visual'} on GitHub`); }
    else source.removeAttribute('href');
    if (item.assets.length) {
      const list = document.createElement('ul'); list.className = 'project-asset-grid'; list.setAttribute('aria-label', 'Original repository map assets');
      item.assets.forEach(asset => {
        const entry = document.createElement('li');
        const link = document.createElement('a'); link.className = 'project-asset-link'; link.href = asset.src; link.target = '_blank'; link.rel = 'noopener noreferrer';
        link.setAttribute('aria-label', `Open ${asset.label || 'map asset'} at full size in a new tab`);
        const image = document.createElement('img'); image.src = asset.src; image.alt = asset.alt || asset.label || 'Map asset'; image.width = asset.width || 512; image.height = asset.height || 512; image.loading = 'lazy'; image.decoding = 'async';
        image.onerror = () => { image.hidden = true; link.classList.add('image-unavailable'); link.append(textElement('span', 'asset-error', 'Image unavailable')); };
        link.append(image,textElement('span', 'project-asset-name', asset.label || 'Map asset')); entry.append(link);
        if (asset.sourceUrl) {
          const credit = textElement('a', 'visual-source', 'Source file'); credit.href = asset.sourceUrl; credit.target = '_blank'; credit.rel = 'noopener noreferrer'; credit.append(actionIcon()); credit.setAttribute('aria-label', `View ${asset.label || 'map asset'} source file on GitHub`); entry.append(credit);
        }
        list.append(entry);
      });
      frame.append(list);
      if (pointerDriven) feedbackMotion(list,[{opacity:.6},{opacity:1}],160);
    } else {
      const link = document.createElement('a'); link.className = 'visual-image-link'; link.href = item.src; link.target = '_blank'; link.rel = 'noopener noreferrer';
      link.setAttribute('aria-label', `Open ${project.title}: ${item.label || 'project visual'} in a new tab`);
      const image = document.createElement('img'); image.loading = 'lazy'; image.decoding = 'async'; image.alt = item.alt || `${project.title} visual`; image.width = item.width || 1536; image.height = item.height || 1024;
      image.onload = () => { if (pointerDriven && image.isConnected) feedbackMotion(image,[{opacity:.6},{opacity:1}],160); };
      image.onerror = () => { if (!image.isConnected) return; image.hidden = true; frame.classList.add('image-unavailable'); captionText.textContent = 'This visual is unavailable. Choose another image to continue.'; };
      image.src = item.src;
      const expand = textElement('span', 'visual-expand', 'View larger'); expand.setAttribute('aria-hidden', 'true'); expand.append(actionIcon());
      link.append(image,expand); frame.append(link);
    }
    if (gallery.isConnected && projectDialog.open) {
      const top = frame.getBoundingClientRect().top;
      const barBottom = projectDialog.querySelector('.dialog-bar').getBoundingClientRect().bottom;
      if (top < barBottom + 12) projectDialog.scrollTo({top:Math.max(0,projectDialog.scrollTop + top - barBottom - 16),behavior:motionAllowed() ? 'smooth' : 'auto'});
    }
  }
  gallery.append(figure,controls); select(0); return gallery;
}
function projectSource(project) {
  const url = safeUrl(project.url);
  if (!url) return null;
  const link = textElement('a', 'text-link', project.sourceLabel || 'Visit project');
  link.append(actionIcon()); link.href = url; link.target = '_blank'; link.rel = 'noopener noreferrer';
  link.setAttribute('aria-label', `${project.sourceLabel || 'Visit project'}: ${project.title}`);
  return link;
}
function projectSection(title, text) {
  const section = document.createElement('section'); section.className = 'project-detail-section';
  section.append(textElement('h3', '', title), textElement('p', '', text));
  return section;
}
function projectTags(project) {
  if (!Array.isArray(project.tags) || !project.tags.length) return null;
  const tags = document.createElement('ul'); tags.className = 'project-tags'; tags.setAttribute('aria-label', 'Technologies used');
  project.tags.forEach(tag => tags.append(textElement('li', '', String(tag))));
  return tags;
}
function renderProject(project) {
  dialogContent.replaceChildren();
  const title = textElement('h2', '', project.title); title.id = 'project-dialog-title'; title.tabIndex = -1; dialogContent.append(title);
  if (project.context) dialogContent.append(textElement('p', 'project-context', project.context));
  if (project.status) dialogContent.append(textElement('p', 'project-status', project.status));
  const tags = projectTags(project); if (tags) dialogContent.append(tags);
  const visuals = projectVisuals(project); if (visuals) dialogContent.append(visuals);
  if (project.details) dialogContent.append(projectSection('The project', project.details));
  else if (project.summary) dialogContent.append(textElement('p', '', project.summary));
  if (project.contribution) dialogContent.append(projectSection('My contribution', project.contribution));
  if (Array.isArray(project.highlights) && project.highlights.length) {
    const section = document.createElement('section'); section.className = 'project-detail-section';
    section.append(textElement('h3', '', 'What it includes'));
    const list = document.createElement('ul');
    project.highlights.forEach(item => list.append(textElement('li', '', String(item))));
    section.append(list); dialogContent.append(section);
  }
  const source = projectSource(project); if (source) dialogContent.append(source);
  if (project.sourceNote) dialogContent.append(textElement('p', 'project-source-note', project.sourceNote));
  projectPosition.textContent = `Project ${projectIndex + 1} of ${projectStories.length}`;
  previousProject.disabled = projectIndex <= 0;
  nextProject.disabled = projectIndex >= projectStories.length - 1;
}
function openProject(project, trigger, pointerDriven = false) {
  projectIndex = projectStories.indexOf(project);
  projectTrigger = trigger;
  renderProject(project);
  projectDialog.showModal();
  root.classList.add('dialog-open');
  projectDialog.scrollTop = 0;
  if (pointerDriven) dialogAnimation = feedbackMotion(projectDialog, [{opacity:.65,transform:'scale(.98)'},{opacity:1,transform:'scale(1)'}], 220);
}
function closeProject(pointerDriven = false) {
  if (!projectDialog.open) return;
  dialogAnimation?.cancel();
  dialogAnimation = pointerDriven ? feedbackMotion(projectDialog, [{opacity:1,transform:'scale(1)'},{opacity:.6,transform:'scale(.985)'}], 120) : null;
  if (!dialogAnimation) { projectDialog.close(); return; }
  const closingAnimation = dialogAnimation;
  closingAnimation.finished.then(() => { if (dialogAnimation === closingAnimation) projectDialog.close(); }).catch(() => {});
}
function browseProject(direction, pointerDriven) {
  const nextIndex = projectIndex + direction;
  if (nextIndex < 0 || nextIndex >= projectStories.length) return;
  dialogAnimation?.cancel();
  projectIndex = nextIndex;
  renderProject(projectStories[projectIndex]);
  projectDialog.scrollTop = 0;
  document.querySelector('#project-dialog-title').focus({preventScroll:true});
  if (pointerDriven) dialogAnimation = feedbackMotion(dialogContent, [{opacity:.65,transform:`translateX(${direction * 10}px)`},{opacity:1,transform:'translateX(0)'}]);
}
previousProject.addEventListener('click', event => browseProject(-1, event.detail > 0));
nextProject.addEventListener('click', event => browseProject(1, event.detail > 0));
document.querySelector('.dialog-close').addEventListener('click', event => closeProject(event.detail > 0));
projectDialog.addEventListener('cancel', event => { event.preventDefault(); closeProject(); });
projectDialog.addEventListener('close', () => { dialogAnimation?.cancel(); dialogAnimation = null; root.classList.remove('dialog-open'); projectTrigger?.focus({preventScroll:true}); });
projectDialog.addEventListener('click', event => { if (event.target === projectDialog) { const rect = projectDialog.getBoundingClientRect(); if (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom) closeProject(event.detail > 0); } });
reducedMotion.addEventListener('change', () => { if (reducedMotion.matches && dialogAnimation?.playState === 'running') dialogAnimation.finish(); });
async function loadProjects() {
  projectArea.setAttribute('aria-busy', 'true');
  try {
    const response = await fetch('projects.json');
    if (!response.ok) throw new Error('Project data unavailable');
    const projects = await response.json();
    if (!Array.isArray(projects)) throw new Error('Invalid project data');
    const validProjects = projects.filter(project => project && typeof project.title === 'string' && project.title.trim());
    if (!validProjects.length) return;
    projectStories = validProjects.filter(project => project.details);
    const grid = document.createElement('div'); grid.className = 'project-grid';
    for (const project of validProjects) {
      const card = document.createElement('article'); card.className = 'project-card';
      const image = projectImage(project); if (image) card.append(image);
      const heading = document.createElement('div'); heading.className = 'project-heading'; heading.append(textElement('h3', '', project.title));
      if (project.status) heading.append(textElement('p', 'project-status', project.status));
      else if (project.year) heading.append(textElement('p', 'date', String(project.year))); card.append(heading);
      if (project.context) card.append(textElement('p', 'project-context', project.context));
      if (project.summary) card.append(textElement('p', '', project.summary));
      const tags = projectTags(project); if (tags) card.append(tags);
      const actions = document.createElement('div'); actions.className = 'project-actions';
      if (project.details) { const button = textElement('button', 'project-read', 'Read project'); button.append(actionIcon('arrow-right')); button.type = 'button'; button.setAttribute('aria-label', `Read about ${project.title}`); button.addEventListener('click', event => openProject(project, button, event.detail > 0)); actions.append(button); }
      const source = projectSource(project); if (source) actions.append(source);
      if (actions.childElementCount) card.append(actions);
      if (project.sourceNote) card.append(textElement('p', 'project-source-note', project.sourceNote));
      grid.append(card);
    }
    projectArea.replaceChildren(grid);
  } catch {
    const empty = document.createElement('div'); empty.className = 'projects-empty';
    const message = document.createElement('div'); message.append(textElement('h3', '', "Couldn't load the projects"), textElement('p', '', 'Please check your connection and try again.'));
    const retry = textElement('button', 'text-link', 'Try again'); retry.type = 'button';
    retry.addEventListener('click', () => { retry.disabled = true; retry.textContent = 'Loading projects'; loadProjects(); });
    message.append(retry); empty.append(message); projectArea.replaceChildren(empty);
  } finally {
    projectArea.setAttribute('aria-busy', 'false');
  }
}
loadProjects();
