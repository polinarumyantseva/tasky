import { request } from '../../utils';
import { ACTION_TYPE } from './actionType';

export const setProjectsAsync = (searchPhrase, page, PAGINATION_LIMIT) => (dispatch) => {
	return request(`/api/projects?search=${searchPhrase}&page=${page}&limit=${PAGINATION_LIMIT}`).then(
		({ data: { projects, lastPage } }) => {
			dispatch({ type: ACTION_TYPE.SET_PROJECTS, payload: projects });

			return { projects, lastPage };
		}
	);
};
