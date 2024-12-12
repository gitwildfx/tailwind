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
    title: '"My Son Rising" (Audiobook)',
    description: `A message of hope and redemption for wandering souls desperate to know true freedom. Reclaim your rightful purpose as spiritual sons, and discover timeless wisdom and healing found within these letters.`,
    imgSrc: '/static/images/sun.png',
    href: 'https://www.prodigalhouse.net/msr', // external URL
  },
]

export default projectsData;
