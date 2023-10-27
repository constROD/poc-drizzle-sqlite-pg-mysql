import { mysqlClient, pgClient, sqliteClient } from '~/db/client';
import { usersTable as mysqlUsersTable } from '~/db/mysql/schema';
import { usersTable as pgUsersTable } from '~/db/pg/schema';
import { usersTable as sqliteUsersTable } from '~/db/sqlite/schema';
import { generateFakeUsers } from './generate-fake-users';

export type BatchInsertFakeUsersOptions = {
  count: number;
  batchSize: number;
  dbType: 'pg' | 'mysql' | 'sqlite';
};

export async function batchInsertFakeUsers({
  dbType,
  count,
  batchSize,
}: BatchInsertFakeUsersOptions) {
  const totalBatches = Math.ceil(count / batchSize);
  const sqliteDbClient = sqliteClient();
  const pgDbClient = pgClient();
  const mysqlDbClient = mysqlClient();

  for (let i = 0; i < totalBatches; i++) {
    const users = generateFakeUsers(batchSize);

    const insertQuery = {
      sqlite: sqliteDbClient.insert(sqliteUsersTable).values(users),
      pg: pgDbClient.insert(pgUsersTable).values(users),
      mysql: mysqlDbClient.insert(mysqlUsersTable).values(users),
    }[dbType];

    await insertQuery;

    const databaseName = {
      sqlite: 'SQLite',
      pg: 'PostgreSQL',
      mysql: 'MySQL',
    }[dbType];

    console.log(
      `${databaseName} | Total records inserted ${(batchSize * (i + 1)).toLocaleString('en-US')}`
    );
  }
}
