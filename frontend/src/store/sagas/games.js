import { put } from 'redux-saga/effects';

import api from '../../services/api';
import { Creators as GamesActions } from '../ducks/games';

export function* fetchGamesSaga(action) {
    const { userId, filter, page } = action.payload;

    try {
        const response = yield api
            .get(`/games/user/${userId}/${filter || 'all'}?page=${page || '1'}`);
        const pagination = {
            page: response.data.page,
            total: response.data.total,
            perPage: response.data.perPage,
            lastPage: response.data.lastPage
        };

        yield put(GamesActions.fetchGamesSuccess(response.data.data, pagination));
    } catch(err) {
        yield put(GamesActions.fetchGamesFailure(err.toString()));
    }
}

export function* storeGamesSaga(action) {
    try {
        yield api.post('/games', action.payload);
    } catch (err) {
        yield put(GamesActions.fetchGamesFailure(err.toString()));
    }
}