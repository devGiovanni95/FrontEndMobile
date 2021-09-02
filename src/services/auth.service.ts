import { API_CONFIG } from './../config/api.config';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CredenciaisDTO } from '../models/credenciais.dto';

@Injectable()
export class AuthService{

  // construtor para acessar uma requisição http
  constructor(public http: HttpClient){

  }

  authenticate(creds : CredenciaisDTO){
   return this.http.post(
      `${API_CONFIG.baseUrl}/login`,
      creds,
      {
        observe: `response`,/*Como vamos buscar no header- essa funcao vai especificar que uma requisicao do tipo respota*/
        responseType: `text`/*Para nao tyentar fazer um parse no JSON e dar um erro*/
      }
    );
  }
}
