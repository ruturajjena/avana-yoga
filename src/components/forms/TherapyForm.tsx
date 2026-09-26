'use client';

import { useActionState } from 'react';
import { submitTherapyMessage } from '@/app/actions/forms';
import { initialFormState } from '@/lib/forms';
import { Field, FormStatus, Honeypot } from './Field';

export function TherapyForm() {
  const [state, action, pending] = useActionState(submitTherapyMessage, initialFormState);
  const v = state.values ?? {};
  const e = state.errors ?? {};

  return (
    <form action={action} noValidate className="relative mt-10 grid gap-10" aria-busy={pending}>
      <Honeypot />
      <div className="grid gap-10 md:grid-cols-2">
        <Field label="Your name" name="name" required autoComplete="name" defaultValue={v.name} error={e.name} />
        <Field label="Your email" name="email" type="email" required autoComplete="email" defaultValue={v.email} error={e.email} />
      </div>
      <Field label="Subject" name="subject" required defaultValue={v.subject} error={e.subject} />
      <Field label="Your message" name="message" as="textarea" rows={6} required defaultValue={v.message} error={e.message} />
      <div className="flex flex-wrap items-center gap-x-8 gap-y-4">
        <button type="submit" className="btn btn--cream" disabled={pending}>
          {pending ? 'Sending…' : 'Send'}
        </button>
        <FormStatus id="therapy-status" message={state.message} tone="dark" />
      </div>
    </form>
  );
}
