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
    title: 'Docusaurus',
    description: `Build a customized Document repository from the ground up. Employ a live Code Enviornment to design, deploy, and launch your very first website. Plus, you'll learn about dinosaurs...not really.`,
    imgSrc: '/static/images/docusaurus.gif',
    href: 'https://docusaurus-fqlz.vercel.app/', // relative URL
  },
  {
    title: 'Hack this Page',
    description: `Discover how to build and deploy a Tailwind CSS blog. A beginner-friendly guide covering setup, GitHub integration, and template customization with Artificial Intelligence support.`,
    imgSrc: '/static/images/githack2.png',
    href: '/blog/hack-this-page', // relative URL
  },
  {
    title: 'Code of the Lion™',
    description: `Learn basic Python by helping a lost lion cub, Leo, find his way back home. Code of the Lion is an open-source training guide that develops your coding skills through iterative-based challenges.`,
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
