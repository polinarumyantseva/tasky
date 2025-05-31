import { ACTION_TYPE } from '../actions/actionType';

export interface TimerTypes {
	timerId: string | null;
	projectId: string | null;
	isActive: boolean;
	isPaused: boolean;
	startTime: number;
	endTime: number;
	totalTime: number;
	lastUpdateTime: number;
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
};

export type ResumeTimerAction = {
	type: ACTION_TYPE.RESUME_TIMER;
};

export type StopTimerAction = {
	type: ACTION_TYPE.STOP_TIMER;
};

export type UpdateTimerAction = {
	type: ACTION_TYPE.UPDATE_TIMER;
};

export type LoadSavedTimerAction = {
	type: ACTION_TYPE.LOAD_SAVED_TIMER;
	payload: TimerTypes;
};

export type TimerActions =
	| StartTimerAction
	| PauseTimerAction
	| ResumeTimerAction
	| StopTimerAction
	| UpdateTimerAction
	| LoadSavedTimerAction;
