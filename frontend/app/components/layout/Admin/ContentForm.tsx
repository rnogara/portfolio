'use client';
import React, { useEffect, useState } from 'react'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '../../ui/form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { Input } from '../../ui/input'
import { useAuth } from '@/app/context/AuthContext'
import { usePortfolio } from '@/app/context/PortfolioContext'
import { toast } from 'sonner';
import { api } from '@/app/lib/api';
import { Button } from '../../ui/button';
import { useAdmin } from '@/app/context/AdminContext';
import { redirect } from 'next/navigation';
import ContentContactForm from './ContentContactForm';
import ContentSkillForm from './ContentSkillForm';
import ContentAboutForm from './ContentAboutForm';
import { PortfolioContent } from '@/app/types';
import ContentExperienceForm from './ContentExperienceForm';
import ContentEducationForm from './ContentEducationForm';

const formSchema = z.object({
  language: z.string().min(2, { message: 'Language must be at least 2 characters long' }).max(100),
  home: z.string().min(5, { message: 'Home must be at least 5 characters long' }).max(1000),
  menuInput: z.string().min(5, { message: 'Menu must be at least 5 characters long' }).max(1000),
  projects: z.string().min(5, { message: 'Projects must be at least 5 characters long' }).max(1000),
  icon: z.string().min(2, { message: 'Icon must be at least 2 characters long' }).max(100),
  error404Input: z.string().min(5, { message: 'Error 404 must be at least 5 characters long' }).max(1000),
  errorPageInput: z.string().min(5, { message: 'Error Page must be at least 5 characters long' }).max(1000),
}).transform(data => ({
  ...data,
  menu: data.menuInput.split(',').map(item => item.trim()).filter(item => item.length > 0),
  error404: data.error404Input.split(',').map(item => item.trim()).filter(item => item.length > 0),
  errorPage: data.errorPageInput.split(',').map(item => item.trim()).filter(item => item.length > 0),
}));
  
type ContentFormInput = {
  language: string;
  home: string;
  menuInput: string;
  projects: string;
  icon: string;
  error404Input: string;
  errorPageInput: string;
}

const ContentForm: React.FC = () => {
  const { isAuthenticated } = useAuth();
  const { contents } = usePortfolio();
  const { contentId, setContentId, experienceId, setExperienceId, educationId, setEducationId, contentIsOpen, setContentIsOpen, about, skills, contact, setExperience, setEducation, setAbout, setSkills, setContact } = useAdmin();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const content = contentId && contents.find((c: PortfolioContent) => c.id === contentId);

  const form = useForm<ContentFormInput>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      language: '',
      home: '',
      menuInput: '',
      projects: '',
      icon: '',
      error404Input: '',
      errorPageInput: '',
    },
  });

  useEffect(() => {
    if (content) {
      form.reset({
        language: content.language,
        home: content.home,
        menuInput: content.menu.join(', '),
        projects: content.projects,
        icon: content.icon,
        error404Input: content.error404.join(', '),
        errorPageInput: content.errorPage.join(', '),
      });
    } else {
      form.reset(
        {
          language: '',
          home: '',
          menuInput: '',
          projects: '',
          icon: '',
          error404Input: '',
          errorPageInput: '',
        }
      );
    }
  }, [content, form]);

  const onSubmit = async (data: ContentFormInput) => {
    if (!isAuthenticated) {
      toast.error('You must be logged in to save content');
      redirect('/admin/login');
    }
    const filteredData = {
      language: data.language,
      home: data.home,
      menu: data.menuInput.split(',').map(item => item.trim()).filter(item => item.length > 0),
      projects: data.projects,
      icon: data.icon,
      error404: data.error404Input.split(',').map(item => item.trim()).filter(item => item.length > 0),
      errorPage: data.errorPageInput.split(',').map(item => item.trim()).filter(item => item.length > 0),
    };
      

    try {
      setIsSubmitting(true);
      const contentData = {
        ...filteredData,
        about,
        skills,
        contact
      };
      if (content && content.id) {
        // Update existing content
        await api.put(`/contents/${content.language}`, contentData);
        toast.success('Content updated successfully!');
      } else {
        // Create new content
        await api.post('/contents', contentData);
        toast.success('Content created successfully!');
        form.reset();
        setContentIsOpen(null);
      }
      setContentId(null);
      setExperienceId(null);
      setEducationId(null);
      setAbout(null);
      setSkills(null);
      setContact(null);
      setExperience(null);
      setEducation(null);
      
    } catch (error) {
      console.error('Error saving content:', error);
      toast.error('Failed to save content. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReset = () => {
    form.reset({
      language: '',
      home: '',
      menuInput: '',
      projects: '',
      icon: '',
      error404Input: '',
      errorPageInput: '',
    });
    setContentId(null);
    setExperienceId(null);
    setEducationId(null);
  };

  return (
    <div className="space-y-4 w-full p-6 bg-gray-800 rounded-lg shadow-md">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className='flex flex-col gap-4'>
          <div className="flex justify-between pt-4">
            <h2 className="text-2xl font-bold mb-6">
              {content ? 'Edit Content : ' : 'Add New Content'}
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
                {isSubmitting ? 'Saving...' : content ? 'Update Content' : 'Create Content'}
              </Button>
            </div>
          </div>
          <div className="grid grid-cols-3 md:grid-cols-4 gap-4">
            <FormField
              control={form.control}
              name="language"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Language</FormLabel>
                  <FormControl>
                    <Input placeholder="Language" {...field} className='border-gray-600' />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="home"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Home Title</FormLabel>
                  <FormControl>
                    <Input placeholder="Home Title" {...field} className='border-gray-600' />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="projects"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Projects Title</FormLabel>
                  <FormControl>
                    <Input placeholder="Projects Title" {...field} className='border-gray-600' />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="icon"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Flag icon</FormLabel>
                  <FormControl>
                    <Input placeholder="Flag icon corresponding to the language" {...field} className='border-gray-600' />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            /> 
          </div>
          <div className='flex flex-col gap-4'>
            <FormField
              control={form.control}
              name="menuInput"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Menu navigation</FormLabel>
                  <FormControl>
                    <Input placeholder="Example: Home, About, Skills, Projects, Contact" {...field} className='border-gray-600' />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="error404Input"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Error 404</FormLabel>
                  <FormControl>
                    <Input placeholder="Example: 404 Not Found, page not found, return to home" {...field} className='border-gray-600' />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="errorPageInput"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Error Page</FormLabel>
                  <FormControl>
                    <Input placeholder="Example: Error, something went wrong, try again, return to home" {...field} className='border-gray-600' />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </form>
      </Form>
      <div className='flex gap-2'>
        <Button type='button' onClick={() => setContentIsOpen(contentIsOpen === 'about' ? null : 'about')} className='border border-green-400 text-green-400 bg-transparent hover:bg-green-400 hover:text-black text-lg p-5 font-bold'>{contentIsOpen === 'about' ? 'Close About' : 'About'}</Button>
        <Button type='button' onClick={() => setContentIsOpen(contentIsOpen === 'skills' ? null : 'skills')} className='border border-green-400 text-green-400 bg-transparent hover:bg-green-400 hover:text-black text-lg p-5 font-bold'>{contentIsOpen === 'skills' ? 'Close Skills' : 'Skills'}</Button>
        <Button type='button' onClick={() => setContentIsOpen(contentIsOpen === 'contact' ? null : 'contact')} className='border border-green-400 text-green-400 bg-transparent hover:bg-green-400 hover:text-black text-lg p-5 font-bold'>{contentIsOpen === 'contact' ? 'Close Contact' : 'Contact'}</Button>
        </div>
      {contentIsOpen === 'about' && <ContentAboutForm content={content || null} />}
      {contentIsOpen === 'skills' && <ContentSkillForm content={content || null} />}
      {contentIsOpen === 'contact' && <ContentContactForm content={content || null} />}
      <div className='flex flex-col gap-8'>
        {experienceId && <ContentExperienceForm content={content || null} />}
        {educationId && <ContentEducationForm content={content || null} />}
      </div>
    </div>
  )
}

export default ContentForm