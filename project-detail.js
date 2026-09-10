const projects = {
  buildsmart: {
    number: '01', type: 'Web application', title: 'Build<br /><em>Smart</em>', image: 'assets/projects/buildsmart.png', accent: '#c7ea4e',
    summary: 'A construction company web application for presenting services, organizing internal information, and supporting smoother project coordination.',
    challenge: 'A single digital space for work progress, resources, and project information.',
    description: 'Build Smart helps construction teams monitor work progress, track resources, and keep project-related information accessible. It combines a company profile experience with practical management views for better communication, planning, and visibility.',
    tech: ['Construction services', 'Workflow views', 'Resource tracking', 'Team information'],
    stats: [['Category', 'Web application'], ['Industry', 'Construction'], ['Project date', 'October 2025']], github: 'https://github.com/ChamiduPrabodya/build-smart', next: 'kottu-special',
  },
  'kottu-special': {
    number: '02', type: 'Full-stack web application', title: 'RESTA<br /><em>FOOD</em>', image: 'assets/projects/resta.png', accent: '#f2b633',
    summary: 'A restaurant and hotel management system with a smooth digital ordering experience for customers.',
    challenge: 'Bring customer ordering, reservations, payments, and daily restaurant operations into one system.',
    description: 'RESTA-FOOD lets customers browse menu items, place dine-in or delivery orders, reserve VIP rooms, manage accounts, and submit feedback. Its admin dashboard centralizes menu control, bookings, customer records, promotions, and order handling.',
    tech: ['React', 'Vite', 'Material UI', 'Node.js', 'Express.js', 'MongoDB'],
    stats: [['Category', 'Full-stack web app'], ['Type', 'Restaurant & hotel'], ['Features', 'Orders & reservations']], github: 'https://github.com/ChamiduPrabodya/RESTA-FOOD', demo: 'https://resta-food-ci45.vercel.app/', next: 'ceylon-imports',
  },
  'ceylon-imports': {
    number: '03', type: 'Frontend web project', title: 'Ceymos<br /><em>Lanka</em>', image: 'assets/projects/ceymos-lanka.png', accent: '#8fc36a',
    summary: 'A custom storefront that presents a small business’s products in a simple, friendly way.',
    challenge: 'Make products easy to browse while keeping the client’s requested features and images front and center.',
    description: 'Ceymos Lanka is a lightweight frontend website for browsing rice, spices, coconut products, and other store goods by category. It was built as a custom client and friend project with clean presentation and easy navigation.',
    tech: ['Custom frontend', 'Product categories', 'Image presentation', 'Easy navigation'],
    stats: [['Category', 'Frontend web project'], ['Type', 'Product listing website'], ['Project date', 'March 2025']], github: 'https://github.com/ChamiduPrabodya/-Ceymos-Lanka', next: 'plant-disease',
  },
  'plant-disease': {
    number: '04', type: 'AI project', title: 'Plant Disease<br /><em>Detection</em>', image: 'assets/projects/plant-disease-dashboard.png', accent: '#65d892',
    summary: 'An AI-assisted workflow for detecting plant diseases early and supporting better agricultural decisions.',
    challenge: 'Make image-based plant health checks simple enough to support action before damage spreads.',
    description: 'Plant Disease Detection uses AI-assisted image analysis and simple monitoring to help users identify crop issues earlier. The project brings together software, agriculture, and intelligent systems to solve a practical real-world problem.',
    tech: ['AI-assisted analysis', 'Image-based detection', 'Plant monitoring', 'Smart agriculture'],
    stats: [['Category', 'AI project'], ['Domain', 'Smart agriculture'], ['Project date', 'March 2025']], github: 'https://github.com/ChamiduPrabodya/Plant-Disease-Detection', next: 'auto-rover',
  },
  'auto-rover': {
    number: '05', type: 'IoT rover project', title: 'Auto<br /><em>Rover</em>', image: 'assets/projects/auto-rover.jpg', accent: '#91c9ef',
    summary: 'An automated healthcare trolley concept for guided medication delivery and timed dispensing.',
    challenge: 'Combine path following, obstacle sensing, scheduling, and monitoring into a patient-focused delivery concept.',
    description: 'Auto Rover uses an Arduino controller, line-following behaviour, ultrasonic obstacle sensing, and Bluetooth connectivity to travel predefined paths while responding to its surroundings. A connected mobile experience supports scheduling and monitoring.',
    tech: ['Arduino', 'Line following', 'Ultrasonic sensors', 'Bluetooth'],
    stats: [['Category', 'IoT rover project'], ['Use case', 'Smart healthcare delivery'], ['Project date', 'June 2024']], github: 'https://github.com/ChamiduPrabodya/heath-care-trolly', next: 'hospital-management',
  },
  'hospital-management': {
    number: '06', type: 'Healthcare mobile application', title: 'Hospital Management<br /><em>Mobile App</em>', image: 'assets/projects/hospital-management-mobile.png', accent: '#8eb8ff',
    summary: 'A React Native hospital management app for appointments, healthcare operations, and mobile administration.',
    challenge: 'Keep patient-facing tasks and operational tools available through one connected mobile experience.',
    description: 'The Hospital Management Mobile App includes user authentication, doctor browsing, appointment booking, payments, complaints, reports, and an admin dashboard. It connects to a backend API to support hospital services, appointment coordination, and operational monitoring.',
    tech: ['React Native', 'Expo', 'React Navigation', 'Axios', 'AsyncStorage'],
    stats: [['Platform', 'Android & iOS'], ['Category', 'Healthcare mobile app'], ['Core feature', 'Appointment booking']], github: 'https://github.com/ChamiduPrabodya/Hospital-Management-Mobile-App', next: 'buildsmart',
  },
};
const projectKey = document.body.dataset.project;
const project = projects[projectKey];
if (project) {
  const plainTitle = (value) => value.replace(/<br\s*\/?\s*>/gi, ' ').replace(/<[^>]+>/g, '');
  document.documentElement.style.setProperty('--accent', project.accent);
  document.title = `${plainTitle(project.title)} | Chamidu Prabodya`;
  document.querySelector('[data-type]').textContent = `${project.number} / ${project.type}`;
  const [titleLine, titleAccent] = project.title.split('<br />');
  document.querySelector('[data-title]').innerHTML = `<span>${titleLine}</span><br />${titleAccent}`;
  document.querySelector('[data-summary]').textContent = project.summary;
  document.querySelector('[data-image]').src = project.image;
  document.querySelector('[data-image]').alt = `${plainTitle(project.title)} preview`;
  document.querySelector('[data-index]').textContent = `${project.number} / 06`;
  document.querySelector('[data-challenge]').textContent = project.challenge;
  document.querySelector('[data-description]').textContent = project.description;
  document.querySelector('[data-tech]').innerHTML = project.tech.map((item) => `<li>${item}</li>`).join('');
  document.querySelector('[data-stats]').innerHTML = project.stats.map(([label, value]) => `<article class="project-stat"><span>${label}</span><strong>${value}</strong></article>`).join('');
  const projectLinks = document.querySelector('.project-links');
  const githubLink = document.createElement('a');
  githubLink.href = project.github;
  githubLink.target = '_blank';
  githubLink.rel = 'noreferrer';
  githubLink.textContent = 'View source ↗';
  projectLinks.prepend(githubLink);
  if (project.demo) {
    const demoLink = document.createElement('a');
    demoLink.href = project.demo;
    demoLink.target = '_blank';
    demoLink.rel = 'noreferrer';
    demoLink.textContent = 'Live demo ↗';
    projectLinks.append(demoLink);
  }
  const next = projects[project.next];
  const nextLink = document.querySelector('[data-next]');
  nextLink.href = `project-${project.next}.html`;
  nextLink.innerHTML = `<span>Next project</span><em>${plainTitle(next.title)}</em><span>↗</span>`;
}
if (window.gsap && window.ScrollTrigger) {
  gsap.registerPlugin(ScrollTrigger);
  gsap.timeline().from('.project-nav', { autoAlpha: 0, duration: .45, y: -16 }).from('.project-label', { autoAlpha: 0, duration: .35, y: 12 }, '-=.15').from('.project-title > *', { duration: .85, ease: 'power4.out', stagger: .12, yPercent: 115 }, '-=.08').from('.project-summary, .project-links', { autoAlpha: 0, duration: .5, stagger: .1, y: 20 }, '-=.35').from('.project-visual img', { duration: 1.1, ease: 'power3.out', scale: 1.12 }, '-=.85');
  gsap.utils.toArray('.project-overview, .project-stats, .project-build-inner, .project-next').forEach((element) => gsap.from(element, { autoAlpha: 0, duration: .8, ease: 'power3.out', y: 45, scrollTrigger: { trigger: element, start: 'top 82%', once: true } }));
  gsap.to('.project-visual img', { ease: 'none', yPercent: 12, scrollTrigger: { trigger: '.project-hero', start: 'top top', end: 'bottom top', scrub: true } });
}
