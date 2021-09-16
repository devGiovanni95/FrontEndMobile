import { API_CONFIG } from './../config/api.config';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CredenciaisDTO } from '../models/credenciais.dto';
import { StorageService } from './storage.service';
import { LocalUser } from '../models/local_user';
import { JwtHelper } from 'angular2-jwt';


@Injectable()
export class AuthService{

  /**classe para decodificar o token */
  jwtHelper: JwtHelper = new JwtHelper();

  // construtor para acessar uma requisição http
  constructor(public http: HttpClient, public storage: StorageService){

  }

  authenticate(creds : CredenciaisDTO){
   return this.http.post(
      `${API_CONFIG.baseUrl}/login`,
      creds,
      {
        observe: `response`,/*Como vamos buscar no header- essa funcao vai especificar que uma requisicao do tipo respota*/
        responseType: `text`/*Para nao tentar fazer um parse no JSON e dar um erro*/
      }

   )};

   //Aproveitar o token pra ficar salvo o login enquanto o o token estiver ativo

   refreshToken(){
    return this.http.post(
       `${API_CONFIG.baseUrl}/auth/refresh_token`,
       {},
       {
         observe: `response`,/*Como vamos buscar no header- essa funcao vai especificar que uma requisicao do tipo respota*/
         responseType: `text`/*Para nao tentar fazer um parse no JSON e dar um erro*/
       }
 
    )};


   /*Salvar o Login armazenando no localStorage*/
   successfulLogin(authorizationValue : string) {
    let tok = authorizationValue.substring(7);//comeca a partir da 7 letra
    let user : LocalUser = {
      token: tok,
      email: this.jwtHelper.decodeToken(tok).sub

    };
    this.storage.setLocalUser(user);

   }

   /**Fazendo o encerramento da sessão */
   logout(){
     this.storage.setLocalUser(null);
  }
}
