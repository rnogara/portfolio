'use client';
import React, { useState } from 'react'
import { Button } from '../../ui/button'
import { toast } from 'sonner'
import { api } from '@/app/lib/api'
import { usePortfolio } from '@/app/context/PortfolioContext'
import { useAdmin } from '@/app/context/AdminContext'

const ProjectsList = () => {
  const { refreshProjects, projects } = usePortfolio();
  const { setProjectId } = useAdmin();
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async (id: string) => {
    if (!id) return;
    
    if (!confirm('Are you sure you want to delete this project?')) {
      return;
    }

    try {
      setIsDeleting(true);
      await api.delete(`/projects/${id}`);
      toast('Project deleted successfully!');
      await refreshProjects();
    } catch (error) {
      console.error('Error deleting project:', error);
      toast('Failed to delete project. Please try again.');
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div className='flex flex-col gap-4'>
      {projects.map((project, index) => (
        <div key={index} className='flex gap-12 justify-between items-center'>
          <h2 className='text-nowrap'>{project.titlePt}</h2>
          <div className='flex gap-2'>
            <Button variant="outline" onClick={() => { setProjectId(project.id) }}>Editar</Button>
            <Button variant="destructive" onClick={() => handleDelete(project.id)} disabled={isDeleting}>Deletar</Button>
          </div>
        </div>
      ))}
    </div>
  )
}

export default ProjectsList