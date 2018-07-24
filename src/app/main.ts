import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app.module';
//para ejecutar la aplicacion en modo de producción
import { enableProdMode } from '@angular/core';
enableProdMode();
platformBrowserDynamic().bootstrapModule(AppModule);
