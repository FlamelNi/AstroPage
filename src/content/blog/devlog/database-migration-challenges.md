---
title: "Database Migration Challenges"
date: 2024-12-20
description: "Navigating complex database schema changes without downtime"
tags: ["database", "migration", "postgresql", "infrastructure"]
draft: false
---

# Database Migration Challenges

This week presented one of the most challenging technical hurdles yet - performing a major database migration while maintaining 100% uptime for our production users. Here's a detailed account of how we approached this critical task.

## The Migration Context

We needed to migrate from a monolithic user table structure to a more normalized schema to support:

1. **Multi-tenant Architecture** - Supporting multiple organizations
2. **Enhanced Permissions** - Role-based access control
3. **Audit Trail** - Tracking all data changes
4. **Performance Improvements** - Reducing query complexity

## Pre-Migration Strategy

### Analysis Phase

First, we conducted a thorough analysis of the current database:

```sql
-- Analyzing table sizes and relationships
SELECT
  schemaname,
  tablename,
  attname,
  n_distinct,
  correlation
FROM pg_stats
WHERE schemaname = 'public'
ORDER BY tablename, attname;

-- Identifying foreign key dependencies
SELECT
  tc.table_name,
  kcu.column_name,
  ccu.table_name AS foreign_table_name,
  ccu.column_name AS foreign_column_name
FROM information_schema.table_constraints AS tc
JOIN information_schema.key_column_usage AS kcu
  ON tc.constraint_name = kcu.constraint_name
JOIN information_schema.constraint_column_usage AS ccu
  ON ccu.constraint_name = tc.constraint_name;
```

### Migration Planning

The migration was broken down into 5 phases:

1. **Phase 1**: Add new tables and columns (backward compatible)
2. **Phase 2**: Implement dual-write strategy
3. **Phase 3**: Backfill data to new schema
4. **Phase 4**: Switch reads to new schema
5. **Phase 5**: Remove old schema elements

## The Migration Process

### Phase 1: Schema Extension

We started by adding new tables alongside existing ones:

```sql
-- New user_profiles table
CREATE TABLE user_profiles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  organization_id UUID REFERENCES organizations(id),
  first_name VARCHAR(100),
  last_name VARCHAR(100),
  avatar_url TEXT,
  timezone VARCHAR(50) DEFAULT 'UTC',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- New permissions table
CREATE TABLE permissions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  resource_type VARCHAR(50) NOT NULL,
  resource_id UUID,
  action VARCHAR(50) NOT NULL,
  granted_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  granted_by UUID REFERENCES users(id)
);
```

### Phase 2: Dual-Write Implementation

We implemented a service that writes to both schemas:

```typescript
class UserService {
  async createUser(userData: CreateUserDto): Promise<User> {
    // Start transaction
    const trx = await knex.transaction();

    try {
      // Create user in old schema
      const oldUser = await OldUser.query(trx).insert(userData);

      // Create user in new schema
      const newUser = await NewUser.query(trx).insert({
        id: oldUser.id,
        email: userData.email,
        password_hash: userData.password,
        created_at: oldUser.created_at
      });

      // Create profile
      await UserProfile.query(trx).insert({
        user_id: newUser.id,
        first_name: userData.first_name,
        last_name: userData.last_name
      });

      await trx.commit();
      return newUser;
    } catch (error) {
      await trx.rollback();
      throw error;
    }
  }
}
```

### Phase 3: Data Backfill

The backfill process was carefully designed to avoid performance issues:

```typescript
// Backfill script with chunking and rate limiting
async function backfillUserData() {
  const BATCH_SIZE = 1000;
  const DELAY_MS = 100;

  let offset = 0;
  let hasMore = true;

  while (hasMore) {
    const users = await OldUser.query()
      .offset(offset)
      .limit(BATCH_SIZE);

    if (users.length === 0) {
      hasMore = false;
      continue;
    }

    for (const user of users) {
      await migrateUser(user);
      // Rate limiting to prevent database overload
      await sleep(DELAY_MS);
    }

    offset += BATCH_SIZE;
    console.log(`Migrated ${offset} users...`);
  }
}
```

## Handling Edge Cases

### Data Consistency Issues

We encountered several data consistency challenges:

1. **Orphaned Records**: Found 23 users without corresponding profiles
2. **Duplicate Emails**: Discovered 5 accounts with duplicate email addresses
3. **Missing Permissions**: Some users had no permission records

### Solutions Implemented

```typescript
// Data validation and repair script
async function validateAndRepairData() {
  // Fix orphaned profiles
  await knex.raw(`
    INSERT INTO user_profiles (user_id, created_at, updated_at)
    SELECT u.id, NOW(), NOW()
    FROM users u
    LEFT JOIN user_profiles p ON u.id = p.user_id
    WHERE p.id IS NULL
  `);

  // Handle duplicate emails
  const duplicates = await knex.raw(`
    SELECT email, COUNT(*) as count
    FROM users
    GROUP BY email
    HAVING COUNT(*) > 1
  `);

  for (const duplicate of duplicates.rows) {
    await resolveDuplicateEmail(duplicate.email);
  }
}
```

## Performance Monitoring

Throughout the migration, we closely monitored:

### Database Metrics

```sql
-- Monitoring query performance
SELECT
  query,
  calls,
  total_time,
  mean_time,
  rows
FROM pg_stat_statements
WHERE query LIKE '%users%'
ORDER BY mean_time DESC
LIMIT 10;
```

### Application Metrics

- Database connection pool utilization
- Query response times
- Error rates
- Memory usage patterns

## Rollback Strategy

Despite careful planning, we prepared for rollback:

```typescript
// Automated rollback trigger
const healthCheck = setInterval(async () => {
  const metrics = await getDatabaseMetrics();

  if (metrics.errorRate > 0.05 || metrics.avgResponseTime > 1000) {
    console.error('Migration thresholds exceeded, initiating rollback...');
    await executeRollback();
    clearInterval(healthCheck);
  }
}, 30000); // Check every 30 seconds
```

## Post-Migration Cleanup

After verifying stability for 48 hours:

```sql
-- Safely removing old columns
ALTER TABLE users DROP COLUMN first_name;
ALTER TABLE users DROP COLUMN last_name;
ALTER TABLE users DROP COLUMN organization_id;

-- Creating optimized indexes
CREATE INDEX CONCURRENTLY idx_user_profiles_org_id
ON user_profiles(organization_id);

CREATE INDEX CONCURRENTLY idx_permissions_user_resource
ON permissions(user_id, resource_type, resource_id);
```

## Lessons Learned

1. **Never Rush Migrations** - Take time to plan thoroughly
2. **Monitor Everything** - You can't optimize what you don't measure
3. **Have Rollback Ready** - Always have a quick way back
4. **Test at Scale** - Small datasets hide performance issues
5. **Communicate Early** - Keep stakeholders informed throughout

## Results

The migration was completed successfully with:
- **Zero Downtime**: Users experienced no service interruption
- **No Data Loss**: All data successfully migrated
- **Performance Gain**: 40% improvement in query performance
- **Clean Architecture**: Now ready for multi-tenant rollout

This experience reinforced the importance of careful planning, robust testing, and having solid contingency plans when dealing with critical infrastructure changes. 🗄️✨