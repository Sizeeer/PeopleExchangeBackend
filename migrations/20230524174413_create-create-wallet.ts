import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  return knex.raw(`CREATE OR REPLACE FUNCTION public.create_wallet(id integer, wallet_address text, private_key text)
    RETURNS void
    LANGUAGE plpgsql
   AS $function$
   BEGIN
     INSERT INTO Wallets (user_id, wallet_address, private_key)
     VALUES ($1, $2, $3);
   END;
   $function$
   ;
   `);
}

export async function down(knex: Knex): Promise<void> {}
