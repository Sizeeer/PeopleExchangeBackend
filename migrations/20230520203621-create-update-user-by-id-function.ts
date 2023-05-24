import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  return knex.raw(`CREATE OR REPLACE FUNCTION public.updateuserbyid(
    id integer,
    email text,
    firstname text,
    lastname text,
    walletaddress text
)
RETURNS void
LANGUAGE plpgsql
AS $function$
BEGIN
    UPDATE users
    SET 
        email = COALESCE($2, users.email),
        firstname = COALESCE($3, users.firstname),
        lastname = COALESCE($4, users.lastname),
        walletaddress = COALESCE($5, users.walletaddress)
    WHERE users.id = $1;
END;
$function$;
   ;
   `);
}

export async function down(knex: Knex): Promise<void> {}
