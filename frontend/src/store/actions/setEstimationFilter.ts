import { SetEstimationFilterAction } from '../types';
import { ACTION_TYPE } from './actionType';

export const setEstimationFilter = (min: number, max: number): SetEstimationFilterAction => ({
	type: ACTION_TYPE.SET_ESTIMATION_FILTER,
	payload: { min, max },
});
