import { RootState } from '../store';

export const selectUserRoleId = ({ user }: RootState) => user.roleId;
