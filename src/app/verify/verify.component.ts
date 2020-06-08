import { Component, OnInit, ViewChild, ElementRef } from "@angular/core";
import { Router,ActivatedRoute } from "@angular/router";
import { GlobalService } from "../global.service";
import { Location } from '@angular/common';
import { NgxUiLoaderService } from 'ngx-ui-loader';
declare var $: any;
import * as jQuery from 'jquery';
@Component({
  selector: 'app-verify',
  templateUrl: './verify.component.html',
  styleUrls: ['./verify.component.css']
})
export class VerifyComponent implements OnInit {
  @ViewChild("input1", { static: true }) input1: ElementRef;
  @ViewChild("input2", { static: true }) input2: ElementRef;
  @ViewChild("input3", { static: true }) input3: ElementRef;
  @ViewChild("input4", { static: true }) input4: ElementRef;
  input;
  email = null;
  lastScreen = null;
  formSubmitAttempt = false;

  constructor(private route: Router, public global: GlobalService, public location: Location, private router: ActivatedRoute,private ngxService: NgxUiLoaderService) { 
    this.global.hideNavBars=true;
    this.input = new Array(4);
    let me=this;
    this.router.paramMap.subscribe(params => {
      console.log(params.get("id"),atob(params.get("id")));
      let str=(atob(params.get("id"))).split(":");
      console.log(str)
      me.email=str[1]
      me.lastScreen=str[0]
    });
  }

  ngOnInit() {
  }

  getCodeBoxElement(index) {
    switch (index) {
      case 1:
        return this.input1.nativeElement;
      case 2:
        return this.input2.nativeElement;
      case 3:
        return this.input3.nativeElement;
      case 4:
        return this.input4.nativeElement;
      default:
        return null;
    }
  }

  keypress(event) {
    const eventCode = event.which || event.keyCode;
    if (
      eventCode != 46 &&
      eventCode > 31 &&
      (
        (eventCode < 48 || eventCode > 57) || (eventCode >= 96 && eventCode <= 105))
    ) {
      event.preventDefault();
    }
  }

  onKeyUpEvent(event, index) {
    console.log(event);
    const eventCode = event.which || event.keyCode;
    if (
      eventCode != 46 &&
      eventCode > 31 && (
        (eventCode < 48 || eventCode > 57) || (eventCode >= 96 && eventCode <= 105))
    ) {
    } else {
      if (this.getCodeBoxElement(index).value.length === 1) {
        if (index !== 4) {
          this.getCodeBoxElement(index + 1).focus();
        } else {
          this.getCodeBoxElement(index).blur();
          this.verifyOtp();
          console.log("submit code ");
        }
      }
      if (eventCode === 8 && index !== 1) {
        this.getCodeBoxElement(index - 1).focus();
      }
    }
  }

  onFocusEvent(index) {
    for (let item = 1; item < index; item++) {
      const currentElement = this.getCodeBoxElement(item);
      if (!currentElement.value) {
        currentElement.focus();
        break;
      }
    }
  }

  verifyOtp() {
    console.log("this.lastScreen",this.lastScreen)
    this.formSubmitAttempt = true;
    if (!this.input[0] || !this.input[1] || !this.input[2] || !this.input[3]) {
      return;
    } else {
     this.route.navigate(["dashboard"], { replaceUrl: true });
    }
  }

}
