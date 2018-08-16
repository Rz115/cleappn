import { Component } from '@angular/core';
import { IonicPage, NavController, AlertController, MenuController } from 'ionic-angular';
//paginas importadas
import { LoginPage } from '../login/login';
import { HelloIonicPage } from '../hello-ionic/hello-ionic';
import { HomeconductorPage } from '../homeconductor/homeconductor';
//importamos el modulo para conectar y hacer la autenticación
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';
import { ContraPage } from '../contra/contra';
import { FormControl, Validators, FormGroup } from '@angular/forms';


@IonicPage()
@Component({
  selector: 'page-registrar',
  templateUrl: 'registrar.html',
})
export class RegistrarPage {
  responseData : any = [];
  userData = {"username": "","password": "", "name": "","email": ""};

  myGroup: FormGroup;
  isenabled:boolean=false;
  constructor(public navCtrl: NavController, 
    public authService: AuthServiceProvider,
    public alertCtrl: AlertController,
  private menu: MenuController) {
  }

  ionViewDidEnter(){
    this.menu.swipeEnable(false);
  }

  ngOnInit(){
    let EMAILPATTERN = /^[a-z0-9!#$%&'*+\/=?^_`{|}~.-]+@[a-z0-9]([a-z0-9-]*[a-z0-9])?(\.[a-z0-9]([a-z0-9-]*[a-z0-9])?)*$/i;
    this.myGroup = new FormGroup({
      names: new FormControl('', [Validators.required, Validators.pattern('[a-zA-Z ]*'), Validators.minLength(4), Validators.maxLength(30)]),
      usernames: new FormControl('', [Validators.required, Validators.pattern('[a-zA-Z ]*'), Validators.minLength(4), Validators.maxLength(15)]),
      email: new FormControl('', [Validators.required, Validators.pattern(EMAILPATTERN)])
    });
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
    subTitle: 'Por favor complete todos los campos o use un nombre de usuario distinto',
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
