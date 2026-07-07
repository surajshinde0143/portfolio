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