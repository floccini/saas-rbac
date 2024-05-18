import { ProjectSubject } from './../subjects/project';
import { UserSubject } from './../subjects/user';
import { User } from './../types/user';
import {
  createMongoAbility,
  CreateAbility,
  MongoAbility,
  AbilityBuilder,
} from '@casl/ability';
import { permissions } from './permissions';

type AppAbilities = UserSubject | ProjectSubject | ['manage', 'all'];

export type AppAbility = MongoAbility<AppAbilities>;
export const createAppAbility = createMongoAbility as CreateAbility<AppAbility>;

export function defineAbilityFor(user: User) {
  const builder = new AbilityBuilder(createAppAbility);

  if (typeof permissions[user.role] !== 'function') {
    throw new Error(`Permissions for ${user.role} not found.`);
  }

  permissions[user.role](user, builder);

  const ability = builder.build();

  return ability;
}
