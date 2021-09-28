"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.ProfilePage = void 0;
var core_1 = require("@angular/core");
var ionic_angular_1 = require("ionic-angular");
var api_config_1 = require("../../config/api.config");
/**
 * Generated class for the ProfilePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var ProfilePage = /** @class */ (function () {
    function ProfilePage(navCtrl, navParams, storage, clienteService, camera) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.storage = storage;
        this.clienteService = clienteService;
        this.camera = camera;
        this.cameraOn = false;
    }
    //refatoramos para poder receber endereços pelo cadastro do cliente
    ProfilePage.prototype.ionViewDidLoad = function () {
        var _this = this;
        var LocalUser = this.storage.getLocalUser();
        if (LocalUser && LocalUser.email) {
            //this.email = LocalUser.email;
            this.clienteService.findByEmail(LocalUser.email)
                .subscribe(function (response) {
                _this.cliente = response; //Declaramos como "as ClienteDTO" para que os dados case com a tipagem de ClienteDTO
                _this.getImageIfExist();
            }, function (error) {
                if (error.status == 403) {
                    _this.navCtrl.setRoot('HomePage');
                }
            });
        } /**Se caso na busca de usuarios por email dar errado ele voltar para home page */
        else {
            this.navCtrl.setRoot('HomePage');
        }
    };
    ProfilePage.prototype.getImageIfExist = function () {
        var _this = this;
        this.clienteService.getImageFromBucket(this.cliente.id)
            .subscribe(function (response) {
            _this.cliente.imageUrl = api_config_1.API_CONFIG.bucketBaseUrl + "/cp" + _this.cliente.id + ".jpg";
        }, function (error) { });
    };
    ProfilePage.prototype.getCameraPicture = function () {
        var _this = this;
        this.cameraOn = true;
        var options = {
            quality: 100,
            destinationType: this.camera.DestinationType.DATA_URL,
            encodingType: this.camera.EncodingType.PNG,
            mediaType: this.camera.MediaType.PICTURE
        };
        this.camera.getPicture(options).then(function (imageData) {
            // imageData is either a base64 encoded string or a file URI
            // If it's base64 (DATA_URL):
            //let base64Image = 'data:image/jpeg;base64,' + imageData;
            _this.picture = 'data:image/png;base64,' + imageData;
            _this.cameraOn = false;
        }, function (err) {
            // Handle error
        });
    };
    ProfilePage = __decorate([
        ionic_angular_1.IonicPage(),
        core_1.Component({
            selector: 'page-profile',
            templateUrl: 'profile.html'
        })
    ], ProfilePage);
    return ProfilePage;
}());
exports.ProfilePage = ProfilePage;
