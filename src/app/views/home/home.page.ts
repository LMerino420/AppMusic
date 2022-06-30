import { Component } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ServMusicService } from 'src/app/services/serv-music.service';
import { SongsModalPage } from '../modals/songs-modal/songs-modal.page';

interface Song {
  name?: string;
  playing: boolean;
  preview_url?: string;
}

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  artist = [];
  songs = [];
  almbums = [];
  song: Song = {
    name: '',
    playing: false,
    preview_url: '',
  };
  currentSong: any = {};
  newTime;

  slideOps = {
    initialSlide: 2,
    slidesPerView: 4,
    // loop: true,
    centeredSlides: true,
    speed: 400,
  };

  constructor(
    private servMusic: ServMusicService,
    private modalCtrl: ModalController
  ) {}

  ionViewDidEnter() {
    this.servMusic.getNewReleses().then((newRel) => {
      this.artist = this.servMusic.getArtist().items;
      console.log('ARTIST=>', this.artist);
      this.almbums = newRel.albums.items.filter((e) => e.album_type == 'album');
      this.songs = newRel.albums.items.filter((e) => e.album_type == 'single');
      console.log('ART=>', this.artist);
    });
  }

  async showSong(artist) {
    console.log(artist.id);
    const songs = await this.servMusic.getArtistTracks(artist.id);
    console.log('SONGS =>', songs);
    const modal = await this.modalCtrl.create({
      component: SongsModalPage,
      componentProps: {
        songs: songs.tracks,
        artist: artist.name,
      },
    });

    modal.onDidDismiss().then((datRet) => {
      this.song = datRet.data;
    });

    return modal.present();
  }

  play() {
    this.currentSong = new Audio(this.song.preview_url);
    this.currentSong.play();
    this.currentSong.addEventListener('timeupdate', () => {
      this.newTime = this.currentSong.currentTime / this.currentSong.duration;
    });
    this.song.playing = true;
  }

  pause() {
    this.currentSong.pause();
    this.song.playing = false;
  }

  parseTime(time = '01.00') {
    const partTime = parseInt(time.toString().split('.')[0], 10);
    let minutes = Math.floor(partTime / 60).toString();
    if (minutes.length == 1) {
      minutes = '0' + minutes;
    }
    let seg = (partTime % 60).toString();
    if (seg.length == 1) {
      seg = '0' + seg;
    }
    return minutes + ':' + seg;
  }
}
