import { ACTION_TYPE } from './actionType';
import { request } from '../../utils';

export const logout = () => {
	request('/api/logout', 'POST');
	return {
		type: ACTION_TYPE.LOGOUT,
	};
};
