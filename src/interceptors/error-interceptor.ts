import { FieldMessage } from './../models/fieldmessage';
import { StorageService } from './../services/storage.service';
import { Observable } from 'rxjs/Rx';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AlertController } from 'ionic-angular/components/alert/alert-controller';

@Injectable()
export class ErrorInteceptor implements HttpInterceptor {

  /* //Intercepta as requisicoes mais esta fazendo o que os erro genericos fazem
   intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>>{
     console.log("passou")
     return next.handle(req)//continue a requisicao
     .catch((error, caugth) => {//se acontecer algum erro ele propaga o erro
       return Observable.throw(error);
     }) as any;
 
   }
 }*/

  constructor(public storage: StorageService, public alertCtrl: AlertController) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    console.log("Passou no interceptor")
    return next.handle(req)//continue a requisicao
      .catch((error, caugth) => {//se acontecer algum erro ele propaga o erro

        let errorObj = error;
        if (errorObj.error) {
          errorObj = errorObj.error;
        }
        if (!errorObj.status) {
          errorObj = JSON.parse(errorObj);
        }

        //passando a responsabilidade de imprimir na tela para a classe
        console.log("Erro detectado pelo interceptor:")
        console.log(errorObj)

        switch (errorObj.status) {

          case 401:
            this.handle401();
            break;


          case 403:
            this.handler403();
            break;

          case 422:  
          this.handle422(errorObj);
          break;


          default:
            this.handleDefaultError(errorObj);
        }

        return Observable.throw(errorObj);
      }) as any;

  }
  //vamos precisar do storage para implementar o erro 403 e qualquer outro
  handler403() {
    this.storage.setLocalUser(null);
  }

  handle401() {
    let alert = this.alertCtrl.create({
      title: 'Erro 401: falha de autenticação',
      message: 'Email ou senha incorretos',
      enableBackdropDismiss: false,
      buttons: [
        {
          text: 'Ok'
        }
      ]
    });
    alert.present();
  }

  handle422(errorObj){
    let alert = this.alertCtrl.create({
      title: 'Erro 422: Validação',
      message: this.listErrors(errorObj.errors),
      enableBackdropDismiss: false,
      buttons: [
        {
          text: 'Ok'
        }
      ]
    });
    alert.present();
   }

  handleDefaultError(errorObj) {
    let alert = this.alertCtrl.create({
      title: 'Erro ' + errorObj.status + ': ' + errorObj.error,
      message: errorObj.message,
      enableBackdropDismiss: false,
      buttons: [
        {
          text: 'Ok'
        }
      ]
    });
    alert.present();
  }

  private listErrors(messages : FieldMessage[]) : string {
    let s : string = '';//comecar a lista vazia
    for (var i=0; i<messages.length; i++){
      s = s + '<p><strong>' + messages[i].fieldName + "</strong>: " + messages[i].message + '</p>';
    }
    return s;
  }

}

//como vai ser a sua instanciação
export const ErrorInteceptorProvider = {
  provide: HTTP_INTERCEPTORS,
  useClass: ErrorInteceptor,
  multi: true,
};

