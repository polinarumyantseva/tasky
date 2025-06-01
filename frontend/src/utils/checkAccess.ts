import { ROLE } from '../constants';

export const checkAccess = (access: ROLE[], userRole: number) => access.includes(userRole);
