export const TYPES = {
    BET_TYPES_START: 'betTypes/START_BET_TYPES',
    BET_TYPES_SUCCESS: 'betTypes/FETCH_BET_TYPES_SUCCESS',
    BET_TYPES_FAILURE: 'betTypes/FETCH_BET_TYPES_FAILURE',
    BET_TYPES_ACTIVE: 'betTypes/BET_TYPES_ACTIVE'
};

const initialState = {
    data: [],
    error: null,
    active: '',
    fetched: false
};

const reducer = (state = initialState, action) => {
    switch(action.type) {
        case TYPES.BET_TYPES_START:
            return { ...state, fetched: false };
        case TYPES.BET_TYPES_SUCCESS:
            return {
                ...state,
                data: action.payload, 
                error: null,
                fetched: true
            };
        case TYPES.BET_TYPES_FAILURE:
            return {
                ...state,
                data: [],
                error: action.payload,
                fetched: true
            };
        case TYPES.BET_TYPES_ACTIVE:
            return { ...state, active: action.payload, fetched: true };
        default: return state;
    }
};

export const Creators = {
    betTypesStart: () => ({ type: TYPES.BET_TYPES_START }),
    betTypesSuccess: (data) => ({ type: TYPES.BET_TYPES_SUCCESS, payload: data }),
    betTypesFailure: (error) => ({ type: TYPES.BET_TYPES_FAILURE, payload: error }),
    betTypesActive: (active) => ({ type: TYPES.BET_TYPES_ACTIVE, payload: active })
};

export default reducer;