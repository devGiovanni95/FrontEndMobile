import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from 'rxjs/Rx';
import { ClienteDTO } from '../../models/cliente.dto';
import { API_CONFIG } from '../../config/api.config';
import { StorageService } from '../storage.service';
import { ImageUtilService } from '../image-util.service';

@Injectable()
export class ClienteService {

  constructor(
    public http: HttpClient,
    public storage: StorageService,
    public imageUtilService: ImageUtilService) {
  }

   findById(id: string){
     return this.http.get(`${API_CONFIG.baseUrl}/clientes/${id}`);
  }

  //Refatoramos
  findByEmail(email: string){
    /* let token = this.storage.getLocalUser().token;
     let authHeader = new HttpHeaders({'Authorization': 'Bearer ' + token});
 
     return this.http.get<ClienteDTO>(
       `${API_CONFIG.baseUrl}/clientes/email?value=${email}`,//nao estava aparecendo imagem pois estava com aspa en vez de acennto circunflexo
        {'headers': authHeader});*/
    return this.http.get(`${API_CONFIG.baseUrl}/clientes/email?value=${email}`);
  }

  getImageFromBucket(id: string): Observable<any> {
    let url = `${API_CONFIG.bucketBaseUrl}/cp${id}.jpg`
    return this.http.get(url, { responseType: 'blob' });
  }
//Fazer uma requisição esperar uma resposta do tipo text, 
//para evitar um erro de ParseJson
  insert(obj : ClienteDTO){
    return this.http.post(
      `${API_CONFIG.baseUrl}/clientes`,
      obj,
      {
        observe: 'response',
        responseType: 'text'
      }
    );
  }

  uploadPicture(picture){
    let pictureBlob = this.imageUtilService.dataUriToBlob(picture);//converter a foto que estava no formato 64 para tipo blob
    //pra fazer da mesma forma como no postman
    let formData : FormData = new FormData();
    formData.set('file', pictureBlob, 'file.png');
    return this.http.post(
      `${API_CONFIG.baseUrl}/clientes/picture`,
      formData,
      {
        observe: 'response',
        responseType: 'text'
      }
    );

  }
}
