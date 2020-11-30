export const TYPES = {
    FETCH_GAMES: 'games/FETCH_GAMES',
    FETCH_GAMES_SUCCESS: 'games/FETCH_GAMES_SUCCESS',
    FETCH_GAMES_FAILURE: 'games/FETCH_GAMES_FAILURE',
    ADD_GAMES: 'games/ADD_GAMES'
};

const initialState = {
    games: [],
    error: null,
    fetched: false,
    pagination: {}
};

const reducer = (state = initialState, action) => {
    switch(action.type) {
        case TYPES.FETCH_GAMES:
            return { ...state, fetched: false };
        case TYPES.FETCH_GAMES_SUCCESS:
            return {
                ...state,
                games: action.payload.games,
                error: null,
                fetched: true,
                pagination: action.payload.pagination
            };
        case TYPES.FETCH_GAMES_FAILURE:
            return { ...initialState, fetched: true, error: action.payload };
        case TYPES.ADD_GAMES:
            return {
                ...state,
                games: [...state.games, ...action.payload.games],
                fetched: false
            };
        default: return state;
    }
};

export const Creators = {
    fetchGamesRequest: (userId, filter, page) => ({
        type: TYPES.FETCH_GAMES,
        payload: { userId, filter, page }
    }),
    fetchGamesSuccess: (games, pagination) => ({
        type: TYPES.FETCH_GAMES_SUCCESS,
        payload: { games, pagination }
    }),
    fetchGamesFailure: (error) => ({ type: TYPES.FETCH_GAMES_FAILURE, payload: error }),
    addGames: (games) => ({ type: TYPES.ADD_GAMES, payload: games })
};

export default reducer;