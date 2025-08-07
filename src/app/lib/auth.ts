import GoogleProvider from 'next-auth/providers/google'
import GitHubProvider from 'next-auth/providers/github'
import type { Session, User } from 'next-auth'
import type { JWT } from 'next-auth/jwt'

/*
Shared NextAuth configuration that can be used across the app
This allows us to use the same config in both the API route and server-side session checks
JWT (JSON Web Token) is a digital ID card that contains user info
*/

export const authOptions = {
  // Configure OAuth providers for authentication
  providers: [
    // Google OAuth provider
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    // GitHub OAuth provider
    GitHubProvider({
      clientId: process.env.GITHUB_ID!,
      clientSecret: process.env.GITHUB_SECRET!,
    }),
  ],
  // Callback functions to customize the authentication flow
  callbacks: {
    // Session callback - runs whenever we check if a user is logged in
    // Adds the user ID from the JWT token to the session object
    session: async ({ session, token }: { session: Session; token: JWT }) => {
      if (session?.user) {
        session.user.id = token.sub!; // token.sub contains the user's unique ID
      }
      return session;
    },
    // JWT callback - runs whenever a JWT is created
    // Stores the user ID in the token for later use
    jwt: async ({ user, token }: { user?: User; token: JWT }) => {
      if (user) {
        token.uid = user.id; // Store user ID in the token
      }
      return token;
    },
  },
  // Use JWT strategy instead of database sessions for simplicity
  session: {
    strategy: 'jwt' as const,
  },
}