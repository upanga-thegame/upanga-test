(() => {
    const page = document.documentElement.dataset.page || 'home';
    document.body.classList.add('is-ready');

    document.querySelectorAll('[data-year]').forEach((node) => {
        node.textContent = new Date().getFullYear();
    });

    document.querySelectorAll('[data-nav]').forEach((link) => {
        if (link.dataset.nav === page) link.classList.add('active');
    });

    const menuButton = document.querySelector('.menu-toggle');
    const nav = document.querySelector('.site-nav');
    if (menuButton && nav) {
        menuButton.addEventListener('click', () => {
            const open = nav.classList.toggle('open');
            menuButton.setAttribute('aria-expanded', String(open));
        });
        nav.querySelectorAll('a').forEach((link) => link.addEventListener('click', () => {
            nav.classList.remove('open');
            menuButton.setAttribute('aria-expanded', 'false');
        }));
    }

    const reveals = document.querySelectorAll('.reveal');
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                revealObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.12 });
    reveals.forEach((node) => revealObserver.observe(node));

    if (window.Lenis && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        const lenis = new window.Lenis({ duration: 1.15, smoothWheel: true, syncTouch: false });
        if (window.gsap) {
            window.gsap.ticker.add((time) => lenis.raf(time * 1000));
            window.gsap.ticker.lagSmoothing(0);
        } else {
            const raf = (time) => { lenis.raf(time); requestAnimationFrame(raf); };
            requestAnimationFrame(raf);
        }
    }

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (window.gsap && window.ScrollTrigger && !prefersReducedMotion) {
        window.gsap.registerPlugin(window.ScrollTrigger);
        window.gsap.utils.toArray('[data-speed]').forEach((node) => {
            window.gsap.to(node, { yPercent: Number(node.dataset.speed) * -100, ease: 'none', scrollTrigger: { trigger: node, scrub: true } });
        });

        const hero = document.querySelector('.hero-section');
        const heroVideo = hero?.querySelector('.hero-media video');
        if (hero && heroVideo) {
            window.gsap.to(heroVideo, {
                scale: 1.18,
                xPercent: 3,
                yPercent: 8,
                filter: 'saturate(1) contrast(1.18) brightness(.78)',
                ease: 'none',
                scrollTrigger: { trigger: hero, start: 'top top', end: 'bottom top', scrub: true }
            });
            window.gsap.to(hero.querySelector('.hero-copy'), {
                yPercent: -16,
                opacity: .45,
                ease: 'none',
                scrollTrigger: { trigger: hero, start: 'top top', end: 'bottom top', scrub: true }
            });
        }

        const journey = document.querySelector('.scroll-journey');
        const journeyVideos = [...document.querySelectorAll('[data-journey-video]')];
        const journeySteps = [...document.querySelectorAll('[data-journey-step]')];
        const journeyProgress = document.querySelector('.journey-progress span');
        const journeyCounter = document.querySelector('.journey-counter strong');
        let activeJourneyStep = 0;

        const playJourneyVideo = (video) => {
            if (!video) return;
            video.play().catch(() => {});
        };

        const setJourneyStep = (index) => {
            activeJourneyStep = index;
            journeyVideos.forEach((video, videoIndex) => {
                const active = videoIndex === index;
                video.classList.toggle('is-active', active);
                if (active) playJourneyVideo(video);
                else video.pause();
                window.gsap.to(video, { opacity: active ? .82 : 0, duration: .7, ease: 'power2.out' });
            });
            journeySteps.forEach((step, stepIndex) => step.classList.toggle('is-active', stepIndex === index));
            if (journeyCounter) journeyCounter.textContent = String(index + 1).padStart(2, '0');
        };

        if (journey && journeyVideos.length && journeySteps.length) {
            setJourneyStep(0);
            window.ScrollTrigger.create({
                trigger: journey,
                start: 'top top',
                end: 'bottom bottom',
                scrub: true,
                onUpdate: (trigger) => {
                    const progress = Math.min(.9999, Math.max(0, trigger.progress));
                    const stepPosition = progress * journeySteps.length;
                    const nextStep = Math.min(journeySteps.length - 1, Math.floor(stepPosition));
                    const localProgress = stepPosition - nextStep;
                    if (nextStep !== activeJourneyStep) setJourneyStep(nextStep);
                    const activeVideo = journeyVideos[nextStep];
                    window.gsap.to(activeVideo, { scale: 1.08 - localProgress * .08, xPercent: (localProgress - .5) * 2.5, duration: .25, overwrite: true });
                    if (journeyProgress) window.gsap.set(journeyProgress, { scaleX: Math.max(.02, progress) });
                }
            });
        }
    }

    const renderChangelog = (data) => {
        const root = document.querySelector('[data-changelog]');
        if (!root || !data?.entries) return;
        root.innerHTML = data.entries.map((entry) => `<article class="changelog-entry"><div class="changelog-date">${escapeHtml(entry.date)}</div><div><h3>${escapeHtml(entry.title)}</h3><p>${escapeHtml(entry.content)}</p></div></article>`).join('');
        root.querySelectorAll('.changelog-entry').forEach((node) => revealObserver.observe(node));
    };

    const renderFaq = (data) => {
        const root = document.querySelector('[data-faq]');
        if (!root || !data?.categories) return;
        root.innerHTML = data.categories.map((category) => `<section class="faq-category"><h2>${escapeHtml(category.title)}</h2>${category.items.map((item) => `<div class="faq-item"><button class="faq-question" type="button" aria-expanded="false"><span>${escapeHtml(item.question)}</span><span>+</span></button><div class="faq-answer"><div><p>${escapeHtml(item.answer)}</p></div></div></div>`).join('')}</section>`).join('');
        root.querySelectorAll('.faq-question').forEach((button) => button.addEventListener('click', () => {
            const item = button.closest('.faq-item');
            const open = item.classList.toggle('open');
            button.setAttribute('aria-expanded', String(open));
        }));
    };

    const escapeHtml = (value) => String(value ?? '').replace(/[&<>'"]/g, (character) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;' }[character]));

    if (document.querySelector('[data-changelog]')) fetch('data/changelog.json').then((response) => response.json()).then(renderChangelog).catch(() => {});
    if (document.querySelector('[data-faq]')) fetch('data/faq.json').then((response) => response.json()).then(renderFaq).catch(() => {});
})();
