import NextAuth, { AuthOptions } from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import axios from 'axios';

export const authOptions: AuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  callbacks: {
    async jwt({ token, user}) {
      if (user) {
        token.id = user.id;
        // Send user info to Django backend
        try {
          await axios.post('http://127.0.0.1:8000/users/google-auth/', {
            data:token,
          });
        } catch (error) {
          console.error('Error sending user info to Django backend', error);
        }
      }
      return token;
    },
    async session({ session, token }) {
      if (token && session.user) {
        session.user.id = token.id as string;
      }
      return session;
    },
    async redirect({ url, baseUrl }) {
      return baseUrl;
    },
  },
};

const handler = NextAuth(authOptions);

// Export named handlers for each HTTP method
export { handler as GET, handler as POST };
