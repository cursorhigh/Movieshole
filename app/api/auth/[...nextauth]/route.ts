
import NextAuth, { AuthOptions, User } from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import Credentials from 'next-auth/providers/credentials';
import axios from 'axios';
//import { useRouter } from 'next/router';

export const authOptions: AuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    Credentials({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      authorize: async (credentials, req) => {
        try {
          let postUrl = '';
          const referer = req?.headers?.referer || '';

          if (referer.includes('/login')) {
              postUrl = 'http://127.0.0.1:8000/users/loginnow/';
          } else if (referer.includes('localhost:3000/signup')) {
              postUrl = 'http://127.0.0.1:8000/users/signnow/';
          } else {
              throw new Error('Unknown request source');
          }
          const response = await axios.post(postUrl, {
            email: credentials?.email,
            password: credentials?.password,
          });
          const data = response.data;
          if (response.status === 200) {
            return { id: response.data.id, username: response.data.username, email: response.data.email } as User;
          } else {
            throw new Error(data.message || 'Authentication failed'); 
          }
        } catch (error: any) {
          console.error('Error in Credentials authorization:', error);
          let errorMessage = 'Authentication failed';
          if (error.response && error.response.data && error.response.data.message) {
            errorMessage = error.response.data.message;
          }
          throw new Error(errorMessage);
        }
      },
    }),
  ],
  session: {
    strategy: 'jwt',
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
