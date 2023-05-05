import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  return knex.raw(`
    CREATE TABLE Investments (
        id SERIAL PRIMARY KEY,
        investorId INTEGER NOT NULL REFERENCES Users(id),
        talentPersonId INTEGER NOT NULL REFERENCES Users(id),
        amount INTEGER NOT NULL,
        createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
  `);
}

export async function down(knex: Knex): Promise<void> {}
