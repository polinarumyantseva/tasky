import { SetSearchPhraseAction } from '../types';
import { ACTION_TYPE } from './actionType';

export const setSearchPhrase = (phrase: string): SetSearchPhraseAction => ({
	type: ACTION_TYPE.SET_SEARCH_PHRASE,
	payload: phrase,
});
