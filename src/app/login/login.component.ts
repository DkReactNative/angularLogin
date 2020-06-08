import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import {
  FormGroup,
  FormControl,
  Validators,
  FormBuilder
} from "@angular/forms";
import { GlobalService } from '../global.service';
import { NgxUiLoaderService } from 'ngx-ui-loader';
declare var $: any;
import * as jQuery from 'jquery';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
    formData;
    disabledBtn = 0;
    formSubmitAttempt = false;
    rememberme:any=false;

    constructor(private route: Router,public global: GlobalService,private formBuilder: FormBuilder,private ngxService: NgxUiLoaderService) { 
      this.global.hideNavBars=true
      this.formData = this.formBuilder.group({
        email: new FormControl("", Validators.required),
        password: new FormControl("", Validators.required)
      });
    }
      ngOnInit() {
      this.formData.valueChanges.subscribe(data => console.log('form changes', data));
      
      let remember :any = localStorage.getItem(btoa("rememberme")) ? JSON.parse(atob(localStorage.getItem(btoa("rememberme")))):null;
      if(remember){
          this.rememberme = true;
          this.formData.get("email").setValue(remember.email);
          this.formData.get("password").setValue(remember.password);
      }
      }

login(formdata){
  console.log(this.formData);
    if(!this.formData.valid){
     this.formSubmitAttempt=true;
     return
    } 
    formdata.phone = 12334;
    this.ngxService.start();   
       this.global.login(
      formdata,
      data => {
        this.ngxService.stop();
        console.log(data)
        if (data.status) {
              if(this.rememberme){
              localStorage.setItem(btoa("rememberme"), btoa(JSON.stringify({email:formdata.email.toLowerCase(),password:formdata.password})));
              } else {
              localStorage.removeItem(btoa("rememberme"));
              }
              localStorage.setItem(btoa("demo-user"), btoa(JSON.stringify(data.data)));
              this.global.user = data.data;
              this.global.isLogin = true;
              this.global.showToast("", data.message);
              this.route.navigate(["dashboard"], { replaceUrl: true });
          } else {
             this.global.showDangerToast("", data.message);
          }
          
      },
      err => {
        this.global.showDangerToast("", err.message);
      },
    );
  }

}
