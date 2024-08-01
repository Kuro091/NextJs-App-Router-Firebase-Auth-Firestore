import { useAuth } from '@/hooks/useAuth';
import { Button, Container } from '@mui/material';
import Image from 'next/image';

export default async function Home() {
  const { tokens } = await useAuth();

  if (!tokens) {
    return (
      <Container
        maxWidth='sm'
        style={{
          display: 'flex',
          minHeight: '100vh',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          gap: 40,
          paddingTop: 24,
          paddingBottom: 24,
        }}
      >
        <Button variant='contained' color='primary' href='/register' size='large'>
          Register
        </Button>

        <Button variant='contained' color='primary' href='/login' size='large'>
          Login
        </Button>
      </Container>
    );
  }

  return (
    <Container
      maxWidth='sm'
      style={{
        display: 'flex',
        minHeight: '100vh',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 40,
        paddingTop: 24,
        paddingBottom: 24,
      }}
    >
      <Button variant='contained' color='primary' href='/dashboard' size='large'>
        Dashboard
      </Button>
    </Container>
  );
}
