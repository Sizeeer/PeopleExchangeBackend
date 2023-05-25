import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  return knex.raw(`CREATE OR REPLACE FUNCTION public.updateuserbyid(
    id integer,
    email text,
    firstname text,
    lastname text
)
RETURNS void
LANGUAGE plpgsql
AS $function$
BEGIN
    UPDATE users
    SET 
        email = COALESCE($2, users.email),
        first_name = COALESCE($3, users.first_name),
        last_name = COALESCE($4, users.last_name)
    WHERE users.id = $1;
END;
$function$;
   ;
   `);
}

export async function down(knex: Knex): Promise<void> {}
