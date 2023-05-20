import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  return knex.raw(`create or replace
    function delete_user(user_id integer)
    returns void as
    $$
    begin
        delete
    from
        public.users
    where
        id = user_id;
    end;
    
    $$
    language plpgsql;`);
}

export async function down(knex: Knex): Promise<void> {}
