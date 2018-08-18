import { Component } from '@angular/core';
import {
  IonicPage, NavController, NavParams, LoadingController,
  AlertController, MenuController
} from 'ionic-angular';



@IonicPage()
@Component({
  selector: 'page-perfilusuario',
  templateUrl: 'perfilusuario.html',
})
export class PerfilusuarioPage {

  //LAS VARIABLES DE CADA INPUT AL ENTRAR SE DECLARAN COMO DESHABILITADAS
  ocultar1: boolean = true;
  ocultar2: boolean = true;
  ocultar3: boolean = true;
  ocultar4: boolean = true;
  ocultar5: boolean = true;
  ocultartodos: boolean = false;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public loadingCtrl: LoadingController,
    private alertCtrl: AlertController,
    public menu: MenuController
  ) {
  }

  ionViewDidEnter() {
    this.menu.swipeEnable(false);
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad PerfilusuarioPage');
  }

  guardar() {
    this.presentLoading();
    this.ocultartodos = false;
    this.ocultar1  = true;
    this.ocultar2  = true;
    this.ocultar3  = true;
    this.ocultar4  = true;
    this.ocultar5  = true;

  }

  presentLoading() {
    const loader = this.loadingCtrl.create({
      content: "Guardando Cambios...",
      duration: 2000
    });
    loader.present();

  }

  presentAlert() {
    let alert = this.alertCtrl.create({
      title: 'Low battery',
      subTitle: '10% of battery remaining',
      buttons: ['Dismiss']
    });
    alert.present();
  }

  acciontodos() {

    if (this.ocultartodos === false) {
      //SE ENCIENDEN Y SE PUEDEN EDITAR LOS CAMPOS
      this.ocultar1 = false;
      this.ocultar2 = false;
      this.ocultar3 = false;
      this.ocultar4 = false;
      this.ocultar5 = false;
    }
    else {
      //QUE CONTINUEN OCULTOS
      this.ocultar1 = true;
      this.ocultar2 = true;
      this.ocultar3 = true;
      this.ocultar4 = true;
      this.ocultar5 = true;
    }

    this.ocultartodos = !this.ocultartodos;
  }



}
