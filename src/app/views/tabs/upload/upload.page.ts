import { Component } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { AlertController, ToastController } from '@ionic/angular';
import { ApiDogService } from 'src/app/services/api-dog.service';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.page.html',
  styleUrls: ['./upload.page.scss'],
})
export class UploadPage {
  fileImg: File;
  preView: string;
  clasCard: string = 'cardClassAdd';

  constructor(
    private apiDog: ApiDogService,
    private sanitizer: DomSanitizer,
    private alertCtrl: AlertController,
    private toastCtrl: ToastController
  ) {}

  capFile(ev) {
    this.fileImg = ev.target.files[0];
    this.parseBase64(this.fileImg).then((img: any) => {
      this.preView = img.base;
      this.clasCard = 'cardClassDel';
    });
  }

  delFile() {
    this.preView = null;
    this.clasCard = 'cardClassAdd';
  }

  parseBase64 = async ($event: any) =>
    new Promise((resolve, reject) => {
      try {
        const unsafeImg = window.URL.createObjectURL($event);
        const image = this.sanitizer.bypassSecurityTrustUrl(unsafeImg);
        const reader = new FileReader();
        reader.readAsDataURL($event);
        reader.onload = () => {
          resolve({
            base: reader.result,
          });
        };
        reader.onerror = (error) => {
          resolve({
            base: null,
          });
        };
      } catch (error) {
        console.log('ERROR: ', error);
      }
    });

  async showAlert(code, msj) {
    const alert = await this.alertCtrl.create({
      header: 'ERROR [' + code + ']',
      message: msj,
      buttons: ['OK'],
    });
    await alert.present();
  }

  async showToast(meth) {
    let msj: string;
    switch (meth) {
      case 'upLoad':
        msj = 'Se subio correctamente la imagen.';
        break;
      case 'addFav':
        msj = 'Se guardo correctemente en favoritos.';
    }

    const toas = await this.toastCtrl.create({
      message: msj,
      duration: 1000,
      position: 'top',
    });
    toas.present();
  }

  async uploadImage() {
    if (this.fileImg != null && this.fileImg != undefined) {
      let data = await this.apiDog.uploadImg(this.fileImg);
      let res = await data.json();
      if (data.status != 201) {
        // mostrar error
        let code = data.status;
        let msj = res.message;
        this.showAlert(code, msj);
      } else {
        this.showToast('upLoad');
        console.log('RES ID =>', res.id);
        let dtFav = await this.apiDog.saveFavorite(res.id);
        let resFav = await dtFav.json();
        if (dtFav.status != 200) {
          // mostrar error
          let codeF = dtFav.status;
          let msjF = resFav.message;
          this.showAlert(codeF, msjF);
        } else {
          this.delFile();
          this.showToast('addFav');
        }
      }
    }
  }
}
