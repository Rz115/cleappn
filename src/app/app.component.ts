import { Component } from '@angular/core';
import { Platform, ToastController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
/*Importamos la pagina de registrar para que sea el inicio de nuestra app, y lo cambiamos en la
parte de abajo*/
import { RegistrarPage } from '../pages/registrar/registrar';




@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  

 
  // make REGISTRAR the root (or first) page
  rootPage = RegistrarPage;
 
  
  //pages: Array<{title: string, component: any}>;

  constructor(
    public platform: Platform,
    
    public statusBar: StatusBar,
    public splashScreen: SplashScreen,
    public toastCtrl: ToastController,
 
  ) {

    this.initializeApp();

   
  }


  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

}
