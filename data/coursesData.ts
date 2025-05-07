// Define the Project type
type Course = {
  title: string;
  description: string;
  imgSrc: string;
  href: string;
};

// app/data/coursesData.ts
const coursesData = [
  {
    title: 'W001: Intro to Modern Computing'<br />'(June 11-12, 2025 @ 7-9PM EST)',
    description: 'An introduction to programming languages for people of all skill levels. We will be exploring Javascript, Python, and HTML among other helpful tools like AI/LLMs for code development.',
    imgSrc: '/static/images/code.jpg',
    href: '/blog/intro-to-modern-computing',
  },
];

export default coursesData;
