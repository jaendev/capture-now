ALTER TABLE "users" ALTER COLUMN "avatar_url" SET DEFAULT '/uploads/avatars/boy.png';--> statement-breakpoint
ALTER TABLE "notes" ALTER COLUMN "emoji" DROP NOT NULL;