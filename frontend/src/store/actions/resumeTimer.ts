import { ResumeTimerAction } from '../types';
import { ACTION_TYPE } from './actionType';

export const resumeTimer = (): ResumeTimerAction => ({
	type: ACTION_TYPE.RESUME_TIMER,
	payload: { resumeTime: Date.now() },
});
