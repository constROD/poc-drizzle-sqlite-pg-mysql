import { mysqlUserService, pgUserService, sqliteUserService } from '../user-service';
import { makeFakeUsers } from './make-fake-users';

export type BatchInsertFakeUsersOptions = {
  count: number;
  batchSize: number;
  dbType: 'pg' | 'mysql' | 'sqlite';
};

export async function batchInsertFakeUsers({
  dbType,
  count,
  batchSize
}: BatchInsertFakeUsersOptions) {
  const totalBatches = Math.ceil(count / batchSize);

  for (let i = 0; i < totalBatches; i++) {
    const users = makeFakeUsers(batchSize);

    const insertStrategy = {
      sqlite: sqliteUserService.insertMany({ values: users }),
      pg: pgUserService.insertMany({ values: users }),
      mysql: mysqlUserService.insertMany({ values: users })
    }[dbType];

    await insertStrategy;

    const databaseName = {
      sqlite: 'SQLite',
      pg: 'PostgreSQL',
      mysql: 'MySQL'
    }[dbType];

    console.log(
      `${databaseName} | Total records inserted ${(batchSize * (i + 1)).toLocaleString('en-US')}`
    );
  }
}
