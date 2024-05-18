import { AppAbility } from '..';
import { AbilityBuilder } from '@casl/ability';
import { User } from './user';

export type PermissionsByRole = (
  user: User,
  builder: AbilityBuilder<AppAbility>
) => void;
