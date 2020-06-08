import { Component, OnInit, ViewChild, ElementRef, NgZone} from '@angular/core';
import { GlobalService } from '../global.service';
import { Router } from "@angular/router";
import {
  FormGroup,
  FormControl,
  Validators,
  FormBuilder
} from "@angular/forms";
import {
  EmailValidation,
  PasswordValidation,
  RepeatPasswordEStateMatcher,
  RepeatPasswordValidator
} from "../validator.service";
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { MapsAPILoader, MouseEvent } from '@agm/core';
import { CustomValidators } from 'ng2-validation';
import { SearchCountryField, TooltipLabel, CountryISO } from 'ngx-intl-tel-input';
declare var $: any;

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
    @ViewChild('search', { static: false }) searchElementRef: ElementRef
    separateDialCode = true;
	SearchCountryField = SearchCountryField;
	TooltipLabel = TooltipLabel;
	CountryISO = CountryISO;
	preferredCountries: CountryISO[] = [CountryISO.UnitedStates, CountryISO.UnitedKingdom];
	formSubmitAttempt:any = false;
    formData;
    profileImage;
    constructor(private mapsAPILoader: MapsAPILoader, private ngZone: NgZone,private route: Router,public global:GlobalService,private formBuilder: FormBuilder,
    private ngxService: NgxUiLoaderService ) { 

    }

    ngOnInit() {
      this.global.login({email:'dk',password:'123'},
      data=>{
      console.log(data)
      },
      err=>{
      console.log(err)
      })
      this.formData= this.formBuilder.group({
      firstName: new FormControl("", [Validators.required,CustomValidators.rangeLength([1, 55])]),

      lastName: new FormControl("", [Validators.required,CustomValidators.rangeLength([1, 55])]),

      phone: new FormControl("", Validators.required),

      description: new FormControl("", 
      [Validators.required,CustomValidators.rangeLength([1, 1000])]),

      address: new FormControl("", Validators.required),

	  city: new FormControl("", [Validators.required,CustomValidators.rangeLength([1, 55])]),

	  state: new FormControl("", [Validators.required,CustomValidators.rangeLength([1, 55])]),

	  zipCode   : new FormControl("", [Validators.required,Validators.pattern("^[0-9_-]{4,10}"),CustomValidators.rangeLength([1, 10])]),

	  country   : new FormControl("",Validators.required),

	  latitude  : new FormControl(),

	  longitude : new FormControl(),

	  email: EmailValidation,

      password: new FormControl("", PasswordValidation),

      confirmPassword: new FormControl("", PasswordValidation)},
     { validator: RepeatPasswordValidator }
  )
      
  

    setTimeout(() => {
	    console.log(this.searchElementRef); // back here through ViewChild set
	    this.mapsAPILoaderFunction();
	  },2000);

  }

  uploadFile(event) {
	   var input = event.target;
	   console.log(event)
	    var reader = new FileReader();
	    reader.onload = ()=>{
	      var dataURL:any = reader.result;
	      var output = document.getElementById('profile-image');
	      document.getElementById('profile-image').setAttribute('src',dataURL)
	      this.profileImage=dataURL
	    };
	    reader.readAsDataURL(input.files[0]);
   }
   
  register(formdata){
  console.log(this.formData);
    if(!this.formData.valid){
     this.formSubmitAttempt=true;
     return
    } 
    formdata.phone = 12334;
    formdata.image = this.profileImage
    this.ngxService.start();   
       this.global.register(
      formdata,
      data => {
        this.ngxService.stop();
        console.log(data)
        if (data.status) {
              localStorage.setItem(btoa("demo-user"), btoa(JSON.stringify(data.data)));
              this.global.user = data.data;
              this.global.isLogin = true;
              this.global.showToast("", data.message);
              this.route.navigate(["verify/"+btoa("register:"+data.email)],{replaceUrl:true})
          } else {
             this.global.showDangerToast("", data.message);
          }
          
      },
      err => {
        this.global.showDangerToast("", err.message);
      },
    );
  }

 // Google auto complete address     please make sure that the api key is correct
 mapsAPILoaderFunction(){

	    var count=0;
	    var oldaddress = {
	      address:this.formData.value.address,
	      administrative_area_level_2:this.formData.value.city,
	      administrative_area_level_1:this.formData.value.state, 
	      country:this.formData.value.country,
	      postal_code:this.formData.value.zipCode,
	      lat:this.formData.value.latitude,
	      long:this.formData.value.longitude
	    };

	    $("input[name='address1']").on('blur', ()=> {
	      this.formData(oldaddress)
	    });

	    this.mapsAPILoader.load().then(() => {
	    var input = this.searchElementRef.nativeElement
	    var options = {
	    types: ['address']
	    };
	  let autocomplete = new google.maps.places.Autocomplete(input, options);
	  this.ngZone.run(() => { 
	  google.maps.event.addListener(autocomplete, 'place_changed', ()=> {
	    var place = autocomplete.getPlace();
	    oldaddress ={
	      address:"",
	      administrative_area_level_2:"",
	      administrative_area_level_1:"", 
	      country:"",
	      postal_code:"",
	      lat:"",
	      long:""
	    }
	    console.log(place)
	    var componentForm = {
	      administrative_area_level_2: 'long_name',
	      administrative_area_level_1: 'long_name',
	      country: 'long_name',
	      postal_code: 'short_name'
	    };
	    var val={}
	    for (var i = 0; i < place.address_components.length; i++)
	    {
	     var addressType = place.address_components[i].types[0];
	     if (componentForm[addressType])
	     {
	      oldaddress[addressType]= place.address_components[i][componentForm[addressType]];
	     }
	     //else{
	    //   oldaddress[addressType]=""
	    //  }
	   }
	   oldaddress['lat'] = place.geometry.location.lat();
	   oldaddress['long'] = place.geometry.location.lng();
	   oldaddress['address']=place.formatted_address
	    this.fillAddress(oldaddress)
	    if(!count){
	      $("input[name='address1']").focus();
	    }
	    count++;
	    // $("input[name='address1']").blur()
	  })
		})
	   });
  }

  fillAddress(address){
	    console.log(address)
	    this.formData.get("address").setValue(address.address)
	    this.formData.get("state").setValue(address.administrative_area_level_1)
	    this.formData.get("city").setValue(address.administrative_area_level_2)
	    this.formData.get("zipCode").setValue(address.postal_code)
	    this.formData.get("country").setValue(address.country)
	    this.formData.get("latitude").setValue(address.lat)
	    this.formData.get("longitude").setValue(address.long)
  }

  triggerFile(){
       $("#file-input").trigger('click');
  }

}
