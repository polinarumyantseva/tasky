import { ACTION_TYPE } from './actionType';

export const loadSavedTimer = () => {
	const savedTimer = JSON.parse(localStorage.getItem('timerState') as string);
	return {
		type: ACTION_TYPE.LOAD_SAVED_TIMER,
		payload: savedTimer || null,
	};
};
