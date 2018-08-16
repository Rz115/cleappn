import { Component } from '@angular/core';
import { IonicPage, NavController, AlertController, MenuController, Platform } from 'ionic-angular';
//paginas importadas para uso en funciones
import { RegistrarPage } from '../registrar/registrar';
import { HelloIonicPage } from '../hello-ionic/hello-ionic';
//importamos el modulo para conectar y hacer la autenticación
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';
import { EmailComposer } from '@ionic-native/email-composer';
import { HomeconductorPage } from '../homeconductor/homeconductor';


@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  public unregisterBackButtonAction: any;
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
    public alertCtrl: AlertController,
    private menu: MenuController,
    public platform: Platform) {
  }

 
  ionViewDidEnter(){
    this.menu.swipeEnable(false);
  }
  paginaregistro(){
    this.navCtrl.setRoot(RegistrarPage);
  }

  
  login(){
    this.authService.postData(this.userData,'login').then((result) => {
      this.responseData = result;
      if(this.responseData.userData){
      console.log(this.responseData);
      localStorage.setItem('userData', JSON.stringify(this.responseData));
      if(this.responseData.userData.rol_user == 3){
        this.navCtrl.setRoot(HelloIonicPage);
      }
      else{
        this.navCtrl.setRoot(HomeconductorPage);
      }
    
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
  ionViewDidLoad() {
    this.initializeBackButtonCustomHandler();
}

ionViewWillLeave() {
    // Unregister the custom back button action for this page
    this.unregisterBackButtonAction && this.unregisterBackButtonAction();
}

initializeBackButtonCustomHandler(): void {
    this.unregisterBackButtonAction = this.platform.registerBackButtonAction(function(event){
        console.log('Prevent Back Button Page Change');
    }, 101); // Priority 101 will override back button handling (we set in app.component.ts) as it is bigger then priority 100 configured in app.component.ts file */
}       
}
