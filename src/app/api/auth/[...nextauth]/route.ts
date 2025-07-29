import NextAuth from 'next-auth';
import Credentials, { CredentialsProvider } from 'next-auth/providers/credentials';

const handler = NextAuth({
  providers: [
    CredentialsProvider({
        name: "Credentials",
        credentials: {
            email: { label:"email", type:"text", placeholder: "Enter your email" },
            password: { label:"password", type:"password", placeholder: "Enter your password"}
    },
    async authorize(credentials, req){
        
    }
)