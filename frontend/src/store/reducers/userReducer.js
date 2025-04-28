import { ACTION_TYPE } from '../actions';
import { ROLE } from '../../constants/role';

const initialState = {
	id: null,
	login: null,
	name: null,
	surname: null,
	email: null,
	roleId: ROLE.GUEST,
};

export const userReducer = (state = initialState, action) => {
	switch (action.type) {
		case ACTION_TYPE.SET_USER:
			return { ...state, ...action.payload };

		case ACTION_TYPE.LOGOUT:
			return initialState;

		default:
			return state;
	}
};
