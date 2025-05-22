import { ROLE } from '../../constants';
import { ACTION_TYPE } from '../actions';
import { UserTypes, UserActions } from '../types';

const initialState: UserTypes = {
	id: null,
	login: null,
	name: null,
	surname: null,
	email: null,
	phone: null,
	roleId: ROLE.GUEST,
};

export const userReducer = (state = initialState, action: UserActions) => {
	switch (action.type) {
		case ACTION_TYPE.SET_USER:
			return { ...state, ...action.payload };

		case ACTION_TYPE.LOGOUT:
			return initialState;

		default:
			return state;
	}
};
