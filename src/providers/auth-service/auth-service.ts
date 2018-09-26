import { Http, Headers } from '@angular/http';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';

let apiUrl = "https://devector.com.mx/PHP-Slim-Restful/api/";

@Injectable()
export class AuthServiceProvider {
  


  constructor(public http: Http) {
    
   
  }

/* ACTIVAR O DESACTIVAR BOTON EN INICIO DEPENDIENDO DATOS */
getidtarjeta() {
  return this.http.get(apiUrl+"getidtarjetas").map(res => res.json())
}

  /*             COORDENADAS TAXISTAS                      */ 
  getlongitud1() {
    return this.http.get(apiUrl+"getlongituduno").map(res => res.json())
  }
  getlatitud1() {
    return this.http.get(apiUrl+"getlatituduno").map(res => res.json())
  }
  getiddrivers() {
    return this.http.get(apiUrl+"getiddriver").map(res => res.json())
  }
// RECIBIR COORDENADAS DEL USUARIO PARA EL CONDUCTOR 14
  getlat(){
    return this.http.get(apiUrl+"buscarlatitud").map(res => res.json())
  }
  getlong(){
    return this.http.get(apiUrl+"buscarlongitud").map(res => res.json())
  }
   

//METODO POST PARA REGISTRO - LOGIN Y ACTUALIZACION
  postData(withCredentials, type) {
    return new Promise((resolve, reject) => {
      let headers = new Headers();

      this.http.post(apiUrl + type, JSON.stringify(withCredentials), {headers: headers})
        .subscribe(res => {
          resolve(res.json());
        }, (err) => {
          reject(err);
        });
    });

  }

}