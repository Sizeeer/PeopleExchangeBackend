import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  return knex.raw(`CREATE OR REPLACE FUNCTION public.updateuserbyid(id integer, email text, firstname text, lastname text, walletaddress text)
    RETURNS void
    LANGUAGE plpgsql
   AS $function$
   BEGIN
     UPDATE users
     SET 
       email = COALESCE(email, $2),
       firstname = COALESCE(firstname, $3),
       lastname = COALESCE(lastname, $4),
       walletaddress = COALESCE(walletaddress, $5)
     WHERE id = $1;
   END;
   $function$
   ;
   `);
}

export async function down(knex: Knex): Promise<void> {}
