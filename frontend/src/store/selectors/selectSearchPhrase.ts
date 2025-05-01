import { RootState } from '../store';

export const selectSearchPhrase = ({ app }: RootState) => app.searchPhrase;
