import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  return knex.raw(`
    create or replace
function ban_user(user_id integer)
returns void as
$$
begin
    update
	public.users
set
	is_banned = true
where
	id = user_id;
end;

$$
language plpgsql;;

    `);
}

export async function down(knex: Knex): Promise<void> {}
