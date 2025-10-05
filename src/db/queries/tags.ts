import { db } from "@/src/db"
import { tagsTable } from "@/src/db/schema"
import { CreateTagWithUserDTO } from "@/src/types/Tag"
import { eq } from "drizzle-orm"

export async function createTag(data: CreateTagWithUserDTO) {
  const [tag] = await db
    .insert(tagsTable)
    .values(data)
    .returning()

  return tag
}

export async function createMultipleTags(tags: CreateTagWithUserDTO[]) {
  const createdTags = await db
    .insert(tagsTable)
    .values(tags)
    .returning()

  return createdTags
}

export async function getUserTags(userId: string) {

  console.log(userId);

  const tags = await db
    .select()
    .from(tagsTable)
    .where(eq(tagsTable.userId, userId))

  console.log(
    db.select().from(tagsTable)
  );

  return tags
}

// Default tags for new users
export const defaultTags = [
  { name: 'Work', color: '#8B5CF6' },
  { name: 'Urgent', color: '#EF4444' },
  { name: 'Success', color: '#10B981' },
  { name: 'Creative', color: '#FCD34D' },
  { name: 'Learning', color: '#3B82F6' },
  { name: 'Personal', color: '#F472B6' },
  { name: 'General', color: '#6B7280' }
];

export async function createDefaultTagsForUser(userId: string) {
  const tagsToCreate: CreateTagWithUserDTO[] = defaultTags.map(tag => ({
    ...tag,
    userId
  }));

  return await createMultipleTags(tagsToCreate);
}