import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export interface User {
  id: string;
  email: string;
  displayName?: string;
  photoURL?: string;
  createdAt: Date;
  updatedAt?: Date;
}


export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: fetchBaseQuery({ baseUrl: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api` }),
  endpoints: (builder) => ({
    createUser: builder.mutation<null, User>({
      query: (body) => ({
        url: 'users',
        method: 'POST',
        body,
      }),
    }),
    updateUserData: builder.mutation<null, User>({
      query: (body) => ({
        url: `users/${body.id}`,
        method: 'PUT',
        body,
      }),
    }),
    fetchUserData: builder.query<User, string>({
      query: (userId) => `users/${userId}`,
    }),
  }),
});

export const {useLazyFetchUserDataQuery, useUpdateUserDataMutation, useCreateUserMutation } = authApi;