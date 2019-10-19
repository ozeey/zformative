export const GET_CSRF = 'GET_CSRF';
export const GET_CSRF_SUCCESS = 'GET_CSRF_SUCCESS';
export const GET_CSRF_FAILURE = 'GET_CSRF_FAILURE';

//temp sol for token mismatch
export const getCSRF = () => ({
    type: GET_CSRF,
});

export const getCSRFSuccess = (csrf) => ({
    type: GET_CSRF_SUCCESS,
    payload: csrf
});

export const getCSRFFailure = (message) => ({
    type: GET_CSRF_FAILURE,
    payload: message
});