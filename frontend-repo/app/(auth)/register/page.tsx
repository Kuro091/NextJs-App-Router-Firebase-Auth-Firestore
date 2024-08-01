'use client';

import { FormEvent, useState } from 'react';
import Link from 'next/link';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { useRouter } from 'next/navigation';
import { useCreateUserMutation } from '@/apis/authApi';
import { Container, Box, TextField, Button, Typography, Alert } from '@mui/material';
import { getFirebaseAuth } from '@/libs/firebase';

export default function Register() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmation, setConfirmation] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const [createUserInTheBackend] = useCreateUserMutation();

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();
    const auth = getFirebaseAuth();

    setError('');

    if (password !== confirmation) {
      setError("Passwords don't match");
      return;
    }

    try {
      const newUser = await createUserWithEmailAndPassword(auth, email, password);
      await createUserInTheBackend({
        id: newUser.user.uid,
        email,
        createdAt: new Date(),
      });

      router.push('/login');
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
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          padding: (theme) => theme.spacing(3),
        }}
      >
        <Typography component='h1' variant='h5'>
          Register
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
          <TextField
            variant='outlined'
            margin='normal'
            required
            fullWidth
            name='confirm-password'
            label='Confirm Password'
            type='password'
            id='confirm-password'
            value={confirmation}
            onChange={(e) => setConfirmation(e.target.value)}
          />
          <Button type='submit' fullWidth variant='contained' sx={{ mt: 2, mb: 2 }}>
            Register
          </Button>
          <Typography variant='body2' color='textSecondary' align='center'>
            Already have an account?{' '}
            <Link href='/login' passHref>
              <Button color='primary'>Login here</Button>
            </Link>
          </Typography>
        </Box>
      </Box>
    </Container>
  );
}
