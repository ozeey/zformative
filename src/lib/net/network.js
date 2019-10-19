import axios from 'axios'
import { ajax } from 'rxjs/ajax'
import { isDevHosted, isLocalHosted } from '../system/environment'
import { of } from 'rxjs';

//TODO: update with prod API url when ready
const PROD_API = '/'
// we use proxy when developing locally
const DEV_API = 'http://localhost:3000'


const isDev = isDevHosted || isLocalHosted
const apiHost = isDev ? DEV_API : PROD_API
const baseUri = apiHost + '/'

export default class Network {
  constructor(token = null) {
    this.CSRFToken = token
  }

  get apiHost() {
    return apiHost
  }

  get baseUri() {
    // return '/api/v2/'
    return baseUri
  }

  static getBaseUri() {
    //return '/api/v2/'
    return baseUri
  }

  static getHostname() {
    return apiHost
  }

  setCSRFToken(token) {
    this.CSRFToken = token
  }

  ajax(request) {
    return ajax(request)
  }

  post(url, data) {
    return axios.post(url, data, { crossDomain: !isDev, withCredentials: !isDev })
  }

  put(url, data) {
    return axios.put(url, data, { crossDomain: !isDev, withCredentials: !isDev })
  }

  get(url) {
    return axios.get(url, { crossDomain: !isDev, withCredentials: !isDev })
  }

  // No security, avoids OPTIONS (for lookups)
  fastGet(url) {
    return this.ajax({
      async: true,
      timeout: 3250,
      url: url,
      method: 'GET',
      withCredentials: true,
    })
  }

  parseSecureToken(){
    // if(this.CSRFToken === null || this.CSRFToken === undefined){
    const store = JSON.parse(localStorage.getItem("zformative"))
    const {csrf: {csrf} = null} = store
    this.setCSRFToken(csrf)
    // }
  }

  getHeaders(){
    return {
      'Content-Type': 'application/json',
      'X-CSRF-Token': this.CSRFToken,
      'Accept':'application/json',
      'X-Requested-With': 'XMLHttpRequest'
    }
  }
  // secureAxios
  secureAxios(url, data) {
    this.parseSecureToken()
    const headers = this.getHeaders()
    console.log("headers",headers)
    return axios.post(url, data, headers)
  }
  // Standard secured AJAX call
  secureAjax(url, method, body) {
    
    this.parseSecureToken()

    if((this.CSRFToken === null || this.CSRFToken === undefined) && method.toLocaleLowerCase() === 'post'){
      return of()
    }

    let req = {
      async: true,
      timeout: 120000,
      url: url,
      method: method || 'GET',
      withCredentials: true,
      body: body,
      headers: this.getHeaders(),
    }
    
    return this.ajax(req)
  }
}
