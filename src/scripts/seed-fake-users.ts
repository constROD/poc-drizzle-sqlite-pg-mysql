import { sql } from 'drizzle-orm';
import { mysqlClient, pgClient, sqliteClient } from '~/db/client';
import { usersTable as mysqlUsersTable } from '~/db/mysql/schema';
import { usersTable as pgUsersTable } from '~/db/pg/schema';
import { usersTable as sqliteUsersTable } from '~/db/sqlite/schema';
import { batchInsertFakeUsers } from '~/services/users/utils/batch-insert-fake-users';

const sqliteDbClient = sqliteClient();
const pgDbClient = pgClient();
const mysqlDbClient = mysqlClient();

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
    await sqliteDbClient.delete(sqliteUsersTable);
  }

  if (dbType === 'pg') {
    await pgDbClient.execute(sql`TRUNCATE TABLE ${pgUsersTable} RESTART IDENTITY`);
  }

  if (dbType === 'mysql') {
    await mysqlDbClient.execute(sql`TRUNCATE TABLE ${mysqlUsersTable}`);
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

seedFakeUsers({
  dbType: 'sqlite',
  count: 1_000_000,
  batchSize: 10_000,
});

// seedFakeUsers({
//   dbType: 'pg',
//   count: 1_000_000,
//   batchSize: 10_000,
// });

// seedFakeUsers({
//   dbType: 'mysql',
//   count: 1_000_000,
//   batchSize: 10_000,
// });
