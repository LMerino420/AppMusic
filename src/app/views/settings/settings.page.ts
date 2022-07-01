import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
})
export class SettingsPage implements OnInit {
  usImg = '/assets/img/foto.jpg';
  photo: SafeResourceUrl;

  constructor(private sanitizer: DomSanitizer) {}

  ngOnInit() {}

  async takePic() {
    const img = await Camera.getPhoto({
      quality: 100,
      allowEditing: false,
      resultType: CameraResultType.DataUrl,
      source: CameraSource.Camera,
    });
    this.photo = await this.sanitizer.bypassSecurityTrustResourceUrl(
      img && img.dataUrl
    );
  }
}
