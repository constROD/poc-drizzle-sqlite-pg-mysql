import { eq, inArray } from 'drizzle-orm';
import { type MySqlInsertValue, type MySqlUpdateSetSource } from 'drizzle-orm/mysql-core';
import { envConfig } from '~/env';
import { type MysqlClient } from '../types';
import { type MysqlTable } from './types';

export class MysqlService<TTable extends MysqlTable> {
  public dbClient: MysqlClient;
  public table: TTable;

  constructor({ dbClient, table }: { dbClient: MysqlClient; table: TTable }) {
    this.dbClient = dbClient;
    this.table = table;
  }

  async getAll() {
    const records = await this.dbClient.select().from(this.table);
    return records;
  }

  async getById({ id }: { id: number }) {
    const records = await this.dbClient.select().from(this.table).where(eq(this.table.id, id));
    return records;
  }

  async insert({ values }: { values: MySqlInsertValue<TTable> }) {
    const records = await this.dbClient.insert(this.table).values(values);
    return records;
  }

  async insertMany({ values }: { values: MySqlInsertValue<TTable>[] }) {
    const records = await this.dbClient.insert(this.table).values(values);
    return records;
  }

  async updateById({ id, values }: { id: number; values: MySqlUpdateSetSource<TTable> }) {
    const records = await this.dbClient.update(this.table).set(values).where(eq(this.table.id, id));
    return records;
  }

  async deleteById({ id }: { id: number }) {
    const records = await this.dbClient.delete(this.table).where(eq(this.table.id, id));
    return records;
  }

  async deleteMany({ ids }: { ids: number[] }) {
    const records = await this.dbClient.delete(this.table).where(inArray(this.table.id, ids));
    return records;
  }

  async deleteAll() {
    if (envConfig.STAGE !== 'test' || envConfig.MYSQL_DB_HOST !== 'localhost') {
      throw new Error('Delete all records is only allowed in test environment');
    }

    await this.dbClient.delete(this.table);
  }
}
