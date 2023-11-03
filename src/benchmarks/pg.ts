import { sql } from 'drizzle-orm';
import { createPgClient } from '~/db/client';
import { usersTable } from '~/db/pg/schema';

const pgClient = createPgClient();

async function runBenchmark() {
  console.log('PG Benchmarking...');
  const start = performance.now();
  const records = await pgClient.select({ count: sql`count(*)`.mapWith(Number) }).from(usersTable);
  const end = performance.now();
  console.log(`Total records of ${records[0]?.count.toLocaleString('en-US')}`);
  console.log(`Execution Time: ${end - start} ms`);
}

void runBenchmark();
