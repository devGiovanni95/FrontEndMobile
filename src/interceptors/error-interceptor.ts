import { Observable } from 'rxjs/Rx';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class ErrorInteceptor implements HttpInterceptor{

 /* //Intercepta as requisicoes mais esta fazendo o que os erro genericos fazem
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>>{
    console.log("passou")
    return next.handle(req)//continue a requisicao
    .catch((error, caugth) => {//se acontecer algum erro ele propaga o erro
      return Observable.throw(error);
    }) as any;

  }
}*/


intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>>{
  console.log("Passou no interceptor")
  return next.handle(req)//continue a requisicao
  .catch((error, caugth) => {//se acontecer algum erro ele propaga o erro

      let errorObj = error;
      if(errorObj.error){
        errorObj = errorObj.error;
      }
      if(!errorObj.status){
        errorObj = JSON.parse(errorObj);
      }

      //passando a responsabilidade de imprimir na tela para a classe
        console.log("Erro detectado pelo interceptor:")
        console.log(errorObj)

    return Observable.throw(errorObj);
  }) as any;

}
}

//como vai ser a sua instanciação
export const ErrorInteceptorProvider = {
  provide: HTTP_INTERCEPTORS,
  useClass: ErrorInteceptor,
  multi: true,
};
