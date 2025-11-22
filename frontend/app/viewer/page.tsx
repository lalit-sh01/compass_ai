import { redirect } from 'next/navigation';

export default function ViewerPage() {
  // Redirect to dashboard when accessing /viewer without an ID
  redirect('/dashboard');
}
