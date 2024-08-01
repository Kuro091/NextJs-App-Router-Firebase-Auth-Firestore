'use client';

import { useState, useEffect } from 'react';
import { signOut } from 'firebase/auth';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Container from '@mui/material/Container';
import { useLazyFetchUserDataQuery, useUpdateUserDataMutation } from '@/apis/authApi';
import { useRouter } from 'next/navigation';
import { getFirebaseAuth } from '@/libs/firebase';

interface DashboardPageProps {
  userId: string;
}

export default function DashboardPage({ userId }: DashboardPageProps) {
  const [displayName, setDisplayName] = useState('');
  const [fetchUserData, { data: userData, isSuccess: isFetchSuccess }] =
    useLazyFetchUserDataQuery();
  const [updateUserData, { isLoading, isSuccess: isUpdateSuccess }] = useUpdateUserDataMutation();
  const router = useRouter();

  // Fetch user data initially and when userId changes, initialize displayName if fetched
  useEffect(() => {
    fetchUserData(userId);
  }, [userId, fetchUserData]);

  useEffect(() => {
    if (isFetchSuccess && userData) {
      setDisplayName(userData.displayName || '');
    }
  }, [userData, isFetchSuccess]);

  async function handleLogout() {
    const auth = getFirebaseAuth();

    await signOut(auth);
    await fetch('/api/logout');
    router.push('/login');
  }

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    if (!userData) return;
    await updateUserData({ ...userData, displayName });
  }

  async function handleFetchUser() {
    fetchUserData(userId);
  }

  console.log(userData);
  return (
    <Container
      component='main'
      sx={{
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Box sx={{ textAlign: 'center', width: '100%' }}>
        <Typography variant='h4' component='h1' gutterBottom>
          Hello {userData?.email} with displayName of {userData?.displayName}
        </Typography>

        <Button onClick={handleFetchUser} variant='outlined' sx={{ mt: 1, mb: 2 }}>
          Refresh User Data
        </Button>

        <form onSubmit={handleSubmit} style={{ margin: '20px 0' }}>
          <TextField
            fullWidth
            label='Update Display Name'
            variant='outlined'
            value={displayName}
            onChange={(e) => setDisplayName(e.target.value)}
            sx={{ mb: 2 }}
          />
          <Button type='submit' variant='contained' disabled={isLoading}>
            Update Profile
          </Button>
          {isUpdateSuccess && (
            <Typography color='primary' variant='body2' sx={{ mt: 2 }}>
              Display Name Updated Successfully!
            </Typography>
          )}
        </form>
        <Button onClick={handleLogout} variant='contained' color='secondary' sx={{ mt: 3 }}>
          Logout
        </Button>
      </Box>
    </Container>
  );
}
