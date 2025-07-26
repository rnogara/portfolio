'use client';
import React, { useEffect, useState } from 'react'
import { z } from 'zod'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '../../ui/form';
import { Input } from '../../ui/input';
import { Button } from '../../ui/button';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { PortfolioContent } from '@/app/types';
import { useAdmin } from '@/app/context/AdminContext';
import ContentExperienceForm from './ContentExperienceForm';
import ContentEducationForm from './ContentEducationForm';
import { toast } from 'sonner';

const contentAboutSchema = z.object({
    title: z.string().min(2, { message: 'Title must be at least 2 characters long' }).max(100),
    educationBtn: z.string().min(2, { message: 'Education button must be at least 2 characters long' }).max(100),
    experienceBtn: z.string().min(2, { message: 'Experience button must be at least 2 characters long' }).max(100),
    cvUrl: z.string().min(2, { message: 'CV URL must be at least 2 characters long' }).max(100),
    cvBtn: z.string().min(2, { message: 'CV button must be at least 2 characters long' }).max(100),
})

const ContentAboutForm = ({content}: {content: PortfolioContent | null }) => {
  const { about, setAbout, education, experience, setEducationId, setExperienceId, setContentIsOpen } = useAdmin();  
  const [open, setOpen] = useState<'experience' | 'education' | null>(null);
  
  const form = useForm<z.infer<typeof contentAboutSchema>>({
    resolver: zodResolver(contentAboutSchema),
    defaultValues: {
      title: '',
      educationBtn: '',
      experienceBtn: '',
      cvUrl: '',
      cvBtn: '',
    },
  });

  useEffect(() => {
    if (content) {
      form.reset({
        title: content.about?.title,
        educationBtn: content.about?.educationBtn,
        experienceBtn: content.about?.experienceBtn,
        cvUrl: content.about?.cvUrl,
        cvBtn: content.about?.cvBtn,
      });
    } else if (about) {
      form.reset({
        title: about.title,
        educationBtn: about.educationBtn,
        experienceBtn: about.experienceBtn,
        cvUrl: about.cvUrl,
        cvBtn: about.cvBtn,
      });
    } else {
      form.reset({
        title: '',
        educationBtn: '',
        experienceBtn: '',
        cvUrl: '',
        cvBtn: '',
      });
    }
  }, [content, form, about]);

  const onSubmit = (data: z.infer<typeof contentAboutSchema>) => {
    if (!education || !experience) return toast.error('Education or experience is required');
    setAbout({
      ...data,
      education: education,
      experience: experience,
    });
    toast.success('About updated successfully');
    setContentIsOpen(null);
  };

  return (
    <div className='flex flex-col gap-4 border border-gray-200 p-3 rounded-lg shadow-md'>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className='flex flex-col gap-4'>
          <div className='flex justify-between'>
            <h2 className='text-2xl font-bold underline'>About</h2>
            <Button type="submit" className='w-fit'>Submit</Button>
          </div>
          <div className='grid grid-cols-4 gap-4'>
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input placeholder="About title" {...field} className='border-gray-600' />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="educationBtn"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Education Button</FormLabel>
                  <FormControl>
                    <Input placeholder="Education button" {...field} className='border-gray-600' />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="experienceBtn"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Experience Button</FormLabel>
                  <FormControl>
                    <Input placeholder="Experience button" {...field} className='border-gray-600' />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="cvUrl"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>CV URL</FormLabel>
                  <FormControl>
                    <Input placeholder="CV URL" {...field} className='border-gray-600' />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="cvBtn"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>CV Button</FormLabel>
                  <FormControl>
                    <Input placeholder="CV button" {...field} className='border-gray-600' />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </form>
      </Form>
      <div className='flex gap-2'>
        <Button type='button' onClick={() => {setOpen(open === 'experience' ? null : 'experience'); setExperienceId(null)}} className='w-fit border border-gray-200 text-gray-200 bg-transparent hover:bg-gray-200 hover:text-black font-bold'>{open === 'experience' ? 'Close Experience' : 'Add Experience'}</Button>
        <Button type='button' onClick={() => {setOpen(open === 'education' ? null : 'education'); setEducationId(null)}} className='w-fit border border-gray-200 text-gray-200 bg-transparent hover:bg-gray-200 hover:text-black font-bold'>{open === 'education' ? 'Close Education' : 'Add Education'}</Button>
      </div>
      {open === 'experience' && <ContentExperienceForm content={content || null} />}
      {open === 'education' && <ContentEducationForm content={content || null} />}
    </div>
  )
}

export default ContentAboutForm