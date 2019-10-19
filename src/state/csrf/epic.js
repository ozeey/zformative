import { combineEpics } from 'redux-observable';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/catch';

import {
    GET_CSRF,
    getCSRFSuccess,
    getCSRFFailure
} from "./actions";

function getCSRFEpic(action$, state$, { network }){
    return action$
        .ofType(GET_CSRF)
        .switchMap(() => {
            return network.secureAjax('/csrf','GET')
              .map(data => data.response)
              .map(response => response.data)
        })
        .map(csrf => getCSRFSuccess(csrf))
        .catch(error => Observable.of(getCSRFFailure(error.message)))
}

const rootEpic = combineEpics(getCSRFEpic);
export default rootEpic