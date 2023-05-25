import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  return knex.raw(`CREATE OR REPLACE FUNCTION public.delete_wallet(id integer)
    RETURNS void
    LANGUAGE plpgsql
   AS $function$
   BEGIN
     DELETE FROM Wallets WHERE user_id = $1;
   END;
   $function$
   ;
   `);
}

export async function down(knex: Knex): Promise<void> {}
