import { eq, inArray } from 'drizzle-orm';
import { type SQLiteInsertValue, type SQLiteUpdateSetSource } from 'drizzle-orm/sqlite-core';
import { type SqliteClient } from '../types';
import { type SqliteTable } from './types';

export class SqliteService<TTable extends SqliteTable> {
  public dbClient: SqliteClient;
  public table: TTable;

  constructor({ dbClient, table }: { dbClient: SqliteClient; table: TTable }) {
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

  async insert({ values }: { values: SQLiteInsertValue<TTable> }) {
    const records = await this.dbClient.insert(this.table).values(values);
    return records;
  }

  async insertMany({ values }: { values: SQLiteInsertValue<TTable>[] }) {
    const records = await this.dbClient.insert(this.table).values(values);
    return records;
  }

  async update({ id, values }: { id: number; values: SQLiteUpdateSetSource<TTable> }) {
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
}
