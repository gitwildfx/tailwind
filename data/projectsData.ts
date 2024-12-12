// Define the Project type
type Project = {
  title: string;
  description: string;
  imgSrc: string;
  href: string;
};

// Your data array with the Project type applied
const projectsData: Project[] = [
  {
    title: 'Code of the Lion',
    description: `Learn basic Python skills by helping a lost lion cub, Leo, find his way back home. Code of the Lion is an open-source training guide that develops your basic coding skills through iterative-based challenges.`,
    imgSrc: '/static/images/cotl.png',
    href: '/blog/code-of-the-lion', // relative URL
  },
  {
    title: 'W001: Introduction to Modern Computing - Spring 2025',
    description: `Ever wanted to learn about code but found it too difficult? This 8-week course will take you through the fundamentals of coding languages, like Python, JavaScript, and CSS to help you get coding fast.`,
    imgSrc: '/static/images/code.jpg',
    href: '#', // Placeholder, could be handled or removed if no link
  },
  {
    title: '"My Son Rising" (Audiobook)',
    description: `A message of hope and redemption for wandering souls desperate to know true freedom. Reclaim your rightful purpose as spiritual sons, and discover timeless wisdom and healing found within these letters.`,
    imgSrc: '/static/images/sun.png',
    href: 'https://www.prodigalhouse.net/msr', // external URL
  },
]

export default projectsData;
