import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  return knex.raw(`CREATE OR REPLACE FUNCTION public.register(first_name text, last_name text, email text, password text, role_id integer, wallet_address text)
    RETURNS void
    LANGUAGE plpgsql
   AS $function$
   BEGIN
     INSERT INTO Users (firstname, lastname, email, password, roleid, walletaddress)
     VALUES (first_name, last_name, email, password, role_id, wallet_address);
   END;
   $function$
   ;
   `);
}

export async function down(knex: Knex): Promise<void> {}
