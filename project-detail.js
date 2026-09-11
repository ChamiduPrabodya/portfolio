const projects = {
  buildsmart: {
    number: '01', type: 'Web application', title: 'Build<br /><em>Smart</em>', image: 'assets/projects/buildsmart.png', accent: '#c7ea4e',
    summary: 'A construction company web application for presenting services, organizing internal information, and supporting smoother project coordination.',
    challenge: 'Turn a university-defined construction management scenario into a usable application. The team needed to organize project progress, materials, and employee information while coordinating requirements, task ownership, and delivery milestones.',
    description: 'Build Smart is an academic team project based on a simulated construction company scenario. It brings project tracking, material management, employee information, and workflow monitoring together with a company profile website.',
    tech: ['Construction services', 'Workflow views', 'Resource tracking', 'Team information'],
    stats: [['Category', 'Web application'], ['Industry', 'Construction'], ['Project date', 'October 2025']], github: 'https://github.com/ChamiduPrabodya/build-smart', next: 'kottu-special',
    role: 'Team leader · Academic project',
    contribution: 'I led project planning, requirements gathering, and task allocation, and oversaw the design and development stages. I coordinated lecturer feedback, tracked milestones, and maintained project documentation.',
    features: [
      ['Project tracking', 'Keep work progress and project information accessible to the construction team.'],
      ['Materials & resources', 'Organize material and resource information alongside ongoing work.'],
      ['Team workflows', 'Bring employee information and workflow monitoring into the same application.'],
    ],
    outcome: 'The team developed a construction management web application for a university-defined industry scenario. The project gave me practical experience in requirements gathering, team leadership, and coordinating software delivery.',
    gallery: [['assets/projects/buildsmart.png', 'Build Smart web application preview']],
  },
  'kottu-special': {
    number: '02', type: 'Full-stack web application', title: 'RESTA<br /><em>FOOD</em>', image: 'assets/projects/resta.png', accent: '#f2b633',
    summary: 'A restaurant and hotel management system with a smooth digital ordering experience for customers.',
    challenge: 'Support two different workflows in one system: customers need a straightforward way to browse and order food, while restaurant staff need tools to manage menus, incoming orders, and reservations.',
    description: 'RESTA-FOOD lets customers browse menu items, place dine-in or delivery orders, reserve VIP rooms, manage accounts, and submit feedback. Its admin dashboard centralizes menu control, bookings, customer records, promotions, and order handling.',
    tech: ['React', 'Vite', 'Material UI', 'Node.js', 'Express.js', 'MongoDB'],
    stats: [['Category', 'Full-stack web app'], ['Type', 'Restaurant & hotel'], ['Features', 'Orders & reservations']], github: 'https://github.com/ChamiduPrabodya/RESTA-FOOD', demo: 'https://resta-food-ci45.vercel.app/', next: 'ceylon-imports',
    role: 'Team leader · Academic project',
    contribution: 'I coordinated development activities, supported team members, and kept work aligned with planned milestones. I also contributed to the customer interface for browsing food and interacting with the ordering system.',
    features: [
      ['Ordering experience', 'Browse menu items and place dine-in or delivery orders through the customer interface.'],
      ['Reservations & accounts', 'Manage customer accounts, reserve VIP rooms, and submit feedback.'],
      ['Restaurant administration', 'Manage menus, orders, bookings, customer records, and promotions from an admin dashboard.'],
    ],
    outcome: 'The team built a responsive food ordering application. My work strengthened my experience in UI design, web development, and coordinating a team around delivery milestones.',
    gallery: [['assets/projects/resta.png', 'RESTA-FOOD web application preview']],
  },
  'ceylon-imports': {
    number: '03', type: 'Frontend web project', title: 'Ceymos<br /><em>Lanka</em>', image: 'assets/projects/ceymos-lanka.png', accent: '#8fc36a',
    summary: 'A custom storefront that presents a small business’s products in a simple, friendly way.',
    challenge: 'Present a varied product range without making the storefront difficult to navigate. The website needed to organize the client’s images and requested content into clear product categories.',
    description: 'Ceymos Lanka is a lightweight frontend website for browsing rice, spices, coconut products, and other store goods by category. It was built as a custom client and friend project with clean presentation and easy navigation.',
    tech: ['Custom frontend', 'Product categories', 'Image presentation', 'Easy navigation'],
    stats: [['Category', 'Frontend web project'], ['Type', 'Product listing website'], ['Project date', 'March 2025']], github: 'https://github.com/ChamiduPrabodya/-Ceymos-Lanka', next: 'plant-disease',
    features: [
      ['Category browsing', 'Explore rice, spices, coconut products, and other store goods by category.'],
      ['Product presentation', 'Use product imagery to make the business’s range easy to scan.'],
      ['Simple navigation', 'Keep the storefront focused on browsing the catalog and finding relevant products.'],
    ],
    outcome: 'A custom product listing website for a small business, built around the client’s requested content and images. The delivered scope focuses on catalog presentation and navigation.',
    gallery: [['assets/projects/ceymos-lanka.png', 'Ceymos Lanka storefront preview']],
  },
  'plant-disease': {
    number: '04', type: 'AI project', title: 'Plant Disease<br /><em>Detection</em>', image: 'assets/projects/plant-disease-dashboard.png', accent: '#65d892',
    summary: 'An AI-assisted workflow for detecting plant diseases early and supporting better agricultural decisions.',
    challenge: 'Make an image analysis workflow usable through a simple interface. A visitor needs to upload a leaf image, run the prediction, and find the result without interacting with the underlying notebook.',
    description: 'Plant Disease Detection uses AI-assisted image analysis and simple monitoring to help users identify crop issues earlier. The project brings together software, agriculture, and intelligent systems to solve a practical real-world problem.',
    tech: ['AI-assisted analysis', 'Image-based detection', 'Plant monitoring', 'Smart agriculture'],
    stats: [['Category', 'AI project'], ['Domain', 'Smart agriculture'], ['Project date', 'March 2025']], github: 'https://github.com/ChamiduPrabodya/Plant-Disease-Detection', next: 'auto-rover',
    features: [
      ['Leaf image input', 'Upload a leaf photograph through a simple image input interface.'],
      ['Image analysis', 'Submit the image to the detection workflow for a plant health prediction.'],
      ['Result display', 'Present the prediction beside the input image so the workflow is easy to follow.'],
    ],
    outcome: 'An image-based plant disease detection prototype with an upload-and-result interface. The project demonstrates a practical connection between image analysis and a user-facing application.',
    gallery: [['assets/projects/plant.jpg', 'Plant Disease Detector prototype running locally with a leaf image upload and output panel']],
  },
  'auto-rover': {
    number: '05', type: 'IoT rover project', title: 'Auto<br /><em>Rover</em>', image: 'assets/projects/auto-rover.jpg', accent: '#91c9ef',
    summary: 'An automated healthcare trolley concept for guided medication delivery and timed dispensing.',
    challenge: 'Coordinate physical movement and mobile controls in one academic prototype. The trolley needed to follow a predefined path, sense obstacles, and connect to a mobile application for scheduled delivery and monitoring.',
    description: 'Auto Rover uses an Arduino controller, line-following behaviour, ultrasonic obstacle sensing, and Bluetooth connectivity to travel predefined paths while responding to its surroundings. A connected mobile experience supports scheduling and monitoring.',
    tech: ['Arduino', 'Line following', 'Ultrasonic sensors', 'Bluetooth'],
    stats: [['Category', 'IoT rover project'], ['Use case', 'Smart healthcare delivery'], ['Project date', 'June 2024']], github: 'https://github.com/ChamiduPrabodya/heath-care-trolly', next: 'hospital-management',
    role: 'Team leader · Academic project',
    contribution: 'I managed project planning, task allocation, team coordination, and development activities for the automated medication delivery trolley. The project brought together embedded hardware and a connected mobile application.',
    features: [
      ['Guided movement', 'Use an Arduino controller and line-following sensors to navigate predefined paths.'],
      ['Obstacle sensing', 'Use ultrasonic sensors to detect obstacles along the trolley’s route.'],
      ['Mobile connection', 'Connect through Bluetooth to support scheduling and monitoring from a mobile application.'],
    ],
    outcome: 'The team developed an academic medication delivery trolley prototype. It gave me experience coordinating embedded systems, automation, and mobile app integration within one project.',
    gallery: [['assets/projects/auto-rover.jpg', 'Auto Rover hardware project']],
  },
  'hospital-management': {
    number: '06', type: 'Healthcare mobile application', title: 'Hospital Management<br /><em>Mobile App</em>', image: 'assets/projects/hospital-management-mobile.png', accent: '#8eb8ff',
    summary: 'A React Native hospital management app for appointments, healthcare operations, and mobile administration.',
    challenge: 'Organize patient services and administrative tools within the same mobile application. Doctor browsing, appointments, payments, and reports needed clear navigation and connections to the relevant backend services.',
    description: 'The Hospital Management Mobile App includes user authentication, doctor browsing, appointment booking, payments, complaints, reports, and an admin dashboard. It connects to a backend API to support hospital services, appointment coordination, and operational monitoring.',
    tech: ['React Native', 'Expo', 'React Navigation', 'Axios', 'AsyncStorage'],
    stats: [['Platform', 'Android & iOS'], ['Category', 'Healthcare mobile app'], ['Core feature', 'Appointment booking']], github: 'https://github.com/ChamiduPrabodya/Hospital-Management-Mobile-App', next: 'buildsmart',
    features: [
      ['Patient appointments', 'Browse doctors and book appointments from the mobile application.'],
      ['Connected services', 'Access authentication, payments, complaints, and reports through backend-connected screens.'],
      ['Admin workspace', 'Navigate to hospital operations, appointment management, reports, and departments.'],
    ],
    outcome: 'A React Native mobile application that brings patient services and administrative workflows into one project. The implementation connects navigation and local storage with backend services through Axios.',
    gallery: [['assets/projects/hospital.jpeg', 'Hospital app admin workspace with shortcuts for appointments, reports, and departments']],
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
  const contribution = document.querySelector('[data-contribution]');
  if (project.role && project.contribution) {
    contribution.hidden = false;
    document.querySelector('[data-role]').textContent = project.role;
    document.querySelector('[data-role-description]').textContent = project.contribution;
  }
  document.querySelector('[data-features]').replaceChildren(...project.features.map(([title, description], index) => {
    const card = document.createElement('article');
    card.className = 'case-feature';
    const number = document.createElement('span');
    number.className = 'case-kicker';
    number.textContent = `0${index + 1}`;
    const heading = document.createElement('h3');
    heading.textContent = title;
    const text = document.createElement('p');
    text.textContent = description;
    card.append(number, heading, text);
    return card;
  }));
  document.querySelector('[data-outcome]').textContent = project.outcome;
  document.querySelector('[data-gallery]').replaceChildren(...project.gallery.map(([src, caption]) => {
    const figure = document.createElement('figure');
    const link = document.createElement('a');
    link.href = src;
    link.target = '_blank';
    link.rel = 'noreferrer';
    link.setAttribute('aria-label', `Open full-size image: ${caption} (new tab)`);
    const image = document.createElement('img');
    image.src = src;
    image.alt = caption;
    image.loading = 'lazy';
    image.decoding = 'async';
    link.append(image);
    const text = document.createElement('figcaption');
    text.textContent = caption;
    figure.append(link, text);
    return figure;
  }));
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
