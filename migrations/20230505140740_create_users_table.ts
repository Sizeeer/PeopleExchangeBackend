import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  return knex.raw(`
    CREATE TABLE Users (
        id SERIAL PRIMARY KEY,
        firstName VARCHAR(255) NOT NULL,
        lastName VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL UNIQUE,
        password VARCHAR(255) NOT NULL,
        roleId INTEGER NOT NULL REFERENCES Roles(id),
        walletAddress VARCHAR(255)
      );
  `);
}

export async function down(knex: Knex): Promise<void> {}
