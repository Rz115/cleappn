import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';
//paginas importadas
import { LoginPage } from '../login/login';
import { HelloIonicPage } from '../hello-ionic/hello-ionic';
import { HomeconductorPage } from '../homeconductor/homeconductor';
//importamos el modulo para conectar y hacer la autenticación
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';


@IonicPage()
@Component({
  selector: 'page-registrar',
  templateUrl: 'registrar.html',
})
export class RegistrarPage {
  responseData : any;
  userData = {"username": "","password": "", "name": "","email": ""};

  constructor(public navCtrl: NavController, public authService: AuthServiceProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RegistrarPage');
  }

  signup(){
    this.authService.postData(this.userData,'signup').then((result) => {
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




  paginadelogin(){
    this.navCtrl.push(LoginPage);
  }
  paginataxista(){
    this.navCtrl.setRoot(HomeconductorPage);
  }
}
