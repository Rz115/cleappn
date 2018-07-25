import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
//paginas importadas para uso en funciones
import { RegistrarPage } from '../registrar/registrar';
import { HelloIonicPage } from '../hello-ionic/hello-ionic';
import { ContraPage } from '../contra/contra';


@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  paginaregistro(){
    this.navCtrl.push(RegistrarPage);
  }
  ingresarhome(){
    this.navCtrl.setRoot(HelloIonicPage);
  }
  paginacon(){
    this.navCtrl.push(ContraPage);
  }

}
