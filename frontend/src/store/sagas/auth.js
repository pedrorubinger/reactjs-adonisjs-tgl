import { put } from 'redux-saga/effects';

import api from '../../services/api';
import { Creators as AuthActions } from '../ducks/auth';

export function* checkAuthSaga(action) {
    try {
        const response = yield api.get('/sessions');

        yield put(AuthActions.checkAuthSuccess(response.data.userId));
    } catch (err) {
        const errorData = err.response
            ? yield {
                status: err.response.status,
                message: err.response.data.message
            }
            : yield { status: 500, message: 'Server error' };

        yield put(AuthActions.checkAuthFailure(errorData));
    }
}