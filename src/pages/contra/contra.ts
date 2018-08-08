import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { EmailComposer } from '@ionic-native/email-composer';


@IonicPage()
@Component({
  selector: 'page-contra',
  templateUrl: 'contra.html',
})
export class ContraPage {

  subject="";
  body="Hola, me gustaria recuperar mi cuenta";
  to="raul7_mh@hotmail.com";

  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    public alertCtrl: AlertController,
    public emailComposer: EmailComposer) {  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ContraPage');
  }

  send(){
    let email = {
      to: this.to,
      cc: this.body,
      bcc: [],
      attachment: [],
      subject: this.subject,
      body: this.body,
      isHtml: false,
      app: "Gamil"
    }
    this.emailComposer.open(email);
    this.showAlert();
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


