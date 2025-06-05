import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import { thunk, ThunkMiddleware } from 'redux-thunk';
import { appReducer, userReducer, projectsReducer, timerReducer, filterReducer } from './reducers';
import { AppActions, FilterActions, ProjectsActions, TimerActions, UserActions } from './types';

const reducer = combineReducers({
	app: appReducer,
	user: userReducer,
	projects: projectsReducer,
	timer: timerReducer,
	filters: filterReducer,
});

export type RootState = ReturnType<typeof reducer>;
export type RootActions = AppActions | UserActions | TimerActions | ProjectsActions | FilterActions;
export type AppDispatch = typeof store.dispatch;

const composeEnhancer = (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export const store = createStore(
	reducer,
	composeEnhancer(applyMiddleware(thunk as ThunkMiddleware<RootState, RootActions>))
);
