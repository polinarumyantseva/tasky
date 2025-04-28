import { ACTION_TYPE } from './actionType';

export const setSearchPhrase = (phrase) => ({
	type: ACTION_TYPE.SET_SEARCH_PHRASE,
	payload: phrase,
});
