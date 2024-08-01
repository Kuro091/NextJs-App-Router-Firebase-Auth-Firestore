'use client';

import { FormEvent, useState } from 'react';
import Link from 'next/link';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { Container, Box, TextField, Button, Typography, Alert } from '@mui/material';
import { useRouter } from 'next/navigation';
import { getFirebaseAuth } from '@/libs/firebase';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();
    const auth = getFirebaseAuth();

    setError('');

    try {
      const credential = await signInWithEmailAndPassword(auth, email, password);
      const idToken = await credential.user.getIdToken();

      await fetch('/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${idToken}`,
        },
      });

      router.push('/dashboard');
    } catch (e) {
      setError((e as Error).message);
    }
  }

  return (
    <Container
      component='main'
      sx={{ height: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}
    >
      <Box
        sx={{
          width: 400,
          margin: 'auto',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Typography component='h1' variant='h5'>
          Login
        </Typography>
        <Box component='form' onSubmit={handleSubmit} sx={{ mt: 1, width: '100%' }}>
          {error && (
            <Alert severity='error' sx={{ width: '100%', mb: 2 }}>
              {error}
            </Alert>
          )}
          <TextField
            variant='outlined'
            margin='normal'
            required
            fullWidth
            id='email'
            label='Email Address'
            name='email'
            autoComplete='email'
            autoFocus
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            variant='outlined'
            margin='normal'
            required
            fullWidth
            name='password'
            label='Password'
            type='password'
            id='password'
            autoComplete='current-password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button type='submit' fullWidth variant='contained' sx={{ mt: 2, mb: 2 }}>
            Enter
          </Button>
          <Typography variant='body2' color='textSecondary' align='center'>
            No account?{' '}
            <Link href='/register' passHref>
              <Button color='primary'>Register here</Button>
            </Link>
          </Typography>
        </Box>
      </Box>
    </Container>
  );
}
