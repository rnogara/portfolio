'use client';
import React, { useEffect } from 'react'
import { z } from 'zod'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '../../ui/form';
import { Input } from '../../ui/input';
import { Button } from '../../ui/button';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useAdmin } from '@/app/context/AdminContext';
import { Experience, PortfolioContent } from '@/app/types';
import { Textarea } from '../../ui/textarea';

const experienceSchema = z.object({
  company: z.string().min(2, { message: 'Company must be at least 2 characters long' }).max(100),
  title: z.string().min(2, { message: 'Position must be at least 2 characters long' }).max(100),
  periodStart: z.string().min(2, { message: 'Period start must be at least 2 characters long' }).max(100),
  periodEnd: z.string().min(2, { message: 'Period end must be at least 2 characters long' }).max(100),
  description: z.string().min(2, { message: 'Description must be at least 2 characters long' }).max(1000),
})

const ContentExperienceForm = ({content}: {content: PortfolioContent | null}) => {
  const { experienceId, setExperienceId, setExperience, experience: currentExperience } = useAdmin();
  const selectedExperience = content?.about?.experience?.find((e: Experience) => e.id === experienceId);

  const form = useForm<z.infer<typeof experienceSchema>>({
    resolver: zodResolver(experienceSchema),
    defaultValues: {
      company: '',
      title: '',
      periodStart: '',
      periodEnd: '',
      description: '',
    },
  });

  useEffect(() => {
    if (selectedExperience) {
      form.reset({
        company: selectedExperience.company,
        title: selectedExperience.title,
        periodStart: selectedExperience.periodStart,
        periodEnd: selectedExperience.periodEnd,
        description: selectedExperience.description,
      });
    } else if (!experienceId) {
      form.reset({
        company: '',
        title: '',
        periodStart: '',
        periodEnd: '',
        description: '',
      });
    }
  }, [selectedExperience, experienceId, form]);

  const onSubmit = (data: z.infer<typeof experienceSchema>) => {
    const newExperience = {
      company: data.company,
      title: data.title,
      periodStart: data.periodStart,
      periodEnd: data.periodEnd,
      description: data.description,
    };

    if (experienceId) {
      // Update existing experience
      const updatedExperience = (currentExperience || []).map(exp => 
        exp.id === experienceId ? newExperience : exp
      );
      setExperience(updatedExperience);
    } else {
      // Add new experience
      setExperience([...(currentExperience || []), newExperience]);
    }

    // Reset form and close the form
    form.reset();
    setExperienceId(null);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='flex flex-col gap-4'>
        <div className='flex justify-between'>
          <h2 className='text-xl font-bold underline'>Experience</h2>
          <div className='flex gap-2'>
            {experienceId && (
              <Button type="reset" onClick={() => setExperienceId(null)} variant="outline">Cancel</Button>
            )}
            <Button type="submit" className='w-fit'>Save</Button>
          </div>
        </div>
        <div className='flex flex-col gap-4 border border-gray-200 p-3 rounded-lg shadow-md'>
          <div className='grid grid-cols-4 gap-4'>
            <FormField control={form.control} name="company" render={({ field }) => (
              <FormItem>
                <FormLabel>Company</FormLabel>
                <FormControl>
                  <Input {...field} className='border-gray-600' placeholder='Company name' />
                </FormControl>
                <FormMessage />
              </FormItem>
            )} />
            <FormField control={form.control} name="title" render={({ field }) => (
              <FormItem>
                <FormLabel>Position</FormLabel>
                <FormControl>
                  <Input {...field} className='border-gray-600' placeholder='Position' />
                </FormControl>
                <FormMessage />
              </FormItem>
            )} />
            <FormField control={form.control} name="periodStart" render={({ field }) => (
              <FormItem>
                <FormLabel>Period Start</FormLabel>
                <FormControl>
                  <Input {...field} className='border-gray-600' placeholder='Start date: mm/yyyy' />
                </FormControl>
                <FormMessage />
              </FormItem>
            )} />
            <FormField control={form.control} name="periodEnd" render={({ field }) => (
              <FormItem>
                <FormLabel>Period End</FormLabel>
                <FormControl>
                  <Input {...field} className='border-gray-600' placeholder='End date: mm/yyyy' />
                </FormControl>
                <FormMessage />
              </FormItem>
            )} />
          </div>
          <FormField control={form.control} name="description" render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea {...field} className='border-gray-600' placeholder='Description' />
              </FormControl>
              <FormMessage />
            </FormItem>
          )} /> 
        </div>
      </form>
    </Form>
  )
}

export default ContentExperienceForm