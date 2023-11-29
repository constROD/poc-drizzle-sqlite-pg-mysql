import { eq, inArray } from 'drizzle-orm';
import { type PgInsertValue, type PgUpdateSetSource } from 'drizzle-orm/pg-core';
import { envConfig } from '~/env';
import { type PgClient } from '../types';
import { type PgTable } from './types';

export class PgService<TTable extends PgTable> {
  public dbClient: PgClient;
  public table: TTable;

  constructor({ dbClient, table }: { dbClient: PgClient; table: TTable }) {
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

  async insert({ values }: { values: PgInsertValue<TTable> }) {
    const records = await this.dbClient.insert(this.table).values(values).returning();
    return records;
  }

  async insertMany({ values }: { values: PgInsertValue<TTable>[] }) {
    const records = await this.dbClient.insert(this.table).values(values).returning();
    return records;
  }

  async updateById({ id, values }: { id: number; values: PgUpdateSetSource<TTable> }) {
    const records = await this.dbClient
      .update(this.table)
      .set(values)
      .where(eq(this.table.id, id))
      .returning();
    return records;
  }

  async deleteById({ id }: { id: number }) {
    const records = await this.dbClient.delete(this.table).where(eq(this.table.id, id)).returning();
    return records;
  }

  async deleteMany({ ids }: { ids: number[] }) {
    const records = await this.dbClient.delete(this.table).where(inArray(this.table.id, ids));
    return records;
  }

  async deleteAll() {
    if (envConfig.STAGE !== 'test' || envConfig.PG_DB_HOST !== 'localhost') {
      throw new Error('Delete all records is only allowed in test environment');
    }

    await this.dbClient.delete(this.table);
  }
}
