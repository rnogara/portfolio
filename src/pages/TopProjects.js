import React from 'react';
import ProjectCard from '../components/ProjectCard';
import projects from '../projects';
import '../style/TopProjectsCard.css';

export default function TopProjects() {
  return (
    <div className='project-cards-container'>
      { projects.sort((a, b) => b.score - a.score).map((project) => ProjectCard(project)) }
    </div>
  )
}