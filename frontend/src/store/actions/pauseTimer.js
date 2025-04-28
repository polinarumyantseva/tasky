import { ACTION_TYPE } from './actionType';

export const pauseTimer = () => ({
	type: ACTION_TYPE.PAUSE_TIMER,
	payload: { pauseTime: Date.now() },
});
