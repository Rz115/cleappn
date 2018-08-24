import { Http, Headers } from '@angular/http';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';

let apiUrl = "https://devector.com.mx/PHP-Slim-Restful/api/";

@Injectable()
export class AuthServiceProvider {
  
  private url: string 

  constructor(public http: Http) {
    this.url = "https://devector.com.mx/PHP-Slim-Restful/api/";
    console.log('Hello AuthServiceProvider Provider');
  }

  getData() {
    return this.http.get(apiUrl + "/coordenadas.php?action=getlatitud").map(res => res.json())
  }
  

  postData(credentials, type) {
    return new Promise((resolve, reject) => {
      let headers = new Headers();

      this.http.post(apiUrl + type, JSON.stringify(credentials), {headers: headers})
        .subscribe(res => {
          resolve(res.json());
        }, (err) => {
          reject(err);
        });
    });

  }

}