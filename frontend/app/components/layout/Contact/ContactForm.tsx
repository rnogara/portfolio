'use client';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '../../ui/form';
import { PortfolioContent } from '@/app/types';
import { Button } from '../../ui/button';
import { Input } from '../../ui/input';
import { Textarea } from '../../ui/textarea';
import { useState } from 'react';
import { Loader2, CheckCircle2, AlertCircle } from 'lucide-react';
import { cn } from '@/app/lib/utils';
import { toast } from 'sonner';

const formSchema = z.object({
  name: z.string().min(2, { message: 'Name must be at least 2 characters long' }).max(100),
  email: z.string().email({ message: 'Please enter a valid email' }),
  message: z.string().min(10, { message: 'Message must be at least 10 characters long' }).max(1000),
});

const ContactForm = ({ contactContent }: { contactContent: PortfolioContent['contact'] }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<null | 'success' | 'error'>(null);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      email: '',
      message: '',
    },
  });

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    setIsSubmitting(true);
    setSubmitStatus(null);
    
    try {
      const response = await fetch('/api/send/', {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        form.reset();
        setSubmitStatus('success');
        setTimeout(() => setSubmitStatus(null), 5000);
        toast.success(contactContent?.formSuccess);
      } else {
        toast.error(contactContent?.formError);
      }
    } catch (error) {
      console.error('Erro ao enviar mensagem:', error);
      setSubmitStatus('error');
      setTimeout(() => setSubmitStatus(null), 5000);
      toast.error(contactContent?.formError);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-6">
        <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel className='text-sm md:text-base font-medium text-gray-200 dark:text-green-400'>
                  {contactContent?.formLabelName}
                </FormLabel>
                <FormControl>
                  <Input 
                    placeholder={contactContent?.formName} 
                    {...field} 
                    className='bg-gray-200/60 dark:bg-black/60 border-gray-300 dark:border-green-400 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-green-400 focus:border-transparent'
                  />
                </FormControl>
                <FormMessage className='text-xs text-red-500 dark:text-red-400'>{contactContent?.formNameError}</FormMessage>
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel className='text-sm md:text-base font-medium text-gray-200 dark:text-green-400'>
                  {contactContent?.formLabelEmail}
                </FormLabel>
                <FormControl>
                  <Input 
                    type="email" 
                    placeholder={contactContent?.formEmail} 
                    {...field} 
                    className='bg-gray-200/60 dark:bg-black/60 border-gray-300 dark:border-green-400 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-green-400 focus:border-transparent'
                  />
                </FormControl>
                <FormMessage className='text-xs text-red-500 dark:text-red-400'>{contactContent?.formEmailError}</FormMessage>
              </FormItem>
            )}
          />
        </div>
        
        <FormField
          control={form.control}
          name="message"
          render={({ field }) => (
            <FormItem>
              <FormLabel className='text-sm md:text-base font-medium text-gray-200 dark:text-green-400'>
                {contactContent?.formLabelMessage}
              </FormLabel>
              <FormControl>
                <Textarea 
                  placeholder={contactContent?.formMessage} 
                  rows={5} 
                  {...field} 
                  className='bg-gray-200/60 dark:bg-black/60 border-gray-300 dark:border-green-400 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-green-400 focus:border-transparent resize-none'
                />
              </FormControl>
              <FormMessage className='text-xs text-red-500 dark:text-red-400'>{contactContent?.formMessageError}</FormMessage>
            </FormItem>
          )}
        />
        
        <div className='flex items-center justify-between pt-2'>
          <div className='text-sm text-gray-500 dark:text-gray-400'>
            {submitStatus === 'success' && (
              <div className='flex items-center space-x-2 text-green-600 dark:text-green-400'>
                <CheckCircle2 className='w-5 h-5' />
                <span>{contactContent?.formSuccess}</span>
              </div>
            )}
            {submitStatus === 'error' && (
              <div className='flex items-center space-x-2 text-red-600 dark:text-red-400'>
                <AlertCircle className='w-5 h-5' />
                <span>{contactContent?.formError}</span>
              </div>
            )}
          </div>
          
          <Button 
            type="submit" 
            disabled={isSubmitting}
            className={cn(
              'p-4 md:p-6 text-[1rem] md:text-[1.2rem] lg:text-[1.5rem] font-[Jura] font-bold rounded-lg transition-colors',
              'bg-transparent border border-green-400 dark:border-green-400 hover:bg-green-400 text-green-400 hover:text-gray-800 dark:text-green-400 dark:hover:text-gray-900',
              'dark:bg-transparent dark:hover:bg-green-400 ',
              'focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-offset-2 dark:focus:ring-offset-gray-900',
              'disabled:opacity-70 disabled:cursor-not-allowed mx-auto'
            )}
          >
            {isSubmitting ? (
              <>
                <Loader2 className='mr-2 h-4 w-4 animate-spin' />
                {'...'}
              </>
            ) : (
              contactContent?.formButton 
            )}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default ContactForm;