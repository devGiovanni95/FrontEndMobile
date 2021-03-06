import { ProdutoDTO } from './../../models/produto.dto';
import { API_CONFIG } from './../../config/api.config';
import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';

@Injectable()
export class ProdutoService {

    constructor(public http: HttpClient) {
    }

    findById(produto_id : string){
        return this.http.get<ProdutoDTO>(`${API_CONFIG.baseUrl}/produtos/${produto_id}`);
    }

 //   findByCategoria(categoria_id: string) {
   //     return this.http.get(`${API_CONFIG.baseUrl}/produtos/?categorias=${categoria_id}`);
    //}

    
    findByCategoria(categoria_id: string, page : number = 0, linesPerPage : number = 24 ) {
        return this.http.get(`${API_CONFIG.baseUrl}/produtos/?categorias=${categoria_id}&page=${page}&linesPerPage=${linesPerPage}`);
    }

    getSmallImageFromBucket(id: string): Observable<any> {
        let url = `${API_CONFIG.bucketBaseUrl}/prod${id}-small.jpg`//concatenando com o padrao de nomes utilizados no envio de imagens
        return this.http.get(url, {responseType: 'blob' });//resposta = imagem
    }

    getImageFromBucket(id: string): Observable<any> {
        let url = `${API_CONFIG.bucketBaseUrl}/prod${id}.jpg`//concatenando com o padrao de nomes utilizados no envio de imagens
        return this.http.get(url, {responseType: 'blob' });//resposta = imagem
    }
}