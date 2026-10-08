export type CityLayer = 'form' | 'green' | 'data';
type Point = [number, number, number];
type Block = { x: number; z: number; w: number; d: number; h: number; seed: number };

// Deterministic geometry: an illustrative model, independent of external assets.
export function createCity(canvas: HTMLCanvasElement) {
  const ctx = canvas.getContext('2d');
  if (!ctx)
    return {
      destroy() {},
      setLayer(_v: CityLayer) {},
      setPaused(_v: boolean) {},
      rotate(_v: number) {},
    };
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');
  let layer: CityLayer = 'form',
    paused = false,
    visible = true,
    disposed = false;
  let width = 1,
    height = 1,
    angle = -0.62,
    targetAngle = -0.62,
    frame = 0,
    lastTime = 0;
  let dragging = false,
    previousX = 0,
    interacted = false,
    dirty = true;
  const blocks: Block[] = [];
  for (let ix = 0; ix < 9; ix++)
    for (let iz = 0; iz < 9; iz++) {
      if (ix === 4 || iz === 4 || (ix < 3 && iz > 5) || (ix > 6 && iz < 2)) continue;
      const seed = (ix * 37 + iz * 61 + 17) % 101;
      const center = Math.max(0, 1 - Math.hypot(ix - 4, iz - 4) / 5);
      blocks.push({
        x: (ix - 4) * 0.89,
        z: (iz - 4) * 0.89,
        w: 0.46 + (seed % 3) * 0.035,
        d: 0.46 + (seed % 4) * 0.035,
        h: 0.35 + seed / 120 + center * 1.9,
        seed,
      });
    }
  blocks.push({ x: 0.87, z: 0.89, w: 0.6, d: 0.6, h: 3.6, seed: 999 });
  const scale = () => Math.min(width / 12, height / 8.2);
  function project([x, y, z]: Point): [number, number] {
    const a = angle,
      rx = x * Math.cos(a) - z * Math.sin(a),
      rz = x * Math.sin(a) + z * Math.cos(a);
    return [width / 2 + rx * scale(), height * 0.64 + (rz * 0.47 - y * 0.94) * scale()];
  }
  function polygon(points: Point[], fill: string, stroke?: string) {
    if (!ctx) return;
    ctx.beginPath();
    points.forEach((p, i) => {
      const [x, y] = project(p);
      if (i === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    });
    ctx.closePath();
    ctx.fillStyle = fill;
    ctx.fill();
    if (stroke) {
      ctx.strokeStyle = stroke;
      ctx.lineWidth = 0.65;
      ctx.stroke();
    }
  }
  function surface(x: number, z: number, w: number, d: number, y: number, color: string) {
    polygon(
      [
        [x - w / 2, y, z - d / 2],
        [x + w / 2, y, z - d / 2],
        [x + w / 2, y, z + d / 2],
        [x - w / 2, y, z + d / 2],
      ],
      color,
    );
  }
  function box(
    x: number,
    z: number,
    w: number,
    d: number,
    base: number,
    h: number,
    colors: string[],
    windows = false,
  ) {
    const p: Point[] = [
      [x - w / 2, base, z - d / 2],
      [x + w / 2, base, z - d / 2],
      [x + w / 2, base, z + d / 2],
      [x - w / 2, base, z + d / 2],
      [x - w / 2, base + h, z - d / 2],
      [x + w / 2, base + h, z - d / 2],
      [x + w / 2, base + h, z + d / 2],
      [x - w / 2, base + h, z + d / 2],
    ];
    const faces = [
      [0, 1, 5, 4],
      [1, 2, 6, 5],
      [2, 3, 7, 6],
      [3, 0, 4, 7],
    ];
    faces.forEach((f, i) => {
      const normals = [
        [0, -1],
        [1, 0],
        [0, 1],
        [-1, 0],
      ];
      if (normals[i][0] * Math.sin(angle) + normals[i][1] * Math.cos(angle) <= 0) return;
      polygon(
        f.map((j) => p[j]),
        colors[(i % 2) + 1],
      );
      if (windows && h > 0.65 && ctx) {
        for (let row = 0.25; row < h - 0.12; row += 0.28) {
          const a = p[f[0]],
            b = p[f[1]];
          for (let col = 0.18; col < 0.9; col += 0.26) {
            const c = col + 0.12;
            polygon(
              [
                [a[0] + (b[0] - a[0]) * col, base + row, a[2] + (b[2] - a[2]) * col],
                [a[0] + (b[0] - a[0]) * c, base + row, a[2] + (b[2] - a[2]) * c],
                [a[0] + (b[0] - a[0]) * c, base + row + 0.075, a[2] + (b[2] - a[2]) * c],
                [a[0] + (b[0] - a[0]) * col, base + row + 0.075, a[2] + (b[2] - a[2]) * col],
              ],
              layer === 'data' ? '#ffffff4a' : '#7079684d',
            );
          }
        }
      }
    });
    polygon([p[4], p[5], p[6], p[7]], colors[0]);
  }
  function tree(x: number, z: number, size = 0.2) {
    if (!ctx) return;
    const [px, py] = project([x, 0.12, z]);
    const [tx, ty] = project([x, size * 2, z]);
    ctx.strokeStyle = '#526242';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(px, py);
    ctx.lineTo(tx, ty);
    ctx.stroke();
    const r = size * scale();
    const g = ctx.createRadialGradient(tx - r * 0.3, ty - r * 0.4, 0, tx, ty, r);
    g.addColorStop(0, '#b2bf83');
    g.addColorStop(1, '#486045');
    ctx.fillStyle = g;
    ctx.beginPath();
    ctx.ellipse(tx, ty, r, r * 0.9, 0, 0, Math.PI * 2);
    ctx.fill();
  }
  function draw(time: number) {
    if (!ctx || disposed) return;
    frame = requestAnimationFrame(draw);
    if (!visible || document.hidden || (time - lastTime < 32 && !dirty)) return;
    lastTime = time;
    const moving = !paused && !reduced.matches;
    if (moving && !interacted && !dragging) targetAngle = -0.62 + Math.sin(time / 11000) * 0.075;
    const delta = targetAngle - angle;
    if (!moving && Math.abs(delta) < 0.001 && !dirty) return;
    angle += delta * (reduced.matches ? 1 : 0.12);
    dirty = false;
    ctx.clearRect(0, 0, width, height);
    // Soft contact shadow and raised base.
    ctx.save();
    ctx.translate(width / 2, height * 0.72);
    ctx.scale(1, 0.34);
    const g = ctx.createRadialGradient(0, 0, 0, 0, 0, scale() * 5.5);
    g.addColorStop(0, '#172b1c35');
    g.addColorStop(1, '#172b1c00');
    ctx.fillStyle = g;
    ctx.beginPath();
    ctx.arc(0, 0, scale() * 5.5, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
    box(0, 0, 8.6, 8.6, -0.35, 0.35, ['#a5ad86', '#566b50', '#7f8e64']);
    surface(0, 0, 8.48, 8.48, 0.012, layer === 'green' ? '#a2b96d' : '#b8bda0');
    for (let i = -4; i <= 4; i++) {
      surface(i * 0.89 + 0.43, 0, 0.18, 8.45, 0.02, '#d5d4be');
      surface(0, i * 0.89 + 0.43, 8.45, 0.18, 0.025, '#d5d4be');
    }
    surface(0, 0, 0.43, 8.45, 0.03, '#e7e3cf');
    surface(0, 0, 8.45, 0.43, 0.035, '#e7e3cf');
    surface(-2.65, 2.65, 2.22, 2.12, 0.04, '#6c8954');
    surface(3.12, -2.75, 1.2, 2.2, 0.04, '#728c58');
    // A canal runs through the district, with a small crossing.
    surface(-0.06, 3.92, 8.3, 0.24, 0.05, '#719b99');
    surface(0, 3.92, 0.46, 0.3, 0.08, '#e9e4d1');
    const objects: (Block | { x: number; z: number; size: number })[] = [...blocks];
    for (let i = 0; i < 18; i++)
      objects.push({
        x: -3.6 + (i % 5) * 0.42,
        z: 1.9 + Math.floor(i / 5) * 0.44,
        size: 0.16 + (i % 3) * 0.035,
      });
    for (let i = 0; i < 9; i++)
      objects.push({ x: 3.05 + (i % 2) * 0.3, z: -3.5 + Math.floor(i / 2) * 0.37, size: 0.18 });
    const ordered = objects.sort(
      (a, b) =>
        a.x * Math.sin(angle) +
        a.z * Math.cos(angle) -
        (b.x * Math.sin(angle) + b.z * Math.cos(angle)),
    );
    ordered.forEach((b) => {
      if ('size' in b) {
        tree(b.x, b.z, b.size);
        return;
      }
      surface(b.x + 0.16, b.z + 0.18, b.w + 0.2, b.d + 0.18, 0.055, '#58644925');
      let colors = ['#f2edda', '#c7c9b4', '#dedec5'];
      if (b.seed === 999) colors = ['#e2aa72', '#b47a49', '#cc9460'];
      if (layer === 'green')
        colors =
          b.seed % 3 === 0 ? ['#9ba96e', '#6b8056', '#81965f'] : ['#dddcc7', '#aaaf94', '#c3c8af'];
      if (layer === 'data') {
        const t = b.seed === 999 ? 4 : b.seed % 5;
        colors = [
          ['#b3c9a0', '#8ba779', '#a2bd8c'],
          ['#c7ce9d', '#a4b17e', '#b8c58f'],
          ['#e6c48c', '#c3a269', '#d8b77c'],
          ['#dfa878', '#ba8357', '#d09864'],
          ['#d47e61', '#b15e48', '#c97051'],
        ][t];
      }
      box(b.x, b.z, b.w, b.d, 0.07, b.h, colors, true);
      if (layer === 'green' || b.seed % 4 === 0)
        surface(b.x, b.z, b.w * 0.7, b.d * 0.7, b.h + 0.075, '#80915a');
      if (b.seed === 999)
        box(b.x, b.z, 0.12, 0.12, b.h + 0.07, 0.35, ['#d9d2b5', '#a2a891', '#bdc2a6']);
    });
    canvas.dataset.ready = 'true';
  }
  function resize() {
    const r = canvas.getBoundingClientRect();
    width = Math.max(1, r.width);
    height = Math.max(1, r.height);
    const dpr = Math.min(window.devicePixelRatio || 1, 1.75);
    canvas.width = Math.round(width * dpr);
    canvas.height = Math.round(height * dpr);
    ctx?.setTransform(dpr, 0, 0, dpr, 0, 0);
    dirty = true;
  }
  function down(e: PointerEvent) {
    if (e.button !== 0) return;
    dragging = true;
    interacted = true;
    previousX = e.clientX;
    canvas.setPointerCapture(e.pointerId);
    canvas.style.cursor = 'grabbing';
  }
  function move(e: PointerEvent) {
    if (!dragging) return;
    targetAngle += (e.clientX - previousX) * 0.008;
    previousX = e.clientX;
    dirty = true;
  }
  function up() {
    dragging = false;
    canvas.style.cursor = 'grab';
  }
  function key(e: KeyboardEvent) {
    if (e.key === 'ArrowLeft' || e.key === 'ArrowRight') {
      e.preventDefault();
      targetAngle += e.key === 'ArrowLeft' ? -0.22 : 0.22;
      interacted = true;
      dirty = true;
    }
  }
  const ro = new ResizeObserver(resize);
  ro.observe(canvas);
  const io = new IntersectionObserver((entries) => {
    visible = entries[0].isIntersecting;
    dirty = true;
  });
  io.observe(canvas);
  canvas.addEventListener('pointerdown', down);
  canvas.addEventListener('pointermove', move);
  canvas.addEventListener('pointerup', up);
  canvas.addEventListener('pointercancel', up);
  canvas.addEventListener('keydown', key);
  resize();
  frame = requestAnimationFrame(draw);
  return {
    setLayer(v: CityLayer) {
      layer = v;
      dirty = true;
    },
    setPaused(v: boolean) {
      paused = v;
      dirty = true;
    },
    rotate(v: number) {
      targetAngle += v;
      interacted = true;
      dirty = true;
    },
    destroy() {
      disposed = true;
      cancelAnimationFrame(frame);
      ro.disconnect();
      io.disconnect();
      canvas.removeEventListener('pointerdown', down);
      canvas.removeEventListener('pointermove', move);
      canvas.removeEventListener('pointerup', up);
      canvas.removeEventListener('pointercancel', up);
      canvas.removeEventListener('keydown', key);
    },
  };
}
