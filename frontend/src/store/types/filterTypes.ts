import { ACTION_TYPE } from '../actions';

export interface FilterTypes {
	status: number | null;
	estimation: {
		min: number;
		max: number;
	};
}

export type SetStatusFilterAction = {
	type: ACTION_TYPE.SET_STATUS_FILTER;
	payload: number | null;
};
export type SetEstimationFilterAction = {
	type: ACTION_TYPE.SET_ESTIMATION_FILTER;
	payload: { min: number; max: number };
};
export type ResetFiltersAction = {
	type: ACTION_TYPE.RESET_FILTERS;
};

export type FilterActions = SetStatusFilterAction | SetEstimationFilterAction | ResetFiltersAction;
