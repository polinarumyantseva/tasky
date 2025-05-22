import { ACTION_TYPE } from '../actions';

interface TimeEntryTypes {
	date: Date;
	duration: number;
}
export interface ProjectTypes {
	id: string;
	title: string;
	author: string;
	estimation: number;
	description?: string;
	publishedAt: Date;
	totalTrackedTime: number;
	status: number;
	statusName: string;
	timeEntries: TimeEntryTypes[];
}

export type SetProjectsAction = {
	type: ACTION_TYPE.SET_PROJECTS;
	payload: ProjectTypes[];
};
export type AddProjectAction = {
	type: ACTION_TYPE.ADD_PROJECT;
	payload: ProjectTypes;
};
export type RemoveProjectAction = {
	type: ACTION_TYPE.REMOVE_PROJECT;
	payload: string;
};
export type UpdateProjectAction = {
	type: ACTION_TYPE.UPDATE_PROJECT;
	payload: { id: string };
};

export type ProjectsActions = SetProjectsAction | AddProjectAction | RemoveProjectAction | UpdateProjectAction;
