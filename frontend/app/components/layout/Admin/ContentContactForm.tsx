'use client';
import React, { useEffect } from 'react'
import { z } from 'zod'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '../../ui/form';
import { Input } from '../../ui/input';
import { Button } from '../../ui/button';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useAdmin } from '@/app/context/AdminContext';
import { PortfolioContent } from '@/app/types';
import { toast } from 'sonner';

const formSchema = z.object({
  title: z.string().min(2, { message: 'Title must be at least 2 characters long' }).max(100),
  formName: z.string().min(2, { message: 'Form name must be at least 2 characters long' }).max(100),
  formEmail: z.string().min(2, { message: 'Form email must be at least 2 characters long' }).max(100),
  formMessage: z.string().min(2, { message: 'Form message must be at least 2 characters long' }).max(100),
  formButton: z.string().min(2, { message: 'Form button must be at least 2 characters long' }).max(100),
  formLabelName: z.string().min(2, { message: 'Form label name must be at least 2 characters long' }).max(100),
  formLabelEmail: z.string().min(2, { message: 'Form label email must be at least 2 characters long' }).max(100),
  formLabelMessage: z.string().min(2, { message: 'Form label message must be at least 2 characters long' }).max(100),
  formNameError: z.string().min(2, { message: 'Form name error must be at least 2 characters long' }).max(100),
  formEmailError: z.string().min(2, { message: 'Form email error must be at least 2 characters long' }).max(100),
  formMessageError: z.string().min(2, { message: 'Form message error must be at least 2 characters long' }).max(100),
  formSuccess: z.string().min(2, { message: 'Form success must be at least 2 characters long' }).max(100),
  formError: z.string().min(2, { message: 'Form error must be at least 2 characters long' }).max(100),
  linkedin: z.string().url('Please enter a valid URL'),
  github: z.string().url('Please enter a valid URL'),
  email: z.string().email('Please enter a valid email'),
  phone: z.string().min(2, { message: 'Phone must be at least 2 characters long' }).max(100),
})

const ContentContactForm = ({ content }: { content: PortfolioContent | null }) => {
  const { contact, setContact, setContentIsOpen } = useAdmin();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: '',
      formName: '',
      formEmail: '',
      formMessage: '',
      formButton: '',
      formLabelName: '',
      formLabelEmail: '',
      formLabelMessage: '',
      formNameError: '',
      formEmailError: '',
      formMessageError: '',
      formSuccess: '',
      formError: '',
      linkedin: '',
      github: '',
      email: '',
      phone: '',
    },
  });

  useEffect(() => {
    if (content) {
      form.reset({
        title: content.contact.title,
        formName: content.contact.formName,
        formEmail: content.contact.formEmail,
        formMessage: content.contact.formMessage,
        formButton: content.contact.formButton,
        formLabelName: content.contact.formLabelName,
        formLabelEmail: content.contact.formLabelEmail,
        formLabelMessage: content.contact.formLabelMessage,
        formNameError: content.contact.formNameError,
        formEmailError: content.contact.formEmailError,
        formMessageError: content.contact.formMessageError,
        formSuccess: content.contact.formSuccess,
        formError: content.contact.formError,
        linkedin: content.contact.linkedin,
        github: content.contact.github,
        email: content.contact.email,
        phone: content.contact.phone,
      });
    } else if (contact) {
      form.reset({
        title: contact.title,
        formName: contact.formName,
        formEmail: contact.formEmail,
        formMessage: contact.formMessage,
        formButton: contact.formButton,
        formLabelName: contact.formLabelName,
        formLabelEmail: contact.formLabelEmail,
        formLabelMessage: contact.formLabelMessage,
        formNameError: contact.formNameError,
        formEmailError: contact.formEmailError,
        formMessageError: contact.formMessageError,
        formSuccess: contact.formSuccess,
        formError: contact.formError,
        linkedin: contact.linkedin,
        github: contact.github,
        email: contact.email,
        phone: contact.phone,
      });
    } else {
      form.reset({
        title: '',
        formName: '',
        formEmail: '',
        formMessage: '',
        formButton: '',
        formLabelName: '',
        formLabelEmail: '',
        formLabelMessage: '',
        formNameError: '',
        formEmailError: '',
        formMessageError: '',
        formSuccess: '',
        formError: '',
        linkedin: '',
        github: '',
        email: '',
        phone: '',
      });
    }
  }, [content, contact, form]);

  const onSubmit = (data: z.infer<typeof formSchema>) => {
    setContact(data);
    setContentIsOpen(null);
    toast.success('Contact updated successfully');
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='flex flex-col gap-4 border border-gray-200 p-3 rounded-lg shadow-md'>
        <div className='flex justify-between'>
          <h2 className='text-2xl font-bold underline'>Contact</h2>
          <Button type="submit" className='w-fit'>Submit</Button>
        </div>
        <div className='grid grid-cols-3 gap-4'>
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Contact Title</FormLabel>
                <FormControl>
                  <Input placeholder="Contact title" {...field} className='border-gray-600' />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="formName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Contact Name placeholder</FormLabel>
                <FormControl>
                  <Input placeholder="Contact name placeholder" {...field} className='border-gray-600' />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          /> 
          <FormField
            control={form.control}
            name="formEmail"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Contact Email placeholder</FormLabel>
                <FormControl>
                  <Input placeholder="Contact email placeholder" {...field} className='border-gray-600' />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="formMessage"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Contact Message placeholder</FormLabel>
                <FormControl>
                  <Input placeholder="Contact message placeholder" {...field} className='border-gray-600' />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="formButton"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Contact Button</FormLabel>
                <FormControl>
                  <Input placeholder="Contact button" {...field} className='border-gray-600' />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="formLabelName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Contact Label Name</FormLabel>
                <FormControl>
                  <Input placeholder="Contact label name" {...field} className='border-gray-600' /> 
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="formLabelEmail"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Contact Label Email</FormLabel>
                <FormControl>
                  <Input placeholder="Contact label email" {...field} className='border-gray-600' />
                </FormControl>
                <FormMessage />
                </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="formLabelMessage"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Contact Label Message</FormLabel>
                <FormControl>
                  <Input placeholder="Contact label message" {...field} className='border-gray-600' />
                </FormControl>
                <FormMessage />
              </FormItem>
              )}
          />
          <FormField
            control={form.control}
            name="formNameError"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Contact Name Error</FormLabel>
                <FormControl>
                  <Input placeholder="Contact name error" {...field} className='border-gray-600' />
                </FormControl>
                <FormMessage />
              </FormItem>
              )}
          />
          <FormField
            control={form.control}
            name="formEmailError"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Contact Email Error</FormLabel>
                <FormControl>
                  <Input placeholder="Contact email error" {...field} className='border-gray-600' />
                </FormControl>
                <FormMessage />
              </FormItem>
              )}
          />
          <FormField
            control={form.control}
            name="formMessageError"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Contact Message Error</FormLabel>
                <FormControl>
                  <Input placeholder="Contact message error" {...field} className='border-gray-600' />
                </FormControl>
                <FormMessage />
              </FormItem>
              )}
          />
          <FormField
            control={form.control}
            name="formSuccess"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Contact Success</FormLabel>
                <FormControl>
                  <Input placeholder="Contact success message" {...field} className='border-gray-600' />
                </FormControl>
                <FormMessage />
              </FormItem>
              )}
          />
          <FormField
            control={form.control}
            name="formError"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Contact Error</FormLabel>
                <FormControl>
                  <Input placeholder="Contact error message" {...field} className='border-gray-600' />
                </FormControl>
                <FormMessage />
              </FormItem>
              )}
          />
          <FormField
            control={form.control}
            name="linkedin"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Contact LinkedIn</FormLabel>
                <FormControl>
                  <Input placeholder="Contact linkedin url" {...field} className='border-gray-600' />
                </FormControl>
                <FormMessage />
              </FormItem>
              )}
          />
          <FormField
            control={form.control}
            name="github"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Contact GitHub</FormLabel>
                <FormControl>
                  <Input placeholder="Contact github url" {...field} className='border-gray-600' />
                </FormControl>
                <FormMessage />
              </FormItem>
              )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Contact Email</FormLabel>
                <FormControl>
                  <Input placeholder="Contact email" {...field} className='border-gray-600' />
                </FormControl>
                <FormMessage />
              </FormItem>
              )}
          />
          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Contact Phone</FormLabel>
                <FormControl>
                  <Input placeholder="Contact phone" {...field} className='border-gray-600'/>
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

export default ContentContactForm