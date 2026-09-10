const canvas = document.querySelector('#hero-canvas');
const context = canvas.getContext('2d');
const body = document.body;
const navigationLinks = [...document.querySelectorAll('nav a')];
const navigableSections = [...document.querySelectorAll('main section[id]')];
const frameCount = 120;
const initialFrameCount = 24;
const scrollSteps = 5;
const frames = new Array(frameCount);
const blockingOptions = { passive: false };
let currentFrame = 0;
let targetFrame = 0;
let nextFrameToLoad = 0;
let completedSteps = 0;
let queuedSteps = 0;
let isAdvancing = false;
let wheelGestureActive = false;
let wheelGestureTimer;
let touchStartY = 0;
let touchStepTriggered = false;
let isHeroReleased = false;

function getBestAvailableFrame(frameNumber) {
  const preferredIndex = Math.round(frameNumber);
  if (frames[preferredIndex]?.complete) return frames[preferredIndex];

  for (let offset = 1; offset < frameCount; offset += 1) {
    const previous = frames[preferredIndex - offset];
    const next = frames[preferredIndex + offset];
    if (previous?.complete) return previous;
    if (next?.complete) return next;
  }
}

function drawFrame(frameNumber) {
  const image = getBestAvailableFrame(frameNumber);
  if (!image) return;

  const scale = Math.max(canvas.width / image.width, canvas.height / image.height);
  const width = image.width * scale;
  const height = image.height * scale;
  context.clearRect(0, 0, canvas.width, canvas.height);
  context.drawImage(image, (canvas.width - width) / 2, (canvas.height - height) / 2, width, height);
}

function resizeCanvas() {
  const pixelRatio = Math.min(window.devicePixelRatio || 1, 1.5);
  canvas.width = window.innerWidth * pixelRatio;
  canvas.height = window.innerHeight * pixelRatio;
  drawFrame(currentFrame);
}

function loadFrame(index) {
  if (index >= frameCount || frames[index]) return;

  const image = new Image();
  image.decoding = 'async';
  image.addEventListener('load', () => drawFrame(currentFrame), { once: true });
  image.src = `assets/frames-optimized/frame-${String(index + 1).padStart(3, '0')}.webp`;
  frames[index] = image;
}

function queueBackgroundFrame() {
  if (isHeroReleased || nextFrameToLoad >= frameCount) return;
  loadFrame(nextFrameToLoad);
  nextFrameToLoad += 1;

  if ('requestIdleCallback' in window) {
    window.requestIdleCallback(queueBackgroundFrame, { timeout: 500 });
  } else {
    window.setTimeout(queueBackgroundFrame, 80);
  }
}

function animateFrames() {
  const difference = targetFrame - currentFrame;

  if (Math.abs(difference) > 0.1) {
    currentFrame += difference * 0.12;
    drawFrame(currentFrame);
    window.requestAnimationFrame(animateFrames);
    return;
  }

  currentFrame = targetFrame;
  drawFrame(currentFrame);
  isAdvancing = false;

  if (completedSteps === scrollSteps) unlockPortfolio();
  else playNextStep();
}

function playNextStep() {
  if (isAdvancing || !queuedSteps) return;

  isAdvancing = true;
  queuedSteps -= 1;
  completedSteps += 1;
  targetFrame = Math.round(((frameCount - 1) * completedSteps) / scrollSteps);
  window.requestAnimationFrame(animateFrames);
}

function queueShowreelStep() {
  if (completedSteps + queuedSteps >= scrollSteps) return;
  queuedSteps += 1;
  playNextStep();
}

function holdPageUntilVideoEnds(event) {
  if (event.deltaY > 0 && !wheelGestureActive) {
    wheelGestureActive = true;
    queueShowreelStep();
  }

  window.clearTimeout(wheelGestureTimer);
  wheelGestureTimer = window.setTimeout(() => {
    wheelGestureActive = false;
  }, 180);
  event.preventDefault();
}

function handleTouchStart(event) {
  touchStartY = event.touches[0].clientY;
  touchStepTriggered = false;
}

function holdTouchScroll(event) {
  const movingUp = touchStartY > event.touches[0].clientY;
  if (movingUp && !touchStepTriggered) {
    touchStepTriggered = true;
    queueShowreelStep();
  }
  event.preventDefault();
}

function holdKeyboardScroll(event) {
  if (['ArrowDown', 'PageDown', ' '].includes(event.key)) queueShowreelStep();
  event.preventDefault();
}

function unlockPortfolio() {
  isHeroReleased = true;
  body.classList.remove('video-gate');
  window.removeEventListener('wheel', holdPageUntilVideoEnds, blockingOptions);
  window.removeEventListener('touchstart', handleTouchStart);
  window.removeEventListener('touchmove', holdTouchScroll, blockingOptions);
  window.removeEventListener('keydown', holdKeyboardScroll);

  // Keep only the final image for resize redraws and release every other decoded frame.
  const finalImage = getBestAvailableFrame(frameCount - 1);
  frames.length = 0;
  frames[frameCount - 1] = finalImage;
  window.requestAnimationFrame(() => {
    document.querySelector('#about').scrollIntoView({ behavior: 'smooth' });
  });
}

function setActiveNavigation(sectionId) {
  navigationLinks.forEach((link) => {
    const isActive = link.getAttribute('href') === `#${sectionId}`;
    link.classList.toggle('is-active', isActive);

    if (isActive) link.setAttribute('aria-current', 'page');
    else link.removeAttribute('aria-current');
  });
}

const sectionObserver = new IntersectionObserver((entries) => {
  const visibleSection = entries
    .filter((entry) => entry.isIntersecting)
    .sort((firstEntry, secondEntry) => secondEntry.intersectionRatio - firstEntry.intersectionRatio)[0];

  if (visibleSection) setActiveNavigation(visibleSection.target.id);
}, { rootMargin: '-20% 0px -55%', threshold: [0, 0.1, 0.5] });

navigableSections.forEach((section) => sectionObserver.observe(section));

function initializeSkillsScroll() {
  if (!window.gsap || !window.ScrollTrigger) return;

  const section = document.querySelector('.skills');
  const wrapper = document.querySelector('.cards-wrapper');
  const track = document.querySelector('.cards-track');
  const cards = [...document.querySelectorAll('.skill-card')];
  const counter = document.querySelector('.skills-counter');
  const progressDot = document.querySelector('.skills-progress-line i');

  if (!section || !wrapper || !track || !cards.length || !counter || !progressDot) return;

  gsap.registerPlugin(ScrollTrigger);

  const updateActiveCard = (progress) => {
    const activeIndex = Math.min(cards.length - 1, Math.floor(progress * cards.length));
    cards.forEach((card, index) => card.classList.toggle('is-active', index === activeIndex));
    counter.textContent = `${String(activeIndex + 1).padStart(2, '0')} / ${String(cards.length).padStart(2, '0')}`;
    const travelDistance = progressDot.parentElement.clientHeight - progressDot.clientHeight;
    gsap.set(progressDot, { xPercent: -50, y: progress * travelDistance });
  };

  const getScrollDistance = () => Math.max(0, track.scrollWidth - wrapper.clientWidth);

  const media = gsap.matchMedia();

  media.add('(min-width: 768px)', () => {
    wrapper.style.width = '82%';

    const entrance = gsap.timeline({
      scrollTrigger: { trigger: section, start: 'top 75%', once: true },
    });

    entrance
      .from('.skills-header .section-label, .skills-intro', { autoAlpha: 0, duration: .45, ease: 'power2.out' })
      .from('.skills-header h2', { autoAlpha: 0, duration: .65, ease: 'power2.out', y: 30 }, '-=.25')
      .from(cards, { autoAlpha: 0, duration: .55, ease: 'power2.out', stagger: .12, y: 45 }, '-=.2');

    const horizontalScroll = gsap.to(track, {
      x: () => -getScrollDistance(),
      ease: 'none',
      scrollTrigger: {
        trigger: section,
        start: 'top top',
        end: () => `+=${Math.max(getScrollDistance(), window.innerHeight * 1.4)}`,
        pin: true,
        scrub: 1,
        invalidateOnRefresh: true,
        onUpdate: (trigger) => updateActiveCard(trigger.progress),
      },
    });

    return () => {
      entrance.kill();
      horizontalScroll.kill();
      wrapper.style.width = '';
    };
  });

  media.add('(max-width: 767px)', () => {
    gsap.set(progressDot, { xPercent: -50, y: 0 });
    counter.textContent = '01 / 04';
    cards.forEach((card) => card.classList.remove('is-active'));
    cards[0].classList.add('is-active');

    return gsap.from(cards, {
      autoAlpha: 0,
      duration: .5,
      ease: 'power2.out',
      stagger: .1,
      y: 30,
      scrollTrigger: { trigger: wrapper, start: 'top 80%' },
    });
  });
}

initializeSkillsScroll();

function initializeWorkScroll() {
  if (!window.gsap || !window.ScrollTrigger) return;
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  const section = document.querySelector('.work');
  const header = document.querySelector('.work-header');
  const items = [...document.querySelectorAll('.work-stack-item:not([hidden])')];
  const cards = [...document.querySelectorAll('.work-stack-item:not([hidden]) .work-card')];
  const counter = document.querySelector('.work-counter');
  const progress = document.querySelector('.work-progress');
  const progressFill = document.querySelector('.work-progress b');
  const railItems = [...document.querySelectorAll('.work-rail span')];

  if (!section || !header || !items.length || !counter || !progress || !progressFill) return;

  const setActiveProject = (index) => {
    cards.forEach((card, cardIndex) => card.classList.toggle('is-active', cardIndex === index));
    railItems.forEach((railItem, railIndex) => railItem.classList.toggle('is-active', railIndex === index));
    counter.textContent = `${String(index + 1).padStart(2, '0')} / ${String(items.length).padStart(2, '0')}`;
  };

  setActiveProject(0);

  const media = gsap.matchMedia();

  media.add('(min-width: 768px)', () => {
    const entrance = gsap.from([header.querySelector('.section-label'), header.querySelector('h2'), header.querySelector('p:last-child')], {
      duration: .7,
      ease: 'power2.out',
      opacity: 0,
      stagger: .12,
      y: 40,
      scrollTrigger: { trigger: section, start: 'top 72%', once: true },
    });
    const stack = document.querySelector('.work-stack');
    const setShowcaseState = (progressValue) => {
      const sequencePosition = Math.min(cards.length - 1, progressValue * cards.length);
      const activeIndex = Math.min(cards.length - 1, Math.floor(sequencePosition));
      const transitionProgress = sequencePosition - activeIndex;

      cards.forEach((card, index) => {
        const image = card.querySelector('.work-media img');

        if (index === activeIndex) {
          gsap.set(card, {
            autoAlpha: 1,
            filter: `brightness(${1 - transitionProgress * .38}) blur(${transitionProgress}px)`,
            opacity: 1 - transitionProgress * .55,
            scale: 1 - transitionProgress * .06,
            xPercent: -20 * transitionProgress,
            zIndex: 2,
          });
          gsap.set(image, { opacity: 1 - transitionProgress * .15, scale: 1.05 - transitionProgress * .05, yPercent: 5 - transitionProgress * 5 });
        } else if (index === activeIndex + 1) {
          gsap.set(card, {
            autoAlpha: 1,
            filter: `brightness(${.62 + transitionProgress * .38}) blur(${(1 - transitionProgress)}px)`,
            opacity: .5 + transitionProgress * .5,
            scale: .94 + transitionProgress * .06,
            xPercent: 35 * (1 - transitionProgress),
            zIndex: 1,
          });
          gsap.set(image, { opacity: .85 + transitionProgress * .15, scale: 1.05 - transitionProgress * .05, yPercent: 5 - transitionProgress * 5 });
        } else {
          gsap.set(card, { autoAlpha: 0, xPercent: 45, zIndex: 0 });
        }
      });

      setActiveProject(activeIndex);
    };

    setShowcaseState(0);

    const showcase = ScrollTrigger.create({
      trigger: stack,
      start: 'top 12%',
      end: `+=${window.innerHeight * items.length * 1.2}`,
      pin: true,
      scrub: 1,
      invalidateOnRefresh: true,
      onEnter: (trigger) => {
        progress.classList.add('is-visible');
        setShowcaseState(trigger.progress);
      },
      onEnterBack: (trigger) => {
        progress.classList.add('is-visible');
        setShowcaseState(trigger.progress);
      },
      onLeave: () => progress.classList.remove('is-visible'),
      onLeaveBack: () => {
        progress.classList.remove('is-visible');
        setShowcaseState(0);
      },
      onRefresh: (trigger) => {
        gsap.set(progressFill, { scaleX: trigger.progress });
        setShowcaseState(trigger.progress);
      },
      onUpdate: (trigger) => {
        gsap.set(progressFill, { scaleX: trigger.progress });
        setShowcaseState(trigger.progress);
      },
    });

    return () => {
      entrance.kill();
      showcase.kill();
    };
  });

  media.add('(max-width: 767px)', () => gsap.from(cards, {
    duration: .55,
    ease: 'power2.out',
    opacity: 0,
    stagger: .1,
    y: 40,
    scrollTrigger: { trigger: section, start: 'top 80%' },
  }));
}

initializeWorkScroll();

function initializeContactAnimation() {
  if (!window.gsap || !window.ScrollTrigger) return;

  const section = document.querySelector('.contact');
  const footer = document.querySelector('.site-footer');
  const label = section?.querySelector('.contact-label');
  const lines = section ? [...section.querySelectorAll('.contact-line > span')] : [];
  const details = section?.querySelector('.contact-details');
  const email = section?.querySelector('.contact-email');
  const location = section?.querySelector('.contact-details > p:not(.contact-response)');
  const socialLinks = section ? [...section.querySelectorAll('.contact-socials a')] : [];
  const action = section?.querySelector('.contact-action');
  const serifLine = section?.querySelector('.contact-line--serif');
  const ghost = section?.querySelector('.contact-ghost');
  const response = section?.querySelector('.contact-response');

  if (!section || !label || !lines.length || !details || !action) return;

  if (location) {
    location.innerHTML = 'Horana, Sri Lanka <b>&middot;</b> <a class="contact-phone contact-interactive" href="tel:+94762124477">+94 762 12 4477 <span aria-hidden="true">&#8599;</span></a>';
  }

  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (!reducedMotion) {
    gsap.fromTo(section, { clipPath: 'inset(100% 0 0 0)' }, {
      clipPath: 'inset(0% 0 0 0)',
      ease: 'none',
      scrollTrigger: { trigger: section, start: 'top bottom', end: 'top 24%', scrub: .75 },
    });

    const entrance = gsap.timeline({ scrollTrigger: { trigger: section, start: 'top 58%', once: true } });
    entrance
      .from(label, { autoAlpha: 0, duration: .42, ease: 'power2.out', y: 15 })
      .from(lines[0], { duration: .9, ease: 'power4.out', yPercent: 110 }, '-=.08')
      .from(lines[1], { duration: 1.08, ease: 'power4.out', yPercent: 110 }, '-=.62')
      .from(email, { autoAlpha: 0, duration: .5, ease: 'power2.out', y: 20 }, '-=.24')
      .fromTo(email, { '--line-scale': 0 }, { '--line-scale': 1, duration: .65, ease: 'power3.out' }, '-=.2')
      .from(location, { autoAlpha: 0, duration: .4, ease: 'power2.out', y: 12 }, '-=.28')
      .from(socialLinks, { autoAlpha: 0, duration: .38, ease: 'power2.out', stagger: .09, y: 15 }, '-=.2')
      .from(response, { autoAlpha: 0, duration: .35, ease: 'power2.out', y: 10 }, '-=.15')
      .from(action, { autoAlpha: 0, duration: .72, ease: 'back.out(1.25)', rotate: -5, scale: .82 }, '-=.55');

    gsap.to(serifLine, { yPercent: -8, ease: 'none', scrollTrigger: { trigger: section, start: 'top bottom', end: 'bottom top', scrub: true } });
    gsap.to(ghost, { xPercent: -5, yPercent: -7, ease: 'none', scrollTrigger: { trigger: section, start: 'top bottom', end: 'bottom top', scrub: true } });
    if (footer) gsap.from(footer, { autoAlpha: 0, duration: .65, ease: 'power3.out', yPercent: 100, scrollTrigger: { trigger: footer, start: 'top 94%', once: true } });
  }

  if (reducedMotion) return;

  const media = gsap.matchMedia();
  media.add('(min-width: 768px)', () => {
    const cta = section.querySelector('.contact-cta');
    const cursor = section.querySelector('.contact-cursor');
    const interactive = [...section.querySelectorAll('.contact-interactive')];
    const moveCursor = (event) => {
      gsap.to(cursor, { duration: .16, ease: 'power2.out', x: event.clientX, y: event.clientY });
    };
    const showCursor = () => cursor.classList.add('is-visible');
    const hideCursor = () => cursor.classList.remove('is-visible');
    const moveCta = (event) => {
      const bounds = cta.getBoundingClientRect();
      gsap.to(cta, { duration: .34, ease: 'power3.out', x: (event.clientX - (bounds.left + bounds.width / 2)) * .08, y: (event.clientY - (bounds.top + bounds.height / 2)) * .08 });
    };
    const activateCta = () => gsap.to(cta, { duration: .32, ease: 'power3.out', scale: 1.08 });
    const resetCta = () => gsap.to(cta, { duration: .48, ease: 'elastic.out(1, .5)', scale: 1, x: 0, y: 0 });
    interactive.forEach((element) => {
      element.addEventListener('pointerenter', showCursor);
      element.addEventListener('pointermove', moveCursor);
      element.addEventListener('pointerleave', hideCursor);
    });
    cta.addEventListener('pointerenter', activateCta);
    cta.addEventListener('pointermove', moveCta);
    cta.addEventListener('pointerleave', resetCta);
    return () => {
      interactive.forEach((element) => {
        element.removeEventListener('pointerenter', showCursor);
        element.removeEventListener('pointermove', moveCursor);
        element.removeEventListener('pointerleave', hideCursor);
      });
      cta.removeEventListener('pointerenter', activateCta);
      cta.removeEventListener('pointermove', moveCta);
      cta.removeEventListener('pointerleave', resetCta);
    };
  });
}

initializeContactAnimation();

for (let index = 0; index < initialFrameCount; index += 1) loadFrame(index);
nextFrameToLoad = initialFrameCount;
queueBackgroundFrame();
resizeCanvas();

window.addEventListener('wheel', holdPageUntilVideoEnds, blockingOptions);
window.addEventListener('touchstart', handleTouchStart, { passive: true });
window.addEventListener('touchmove', holdTouchScroll, blockingOptions);
window.addEventListener('keydown', holdKeyboardScroll);
window.addEventListener('resize', resizeCanvas);
