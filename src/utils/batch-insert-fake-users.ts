import { mysqlClient, pgClient, sqliteClient } from '../db/client';
import { MysqlSchema } from '../db/mysql/schema';
import { PgSchema } from '../db/pg/schema';
import { SqliteSchema } from '../db/sqlite/schema';
import { generateFakeUsers } from './generate-fake-users';

export async function batchInsertFakeUsers({
  count,
  batchSize,
  dbType,
}: {
  count: number;
  batchSize: number;
  dbType: 'pg' | 'mysql' | 'sqlite';
}) {
  const totalBatches = Math.ceil(count / batchSize);

  for (let i = 0; i < totalBatches; i++) {
    const users = generateFakeUsers(batchSize);

    if (dbType === 'mysql') {
      await mysqlClient().insert(MysqlSchema.users).values(users);
    }

    if (dbType === 'pg') {
      await pgClient().insert(PgSchema.users).values(users);
    }

    if (dbType === 'sqlite') {
      await sqliteClient().insert(SqliteSchema.users).values(users);
    }

    console.log('Batch Inserted: ', i + 1, ' of ', totalBatches, ' batches');
  }
}
