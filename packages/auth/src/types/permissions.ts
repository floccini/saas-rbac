import { AppAbility } from '..';
import { AbilityBuilder } from '@casl/ability';

export type PermissionsByRole = (
  user: any,
  builder: AbilityBuilder<AppAbility>
) => void;
