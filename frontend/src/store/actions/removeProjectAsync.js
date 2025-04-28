import { request } from '../../utils';
import { ACTION_TYPE } from './actionType';

export const removeProjectAsync = (id) => (dispatch) => {
	return request(`/api/projects/${id}`, 'DELETE').then(() => {
		dispatch({ type: ACTION_TYPE.REMOVE_PROJECT, payload: id });
	});
};
