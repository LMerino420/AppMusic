import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { NavController } from '@ionic/angular';
import { Storage } from '@ionic/storage-angular';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  loginForm: FormGroup;
  validation_messages = {
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
    this.loginForm = this.formBuilder.group({
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

  loginUser(credentials) {
    console.log('Cred Login=>', credentials);
    this.authService
      .loginUser(credentials)
      .then((r) => {
        (this.errorMessage = ''),
          this.storage.set('userLoggedIn', true),
          this.navCtrl.navigateForward('/menu/home');
      })
      .catch((er) => {
        this.errorMessage = er;
      });
  }

  goToRegister() {
    this.navCtrl.navigateForward('/regist');
  }
  ngOnInit() {}
}
