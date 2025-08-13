import { z } from "zod";

// User schemas
export const registerSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters long"),
})

export const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters long"),
})

export const updateUserSchema = z.object({
  name: z.string().min(1, "Name is required").optional(),
  email: z.string().email("Invalid email address").optional(),
  avatar_url: z.string().url("Invalid URL").optional(),
}).refine(data => data.name || data.email || data.avatar_url, {
  message: "At least one field must be provided",
});

// Note schemas
export const createNoteSchema = z.object({
  title: z.string().min(1, "Title is required").max(255),
  content: z.string().min(1, "Content is required"),
  emoji: z.string().min(1).max(10),
  isFavorite: z.boolean().default(false),
  isArchived: z.boolean().default(false),
})

export const updateNoteSchema = z.object({
  title: z.string().min(1).max(255).optional(),
  content: z.string().min(1).optional(),
  emoji: z.string().min(1).max(10).optional(),
  isFavorite: z.boolean().optional(),
  isArchived: z.boolean().optional(),
})

export const searchNotesSchema = z.object({
  q: z.string().optional(),
  page: z.coerce.number().min(1).default(1),
  limit: z.coerce.number().min(1).max(100).default(10),
  isFavorite: z.boolean().optional(),
  isArchived: z.boolean().optional(),
})

// Tag schemas
export const createTagSchema = z.object({
  name: z.string().min(1).max(50),
  color: z.string().regex(/^#[0-9A-F]{6}$/i, "Invalid color format"),
})