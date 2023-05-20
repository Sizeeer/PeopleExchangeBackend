import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  return knex.raw(`CREATE OR REPLACE FUNCTION public.getbyid(id integer)
    RETURNS users
    LANGUAGE sql
   AS $function$
       SELECT *
       FROM Users
       WHERE id = $1
   $function$
   ;`);
}

export async function down(knex: Knex): Promise<void> {}
