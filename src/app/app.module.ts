import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AgmCoreModule } from '@agm/core';
import { MatFormFieldModule,MatMenuModule,MatCheckboxModule,MatIconModule,MatDatepickerModule,MatNativeDateModule,MatInputModule} from '@angular/material';

import { ToastrModule } from 'ngx-toastr';
import { NgxUiLoaderModule, NgxUiLoaderHttpModule, NgxUiLoaderRouterModule } from  'ngx-ui-loader';
import { NgxIndexedDBModule,DBConfig  } from 'ngx-indexed-db';


import { HttpModule } from "@angular/http";
import { NotFoundComponent } from './not-found/not-found.component';
import { ModalModule, BsModalRef } from 'ngx-bootstrap/modal'
import { AppRoutingModule } from './app-routing.module';
import { NgxIntlTelInputModule } from 'ngx-intl-tel-input';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { VerifyComponent } from './verify/verify.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { AuthService } from "./auth.service";


const dbConfig: DBConfig  = {
  name: 'MyDb',
  version: 1,
  objectStoresMeta: [{
    store: 'users',
    storeConfig: { keyPath: 'id', autoIncrement: true },
    storeSchema: [
      { name: 'firstName', keypath: 'firstName', options: { unique: false } },
      { name: 'lastName', keypath: 'lastName', options: { unique: false } },
      { name: 'email', keypath: 'email', options: { unique: true } },
      { name: 'phone', keypath: 'phone', options: { unique: false } },
      { name: 'password', keypath: 'password', options: { unique: false } },
      { name: 'address', keypath: 'address', options: { unique: false } },
      { name: 'city', keypath: 'city', options: { unique: false } },
      { name: 'state', keypath: 'state', options: { unique: false } },
      { name: 'zipCode', keypath: 'zipCode', options: { unique: false } },
      { name: 'latitude', keypath: 'latitude', options: { unique: false } },
      { name: 'longitude', keypath: 'longitude', options: { unique: false } },
      { name: 'description', keypath: 'description', options: { unique: false } },
    ]
  }]
};
@NgModule({
 declarations: [
		AppComponent,
		NotFoundComponent,
		HomeComponent,
		RegisterComponent,
		LoginComponent,
		VerifyComponent,
		DashboardComponent,
		HeaderComponent,
		FooterComponent,
	],
	imports: [
		BrowserModule,	
		ModalModule.forRoot(),
		AppRoutingModule,	
		BrowserAnimationsModule,
		FormsModule,
		ReactiveFormsModule,
		HttpModule,
		MatFormFieldModule,
		MatInputModule,
	    MatMenuModule,
	    MatCheckboxModule,
	    MatIconModule,
	    MatDatepickerModule,
	    MatNativeDateModule,
	    NgxIntlTelInputModule,
	     // please add your google api key  for address auto complete and enable it.
	    AgmCoreModule.forRoot({
	      apiKey: '',                
	      libraries: ['places']
	    }),		
	    ToastrModule.forRoot({
			timeOut: 2000,
			positionClass: "toast-top-right",
			preventDuplicates: true,
			maxOpened: 1
	    }),
	    NgxUiLoaderModule,
		NgxUiLoaderRouterModule,
		NgxUiLoaderHttpModule,
		NgbModule,
		NgxIndexedDBModule.forRoot(dbConfig)	
		],
	 providers: [MatDatepickerModule,BsModalRef,AuthService],
     bootstrap: [AppComponent]
})
export class AppModule { }
