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

    const heroDossier = document.querySelector('[data-hero-dossier]');
    if (heroDossier) {
        const heroButtons = [...heroDossier.querySelectorAll('[data-hero-id]')];
        const heroStageImage = heroDossier.querySelector('[data-hero-stage-image]');
        const heroStageVideo = heroDossier.querySelector('[data-hero-stage-video]');
        const heroStageIndex = heroDossier.querySelector('[data-hero-stage-index]');
        const heroStageName = heroDossier.querySelector('[data-hero-stage-name]');
        const heroStageRole = heroDossier.querySelector('[data-hero-stage-role]');
        const profileName = heroDossier.querySelector('[data-hero-profile-name]');
        const profileRole = heroDossier.querySelector('[data-hero-profile-role]');
        const profileFaction = heroDossier.querySelector('[data-hero-profile-faction]');
        const profileBio = heroDossier.querySelector('[data-hero-profile-bio]');
        const profileStatus = heroDossier.querySelector('[data-hero-profile-status]');
        const abilitiesRoot = heroDossier.querySelector('.hero-ability-list[data-hero-abilities]');
        const statNames = ['force', 'guard', 'range', 'focus'];
        let activeHeroId = '';

        const playHeroVideo = (userInitiated = false) => {
            if (!heroStageVideo || (prefersReducedMotion && !userInitiated)) return;
            heroStageVideo.muted = true;
            heroStageVideo.play().catch(() => {});
        };

        const setHeroProfile = (button, userInitiated = false) => {
            if (!button || (button.dataset.heroId === activeHeroId && !userInitiated)) return;
            activeHeroId = button.dataset.heroId;
            heroButtons.forEach((item) => {
                const active = item === button;
                item.classList.toggle('is-active', active);
                item.setAttribute('aria-pressed', String(active));
            });

            const name = button.dataset.heroName || '';
            const role = button.dataset.heroRole || '';
            const faction = button.dataset.heroFaction || '';
            const image = button.dataset.heroImage || '';
            const video = button.dataset.heroVideo || '';
            const fallbackVideo = button.dataset.heroVideoFallback || '';
            if (heroStageImage) {
                heroStageImage.src = image;
                heroStageImage.alt = `${name}, ${role}`;
            }
            if (heroStageIndex) heroStageIndex.textContent = button.querySelector('.hero-roster-index')?.textContent || '';
            if (heroStageName) heroStageName.textContent = name;
            if (heroStageRole) heroStageRole.textContent = role;
            if (profileName) profileName.textContent = name;
            if (profileRole) profileRole.textContent = role;
            if (profileFaction) profileFaction.textContent = faction;
            if (profileBio) profileBio.textContent = button.dataset.heroBio || '';
            const motionEnabled = video && (!prefersReducedMotion || userInitiated);
            if (profileStatus) profileStatus.textContent = motionEnabled ? 'Motion study' : 'Portrait still';

            statNames.forEach((stat) => {
                const value = Number(button.dataset[`stat${stat[0].toUpperCase()}${stat.slice(1)}`] || 0);
                const bar = heroDossier.querySelector(`[data-hero-stat="${stat}"]`);
                const valueNode = heroDossier.querySelector(`[data-hero-stat-value="${stat}"]`);
                if (bar) bar.style.setProperty('--value', `${value}%`);
                if (valueNode) valueNode.textContent = String(value).padStart(2, '0');
            });

            if (abilitiesRoot) {
                abilitiesRoot.replaceChildren(...(button.dataset.heroAbilities || '').split('|').filter(Boolean).map((ability, index) => {
                    const node = document.createElement('span');
                    node.textContent = `${String(index + 1).padStart(2, '0')} / ${ability}`;
                    return node;
                }));
            }

            if (!heroStageVideo) return;
            heroStageVideo.classList.remove('is-visible');
            heroStageVideo.pause();
            if (!video || !motionEnabled) {
                if (!video) {
                    heroStageVideo.removeAttribute('src');
                    heroStageVideo.dataset.source = '';
                    heroStageVideo.load();
                }
                return;
            }
            if (heroStageVideo.dataset.source !== video) {
                heroStageVideo.src = video;
                heroStageVideo.dataset.source = video;
                heroStageVideo.addEventListener('error', () => {
                    if (activeHeroId !== button.dataset.heroId || !fallbackVideo || heroStageVideo.dataset.source !== video) return;
                    heroStageVideo.src = fallbackVideo;
                    heroStageVideo.dataset.source = fallbackVideo;
                    heroStageVideo.load();
                }, { once: true });
                heroStageVideo.load();
            }
            heroStageVideo.addEventListener('loadeddata', () => {
                if (activeHeroId === button.dataset.heroId) {
                    heroStageVideo.classList.add('is-visible');
                    playHeroVideo(userInitiated);
                }
            }, { once: true });
            if (heroStageVideo.readyState >= 2) {
                heroStageVideo.classList.add('is-visible');
                playHeroVideo(userInitiated);
            }
        };

        heroButtons.forEach((button) => {
            button.addEventListener('mouseenter', () => setHeroProfile(button, true));
            button.addEventListener('focus', () => setHeroProfile(button, true));
            button.addEventListener('click', () => setHeroProfile(button, true));
        });
        setHeroProfile(heroButtons[0]);
    }

    const heroArchive = document.querySelector('[data-hero-archive]');
    if (heroArchive) {
        const selectors = [...heroArchive.querySelectorAll('[data-hero-archive-select]')];
        const chapters = [...heroArchive.querySelectorAll('[data-hero-archive-chapter]')];
        const stage = heroArchive.querySelector('[data-hero-archive-stage]');
        const stageImage = heroArchive.querySelector('[data-hero-archive-image]');
        const stageVideo = heroArchive.querySelector('[data-hero-archive-video]');
        const stageIndex = heroArchive.querySelector('[data-hero-archive-index]');
        const stageName = heroArchive.querySelector('[data-hero-archive-name]');
        const stageRole = heroArchive.querySelector('[data-hero-archive-role]');
        const stageTitle = heroArchive.querySelector('[data-hero-archive-title]');
        const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        let activeHeroId = '';

        const heroData = {
            osa: { name: 'Osa', role: 'THE WARRIOR', title: 'Duty is a blade that cuts both ways.', image: 'images/osa.png', video: 'images/hero-videos/osa.mp4', tint: '#c9f36a' },
            aziza: { name: 'Aziza', role: 'THE SCOUT', title: 'Move like a shadow. Strike like a secret.', image: 'images/aziza.png', video: 'images/hero-videos/aziza.mp4', tint: '#a8bd62' },
            nganga: { name: 'Nganga', role: 'THE SHAMAN', title: 'The living are never far from the spirits.', image: 'images/nganga.png', video: 'images/hero-videos/nganga.mp4', tint: '#7be3b2' },
            kishi: { name: 'Kishi', role: 'THE SHAPESHIFTER', title: 'The beast is not the end of the story.', image: 'images/kishi.png', video: 'images/hero-videos/kishi.mp4', tint: '#db8062' }
        };

        const playArchiveVideo = () => {
            if (!stageVideo || reducedMotion) return;
            stageVideo.muted = true;
            stageVideo.play().catch(() => {});
        };

        const activateArchiveHero = (heroId) => {
            const data = heroData[heroId];
            if (!data || activeHeroId === heroId) return;
            activeHeroId = heroId;
            const order = selectors.findIndex((selector) => selector.dataset.heroArchiveSelect === heroId) + 1;

            heroArchive.style.setProperty('--archive-tint', data.tint);
            stage?.classList.add('is-changing');
            selectors.forEach((selector) => {
                const active = selector.dataset.heroArchiveSelect === heroId;
                selector.classList.toggle('is-active', active);
                selector.setAttribute('aria-pressed', String(active));
            });
            chapters.forEach((chapter) => chapter.classList.toggle('is-active', chapter.dataset.heroArchiveChapter === heroId));

            if (stageImage) {
                stageImage.src = data.image;
                stageImage.alt = `${data.name}, ${data.role.toLowerCase()}`;
            }
            if (stageIndex) stageIndex.textContent = `${String(order).padStart(2, '0')} / 04`;
            if (stageName) stageName.textContent = data.name;
            if (stageRole) stageRole.textContent = data.role;
            if (stageTitle) stageTitle.textContent = data.title;

            if (stageVideo && stageVideo.dataset.source !== data.video) {
                stageVideo.classList.remove('is-visible');
                stageVideo.pause();
                stageVideo.src = data.video;
                stageVideo.dataset.source = data.video;
                stageVideo.load();
                stageVideo.addEventListener('loadeddata', () => {
                    if (activeHeroId === heroId) {
                        stageVideo.classList.add('is-visible');
                        playArchiveVideo();
                    }
                }, { once: true });
            } else {
                stageVideo?.classList.add('is-visible');
                playArchiveVideo();
            }

            window.setTimeout(() => stage?.classList.remove('is-changing'), 260);
        };

        selectors.forEach((selector, index) => {
            const heroId = selector.dataset.heroArchiveSelect;
            selector.addEventListener('pointerenter', () => activateArchiveHero(heroId));
            selector.addEventListener('focus', () => activateArchiveHero(heroId));
            selector.addEventListener('click', () => {
                activateArchiveHero(heroId);
                chapters[index]?.scrollIntoView({ behavior: reducedMotion ? 'auto' : 'smooth', block: 'center' });
            });
            selector.addEventListener('keydown', (event) => {
                if (event.key !== 'ArrowDown' && event.key !== 'ArrowUp') return;
                event.preventDefault();
                const nextIndex = event.key === 'ArrowDown' ? (index + 1) % selectors.length : (index - 1 + selectors.length) % selectors.length;
                selectors[nextIndex].focus();
                activateArchiveHero(selectors[nextIndex].dataset.heroArchiveSelect);
            });
        });

        const archiveObserver = new IntersectionObserver((entries) => {
            const visible = entries.filter((entry) => entry.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
            if (visible) activateArchiveHero(visible.target.dataset.heroArchiveChapter);
        }, { threshold: [0.35, 0.6], rootMargin: '-18% 0px -24% 0px' });

        chapters.forEach((chapter) => archiveObserver.observe(chapter));
        activateArchiveHero('osa');
    }

    const journey = document.querySelector('.scroll-journey');
    const journeyVideos = [...document.querySelectorAll('[data-journey-video]')];
    const journeySteps = [...document.querySelectorAll('[data-journey-step]')];
    const journeyProgress = document.querySelector('.journey-progress span');
    const journeyCounter = document.querySelector('.journey-counter strong');
    let activeJourneyStep = -1;

    const playJourneyVideo = (video) => {
        if (!video) return;
        video.muted = true;
        video.play().catch(() => {});
    };

    const setJourneyStep = (index) => {
        activeJourneyStep = index;
        journeyVideos.forEach((video, videoIndex) => {
            const active = videoIndex === index;
            video.classList.toggle('is-active', active);
            if (active) playJourneyVideo(video);
            else video.pause();
            if (window.gsap) {
                window.gsap.to(video, { opacity: active ? .82 : 0, duration: .7, ease: 'power2.out' });
            } else {
                video.style.opacity = active ? '.82' : '0';
            }
        });
        journeySteps.forEach((step, stepIndex) => step.classList.toggle('is-active', stepIndex === index));
        if (journeyCounter) journeyCounter.textContent = String(index + 1).padStart(2, '0');
    };

    const updateJourneyFromProgress = (rawProgress, animate = false) => {
        if (!journeyVideos.length || !journeySteps.length) return;
        const progress = Math.min(.9999, Math.max(0, rawProgress));
        const stepPosition = progress * journeySteps.length;
        const nextStep = Math.min(journeySteps.length - 1, Math.floor(stepPosition));
        const localProgress = stepPosition - nextStep;
        if (nextStep !== activeJourneyStep) setJourneyStep(nextStep);
        const activeVideo = journeyVideos[nextStep];
        const scale = 1.08 - localProgress * .08;
        const xPercent = (localProgress - .5) * 2.5;
        if (animate && window.gsap) {
            window.gsap.to(activeVideo, { scale, xPercent, duration: .25, overwrite: true });
            if (journeyProgress) window.gsap.set(journeyProgress, { scaleX: Math.max(.02, progress) });
        } else {
            activeVideo.style.transform = `translate3d(${xPercent}%, 0, 0) scale(${scale})`;
            if (journeyProgress) journeyProgress.style.transform = `scaleX(${Math.max(.02, progress)})`;
        }
    };

    const updateNativeJourney = () => {
        if (!journey || !journeyVideos.length || !journeySteps.length) return;
        const start = journey.offsetTop;
        const end = start + journey.offsetHeight - window.innerHeight;
        const progress = (window.scrollY - start) / Math.max(1, end - start);
        updateJourneyFromProgress(progress, false);
    };

    if (journey && journeyVideos.length && journeySteps.length) {
        setJourneyStep(0);
        window.addEventListener('scroll', () => playJourneyVideo(journeyVideos[activeJourneyStep] || journeyVideos[0]), { passive: true });
    }

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

        if (journey && journeyVideos.length && journeySteps.length) {
            window.ScrollTrigger.create({
                trigger: journey,
                start: 'top top',
                end: 'bottom bottom',
                scrub: true,
                onUpdate: (trigger) => {
                    updateJourneyFromProgress(trigger.progress, true);
                }
            });
        }
    } else if (journey && journeyVideos.length && journeySteps.length) {
        updateNativeJourney();
        window.addEventListener('resize', updateNativeJourney);
        window.addEventListener('scroll', updateNativeJourney, { passive: true });
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
