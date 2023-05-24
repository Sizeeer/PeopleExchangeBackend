import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  return knex.raw(`
  CREATE TYPE InvestorInfo AS (
   id INTEGER,
   first_name VARCHAR(255),
   last_name VARCHAR(255),
   email VARCHAR(255),
   password VARCHAR(255),
   role_id INTEGER,
   wallet_address VARCHAR(255),
   invested_amount INTEGER
);

CREATE OR REPLACE FUNCTION public.get_investors_of_talent_person_by_id(talentperson_id INTEGER)
RETURNS SETOF InvestorInfo
LANGUAGE sql
AS $function$
SELECT u.id, 
      u.first_name,
      u.last_name,
      u.email,
      u.password,
      u.role_id,
      wl.wallet_address AS wallet_address,
      i.amount AS invested_amount
FROM Users u
INNER JOIN Investments i ON u.id = i.investor_id
INNER JOIN Wallets wl ON wl.user_id = u.id
WHERE i.talent_person_id = talentperson_id;
$function$;
        `);
}

export async function down(knex: Knex): Promise<void> {}
