console.clear();

const CONFIG = {
  STAR_COUNT: 20,
  TERRAIN_SIZE: 150,
  TERRAIN_SEGMENTS: 120,
  MOON_RADIUS: 8,
  MOON_SEGMENTS: 32,
  CAMERA: {
    FOV: 45,
    NEAR: 0.1,
    FAR: 200,
    POSITION: { x: 70, y: 30, z: 5 }
  },
  /*
  COLORS: {
  BACKGROUND: 0x0a1440,           
  MOON: 0x6ec9f0,                 
  MOON_EMISSIVE: 0x8dddfc,        
  TERRAIN: 0x1c4b7e,              
  TERRAIN_EMISSIVE: 0x0e2a53      
}
*/
  COLORS: {
    BACKGROUND: 0x001a2d,
    MOON: 0x26fdd9,
    MOON_EMISSIVE: 0x2bb2e6,
    TERRAIN: 0x198257,
    TERRAIN_EMISSIVE: 0x032f50
  }
};

let renderer, scene, camera, stars, starsLights, moon;

function init() {
  setupRenderer();
  setupScene();
  setupCamera();
  createMoon();
  createTerrain();
  createStars();
  animate();
  setupEventListeners();
}

function setupRenderer() {
  renderer = new THREE.WebGLRenderer({
    antialias: true,
    canvas: document.querySelector('canvas'),
    powerPreference: 'high-performance'
  });
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setClearColor(CONFIG.COLORS.BACKGROUND);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
}

function setupScene() {
  scene = new THREE.Scene();
  scene.fog = new THREE.Fog(CONFIG.COLORS.BACKGROUND, 80, 140);
  
  const ambientLight = new THREE.AmbientLight(0x404040, 0.5);
  scene.add(ambientLight);
}

function setupCamera() {
  camera = new THREE.PerspectiveCamera(
    CONFIG.CAMERA.FOV,
    window.innerWidth / window.innerHeight,
    CONFIG.CAMERA.NEAR,
    CONFIG.CAMERA.FAR
  );
  camera.position.set(
    CONFIG.CAMERA.POSITION.x,
    CONFIG.CAMERA.POSITION.y,
    CONFIG.CAMERA.POSITION.z
  );
  camera.lookAt(new THREE.Vector3());
}

function createMoon() {
  const geometry = new THREE.SphereGeometry(
    CONFIG.MOON_RADIUS,
    CONFIG.MOON_SEGMENTS,
    CONFIG.MOON_SEGMENTS
  );
  const material = new THREE.MeshPhongMaterial({
    color: CONFIG.COLORS.MOON,
    shininess: 15,
    emissive: CONFIG.COLORS.MOON_EMISSIVE,
    emissiveIntensity: 0.8
  });
  
  moon = new THREE.Mesh(geometry, material);
  moon.position.set(-9, 1, -6.5);
  moon.rotation.y = -1;
  scene.add(moon);

  const moonLight = new THREE.PointLight(0xffffff, 2, 150);
  moonLight.position.copy(moon.position);
  moonLight.position.y += 4;
  scene.add(moonLight);

  const moonLight2 = new THREE.PointLight(0xffffff, 0.6, 150);
  moonLight2.position.set(11, -19, -31.5);
  scene.add(moonLight2);
}

function createTerrain() {
  const geometry = new THREE.PlaneGeometry(
    CONFIG.TERRAIN_SIZE,
    CONFIG.TERRAIN_SIZE,
    CONFIG.TERRAIN_SEGMENTS,
    CONFIG.TERRAIN_SEGMENTS
  );
  
  const m = new THREE.Matrix4();
  m.makeRotationX(Math.PI * -0.5);
  geometry.applyMatrix(m);

  geometry.vertices.forEach(vector => {
    const ratio = noise.simplex3(vector.x * 0.03, vector.z * 0.03, 0);
    vector.y = ratio * 10;
  });

  const material = new THREE.MeshPhongMaterial({
    color: CONFIG.COLORS.TERRAIN,
    emissive: CONFIG.COLORS.TERRAIN_EMISSIVE
  });

  const plane = new THREE.Mesh(geometry, material);
  scene.add(plane);
}

function createStars() {
  stars = new THREE.Group();
  starsLights = new THREE.Group();
  scene.add(stars);
  scene.add(starsLights);

  const geometry = new THREE.SphereGeometry(0.3, 16, 16);
  const material = new THREE.MeshBasicMaterial({ color: 0xffffff });

  for (let i = 0; i < CONFIG.STAR_COUNT; i++) {
    const star = new THREE.Mesh(geometry, material);
    star.position.x = (Math.random() - 0.5) * CONFIG.TERRAIN_SIZE;
    star.position.z = (Math.random() - 0.5) * CONFIG.TERRAIN_SIZE;
    const ratio = noise.simplex3(star.position.x * 0.03, star.position.z * 0.03, 0);
    star.position.y = ratio * 10 + 0.3;
    stars.add(star);

    const velX = (Math.random() + 0.1) * 0.1 * (Math.random() < 0.5 ? -1 : 1);
    const velY = (Math.random() + 0.1) * 0.1 * (Math.random() < 0.5 ? -1 : 1);
    star.vel = new THREE.Vector2(velX, velY);

    const starLight = new THREE.PointLight(0xffffff, 0.8, 3);
    starLight.position.copy(star.position);
    starLight.position.y += 0.5;
    starsLights.add(starLight);
  }
}

function updateStar(star, index) {
  const halfSize = CONFIG.TERRAIN_SIZE / 2;
  
  if (star.position.x < -halfSize) star.position.x = halfSize;
  if (star.position.x > halfSize) star.position.x = -halfSize;
  if (star.position.z < -halfSize) star.position.z = halfSize;
  if (star.position.z > halfSize) star.position.z = -halfSize;
  
  star.position.x += star.vel.x;
  star.position.z += star.vel.y;
  
  const ratio = noise.simplex3(star.position.x * 0.03, star.position.z * 0.03, 0);
  star.position.y = ratio * 10 + 0.3;
  
  starsLights.children[index].position.copy(star.position);
  starsLights.children[index].position.y += 0.5;
}

function animate() {
  requestAnimationFrame(animate);
  
  for (let i = 0; i < CONFIG.STAR_COUNT; i++) {
    updateStar(stars.children[i], i);
  }
  
  renderer.render(scene, camera);
}

function onResize() {
  const width = window.innerWidth;
  const height = window.innerHeight;
  
  camera.aspect = width / height;
  camera.updateProjectionMatrix();
  
  renderer.setSize(width, height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
}

function setupEventListeners() {
  window.addEventListener('resize', onResize);
}

(function() {
  function parallaxClouds(e) {
    var cx = window.innerWidth / 2;
    var cy = window.innerHeight / 2;
    var mx = (e.clientX - cx) / cx;
    var my = (e.clientY - cy) / cy;
    document.querySelectorAll('img[pxmousemove]').forEach(function(img) {
      var xmove = parseFloat(img.getAttribute('xmovement')) || 0;
      var ymove = parseFloat(img.getAttribute('ymovement')) || 0;
      var tx = mx * xmove;
      var ty = my * ymove;
      img.style.transform = 'translate(' + tx + 'px, ' + (ty + (ymove * 0.75)) + 'px)';
    });
  }
  window.addEventListener('mousemove', parallaxClouds);
})();

init();

/*



function handleParallaxScroll() {
  const scrollY = window.scrollY;
  document.querySelectorAll('.parallax-item').forEach(el => {
    const speed = parseFloat(el.dataset.speed) || 0.5;
    el.style.transform = `translateY(${scrollY * -speed}px)`;
  });
}

window.addEventListener('scroll', handleParallaxScroll);

document.querySelectorAll('.parallax-item').forEach((el, i) => {
  gsap.fromTo(el, {
    opacity: 0,
    y: -50
  }, {
    opacity: 1,
    y: 0,
    duration: 1.5,
    delay: i * 0.2,
    ease: 'power2.out'
  });

 gsap.to(el, {
    y: '+=20',
    duration: 3 + Math.random() * 2,
    yoyo: true,
    repeat: -1,
    ease: 'sine.inOut'
  });
  
});

*/
document.addEventListener("DOMContentLoaded", function () {
  const section = document.querySelector('.nuestra-identidad');
  const courseList = section.querySelector('.floating-courses__list');
  const courses = Array.from(courseList.querySelectorAll('.sb-course'));
  let sectionHeight = section.offsetHeight;
  let sectionWidth = section.offsetWidth;

  const ITEM_HEIGHT = 90;
  const X_PADDING = 30;
  const MIN_SPEED = 0.6;
  const MAX_SPEED = 1.8;
  const ROTATION_RANGE = 40;

  const DEPTHS = [
    { zIndex: 0, opacity: 0.3, className: 'sb-course--back' },
    { zIndex: 2, opacity: 1.0, className: 'sb-course--front' }
  ];

  const items = courses.map((el) => {
    const x = X_PADDING + Math.random() * (sectionWidth - 2 * X_PADDING);
    const y = Math.random() * sectionHeight;
    const rotation = (Math.random() - 0.5) * ROTATION_RANGE;
    const speed = MIN_SPEED + Math.random() * (MAX_SPEED - MIN_SPEED);
    const depth = Math.random() > 0.5 ? 1 : 0;

    el.classList.add(DEPTHS[depth].className);

    gsap.set(el, {
      x, y, rotation,
      opacity: DEPTHS[depth].opacity,
      zIndex: DEPTHS[depth].zIndex
    });

    return { el, x, y, rotation, speed, depth };
  });
  
  items.forEach((item, i) => {
    gsap.fromTo(item.el, {
      opacity: 0,
      y: 50
    }, {
      opacity: 1,
      y: 0,
      duration: 1.2,
      delay: i * 0.1,
      ease: 'power2.out'
    });
  });


  let lastScrollY = window.scrollY;
let scrollVelocity = 0;
let scrollDirection = 1;

gsap.ticker.add(() => {
  const currentScrollY = window.scrollY;
  const delta = currentScrollY - lastScrollY;
  lastScrollY = currentScrollY;

  // Si hubo scroll, guardamos la dirección
  if (Math.abs(delta) > 1) {
    scrollDirection = Math.sign(delta);
    scrollVelocity = Math.min(Math.abs(delta), 50);
  } else {
    // Disminuimos velocidad suavemente si no hay scroll
    scrollVelocity *= 0.95;
  }

  items.forEach(item => {
    const moveY = scrollDirection * item.speed * (0.5 + scrollVelocity * 0.05); // Movimiento base + velocidad

    item.y -= moveY;

    if (item.y < -ITEM_HEIGHT) {
      item.y = sectionHeight + ITEM_HEIGHT;
      item.x = X_PADDING + Math.random() * (sectionWidth - 2 * X_PADDING);
      item.rotation = (Math.random() - 0.5) * ROTATION_RANGE;
      item.depth = Math.random() > 0.5 ? 1 : 0;
      item.el.classList.remove('sb-course--front', 'sb-course--back');
      item.el.classList.add(DEPTHS[item.depth].className);
    } else if (item.y > sectionHeight + ITEM_HEIGHT) {
      item.y = -ITEM_HEIGHT;
      item.x = X_PADDING + Math.random() * (sectionWidth - 2 * X_PADDING);
      item.rotation = (Math.random() - 0.5) * ROTATION_RANGE;
      item.depth = Math.random() > 0.5 ? 1 : 0;
      item.el.classList.remove('sb-course--front', 'sb-course--back');
      item.el.classList.add(DEPTHS[item.depth].className);
    }

    const wiggle = Math.sin(performance.now() / 700 + item.x) * 2;

    gsap.set(item.el, {
      x: item.x + wiggle,
      y: item.y,
      rotation: item.rotation + wiggle * 0.4,
      opacity: DEPTHS[item.depth].opacity,
      zIndex: DEPTHS[item.depth].zIndex
    });
  });
});
/*
  let lastScrollY = window.scrollY;

gsap.ticker.add(() => {
  const currentScrollY = window.scrollY;
  const scrollDelta = currentScrollY - lastScrollY;
  lastScrollY = currentScrollY;

  const scrollDirection = Math.sign(scrollDelta); // 1 = scroll abajo, -1 = scroll arriba

  items.forEach(item => {
    // Movimiento en dirección opuesta al scroll (efecto de profundidad)
    const moveY = -scrollDirection * item.speed;
    item.y += moveY;

    // Si se va fuera de la pantalla, lo reposicionamos
    if (item.y < -ITEM_HEIGHT) {
      item.y = sectionHeight + ITEM_HEIGHT;
      item.x = X_PADDING + Math.random() * (sectionWidth - 2 * X_PADDING);
      item.rotation = (Math.random() - 0.5) * ROTATION_RANGE;
      item.depth = Math.random() > 0.5 ? 1 : 0;
      item.el.classList.remove('sb-course--front', 'sb-course--back');
      item.el.classList.add(DEPTHS[item.depth].className);
    } else if (item.y > sectionHeight + ITEM_HEIGHT) {
      item.y = -ITEM_HEIGHT;
      item.x = X_PADDING + Math.random() * (sectionWidth - 2 * X_PADDING);
      item.rotation = (Math.random() - 0.5) * ROTATION_RANGE;
      item.depth = Math.random() > 0.5 ? 1 : 0;
      item.el.classList.remove('sb-course--front', 'sb-course--back');
      item.el.classList.add(DEPTHS[item.depth].className);
    }

    const wiggle = Math.sin(performance.now() / 700 + item.x) * 2;

    gsap.set(item.el, {
      x: item.x + wiggle,
      y: item.y,
      rotation: item.rotation + wiggle * 0.4,
      opacity: DEPTHS[item.depth].opacity,
      zIndex: DEPTHS[item.depth].zIndex
    });
  });
});

*/
/*
  let lastScrollY = window.scrollY;
  let velocitySmoothed = 0;

    gsap.ticker.add(() => {
    const currentScrollY = window.scrollY;
    const scrollVelocity = currentScrollY - lastScrollY;
    lastScrollY = currentScrollY;

    // Suavizado del scroll
    velocitySmoothed += (scrollVelocity - velocitySmoothed) * 0.1;

    items.forEach(item => {
      // Movimiento base (hacia arriba) + reacción al scroll
      const baseSpeed = -item.speed * 0.5;
      const scrollInfluence = item.speed * velocitySmoothed * 0.2;
      const moveY = baseSpeed + scrollInfluence;

      item.y += moveY;

      // Reposición si sale de la pantalla
      if (item.y < -ITEM_HEIGHT) {
        item.y = sectionHeight + ITEM_HEIGHT;
        item.x = X_PADDING + Math.random() * (sectionWidth - 2 * X_PADDING);
        item.rotation = (Math.random() - 0.5) * ROTATION_RANGE;
        item.depth = Math.random() > 0.5 ? 1 : 0;
        item.el.classList.remove('sb-course--front', 'sb-course--back');
        item.el.classList.add(DEPTHS[item.depth].className);
      } else if (item.y > sectionHeight + ITEM_HEIGHT) {
        item.y = -ITEM_HEIGHT;
        item.x = X_PADDING + Math.random() * (sectionWidth - 2 * X_PADDING);
        item.rotation = (Math.random() - 0.5) * ROTATION_RANGE;
        item.depth = Math.random() > 0.5 ? 1 : 0;
        item.el.classList.remove('sb-course--front', 'sb-course--back');
        item.el.classList.add(DEPTHS[item.depth].className);
      }

      // Pequeño movimiento "orgánico"
      const wiggle = Math.sin(performance.now() / 700 + item.x) * 2;

      gsap.set(item.el, {
        x: item.x + wiggle,
        y: item.y,
        rotation: item.rotation + wiggle * 0.4,
        opacity: DEPTHS[item.depth].opacity,
        zIndex: DEPTHS[item.depth].zIndex
      });
    });
  });
*/
/*
  gsap.ticker.add(() => {
    const currentScrollY = window.scrollY;
    const scrollVelocity = currentScrollY - lastScrollY;
    lastScrollY = currentScrollY;

    velocitySmoothed += (scrollVelocity - velocitySmoothed) * 0.1;

    items.forEach(item => {
    //let moveY = -Math.sign(velocitySmoothed) * item.speed * Math.abs(velocitySmoothed) * 0.25;
    //let moveY = item.speed * velocitySmoothed * 0.25;
    let moveY = -item.speed * 0.5 + item.speed * velocitySmoothed * 0.25;


      if (Math.abs(velocitySmoothed) < 0.4) {
        moveY = -item.speed * 0.5;
      }

      item.y += moveY;

      if (item.y < -ITEM_HEIGHT) {
        item.y = sectionHeight + ITEM_HEIGHT;
        item.x = X_PADDING + Math.random() * (sectionWidth - 2 * X_PADDING);
        item.rotation = (Math.random() - 0.5) * ROTATION_RANGE;
        item.depth = Math.random() > 0.5 ? 1 : 0;
        item.el.classList.remove('sb-course--front', 'sb-course--back');
        item.el.classList.add(DEPTHS[item.depth].className);
      } else if (item.y > sectionHeight + ITEM_HEIGHT) {
        item.y = -ITEM_HEIGHT;
        item.x = X_PADDING + Math.random() * (sectionWidth - 2 * X_PADDING);
        item.rotation = (Math.random() - 0.5) * ROTATION_RANGE;
        item.depth = Math.random() > 0.5 ? 1 : 0;
        item.el.classList.remove('sb-course--front', 'sb-course--back');
        item.el.classList.add(DEPTHS[item.depth].className);
      }

      const wiggle = Math.sin(performance.now() / 700 + item.x) * 2;

      gsap.set(item.el, {
        x: item.x + wiggle,
        y: item.y,
        rotation: item.rotation + wiggle * 0.4,
        opacity: DEPTHS[item.depth].opacity,
        zIndex: DEPTHS[item.depth].zIndex
      });
    });
  });
  */

  /*
window.addEventListener('scroll', () => {
  const scrollY = window.scrollY;

  items.forEach(item => {
    const translateY = scrollY * item.speed * -0.5; // negativo para que suba al hacer scroll
    gsap.set(item.el, {
      transform: `translate3d(0, ${translateY}px, 0) rotate(${item.rotation}deg)`,
      opacity: DEPTHS[item.depth].opacity,
      zIndex: DEPTHS[item.depth].zIndex
    });
  });
});
*/
  window.addEventListener('resize', () => {
    sectionHeight = section.offsetHeight;
    sectionWidth = section.offsetWidth;
    items.forEach(item => {
      item.x = X_PADDING + Math.random() * (sectionWidth - 2 * X_PADDING);
    });
  });
});

window.addEventListener("DOMContentLoaded", () => {
  gsap.registerPlugin(ScrollTrigger);

  const section = document.querySelector(".s-features-home");
  const features = gsap.utils.toArray(".s-features-home .js-feature");

  if (!section || features.length === 0) return;

  features.forEach((feature, i) => {
    const offset = i * window.innerHeight * 0.9;

    // Posición inicial fuera de la vista
    gsap.set(feature, {
      x: '100vw',
      rotateY: 90,
      scale: 0.8,
      opacity: 0
    });

    // Animación de entrada
    gsap.to(feature, {
      x: 0,
      rotateY: 0,
      scale: 1,
      opacity: 1,
      ease: "power3.out",
      duration: 1.5,
      scrollTrigger: {
        trigger: section,
        start: () => `top+=${offset} top`,
        end: () => `top+=${offset + window.innerHeight} top`,
        scrub: true,
        markers: false // poné true si querés debuggear
      }
    });
  });
});

/*
   document.addEventListener('DOMContentLoaded', () => {
    gsap.registerPlugin(ScrollTrigger);
    const features = document.querySelectorAll('.js-feature');

    features.forEach((feature, i) => {
      gsap.fromTo(feature, {
        rotationX: -90,
        y: 200,
        opacity: 0
      }, {
        rotationX: 0,
        y: 0,
        opacity: 1,
        duration: 1.2,
        delay: 0.1,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: feature,
          start: 'top 85%',
          toggleActions: 'play none none reverse'
        }
      });
    });
  });*/


  document.querySelectorAll('.sb-course').forEach((el, i) => {
  const speed = 0.5 + Math.random();

  gsap.to(el, {
    y: () => `-${speed * 300}px`,
    ease: 'none',
    scrollTrigger: {
      trigger: '.nuestra-identidad',
      start: 'top bottom',
      end: 'bottom top',
      scrub: true
    }
  });
});
gsap.registerPlugin(ScrollTrigger);

const features = gsap.utils.toArray(".js-feature");

features.forEach((feature, i) => {
  const startY = window.innerHeight * i;

  gsap.set(feature, {
    y: startY,
    rotateX: -90,
    opacity: 0,
    scale: 0.5
  });

  gsap.to(feature, {
    scrollTrigger: {
      trigger: ".s-features-home",
      start: () => `top+=${i * window.innerHeight} top`,
      end: () => `top+=${(i + 1) * window.innerHeight} top`,
      scrub: true,
    },
    y: 0,
    rotateX: 0,
    opacity: 1,
    scale: 1,
    ease: "power2.out"
  });
});


window.addEventListener("load", () => {
  gsap.registerPlugin(ScrollTrigger);

  const features = gsap.utils.toArray(".js-feature");

  features.forEach((feature, index) => {
    gsap.set(feature, {
      y: 300,
      rotateX: -80,
      scale: 0.6,
      opacity: 0
    });

    gsap.to(feature, {
      scrollTrigger: {
        trigger: ".s-features-home",
        start: () => `top+=${index * window.innerHeight * 0.85} top`,
        end: () => `top+=${(index + 1) * window.innerHeight * 0.85} top`,
        scrub: true
      },
      y: 0,
      rotateX: 0,
      scale: 1,
      opacity: 1,
      duration: 1.2,
      ease: "power3.out"
    });
  });
});


window.addEventListener("load", () => {
  gsap.registerPlugin(ScrollTrigger);

  const features = gsap.utils.toArray(".js-feature");

  features.forEach((feature, index) => {
    // Posición inicial fuera de la vista
    gsap.set(feature, {
      y: 300,
      rotateX: -80,
      scale: 0.6,
      opacity: 0
    });

    // Activación cuando el feature entra a su sección
    gsap.to(feature, {
      scrollTrigger: {
        trigger: feature, // activa individualmente cada uno
        start: "top 85%", // cuando el top del feature toca el 85% del viewport
        end: "bottom top", // puede ajustarse si se quiere un efecto más largo
        scrub: true,
        markers: false // activá si querés debuggear
      },
      y: 0,
      rotateX: 0,
      scale: 1,
      opacity: 1,
      duration: 1.2,
      ease: "power3.out"
    });
  });
});

// Este bloque crea animaciones tipo tarjeta 3D solo dentro de la sección .s-features-home
// y evita que se activen al inicio de la página

window.addEventListener("DOMContentLoaded", () => {
  gsap.registerPlugin(ScrollTrigger);

  const section = document.querySelector(".s-features-home");
  const features = gsap.utils.toArray(".s-features-home .js-feature");

  if (!section || features.length === 0) return;

  // Asegura que cada .js-feature se muestre dentro de la sección, uno a la vez al scrollear
  features.forEach((feature, i) => {
    // Posicion inicial fuera de pantalla
    gsap.set(feature, {
      y: 300,
      rotateX: -75,
      scale: 0.5,
      opacity: 0
    });

    gsap.to(feature, {
      y: 0,
      rotateX: 0,
      scale: 1,
      opacity: 1,
      ease: "power3.out",
      duration: 1.2,
      scrollTrigger: {
        trigger: section,
        start: () => `top+=${i * window.innerHeight} top`,
        end: () => `top+=${(i + 1) * window.innerHeight} top`,
        scrub: true,
        markers: false, // cambiar a true para debug
        onEnter: () => feature.classList.add("active"),
        onLeaveBack: () => feature.classList.remove("active")
      }
    });
  });
});
