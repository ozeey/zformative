import { combineEpics } from 'redux-observable'
import { Observable } from 'rxjs'

import {
    GET_ARTICLES,
    getArticlesSuccess,
    getArticlesFailure,

    POST_ARTICLE,
    postArticleSuccess,
    postArticleFailure,

    GET_ARTICLE,
    getArticleSuccess,
    getArticleFailure,

    DELETE_ARTICLE,
    deleteArticleSuccess,
    deleteArticleFailure,
} from "./actions"

import restClient from './../../lib/net/restClient'

const resource = 'blog'

function getArticleEpic(action$, state$, { network }) { 
    return action$
        .ofType(GET_ARTICLE)
        .switchMap((action) => {
            return network.secureAjax(`/${resource}/${action.payload.slug}`, "GET")
                .map(data => data.response.allModelData)
        })
        .map(article => getArticleSuccess(article)) 
        .catch(error => Observable.of(getArticleFailure(error.message)))
}

function getArticlesEpic(action$, state$, { network }) { 
    return action$
        .ofType(GET_ARTICLES)
        .switchMap(() => {

            return network.secureAjax(`/${resource}`, "GET")
                .map(data => data.response.allModelData.data) 
                .map(articles => articles.map(a => ({
                    ...a,
                    imageUrl: a.excerpt_image,
                }))
                )
        })
        .map(articles => getArticlesSuccess(articles)) 
        .catch(error => Observable.of(getArticlesFailure(error.message)))
}

function postArticleEpic(action$, state$, { network }){
    return action$
      .ofType(POST_ARTICLE) 
      .switchMap((action) => {
        
        // action contains data and action properties
        const params = {
            ...action.payload,
            resource, network,
        }
        return restClient.call(params)
      })
      .map(article => postArticleSuccess(article)) 
      .catch(error => Observable.of(postArticleFailure(error.message)))
}

function deleteArticleEpic(action$, state$, { network }){
    return action$
      .ofType(DELETE_ARTICLE) 
      .switchMap((action) => {
        
        // action contains data and action properties
        const params = {
            ...action.payload,
            resource, network,
            restType: 'delete'
        }
        return restClient.call(params)
      })
      .map(article => deleteArticleSuccess(article)) 
      .catch(error => Observable.of(deleteArticleFailure(error.message)))
}

export default combineEpics(getArticlesEpic, postArticleEpic, getArticleEpic, deleteArticleEpic)