import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ApiDogService {
  constructor() {
    console.log('API-DOGS');
  }

  host = 'https://api.thedogapi.com/v1';
  apiKey = '&api_key=91608fe4-1856-424d-8b2b-3851b49913aa';

  async getData() {
    let url = '/images/search';
    let qParams = '?limit=4';
    return await fetch(this.host + url + qParams + this.apiKey);
  }

  async limitImage(cnt) {
    // console.log('API CANT=>', cnt);
    let url = '/images/search';
    let qParams = '?limit=';
    return await fetch(this.host + url + qParams + cnt + this.apiKey);
  }

  async loadFavorites() {
    let url = '/favourites?';
    return await fetch(this.host + url + this.apiKey);
  }

  async saveFavorite(item) {
    // console.log('ITEM SAVE=>', item);
    let url = '/favourites?';
    let properties = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        image_id: item,
      }),
    };
    return await fetch(this.host + url + this.apiKey, properties);
  }

  async deleteFavorite(item) {
    // console.log('ITEM DELETE=>', item);
    let url = '/favourites/';
    let union = '/?';
    let properties = {
      method: 'DELETE',
    };
    return await fetch(
      this.host + url + item + union + this.apiKey,
      properties
    );
  }
}
