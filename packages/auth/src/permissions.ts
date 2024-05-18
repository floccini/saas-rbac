import { Role } from './types/role';
import { PermissionsByRole } from './types/permissions';

export const permissions: Record<Role, PermissionsByRole> = {
  Admin: (user, { can, cannot }) => {
    can('manage', 'all');

    cannot(['transfer_ownership', 'update'], 'Organization');
    can(['transfer_ownership', 'update'], 'Organization', {
      ownerId: { $eq: user.id },
    });
  },
  Member: (user, { can }) => {
    can('get', 'User');
    can(['create', 'get'], 'Project');
    can(['update', 'delete'], 'Project', { ownerId: { $eq: user.id } });
  },
  Billing: (_, { can }) => {
    can('manage', 'Billing');
  },
};
