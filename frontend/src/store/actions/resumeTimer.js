import { ACTION_TYPE } from './actionType';

export const resumeTimer = () => ({
	type: ACTION_TYPE.RESUME_TIMER,
	payload: { resumeTime: Date.now() },
});
