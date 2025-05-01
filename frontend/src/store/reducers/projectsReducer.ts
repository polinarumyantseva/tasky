import { ACTION_TYPE } from '../actions';
import { ProjectsActions, ProjectTypes } from '../types';

const initialState: ProjectTypes[] = [];

export const projectsReducer = (state = initialState, action: ProjectsActions) => {
	switch (action.type) {
		case ACTION_TYPE.SET_PROJECTS:
			return action.payload;

		case ACTION_TYPE.ADD_PROJECT:
			return [action.payload, ...state];

		case ACTION_TYPE.REMOVE_PROJECT:
			return state.filter(({ id }) => id !== action.payload);

		case ACTION_TYPE.UPDATE_PROJECT:
			return state.map((project) =>
				project.id === action.payload.id ? { ...project, ...action.payload } : project
			);

		default:
			return state;
	}
};
