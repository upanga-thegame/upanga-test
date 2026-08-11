class RelicCanvasApp {
    constructor(root) {
        this.root = root;
        this.canvas = root.querySelector('[data-relic-canvas]');
        this.context = this.canvas?.getContext('2d', { alpha: true });
        this.glintCanvas = document.createElement('canvas');
        this.glintContext = this.glintCanvas.getContext('2d', { alpha: true });
        this.image = new Image();
        this.image.decoding = 'async';
        this.frame = 0;
        this.running = false;
        this.visible = false;
        this.startedAt = 0;
        this.lastTime = 0;
        this.width = 0;
        this.height = 0;
        this.pixelRatio = 1;
        this.motionScale = window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 0.38 : 1;
        this.mist = this.createMist(16);
        this.resizeObserver = new ResizeObserver(() => this.resize());
        this.visibilityObserver = new IntersectionObserver((entries) => {
            this.visible = entries.some((entry) => entry.isIntersecting);
            if (this.visible) this.start();
            else this.stop();
        }, { rootMargin: '160px 0px' });

        if (!this.canvas || !this.context || !this.glintContext) return;

        const imageReady = () => {
            this.resize();
            this.root.classList.add('relic-app-ready');
            this.root.dataset.relicApp = 'ready';
            this.draw(0);
            if (this.visible) this.start();
        };
        this.image.addEventListener('load', imageReady, { once: true });
        this.image.addEventListener('error', () => {
            this.root.dataset.relicApp = 'fallback';
        }, { once: true });
        this.image.src = 'images/soul-blade.png';
        if (this.image.complete && this.image.naturalWidth) imageReady();
        this.resizeObserver.observe(this.root);
        this.visibilityObserver.observe(this.root);
        document.addEventListener('visibilitychange', () => {
            if (document.hidden) this.stop();
            else if (this.visible) this.start();
        });
    }

    createMist(count) {
        let seed = 419;
        const random = () => {
            seed = (seed * 16807) % 2147483647;
            return (seed - 1) / 2147483646;
        };
        return Array.from({ length: count }, () => ({
            x: random(),
            y: 0.18 + random() * 0.64,
            radius: 55 + random() * 115,
            speed: 0.06 + random() * 0.12,
            phase: random() * Math.PI * 2,
            amplitude: 0.025 + random() * 0.065,
            alpha: 0.025 + random() * 0.055
        }));
    }

    resize() {
        if (!this.canvas || !this.context) return;
        const bounds = this.root.getBoundingClientRect();
        const width = Math.max(1, Math.round(bounds.width));
        const height = Math.max(1, Math.round(bounds.height));
        const pixelRatio = Math.min(2, window.devicePixelRatio || 1);
        if (width === this.width && height === this.height && pixelRatio === this.pixelRatio) return;

        this.width = width;
        this.height = height;
        this.pixelRatio = pixelRatio;
        this.canvas.width = Math.round(width * pixelRatio);
        this.canvas.height = Math.round(height * pixelRatio);
        this.glintCanvas.width = this.canvas.width;
        this.glintCanvas.height = this.canvas.height;
        this.context.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
        this.glintContext.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
        if (this.image.complete && this.image.naturalWidth) this.draw(this.lastTime);
    }

    start() {
        if (this.running || !this.image.complete || !this.image.naturalWidth) return;
        this.running = true;
        this.startedAt = performance.now() - this.lastTime * 1000;
        this.root.dataset.relicRunning = 'true';
        this.frame = requestAnimationFrame((time) => this.tick(time));
    }

    stop() {
        if (this.frame) cancelAnimationFrame(this.frame);
        this.frame = 0;
        this.running = false;
        this.root.dataset.relicRunning = 'false';
    }

    tick(time) {
        if (!this.running) return;
        this.lastTime = ((time - this.startedAt) / 1000) * this.motionScale;
        this.draw(this.lastTime);
        this.root.dataset.relicFrame = String(Number(this.root.dataset.relicFrame || 0) + 1);
        this.frame = requestAnimationFrame((nextTime) => this.tick(nextTime));
    }

    drawMist(time) {
        const context = this.context;
        context.save();
        context.globalCompositeOperation = 'screen';
        this.mist.forEach((particle) => {
            const drift = Math.sin(time * particle.speed + particle.phase) * particle.amplitude;
            const x = (particle.x + drift) * this.width;
            const y = (particle.y + Math.cos(time * particle.speed * 0.7 + particle.phase) * 0.035) * this.height;
            const radius = particle.radius * (0.88 + Math.sin(time * particle.speed + particle.phase) * 0.12);
            const gradient = context.createRadialGradient(x, y, 0, x, y, radius);
            gradient.addColorStop(0, `rgba(188, 224, 199, ${particle.alpha})`);
            gradient.addColorStop(0.42, `rgba(96, 151, 120, ${particle.alpha * 0.55})`);
            gradient.addColorStop(1, 'rgba(28, 52, 39, 0)');
            context.fillStyle = gradient;
            context.fillRect(x - radius, y - radius, radius * 2, radius * 2);
        });
        context.restore();
    }

    ringState(index, time) {
        const direction = index === 0 ? 1 : -1;
        const speed = index === 0 ? 0.21 : 0.29;
        const base = index === 0 ? -0.28 : 0.52;
        const angle = base + time * speed * direction;
        const radiusX = Math.min(this.width * (index === 0 ? 0.42 : 0.34), index === 0 ? 290 : 235);
        const radiusY = Math.min(this.height * (index === 0 ? 0.19 : 0.135), index === 0 ? 94 : 70);
        return { angle, radiusX, radiusY, phase: time * (index === 0 ? 0.72 : -0.94) + index * 1.7 };
    }

    drawRing(ring, foreground, color) {
        const context = this.context;
        context.save();
        context.translate(this.width * 0.5, this.height * 0.5);
        context.rotate(ring.angle);
        context.beginPath();
        if (foreground) context.ellipse(0, 0, ring.radiusX, ring.radiusY, 0, 0, Math.PI);
        else context.ellipse(0, 0, ring.radiusX, ring.radiusY, 0, Math.PI, Math.PI * 2);
        context.strokeStyle = color;
        context.lineWidth = foreground ? 1.8 : 1;
        context.shadowColor = foreground ? color : 'transparent';
        context.shadowBlur = foreground ? 11 : 0;
        context.stroke();

        if (foreground) {
            const sparkX = Math.cos(ring.phase) * ring.radiusX;
            const sparkY = Math.sin(ring.phase) * ring.radiusY;
            const spark = context.createRadialGradient(sparkX, sparkY, 0, sparkX, sparkY, 9);
            spark.addColorStop(0, 'rgba(255,255,255,.95)');
            spark.addColorStop(0.2, color);
            spark.addColorStop(1, 'rgba(201,243,106,0)');
            context.fillStyle = spark;
            context.beginPath();
            context.arc(sparkX, sparkY, 9, 0, Math.PI * 2);
            context.fill();
        }
        context.restore();
    }

    swordBounds(time) {
        const maxWidth = Math.min(this.width * 0.78, 510);
        const maxHeight = Math.min(this.height * 0.35, 150);
        const scale = Math.min(maxWidth / this.image.naturalWidth, maxHeight / this.image.naturalHeight);
        const width = this.image.naturalWidth * scale;
        const height = this.image.naturalHeight * scale;
        const hover = Math.sin(time * 0.62) * 2.2 * this.motionScale;
        return { x: (this.width - width) / 2, y: (this.height - height) / 2 + hover, width, height };
    }

    drawSword(bounds) {
        const context = this.context;
        context.save();
        context.shadowColor = 'rgba(201,243,106,.58)';
        context.shadowBlur = 28;
        context.drawImage(this.image, bounds.x, bounds.y, bounds.width, bounds.height);
        context.restore();
        context.drawImage(this.image, bounds.x, bounds.y, bounds.width, bounds.height);
    }

    drawGlint(bounds, time) {
        const context = this.glintContext;
        context.clearRect(0, 0, this.width, this.height);
        context.globalCompositeOperation = 'source-over';
        context.drawImage(this.image, bounds.x, bounds.y, bounds.width, bounds.height);
        context.globalCompositeOperation = 'source-in';

        const phase = (time % 4.8) / 4.8;
        const sweep = Math.max(0, Math.min(1, (phase - 0.08) / 0.48));
        const glintX = bounds.x - 90 + (bounds.width + 180) * sweep;
        const gradient = context.createLinearGradient(glintX - 54, 0, glintX + 54, 0);
        gradient.addColorStop(0, 'rgba(255,255,255,0)');
        gradient.addColorStop(0.42, 'rgba(220,255,226,.12)');
        gradient.addColorStop(0.5, 'rgba(255,255,255,.98)');
        gradient.addColorStop(0.58, 'rgba(201,243,106,.25)');
        gradient.addColorStop(1, 'rgba(255,255,255,0)');
        context.fillStyle = gradient;
        context.fillRect(bounds.x - 100, bounds.y - 20, bounds.width + 200, bounds.height + 40);
        context.globalCompositeOperation = 'source-over';

        const opacity = phase > 0.08 && phase < 0.56 ? Math.sin(sweep * Math.PI) : 0;
        this.context.save();
        this.context.globalCompositeOperation = 'screen';
        this.context.globalAlpha = opacity;
        this.context.drawImage(this.glintCanvas, 0, 0, this.width, this.height);
        this.context.restore();
        return { phase, opacity, x: glintX };
    }

    draw(time) {
        if (!this.context || !this.image.complete || !this.image.naturalWidth || !this.width || !this.height) return;
        const context = this.context;
        context.clearRect(0, 0, this.width, this.height);

        const backdrop = context.createRadialGradient(this.width * 0.5, this.height * 0.5, 0, this.width * 0.5, this.height * 0.5, Math.max(this.width, this.height) * 0.62);
        backdrop.addColorStop(0, 'rgba(47,84,62,.42)');
        backdrop.addColorStop(0.5, 'rgba(16,34,24,.22)');
        backdrop.addColorStop(1, 'rgba(3,8,5,.68)');
        context.fillStyle = backdrop;
        context.fillRect(0, 0, this.width, this.height);
        this.drawMist(time);

        const outerRing = this.ringState(0, time);
        const innerRing = this.ringState(1, time);
        this.drawRing(outerRing, false, 'rgba(201,243,106,.26)');
        this.drawRing(innerRing, false, 'rgba(124,226,206,.22)');

        const bounds = this.swordBounds(time);
        const aura = context.createRadialGradient(this.width * 0.5, this.height * 0.5, 0, this.width * 0.5, this.height * 0.5, Math.min(this.width * 0.42, 270));
        aura.addColorStop(0, `rgba(201,243,106,${0.12 + Math.sin(time * 0.8) * 0.025})`);
        aura.addColorStop(0.46, 'rgba(78,161,120,.07)');
        aura.addColorStop(1, 'rgba(36,74,52,0)');
        context.fillStyle = aura;
        context.fillRect(0, 0, this.width, this.height);

        this.drawSword(bounds);
        const glint = this.drawGlint(bounds, time);
        this.drawRing(outerRing, true, 'rgba(201,243,106,.72)');
        this.drawRing(innerRing, true, 'rgba(124,226,206,.62)');

        this.diagnostics = {
            ready: true,
            running: this.running,
            frame: Number(this.root.dataset.relicFrame || 0),
            time: Number(time.toFixed(3)),
            outerAngle: Number(outerRing.angle.toFixed(4)),
            innerAngle: Number(innerRing.angle.toFixed(4)),
            glintPhase: Number(glint.phase.toFixed(4)),
            glintOpacity: Number(glint.opacity.toFixed(4)),
            mistCount: this.mist.length,
            width: this.width,
            height: this.height,
            pixelRatio: this.pixelRatio,
            reducedMotionScale: this.motionScale
        };
        this.root.dataset.relicTime = this.diagnostics.time;
        this.root.dataset.relicOuterAngle = this.diagnostics.outerAngle;
        this.root.dataset.relicInnerAngle = this.diagnostics.innerAngle;
        this.root.dataset.relicGlintPhase = this.diagnostics.glintPhase;
        this.root.dataset.relicGlintOpacity = this.diagnostics.glintOpacity;
        this.root.dataset.relicMistCount = this.diagnostics.mistCount;
    }
}

const relicRoot = document.querySelector('[data-relic-app]');
if (relicRoot) {
    const relicApp = new RelicCanvasApp(relicRoot);
    window.__relicAppDiagnostics = () => ({ ...relicApp.diagnostics });
}
