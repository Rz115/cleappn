import { Http, Headers } from '@angular/http';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';

let apiUrl = "https://devector.com.mx/PHP-Slim-Restful/api/";

@Injectable()
export class AuthServiceProvider {
  


  constructor(public http: Http) {
    
    console.log('Hello AuthServiceProvider Provider');
  }

  getData() {
    return this.http.get(apiUrl+"getlatitud").map(res => res.json())
  }

  getusuario() {
    return this.http.get(apiUrl+"getDatosUsuario").map(res => res.json())
  }

  


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