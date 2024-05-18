import { defineAbilityFor } from '@saas/auth';

const ability = defineAbilityFor({ role: 'Member' });

const userCanInviteSomeoneElse = ability.can('invite', 'User');
const userCanDeleteOtherUsers = ability.can('delete', 'User');

const userCannotDeleteOtherUsers = ability.cannot('delete', 'User');

console.log(userCanInviteSomeoneElse);
console.log(userCanDeleteOtherUsers);
console.log(userCannotDeleteOtherUsers);
