import { Component } from '@angular/core';
import { ApiDogService } from 'src/app/services/api-dog.service';

@Component({
  selector: 'app-favoritos',
  templateUrl: './favoritos.page.html',
  styleUrls: ['./favoritos.page.scss'],
})
export class FavoritosPage {
  constructor(private apiDog: ApiDogService) {}

  async ionViewDidEnter() {
    let data = await this.apiDog.loadFavorites();
    let res = await data.json();
    console.log('DID ENTER =>', res);
  }
}
