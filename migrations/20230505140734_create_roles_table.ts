import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  return knex.raw(`
    CREATE TABLE Roles (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL
      );
  `);
}

export async function down(knex: Knex): Promise<void> {}
