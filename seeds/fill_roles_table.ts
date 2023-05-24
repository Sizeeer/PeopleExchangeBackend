import { Knex } from 'knex';

export async function seed(knex: Knex): Promise<void> {
  await knex.raw(`
    ALTER TABLE Users DROP CONSTRAINT IF EXISTS users_roleid_fkey;
    ALTER TABLE Users ADD CONSTRAINT users_roleid_fkey FOREIGN KEY (role_id) REFERENCES Roles (id);
    `);

  return knex.raw(`
    INSERT INTO Roles (name)
    VALUES
    ('admin'),
    ('investor'),
    ('talentPerson');
`);
}
