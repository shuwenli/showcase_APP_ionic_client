import {tokenNotExpired} from 'angular2-jwt';
import {Injectable} from 'angular2/core';

@Injectable()
export class AuthService {
  constructor() {}

  static authenticated() {
    return tokenNotExpired();
  }
}

/*function tokenNotExpired(tokenName, jwt) {
    var authToken = tokenName || 'id_token';
    var token;
    if (jwt) {
        token = jwt;
    }
    else {
        token = localStorage.getItem(authToken);
    }
    var jwtHelper = new JwtHelper();
    if (!token || jwtHelper.isTokenExpired(token, null)) {
        return false;
    }
    else {
        return true;
    }
} */
