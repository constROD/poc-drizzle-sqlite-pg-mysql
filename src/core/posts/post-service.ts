import { mysqlClient, pgClient, sqliteClient } from '~/db/client';
import { postsTable as mysqlPostsTable } from '~/db/mysql/schema';
import { MysqlService } from '~/db/mysql/service';
import { postsTable as pgPostsTable } from '~/db/pg/schema';
import { PgService } from '~/db/pg/service';
import { postsTable as sqlitePostsTable } from '~/db/sqlite/schema';
import { SqliteService } from '~/db/sqlite/service';
import { type MysqlClient, type PgClient, type SqliteClient } from '~/db/types';

export class SqlitePostService extends SqliteService<typeof sqlitePostsTable> {
  constructor({ dbClient }: { dbClient: SqliteClient }) {
    super({
      dbClient,
      table: sqlitePostsTable,
    });
  }
}

export const sqlitePostService = new SqlitePostService({ dbClient: sqliteClient() });

export class PgPostService extends PgService<typeof pgPostsTable> {
  constructor({ dbClient }: { dbClient: PgClient }) {
    super({
      dbClient,
      table: pgPostsTable,
    });
  }
}

export const pgPostService = new PgPostService({ dbClient: pgClient() });

export class MysqlPostService extends MysqlService<typeof mysqlPostsTable> {
  constructor({ dbClient }: { dbClient: MysqlClient }) {
    super({
      dbClient,
      table: mysqlPostsTable,
    });
  }
}

export const mysqlPostService = new MysqlPostService({ dbClient: mysqlClient() });
