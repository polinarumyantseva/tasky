import { ModalTypes, OpenModalAction } from '../types';
import { ACTION_TYPE } from './actionType';

export const openModal = (modalParams: ModalTypes): OpenModalAction => ({
	type: ACTION_TYPE.OPEN_MODAL,
	payload: modalParams,
});
