import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { IonicStorageModule } from '@ionic/storage';

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
import { GoogleMaps } from '@ionic-native/google-maps';
import { ProcesandoServicioPageModule } from '../pages/procesando-servicio/procesando-servicio.module';
import { ConductorEncontradoPageModule } from '../pages/conductor-encontrado/conductor-encontrado.module';
import { PerfilusuarioPageModule } from '../pages/perfilusuario/perfilusuario.module';
import { ViajesusuarioPageModule } from '../pages/viajesusuario/viajesusuario.module';
import { FormadepagoPageModule } from '../pages/formadepago/formadepago.module';
import { AyudaPageModule } from '../pages/ayuda/ayuda.module';
import { TerminosPageModule } from '../pages/terminos/terminos.module';
import { NuevaTarjetaPageModule } from '../pages/nueva-tarjeta/nueva-tarjeta.module';
import { AuthServiceProvider } from '../providers/auth-service/auth-service';
import { Geolocation } from '@ionic-native/geolocation';
import { HomeconductorPageModule } from '../pages/homeconductor/homeconductor.module';
import { StatusconductorPageModule } from '../pages/statusconductor/statusconductor.module';
import { PerfilconductorPageModule } from '../pages/perfilconductor/perfilconductor.module';
import { TerminosconductorPageModule } from '../pages/terminosconductor/terminosconductor.module';
//acceso a los archivos json y conexiones
import { HttpModule } from '@angular/http';
//correo plugin
import { EmailComposer } from '@ionic-native/email-composer';
import { ValoracionesPageModule } from '../pages/valoraciones/valoraciones.module';

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
    HttpModule,
    IonicStorageModule.forRoot(),
    IonicModule.forRoot(MyApp,{
      scrollAssist: true,
      autoFocusAssist: true
    }),

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
    NuevaTarjetaPageModule,
    HomeconductorPageModule,
    StatusconductorPageModule,
    PerfilconductorPageModule,
    TerminosconductorPageModule,
    ValoracionesPageModule

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
    GoogleMaps,
    Geolocation,
    EmailComposer,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    AuthServiceProvider
  ]
})
export class AppModule {}
