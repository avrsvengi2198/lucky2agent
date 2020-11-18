import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  password = true;

  loginDetails = {
    mobile_no:'',
    password:'',
    token:'57680',
    device_id:'7890890909t76'
  }

  constructor(private apiServices:ApiService,  private _snackBar: MatSnackBar,private router: Router, ) {
    if(localStorage.getItem('user_id') != null){
			this.router.navigateByUrl('home');
		}
   }

  ngOnInit(): void {
  }

  loginClick(){
    if(this.loginDetails.mobile_no !=''){
        if(this.loginDetails.password !=''){
          this.apiServices.login(this.loginDetails).subscribe(
              res =>{
                if(res.Status == 'Success'){
                  localStorage.setItem('user_id', res.Response[0].id);
                  localStorage.setItem('user_details',JSON.stringify(res.Response[0]));
                  this.router.navigateByUrl('home');
                }else{
                  this._snackBar.open(res.Message,'', {
                    duration: 3000,
                  });
                }
              },err => console.log(err) 
          );
        }else{
          this._snackBar.open('Enter Your Password !!','', {
            duration: 3000,
          });
        }
    }else{
      this._snackBar.open('Enter Your Mobile No !!','', {
        duration: 3000,
      });
    }
  }


isNumberKey(evt) {
    var charCode = (evt.which) ? evt.which : evt.keyCode
    if (charCode > 31 && (charCode < 48 || charCode > 57))
       return false;
    return true;
}

}
