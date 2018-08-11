import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController } from 'ionic-angular';
import { ConductorEncontradoPage } from '../conductor-encontrado/conductor-encontrado';

/**
 * Generated class for the ProcesandoServicioPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-procesando-servicio',
  templateUrl: 'procesando-servicio.html',
})
export class ProcesandoServicioPage {

  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
  private menu: MenuController) {
  }

  ionViewDidEnter(){
    this.menu.swipeEnable(false);
  }
  procesoterminado(){
    this.navCtrl.push(ConductorEncontradoPage);
  }
}
