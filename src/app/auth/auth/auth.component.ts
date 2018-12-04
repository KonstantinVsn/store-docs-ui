import { Component, OnInit } from '@angular/core';
import { UKeyService } from 'src/app/ui/services/ukey.service';
import { Router } from '@angular/router';
import { interval } from 'rxjs';
import { flatMap, takeWhile } from 'rxjs/operators';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {
  loading: boolean = false
  email:string = "test@ukey.com"
  constructor(private Ukey: UKeyService, private router: Router) { }

  ngOnInit() {
  }

  auth(){
    this.loading = true;
    this.Ukey.mobileAuth(this.email).subscribe(
      (data)=>{
        interval(2000)
          .pipe(
            flatMap(() => this.Ukey.checkMobileAuth(data.id)),
            takeWhile(data => {
              if (data.token) {
                this.router.navigateByUrl('/docs');
                localStorage.setItem("UKeytoken", JSON.stringify(data))
                this.loading = false
                return false
              }
              else {
                return true
              }
            }))
          .subscribe(result => console.log(result));
        
       }
    );
  }

}
