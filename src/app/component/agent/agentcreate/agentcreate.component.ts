import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-agentcreate',
  templateUrl: './agentcreate.component.html',
  styleUrls: ['./agentcreate.component.css']
})
export class AgentcreateComponent implements OnInit {
  ptype:any; pid:any; userDetails:any; agentList:any = [];
  spinner:boolean = true;
  alist = {
    agent:''
  }

  agent:any  = {
    name:'',
    mobile:'',
    bank_acc:'',
    bank_name:'',
    branch_name:'',
    ifsc_code:'',
    acc_name:'',
    city:'',
    ref_code:'',
    level:null
  }

  constructor(private router: Router, private arouter:ActivatedRoute,private apiService:ApiService,private _snackBar: MatSnackBar,) { 
    this.ptype = this.arouter.snapshot.params.type;
    this.pid = this.arouter.snapshot.params.id;

    this.userDetails = JSON.parse(localStorage.getItem('user_details'));
    this.agent.ref_code = this.userDetails.username;   
    this.alist.agent = this.userDetails.username; 

  }

  ngOnInit(): void {

    this.apiService.agentList(this.alist).subscribe(
      res => {
        this.spinner = false;
        this.agentList = res.Response;
        this.getDetails();
      },err => console.log(err));


  }

  getDetails(){
    if(this.ptype == 'Edit'){
     let partiAgent = this.agentList.find(element => element.aid == this.pid);
     this.agent  = {
        name:partiAgent.name,
        mobile:partiAgent.mobile,
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

  newAgent(args){
    if(args == 'Add'){
      if((this.agent.mobile !='') && (this.agent.name)){
         this.spinner = true;
          this.apiService.agentAdd(this.agent).subscribe(
            res => {
              this.spinner = false;
              this._snackBar.open(res.Message,'', {
                duration: 3000,
              });
              this.router.navigateByUrl('agentList');
            },err => console.log(err));

      }else{
        this._snackBar.open('Enter Mobile No & Name !','', {
          duration: 3000,
        });
      }
    }else{
      if((this.agent.mobile !='') && (this.agent.name)){
        this.agent.aid = this.pid;
        this.spinner = true;
         this.apiService.agentUpdate(this.agent).subscribe(
          res => {
            this.spinner = false;
            this._snackBar.open(res.Message,'', {
              duration: 3000,
            });
            this.router.navigateByUrl('agentList');
          },err=> console.log(err));
      }else{
        this._snackBar.open('Enter Mobile No & Name !','', {
          duration: 3000,
        });
      }
    }
  }

}
