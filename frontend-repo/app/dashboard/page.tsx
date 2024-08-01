import { useAuth } from '@/hooks/useAuth';
import { notFound } from 'next/navigation';
import DashboardPage from './_components/DashboardPage';

export default async function Dashboard() {
  const { tokens } = await useAuth();

  if (!tokens) {
    notFound();
  }

  return <DashboardPage userId={tokens.decodedToken.uid} />;
}
