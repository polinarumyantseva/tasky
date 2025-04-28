import { request } from '../../utils';
import { ACTION_TYPE } from './actionType';

export const stopTimer = (projectId, timerId, endTime, totalTime) => (dispatch) => {
	return request('/api/timer/stop', 'POST', { projectId, timerId, endTime, totalTime }).then(() => {
		dispatch({ type: ACTION_TYPE.STOP_TIMER, payload: { stopTime: Date.now() } });
	});
};
