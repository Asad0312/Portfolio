const menuToggle = document.getElementById('menu-toggle');
const navLinks = document.querySelector('.nav-links');
const navLinkItems = document.querySelectorAll('.nav-link');
const yearEl = document.getElementById('year');
const typingTextEl = document.getElementById('typing-text');
const cursorDot = document.querySelector('.cursor-dot');
const cursorOutline = document.querySelector('.cursor-outline');
const magneticItems = document.querySelectorAll('.magnetic');
const hoverTargets = document.querySelectorAll('a, .btn, .magnetic, .menu-toggle');
const canvas = document.getElementById('particles');
const ctx = canvas ? canvas.getContext('2d') : null;
const scrollProgress = document.getElementById('scroll-progress');
const backToTop = document.getElementById('back-to-top');

const isTouchDevice = window.matchMedia('(pointer: coarse)').matches || 'ontouchstart' in window;
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const isDesktop = window.matchMedia('(min-width: 1025px)').matches && !isTouchDevice && !prefersReducedMotion;

if (menuToggle && navLinks) {
  menuToggle.addEventListener('click', (e) => {
    e.stopPropagation();
    navLinks.classList.toggle('active');
  });
}

document.addEventListener('click', (e) => {
  if (!navLinks) return;
  if (!navLinks.contains(e.target) && !menuToggle?.contains(e.target)) {
    navLinks.classList.remove('active');
  }
});

navLinkItems.forEach((link) => {
  link.addEventListener('click', () => {
    if (navLinks) navLinks.classList.remove('active');
  });
});

window.addEventListener('scroll', () => {
  const scrollTop = window.scrollY || document.documentElement.scrollTop;
  const docHeight = document.documentElement.scrollHeight - window.innerHeight;
  if (scrollProgress && docHeight > 0) {
    const progress = (scrollTop / docHeight) * 100;
    scrollProgress.style.width = progress + '%';
  }
  if (backToTop) {
    if (scrollTop > 400) {
      backToTop.classList.add('show');
    } else {
      backToTop.classList.remove('show');
    }
  }
  try {
    if (typeof updateScrollSpy === 'function') {
      updateScrollSpy();
    }
  } catch (e) {
    // ignore
  }
});

if (backToTop) {
  backToTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

updateScrollSpy();

if (yearEl) {
  yearEl.textContent = new Date().getFullYear().toString();
}

const roles = ['FULL STACK DEVELOPER', 'GRAPHIC DESIGNER', 'UI/UX BUILDER', 'CREATIVE CODER'];
let roleIndex = 0;
let charIndex = 0;
let isDeleting = false;
let typingSpeed = 95;

function type() {
  if (!typingTextEl) return;
  const currentRole = roles[roleIndex];
  if (isDeleting) {
    typingTextEl.textContent = currentRole.substring(0, charIndex - 1);
    charIndex--;
    typingSpeed = 45;
  } else {
    typingTextEl.textContent = currentRole.substring(0, charIndex + 1);
    charIndex++;
    typingSpeed = 95;
  }

  if (!isDeleting && charIndex === currentRole.length) {
    isDeleting = true;
    typingSpeed = 800;
  } else if (isDeleting && charIndex === 0) {
    isDeleting = false;
    roleIndex = (roleIndex + 1) % roles.length;
    typingSpeed = 320;
  }

  setTimeout(type, typingSpeed);
}

document.addEventListener('DOMContentLoaded', type);

function updateScrollSpy() {
  const sec = document.querySelectorAll('main section[id]');
  if (!sec || sec.length === 0) return;
  const scrollPos = window.scrollY + 160;
  sec.forEach((section) => {
    const top = section.offsetTop;
    const bottom = top + section.offsetHeight;
    const id = section.getAttribute('id');
    const link = document.querySelector(`.nav-link[href="#${id}"]`);
    if (link) {
      if (scrollPos >= top && scrollPos < bottom) {
        document.querySelectorAll('.nav-link').forEach((item) => item.classList.remove('active'));
        link.classList.add('active');
      }
    }
  });
}

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
        observer.unobserve(entry.target);
      }
    });
  },
  {
    threshold: 0.14,
    rootMargin: '0px 0px -80px 0px',
  }
);

document.querySelectorAll('.reveal').forEach((el) => observer.observe(el));

if (isDesktop) {
  const tiltCards = document.querySelectorAll('[data-tilt]');
  tiltCards.forEach((card) => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const rotateX = (y - centerY) / 7;
      const rotateY = (centerX - x) / 7;
      card.style.transform = `perspective(1500px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(16px) scale(1.01)`;
    });
    card.addEventListener('mouseleave', () => {
      card.style.transform = 'perspective(1500px) rotateX(0deg) rotateY(0deg) translateZ(0px) scale(1)';
    });
  });

  if (cursorDot && cursorOutline) {
    window.addEventListener('mousemove', (e) => {
      cursorDot.style.left = e.clientX + 'px';
      cursorDot.style.top = e.clientY + 'px';
      cursorOutline.style.left = e.clientX + 'px';
      cursorOutline.style.top = e.clientY + 'px';
    });

    const heroVisual = document.querySelector('.hero-visual');
    if (heroVisual) {
      window.addEventListener('mousemove', (e) => {
        const moveX = (e.clientX - window.innerWidth / 2) / 40;
        const moveY = (e.clientY - window.innerHeight / 2) / 40;
        heroVisual.style.transform = `translate(${moveX}px, ${moveY}px)`;
      });
    }

    hoverTargets.forEach((target) => {
      target.addEventListener('mouseenter', () => document.body.classList.add('cursor-hover'));
      target.addEventListener('mouseleave', () => document.body.classList.remove('cursor-hover'));
    });
  }

  magneticItems.forEach((item) => {
    item.addEventListener('mousemove', (e) => {
      const rect = item.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      item.style.transform = `translate(${x * 0.32}px, ${y * 0.32}px)`;
    });
    item.addEventListener('mouseleave', () => {
      item.style.transform = 'translate(0px, 0px)';
    });
  });

  const lightCards = document.querySelectorAll('.holo-card, .project-card, .design-card, .skill-panel, .contact-tile');
  lightCards.forEach((card) => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      card.style.setProperty('--mx', x + 'px');
      card.style.setProperty('--my', y + 'px');
    });
  });
} else {
  document.querySelectorAll('[data-tilt]').forEach((card) => {
    card.removeAttribute('data-tilt');
    card.style.transform = 'none';
  });
  document.querySelectorAll('.magnetic').forEach((item) => {
    item.style.transform = 'none';
  });
}

if (isDesktop && canvas && ctx && !prefersReducedMotion) {
  const particles = [];
  const particleCount = 70;

  function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }

  class Particle {
    constructor() {
      this.reset();
    }

    reset() {
      this.x = Math.random() * canvas.width;
      this.y = Math.random() * canvas.height;
      this.vx = (Math.random() - 0.5) * 0.4;
      this.vy = (Math.random() - 0.5) * 0.4;
      this.size = Math.random() * 1.6 + 0.4;
      this.alpha = Math.random() * 0.4 + 0.1;
    }

    update() {
      this.x += this.vx;
      this.y += this.vy;
      if (this.x < 0 || this.x > canvas.width || this.y < 0 || this.y > canvas.height) {
        this.reset();
      }
    }

    draw() {
      ctx.save();
      ctx.globalAlpha = this.alpha;
      const gradient = ctx.createRadialGradient(this.x, this.y, 0, this.x, this.y, this.size * 6);
      gradient.addColorStop(0, '#00fff9');
      gradient.addColorStop(1, 'transparent');
      ctx.fillStyle = gradient;
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size * 2, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    }
  }

  function init() {
    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle());
    }
    resize();
  }

  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach((particle) => {
      particle.update();
      particle.draw();
    });
    requestAnimationFrame(animate);
  }

  window.addEventListener('resize', resize);
  init();
  animate();
} else if (canvas) {
  canvas.style.display = 'none';
}
