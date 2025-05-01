import { request } from '../../utils';
import { AppDispatch } from '../store';
import { ACTION_TYPE } from './actionType';

export const startTimer = (projectId: string) => (dispatch: AppDispatch) => {
	return request('/api/timer/start', 'POST', { projectId }).then(({ data }) => {
		dispatch({ type: ACTION_TYPE.START_TIMER, payload: data });
		return data;
	});
};
