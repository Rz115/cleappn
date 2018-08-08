import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { ProcesandoServicioPage } from '../procesando-servicio/procesando-servicio';


@Component({
  selector: 'page-hello-ionic',
  templateUrl: 'hello-ionic.html',
})

export class HelloIonicPage {

  constructor(public navCtrl: NavController) {
  }
  
 //pasar a pantalla para solicitar servicio
 paginaproceso(){
    this.navCtrl.push(ProcesandoServicioPage);
  }


}
