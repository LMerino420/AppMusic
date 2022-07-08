import { Component } from '@angular/core';
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

  constructor(private apiDog: ApiDogService) {
    this.getData();
  }

  async getData() {
    this.picOnly = true;
    let data = await this.apiDog.getData();
    const res = await data.json();
    // console.log('DATA =>', data);
    if (data.status != 200) {
      // mostrar error
      this.showError = true;
      this.msjError = 'Error: ' + res.status + ', ' + res.message;
    } else {
      this.limitImages = null;
      this.introGallery = res;
    }
  }

  async getImages(keywords) {
    let cnt = keywords.target.value;
    if (cnt.length > 0 && cnt.length != '') {
      let data = await this.apiDog.limitImage(cnt);
      let res = await data.json();
      if (data.status != 200) {
        // mostrar error
        this.showError = true;
        this.msjError = 'Error: ' + res.status + ', ' + res.message;
      } else {
        this.introGallery = null;
        this.limitImages = res;
        this.picOnly = false;
      }
    } else {
      await this.getData();
      this.picOnly = true;
    }
  }

  async saveFavorite(item) {
    console.log('ITEM SAVE=>', item);
    let data = await this.apiDog.saveFavorites(item.id);
    let res = await data.json();
    if (data.status != 200) {
      this.showError = true;
      this.msjError = 'Error: ' + res.status + ', ' + res.message;
    } else {
      console.log('DATA SAVE=>', data);
    }
  }
}
