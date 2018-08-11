import { Component } from '@angular/core';
import { IonicPage, NavController, AlertController, MenuController } from 'ionic-angular';
//paginas importadas
import { LoginPage } from '../login/login';
import { HelloIonicPage } from '../hello-ionic/hello-ionic';
import { HomeconductorPage } from '../homeconductor/homeconductor';
//importamos el modulo para conectar y hacer la autenticación
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';
import { ContraPage } from '../contra/contra';


@IonicPage()
@Component({
  selector: 'page-registrar',
  templateUrl: 'registrar.html',
})
export class RegistrarPage {
  responseData : any = [];
  userData = {"username": "","password": "", "name": "","email": ""};

  constructor(public navCtrl: NavController, 
    public authService: AuthServiceProvider,
    public alertCtrl: AlertController,
  private menu: MenuController) {
  }

  ionViewDidEnter(){
    this.menu.swipeEnable(false);
  }

  signup(){
    this.authService.postData(this.userData,'signup').then((result) => {
     this.responseData = result;
     if(this.responseData.userData){
     console.log(this.responseData);
     localStorage.setItem('userData', JSON.stringify(this.responseData));
     this.navCtrl.setRoot(HelloIonicPage);
     }
     else{ console.log("User already exists"); 
    this.showAlert();
  }
   }, (err) => {
     // Error log
   });

 }


 showAlert() {
  const alert = this.alertCtrl.create({
    title: 'Error al registrarse',
    subTitle: 'Por favor complete todos los campos',
    buttons: ['De acuerdo']
  });
  alert.present();
}

  paginadelogin(){
    this.navCtrl.setRoot(LoginPage);
  }
  paginataxista(){
    this.navCtrl.setRoot(HomeconductorPage);
  }
//tarjeta pagina para pasar una vez que te registrras a meter los datos de la tarjeta

  paginasiguiente(){
    
    this.navCtrl.push(ContraPage);
     
    }



}
