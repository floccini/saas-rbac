import { projectSubject } from './subjects/project';
import { userSubject } from './subjects/user';
import { User } from './types/user';
import {
  createMongoAbility,
  CreateAbility,
  MongoAbility,
  AbilityBuilder,
} from '@casl/ability';
import { permissions } from './permissions';

import { z } from 'zod';
import { organizationSubject } from './subjects/organization';
import { inviteSubject } from './subjects/invite';
import { billingSubject } from './subjects/billing';

export * from './types/organization'
export * from './types/project'
export * from './types/user'

const appAbilitiesSchema = z.union([
  projectSubject,
  userSubject,
  organizationSubject,
  inviteSubject,
  billingSubject,

  z.tuple([z.literal('manage'), z.literal('all')]),
]);

type AppAbilities = z.infer<typeof appAbilitiesSchema>;

export type AppAbility = MongoAbility<AppAbilities>;
export const createAppAbility = createMongoAbility as CreateAbility<AppAbility>;

export function defineAbilityFor(user: User) {
  const builder = new AbilityBuilder(createAppAbility);

  if (typeof permissions[user.role] !== 'function') {
    throw new Error(`Permissions for ${user.role} not found.`);
  }

  permissions[user.role](user, builder);

  const ability = builder.build({
    detectSubjectType(subject) {
      return subject.__typename;
    },
  });

  return ability;
}
