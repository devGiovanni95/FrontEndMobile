import { CategoriaDTO } from './../../models/categorias.dto';
import { API_CONFIG } from './../../config/api.config';
import { HttpClient } from "@angular/common/http";
import {Injectable } from "@angular/core";
import { Observable } from 'rxjs/Rx';

@Injectable()
export class CategoriaService{

  constructor(public http: HttpClient){
  }

//  findAll(){
  //  return this.http.get("http://localhost:8080/categorias")  ----> padrao
  //}

  findAll() : Observable <CategoriaDTO[]> {
    return this.http.get<CategoriaDTO[]>(`${API_CONFIG.baseUrl}/categorias`);
    }
}
