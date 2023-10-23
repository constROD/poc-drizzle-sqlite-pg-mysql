import { sql } from 'drizzle-orm';
import { mysqlClient, pgClient, sqliteClient } from './db/client';
import { usersTable as mysqlUsersTable } from './db/mysql/schema';
import { usersTable as pgUsersTable } from './db/pg/schema';
import { usersTable as sqliteUsersTable } from './db/sqlite/schema';
import { generateFakeUsers } from './utils/generate-fake-users';

const sqliteDbClient = sqliteClient();
const pgDbClient = pgClient();
const mysqlDbClient = mysqlClient();

async function deleteAllRecords() {
  await sqliteDbClient.delete(sqliteUsersTable);
  await pgDbClient.execute(sql`TRUNCATE TABLE ${pgUsersTable} RESTART IDENTITY`);
  await mysqlDbClient.execute(sql`TRUNCATE TABLE ${mysqlUsersTable}`);
}

async function run() {
  await deleteAllRecords();

  await sqliteDbClient.insert(sqliteUsersTable).values(generateFakeUsers(5));
  const sqliteResult = await sqliteDbClient.select().from(sqliteUsersTable);
  console.log('sqliteResult: ', sqliteResult);

  await pgDbClient.insert(pgUsersTable).values(generateFakeUsers(5));
  const pgResult = await pgDbClient.select().from(pgUsersTable);
  console.log('pgResult: ', pgResult);

  await mysqlDbClient.insert(mysqlUsersTable).values(generateFakeUsers(5));
  const mysqlResult = await mysqlDbClient.select().from(mysqlUsersTable);
  console.log('mysqlResult: ', mysqlResult);
}

run();
