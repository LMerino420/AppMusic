import { Component, OnInit } from '@angular/core';
import { ApiDogService } from 'src/app/services/api-dog.service';

@Component({
  selector: 'app-api-rest',
  templateUrl: './api-rest.page.html',
  styleUrls: ['./api-rest.page.scss'],
})
export class APIRestPage {
  urlImg: string;
  picOnly: boolean = true;
  images: any;

  constructor(private apiDog: ApiDogService) {
    this.getData();
  }

  async getData() {
    this.picOnly = true;
    let data = await this.apiDog.getData();
    this.urlImg = await data[0].url;
    // console.log('IMG=>', this.urlImg);
  }

  async getImages(keywords) {
    let cnt = keywords.target.value;
    if (cnt.length > 0 && cnt.length != '') {
      let cant = parseInt(cnt);
      let imgs = await this.apiDog.limitImage(cant);
      this.images = imgs;
      // console.log('IMGS=>', this.images);
      this.picOnly = false;
    } else {
      await this.getData();
      this.picOnly = true;
    }
  }
}
