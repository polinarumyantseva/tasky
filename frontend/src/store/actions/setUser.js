import { ACTION_TYPE } from './actionType';

export const setUser = (user) => ({
	type: ACTION_TYPE.SET_USER,
	payload: user,
});
