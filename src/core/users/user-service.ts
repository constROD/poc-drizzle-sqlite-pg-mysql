import { createMysqlClient, createPgClient, createSqliteClient } from '~/db/client';
import { usersTable as mysqlUsersTable } from '~/db/mysql/schema';
import { MysqlService } from '~/db/mysql/service';
import { usersTable as pgUsersTable } from '~/db/pg/schema';
import { PgService } from '~/db/pg/service';
import { usersTable as sqliteUsersTable } from '~/db/sqlite/schema';
import { SqliteService } from '~/db/sqlite/service';
import { type MysqlClient, type PgClient, type SqliteClient } from '~/db/types';

export class SqliteUserService extends SqliteService<typeof sqliteUsersTable> {
  constructor({ dbClient }: { dbClient: SqliteClient }) {
    super({
      dbClient,
      table: sqliteUsersTable,
    });
  }
}

export const sqliteUserService = new SqliteUserService({ dbClient: createSqliteClient() });

export class PgUserService extends PgService<typeof pgUsersTable> {
  constructor({ dbClient }: { dbClient: PgClient }) {
    super({
      dbClient,
      table: pgUsersTable,
    });
  }
}

export const pgUserService = new PgUserService({ dbClient: createPgClient() });

export class MysqlUserService extends MysqlService<typeof mysqlUsersTable> {
  constructor({ dbClient }: { dbClient: MysqlClient }) {
    super({
      dbClient,
      table: mysqlUsersTable,
    });
  }
}

export const mysqlUserService = new MysqlUserService({ dbClient: createMysqlClient() });
