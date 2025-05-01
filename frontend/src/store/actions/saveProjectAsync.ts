import { request } from '../../utils';
import { AppDispatch } from '../store';
import { ProjectTypes } from '../types';
import { ACTION_TYPE } from './actionType';

export const saveProjectAsync = (id: string | undefined, newProjectData: ProjectTypes) => (dispatch: AppDispatch) => {
	const saveRequest = id
		? request(`/api/projects/${id}`, 'PATCH', newProjectData)
		: request(`/api/projects`, 'POST', newProjectData);

	const actionName = id ? ACTION_TYPE.UPDATE_PROJECT : ACTION_TYPE.ADD_PROJECT;

	return saveRequest.then((updatedProject) => {
		dispatch({ type: actionName, payload: updatedProject.data });

		return updatedProject.data;
	});
};
