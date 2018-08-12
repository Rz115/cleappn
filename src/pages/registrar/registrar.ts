import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';
//paginas importadas
import { LoginPage } from '../login/login';
import { HelloIonicPage } from '../hello-ionic/hello-ionic';
import { HomeconductorPage } from '../homeconductor/homeconductor';
//importamos el modulo para conectar y hacer la autenticación
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';
import { FormControl, Validators, FormBuilder, FormGroup } from '@angular/forms';


@IonicPage()
@Component({
  selector: 'page-registrar',
  templateUrl: 'registrar.html',
})
export class RegistrarPage  implements OnInit{
  responseData : any;
  userData = {"username": "","password": "", "name": "","email": ""};

  myGroup: FormGroup;

  constructor(public navCtrl: NavController, public authService: AuthServiceProvider) {

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RegistrarPage');
  }

  ngOnInit(){
    let EMAILPATTERN = /^[a-z0-9!#$%&'*+\/=?^_`{|}~.-]+@[a-z0-9]([a-z0-9-]*[a-z0-9])?(\.[a-z0-9]([a-z0-9-]*[a-z0-9])?)*$/i;
    this.myGroup = new FormGroup({
      names: new FormControl('', [Validators.required, Validators.pattern('[a-zA-Z ]*'), Validators.minLength(4), Validators.maxLength(30)]),
      usernames: new FormControl('', [Validators.required, Validators.pattern('[a-zA-Z ]*'), Validators.minLength(4), Validators.maxLength(15)]),
      email: new FormControl('', [Validators.required, Validators.pattern(EMAILPATTERN)])
    });
  }

  signup(){
    this.authService.postData(this.userData,'signup').then((result) => {
     this.responseData = result;
     if(this.responseData.userData){
     console.log(this.responseData);
     localStorage.setItem('userData', JSON.stringify(this.responseData));
     this.navCtrl.setRoot(HelloIonicPage);
     }
     else{ console.log("User already exists"); }
   }, (err) => {
     // Error log
   });

 }




  paginadelogin(){
    this.navCtrl.push(LoginPage);
  }
  paginataxista(){
    this.navCtrl.setRoot(HomeconductorPage);
  }
/*
  names = new FormControl('', Validators.compose([
    Validators.required,
    Validators.pattern('^[a-z,A-Z]')
  ]));*/

}
