import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  return knex.raw(`CREATE OR REPLACE FUNCTION public.recreate_wallet(
        id integer,
        walletaddress text,
        privatekey text
    )
    RETURNS void
    LANGUAGE plpgsql
    AS $function$
    BEGIN
        DELETE FROM Wallets WHERE user_id = $1;

        INSERT INTO Wallets(user_id, wallet_address, private_key)
        VALUES ($1, $2, $3);
    END;
    $function$;
       ;
       `);
}

export async function down(knex: Knex): Promise<void> {}
