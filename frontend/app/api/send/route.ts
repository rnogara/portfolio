import { EmailTemplate } from '@/app/components/templates/EmailTemplate';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);
const sender = process.env.RESEND_SENDER || ''; 
const receiver = process.env.RESEND_RECEIVER || '';

// eslint-disable-next-line import/no-anonymous-default-export
export async function POST(req: Request) {
  try {
    const { name, email, message } = await req.json();
    const { data, error } = await resend.emails.send({
      from: `Portfolio <${sender}>`,
      to: receiver,
      subject: 'Novo Contato',
      react: EmailTemplate({ name, email, message }),
    });

    if (error) {
      return new Response(JSON.stringify({ error }), { status: 400 });
    }

    return new Response(JSON.stringify(data), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify(error), { status: 500 });
  }
}
