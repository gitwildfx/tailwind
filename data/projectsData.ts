import React from 'react'

interface Project {
  title: string
  description: string
  href?: string
  imgSrc?: string
}

const projectsData: Project[] = [
  {
    title: '"My Son Rising" (Audiobook)',
    description: `A message of hope and redemption for wandering souls desperate to know true freedom. Reclaim your rightful purpose as spiritual sons, and discover timeless wisdom and healing found within these letters.`,
    imgSrc: '/static/images/code.jpg',
    href: 'https://www.prodigalhouse.net/msr', // external URL
  },
  // Add more projects as necessary
]

const ProjectComponent = () => {
  return (
    <div>
      {projectsData.map((project) => (
        <div key={project.title}>
          <h2>{project.title}</h2>
          <p>{project.description}</p>
          {project.imgSrc && <img src={project.imgSrc} alt={project.title} />}
          {project.href && (
            <a href={project.href} target="_blank" rel="noopener noreferrer">
              Visit Project
            </a>
          )}
        </div>
      ))}
    </div>
  )
}

export default ProjectComponent
