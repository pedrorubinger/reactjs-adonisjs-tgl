import { all, takeLatest } from 'redux-saga/effects';

import { TYPES as AUTH_TYPES } from '../ducks/auth';
import { TYPES as GAMES_TYPES } from '../ducks/games';
import { TYPES as BET_TYPES } from '../ducks/betTypes';
import { checkAuthSaga } from './auth';
import { fetchGamesSaga, storeGamesSaga } from './games';
import { fetchBetTypesSaga } from './betTypes';

export function* watchAuth() {
    all([yield takeLatest(AUTH_TYPES.CHECK_AUTH_START, checkAuthSaga)]);
}

export function* watchGames() {
    all([
        yield takeLatest(GAMES_TYPES.FETCH_GAMES, fetchGamesSaga),
        yield takeLatest(GAMES_TYPES.ADD_GAMES, storeGamesSaga)
    ]);
}

export function* watchBetTypes() {
    all([yield takeLatest(BET_TYPES.BET_TYPES_START, fetchBetTypesSaga)]);
}

// Passo o type que ele vai ficar esperando ocorrer, e o segundo param é 
// a action que ele vai executar quando o type ocorrer.