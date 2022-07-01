import { Injectable } from '@angular/core';
import * as dataArtist from './artists.json';

@Injectable({
  providedIn: 'root',
})
export class ServMusicService {
  private url = 'https://platzi-music-api.herokuapp.com/';

  constructor() {}

  getArtist() {
    return dataArtist;
  }

  getNewReleses() {
    return fetch(this.url + 'browse/new-releases').then((r) => r.json());
  }

  getArtistTracks(artistId) {
    return fetch(
      this.url + 'artists/' + artistId + '/top-tracks?country=CO'
    ).then((response) => response.json());
  }

  getAlbumsTracks(albumId) {
    return fetch(this.url + 'albums/' + albumId + '/tracks?country=CO').then(
      (response) => response.json()
    );
  }

  searchTracks(text) {
    return fetch(this.url + 'search?q=' + text + '&type=track').then(
      (response) => response.json()
    );
  }
}
