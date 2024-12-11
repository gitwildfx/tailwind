interface Project {
  title: string
  description: string
  href?: string
  imgSrc?: string
}

const projectsData: Project[] = [
  {
    title: 'Code of the Lion (Challenge)',
    description: `Learn basic Python skills by helping a lost lion cub, Leo, find his way back home. <em>Code of the Lion</em> employs an innovative teaching format designed to develop coding skills through iterative-based challenges.`,
    imgSrc: '/static/images/cotl.png',
    href: '/blog/code-of-the-lion',
  },
  {
    title: 'W001: Introduction to Modern Computing',
    description: `Imagine being able to travel back in time or to the future. Simple turn the knob
    to the desired date and press "Go". No more worrying about lost keys or
    forgotten headphones with this simple yet affordable solution.`,
    imgSrc: '/static/images/time-machine.jpg',
    href: '/blog/the-time-machine',
  },
]

export default projectsData
