import { Injectable } from '@angular/core';
import * as dataArtist from './artists.json';

@Injectable({
  providedIn: 'root',
})
export class ServMusicService {
  constructor() {}

  getArtist() {
    return dataArtist;
  }

  getNewReleses() {
    return fetch(
      'https://platzi-music-api.herokuapp.com/browse/new-releases'
    ).then((r) => r.json());
  }

  getArtistTracks(artistId) {
    return fetch(
      'https://platzi-music-api.herokuapp.com/artists/' +
        artistId +
        '/top-tracks?country=CO'
    ).then((response) => response.json());
  }

  getAlbumsTracks(albumId) {
    return fetch(
      'https://platzi-music-api.herokuapp.com/albums/' +
        albumId +
        '/tracks?country=CO'
    ).then((response) => response.json());
  }
}
