interface Project {
  title: string
  description: string
  href?: string
  imgSrc?: string
}

const projectsData: Project[] = [
  {
    title: 'Code of the Lion (Challenge)',
    description: `Learn basic Python skills by helping a lost lion cub, Leo, find his way back home. Code of the Lion is an open-source training guide that develops your basic coding skills through iterative-based challenges.`,
    imgSrc: '/static/images/cotl.png',
    href: '/blog/code-of-the-lion',
  },
  {
    title: 'W001: Introduction to Modern Computing',
    description: `Ever wanted to learn about code but found it too difficult? This 8-week course will take you through the fundamentals of coding languages, like Python, JavaScript, and CSS to help you get coding fast.`,
    imgSrc: '/static/images/code.jpg',
    href: '#',
  },
]

export default projectsData
