import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
//paginas importadas 
import { LoginPage } from '../login/login';
import { HelloIonicPage } from '../hello-ionic/hello-ionic';



@IonicPage()
@Component({
  selector: 'page-registrar',
  templateUrl: 'registrar.html',
})
export class RegistrarPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RegistrarPage');
  }

  paginasiguiente(){
    this.navCtrl.setRoot(HelloIonicPage);
  }
  paginadelogin(){
    this.navCtrl.push(LoginPage);
  }
}
