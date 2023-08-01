import React from 'react';

export default function ProjectCard(project) {
  const image = project.img;
  return (
    <div className='project-card'>
      <img className='project-card-img' src={ image } alt={`representação do projeto ${project.name}`}/>
      <h3 className='project-card-name'>{ project.name }</h3>
      <a className='project-card-link' href={ project.link } target='_blank' rel='noreferrer noopener'>Link</a>
    </div>
  )
}
