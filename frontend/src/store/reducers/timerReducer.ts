import { ACTION_TYPE } from '../actions';
import { TimerTypes, TimerActions } from '../types';

const initialState: TimerTypes = {
	timerId: null,
	projectId: null,
	isActive: false,
	isPaused: false,
	startTime: 0,
	pauseTime: 0,
	endTime: 0,
	totalTime: 0,
};

export const timerReducer = (state = initialState, action: TimerActions) => {
	switch (action.type) {
		case ACTION_TYPE.START_TIMER:
			return {
				...state,
				timerId: action.payload.timerId,
				projectId: action.payload.projectId,
				isActive: true,
				startTime: action.payload.startTime,
			};

		case ACTION_TYPE.PAUSE_TIMER:
			return {
				...state,
				isPaused: true,
				pauseTime: action.payload.pauseTime,
				totalTime: state.totalTime + (action.payload.pauseTime - state.startTime),
			};

		case ACTION_TYPE.RESUME_TIMER:
			return {
				...state,
				isPaused: false,
				startTime: action.payload.resumeTime,
				pauseTime: 0,
			};

		case ACTION_TYPE.STOP_TIMER:
			return {
				...state,
				isActive: false,
				endTime: action.payload.stopTime,
				totalTime: state.isPaused
					? state.totalTime
					: state.totalTime + (action.payload.stopTime - state.startTime),
			};

		default:
			return state;
	}
};
