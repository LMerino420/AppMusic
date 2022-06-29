import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor() {}
  loginUser(credentials) {
    return new Promise((ac, rj) => {
      if (
        credentials.email == 'mail@crediq.com' &&
        credentials.password == '123456'
      ) {
        ac('Usuario autenticado');
      } else {
        rj('No fue posible autenticar');
      }
    });
  }
}
