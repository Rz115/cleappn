import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { ProcesandoServicioPage } from '../procesando-servicio/procesando-servicio';
//importamos el modulo para conectar y hacer la autenticación
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';

@Component({
  selector: 'page-hello-ionic',
  templateUrl: 'hello-ionic.html',
})

export class HelloIonicPage {

  userDetails : any;
  responseData: any;

  userPostData = {"user_id":"","token":""};

  constructor(public navCtrl: NavController, public authService:AuthServiceProvider) {
  const data = JSON.parse(localStorage.getItem('userData'));
  this.userDetails = data.userData;

  this.userPostData.user_id = this.userDetails.user_id;
  this.userPostData.token = this.userDetails.token;

}
 //pasar a pantalla para solicitar servicio
 paginaproceso(){
    this.navCtrl.push(ProcesandoServicioPage);
  }
  

}
