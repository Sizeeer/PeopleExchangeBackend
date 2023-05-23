import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  return knex.raw(`
  CREATE TYPE InvestorInfo AS (
   id INTEGER,
   firstName VARCHAR(255),
   lastName VARCHAR(255),
   email VARCHAR(255),
   password VARCHAR(255),
   roleId INTEGER,
   walletAddress VARCHAR(255),
   invested_amount INTEGER
);

CREATE OR REPLACE FUNCTION public.get_investors_of_talent_person_by_id(talentperson_id INTEGER)
RETURNS SETOF InvestorInfo
LANGUAGE sql
AS $function$
SELECT u.id, 
      u.firstName,
      u.lastName,
      u.email,
      u.password,
      u.roleId,
      u.walletAddress,
      i.amount AS invested_amount
FROM Users u
INNER JOIN Investments i ON u.id = i.investorId
WHERE i.talentpersonId = talentperson_id;
$function$;
        `);
}

export async function down(knex: Knex): Promise<void> {}
