import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { NavController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';
import { Storage } from '@ionic/storage-angular';

@Component({
  selector: 'app-regist',
  templateUrl: './regist.page.html',
  styleUrls: ['./regist.page.scss'],
})
export class RegistPage implements OnInit {
  registForm: FormGroup;
  validation_messages = {
    nombre: [{ type: 'required', message: 'El nombre es requerido' }],
    apellido: [{ type: 'required', message: 'El apellido es requerido' }],
    email: [
      { type: 'required', message: 'El email es requerido' },
      { type: 'pattern', message: 'No es un email valido' },
    ],
    password: [
      { type: 'required', message: 'El password es requerido' },
      { type: 'minLength', message: 'Tamaño minimo 5 caracteres' },
    ],
  };
  errorMessage: string;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private navCtrl: NavController,
    private storage: Storage
  ) {
    this.registForm = this.formBuilder.group({
      nombre: new FormControl('', Validators.compose([Validators.required])),
      apellido: new FormControl('', Validators.compose([Validators.required])),
      email: new FormControl(
        '',
        Validators.compose([
          Validators.required,
          Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$'),
        ])
      ),
      password: new FormControl(
        '',
        Validators.compose([Validators.required, Validators.minLength(5)])
      ),
    });
  }

  regist(userData) {
    console.log('uData REGIST=>', userData.password);
    userData.password = btoa(userData.password);
    this.authService.registUser(userData).then(() => {
      this.navCtrl.navigateBack('/login');
    });
  }

  goBack() {
    this.navCtrl.navigateBack('/login');
  }
  ngOnInit() {}
}
