import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-usercreate',
  templateUrl: './usercreate.component.html',
  styleUrls: ['./usercreate.component.css']
})
export class UsercreateComponent implements OnInit {
  ptype:any; pid:any; userDetails:any; usersList:any = [];

  alist = {
    agent:''
  }

  users:any  = {
    name:'',
    mobile_no:'',
    bank_acc:'',
    bank_name:'',
    branch_name:'',
    ifsc_code:'',
    acc_name:'',
    city:'',
    ref_code:'',
  }
  
  constructor(private router: Router, private arouter:ActivatedRoute,private apiService:ApiService,private _snackBar: MatSnackBar,) { 
    this.ptype = this.arouter.snapshot.params.type;
    this.pid = this.arouter.snapshot.params.id;

    this.userDetails = JSON.parse(localStorage.getItem('user_details'));
    this.users.ref_code = this.userDetails.username;   
    this.alist.agent = this.userDetails.username; 

  }

  ngOnInit(): void {
    this.apiService.usersList(this.alist).subscribe(
      res => {
        this.usersList = res.Response;
        this.getDetails();
      },err => console.log(err));
  }

  getDetails(){
    if(this.ptype == 'Edit'){
     let partiAgent = this.usersList.find(element => element.id == this.pid);
     this.users  = {
        name:partiAgent.name,
        mobile_no:partiAgent.mobile_no,
        bank_acc:partiAgent.bank_acc,
        bank_name:partiAgent.bank_name,
        branch_name:partiAgent.branch_name,
        ifsc_code:partiAgent.ifsc_code,
        acc_name:partiAgent.acc_name,
        city:partiAgent.city,
        ref_code : this.userDetails.username, 
      }
    }
  }

  newUsers(args){
    if(args == 'Add'){
      if((this.users.mobile_no !='') && (this.users.name)){
          this.apiService.usersAdd(this.users).subscribe(
            res => {
              this._snackBar.open(res.Message,'', {
                duration: 3000,
              });
              this.router.navigateByUrl('usersList');
            },err => console.log(err));

      }else{
        this._snackBar.open('Enter Mobile No & Name !','', {
          duration: 3000,
        });
      }
    }else{
      if((this.users.mobile_no !='') && (this.users.name)){
        this.users.id = this.pid;
         this.apiService.usersUpdate(this.users).subscribe(
          res => {
            this._snackBar.open(res.Message,'', {
              duration: 3000,
            });
            this.router.navigateByUrl('usersList');
          },err=> console.log(err));
      }else{
        this._snackBar.open('Enter Mobile No & Name !','', {
          duration: 3000,
        });
      }
    }
  }

}
