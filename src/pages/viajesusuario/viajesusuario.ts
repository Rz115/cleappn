import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController } from 'ionic-angular';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';



@IonicPage()
@Component({
  selector: 'page-viajesusuario',
  templateUrl: 'viajesusuario.html',
})
export class ViajesusuarioPage {
  
  userid: any;
  viajes = {"user_id":"","username":""};
  datos: any = []

  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    public authService: AuthServiceProvider,
  private menu: MenuController) {

    this.userid = this.navParams.get('userid');
    console.log(this.userid);

  }
  ngOnInit(){
 
    this.traerdatos();
  
  }

  ionViewDidEnter(){
    this.menu.swipeEnable(false);
  }

  traerdatos(){
    this.viajes.user_id = this.userid
    this.authService.postData(this.viajes,'getViajesUsuario').then((result) => {
      this.datos = result;
      //console.log(this.datos); 
    
    }, (err) => {
      // Error log
      });
      
  }






}
