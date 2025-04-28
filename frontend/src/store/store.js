import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import { thunk } from 'redux-thunk';
import { appReducer, userReducer, projectsReducer, timerReducer } from './reducers';

const reducer = combineReducers({
	app: appReducer,
	user: userReducer,
	projects: projectsReducer,
	timer: timerReducer,
});

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export const store = createStore(reducer, composeEnhancer(applyMiddleware(thunk)));
