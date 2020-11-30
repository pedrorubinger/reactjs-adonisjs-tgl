import { combineReducers, createStore } from 'redux';
import { applyMiddleware, compose } from 'redux';
import createSagaMiddleware from 'redux-saga';

import auth from './ducks/auth';
import games from './ducks/games';
import betTypes from './ducks/betTypes';
import cart from './ducks/cart';
import { watchAuth, watchGames, watchBetTypes } from './sagas';
import { TYPES } from './ducks/auth';

const appReducer = combineReducers({
    auth,
    games,
    betTypes,
    cart
});

const rootReducer = (state, action) => {
    if(action.type === TYPES.USER_LOGOUT)
        state = undefined;

   return appReducer(state, action); 
};

const sagaMiddleware = createSagaMiddleware();
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
    rootReducer,
    composeEnhancers(applyMiddleware(sagaMiddleware))
);

sagaMiddleware.run(watchAuth);
sagaMiddleware.run(watchGames);
sagaMiddleware.run(watchBetTypes);

export default store;