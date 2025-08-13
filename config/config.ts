import dotenv from 'dotenv';
dotenv.config();

export const {
  DATABASE_URL = process.env.DATABASE_URL!,
  NEXTAUTH_SECRET = process.env.NEXTAUTH_SECRET!,
} = process.env;

