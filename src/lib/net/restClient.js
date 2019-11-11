import { from } from 'rxjs'

function createQueryString(params = {}){
  return Object.keys(params).filter(key => params[key] != null).map(key => {
    return encodeURIComponent(key) + '=' + encodeURIComponent(params[key])
  }).join('&')
}

function createRestUri(resource, idOrSlug = null){
  let uri = resource

  if(idOrSlug !== null)
    uri = uri + '/' + idOrSlug 

  return uri
}

export function buildResourceUri(network, resource, idOrSlug = null , params = {}) {
  const uri = network.baseUri + createRestUri(resource, idOrSlug)
  const queryString = createQueryString(params)

  if(Object.keys(params).length > 0)
    return uri + '?' + queryString

  return uri
}

export default class restClient {
  static call({data, network, resource, action, restType, ...restProp}) {
    const uri = buildResourceUri(network, resource, data.id)

    if(restType === 'post')
      return from(network.post(uri, data))
    else if(restType === 'put')
      return from(network.put(uri, data))
    else if(restType === 'delete')
      return from(network.delete(uri, data))

  }
}
