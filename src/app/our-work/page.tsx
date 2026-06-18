import { redirect } from 'next/navigation';

/** Legacy URL — portfolio lives at /portfolio */
export default function OurWorkRedirectPage() {
  redirect('/portfolio');
}
