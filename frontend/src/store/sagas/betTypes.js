import { put } from 'redux-saga/effects';

import api from '../../services/api';
import { Creators as BetTypesActions } from '../ducks/betTypes';

export function* fetchBetTypesSaga(action) {
    try {
        const response = yield api.get('/bets');

        yield put(BetTypesActions.betTypesSuccess(response.data));
    } catch (err) {
        yield put(BetTypesActions.betTypesFailure(err.toString()));
    }
}