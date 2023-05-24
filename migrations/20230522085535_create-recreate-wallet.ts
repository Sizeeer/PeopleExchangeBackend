import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  return knex.raw(`CREATE OR REPLACE FUNCTION public.recreate_wallet(
        id integer,
        walletaddress text
    )
    RETURNS void
    LANGUAGE plpgsql
    AS $function$
    BEGIN
        UPDATE Wallets
        SET 
            wallet_address = COALESCE($2, Wallets.wallet_address)
        WHERE users.id = $1;
    END;
    $function$;
       ;
       `);
}

export async function down(knex: Knex): Promise<void> {}
