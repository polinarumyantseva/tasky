import { ACTION_TYPE } from '../actions/actionType';

export interface TimerTypes {
	timerId: string | null;
	projectId: string | null;
	isActive: boolean;
	isPaused: boolean;
	startTime: number;
	pauseTime: number;
	endTime: number;
	totalTime: number;
}

export type StartTimerAction = {
	type: ACTION_TYPE.START_TIMER;
	payload: {
		timerId: string;
		projectId: string;
		startTime: number;
	};
};

export type PauseTimerAction = {
	type: ACTION_TYPE.PAUSE_TIMER;
	payload: { pauseTime: number };
};

export type ResumeTimerAction = {
	type: ACTION_TYPE.RESUME_TIMER;
	payload: { resumeTime: number };
};

export type StopTimerAction = {
	type: ACTION_TYPE.STOP_TIMER;
	payload: { stopTime: number };
};

export type TimerActions = StartTimerAction | PauseTimerAction | ResumeTimerAction | StopTimerAction;
