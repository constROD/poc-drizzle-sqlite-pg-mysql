import { faker } from '@faker-js/faker';
import { sql } from 'drizzle-orm';
import { mysqlClient, pgClient, sqliteClient } from './db/client';
import { MysqlSchema } from './db/mysql/schema';
import { PgSchema } from './db/pg/schema';
import { SqliteSchema } from './db/sqlite/schema';

const sqliteDbClient = sqliteClient();
const pgDbClient = pgClient();
const mysqlDbClient = mysqlClient();

async function run() {
  await sqliteDbClient.delete(SqliteSchema.users);
  await sqliteDbClient.insert(SqliteSchema.users).values(generateFakeUsers(5));
  const sqliteResult = await sqliteDbClient.select().from(SqliteSchema.users);
  console.log('sqliteResult: ', sqliteResult);

  await pgDbClient.execute(sql`TRUNCATE TABLE ${PgSchema.users} RESTART IDENTITY`);
  await pgDbClient.insert(PgSchema.users).values(generateFakeUsers(5));
  const pgResult = await pgDbClient.select().from(PgSchema.users);
  console.log('pgResult: ', pgResult);

  await mysqlDbClient.execute(sql`TRUNCATE TABLE ${MysqlSchema.users}`);
  await mysqlDbClient.insert(MysqlSchema.users).values(generateFakeUsers(5));
  const mysqlResult = await mysqlDbClient.select().from(MysqlSchema.users);
  console.log('mysqlResult: ', mysqlResult);
}

run();

// Utils
function generateFakeUsers(count: number) {
  const users = [];
  for (let i = 0; i < count; i++) {
    users.push({
      firstName: faker.person.firstName(),
      lastName: faker.person.lastName(),
      email: faker.internet.email(),
    });
  }
  return users;
}
