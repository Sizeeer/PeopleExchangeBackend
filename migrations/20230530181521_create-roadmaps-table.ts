import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  return knex.raw(`
    CREATE TABLE Roadmaps (
        id SERIAL PRIMARY KEY,
        q1 VARCHAR(255) NOT NULL,
        q2 VARCHAR(255) NOT NULL,
        q3 VARCHAR(255) NOT NULL,
        user_id INTEGER NOT NULL REFERENCES Users(id)
      );
  `);
}

export async function down(knex: Knex): Promise<void> {}
