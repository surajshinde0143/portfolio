// CUSTOM CURSOR
const cursor = document.createElement('div');
cursor.className = 'cursor';
document.body.appendChild(cursor);

let mouseX = 0;
let mouseY = 0;
let currentX = 0;
let currentY = 0;

const ease = 0.18;

document.addEventListener('mousemove', (e) => {
  mouseX = e.clientX;
  mouseY = e.clientY;
});

function animateCursor() {
  currentX += (mouseX - currentX) * ease;
  currentY += (mouseY - currentY) * ease;
  cursor.style.transform = `translate(${currentX}px, ${currentY}px) translate(-50%, -50%)`;
  requestAnimationFrame(animateCursor);
}

animateCursor();

// Cursor enlarge on hover of buttons & links
const interactiveElements = document.querySelectorAll('a, .btn, button, img');
interactiveElements.forEach(el => {
  el.addEventListener('mouseenter', () => {
    cursor.classList.add('active');
  });
  el.addEventListener('mouseleave', () => {
    cursor.classList.remove('active');
  });
});

// SMOOTH SCROLL
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if(target){
      target.scrollIntoView({ behavior: 'smooth' });
    }
  });
});

// SCROLL REVEAL ANIMATION
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver(function(entries) {
  entries.forEach(entry => {
    if(entry.isIntersecting){
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
      observer.unobserve(entry.target);
    }
  });
}, observerOptions);

// Apply fade-in animation to sections
document.querySelectorAll('section').forEach(el => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(20px)';
  el.style.transition = 'all 0.6s ease-out';
  observer.observe(el);
});

// CONTACT FORM
const contactForm = document.querySelector('.contact-form');
if(contactForm){
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    alert('Thank you for your message! I will get back to you soon.');
    contactForm.reset();
  });
}

// BACK TO TOP BUTTON
const backToTopButton = document.querySelector('.back-to-top');
if(backToTopButton){
  const toggleBackToTop = () => {
    if(window.scrollY > 480){
      backToTopButton.classList.add('visible');
    } else {
      backToTopButton.classList.remove('visible');
    }
  };

  window.addEventListener('scroll', toggleBackToTop, { passive: true });
  toggleBackToTop();

  backToTopButton.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

console.log("Portfolio Website Loaded with Animations");

// CLICK SPARK EFFECT
function createSparks(x, y, count = 10) {
  for (let i = 0; i < count; i++) {
    const spark = document.createElement('span');
    spark.className = 'spark';

    const size = Math.floor(Math.random() * 10) + 6; // 6-15px
    spark.style.width = size + 'px';
    spark.style.height = size + 'px';

    // random angle and distance
    const angle = Math.random() * Math.PI * 2;
    const dist = Math.random() * 90 + 30; // 30-120px
    const dx = Math.cos(angle) * dist;
    const dy = Math.sin(angle) * dist;

    spark.style.left = x + 'px';
    spark.style.top = y + 'px';
    spark.style.setProperty('--dx', Math.round(dx) + 'px');
    spark.style.setProperty('--dy', Math.round(dy) + 'px');

    // random color between cyan and warm orange
    const hue = Math.random() > 0.6 ? 25 + Math.random() * 30 : 185 + Math.random() * 40;
    spark.style.background = `hsl(${hue}, 90%, ${50 + Math.random() * 10}%)`;
    spark.style.opacity = '1';

    document.body.appendChild(spark);

    // remove after animation
    setTimeout(() => {
      spark.remove();
    }, 800);
  }
}

document.addEventListener('click', (e) => {
  createSparks(e.clientX, e.clientY, 10);
});

// --- Certificates renderer (vanilla JS) ---
const certificates = [
  { id: 'azure-cv', title: 'Build a Computer Vision App with Azure Cognitive Services', org: 'Microsoft × Coursera', date: 'September 2024', tags: 'Artificial Intelligence / Computer Vision', badge: 'Project Certificate', file: 'assets/certificates/azure-cv-certificate.pdf', logo: 'assets/logos/microsoft.svg', description: 'Developed a computer vision application using Azure Cognitive Services.', color: 'linear-gradient(135deg,#0b3b6b 0%, #083078 100%)' },
  { id: 'pitch-night', title: 'Pitch Night Edition', org: 'Google Student Ambassador Program', date: 'May 24, 2025', tags: 'Innovation / Entrepreneurship', badge: 'Certificate of Participation', file: 'assets/certificates/Suraj%20shinde%20(1).pdf', logo: 'assets/logos/google-g.svg', description: 'Participated in Pitch Night, showcasing innovative ideas and solutions.', color: 'linear-gradient(135deg,#3b2b63 0%, #1f2a58 100%)' },
  { id: 'aiml', title: 'AI-ML Seminar', org: 'Sparks To Ideas', date: '17 July 2026', tags: 'AI / Machine Learning', badge: 'Seminar', file: 'assets/certificates/7038627465_aiml.pdf', logo: 'assets/logos/brain.svg', description: 'Explored the latest trends and practical applications in AI/ML.', color: 'linear-gradient(135deg,#0a5b4a 0%, #093b34 100%)' },
  { id: 'uiux', title: 'UI-UX Seminar', org: 'Sparks To Ideas', date: '17 July 2026', tags: 'Design / UX', badge: 'Seminar', file: 'assets/certificates/7038627465_uiux.pdf', logo: 'assets/logos/uiux.svg', description: 'Learned modern UI/UX principles and design thinking methodologies.', color: 'linear-gradient(135deg,#4b2b7b 0%, #2e1f5a 100%)' },
  { id: 'php', title: 'PHP (Laravel) Seminar', org: 'Sparks To Ideas', date: '11 July 2024', tags: 'Backend Development', badge: 'Seminar', file: 'assets/certificates/7038627465_php.pdf', logo: 'assets/logos/php.svg', description: 'Gained insights into Laravel framework and backend development.', color: 'linear-gradient(135deg,#7a4b10 0%, #5a3610 100%)' },
  { id: 'started-ai', title: 'Certificate Started with AI', org: 'Sparks To Ideas', date: '2026', tags: 'Artificial Intelligence', badge: 'Online Course', file: 'assets/certificates/certificate%20strated%20with%20AI.pdf', logo: 'assets/logos/brain.svg', description: 'Completed an introductory course on Artificial Intelligence concepts.', color: 'linear-gradient(135deg,#0b4f6c 0%, #0a3246 100%)' },
  { id: 'troubleshoot', title: 'Trouble Shoot Workshop', org: 'Sparks To Ideas', date: '2026', tags: 'Hands-on Experience', badge: 'Workshop', file: 'assets/certificates/troble%20shoot.pdf', logo: 'assets/logos/tools.svg', description: 'Explored practical troubleshooting techniques and problem-solving methods.', color: 'linear-gradient(135deg,#123a4b 0%, #0b2530 100%)' }
];

function createCertificateCard(cert){
  const article = document.createElement('article');
  article.className = 'cert-card';

  const accent = document.createElement('div');
  accent.className = 'cert-accent';
  accent.style.background = cert.color;

  const accentShape = document.createElement('div');
  accentShape.className = 'accent-shape';
  accent.appendChild(accentShape);

  const iconWrap = document.createElement('div');
  iconWrap.className = 'accent-circle';
  if(cert.logo){
    const img = document.createElement('img');
    img.className = 'cert-logo';
    img.src = cert.logo;
    img.alt = cert.id + ' logo';
    iconWrap.appendChild(img);
  }
  accent.appendChild(iconWrap);

  const body = document.createElement('div');
  body.className = 'cert-body';

  const head = document.createElement('div');
  head.className = 'cert-head';
  const badge = document.createElement('span'); badge.className='cert-badge'; badge.textContent = cert.badge;
  const title = document.createElement('h3'); title.className='cert-title'; title.textContent = cert.title;
  const org = document.createElement('p'); org.className='cert-org'; org.textContent = cert.org;
  head.appendChild(badge); head.appendChild(title); head.appendChild(org);

  const desc = document.createElement('p'); desc.className='cert-desc'; desc.textContent = cert.description;

  const meta = document.createElement('div'); meta.className='cert-meta';
  const tags = document.createElement('span'); tags.className='cert-tags'; tags.textContent = cert.tags;
  const date = document.createElement('span'); date.className='cert-date'; date.textContent = cert.date;
  meta.appendChild(tags); meta.appendChild(date);

  const actions = document.createElement('div'); actions.className='cert-actions';
  const view = document.createElement('a'); view.className='cert-view'; view.href = cert.file; view.target='_blank'; view.rel='noopener noreferrer'; view.textContent = 'View Certificate →';
  const download = document.createElement('a'); download.className='cert-download'; download.href = cert.file; download.setAttribute('download',''); download.title='Download';
  const dlIcon = document.createElement('i'); dlIcon.className='fas fa-download'; download.appendChild(dlIcon);
  actions.appendChild(view); actions.appendChild(download);

  body.appendChild(head);
  body.appendChild(desc);

  const footer = document.createElement('div'); footer.className = 'cert-footer';
  footer.appendChild(meta);
  footer.appendChild(actions);
  body.appendChild(footer);

  article.appendChild(accent);
  article.appendChild(body);

  return article;
}

function renderCertificates(){
  const root = document.getElementById('certificates-root');
  if(!root) return;

  const shell = document.createElement('div'); shell.className='cert-section-shell';
  const header = document.createElement('div'); header.className='cert-header';
  const label = document.createElement('span'); label.className='cert-label'; label.textContent='CREDENTIALS & ACHIEVEMENTS';
  const h2 = document.createElement('h2'); h2.textContent='My Certificates';
  const intro = document.createElement('p'); intro.className='cert-intro'; intro.textContent='A collection of my learning milestones, workshops, certifications and achievements.';
  header.appendChild(label); header.appendChild(h2); header.appendChild(intro);

  const grid = document.createElement('div'); grid.className='cert-grid'; grid.setAttribute('role','list');

  certificates.forEach(c => {
    grid.appendChild(createCertificateCard(c));
  });

  shell.appendChild(header);
  shell.appendChild(grid);
  root.appendChild(shell);
}

document.addEventListener('DOMContentLoaded', () => {
  renderCertificates();
});