import { Component, ViewChild } from '@angular/core';

import { Platform, MenuController, Nav } from 'ionic-angular';

import { HelloIonicPage } from '../pages/hello-ionic/hello-ionic';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
/*Importamos la pagina de registrar para que sea el inicio de nuestra app, y lo cambiamos en la
parte de abajo*/
import { RegistrarPage } from '../pages/registrar/registrar';
import { PerfilusuarioPage } from '../pages/perfilusuario/perfilusuario';
import { ViajesusuarioPage } from '../pages/viajesusuario/viajesusuario';
import { FormadepagoPage } from '../pages/formadepago/formadepago';
import { TerminosPage } from '../pages/terminos/terminos';
import { AyudaPage } from '../pages/ayuda/ayuda';
import { LoginPage } from '../pages/login/login';


@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  // make REGISTRAR the root (or first) page
  rootPage = RegistrarPage;
  pages: Array<{title: string, component: any}>;

  constructor(
    public platform: Platform,
    public menu: MenuController,
    public statusBar: StatusBar,
    public splashScreen: SplashScreen
  ) {
  
    this.initializeApp();

    // set our app's pages
    this.pages = [
   
      { title: 'Perfil', component: PerfilusuarioPage },
      { title: 'Viajes recientes', component: ViajesusuarioPage },
      { title: 'Formas de pago', component: FormadepagoPage },
      { title: 'Ayuda', component: AyudaPage },
      { title: 'Términos y condiciones', component: TerminosPage },
      { title: 'Cerrar Sesión', component: LoginPage }
    ];
  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  openPage(page) {
    // close the menu when clicking a link from the menu
   
    if(page == HelloIonicPage){
      //this.nav.setRoot(page.component);
      this.menu.close();
    }
    
    this.nav.push(page.component);
    this.menu.close();
                             
}  
                 

}
