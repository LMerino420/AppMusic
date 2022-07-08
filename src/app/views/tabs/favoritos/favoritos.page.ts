import { Component } from '@angular/core';
import { AlertController, ToastController } from '@ionic/angular';
import { ApiDogService } from 'src/app/services/api-dog.service';

@Component({
  selector: 'app-favoritos',
  templateUrl: './favoritos.page.html',
  styleUrls: ['./favoritos.page.scss'],
})
export class FavoritosPage {
  favImg: [];
  // variables para manejo de errores
  showError: boolean = false;
  msjError: string;

  constructor(
    private apiDog: ApiDogService,
    private toastCtrl: ToastController,
    private alertCtrl: AlertController
  ) {}

  async ionViewDidEnter() {
    await this.loadFav();
  }

  async showToast() {
    const toast = await this.toastCtrl.create({
      message: 'Se ha eliminado la imagen de favoritos.',
      duration: 1000,
      position: 'top',
    });
    toast.present();
  }

  async showAlert(code, msj) {
    const alert = await this.alertCtrl.create({
      header: 'ERROR [' + code + ']',
      message: msj,
      buttons: ['OK'],
    });
    await alert.present();
  }

  async loadFav() {
    let data = await this.apiDog.loadFavorites();
    let res = await data.json();
    if (data.status != 200) {
      let code = data.status;
      let msj = res.message;
      this.showAlert(code, msj);
    } else {
      this.favImg = res;
    }
  }

  async deleteFavorite(item) {
    let id = item.id;
    let data = await this.apiDog.deleteFavorite(id);
    let res = await data.json();
    if (data.status != 200) {
      let code = data.status;
      let msj = res.message;
      this.showAlert(code, msj);
    } else {
      this.loadFav();
      this.showToast();
    }
  }
}
