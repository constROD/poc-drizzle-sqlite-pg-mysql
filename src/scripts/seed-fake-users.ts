import { sql } from 'drizzle-orm';
import { batchInsertFakeUsers } from '~/core/users/utils/batch-insert-fake-users';
import { createMysqlClient, createPgClient, createSqliteClient } from '~/db/client';
import { usersTable as mysqlUsersTable } from '~/db/mysql/schema';
import { usersTable as pgUsersTable } from '~/db/pg/schema';
import { usersTable as sqliteUsersTable } from '~/db/sqlite/schema';

const sqliteClient = createSqliteClient();
const pgClient = createPgClient();
const mysqlClient = createMysqlClient();

async function seedFakeUsers({
  dbType,
  count,
  batchSize,
}: {
  dbType: 'sqlite' | 'pg' | 'mysql';
  count: number;
  batchSize: number;
}) {
  console.log('Cleaning up...');

  if (dbType === 'sqlite') {
    await sqliteClient.delete(sqliteUsersTable);
  }

  if (dbType === 'pg') {
    await pgClient.execute(sql`TRUNCATE TABLE ${pgUsersTable} RESTART IDENTITY`);
  }

  if (dbType === 'mysql') {
    await mysqlClient.execute(sql`TRUNCATE TABLE ${mysqlUsersTable}`);
  }

  console.log(
    `Start seeding ${count.toLocaleString(
      'en-US'
    )} records in batches of ${batchSize.toLocaleString('en-US')}`
  );

  const start = performance.now();
  await batchInsertFakeUsers({
    dbType,
    count,
    batchSize,
  });
  const end = performance.now();
  console.log(`Execution Time: ${end - start} ms`);
}

void seedFakeUsers({
  dbType: 'sqlite',
  count: 1_000_000,
  batchSize: 10_000,
});

// void seedFakeUsers({
//   dbType: 'pg',
//   count: 1_000_000,
//   batchSize: 10_000,
// });

// void seedFakeUsers({
//   dbType: 'mysql',
//   count: 1_000_000,
//   batchSize: 10_000,
// });
