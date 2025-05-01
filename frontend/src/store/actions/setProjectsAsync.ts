import { request } from '../../utils';
import { AppDispatch } from '../store';
import { ACTION_TYPE } from './actionType';

export const setProjectsAsync =
	(searchPhrase: string, page: number, PAGINATION_LIMIT: number) => (dispatch: AppDispatch) => {
		return request(`/api/projects?search=${searchPhrase}&page=${page}&limit=${PAGINATION_LIMIT}`).then(
			({ data: { projects, lastPage } }) => {
				dispatch({ type: ACTION_TYPE.SET_PROJECTS, payload: projects });

				return { projects, lastPage };
			}
		);
	};
