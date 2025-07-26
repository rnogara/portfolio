'use client';

import React, { useState, useEffect } from 'react';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '../../ui/form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/app/components/ui/button';
import { Input } from '@/app/components/ui/input';
import { Textarea } from '@/app/components/ui/textarea';
import { toast } from 'sonner';
import { usePortfolio } from '@/app/context/PortfolioContext';
import { api } from '@/app/lib/api';
import { redirect } from 'next/navigation';
import { useAuth } from '@/app/context/AuthContext';
import { useForm } from 'react-hook-form';
import { useAdmin } from '@/app/context/AdminContext';

type ProjectFormInput = {
  titlePt: string;
  titleEn: string;
  descriptionPt: string;
  descriptionEn: string;
  imageUrl: string;
  videoUrl?: string;
  siteUrl?: string;
  githubUrl?: string;
  rate: number;
  technologiesTitlePt: string;
  technologiesTitleEn: string;
  technologiesInput: string;
};

const projectSchema = z.object({
  titlePt: z.string().min(3, 'Title must be at least 3 characters'),
  titleEn: z.string().min(3, 'Title must be at least 3 characters'),
  descriptionPt: z.string().min(10, 'Description must be at least 10 characters'),
  descriptionEn: z.string().min(10, 'Description must be at least 10 characters'),
  imageUrl: z.string().url('Please enter a valid URL'),
  videoUrl: z.string().url('Please enter a valid URL').or(z.literal('')).optional(),
  siteUrl: z.string().url('Please enter a valid URL').or(z.literal('')).optional(),
  githubUrl: z.string().url('Please enter a valid URL').or(z.literal('')).optional(),
  rate: z.coerce.number().min(1, 'Rate must be at least 1').max(10, 'Rate must be at most 10'),
  technologiesTitlePt: z.string().min(3, 'Title must be at least 3 characters'),
  technologiesTitleEn: z.string().min(3, 'Title must be at least 3 characters'),
  technologiesInput: z.string().min(1, 'At least one technology is required'),
}).transform(data => ({
  ...data,
  technologies: data.technologiesInput
    .split(',')
    .map(tech => tech.trim())
    .filter(tech => tech.length > 0)
}));


const ProjectsForm: React.FC = () => {
  const { isAuthenticated } = useAuth();
  const { projectId, setProjectId } = useAdmin();
  const { refreshProjects, projects } = usePortfolio();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const project = projectId && projects.find((p) => p.id === projectId);

  const form = useForm<ProjectFormInput>({
    resolver: zodResolver(projectSchema),
    defaultValues: {
      titlePt: project ? project.titlePt : '',
      titleEn: project ? project.titleEn : '',
      descriptionPt: project ? project.descriptionPt : '',
      descriptionEn: project ? project.descriptionEn : '',
      imageUrl: project ? project.imageUrl : '',
      videoUrl: project ? project.videoUrl : '',
      siteUrl: project ? project.siteUrl : '',
      githubUrl: project ? project.githubUrl : '',
      rate: project ? project.rate : 0,
      technologiesTitlePt: project ? project.technologiesTitlePt : '',
      technologiesTitleEn: project ? project.technologiesTitleEn : '',
      technologiesInput: project ? project.technologies.join(', ') : '',
    },
  });

  useEffect(() => {
    if (project) {
      form.reset({
        titlePt: project.titlePt,
        titleEn: project.titleEn,
        descriptionPt: project.descriptionPt,
        descriptionEn: project.descriptionEn,
        imageUrl: project.imageUrl || '',
        videoUrl: project.videoUrl || '',
        siteUrl: project.siteUrl || '',
        githubUrl: project.githubUrl || '',
        rate: project.rate,
        technologiesTitlePt: project.technologiesTitlePt,
        technologiesTitleEn: project.technologiesTitleEn,
        technologiesInput: project.technologies.join(', '),
      });
    } else {
      form.reset({
        titlePt: '',
        titleEn: '',
        descriptionPt: '',
        descriptionEn: '',
        imageUrl: '',
        videoUrl: '',
        siteUrl: '',
        githubUrl: '',
        rate: 0,
        technologiesTitlePt: '',
        technologiesTitleEn: '',
        technologiesInput: '',
      });
    }
  }, [project, form]);

  const onSubmit = async (data: ProjectFormInput) => {

    if (!isAuthenticated) {
      toast.error('You must be logged in to save projects');
      redirect('/admin/login');
    }
  
    try {
      setIsSubmitting(true);
      const projectData = {
        titlePt: data.titlePt,
        titleEn: data.titleEn,
        descriptionPt: data.descriptionPt,
        descriptionEn: data.descriptionEn,
        rate: data.rate,
        imageUrl: data.imageUrl,
        videoUrl: data.videoUrl,
        siteUrl: data.siteUrl,
        githubUrl: data.githubUrl,
        technologiesTitlePt: data.technologiesTitlePt,
        technologiesTitleEn: data.technologiesTitleEn,
        technologies: data.technologiesInput.split(',').map(tech => tech.trim()),
      };
  
      if (project && project.id) {
        await api.put(`/projects/${project.id}`, projectData);
        toast.success('Project updated successfully!');
      } else {
        await api.post('/projects', projectData);
        toast.success('Project created successfully!');
        form.reset({
          titlePt: '',
          titleEn: '',
          descriptionPt: '',
          descriptionEn: '',
          imageUrl: '',
          videoUrl: '',
          siteUrl: '',
          githubUrl: '',
          rate: 1,
          technologiesTitlePt: '',
          technologiesTitleEn: '',
          technologiesInput: '',
        });
      }
      
      await refreshProjects();
    } catch (error) {
      console.error('Error saving project:', error);
      toast.error('Failed to save project. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReset = () => {
    form.reset({
      titlePt: '',
      titleEn: '',
      descriptionPt: '',
      descriptionEn: '',
      imageUrl: '',
      videoUrl: '',
      siteUrl: '',
      githubUrl: '',
      rate: 0,
      technologiesTitlePt: '',
      technologiesTitleEn: '',
      technologiesInput: '',
    });
    setProjectId(null);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 w-full p-6 bg-gray-800 rounded-lg shadow-md">
        <div className="flex justify-between pt-4">
          <h2 className="text-2xl font-bold mb-6">
            {project ? 'Edit Project' : 'Add New Project'}
          </h2>
          <div className="space-x-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => handleReset()}
              disabled={isSubmitting}
              className="text-gray-200 hover:underline cursor-pointer"
            >
              Reset
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting
                ? 'Saving...'
                : project
                ? 'Update Project'
                : 'Create Project'}
            </Button>
          </div>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          <FormField
            control={form.control}
            name='titlePt'
            render={({ field }) => (
              <FormItem>
                <FormLabel className='text-sm md:text-base font-medium text-gray-200 dark:text-green-400'>
                  Title pt-BR *
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder='Title in portuguese'
                    {...field}
                    className='bg-gray-700 border-gray-600 text-white'
                  />
                </FormControl>
                <FormMessage className='text-xs pl-1 text-red-500 dark:text-red-400'>{form.formState.errors.titlePt?.message}</FormMessage>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='titleEn'
            render={({ field }) => (
              <FormItem>
                <FormLabel className='text-sm md:text-base font-medium text-gray-200 dark:text-green-400'>
                  Title en *
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder='Title in english'
                    {...field}
                    className='bg-gray-700 border-gray-600 text-white'
                  />
                </FormControl>
                <FormMessage className='text-xs pl-1 text-red-500 dark:text-red-400'>{form.formState.errors.imageUrl?.message}</FormMessage>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='imageUrl'
            render={({ field }) => (
              <FormItem>
                <FormLabel className='text-sm md:text-base font-medium text-gray-200 dark:text-green-400'>
                  Image URL *
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder='Project image URL'
                    {...field}
                    className='bg-gray-700 border-gray-600 text-white'
                  />
                </FormControl>
                <FormMessage className='text-xs pl-1 text-red-500 dark:text-red-400'>{form.formState.errors.imageUrl?.message}</FormMessage>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='videoUrl'
            render={({ field }) => (
              <FormItem>
                <FormLabel className='text-sm md:text-base font-medium text-gray-200 dark:text-green-400'>
                  Video URL
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder='Project video URL'
                    {...field}
                    className='bg-gray-700 border-gray-600 text-white'
                  />
                </FormControl>
                <FormMessage className='text-xs pl-1 text-red-500 dark:text-red-400'>{form.formState.errors.videoUrl?.message}</FormMessage>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='siteUrl'
            render={({ field }) => (
              <FormItem>
                <FormLabel className='text-sm md:text-base font-medium text-gray-200 dark:text-green-400'>
                  Site URL
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder='Project site URL'
                    {...field}
                    className='bg-gray-700 border-gray-600 text-white'
                  />
                </FormControl>
                <FormMessage className='text-xs pl-1 text-red-500 dark:text-red-400'>{form.formState.errors.siteUrl?.message}</FormMessage>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='githubUrl'
            render={({ field }) => (
              <FormItem>
                <FormLabel className='text-sm md:text-base font-medium text-gray-200 dark:text-green-400'>
                  GitHub URL
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder='Project GitHub URL'
                    {...field}
                    className='bg-gray-700 border-gray-600 text-white'
                  />
                </FormControl>
                <FormMessage className='text-xs pl-1 text-red-500 dark:text-red-400'>{form.formState.errors.githubUrl?.message}</FormMessage>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='technologiesTitlePt'
            render={({ field }) => (
              <FormItem>
                <FormLabel className='text-sm md:text-base font-medium text-gray-200 dark:text-green-400'>
                  Technologies Title pt-BR *
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder='Example: Tecnologias usadas'
                    {...field}
                    className='bg-gray-700 border-gray-600 text-white'
                  />
                </FormControl>
                <FormMessage className='text-xs pl-1 text-red-500 dark:text-red-400'>{form.formState.errors.technologiesTitlePt?.message}</FormMessage>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='technologiesTitleEn'
            render={({ field }) => (
              <FormItem>
                <FormLabel className='text-sm md:text-base font-medium text-gray-200 dark:text-green-400'>
                  Technologies Title en *
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder='Example: Used technologies'
                    {...field}
                    className='bg-gray-700 border-gray-600 text-white'
                  />
                </FormControl>
                <FormMessage className='text-xs pl-1 text-red-500 dark:text-red-400'>{form.formState.errors.technologiesTitleEn?.message}</FormMessage>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='rate'
            render={({ field }) => (
              <FormItem>
                <FormLabel className='text-sm md:text-base font-medium text-gray-200 dark:text-green-400'>
                  Rate *
                </FormLabel>
                <FormControl>
                  <Input
                    type='number'
                    placeholder='Project rate'
                    {...field}
                    className='bg-gray-700 border-gray-600 text-white'
                  />
                </FormControl>
                <FormMessage className='text-xs pl-1 text-red-500 dark:text-red-400'>{form.formState.errors.rate?.message}</FormMessage>
              </FormItem>
            )}
          />
        </div>
        <div className='grid grid-cols-1 gap-6'>
          <FormField
            control={form.control}
            name='technologiesInput'
            render={({ field }) => (
              <FormItem>
                <FormLabel className='text-sm md:text-base font-medium text-gray-200 dark:text-green-400'>
                  Technologies * (comma separated values)
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder='List of technologies used in the project comma separated values. Example: React, Node.js, MongoDB'
                    {...field}
                    className='bg-gray-700 border-gray-600 text-white'
                  />
                </FormControl>
                <FormMessage className='text-xs pl-1 text-red-500 dark:text-red-400'>{form.formState.errors.technologiesInput?.message}</FormMessage>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='descriptionPt'
            render={({ field }) => (
              <FormItem>
                <FormLabel className='text-sm md:text-base font-medium text-gray-200 dark:text-green-400'>
                  Description pt-BR *
                </FormLabel>
                <FormControl>
                  <Textarea
                    id="descriptionPt"
                    {...field}
                    placeholder="Project description"
                    rows={4}
                    className="bg-gray-700 border-gray-600 text-white"
                  />
                </FormControl>
                <FormMessage className='text-xs pl-1 text-red-500 dark:text-red-400'>{form.formState.errors.descriptionPt?.message}</FormMessage>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='descriptionEn'
            render={({ field }) => (
              <FormItem>
                <FormLabel className='text-sm md:text-base font-medium text-gray-200 dark:text-green-400'>
                  Description en *
                </FormLabel>
                <FormControl>
                  <Textarea
                    id="descriptionEn"
                    {...field}
                    placeholder="Project description"
                    rows={4}
                    className="bg-gray-700 border-gray-600 text-white"
                  />
                </FormControl>
                <FormMessage className='text-xs pl-1 text-red-500 dark:text-red-400'>{form.formState.errors.descriptionEn?.message}</FormMessage>
              </FormItem>
            )}
          />
        </div>
      </form>
    </Form>
  );
};

export default ProjectsForm;
