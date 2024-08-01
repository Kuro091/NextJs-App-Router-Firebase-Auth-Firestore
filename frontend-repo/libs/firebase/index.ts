import { getApp, getApps, initializeApp } from 'firebase/app';
import { clientConfig } from './config';
import { Auth, connectAuthEmulator, getAuth, GoogleAuthProvider, inMemoryPersistence, setPersistence, signInWithPopup } from '@firebase/auth';

export const googleAuthProvider = new GoogleAuthProvider();

export function signInWithGoogle(auth: Auth): ReturnType<typeof signInWithPopup> {
  return signInWithPopup(auth, googleAuthProvider);
}

export const getFirebaseApp = () => {
  if (getApps().length) {
    return getApp();
  }

  const app = initializeApp(clientConfig);

  return app;
};

export function getFirebaseAuth() {
  const auth = getAuth(getFirebaseApp());

  // App relies only on server token. We make sure Firebase does not store credentials in the browser.
  // See: https://github.com/awinogrodzki/next-firebase-auth-edge/issues/143
  setPersistence(auth, inMemoryPersistence);

  if (process.env.NEXT_PUBLIC_EMULATOR_HOST) {
    // https://stackoverflow.com/questions/73605307/firebase-auth-emulator-fails-intermittently-with-auth-emulator-config-failed
    (auth as unknown as any)._canInitEmulator = true;
    connectAuthEmulator(auth, process.env.NEXT_PUBLIC_EMULATOR_HOST, {
      disableWarnings: true
    });
  }

  return auth;
}