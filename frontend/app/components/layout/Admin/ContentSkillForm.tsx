'use client';
import React, { useEffect } from 'react'
import { z } from 'zod'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '../../ui/form';
import { Input } from '../../ui/input';
import { Button } from '../../ui/button';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { PortfolioContent } from '@/app/types';
import { useAdmin } from '@/app/context/AdminContext';
import { toast } from 'sonner';

const contentSkillSchema = z.object({
  title: z.string().min(2, { message: 'Title must be at least 2 characters long' }).max(100),
  techInput: z.string().min(2, { message: 'Tech must be at least 2 characters long' }).max(1000),
  toolsInput: z.string().min(2, { message: 'Tools must be at least 2 characters long' }).max(1000),
  conceptsInput: z.string().min(2, { message: 'Concepts must be at least 2 characters long' }).max(1000),
  softInput: z.string().min(2, { message: 'Soft must be at least 2 characters long' }).max(1000),
  chartTitle: z.string().min(2, { message: 'Chart title must be at least 2 characters long' }).max(100),
}).transform(data => {
  return {
    ...data,
    tech: data.techInput.split(',').map((tech) => tech.trim()).filter((tech) => tech.length > 0),
    tools: data.toolsInput.split(',').map((tool) => tool.trim()).filter((tool) => tool.length > 0),
    concepts: data.conceptsInput.split(',').map((concept) => concept.trim()).filter((concept) => concept.length > 0),
    soft: data.softInput.split(',').map((soft) => soft.trim()).filter((soft) => soft.length > 0),
  }
})

type ContentSkillFormInput = {
  title: string;
  chartTitle: string;
  techInput: string;
  toolsInput: string;
  conceptsInput: string;
  softInput: string;
}
  

const ContentSkillForm = ({content}: {content: PortfolioContent | null}) => {
  const { skills, setSkills, setContentIsOpen } = useAdmin();

  const form = useForm<ContentSkillFormInput>({
    resolver: zodResolver(contentSkillSchema),
    defaultValues: {
      title: '',
      chartTitle: '',
      techInput: '',
      toolsInput: '',
      conceptsInput: '',
      softInput: '',
    },
  });

  useEffect(() => {
    if (content) {
      form.reset({
        title: content.skills?.title,
        chartTitle: content.skills?.chartTitle,
        techInput: content.skills?.tech.join(', '),
        toolsInput: content.skills?.tools.join(', '),
        conceptsInput: content.skills?.concepts.join(', '),
        softInput: content.skills?.soft.join(', '),
      });
    } else if (skills) {
      form.reset({
        title: skills.title,
        chartTitle: skills.chartTitle,
        techInput: skills.tech.join(', '),
        toolsInput: skills.tools.join(', '),
        conceptsInput: skills.concepts.join(', '),
        softInput: skills.soft.join(', '),
      });
    } else {
      form.reset({
        title: '',
        chartTitle: '',
        techInput: '',
        toolsInput: '',
        conceptsInput: '',
        softInput: '',
      });
    }
  }, [content, form, skills]);

  const onSubmit = (data: ContentSkillFormInput) => {
    setSkills({
      title: data.title,
      chartTitle: data.chartTitle,
      tech: data.techInput.split(',').map((tech) => tech.trim()).filter((tech) => tech.length > 0),
      tools: data.toolsInput.split(',').map((tool) => tool.trim()).filter((tool) => tool.length > 0),
      concepts: data.conceptsInput.split(',').map((concept) => concept.trim()).filter((concept) => concept.length > 0),
      soft: data.softInput.split(',').map((soft) => soft.trim()).filter((soft) => soft.length > 0),
    });
    toast.success('Skills updated successfully');
    setContentIsOpen(null);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='flex flex-col gap-4 border border-gray-200 p-3 rounded-lg shadow-md'>
        <div className='flex justify-between'>
          <h2 className='text-2xl font-bold underline'>Skills</h2>
          <Button type="submit" className='w-fit'>Submit</Button>
        </div>
        <div className='grid grid-cols-2 gap-4'>
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Title</FormLabel>
                <FormControl>
                  <Input placeholder="Title" {...field} className='border-gray-600' />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="techInput"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Tech</FormLabel>
                <FormControl>
                  <Input placeholder="Tech (separate with commas)" {...field} className='border-gray-600' />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="toolsInput"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Tools</FormLabel>
                <FormControl>
                  <Input placeholder="Tools (separate with commas)" {...field} className='border-gray-600' />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="conceptsInput"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Concepts</FormLabel>
                <FormControl>
                  <Input placeholder="Concepts (separate with commas)" {...field} className='border-gray-600' />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="softInput"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Soft</FormLabel>
                <FormControl>
                  <Input placeholder="Soft (separate with commas)" {...field} className='border-gray-600' />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="chartTitle"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Chart Title</FormLabel>
                <FormControl>
                  <Input placeholder="Chart Title" {...field} className='border-gray-600' />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          </div>
      </form>
    </Form>
  )
}

export default ContentSkillForm