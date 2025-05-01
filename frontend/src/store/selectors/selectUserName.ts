import { RootState } from '../store';

export const selectUserName = ({ user }: RootState) => user.name;
