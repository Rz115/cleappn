import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';



@IonicPage()
@Component({
  selector: 'page-contra',
  templateUrl: 'contra.html',
})
export class ContraPage {

  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    public alertCtrl: AlertController) {  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ContraPage');
  }
  showAlert() {
    const alert = this.alertCtrl.create({
      title: 'Aviso',
      subTitle: 'Se te ha enviado una notificación a tu correo'+
      ' con la recuperación de tu contraseña',
      buttons: ['De acuerdo']
    });
    alert.present();
  }
}


