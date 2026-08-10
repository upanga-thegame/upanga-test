import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.165.0/build/three.module.js';

const canvas = document.querySelector('#scene-canvas');
if (canvas && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(42, window.innerWidth / window.innerHeight, 0.1, 100);
    camera.position.z = 9;
    const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.6));
    renderer.setSize(window.innerWidth, window.innerHeight);

    const points = [];
    for (let i = 0; i < 520; i += 1) {
        const radius = 3 + Math.random() * 5;
        const angle = Math.random() * Math.PI * 2;
        const height = (Math.random() - 0.5) * 9;
        points.push(Math.cos(angle) * radius, height, Math.sin(angle) * radius);
    }
    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute('position', new THREE.Float32BufferAttribute(points, 3));
    const material = new THREE.PointsMaterial({ color: 0xc9f36a, size: 0.025, transparent: true, opacity: 0.6, blending: THREE.AdditiveBlending, depthWrite: false });
    const field = new THREE.Points(geometry, material);
    scene.add(field);

    const ringMaterial = new THREE.MeshBasicMaterial({ color: 0x7ce2ce, transparent: true, opacity: 0.12, wireframe: true });
    const ring = new THREE.Mesh(new THREE.IcosahedronGeometry(2.8, 1), ringMaterial);
    ring.position.set(2.8, -0.3, -1.5);
    scene.add(ring);

    let pointerX = 0;
    let pointerY = 0;
    window.addEventListener('pointermove', (event) => {
        pointerX = (event.clientX / window.innerWidth - 0.5) * 0.35;
        pointerY = (event.clientY / window.innerHeight - 0.5) * 0.2;
    }, { passive: true });

    const resize = () => { camera.aspect = window.innerWidth / window.innerHeight; camera.updateProjectionMatrix(); renderer.setSize(window.innerWidth, window.innerHeight); };
    window.addEventListener('resize', resize, { passive: true });
    const clock = new THREE.Clock();
    const tick = () => {
        const elapsed = clock.getElapsedTime();
        field.rotation.y = elapsed * 0.025 + pointerX;
        field.rotation.x = pointerY;
        ring.rotation.x = elapsed * 0.08;
        ring.rotation.y = elapsed * 0.1;
        ring.position.x += (2.8 + pointerX * 2 - ring.position.x) * 0.02;
        renderer.render(scene, camera);
        requestAnimationFrame(tick);
    };
    tick();
}
