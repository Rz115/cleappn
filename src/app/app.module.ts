import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { HelloIonicPage } from '../pages/hello-ionic/hello-ionic';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
//Importamos las paginas utilizadas a partir de aquí
import { RegistrarPageModule } from '../pages/registrar/registrar.module';
import { LoginPageModule } from '../pages/login/login.module';
import { ContraPageModule } from '../pages/contra/contra.module';
import { ListPage } from '../pages/list/list';
import { ItemDetailsPage } from '../pages/item-details/item-details';
import { MapComponent } from '../components/map/map';
import { ProcesandoServicioPageModule } from '../pages/procesando-servicio/procesando-servicio.module';
import { ConductorEncontradoPageModule } from '../pages/conductor-encontrado/conductor-encontrado.module';
import { PerfilusuarioPageModule } from '../pages/perfilusuario/perfilusuario.module';
import { ViajesusuarioPageModule } from '../pages/viajesusuario/viajesusuario.module';
import { FormadepagoPageModule } from '../pages/formadepago/formadepago.module';
import { AyudaPageModule } from '../pages/ayuda/ayuda.module';
import { TerminosPageModule } from '../pages/terminos/terminos.module';
import { NuevaTarjetaPageModule } from '../pages/nueva-tarjeta/nueva-tarjeta.module';

@NgModule({
  declarations: [
    MyApp,
    HelloIonicPage,
    ListPage,
    ItemDetailsPage,
    MapComponent
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    //se importan los modulos de las páginas creadas en esta sección
    RegistrarPageModule,
    LoginPageModule,
    ContraPageModule,
    ProcesandoServicioPageModule,
    ConductorEncontradoPageModule,
    PerfilusuarioPageModule,
    ViajesusuarioPageModule,
    FormadepagoPageModule,
    AyudaPageModule,
    TerminosPageModule,
    NuevaTarjetaPageModule
    
    
    
    
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HelloIonicPage,
    ListPage,
    ItemDetailsPage,
    MapComponent
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
