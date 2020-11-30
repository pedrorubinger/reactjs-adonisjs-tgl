export const TYPES = {
    CHECK_AUTH_START: 'auth/CHECK_AUTH_START',
    CHECK_AUTH_SUCCESS: 'auth/CHECK_AUTH_SUCCESS',
    CHECK_AUTH_FAILURE: 'auth/CHECK_AUTH_FAILURE',
    USER_LOGOUT: 'auth/USER_LOGOUT'
};

const initialState = {
    validated: false,
    error: null,
    isAuthenticated: false,
    userId: null
};

const reducer = (state = initialState, action) => {
    switch(action.type) {
        case TYPES.CHECK_AUTH_SUCCESS:
            return {
                ...initialState,
                validated: true,
                error: null,
                isAuthenticated: true,
                userId: action.payload
            };
        case TYPES.CHECK_AUTH_FAILURE:
            return { ...initialState, validated: true, error: action.payload };
        default: return state;
    }
};

export const Creators = {
    checkAuthStart: () => ({ type: TYPES.CHECK_AUTH_START }),
    checkAuthSuccess: (id) => ({ type: TYPES.CHECK_AUTH_SUCCESS, payload: id }),
    checkAuthFailure: (error) => ({ type: TYPES.CHECK_AUTH_FAILURE, payload: error }),
    logout: () => ({ type: TYPES.USER_LOGOUT })
};

export default reducer;