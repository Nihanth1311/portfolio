// Everything about you that is not a project or a job lives in this file.
// Edit the text here and the site updates.

export const site = {
  name: 'Nihanth Baratam',
  role: 'Full-stack software engineer',
  employer: 'Solytics Partners',
  location: 'Pune, India',
  email: 'nihanthbaratam1@gmail.com',
  github: 'https://github.com/Nihanth1311',
  linkedin: 'https://www.linkedin.com/in/nihanth-baratam-4341a5275/',
  // To update your résumé, replace public/resume.pdf with the new file (keep the name).
  resume: '/resume.pdf',
  resumeFileName: 'Nihanth-Baratam-Resume.pdf',

  // Each entry is one line of the big headline.
  headline: ['I build the whole feature.', 'Then I make it fast.'],
  intro:
    'I’m Nihanth, a full-stack engineer at Solytics Partners in Pune. I work on MRM Vault, a model risk management platform used by financial institutions, with Django and PostgreSQL behind the API and React in front of it.',
  // Shown in the contact section. Set to '' to hide it.
  availability: 'Open to full-stack engineering roles.',
  description:
    'Nihanth Baratam is a full-stack software engineer in Pune, India, working with Django, PostgreSQL and React.',
};

// Short facts shown under your photo in the hero.
export const facts = [
  { label: 'Now', value: 'Associate Software Engineer at Solytics Partners' },
  { label: 'Based in', value: 'Pune, India' },
  { label: 'Studied', value: 'B.Tech Computer Science, VIT Vellore' },
];

// The "What I’m good at" section. Each one names where you have done it.
export const strengths = [
  {
    title: 'Whole features, end to end',
    text: 'I take a feature from the requirement to the release: the data model, the API, and the screen people use.',
    proof: 'MRM Vault at Solytics Partners, across Django, PostgreSQL and React.',
  },
  {
    title: 'Making slow things fast',
    text: 'I look for the N+1 query, the missing index and the read that should be cached, then measure what changed.',
    proof: 'About 40% faster endpoints at Solytics. 800 ms down to 300 ms on Event Whiz.',
  },
  {
    title: 'Safe changes to live systems',
    text: 'Migrations planned as backward-compatible rollouts, permission checks on protected endpoints, and user input sanitised before it reaches the page.',
    proof: 'Production PostgreSQL migrations with no downtime. More than 20 critical bugs resolved.',
  },
];

// The live chart in the hero. The bars run in real time at these durations.
export const trace = {
  caption: 'One request to the Event Whiz API, before and after I put Redis in front of it.',
  rows: [
    { label: 'Without cache', ms: 800, kind: 'slow' },
    { label: 'With Redis cache', ms: 300, kind: 'fast' },
  ],
  note: 'This runs in real time at the response times I measured: 500 ms saved on every request.',
};

export const skills = [
  { group: 'Languages', items: ['Python', 'JavaScript (ES6+)', 'TypeScript', 'SQL', 'Java', 'C/C++', 'Solidity'] },
  {
    group: 'Backend',
    items: ['Django (REST APIs, ORM, migrations)', 'Node.js', 'Express.js', 'JWT auth', 'RBAC', 'Socket.io'],
  },
  {
    group: 'Frontend',
    items: ['React 18', 'Next.js', 'Redux Toolkit', 'TanStack Query', 'MUI 5', 'Tailwind CSS', 'Vite', 'React Flow', 'ECharts', 'Plotly', 'Formik/Yup'],
  },
  { group: 'Databases', items: ['PostgreSQL', 'MySQL', 'MongoDB', 'Redis'] },
  { group: 'DevOps and cloud', items: ['Linux', 'AWS', 'Docker', 'Kubernetes'] },
  { group: 'Practice', items: ['Git', 'Code reviews', 'Unit testing', 'Postman', 'Jira', 'Agile/Scrum'] },
];

export const education = [
  {
    school: 'Vellore Institute of Technology',
    detail: 'B.Tech in Computer Science (Blockchain)',
    result: 'CGPA 8.86 / 10',
    years: '2022 – 2026',
    place: 'Vellore, India',
  },
  {
    school: 'Sri Chaitanya Junior College',
    detail: '12th, BIEAP',
    result: '94%',
    years: '2020 – 2022',
    place: '',
  },
];

export const achievements = [
  {
    title: 'Third place, VIT Hackathon',
    text: 'Designed and built a campus bus shuttle site for tracking and scheduling student transport.',
  },
  {
    title: 'Club lead, Chess and Board Games Club',
    text: 'Organised and ran more than 20 competitions for students at VIT.',
  },
  {
    title: '300+ LeetCode problems',
    text: 'Arrays, linked lists, trees and dynamic programming.',
  },
  {
    title: 'MERN Stack Certification, Ethnus',
    text: 'Full-stack training in MongoDB, Express.js, React and Node.js.',
  },
];
