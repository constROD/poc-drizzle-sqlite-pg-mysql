import { sql } from 'drizzle-orm';
import { mysqlClient } from '../db/client';
import { usersTable } from '../db/mysql/schema';
import { batchInsertFakeUsers } from '../utils/batch-insert-fake-users';

const mysqlDbClient = mysqlClient();

async function seedDatabase() {
  console.log('Cleaning up...');
  await mysqlDbClient.execute(sql`TRUNCATE TABLE ${usersTable}`);

  const count = 1_000_000;
  const batchSize = 20_000;

  console.log(
    `Start seeding ${count.toLocaleString(
      'en-US'
    )} records in batches of ${batchSize.toLocaleString('en-US')}`
  );
  await batchInsertFakeUsers({
    count,
    batchSize,
    dbType: 'mysql',
  });
}

async function runBenchmark() {
  // await seedDatabase();

  console.log('Benchmarking...');
  const start = performance.now();
  const records = await mysqlDbClient.select({ count: sql<number>`count(*)` }).from(usersTable);
  const end = performance.now();
  console.log('records: ', records);
  console.log(`Total records of ${records[0]?.count.toLocaleString('en-US')}`);
  console.log(`Execution Time: ${end - start} ms`);
}

runBenchmark();
