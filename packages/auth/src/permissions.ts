import { Role } from './../types/role';
import { PermissionsByRole } from './../types/permissions';

export const permissions: Record<Role, PermissionsByRole> = {
  Admin: (_, { can }) => {
    can('manage', 'all');
  },
  Member: (_, { can }) => {
    can('invite', 'User');
    can('manage', 'Project');
  },
};
