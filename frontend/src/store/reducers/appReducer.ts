import { ACTION_TYPE } from '../actions';
import { AppActions, AppTypes } from '../types';

const initialState: AppTypes = {
	searchPhrase: '',
	modal: {
		isOpen: false,
		text: '',
		onConfirm: () => {},
		onCancel: () => {},
	},
};

export const appReducer = (state = initialState, action: AppActions) => {
	switch (action.type) {
		case ACTION_TYPE.SET_SEARCH_PHRASE:
			return {
				...state,
				searchPhrase: action.payload,
			};

		case ACTION_TYPE.OPEN_MODAL:
			return {
				...state,
				modal: {
					...state,
					...action.payload,
					isOpen: true,
				},
			};

		case ACTION_TYPE.CLOSE_MODAL:
			return initialState;

		default:
			return state;
	}
};
