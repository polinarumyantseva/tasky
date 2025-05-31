import { ACTION_TYPE } from '../actions';
import { TimerTypes, TimerActions } from '../types';

const initialState: TimerTypes = {
	timerId: null,
	projectId: null,
	isActive: false,
	isPaused: false,
	startTime: 0,
	endTime: 0,
	totalTime: 0,
	lastUpdateTime: 0,
};

export const timerReducer = (state = initialState, action: TimerActions) => {
	switch (action.type) {
		case ACTION_TYPE.START_TIMER: {
			const newState = {
				...state,
				timerId: action.payload.timerId,
				projectId: action.payload.projectId,
				isActive: true,
				startTime: action.payload.startTime,
				totalTime: 0,
				lastUpdateTime: Date.now(),
			};
			localStorage.setItem('timerState', JSON.stringify(newState));
			return newState;
		}

		case ACTION_TYPE.UPDATE_TIMER: {
			const now = Date.now();
			const newState = {
				...state,
				totalTime: state.totalTime + (now - state.lastUpdateTime),
				lastUpdateTime: now,
			};

			localStorage.setItem('timerState', JSON.stringify(newState));

			return newState;
		}

		case ACTION_TYPE.PAUSE_TIMER: {
			const newState = {
				...state,
				isPaused: true,
				lastUpdateTime: null,
			};
			localStorage.setItem('timerState', JSON.stringify(newState));
			return newState;
		}

		case ACTION_TYPE.RESUME_TIMER: {
			const newState = {
				...state,
				isPaused: false,
				lastUpdateTime: Date.now(),
			};
			localStorage.setItem('timerState', JSON.stringify(newState));
			return newState;
		}

		case ACTION_TYPE.STOP_TIMER: {
			const now = Date.now();
			localStorage.removeItem('timerState');

			return {
				...state,
				isActive: false,
				endTime: now,
				totalTime: state.totalTime,
			};
		}

		case ACTION_TYPE.LOAD_SAVED_TIMER:
			return action.payload || initialState;

		default:
			return state;
	}
};
