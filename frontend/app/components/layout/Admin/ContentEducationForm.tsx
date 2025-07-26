import React, { useEffect } from 'react'
import { z } from 'zod'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '../../ui/form'
import { Education, PortfolioContent } from '@/app/types'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Input } from '../../ui/input'
import { Button } from '../../ui/button'
import { useAdmin } from '@/app/context/AdminContext'
import { Textarea } from '../../ui/textarea'

const educationSchema = z.object({
  institution: z.string().min(2, { message: 'Institution must be at least 2 characters long' }).max(100),
  degree: z.string().min(2, { message: 'Degree must be at least 2 characters long' }).max(100),
  periodStart: z.string().min(2, { message: 'Period start must be at least 2 characters long' }).max(100),
  periodEnd: z.string().min(2, { message: 'Period end must be at least 2 characters long' }).max(100),
  relevantInput: z.string().min(2, { message: 'Relevant must be at least 2 characters long' }).max(1000),
}).transform((data) => ({
  ...data,
  relevant: data.relevantInput.split(',').map((r: string) => r.trim()).filter((r: string) => r.length > 0),
}));

type EducationFormInput = {
  institution: string;
  degree: string;
  periodStart: string;
  periodEnd: string;
  relevantInput: string
};


const ContentEducationForm = ({content}: {content: PortfolioContent | null}) => {
  const { educationId, setEducationId, setEducation, education: currentEducation } = useAdmin();
  const selectedEducation = content?.about?.education?.find((e: Education) => e.id === educationId);

  const form = useForm<EducationFormInput>({
    resolver: zodResolver(educationSchema),
    defaultValues: {
      institution: '',
      degree: '',
      periodStart: '',
      periodEnd: '',
      relevantInput: '',
    },
  })

  useEffect(() => {
    if (selectedEducation) {
      form.reset({
        institution: selectedEducation.institution,
        degree: selectedEducation.degree,
        periodStart: selectedEducation.periodStart,
        periodEnd: selectedEducation.periodEnd,
        relevantInput: selectedEducation.relevant.join(', '),
      });
    } else if (!educationId) {
      form.reset({
        institution: '',
        degree: '',
        periodStart: '',
        periodEnd: '',
        relevantInput: '',
      });
    }
  }, [selectedEducation, educationId, form]);

  const onSubmit = (data: EducationFormInput) => {
    const newEducation = {
      institution: data.institution,
      degree: data.degree,
      periodStart: data.periodStart,
      periodEnd: data.periodEnd,
      relevant: data.relevantInput.split(',').map((r: string) => r.trim()).filter((r: string) => r.length > 0),
    };

    if (educationId) {
      // Update existing education
      const updatedEducation = (currentEducation || []).map(edu => 
        edu.id === educationId ? newEducation : edu
      );
      setEducation(updatedEducation);
    } else {
      // Add new education
      setEducation([...(currentEducation || []), newEducation]);
    }

    // Reset form and close the form
    form.reset();
    setEducationId(null);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='flex flex-col gap-4'>
        <div className='flex justify-between'>
          <h2 className='text-xl font-bold underline'>Education</h2>
          <div className='flex gap-2'>
            {educationId && (
              <Button type="reset" onClick={() => setEducationId(null)} variant="outline">Cancel</Button>
            )}
            <Button type="submit" className='w-fit'>Save</Button>
          </div>
        </div>
        <div className='flex flex-col gap-4 border border-gray-200 p-3 rounded-lg shadow-md'>
          <div className='grid grid-cols-4 gap-4'>
            <FormField
              control={form.control}
              name="institution"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Institution</FormLabel>
                  <FormControl>
                    <Input {...field} className='border-gray-600' placeholder='Institution' />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="degree"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Degree</FormLabel>
                  <FormControl>
                    <Input {...field} className='border-gray-600' placeholder='Degree' />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="periodStart"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Start Date</FormLabel>
                  <FormControl>
                    <Input {...field} className='border-gray-600' placeholder='Start date: mm/yyyy' />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="periodEnd"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>End Date</FormLabel>
                  <FormControl>
                    <Input {...field} className='border-gray-600' placeholder='End date: mm/yyyy' />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <FormField
          control={form.control}
          name="relevantInput"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Relevant</FormLabel>
              <FormControl>
                <Textarea {...field} className='border-gray-600' placeholder='Relevant' />
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

export default ContentEducationForm