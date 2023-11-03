import { sql } from 'drizzle-orm';
import { createMysqlClient, createPgClient, createSqliteClient } from '~/db/client';
import { usersTable as mysqlUsersTable } from '~/db/mysql/schema';
import { usersTable as pgUsersTable } from '~/db/pg/schema';
import { usersTable as sqliteUsersTable } from '~/db/sqlite/schema';

const sqliteClient = createSqliteClient();
const pgClient = createPgClient();
const mysqlClient = createMysqlClient();

async function run() {
  const sqliteRecords = await sqliteClient
    .select({ count: sql`count(*)`.mapWith(Number) })
    .from(sqliteUsersTable);
  const pgRecords = await pgClient
    .select({ count: sql`count(${pgUsersTable.id})`.mapWith(Number) })
    .from(pgUsersTable);
  const mysqlRecords = await mysqlClient
    .select({ count: sql`count(*)`.mapWith(Number) })
    .from(mysqlUsersTable);

  console.log(`SQLite | Total records of ${sqliteRecords[0]?.count.toLocaleString('en-US')}`);
  console.log(`PostgreSQL | Total records of ${pgRecords[0]?.count.toLocaleString('en-US')}`);
  console.log(`MySQL | Total records of ${mysqlRecords[0]?.count.toLocaleString('en-US')}`);
}

void run();
