import { API_CONFIG } from './../config/api.config';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CredenciaisDTO } from '../models/credenciais.dto';
import { StorageService } from './storage.service';
import { LocalUser } from '../models/local_user';


@Injectable()
export class AuthService{

  // construtor para acessar uma requisição http
  constructor(public http: HttpClient, public storage: StorageService){

  }

  authenticate(creds : CredenciaisDTO){
   return this.http.post(
      `${API_CONFIG.baseUrl}/login`,
      creds,
      {
        observe: `response`,/*Como vamos buscar no header- essa funcao vai especificar que uma requisicao do tipo respota*/
        responseType: `text`/*Para nao tyentar fazer um parse no JSON e dar um erro*/
      }

   )};

   /*Salvar o Login armazenando no localStorage*/
   successfulLogin(authorizationValue : string) {
    let tok = authorizationValue.substring(7);//comeca a partir da 7 letra
    let user : LocalUser = {
      token: tok
    };
    this.storage.setLocalUser(user);

   }

   /**Fazendo o encerramento da sessão */
   logout(){
     this.storage.setLocalUser(null);
  }
}
