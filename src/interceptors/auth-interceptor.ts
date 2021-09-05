import { API_CONFIG } from './../config/api.config';
import { StorageService } from './../services/storage.service';
import { LocalUser } from './../models/local_user';
import { Observable } from 'rxjs/Rx';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class AuthInteceptor implements HttpInterceptor{

  constructor(public storage: StorageService){
    }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>>{
  //console.log("Passou no interceptor")

  let LocalUser = this.storage.getLocalUser();

  //conferir se requisicao esta sendo feita somente para api
  let N = API_CONFIG.baseUrl.length;
  let requestToAPI = req.url.substring(0, N) == API_CONFIG.baseUrl;

  if(LocalUser && requestToAPI){
    const authReq = req.clone({headers: req.headers.set('Authorization', 'Bearer ' + LocalUser.token)});
    return next.handle(authReq);
      }else{
        return next.handle(req);//continue a requisicao
      }



}
}

//como vai ser a sua instanciação
export const AuthInteceptorProvider = {
  provide: HTTP_INTERCEPTORS,
  useClass: AuthInteceptor,
  multi: true,
};
