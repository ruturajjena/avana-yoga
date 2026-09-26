'use server';

import { timingSafeEqual } from 'node:crypto';
import { cookies, headers } from 'next/headers';
import { redirect } from 'next/navigation';
import { DOWNLOADS_COOKIE, downloadsToken } from '@/lib/downloads';
import {
  DELIVERY_FAILED_MESSAGE,
  RATE_LIMIT_MESSAGE,
  isEmail,
  readField,
  type FieldErrors,
  type FormState,
} from '@/lib/forms';
import { deliverSubmission } from '@/lib/mailer';
import { allowSubmission } from '@/lib/rate-limit';

async function clientKey(scope: string) {
  const list = await headers();
  const ip = list.get('x-forwarded-for')?.split(',')[0]?.trim() || list.get('x-real-ip') || 'anonymous';
  return `${scope}:${ip}`;
}

const invalid = (errors: FieldErrors, values: Record<string, string>): FormState => ({
  status: 'error',
  message: 'Please check the highlighted fields.',
  errors,
  values,
});

/* ───────────── Yoga therapy (“Leave us a message”) ───────────── */
export async function submitTherapyMessage(_previous: FormState, formData: FormData): Promise<FormState> {
  if (readField(formData, 'company')) redirect('/thank-you/');

  const values = {
    name: readField(formData, 'name', 120),
    email: readField(formData, 'email', 160),
    subject: readField(formData, 'subject', 200),
    message: readField(formData, 'message', 5000),
  };
  const errors: FieldErrors = {};
  if (!values.name) errors.name = 'Please enter your name.';
  if (!isEmail(values.email)) errors.email = 'Please enter a valid email address.';
  if (!values.subject) errors.subject = 'Please add a subject.';
  if (values.message.length < 2) errors.message = 'Please write a short message.';
  if (Object.keys(errors).length) return invalid(errors, values);
  if (!allowSubmission(await clientKey('therapy'))) return { status: 'error', message: RATE_LIMIT_MESSAGE, values };

  const result = await deliverSubmission({
    form: 'Yoga therapy message',
    subject: `Website Yoga therapy: ${values.subject}`,
    replyTo: values.email,
    fields: [
      ['Name', values.name],
      ['Email', values.email],
      ['Subject', values.subject],
      ['Message', values.message],
    ],
  });
  if (!result.ok) return { status: 'error', message: DELIVERY_FAILED_MESSAGE, values };
  redirect('/thank-you/');
}

/* ───────────── Downloads password gate ───────────── */
export async function unlockDownloads(_previous: FormState, formData: FormData): Promise<FormState> {
  const expected = process.env.DOWNLOADS_PASSWORD;
  const password = readField(formData, 'password', 200);
  if (!expected) {
    return { status: 'error', message: 'Downloads are shared directly with students at the moment. Please email info@avanayoga.com for access.' };
  }
  const given = Buffer.from(downloadsToken(password));
  const wanted = Buffer.from(downloadsToken(expected));
  if (!password || given.length !== wanted.length || !timingSafeEqual(given, wanted)) {
    return { status: 'error', message: 'That password is not correct.', errors: { password: 'That password is not correct.' } };
  }
  const store = await cookies();
  store.set(DOWNLOADS_COOKIE, downloadsToken(expected), {
    httpOnly: true,
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
    path: '/downloads',
    maxAge: 60 * 60 * 24 * 7,
  });
  redirect('/downloads/');
}
