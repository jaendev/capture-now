import 'dotenv/config';

export const {
  DATABASE_URL = process.env.DATABASE_URL!,
  NEXTAUTH_SECRET = process.env.NEXTAUTH_SECRET!,
  API_URL = process.env.NEXT_PUBLIC_API_URL!,
} = process.env;


