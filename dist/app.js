const root = document.documentElement;
const colorPreference = window.matchMedia('(prefers-color-scheme: dark)');
const themeButton = document.querySelector('.theme-toggle');
const currentTheme = () => root.dataset.theme || 'dark';
function updateThemeButton() {
  const nextTheme = currentTheme() === 'dark' ? 'light' : 'dark';
  themeButton.textContent = `${nextTheme === 'dark' ? 'Dark' : 'Light'} mode`;
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
function closeMenu() { navigation.classList.remove('is-open'); menuButton.setAttribute('aria-expanded', 'false'); menuButton.textContent = 'Menu'; }
menuButton.addEventListener('click', () => {
  const opened = navigation.classList.toggle('is-open');
  menuButton.setAttribute('aria-expanded', String(opened));
  menuButton.textContent = opened ? 'Close' : 'Menu';
});
navigation.addEventListener('click', event => { if (event.target.closest('a')) closeMenu(); });
document.addEventListener('keydown', event => { if (event.key === 'Escape') closeMenu(); });
document.addEventListener('click', event => { if (!event.target.closest('.navigation')) closeMenu(); });

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
let copyTimer;
copyButton.addEventListener('click', async () => {
  clearTimeout(copyTimer);
  try {
    await navigator.clipboard.writeText(email);
    copyStatus.textContent = 'Email address copied.';
  } catch {
    copyStatus.textContent = email;
  }
  copyTimer = setTimeout(() => { copyStatus.textContent = ''; }, 6000);
});

// Project stories are stored separately so Clifton can keep adding to them.
const projectArea = document.querySelector('#projects-content');
const projectDialog = document.querySelector('#project-dialog');
const dialogContent = document.querySelector('#project-dialog-content');
function textElement(tag, className, value) {
  const element = document.createElement(tag);
  if (className) element.className = className;
  element.textContent = value;
  return element;
}
function actionIcon() {
  const icon = document.createElement('img');
  icon.className = 'icon'; icon.src = 'assets/icons/arrow-up-right.svg'; icon.alt = ''; icon.width = 20; icon.height = 20;
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
function openProject(project) {
  dialogContent.replaceChildren();
  const title = textElement('h2', '', project.title); title.id = 'project-dialog-title'; dialogContent.append(title);
  const image = projectImage(project); if (image) dialogContent.append(image);
  if (project.context) dialogContent.append(textElement('p', 'project-context', project.context));
  if (project.status) dialogContent.append(textElement('p', 'project-status', project.status));
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
  projectDialog.showModal();
  projectDialog.scrollTop = 0;
}
document.querySelector('.dialog-close').addEventListener('click', () => projectDialog.close());
projectDialog.addEventListener('click', event => { if (event.target === projectDialog) { const rect = projectDialog.getBoundingClientRect(); if (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom) projectDialog.close(); } });
async function loadProjects() {
  try {
    const response = await fetch('projects.json');
    if (!response.ok) throw new Error('Project data unavailable');
    const projects = await response.json();
    if (!Array.isArray(projects)) throw new Error('Invalid project data');
    const validProjects = projects.filter(project => project && typeof project.title === 'string' && project.title.trim());
    if (!validProjects.length) return;
    const grid = document.createElement('div'); grid.className = 'project-grid';
    for (const project of validProjects) {
      const card = document.createElement('article'); card.className = 'project-card';
      const image = projectImage(project); if (image) card.append(image);
      const heading = document.createElement('div'); heading.className = 'project-heading'; heading.append(textElement('h3', '', project.title));
      if (project.status) heading.append(textElement('p', 'project-status', project.status));
      else if (project.year) heading.append(textElement('p', 'date', String(project.year))); card.append(heading);
      if (project.context) card.append(textElement('p', 'project-context', project.context));
      if (project.summary) card.append(textElement('p', '', project.summary));
      if (Array.isArray(project.tags)) { const tags = document.createElement('ul'); tags.className = 'project-tags'; tags.setAttribute('aria-label', 'Technologies used'); project.tags.forEach(tag => tags.append(textElement('li', '', String(tag)))); card.append(tags); }
      const actions = document.createElement('div'); actions.className = 'project-actions';
      if (project.details) { const button = textElement('button', 'text-link', 'Read project'); button.append(actionIcon()); button.type = 'button'; button.setAttribute('aria-label', `Read about ${project.title}`); button.addEventListener('click', () => openProject(project)); actions.append(button); }
      const source = projectSource(project); if (source) actions.append(source);
      if (actions.childElementCount) card.append(actions);
      if (project.sourceNote) card.append(textElement('p', 'project-source-note', project.sourceNote));
      grid.append(card);
    }
    projectArea.replaceChildren(grid);
  } catch {
    projectArea.querySelector('.projects-empty p').textContent = 'Projects are unavailable right now. Please try again later.';
  }
}
loadProjects();
