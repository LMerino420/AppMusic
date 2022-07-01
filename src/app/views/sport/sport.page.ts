import { Component } from '@angular/core';
import { Song } from 'src/app/interfaces/Song';
import { ServMusicService } from 'src/app/services/serv-music.service';

@Component({
  selector: 'app-sport',
  templateUrl: './sport.page.html',
  styleUrls: ['./sport.page.scss'],
})
export class SportPage {
  searching = false;
  text = 'Ingrese la cancíon que desea buscar';
  songs: Song[];
  song: Song;
  currentSong: HTMLAudioElement;

  constructor(private servMusic: ServMusicService) {}

  async getTracks(keywords) {
    this.searching = true;
    let texto = keywords.target.value;
    // console.log('KEY WORDS=>',keywords.target.value);
    // console.log('Keywords =>', keywords.target.value.length);
    if (texto.length > 0) {
      this.servMusic.searchTracks(texto).then(async (r) => {
        // console.log('Resp servMusic =>', r['tracks'].items);
        this.songs = await r['tracks'].items.filter(
          (item: any) => item.preview_url
        );
        console.log('SONG VALUE=>', this.songs);
        if (this.songs.length == 0) {
          this.text = 'No existen resultados para: ' + keywords;
        }
        this.searching = false;
      });
    } else {
      this.text = 'Ingrese una nueva busqueda';
      this.songs = [];
      this.searching = false;
    }
  }

  play(song: Song) {
    if (this.currentSong) {
      this.pause();
    }
    this.song = song;
    this.currentSong = new Audio(this.song.preview_url);
    this.currentSong.play();
    this.currentSong.addEventListener('ended', () => {
      this.song.playing = false;
    });
    this.song.playing = true;
  }

  pause() {
    this.currentSong.pause();
    this.song.playing = false;
  }
}
