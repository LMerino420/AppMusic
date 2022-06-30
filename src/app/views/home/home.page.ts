import { Component } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ServMusicService } from 'src/app/services/serv-music.service';
import { SongsModalPage } from '../songs-modal/songs-modal.page';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  artist = [];
  songs = [];
  almbums = [];
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
    modal.present();
  }
}
