import * as React from 'react';

interface EmailTemplateProps {
  name: string;
  email: string;
  message: string;
}

export function EmailTemplate({ name, email, message }: EmailTemplateProps) {
  return (
    <div>
      <h1>{name} Acabou de fazer contato!</h1>
      <p>Email: {email}</p>
      <p>Mensagem:</p>
      <p>{message}</p>
    </div>
  );
}