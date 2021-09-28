import { ClienteService } from './../../services/domain/cliente.service';
import { StorageService } from './../../services/storage.service';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ClienteDTO } from '../../models/cliente.dto';
import { API_CONFIG } from '../../config/api.config';
import { CameraOptions, Camera } from '@ionic-native/camera';



@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {

  //email: string;
  cliente: ClienteDTO;
  picture: string;
  cameraOn: boolean = false;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public storage: StorageService,
    public clienteService: ClienteService,
    public camera: Camera) {
  }

  loadData(){
    let LocalUser = this.storage.getLocalUser();
    if(LocalUser && LocalUser.email){
      //this.email = LocalUser.email;
      this.clienteService.findByEmail(LocalUser.email)
      .subscribe(response => {
        this.cliente = response as ClienteDTO;//Declaramos como "as ClienteDTO" para que os dados case com a tipagem de ClienteDTO
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

//refatoramos para poder receber endereços pelo cadastro do cliente
  ionViewDidLoad() {
     this.loadData();
  }

  getImageIfExist(){
    this.clienteService.getImageFromBucket(this.cliente.id)
    .subscribe(response => {
      this.cliente.imageUrl = `${API_CONFIG.bucketBaseUrl}/cp${this.cliente.id}.jpg`;
    },
    error =>{});
  }

  getCameraPicture(){

    this.cameraOn = true;

    const options: CameraOptions = {
  quality: 100,
  destinationType: this.camera.DestinationType.DATA_URL,
  encodingType: this.camera.EncodingType.PNG,
  mediaType: this.camera.MediaType.PICTURE
}

this.camera.getPicture(options).then((imageData) => {
 // imageData is either a base64 encoded string or a file URI
 // If it's base64 (DATA_URL):
 //let base64Image = 'data:image/jpeg;base64,' + imageData;
 this.picture =  'data:image/png;base64,' + imageData;
 this.cameraOn = false;
}, (err) => {
 // Handle error
});
  }

  sendPicture(){
    this.clienteService.uploadPicture(this.picture)
    .subscribe(response => {
      this.picture = null;
      this.loadData();//recarregar a pagina
    },
    error => {

    })
  }

  cancel(){
    this.picture = null;
  }
}
