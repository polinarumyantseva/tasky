import { ACTION_TYPE } from './actionType';
import { request } from '../../utils';
import { LogoutAction } from '../types';

export const logout = (): LogoutAction => {
	request('/api/logout', 'POST');
	return {
		type: ACTION_TYPE.LOGOUT,
	};
};
