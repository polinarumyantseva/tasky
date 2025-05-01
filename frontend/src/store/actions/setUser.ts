import { SetUserAction, UserTypes } from '../types';
import { ACTION_TYPE } from './actionType';

export const setUser = (user: UserTypes): SetUserAction => ({
	type: ACTION_TYPE.SET_USER,
	payload: user,
});
