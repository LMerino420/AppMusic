import { Component } from '@angular/core';
import { AlertController, ToastController } from '@ionic/angular';
import { ApiDogService } from 'src/app/services/api-dog.service';

@Component({
  selector: 'app-random-dogs',
  templateUrl: './random-dogs.page.html',
  styleUrls: ['./random-dogs.page.scss'],
})
export class RandomDogsPage {
  introGallery: string;
  limitImages: any;
  picOnly: boolean = true;
  // variables para manejo de errores
  showError: boolean = false;
  msjError: string;

  constructor(
    private apiDog: ApiDogService,
    private toastCtrl: ToastController,
    private alertCtrl: AlertController
  ) {
    this.getData();
  }

  async showToast(meth) {
    let msj: string;
    switch (meth) {
      case 'getData':
        msj = 'Se cargaron las imagenes con exito.';
        break;
      case 'getImages':
        msj = 'Busqueda exitosa.';
        break;
      case 'saveFav':
        msj = 'Se guardo correctemente en favoritos.';
        break;
    }

    const toast = await this.toastCtrl.create({
      message: msj,
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

  async getData() {
    this.picOnly = true;
    let data = await this.apiDog.getData();
    const res = await data.json();
    // console.log('DATA =>', data);
    if (data.status != 200) {
      // mostrar error
      let code = data.status;
      let msj = res.message;
      this.showAlert(code, msj);
    } else {
      this.limitImages = null;
      this.introGallery = res;
      this.showToast('getData');
    }
  }

  async getImages(keywords) {
    let cnt = keywords.target.value;
    if (cnt.length > 0 && cnt.length != '') {
      let data = await this.apiDog.limitImage(cnt);
      let res = await data.json();
      if (data.status != 200) {
        // mostrar error
        let code = data.status;
        let msj = res.message;
        this.showAlert(code, msj);
      } else {
        this.introGallery = null;
        this.limitImages = res;
        this.picOnly = false;
        this.showToast('getImages');
      }
    } else {
      await this.getData();
      this.picOnly = true;
    }
  }

  async saveFavorite(item) {
    console.log('ITEM SAVE=>', item);
    let data = await this.apiDog.saveFavorite(item.id);
    let res = await data.json();
    if (data.status != 200) {
      // mostrar error
      let code = data.status;
      let msj = res.message;
      this.showAlert(code, msj);
    } else {
      this.showToast('saveFav');
      console.log('DATA SAVE=>', item.id);
    }
  }
}
