import { CompileShallowModuleMetadata } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  userDetails:any;

  userUp:any  = {
    id:'',
    name:'',
    mobile_no:'',
    bank_acc:'',
    bank_name:'',
    branch_name:'',
    ifsc_code:'',
    acc_name:'',
    city:''
  }


  constructor(private apiService:ApiService,private _snackBar: MatSnackBar,private router: Router,) {
    this.userDetails = JSON.parse(localStorage.getItem('user_details'));
    this.userUp = {
      id:this.userDetails.id,
      name:this.userDetails.name,
      mobile_no:this.userDetails.mobile_no,
      bank_acc:this.userDetails.bank_acc,
      bank_name:this.userDetails.bank_name,
      branch_name:this.userDetails.branch_name,
      ifsc_code:this.userDetails.ifsc_code,
      acc_name:this.userDetails.acc_name,
      city:this.userDetails.city
    }
   }

  ngOnInit(): void {
  }

  updateUser(){
    if((this.userUp.name !='') ){
      this.apiService.updateUser(this.userUp).subscribe(
        res => {
          this._snackBar.open(res.Message,'', {
            duration: 3000,
          });
          localStorage.setItem('user_details',JSON.stringify(this.userUp));
          this.router.navigateByUrl('profilev');
        },err => console.log(err)
      );
    }
  }

}
