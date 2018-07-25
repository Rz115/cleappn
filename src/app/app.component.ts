import { Component, ViewChild } from '@angular/core';

import { Platform, MenuController, Nav } from 'ionic-angular';

import { HelloIonicPage } from '../pages/hello-ionic/hello-ionic';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
/*Importamos la pagina de registrar para que sea el inicio de nuestra app, y lo cambiamos en la
parte de abajo*/
import { RegistrarPage } from '../pages/registrar/registrar';
import { ListPage } from '../pages/list/list';


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
      { title: 'Inicio', component: HelloIonicPage },
      { title: 'Perfil', component: ListPage },
      { title: 'Viajes recientes', component: HelloIonicPage },
      { title: 'Formas de pago', component: HelloIonicPage },
      { title: 'Ayuda', component: HelloIonicPage },
      { title: 'Términos y condiciones', component: HelloIonicPage }
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
    this.menu.close();
    // navigate to the new page if it is not the current page
    this.nav.setRoot(page.component);

  }
  
     
   
                 

}
