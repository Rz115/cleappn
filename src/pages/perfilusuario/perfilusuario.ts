import { Component } from '@angular/core';
import {
  IonicPage, NavController, NavParams, LoadingController,
  AlertController, MenuController
} from 'ionic-angular';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';



@IonicPage()
@Component({
  selector: 'page-perfilusuario',
  templateUrl: 'perfilusuario.html',
})
export class PerfilusuarioPage {
  responseData : any = [];

  //LAS VARIABLES DE CADA INPUT AL ENTRAR SE DECLARAN COMO DESHABILITADAS
  ocultar1: boolean = true;
  ocultar2: boolean = true;
  ocultar3: boolean = true;
  ocultar4: boolean = true;
  ocultar5: boolean = true;
  ocultartodos: boolean = false;
  userData: {"username": "","email": "", "ubication": ""};
  userid: number;
  userDetails: any;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public loadingCtrl: LoadingController,
    private alertCtrl: AlertController,
    public menu: MenuController,
    public authService: AuthServiceProvider
  ) {
  }


  ngOnInit(){
    this.userDetails = this.navParams.get('userDetails')
   // this.userid = this.navParams.get('userid')
    console.log(this.userDetails.userid );
  }


  ionViewDidEnter() {
    this.menu.swipeEnable(false);
  }
 

  guardar() {
    this.presentLoading();
    this.ReadData();
    this.ocultartodos = false;
    this.ocultar1  = true;
    this.ocultar2  = true;
    this.ocultar3  = true;
    this.ocultar4  = true;
    this.ocultar5  = true;

  }

  presentLoading() {
    const loader = this.loadingCtrl.create({
      content: "Guardando Cambios...",
      duration: 2000
    });
    loader.present();

  }

  presentAlert() {
    let alert = this.alertCtrl.create({
      title: 'Low battery',
      subTitle: '10% of battery remaining',
      buttons: ['Dismiss']
    });
    alert.present();
  }

  acciontodos() {

    if (this.ocultartodos === false) {
      //SE ENCIENDEN Y SE PUEDEN EDITAR LOS CAMPOS
      this.ocultar1 = false;
      this.ocultar2 = false;
      this.ocultar3 = false;
      this.ocultar4 = false;
      this.ocultar5 = false;
    }
    else {
      //QUE CONTINUEN OCULTOS
      this.ocultar1 = true;
      this.ocultar2 = true;
      this.ocultar3 = true;
      this.ocultar4 = true;
      this.ocultar5 = true;
    }

    this.ocultartodos = !this.ocultartodos;
  }

  ReadData(){
    this.authService.postData(this.userData,'loaddata').then((result) => {
     this.responseData = result;
     if(this.responseData.userData){
     console.log(this.responseData);
     localStorage.setItem('userData', JSON.stringify(this.responseData));
     
     }
     else{ console.log("No se pueden cargar los datos "); 
    
  }
   }, (err) => {
     // Error log
   });

  } 





}
