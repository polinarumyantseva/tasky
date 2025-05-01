import { request } from '../../utils';
import { AppDispatch } from '../store';
import { ACTION_TYPE } from './actionType';

export const stopTimer =
	(projectId: string, timerId: string, endTime: number, totalTime: number) => (dispatch: AppDispatch) => {
		return request('/api/timer/stop', 'POST', { projectId, timerId, endTime, totalTime }).then(() => {
			dispatch({ type: ACTION_TYPE.STOP_TIMER, payload: { stopTime: Date.now() } });
		});
	};
