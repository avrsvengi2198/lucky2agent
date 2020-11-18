import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

declare var $: any;

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {

  newPassword=true;

  confrim=true; userDetails:any;

  changePass = {
    mobile_no:'',
    new:''
  }

  newPass ={
    pass:'',
    cpass:''
  }

  constructor(private apiService:ApiService,private _snackBar: MatSnackBar,private router: Router) { 
    this.userDetails = JSON.parse(localStorage.getItem('user_details'));
    this.changePass.mobile_no = this.userDetails.mobile_no;
  }

  ngOnInit(): void {
  }

  changePassword(){
      if(this.newPass.pass !=''){
          if(this.newPass.cpass !=''){
            if(this.newPass.pass == this.newPass.cpass){
              this.changePass.new = this.newPass.cpass;
              this.apiService.changePassword(this.changePass).subscribe(
                res =>{
                  this._snackBar.open(res.Message,'', {
                    duration: 3000,
                  });
                },err => console.log(err)
              );
            }else{
              $('#cpass').val('');
              $('#cpass').focus();
              this._snackBar.open('Confirm Password Mismatch !!','', {
                duration: 3000,
              });
            }
          }else{
            $('#cpass').focus();
            this._snackBar.open('Enter Confirm Password !!','', {
              duration: 3000,
            });
          
          }
      }else{
        $('#pass').focus();
        this._snackBar.open('Enter Password !!','', {
          duration: 3000,
        });
        
      }
  }

}
