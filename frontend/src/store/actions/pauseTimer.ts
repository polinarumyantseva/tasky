import { PauseTimerAction } from '../types';
import { ACTION_TYPE } from './actionType';

export const pauseTimer = (): PauseTimerAction => ({
	type: ACTION_TYPE.PAUSE_TIMER,
	payload: { pauseTime: Date.now() },
});
