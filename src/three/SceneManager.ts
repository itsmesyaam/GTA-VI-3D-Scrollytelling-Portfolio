import * as THREE from 'three';

export interface SceneManagerOptions {
  canvas: HTMLCanvasElement;
}

export class SceneManager {
  private canvas: HTMLCanvasElement;
  private renderer: THREE.WebGLRenderer;
  private scene: THREE.Scene;
  private camera: THREE.PerspectiveCamera;
  private clock: THREE.Clock;

  // Geometry / Objects
  private oceanMesh: THREE.Mesh | null = null;
  private oceanGeometry: THREE.PlaneGeometry | null = null;
  private cityGroup: THREE.Group = new THREE.Group();
  private bridgeGroup: THREE.Group = new THREE.Group();
  private trafficParticles: THREE.Points | null = null;
  private cloudParticles: THREE.Points | null = null;
  private warRoomTable: THREE.Group = new THREE.Group();
  private starEmblem: THREE.Group = new THREE.Group();
  private floatingMonoliths: THREE.Group = new THREE.Group();

  // Lighting
  private dirLight: THREE.DirectionalLight;
  private ambientLight: THREE.AmbientLight;
  private spotLight: THREE.SpotLight;
  private sunMesh: THREE.Mesh;

  // Spline Curves
  private cameraSpline: THREE.CatmullRomCurve3;
  private targetSpline: THREE.CatmullRomCurve3;

  private currentProgress: number = 0;
  private targetProgress: number = 0;
  private mouseX: number = 0;
  private mouseY: number = 0;

  constructor(options: SceneManagerOptions) {
    this.canvas = options.canvas;
    this.clock = new THREE.Clock();

    // 1. Scene & Renderer
    this.scene = new THREE.Scene();
    this.scene.fog = new THREE.FogExp2(0x1a0a1f, 0.012);

    this.camera = new THREE.PerspectiveCamera(
      55,
      window.innerWidth / window.innerHeight,
      0.1,
      1200
    );

    this.renderer = new THREE.WebGLRenderer({
      canvas: this.canvas,
      antialias: true,
      alpha: false,
      powerPreference: 'high-performance',
    });
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    this.renderer.toneMapping = THREE.ACESFilmicToneMapping;
    this.renderer.toneMappingExposure = 1.3;

    // 2. Lights
    this.ambientLight = new THREE.AmbientLight(0xff8a00, 0.7);
    this.scene.add(this.ambientLight);

    this.dirLight = new THREE.DirectionalLight(0xff2a85, 2.5);
    this.dirLight.position.set(0, 45, -200);
    this.scene.add(this.dirLight);

    this.spotLight = new THREE.SpotLight(0x00f0ff, 0);
    this.spotLight.position.set(0, 25, -150);
    this.spotLight.angle = Math.PI / 4;
    this.spotLight.penumbra = 0.8;
    this.scene.add(this.spotLight);

    // Sun / Moon Disc
    const sunGeom = new THREE.CircleGeometry(24, 64);
    const sunMat = new THREE.MeshBasicMaterial({
      color: 0xff8a00,
      transparent: true,
      opacity: 0.95,
      side: THREE.DoubleSide,
    });
    this.sunMesh = new THREE.Mesh(sunGeom, sunMat);
    this.sunMesh.position.set(0, 35, -250);
    this.scene.add(this.sunMesh);

    // 3. Define 9-Chapter Camera & Target Splines
    const cameraWaypoints = [
      new THREE.Vector3(0, 3, 110),     // Ch 1: Ocean Sunrise
      new THREE.Vector3(-25, 12, 60),   // Ch 2: Causeway Bridge
      new THREE.Vector3(15, 28, 20),    // Ch 3: Downtown Neon Towers
      new THREE.Vector3(-18, 16, -15),  // Ch 4: Bayfront Marina
      new THREE.Vector3(0, 65, -45),    // Ch 5: Golden Hour Clouds
      new THREE.Vector3(0, 75, -80),    // Ch 6: High Altitude Freefall
      new THREE.Vector3(0, 9, -95),     // Ch 7: Penthouse War Room
      new THREE.Vector3(12, 10, -118),  // Ch 8: Terrace Comms
      new THREE.Vector3(0, 5, -148),    // Ch 9: Soundstage Wrap
    ];

    const targetWaypoints = [
      new THREE.Vector3(0, 16, -40),    // Ch 1 Target
      new THREE.Vector3(0, 8, 0),       // Ch 2 Target
      new THREE.Vector3(0, 20, -30),    // Ch 3 Target
      new THREE.Vector3(10, 8, -60),    // Ch 4 Target
      new THREE.Vector3(0, 45, -120),   // Ch 5 Target
      new THREE.Vector3(0, -10, -80),   // Ch 6 Target (Straight Down)
      new THREE.Vector3(0, 7, -112),    // Ch 7 Target
      new THREE.Vector3(-15, 8, -135),  // Ch 8 Target
      new THREE.Vector3(0, 5, -168),    // Ch 9 Target
    ];

    this.cameraSpline = new THREE.CatmullRomCurve3(cameraWaypoints, false, 'catmullrom', 0.4);
    this.targetSpline = new THREE.CatmullRomCurve3(targetWaypoints, false, 'catmullrom', 0.4);

    // 4. Build 3D World Geometry
    this.buildOcean();
    this.buildSkyline();
    this.buildSuspensionBridge();
    this.buildTrafficLightTrails();
    this.buildCloudParticles();
    this.buildWarRoomTable();
    this.buildStarEmblem();
    this.buildFloatingMonoliths();
  }

  // --- Ocean Wave Mesh ---
  private buildOcean() {
    this.oceanGeometry = new THREE.PlaneGeometry(500, 500, 64, 64);
    const oceanMat = new THREE.MeshStandardMaterial({
      color: 0x090d1f,
      roughness: 0.15,
      metalness: 0.85,
      flatShading: true,
    });
    this.oceanMesh = new THREE.Mesh(this.oceanGeometry, oceanMat);
    this.oceanMesh.rotation.x = -Math.PI / 2;
    this.oceanMesh.position.y = -2;
    this.scene.add(this.oceanMesh);
  }

  // --- Procedural Neon City Skyline ---
  private buildSkyline() {
    this.scene.add(this.cityGroup);
    const boxGeom = new THREE.BoxGeometry(1, 1, 1);
    const darkMat = new THREE.MeshStandardMaterial({
      color: 0x07070c,
      roughness: 0.2,
      metalness: 0.9,
    });

    const cyanEdgeMat = new THREE.LineBasicMaterial({ color: 0x00f0ff, transparent: true, opacity: 0.6 });
    const magentaEdgeMat = new THREE.LineBasicMaterial({ color: 0xff2a85, transparent: true, opacity: 0.6 });

    // 80 Skyscraper Monoliths
    for (let i = 0; i < 80; i++) {
      const height = THREE.MathUtils.randFloat(12, 55);
      const width = THREE.MathUtils.randFloat(4, 9);
      const depth = THREE.MathUtils.randFloat(4, 9);

      // Clustered downtown position
      const x = (i % 2 === 0 ? 1 : -1) * THREE.MathUtils.randFloat(8, 75);
      const z = THREE.MathUtils.randFloat(-120, 20);

      const building = new THREE.Mesh(boxGeom, darkMat);
      building.scale.set(width, height, depth);
      building.position.set(x, height / 2 - 2, z);

      const edges = new THREE.EdgesGeometry(boxGeom);
      const wireframe = new THREE.LineSegments(
        edges,
        i % 3 === 0 ? magentaEdgeMat : cyanEdgeMat
      );
      wireframe.scale.set(width, height, depth);
      wireframe.position.copy(building.position);

      this.cityGroup.add(building);
      this.cityGroup.add(wireframe);
    }
  }

  // --- Suspension Bridge ---
  private buildSuspensionBridge() {
    this.scene.add(this.bridgeGroup);
    const bridgeMat = new THREE.MeshStandardMaterial({ color: 0x141724, metalness: 0.8 });
    const cableMat = new THREE.LineBasicMaterial({ color: 0x00f0ff, transparent: true, opacity: 0.8 });

    // Roadway deck
    const deckGeom = new THREE.BoxGeometry(14, 1, 160);
    const deck = new THREE.Mesh(deckGeom, bridgeMat);
    deck.position.set(0, 4, 30);
    this.bridgeGroup.add(deck);

    // Towers
    const towerGeom = new THREE.BoxGeometry(2, 40, 2);
    [-25, 45].forEach((zPos) => {
      [-6, 6].forEach((xPos) => {
        const tower = new THREE.Mesh(towerGeom, bridgeMat);
        tower.position.set(xPos, 20, zPos);
        this.bridgeGroup.add(tower);
      });

      // Crossbeam
      const beamGeom = new THREE.BoxGeometry(14, 1.5, 2);
      const beam = new THREE.Mesh(beamGeom, bridgeMat);
      beam.position.set(0, 36, zPos);
      this.bridgeGroup.add(beam);
    });

    // Suspension Cables
    for (let c = -1; c <= 1; c += 2) {
      const points: THREE.Vector3[] = [
        new THREE.Vector3(c * 6, 5, -45),
        new THREE.Vector3(c * 6, 38, -25),
        new THREE.Vector3(c * 6, 12, 10),
        new THREE.Vector3(c * 6, 38, 45),
        new THREE.Vector3(c * 6, 5, 80),
      ];
      const cableCurve = new THREE.CatmullRomCurve3(points);
      const cableGeom = new THREE.BufferGeometry().setFromPoints(cableCurve.getPoints(50));
      const cableLine = new THREE.Line(cableGeom, cableMat);
      this.bridgeGroup.add(cableLine);
    }
  }

  // --- Traffic Light Trails ---
  private buildTrafficLightTrails() {
    const particleCount = 200;
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);

    const cyan = new THREE.Color(0x00f0ff);
    const magenta = new THREE.Color(0xff2a85);

    for (let i = 0; i < particleCount; i++) {
      const isEastbound = i % 2 === 0;
      positions[i * 3] = isEastbound ? -3 + Math.random() * 2 : 1 + Math.random() * 2;
      positions[i * 3 + 1] = 4.8;
      positions[i * 3 + 2] = THREE.MathUtils.randFloat(-50, 110);

      const col = isEastbound ? cyan : magenta;
      colors[i * 3] = col.r;
      colors[i * 3 + 1] = col.g;
      colors[i * 3 + 2] = col.b;
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    const material = new THREE.PointsMaterial({
      size: 1.5,
      vertexColors: true,
      transparent: true,
      opacity: 0.9,
      blending: THREE.AdditiveBlending,
    });

    this.trafficParticles = new THREE.Points(geometry, material);
    this.scene.add(this.trafficParticles);
  }

  // --- Volumetric Clouds Particles ---
  private buildCloudParticles() {
    const count = 400;
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(count * 3);

    for (let i = 0; i < count; i++) {
      positions[i * 3] = THREE.MathUtils.randFloat(-120, 120);
      positions[i * 3 + 1] = THREE.MathUtils.randFloat(30, 90);
      positions[i * 3 + 2] = THREE.MathUtils.randFloat(-160, 40);
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));

    const material = new THREE.PointsMaterial({
      size: 4.5,
      color: 0xff8a00,
      transparent: true,
      opacity: 0.35,
      blending: THREE.AdditiveBlending,
    });

    this.cloudParticles = new THREE.Points(geometry, material);
    this.scene.add(this.cloudParticles);
  }

  // --- War Room Holographic Table (Chapter 07) ---
  private buildWarRoomTable() {
    this.warRoomTable.position.set(0, 6, -112);

    // Table Base
    const baseGeom = new THREE.CylinderGeometry(6, 6, 0.4, 32);
    const baseMat = new THREE.MeshStandardMaterial({ color: 0x0c0e16, metalness: 0.9 });
    const base = new THREE.Mesh(baseGeom, baseMat);
    this.warRoomTable.add(base);

    // Rotating Holographic Wireframe Grid
    const holoGrid = new THREE.GridHelper(10, 16, 0x00f0ff, 0xff2a85);
    holoGrid.position.y = 0.5;
    this.warRoomTable.add(holoGrid);

    // Holographic Node Markers
    const sphereGeom = new THREE.SphereGeometry(0.3, 16, 16);
    const nodeMat = new THREE.MeshBasicMaterial({ color: 0x00f0ff });
    for (let i = 0; i < 6; i++) {
      const node = new THREE.Mesh(sphereGeom, nodeMat);
      const angle = (i / 6) * Math.PI * 2;
      node.position.set(Math.cos(angle) * 3.5, 1.2 + (i % 2) * 0.8, Math.sin(angle) * 3.5);
      this.warRoomTable.add(node);
    }

    this.scene.add(this.warRoomTable);
  }

  // --- Spinning Star Emblem (Chapter 09) ---
  private buildStarEmblem() {
    this.starEmblem.position.set(0, 5, -168);

    // Star Shape
    const shape = new THREE.Shape();
    const points = 5;
    const outerRadius = 3.5;
    const innerRadius = 1.6;

    for (let i = 0; i < points * 2; i++) {
      const radius = i % 2 === 0 ? outerRadius : innerRadius;
      const angle = (i / (points * 2)) * Math.PI * 2 - Math.PI / 2;
      const x = Math.cos(angle) * radius;
      const y = Math.sin(angle) * radius;
      if (i === 0) shape.moveTo(x, y);
      else shape.lineTo(x, y);
    }
    shape.closePath();

    const extrudeSettings = { depth: 0.6, bevelEnabled: true, bevelSegments: 3, steps: 1, bevelSize: 0.2, bevelThickness: 0.2 };
    const starGeom = new THREE.ExtrudeGeometry(shape, extrudeSettings);
    const starMat = new THREE.MeshStandardMaterial({
      color: 0xffd700,
      metalness: 0.9,
      roughness: 0.15,
      emissive: 0xff8a00,
      emissiveIntensity: 0.3,
    });

    const starMesh = new THREE.Mesh(starGeom, starMat);
    this.starEmblem.add(starMesh);

    // Surrounding Neon Ring
    const ringGeom = new THREE.TorusGeometry(4.8, 0.15, 16, 64);
    const ringMat = new THREE.MeshBasicMaterial({ color: 0x00f0ff });
    const ring = new THREE.Mesh(ringGeom, ringMat);
    this.starEmblem.add(ring);

    this.scene.add(this.starEmblem);
  }

  // --- Floating Monolithic Portals (Chapter 05) ---
  private buildFloatingMonoliths() {
    this.scene.add(this.floatingMonoliths);
    const geom = new THREE.BoxGeometry(4, 18, 0.5);
    const mat = new THREE.MeshStandardMaterial({
      color: 0x141724,
      metalness: 0.9,
      roughness: 0.1,
    });
    const edgeMat = new THREE.LineBasicMaterial({ color: 0xff2a85 });

    for (let i = 0; i < 6; i++) {
      const monolith = new THREE.Mesh(geom, mat);
      const angle = (i / 6) * Math.PI * 2;
      monolith.position.set(Math.cos(angle) * 32, 50 + i * 2, -45 + Math.sin(angle) * 32);
      monolith.rotation.y = angle;

      const edges = new THREE.LineSegments(new THREE.EdgesGeometry(geom), edgeMat);
      monolith.add(edges);

      this.floatingMonoliths.add(monolith);
    }
  }

  // --- Dynamic Atmosphere & Color Grade by Scroll Progress ---
  private updateLighting(progress: number) {
    if (progress < 0.22) {
      // 01-02: Sunrise Keys -> Causeway
      this.dirLight.color.setHex(0xff8a00);
      this.dirLight.intensity = 2.4;
      this.ambientLight.color.setHex(0xff2a85);
      this.ambientLight.intensity = 0.8;
      this.sunMesh.material = new THREE.MeshBasicMaterial({ color: 0xff8a00 });
      if (this.scene.fog instanceof THREE.FogExp2) {
        this.scene.fog.color.setHex(0x1a0a1f);
      }
      this.renderer.setClearColor(0x1a0a1f);
    } else if (progress < 0.45) {
      // 03-04: Downtown Day -> Marina
      this.dirLight.color.setHex(0xffffff);
      this.dirLight.intensity = 2.8;
      this.ambientLight.color.setHex(0x00f0ff);
      this.ambientLight.intensity = 0.6;
      this.sunMesh.material = new THREE.MeshBasicMaterial({ color: 0xffd700 });
      if (this.scene.fog instanceof THREE.FogExp2) {
        this.scene.fog.color.setHex(0x080d1a);
      }
      this.renderer.setClearColor(0x080d1a);
    } else if (progress < 0.68) {
      // 05-06: Golden Hour & Freefall Sunset
      this.dirLight.color.setHex(0xff2a85);
      this.dirLight.intensity = 3.2;
      this.ambientLight.color.setHex(0x5b146f);
      this.ambientLight.intensity = 1.0;
      this.sunMesh.material = new THREE.MeshBasicMaterial({ color: 0xff2a85 });
      if (this.scene.fog instanceof THREE.FogExp2) {
        this.scene.fog.color.setHex(0x240b2b);
      }
      this.renderer.setClearColor(0x240b2b);
    } else {
      // 07-09: Midnight Penthouse & Soundstage
      this.dirLight.color.setHex(0x00f0ff);
      this.dirLight.intensity = 1.2;
      this.ambientLight.color.setHex(0x05050a);
      this.ambientLight.intensity = 0.4;
      this.spotLight.intensity = 3.5;
      this.sunMesh.material = new THREE.MeshBasicMaterial({ color: 0x00f0ff });
      if (this.scene.fog instanceof THREE.FogExp2) {
        this.scene.fog.color.setHex(0x05050a);
      }
      this.renderer.setClearColor(0x05050a);
    }
  }

  // --- Render Loop & Animation Update ---
  public update(scrollProgress: number, mouseX: number, mouseY: number) {
    this.targetProgress = THREE.MathUtils.clamp(scrollProgress, 0.0001, 0.9999);
    this.mouseX = mouseX;
    this.mouseY = mouseY;

    // Smooth lerp progress
    this.currentProgress += (this.targetProgress - this.currentProgress) * 0.08;
    const time = this.clock.getElapsedTime();

    // 1. Camera along Spline
    const camPos = this.cameraSpline.getPointAt(this.currentProgress);
    const targetPos = this.targetSpline.getPointAt(this.currentProgress);

    // Mouse Parallax
    this.camera.position.x = camPos.x + this.mouseX * 1.5;
    this.camera.position.y = camPos.y - this.mouseY * 1.0;
    this.camera.position.z = camPos.z;

    this.camera.lookAt(targetPos.x, targetPos.y, targetPos.z);

    // 2. Ocean Waves Animation
    if (this.oceanGeometry) {
      const posAttr = this.oceanGeometry.attributes.position;
      for (let i = 0; i < posAttr.count; i++) {
        const u = posAttr.getX(i);
        const v = posAttr.getY(i);
        const z = Math.sin(u * 0.08 + time * 1.8) * 0.6 + Math.cos(v * 0.08 + time * 1.5) * 0.5;
        posAttr.setZ(i, z);
      }
      posAttr.needsUpdate = true;
    }

    // 3. Traffic Particles Zoom
    if (this.trafficParticles) {
      const posAttr = this.trafficParticles.geometry.attributes.position;
      for (let i = 0; i < posAttr.count; i++) {
        let z = posAttr.getZ(i);
        z -= i % 2 === 0 ? 1.4 : -1.4;
        if (z < -50) z = 110;
        if (z > 110) z = -50;
        posAttr.setZ(i, z);
      }
      posAttr.needsUpdate = true;
    }

    // 4. Cloud Particles Drift
    if (this.cloudParticles) {
      this.cloudParticles.rotation.y = time * 0.02;
    }

    // 5. War Room Table Rotation
    this.warRoomTable.rotation.y = time * 0.4;

    // 6. Soundstage Star Emblem Spin
    this.starEmblem.rotation.y = time * 0.8;
    this.starEmblem.rotation.z = Math.sin(time) * 0.15;

    // 7. Update Atmosphere
    this.updateLighting(this.currentProgress);

    // 8. Render
    this.renderer.render(this.scene, this.camera);
  }

  public handleResize() {
    this.camera.aspect = window.innerWidth / window.innerHeight;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(window.innerWidth, window.innerHeight);
  }

  public destroy() {
    this.renderer.dispose();
    this.scene.clear();
  }
}
