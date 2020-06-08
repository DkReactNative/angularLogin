import { Component } from '@angular/core';
import { GlobalService } from './global.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
    

    constructor(public global:GlobalService) { 
    
    var now = new Date().getTime();
    var setupTime = localStorage.getItem('setupTime-kc');
    console.log(now - parseInt(setupTime), this.global.setupHours)
    if (setupTime == null) {
      localStorage.setItem('setupTime-kc', this.global.setupTime + "")
    } else {
      if (now - (parseInt(setupTime)) > this.global.setupHours) {
        localStorage.clear()
        localStorage.setItem('setupTime-kc', this.global.setupTime + "");
      }
    }

    let user:any = localStorage.getItem(btoa("demo-user")) ? atob(localStorage.getItem(btoa("demo-user"))) : null;
    user = JSON.parse(user);

    if (user) {
      this.global.user = user;
      this.global.isLogin = true;
    }
}

}
