import { UpdateTimerAction } from '../types';
import { ACTION_TYPE } from './actionType';

export const updateTimer = (): UpdateTimerAction => ({
	type: ACTION_TYPE.UPDATE_TIMER,
});
