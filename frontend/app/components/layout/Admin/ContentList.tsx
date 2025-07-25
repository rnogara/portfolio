'use client';
import React, { useState } from 'react'
import { Education, Experience, PortfolioContent } from '@/app/types'
import Image from 'next/image'
import { Button } from '@/app/components/ui/button'
import { toast } from 'sonner'
import { api } from '@/app/lib/api'
import { usePortfolio } from '@/app/context/PortfolioContext'
import { useAdmin } from '@/app/context/AdminContext'

const ContentList = () => {
  const { refreshContent, contents } = usePortfolio();
  const { contentId, setContentId, setExperienceId, setEducationId, setExperience, setEducation, education, experience } = useAdmin();
  const [isDeleting, setIsDeleting] = useState(false);
  const content = contentId && contents.find((c: PortfolioContent) => c.id === contentId);

  const handleDeleteContent = async (selectedId: string | null = contentId) => {
    const content = contents?.find((c: PortfolioContent) => c.id === selectedId);
    if (!content) return;
    
    if (!confirm('Are you sure you want to delete this language?')) {
      return;
    }
  
    try {
      setIsDeleting(true);
      await api.delete(`/api/contents/${content.language}`);
      toast.success('Content deleted successfully!');
      await refreshContent(contents[0]?.language || '');
      setContentId(null);
    } catch (error) {
      console.error('Error deleting content:', error);
      toast.error('Failed to delete content. Please try again.');
    } finally {
      setIsDeleting(false);
    }
  };
  
  const handleDeleteItem = (type: 'experience' | 'education', id: string) => {
    if (!confirm(`Are you sure you want to delete this ${type}?`)) {
      return;
    }
  
    if (type === 'experience') {
      const updatedExperience = experience?.filter(exp => exp.id !== id) || [];
      setExperience(updatedExperience);
      if (content && content.about) {
        content.about.experience = updatedExperience;
      }
    } else if (type === 'education') {
      const updatedEducation = education?.filter(edu => edu.id !== id) || [];
      setEducation(updatedEducation);
      if (content && content.about) {
        content.about.education = updatedEducation;
      }
    }
  };

  const handleEdit = (selectedId: string | null = contentId) => {
    setContentId(selectedId);
    setExperienceId(null);
    setEducationId(null);
    const selectedContent = contents?.find((c: PortfolioContent) => c.id === selectedId);
    if (!selectedContent) return;
    setExperience(selectedContent?.about?.experience || []);
    setEducation(selectedContent?.about?.education || []);
  };

  return (
    <div className='flex flex-col gap-4'>
      {contents?.map((content, index) => (
        <div key={index} className='flex justify-between gap-12 items-center'>
          <div className='flex gap-1 items-center'>
            <h2 className='text-nowrap'>{content.language}</h2>
            <Image src={content.icon} alt={content.language} width={26} height={26} />
          </div>
          <div className='flex gap-2'>
            <Button variant="outline" onClick={() => handleEdit(content.id)}>Editar</Button>
            <Button variant="destructive" onClick={() => {
              setContentId(content.id);
              handleDeleteContent(content.id);
            }} disabled={isDeleting}>Deletar</Button>
          </div>
        </div>
      ))}
      {experience && education && (
        <>
          <div className='py-2 border-t-2 border-dashed border-gray-200 flex flex-col gap-2'>
            <h2 className='text-nowrap font-[Orbitron] text-center pb-2'>Experience</h2>
            {experience.map((experience: Experience, index) => (
              <div key={experience.id || index} className='flex justify-between gap-12 items-center'>
                <span>{experience.company}</span>
                <div className='flex gap-2'>
                  {experience.id && <Button 
                    variant="outline" 
                    onClick={() => {
                      setExperienceId(experience.id || null);
                      setContentId(content ? content.id : null);
                    }}
                  >
                    Editar
                  </Button>}
                  <Button 
                    variant="destructive" 
                    onClick={() => {
                      handleDeleteItem('experience', experience.id || '');
                    }}
                    disabled={isDeleting}
                  >
                    Deletar
                  </Button>
                </div>
              </div>
            ))}
          </div>
          <div className='py-2 border-t-2 border-dashed border-gray-200 flex flex-col gap-2'> 
            <h2 className='text-nowrap font-[Orbitron] text-center pb-2'>Education</h2>       
            {education.map((education: Education, index) => (
              <div key={education.id || index} className='flex justify-between gap-12 items-center'>
                <span>{education.institution}</span>
                <div className='flex gap-2'>
                  {education.id && <Button 
                    variant="outline" 
                    onClick={() => {
                      setEducationId(education.id || null);
                      setContentId(content ? content.id : null);
                    }}
                  >
                    Editar
                  </Button>}
                  <Button 
                    variant="destructive" 
                    onClick={() => {
                      handleDeleteItem('education', education.id || '');
                    }}
                    disabled={isDeleting}
                  >
                    Deletar
                  </Button>
                </div>
              </div>
            ))}
          </div>
          {content && 
          <Button onClick={() => {
            setContentId(null);
            setExperienceId(null);
            setEducationId(null);
          }}
          disabled={isDeleting}
          className='bg-gray-700 hover:bg-green-600 cursor-pointer w-fit mx-auto'
          >Voltar</Button>}
        </>
      )}
    </div>
  );
};

export default ContentList;