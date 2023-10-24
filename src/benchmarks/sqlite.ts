import { sql } from 'drizzle-orm';
import { sqliteClient } from '~/db/client';
import { usersTable } from '~/db/sqlite/schema';

const sqliteDbClient = sqliteClient();

async function runBenchmark() {
  console.log('SQLite Benchmarking...');
  const start = performance.now();
  const records = await sqliteDbClient
    .select({ count: sql`count(*)`.mapWith(Number) })
    .from(usersTable);
  const end = performance.now();
  console.log(`Total records of ${records[0]?.count.toLocaleString('en-US')}`);
  console.log(`Execution Time: ${end - start} ms`);
}

runBenchmark();
