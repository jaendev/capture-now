import { CreateUserDTO, UpdateUserDTO } from "@/src/types/User";
import { eq } from "drizzle-orm"
import { usersTable } from "../schema/1-users";
import { db } from "..";
import bcrypt from "bcryptjs";

/**
 * Method to create a new user in the database.
 * @param data - The data to create a new user.
 * @returns user - The created user object.
 */
export async function createUser(data: CreateUserDTO) {
  const hashedPassword = await bcrypt.hash(data.password, 10);

  const [user] = await db
    .insert(usersTable)
    .values({
      ...data,
      password: hashedPassword,
    })
    .returning({
      id: usersTable.id,
      name: usersTable.name,
      email: usersTable.email,
      avatar_url: usersTable.avatar_url,
      createdAt: usersTable.createdAt,
    });

  return user
}

/**
 * Method to retrieve a user by their ID.
 * @param id - The ID of the user to retrieve.
 * @returns user by ID - The user object if found, otherwise undefined.
 */
export async function getUserById(id: string) {
  const [user] = await db
    .select()
    .from(usersTable)
    .where(eq(usersTable.id, id))
    .limit(1);

  return user;
}

/**
 * Method to retrieve a user by their email.
 * @param email - The email of the user to retrieve.
 * @returns user by email - The user object if found, otherwise undefined.
 */
export async function getUserByEmail(email: string) {
  const [user] = await db
    .select()
    .from(usersTable)
    .where(eq(usersTable.email, email))
    .limit(1);

  return user;
}

/**
 * Method to update a user in the database.
 * @param data - The data to update the user.
 * @returns user updated - The updated user object.
 */
export async function updateUser(id: string, data: UpdateUserDTO) {
  const [user] = await db
    .update(usersTable)
    .set({
      ...data,
      updatedAt: new Date(),
    })
    .where(eq(usersTable.id, id))
    .returning({
      id: usersTable.id,
      name: usersTable.name,
      email: usersTable.email,
      avatar_url: usersTable.avatar_url,
      updatedAt: usersTable.updatedAt,
    })

  return user
} 