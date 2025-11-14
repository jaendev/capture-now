# 🌧️ Drizzle Commands Documentation - Capture Now Project

## 📋 Project Overview
This documentation covers Drizzle ORM usage for the **Capture Now** note-taking application with PostgreSQL database.

**Current Database Status:**
- ✅ Initial migration applied: `0000_dapper_blue_blade.sql`
- ✅ 6 Tables created: users, notes, tags, note_tags, user_settings, daily_stats
- ✅ All indexes and foreign keys established

---

## ⚡ Quick Command Reference

| Command | NPM Script | Purpose |
|---------|------------|---------|
| `npm run db:generate` | Generate migrations | After schema changes |
| `npm run db:migrate` | Apply migrations | Deploy to database |
| `npm run db:push` | Push schema directly | Development only |
| `npm run db:studio` | Open database GUI | Browse/edit data |
| `npm run test:env` | Test environment | Verify DATABASE_URL |

---

## 📁 Project Structure

```
capture-now/
├── drizzle/                          # Migration files
│   ├── 0000_dapper_blue_blade.sql   # ✅ Applied
│   └── meta/                         # Migration metadata
├── src/db/
│   ├── index.ts                      # Database connection
│   └── schema/                       # Schema definitions
│       ├── index.ts                  # Export all schemas
│       ├── 1-users.ts               # Users table
│       ├── 2-notes.ts               # Notes table
│       ├── 3-tags.ts                # Tags table
│       ├── 4-note_tags.ts           # Many-to-many relation
│       ├── 5-user_settings.ts       # User preferences
│       └── 6-daily_stats.ts         # Analytics data
├── drizzle.config.ts                 # Drizzle configuration
├── .env                             # Environment variables
└── .env.local                       # Local development env
```

---

## 🔧 Environment Setup

**Database Connection:**
```bash
# .env and .env.local
DATABASE_URL="postgresql://root:root@localhost:5432/capturenow_db"
```

**Verify Environment:**
```bash
npm run test:env
# Should output: DATABASE_URL: postgresql://root:root@localhost:5432/capturenow_db
```

---

## 🚀 Daily Development Workflow

### 1. **Starting Development**
```bash
# Start PostgreSQL (if using Docker)
docker-compose up -d

# Verify database connection
npm run test:env

# Open database browser
npm run db:studio
# Opens: http://localhost:4983
```

### 2. **Making Schema Changes**

**Example: Adding a new field to notes table**

1. **Edit schema file:**
```typescript
// src/db/schema/2-notes.ts
export const notesTable = pgTable("notes", {
  // ... existing fields
  priority: varchar({ length: 10 }).default('medium'), // ← New field
  // ... rest of fields
});
```

2. **Generate migration:**
```bash
npm run db:generate
# Creates: drizzle/0001_new_migration_name.sql
```

3. **Review the generated SQL:**
```bash
cat drizzle/0001_*.sql
# Verify the changes look correct
```

4. **Apply migration:**
```bash
npm run db:migrate
# ✅ Migration applied to database
```

### 3. **Quick Prototyping (Development Only)**

For rapid experimentation without formal migrations:

```bash
# Push schema changes directly
npm run db:push
# ⚠️ Only use in development!
# ⚠️ No migration file created
```

---

## 📊 Database Management

### **Current Database Schema**

**Tables Created:**
- `users` - User accounts and profiles
- `notes` - User notes with content and metadata  
- `tags` - Categorization tags
- `note_tags` - Many-to-many note-tag relationships
- `user_settings` - User preferences and configuration
- `daily_stats` - Analytics and usage statistics

**Key Features:**
- ✅ UUID primary keys
- ✅ Cascading deletes for data integrity
- ✅ Optimized indexes for performance
- ✅ Unique constraints for data consistency

### **Browse Database**
```bash
npm run db:studio
```

**Drizzle Studio Features:**
- 📊 View all tables and data
- ✏️ Edit records directly
- 🔍 Execute custom queries
- 📈 Visualize relationships
- 📤 Export data

---

## 🔄 Common Operations

### **Add New Table**

1. **Create schema file:**
```bash
touch src/db/schema/7-new_table.ts
```

2. **Define table:**
```typescript
// src/db/schema/7-new_table.ts
import { pgTable, uuid, varchar, timestamp } from 'drizzle-orm/pg-core';

export const newTable = pgTable("new_table", {
  id: uuid().primaryKey().defaultRandom(),
  name: varchar({ length: 255 }).notNull(),
  createdAt: timestamp('created_at').defaultNow(),
});
```

3. **Export in index:**
```typescript
// src/db/schema/index.ts
export * from './7-new_table'; // Add this line
```

4. **Generate and apply:**
```bash
npm run db:generate
npm run db:migrate
```

### **Modify Existing Table**

1. **Edit schema file:**
```typescript
// Example: Add field to users table
export const usersTable = pgTable("users", {
  // ... existing fields
  phone: varchar({ length: 20 }), // ← New field
});
```

2. **Generate migration:**
```bash
npm run db:generate
```

3. **Review and apply:**
```bash
# Check the generated SQL
cat drizzle/0001_*.sql

# Apply if correct
npm run db:migrate
```

### **Data Seeding**

Create a seed script for development data:

```bash
# Create seed file
touch src/db/seed.ts
```

```typescript
// src/db/seed.ts
import { db } from './index';
import { usersTable, notesTable } from './schema';

async function seed() {
  // Insert sample users
  const users = await db.insert(usersTable).values([
    {
      name: 'Brian Jaén',
      email: 'brian@example.com',
      avatarUrl: 'https://avatar.url',
    }
  ]).returning();

  // Insert sample notes
  await db.insert(notesTable).values([
    {
      userId: users[0].id,
      title: 'Welcome Note',
      content: 'Welcome to Capture Now!',
      emoji: '👋',
    }
  ]);

  console.log('✅ Seed data inserted');
}

seed().catch(console.error);
```

**Add to package.json:**
```json
{
  "scripts": {
    "db:seed": "tsx src/db/seed.ts"
  }
}
```

**Run seeding:**
```bash
npm run db:seed
```

---

## 🚨 Production Workflows

### **Deploying to Production**

1. **Verify migrations locally:**
```bash
npm run db:generate
npm run db:migrate
npm run db:studio # Verify changes
```

2. **Test migrations on staging:**
```bash
DATABASE_URL=$STAGING_DATABASE_URL npm run db:migrate
```

3. **Backup production:**
```bash
pg_dump $PROD_DATABASE_URL > backup_$(date +%Y%m%d_%H%M%S).sql
```

4. **Deploy to production:**
```bash
DATABASE_URL=$PROD_DATABASE_URL npm run db:migrate
```

### **Rolling Back (Emergency)**

If you need to rollback a migration:

1. **Check migration history:**
```bash
# View applied migrations in database
psql $DATABASE_URL -c "SELECT * FROM __drizzle_migrations;"
```

2. **Manual rollback:**
```sql
-- Example: Remove a column that was added
ALTER TABLE notes DROP COLUMN priority;
-- Remove migration record
DELETE FROM __drizzle_migrations WHERE hash = 'migration_hash';
```

---

## 🐛 Troubleshooting

### **Common Issues**

**1. Environment Variable Not Loaded**
```bash
# Test environment
npm run test:env

# Should output your DATABASE_URL
# If undefined, check .env file exists and is properly formatted
```

**2. Migration Generation Fails**
```bash
# Check schema syntax
npx tsc --noEmit

# Verify database connection
psql $DATABASE_URL -c "SELECT 1;"
```

**3. Migration Apply Fails**
```bash
# Check if database exists
psql $DATABASE_URL -c "\l"

# Check if user has permissions
psql $DATABASE_URL -c "\du"
```

**4. Studio Won't Open**
```bash
# Check if port 4983 is available
lsof -i :4983

# Kill conflicting process if needed
kill $(lsof -t -i:4983)
```

### **Reset Database (Development)**

**Complete reset:**
```bash
# Drop all tables
psql $DATABASE_URL -c "DROP SCHEMA public CASCADE; CREATE SCHEMA public;"

# Re-apply all migrations
npm run db:migrate

# Re-seed data
npm run db:seed
```

---

## 📋 Package.json Scripts Reference

```json
{
  "scripts": {
    "db:generate": "drizzle-kit generate",     // Create migration files
    "db:migrate": "drizzle-kit migrate",       // Apply migrations
    "db:push": "drizzle-kit push",            // Push schema (dev only)
    "db:studio": "drizzle-kit studio",        // Open database GUI
    "test:env": "node test-env.mjs"           // Test environment
  }
}
```

**Additional Useful Scripts:**
```json
{
  "scripts": {
    "db:seed": "tsx src/db/seed.ts",
    "db:check": "drizzle-kit check",
    "db:pull": "drizzle-kit pull",
    "db:reset": "npm run db:drop && npm run db:migrate && npm run db:seed"
  }
}
```

---

## 🔐 Security Best Practices

1. **Environment Variables:**
   - ✅ Never commit `.env` files
   - ✅ Use strong database passwords
   - ✅ Restrict database access by IP

2. **Migrations:**
   - ✅ Always backup before production migrations
   - ✅ Test migrations on staging first
   - ✅ Review generated SQL before applying

3. **Development:**
   - ✅ Use `db:push` only in development
   - ✅ Never run destructive commands in production
   - ✅ Keep schema files in version control

---

## 📞 Support

**Drizzle Documentation:** https://orm.drizzle.team/  
**PostgreSQL Docs:** https://www.postgresql.org/docs/

**Project-Specific Help:**
- Check migration files in `drizzle/` directory
- Review schema definitions in `src/db/schema/`
- Test database connection with `npm run test:env`
- Use `npm run db:studio` for visual database exploration

---

*Documentation for Capture Now v0.1.0 - Last updated: $(date +"%Y-%m-%d")*
