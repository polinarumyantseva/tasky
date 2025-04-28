import { ACTION_TYPE } from './actionType';

export const openModal = (modalParams) => ({ type: ACTION_TYPE.OPEN_MODAL, payload: modalParams });
