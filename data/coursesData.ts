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
    title: 'W001: Intro to Modern Computing (Spring 2025)',
    description: 'An introduction to programming languages for people of all skill levels and backgrounds. We will be exploring Javascript, Python, HTML among other tools like AI/LLMs needed as a developer.',
    imgSrc: '/static/images/code.jpg',
    href: '#',
  },
];

export default coursesData;
