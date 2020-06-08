import { Injectable } from "@angular/core";
import { Http, Headers, RequestOptions } from "@angular/http";
import "rxjs/add/operator/map";
import { environment } from "src/environments/environment";
import { ToastrService } from "ngx-toastr";
import { Router } from "@angular/router";
import { IdbService } from "./idb.service"
@Injectable({
  providedIn: 'root'
})
export class GlobalService {
  loader;
  apiUrl = environment.apiUrl;
  hideNavBars:any=false
  loginTime:any=null
  setupTime = environment.setupTime
  setupHours = 24 * 60 * 60 * 1000
  isLogin = false;
  user: any;
  AuthToken:any = null;

  dummyRes:any={status:0,message:null,data:null}
  constructor(
    public http: Http,
    public toastrService: ToastrService,
    public router: Router,
    public idb : IdbService
  ) {
    toastrService["options"] = {
      preventDuplicates: true,
      preventOpenDuplicates: true
    };
  }

  public post(
    url,
    body,
    successCallback,
    failedCallback,
    loader = false,
    text = "Please wait..."
  ) {
    let headers =
      this.AuthToken != null || this.AuthToken != undefined
        ? new Headers({
           "Content-Type": "application/json",
          Authorization: "Bearer " + this.AuthToken
        })
        : new Headers({
           "Content-Type": "application/json"
        });

    let options = new RequestOptions({
      headers: headers
    });

    if (loader) {
      this.loader = true;
    }

    this.http
      .post(this.apiUrl + url, body, options)
      .map(res => res.json())
      .subscribe(
        data => {
          this.loader = false;
          if (data.success ) {
            
          }
          successCallback(data);

        },
        err => {
          this.loader = false;
          failedCallback(err);
        }
      );
  }

  get(url, successCallback, failedCallback, loader = true) {
    let headers = new Headers({
      "Content-Type": "application/json",
      Authorization: "Bearer " + this.AuthToken
    });

    let options = new RequestOptions({
      headers: headers
    });
    if (loader) {
      this.loader = true;
    }

    this.http
      .get(this.apiUrl+ url, options)
      .map(res => res.json())
      .subscribe(
        data => {
          this.loader = false;
          if (data.success ) {
          }
          successCallback(data);
        },
        err => {
          this.loader = false;
          failedCallback(err);
        }
      );
  }

  public put(url,data,successCallback,failedCallback,loader = false) {    
            let headers = this.AuthToken != null || this.AuthToken != undefined ?
                new Headers({
                    Authorization: "Bearer " + this.AuthToken
                }) : null;
                    let options = new RequestOptions({
                        headers: headers
                    });

            if (loader) {this.loader = true;}
            this.http
                .put(environment.apiUrl +url,data, options)
                .map(res => res.json())
                .subscribe(
                    data => {
                        this.loader = false;
                        successCallback(data);
                    },
                    err => {
                        this.loader = false;
                        failedCallback(err);
                    }
                );
  }

  public delete(url,successCallback,failedCallback,loader = false) {    
   
   let headers = this.AuthToken != null ||  this.AuthToken != undefined ?
        new Headers({
            Authorization: "Bearer " + this.AuthToken
        }) : null;

    let options = new RequestOptions({
        headers: headers
    });
    if (loader) {this.loader = true;}
    this.http
        .delete(environment.apiUrl + url, options)
        .map(res => res.json())
        .subscribe(
            data => {
                this.loader = false;
                successCallback(data);
            },
            err => {
                this.loader = false;
                failedCallback(err);
            }
        );
}

  // fake backend service for login using index db
  login(obj:any,successCallback,failedCallback){
     this.idb.getByIndex('users','email',obj.email).then(
     data => {
     let user:any = data
      if(!user){
       this.dummyRes['status']=0;
       this.dummyRes['data']=""
       this.dummyRes['message']='Email is not registered'
      } else{
         if(user.password == obj.password){
         this.dummyRes['message']='Login successfully';
         this.dummyRes['status']=1;
         this.dummyRes['data']=user
         } else {
           this.dummyRes['message']='Email and password in correct';
           this.dummyRes['status']=0;
           this.dummyRes['data']=""
         }
      }
      successCallback(this.dummyRes)
     }).catch(
     error=>{
           this.dummyRes['status']=0;
           this.dummyRes['data']="";
           this.dummyRes['message']=error;
           failedCallback(this.dummyRes)
     })
  }


// fake backend service for register using index db
  register(obj:any,successCallback,failedCallback){
     this.idb.getByIndex('users','email',obj.email).then(
     data => {
     if(data){
       this.dummyRes['status']=0;
       this.dummyRes['data']=""
       this.dummyRes['message']='Email is already registered'
       successCallback(this.dummyRes);
       return;
      } 
     this.idb.add('users',obj).then(
     data => {
      let user:any = data
      if(!user){
       this.dummyRes['status']=0;
       this.dummyRes['data']=""
       this.dummyRes['message']='Email is not registered'
      } else{
         this.dummyRes['message']='Register successfully';
         this.dummyRes['status']=1;
         this.dummyRes['data']=obj
      }
   
      successCallback(this.dummyRes)
     }).catch(
     error=>{
           this.dummyRes['status']=0;
           this.dummyRes['data']="";
           this.dummyRes['message']=error;
           failedCallback(this.dummyRes)
     })

    },
    error=>{
           this.dummyRes['status']=0;
           this.dummyRes['data']="";
           this.dummyRes['message']=error;
           failedCallback(this.dummyRes)
     })
  }

  showToast(title = "", message = "") {
    this.toastrService.success(title, message);
  }

  showDangerToast(title = "", message = "") {
    this.toastrService.error(title, message);
  }

  showWarningToast(title = "", message = "") {
    this.toastrService.warning(title, message);
  }
}
