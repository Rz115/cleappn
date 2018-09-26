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
  
//LAS VARIABLES DE CADA INPUT AL ENTRAR SE DECLARAN COMO DESHABILITADAS
  ocultar1: boolean = true;
  ocultar2: boolean = true;
  ocultar3: boolean = true;
  ocultar4: boolean = true;
  ocultar5: boolean = true;
  ocultartodos: boolean = false;
  
  responseDatas : any = [];
  userDetails: any;
  actualizar = {"user_id":"","username":"","email":"","ubication":""};
  userid: any;
  datos: any = [];


  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public loadingCtrl: LoadingController,
    private alertCtrl: AlertController,
    public menu: MenuController,
    public authService: AuthServiceProvider
  ) {

    const data = JSON.parse(localStorage.getItem('userData'));
    this.userDetails = data.userData;

    this.userid = this.navParams.get('userid');
   // console.log(this.userid);
  
  }

  ngOnInit(){
 
    this.traerdatos();
  
  }
  
  traerdatos(){
    this.actualizar.user_id = this.userid
    this.authService.postData(this.actualizar,'gets').then((result) => {
      this.datos = result;
     // console.log(this.datos); 
     //El array toma los datos cargados en la consulta para mostrarlos 
      this.actualizar.username = this.datos.username
      this.actualizar.email = this.datos.email
      this.actualizar.ubication = this.datos.ubication
    }, (err) => {
      // Error log
      });
      
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
    
      this.authService.postData(this.actualizar,'loaddata').then((result) => {
        this.responseDatas = result[0],
        er => console.log(er),
       () => console.log('Ok')
       this.traerdatos();
        
}, (err) => {
  // Error log
});


}
 
  



}
