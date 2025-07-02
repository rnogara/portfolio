'use client';
import { zodResolver } from '@hookform/resolvers/zod';
import React from 'react'
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Form, FormControl, FormField, FormItem, FormLabel } from '../../ui/form';
import { PortfolioContent } from '@/app/types';
import { Button } from '../../ui/button';
import { Input } from '../../ui/input';
import { Textarea } from '../../ui/textarea';

const formSchema = z.object({
  name: z.string().min(2).max(100),
  email: z.string().email().nonempty(),
  message: z.string().min(10).max(1000),
})

const ContactForm = ({ contactContent }: { contactContent: PortfolioContent['contact'] }) => {

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      email: '',
      message: '',
    },
  })

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    const response = await fetch('/api/send/', {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
      },
    })

    if (response.ok) {
      form.reset()
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 flex flex-col items-center">
        <div className='flex flex-col md:flex-row gap-4'>
          <FormField
            control={form.control}
            name="name" 
            render={({ field }) => (
              <FormItem>
                <FormLabel className='text-green-400 pl-2 text-[1rem] font-[Orbitron]'>{contactContent?.formLabelName}</FormLabel>
                <FormControl>
                  <Input placeholder={contactContent?.formName} {...field} className='border-green-400 text-green-400 placeholder:text-green-400/50 h-10 bg-black' />
                </FormControl>
                {form.formState.errors.name && <p className='font-bold text-red-400 text-sm pt-1 pl-1'>{contactContent?.formNameError}</p>}
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email" 
            render={({ field }) => (
              <FormItem>
                <FormLabel className='text-green-400 pl-2 text-[1rem] font-[Orbitron]'>{contactContent?.formLabelEmail}</FormLabel>
                <FormControl>
                  <Input placeholder={contactContent?.formEmail} {...field} className='border-green-400 text-green-400 placeholder:text-green-400/50 h-10 bg-black' />
                </FormControl>
                  {form.formState.errors.email && <p className='font-bold text-red-400 text-sm pt-1 pl-1'>{contactContent?.formEmailError}</p>}
              </FormItem>
            )}
          />
        </div>
        <FormField
          control={form.control}
          name="message"
          render={({ field }) => (
            <FormItem className='w-full'>
              <FormLabel className='text-green-400 pl-2 text-[1rem] font-[Orbitron]'>{contactContent?.formLabelMessage}</FormLabel>
                <FormControl>
                <Textarea placeholder={contactContent?.formMessage} {...field} className='border-green-400 text-green-400 placeholder:text-green-400/50 h-52 md:h-40 bg-black' />
              </FormControl>
                {form.formState.errors.message && <p className='font-bold text-red-400 text-sm pt-1 pl-1'>{contactContent?.formMessageError}</p>}
            </FormItem>
          )}
        />
        <Button type="submit" className='w-fit p-6 text-2xl bg-transparent border border-green-400 text-green-400 hover:bg-green-400 hover:text-black transition-all duration-300 ease-in-out hover:cursor-pointer font-[Orbitron]'>{contactContent?.formButton}</Button>
      </form>
    </Form>
  )
}

export default ContactForm