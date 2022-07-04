import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ApiDogService {
  constructor() {
    console.log('API-DOGS');
  }

  url = 'https://api.thedogapi.com/v1/images/search';

  async getData() {
    return await fetch(this.url).then((d) => d.json());
  }

  async limitImage(cnt) {
    // console.log('API CANT=>', cnt);
    let qParams = '?limit=';
    return await fetch(this.url + qParams + cnt).then((d) => d.json());
  }
}
