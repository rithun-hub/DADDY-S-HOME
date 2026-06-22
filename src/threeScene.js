import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

export function initThreeScene() {
  const container = document.getElementById('three-container');
  if(!container) return;

  const scene = new THREE.Scene();
  scene.background = null; // Transparent background to match theme

  const camera = new THREE.PerspectiveCamera(45, container.clientWidth / container.clientHeight, 0.1, 1000);
  camera.position.set(10, 5, 10);

  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  renderer.setSize(container.clientWidth, container.clientHeight);
  renderer.setPixelRatio(window.devicePixelRatio);
  container.appendChild(renderer.domElement);

  const controls = new OrbitControls(camera, renderer.domElement);
  controls.enableDamping = true;
  controls.dampingFactor = 0.05;
  controls.autoRotate = true;
  controls.autoRotateSpeed = 2.0;

  // Add lights
  const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
  scene.add(ambientLight);

  const directionalLight = new THREE.DirectionalLight(0xffdf80, 0.8); // Gold tint
  directionalLight.position.set(10, 20, 10);
  scene.add(directionalLight);

  // Create an abstract luxury modern house using geometric shapes
  const houseGroup = new THREE.Group();

  // Base/Foundation
  const baseGeo = new THREE.BoxGeometry(8, 0.5, 6);
  const baseMat = new THREE.MeshStandardMaterial({ color: 0x222222, roughness: 0.8 });
  const base = new THREE.Mesh(baseGeo, baseMat);
  base.position.y = -0.25;
  houseGroup.add(base);

  // Main body
  const bodyGeo = new THREE.BoxGeometry(6, 3, 4);
  const bodyMat = new THREE.MeshStandardMaterial({ color: 0xeeeeee, roughness: 0.2, metalness: 0.1 });
  const body = new THREE.Mesh(bodyGeo, bodyMat);
  body.position.y = 1.5;
  houseGroup.add(body);

  // Glass Window (Front)
  const windowGeo = new THREE.BoxGeometry(4, 2, 0.1);
  const windowMat = new THREE.MeshPhysicalMaterial({ 
    color: 0x111111, 
    metalness: 0.9, 
    roughness: 0.1, 
    envMapIntensity: 1.0, 
    transparent: true, 
    opacity: 0.8 
  });
  const frontWindow = new THREE.Mesh(windowGeo, windowMat);
  frontWindow.position.set(0, 1.5, 2.05);
  houseGroup.add(frontWindow);

  // Roof overhang
  const roofGeo = new THREE.BoxGeometry(7, 0.2, 5);
  const roofMat = new THREE.MeshStandardMaterial({ color: 0x111111, roughness: 0.5 });
  const roof = new THREE.Mesh(roofGeo, roofMat);
  roof.position.y = 3.1;
  houseGroup.add(roof);

  // Gold accent pillar
  const pillarGeo = new THREE.BoxGeometry(0.5, 3.2, 0.5);
  const pillarMat = new THREE.MeshStandardMaterial({ color: 0xD4AF37, roughness: 0.2, metalness: 0.8 });
  const pillar = new THREE.Mesh(pillarGeo, pillarMat);
  pillar.position.set(2.5, 1.5, 2.2);
  houseGroup.add(pillar);

  scene.add(houseGroup);

  // Animation Loop
  function animate() {
    requestAnimationFrame(animate);
    controls.update();
    renderer.render(scene, camera);
  }
  animate();

  // Handle Resize
  window.addEventListener('resize', () => {
    camera.aspect = container.clientWidth / container.clientHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(container.clientWidth, container.clientHeight);
  });

  // Toggle Auto Rotate
  const rotateBtn = document.getElementById('rotate-btn');
  if(rotateBtn) {
    rotateBtn.addEventListener('click', () => {
      controls.autoRotate = !controls.autoRotate;
      rotateBtn.classList.toggle('active');
    });
  }
}
