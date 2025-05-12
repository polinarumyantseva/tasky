import { SetStatusFilterAction } from '../types';
import { ACTION_TYPE } from './actionType';

export const setStatusFilter = (status: number | null): SetStatusFilterAction => ({
	type: ACTION_TYPE.SET_STATUS_FILTER,
	payload: status,
});
