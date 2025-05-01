import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import { thunk, ThunkMiddleware } from 'redux-thunk';
import { appReducer, userReducer, projectsReducer, timerReducer } from './reducers';
import {
	AppActions,
	AppTypes,
	ProjectsActions,
	ProjectTypes,
	TimerActions,
	TimerTypes,
	UserActions,
	UserTypes,
} from './types';

const reducer = combineReducers({
	app: appReducer,
	user: userReducer,
	projects: projectsReducer,
	timer: timerReducer,
});

export type RootState = ReturnType<typeof reducer>;
export type RootActions = AppActions | UserActions | TimerActions | ProjectsActions;
export type AppDispatch = typeof store.dispatch;

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export const store = createStore(
	reducer,
	composeEnhancer(applyMiddleware(thunk as ThunkMiddleware<RootState, RootActions>))
);
