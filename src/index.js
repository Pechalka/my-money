import React from 'react';
import { render } from 'react-dom';
import './index.css';
import App from './App';
import { createStore, applyMiddleware   } from 'redux';
import { Provider } from 'react-redux';
import { reducer as appReducer, restoreState } from './reduxModule';

const LS_KEY = 'app-state-v1';

const LSMiddleware = key => store => next => action => {
	let result = next(action);
	const state = store.getState();
	var json = JSON.stringify(state);
    localStorage.setItem(key, json);
}

const store = createStore(
	appReducer,
	applyMiddleware(LSMiddleware(LS_KEY))
)

render(
	<Provider store={store}>
		<App />
	</Provider>, 
	document.getElementById('root')
);


var stateStr = localStorage.getItem(LS_KEY);
if (stateStr) {
	const state = JSON.parse(stateStr)
	store.dispatch(restoreState(state))
}

