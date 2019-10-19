// @GET Single Article
export const GET_ARTICLE = 'GET_ARTICLE';
export const GET_ARTICLE_SUCCESS = 'GET_ARTICLE_SUCCESS';
export const GET_ARTICLE_FAILURE = 'GET_ARTICLE_FAILURE';

export const getArticle = (payload) => ({
    type: GET_ARTICLE,
    payload
});

export const getArticleSuccess = (article) => ({
    type: GET_ARTICLE_SUCCESS,
    payload: article
});

export const getArticleFailure = (message) => ({
    type: GET_ARTICLE_FAILURE,
    payload: message
});

// @GET Multiple Article
export const GET_ARTICLES = 'GET_ARTICLES';
export const GET_ARTICLES_SUCCESS = 'GET_ARTICLES_SUCCESS';
export const GET_ARTICLES_FAILURE = 'GET_ARTICLES_FAILURE';

export const getArticles = () => ({
    type: GET_ARTICLES,
});

export const getArticlesSuccess = (articles) => ({
    type: GET_ARTICLES_SUCCESS,
    payload: articles
});

export const getArticlesFailure = (message) => ({
    type: GET_ARTICLES_FAILURE,
    payload: message
});

// @POST
export const POST_ARTICLE = 'POST_ARTICLE';
export const POST_ARTICLE_SUCCESS = 'POST_ARTICLE_SUCCESS';
export const POST_ARTICLE_FAILURE = 'POST_ARTICLE_FAILURE';

export const postArticle = (data) => ({
    type: POST_ARTICLE,
    payload: data
});

export const postArticleSuccess = (article) => ({
    type: POST_ARTICLE_SUCCESS,
    payload: article
});

export const postArticleFailure = (message) => ({
    type: POST_ARTICLE_FAILURE,
    payload: message
});

