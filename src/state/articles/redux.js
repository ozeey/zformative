import {
    GET_ARTICLES,
    GET_ARTICLES_FAILURE,
    GET_ARTICLES_SUCCESS,
    GET_ARTICLE,
    GET_ARTICLE_FAILURE,
    GET_ARTICLE_SUCCESS,
    POST_ARTICLE,
    POST_ARTICLE_FAILURE,
    POST_ARTICLE_SUCCESS
} from './actions';

const initialState = {
    articles: [],
    isLoading: false,
    error: null
};

function rootReducer(state = initialState, action) {
    console.log("action",action)
    switch (action.type) {
        case GET_ARTICLE:
            return {
                ...state,
                isLoading: true,
                error: null
            }
        case GET_ARTICLE_SUCCESS:
            return {
                ...state,
                article: action.payload,
                isLoading: false,
                error: null
            }
        case GET_ARTICLE_FAILURE:
            return {
                ...state,
                article: {},
                isLoading: false,
                error: "Something went wrong while fetching article :("
            }
        case GET_ARTICLES:
            return {
                ...state,
                isLoading: true,
                error: null
            }
        case GET_ARTICLES_SUCCESS:
            return {
                ...state,
                articles: action.payload,
                isLoading: false,
                error: null
            }
        case GET_ARTICLES_FAILURE:
            return {
                ...state,
                articles: [],
                isLoading: false,
                error: action.payload
            }
        case POST_ARTICLE:
            return {
                ...state,
                article: action.payload.data,
            }
        case POST_ARTICLE_SUCCESS:
            return {
                ...state,
                article: action.payload.data.data,
                isLoading: false,
                error: null
            }
        case POST_ARTICLE_FAILURE:
            return {
                ...state,
                isLoading: false,
                error: action.payload
            }
        default:
            return state
    }
}

export default rootReducer