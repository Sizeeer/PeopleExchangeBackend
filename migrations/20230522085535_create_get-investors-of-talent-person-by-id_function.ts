import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  return knex.raw(`
    CREATE OR REPLACE FUNCTION public.get_investors_of_talent_person_by_id(id integer)
 RETURNS users
 LANGUAGE sql
AS $function$
select u.*, i.amount as invested_amount from users u inner join investments i ON u.id = i.investorid where i.talentpersonid = $1
   $function$
;

        `);
}

export async function down(knex: Knex): Promise<void> {}
