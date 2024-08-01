import { clientConfig, serverConfig } from '@/libs/firebase/config';
import { getTokens } from 'next-firebase-auth-edge';
import { cookies } from 'next/headers';
import React from 'react'

export const useAuth = async () => {
  const tokens = await getTokens(cookies(), {
    apiKey: clientConfig.apiKey,
    cookieName: serverConfig.cookieName,
    cookieSignatureKeys: serverConfig.cookieSignatureKeys,
    serviceAccount: serverConfig.serviceAccount,
  });

  return {
    tokens
  }
}
