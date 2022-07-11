import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ApiDogService {
  constructor() {
    console.log('API-DOGS');
  }

  host = 'https://api.thedogapi.com/v1';
  apiKey = '91608fe4-1856-424d-8b2b-3851b49913aa';

  async getData() {
    let url = '/images/search';
    let qParams = '?limit=4';
    return await fetch(this.host + url + qParams);
  }

  async limitImage(cnt) {
    // console.log('API CANT=>', cnt);
    let url = '/images/search';
    let qParams = '?limit=';
    return await fetch(this.host + url + qParams + cnt);
  }

  async loadFavorites() {
    let url = '/favourites?';
    return await fetch(this.host + url, {
      method: 'GET',
      headers: {
        'X-API-KEY': this.apiKey,
      },
    });
  }

  async saveFavorite(item) {
    // console.log('ITEM SAVE=>', item);
    let url = '/favourites?';
    let properties = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-API-KEY': this.apiKey,
      },
      body: JSON.stringify({
        image_id: item,
      }),
    };
    return await fetch(this.host + url, properties);
  }

  async deleteFavorite(item) {
    // console.log('ITEM DELETE=>', item);
    let url = '/favourites/';
    let properties = {
      method: 'DELETE',
      headers: {
        'X-API-KEY': this.apiKey,
      },
    };
    return await fetch(this.host + url + item, properties);
  }

  async uploadImg(dataRecived) {
    // console.log('DTA=>', dataRecived);
    let fData = new FormData();
    fData.append('file', dataRecived);
    let url = '/images/upload';
    let properties = {
      method: 'POST',
      headers: {
        'X-API-KEY': this.apiKey,
      },
      body: fData,
    };
    return await fetch(this.host + url, properties);
  }
}
