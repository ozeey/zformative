import {
    GET_CSRF,
    GET_CSRF_FAILURE,
    GET_CSRF_SUCCESS
} from './actions';

function csrfReducer(state = {}, action) {
    switch (action.type) {
        case GET_CSRF:
            return {
                csrf: state.csrf,
            };
        case GET_CSRF_FAILURE:
            return {
                csrf: null,
                error: action.payload
            };
        case GET_CSRF_SUCCESS:
            return {
                csrf: action.payload,
            };
        default:
            return state;
    }
}

export default csrfReducer