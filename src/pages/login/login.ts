import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';
//paginas importadas para uso en funciones
import { RegistrarPage } from '../registrar/registrar';
import { HelloIonicPage } from '../hello-ionic/hello-ionic';
import { ContraPage } from '../contra/contra';
//importamos el modulo para conectar y hacer la autenticación
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';


@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  responseData : any;
  userData = {"username": "","password": ""};

  constructor(public navCtrl: NavController, public authService: AuthServiceProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  paginaregistro(){
    this.navCtrl.push(RegistrarPage);
  }
  login(){
    this.authService.postData(this.userData,'login').then((result) => {
      this.responseData = result;
      if(this.responseData.userData){
      console.log(this.responseData);
      localStorage.setItem('userData', JSON.stringify(this.responseData));
    this.navCtrl.setRoot(HelloIonicPage);
  }
  else{ console.log("User already exists"); }
}, (err) => {
  // Error log
});

}
  paginacon(){
    this.navCtrl.push(ContraPage);
  }

}
