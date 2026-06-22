import '../style.css';
import { initAnimations } from './animations.js';
import { initUI } from './ui.js';
import { initThreeScene } from './threeScene.js';

document.addEventListener('DOMContentLoaded', () => {
  // Initialize all modules
  initAnimations();
  initUI();
  initThreeScene();
});
