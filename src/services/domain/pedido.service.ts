import { PedidoDTO } from './../../models/pedido.dto';
import { CategoriaDTO } from './../../models/categorias.dto';
import { API_CONFIG } from './../../config/api.config';
import { HttpClient } from "@angular/common/http";
import {Injectable } from "@angular/core";
import { Observable } from 'rxjs/Rx';

@Injectable()
export class PedidoService{

  constructor(public http: HttpClient){
  }

 // findAll() : Observable <CategoriaDTO[]> {
 //   return this.http.get<CategoriaDTO[]>(`${API_CONFIG.baseUrl}/categorias`);
//    }

insert(obj: PedidoDTO){
    return this.http.post(
        `${API_CONFIG.baseUrl}/pedidos`,
        obj,
        {
            observe: 'response',
            responseType: 'text'
        }
    )
}
}
