import { ACTION_TYPE } from '../actions';
import { FilterActions } from '../types';

const initialState = {
	status: null,
	estimation: {
		min: 0,
		max: 0,
	},
};

export const filterReducer = (state = initialState, action: FilterActions) => {
	switch (action.type) {
		case ACTION_TYPE.SET_STATUS_FILTER:
			return {
				...state,
				status: action.payload,
			};

		case ACTION_TYPE.SET_ESTIMATION_FILTER:
			return {
				...state,
				estimation: {
					min: action.payload.min,
					max: action.payload.max,
				},
			};

		case ACTION_TYPE.RESET_FILTERS:
			return initialState;

		default:
			return state;
	}
};
