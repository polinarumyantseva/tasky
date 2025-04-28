import { request } from '../../utils';
import { ACTION_TYPE } from './actionType';

export const startTimer = (projectId) => (dispatch) => {
	return request('/api/timer/start', 'POST', { projectId }).then(({ data }) => {
		dispatch({ type: ACTION_TYPE.START_TIMER, payload: data });
		return data;
	});
};
