import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private storage: Storage) {}

  async loginUser(credentials) {
    let uData = await this.storage.get('user');
    console.log('PWD uDATA=>', uData.password);
    return new Promise((ac, rj) => {
      credentials.password = btoa(credentials.password);
      if (
        credentials.email == uData.email &&
        credentials.password == uData.password
      ) {
        ac('Usuario autenticado');
      } else {
        rj('No fue posible autenticar');
      }
    });
  }

  registUser(userData) {
    console.log('uData AUTH =>', userData.password);
    return this.storage.set('user', userData);
  }
}
