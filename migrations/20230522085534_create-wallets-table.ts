import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  return knex.raw(`
    CREATE TABLE Wallets (
        id SERIAL PRIMARY KEY,
        user_id INTEGER NOT NULL REFERENCES Users(id),
        wallet_address VARCHAR(255),
        private_key VARCHAR(255) NOT NULL
      );
  `);
}

export async function down(knex: Knex): Promise<void> {}
