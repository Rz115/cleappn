import { Component } from '@angular/core';
import {
  IonicPage, NavController, NavParams, LoadingController,
  AlertController, MenuController
} from 'ionic-angular';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';



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
  
  categorys: any = []
  responseDatas : any = [];
  userDetails: any;
  actualizar = {"username":"","email":"","ubication":""};
  userid: number;


  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public loadingCtrl: LoadingController,
    private alertCtrl: AlertController,
    public menu: MenuController,
    public authService: AuthServiceProvider,
    public http: Http
  ) {

    const data = JSON.parse(localStorage.getItem('userData'));
    this.userDetails = data.userData;

    this.userid = this.navParams.get('userid');
    console.log(this.userid);
  
  }

  ngOnInit(){
 
    this.traerdatos();
  
  }
  
  traerdatos(){
    this.http.get("https://devector.com.mx/PHP-Slim-Restful/api/getDatosUsuario").map(res => res.json()).subscribe(
      data => {

        for(var i = 0; i <= this.userid; i++){
          
          if(this.userid == this.userDetails.user_id){
            this.actualizar = data.feedDatas[i]
            console.log(this.actualizar);
          }
        }



    },
      err => {
        console.log(err)
      }
    )
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
