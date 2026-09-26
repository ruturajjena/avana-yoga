'use client';

import { useActionState } from 'react';
import { unlockDownloads } from '@/app/actions/forms';
import { initialFormState } from '@/lib/forms';
import { Field, FormStatus } from './Field';

export function DownloadsGate() {
  const [state, action, pending] = useActionState(unlockDownloads, initialFormState);
  return (
    <form action={action} noValidate className="grid max-w-md gap-10">
      <p className="type-body-l text-ink/75">This content is password protected. To view it please enter your password below:</p>
      <Field label="Password" name="password" type="password" required autoComplete="current-password" error={state.errors?.password} />
      <div className="flex flex-wrap items-center gap-x-8 gap-y-4">
        <button type="submit" className="btn btn--ink" disabled={pending}>
          {pending ? 'Checking…' : 'Enter'}
        </button>
        {state.errors?.password ? null : <FormStatus id="downloads-status" message={state.message} />}
      </div>
    </form>
  );
}
