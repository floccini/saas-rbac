import { User } from './../types/user';
import { Role } from './../types/role';
import { PermissionsByRole } from './../types/permissions';

export const permissions: Record<Role, PermissionsByRole> = {
  Admin: (_, { can }) => {
    can('manage', 'all');
  },
  Member: (user: User, { can }) => {
    can('invite', 'User');
  },
};
