import { Component } from '@angular/core';
import { ModalController, NavParams } from '@ionic/angular';

@Component({
  selector: 'app-show-songs',
  templateUrl: './show-songs.page.html',
  styleUrls: ['./show-songs.page.scss'],
})
export class ShowSongsPage {
  songs = [];
  name: string;

  constructor(
    private navParams: NavParams,
    private modalCtrl: ModalController
  ) {}

  ionViewDidEnter() {
    this.songs = this.navParams.data.songs;
    this.name = this.navParams.data.name;
  }

  async selectedSong(song?) {
    await this.modalCtrl.dismiss(song);
  }
}
