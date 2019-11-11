import {
  GET_ARTICLES,
  GET_ARTICLES_FAILURE,
  GET_ARTICLES_SUCCESS,
  GET_ARTICLE,
  GET_ARTICLE_FAILURE,
  GET_ARTICLE_SUCCESS,
  POST_ARTICLE,
  POST_ARTICLE_FAILURE,
  POST_ARTICLE_SUCCESS,
  DELETE_ARTICLE,
  DELETE_ARTICLE_SUCCESS,
  DELETE_ARTICLE_FAILURE
} from "./actions";

const initialState = {
  articles: [],
  isLoading: false,
  error: null,
  isDeleted: false //is article deleted or no
};

function rootReducer(state = initialState, action) {
  switch (action.type) {
    case GET_ARTICLE:
      return {
        ...state,
        isLoading: true,
        isDeleted: false,
        error: null
      };
    case GET_ARTICLE_SUCCESS:
      return {
        ...state,
        article: action.payload,
        isLoading: false,
        isDeleted: false,
        error: null
      };
    case GET_ARTICLE_FAILURE:
      return {
        ...state,
        article: {},
        isLoading: false,
        isDeleted: false,
        error: "Something went wrong while fetching article :("
      };
    case GET_ARTICLES:
      return {
        ...state,
        isLoading: true,
        isDeleted: false,
        error: null
      };
    case GET_ARTICLES_SUCCESS:
      return {
        ...state,
        articles: action.payload,
        isLoading: false,
        isDeleted: false,
        error: null
      };
    case GET_ARTICLES_FAILURE:
      return {
        ...state,
        articles: [],
        isLoading: false,
        isDeleted: false,
        error: action.payload
      };
    case POST_ARTICLE:
      return {
        ...state,
        article: action.payload.data,
        isDeleted: false,
      };
    case POST_ARTICLE_SUCCESS:
      return {
        ...state,
        article: action.payload.data.data,
        isLoading: false,
        isDeleted: false,
        error: null
      };
    case POST_ARTICLE_FAILURE:
      return {
        ...state,
        isLoading: false,
        isDeleted: false,
        error: action.payload
      };
    case DELETE_ARTICLE: {
      return {
        ...state,
        isLoading: true,
        isDeleted: false
      };
    }
    case DELETE_ARTICLE_SUCCESS: {
      return {
        ...state,
        isDeleted: true,
        article: action.payload.data.data
      };
    }
    case DELETE_ARTICLE_FAILURE: {
      return {
        ...state,
        isDeleted: false,
        error: action.payload
      };
    }
    default:
      return state;
  }
}

export default rootReducer;
