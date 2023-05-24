import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  return knex.raw(`
    CREATE TABLE Investments (
        id SERIAL PRIMARY KEY,
        investor_id INTEGER NOT NULL REFERENCES Users(id),
        talent_person_id INTEGER NOT NULL REFERENCES Users(id),
        amount INTEGER NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
  `);
}

export async function down(knex: Knex): Promise<void> {}
