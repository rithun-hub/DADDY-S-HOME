import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function initAnimations() {
  initCursor();
  initScrollAnimations();
  initLoader();
}

function initCursor() {
  const cursor = document.querySelector('.cursor');
  const follower = document.querySelector('.cursor-follower');

  document.addEventListener('mousemove', (e) => {
    gsap.to(cursor, { x: e.clientX, y: e.clientY, duration: 0.1 });
    gsap.to(follower, { x: e.clientX, y: e.clientY, duration: 0.3 });
  });

  const interactiveElements = document.querySelectorAll('a, button, .explore-card, .masonry-item, .upload-area');
  interactiveElements.forEach(el => {
    el.addEventListener('mouseenter', () => {
      cursor.classList.add('hover');
      follower.classList.add('hover');
    });
    el.addEventListener('mouseleave', () => {
      cursor.classList.remove('hover');
      follower.classList.remove('hover');
    });
  });
}

function initScrollAnimations() {
  // Navbar scroll effect
  const navbar = document.querySelector('.navbar');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });

  // Fade in sections
  const sections = document.querySelectorAll('.section-title');
  sections.forEach(section => {
    gsap.from(section, {
      scrollTrigger: {
        trigger: section,
        start: 'top 80%',
      },
      y: 50,
      opacity: 0,
      duration: 1,
      ease: 'power3.out'
    });
  });

  // Animate stats counter
  const counters = document.querySelectorAll('.counter');
  counters.forEach(counter => {
    const target = parseInt(counter.getAttribute('data-target'));
    ScrollTrigger.create({
      trigger: counter,
      start: 'top 85%',
      once: true,
      onEnter: () => {
        gsap.to(counter, {
          innerHTML: target,
          duration: 2,
          snap: { innerHTML: 1 },
          ease: 'power1.inOut'
        });
      }
    });
  });
}

function initLoader() {
  const loader = document.getElementById('loader');
  
  // Wait for the text animation to finish
  setTimeout(() => {
    gsap.to(loader, {
      yPercent: -100,
      duration: 1.5,
      ease: 'power4.inOut',
      onComplete: () => {
        // Trigger hero animations after load
        gsap.from('.hero-title', { y: 50, opacity: 0, duration: 1, delay: 0.2 });
        gsap.from('.hero-tagline', { y: 30, opacity: 0, duration: 1, delay: 0.4 });
      }
    });
  }, 2500);
}
