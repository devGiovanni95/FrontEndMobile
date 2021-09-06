import { ClienteService } from './../../services/domain/cliente.service';
import { StorageService } from './../../services/storage.service';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ClienteDTO } from '../../models/cliente.dto';
import { API_CONFIG } from '../../config/api.config';

/**
 * Generated class for the ProfilePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {

  //email: string;
  cliente: ClienteDTO;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public storage: StorageService,
    public clienteService: ClienteService) {
  }

  ionViewDidLoad() {
   let LocalUser = this.storage.getLocalUser();
   if(LocalUser && LocalUser.email){
     //this.email = LocalUser.email;
     this.clienteService.findByEmail(LocalUser.email)
     .subscribe(response => {
       this.cliente = response;
       this.getImageIfExist();
     },
     error => {
       if(error.status == 403){
         this.navCtrl.setRoot('HomePage');
       }
     });
   }/**Se caso na busca de usuarios por email dar errado ele voltar para home page */
   else{
    this.navCtrl.setRoot('HomePage');
   }
  }

  getImageIfExist(){
    this.clienteService.getImageFromBucket(this.cliente.id)
    .subscribe(response => {
      this.cliente.imageUrl = `${API_CONFIG.bucketBaseUrl}/cp${this.cliente.id}.jpg`;
    },
    error =>{});
  }
}
