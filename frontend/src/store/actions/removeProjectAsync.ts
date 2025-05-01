import { request } from '../../utils';
import { AppDispatch } from '../store';
import { ACTION_TYPE } from './actionType';

export const removeProjectAsync = (id: string) => (dispatch: AppDispatch) => {
	return request(`/api/projects/${id}`, 'DELETE').then(() => {
		dispatch({ type: ACTION_TYPE.REMOVE_PROJECT, payload: id });
	});
};
