import { Component } from '@angular/core';
import { IonicPage, NavController, AlertController } from 'ionic-angular';
//paginas importadas para uso en funciones
import { RegistrarPage } from '../registrar/registrar';
import { HelloIonicPage } from '../hello-ionic/hello-ionic';
//importamos el modulo para conectar y hacer la autenticación
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';
import { EmailComposer } from '@ionic-native/email-composer';


@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {


//datos de correo
subject='Recuperar contraseña';
body ='Quisiera recuperar mi contraseña, este es mi correo.';
to='raul7_@gmail.com';

//variables para traer datos
  responseData : any;
  userData = {"username": "","password": ""};

  constructor(public navCtrl: NavController, 
    public authService: AuthServiceProvider,
    public EmailComposer: EmailComposer,
    public alertCtrl: AlertController,) {
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
  else{ console.log("Datos incorrectos"); 
this.showAlert();
}
}, (err) => {
  // Error log
});

}

  send(){
    let email = {
      to: this.to,
      cc: [],
      bcc: [],
      attachment: [],
      subject: this.subject,
      body: this.body,
      isHtml: false,
    }
    this.EmailComposer.open(email);
  }
  showAlert() {
    const alert = this.alertCtrl.create({
      title: 'Datos incorrectos',
      subTitle: 'Por favor introduce datos válidos',
      buttons: ['De acuerdo']
    });
    alert.present();
  }

}
