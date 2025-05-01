import { useDispatch } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';
import { RootActions, RootState } from '../store/store';

export const useCustomDispatch = () => useDispatch<ThunkDispatch<RootState, unknown, RootActions>>();
