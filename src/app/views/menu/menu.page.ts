import { Component } from '@angular/core';
import { MenuController, NavController } from '@ionic/angular';
import { Storage } from '@ionic/storage-angular';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.page.html',
  styleUrls: ['./menu.page.scss'],
})
export class MenuPage {
  constructor(
    private menuCtrl: MenuController,
    private navCtrl: NavController,
    private storage: Storage
  ) {}

  closeMenu() {
    this.menuCtrl.close();
  }

  logOut() {
    this.storage.remove('userLoggedIn');
    this.navCtrl.navigateRoot('/login');
  }

  goHome() {
    this.navCtrl.navigateRoot('/menu');
    this.menuCtrl.close();
  }

  goSport() {
    this.navCtrl.navigateRoot('/menu/sport');
    this.menuCtrl.close();
  }

  goApiRest() {
    this.navCtrl.navigateRoot('/menu/api-rest');
    this.menuCtrl.close();
  }

  goSettings() {
    this.navCtrl.navigateRoot('/menu/settings');
    this.menuCtrl.close();
  }
}
