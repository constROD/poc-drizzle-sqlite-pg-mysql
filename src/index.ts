import { sql } from 'drizzle-orm';
import { mysqlClient, pgClient, sqliteClient } from '~/db/client';
import { usersTable as mysqlUsersTable } from '~/db/mysql/schema';
import { usersTable as pgUsersTable } from '~/db/pg/schema';
import { usersTable as sqliteUsersTable } from '~/db/sqlite/schema';

const sqliteDbClient = sqliteClient();
const pgDbClient = pgClient();
const mysqlDbClient = mysqlClient();

async function run() {
  const sqliteRecords = await sqliteDbClient
    .select({ count: sql`count(*)`.mapWith(Number) })
    .from(sqliteUsersTable);
  const pgRecords = await pgDbClient
    .select({ count: sql`count(${pgUsersTable.id})`.mapWith(Number) })
    .from(pgUsersTable);
  const mysqlRecords = await mysqlDbClient
    .select({ count: sql`count(*)`.mapWith(Number) })
    .from(mysqlUsersTable);

  console.log(`SQLite | Total records of ${sqliteRecords[0]?.count.toLocaleString('en-US')}`);
  console.log(`PostgreSQL | Total records of ${pgRecords[0]?.count.toLocaleString('en-US')}`);
  console.log(`MySQL | Total records of ${mysqlRecords[0]?.count.toLocaleString('en-US')}`);
}

void run();
