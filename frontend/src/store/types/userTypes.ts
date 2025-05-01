import { ACTION_TYPE } from '../actions';

export interface UserTypes {
	id: string | null;
	login: string | null;
	name: string | null;
	surname: string | null;
	email: string | null;
	phone: string | null;
	roleId: number;
}

export type SetUserAction = {
	type: ACTION_TYPE.SET_USER;
	payload: UserTypes;
};

export type LogoutAction = {
	type: ACTION_TYPE.LOGOUT;
};

export type UserActions = SetUserAction | LogoutAction;
