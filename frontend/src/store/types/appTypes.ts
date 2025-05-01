import { ACTION_TYPE } from '../actions';

export interface ModalTypes {
	isOpen?: boolean;
	text: string;
	onConfirm: () => void;
	onCancel: () => void;
}

export interface AppTypes {
	searchPhrase: string;
	modal: ModalTypes;
}

export type SetSearchPhraseAction = {
	type: ACTION_TYPE.SET_SEARCH_PHRASE;
	payload: string;
};
export type OpenModalAction = {
	type: ACTION_TYPE.OPEN_MODAL;
	payload: ModalTypes;
};

export type CloseModalAction = {
	type: ACTION_TYPE.CLOSE_MODAL;
};

export type AppActions = SetSearchPhraseAction | OpenModalAction | CloseModalAction;
