import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-agentlist',
  templateUrl: './agentlist.component.html',
  styleUrls: ['./agentlist.component.css']
})
export class AgentlistComponent implements OnInit {
  userDetails:any; agentList:any = []; spinner:boolean = true;

  alist = {
    agent:''
  }

  constructor(private router: Router, private arouter:ActivatedRoute,private apiService:ApiService,private _snackBar: MatSnackBar,) { 

    this.userDetails = JSON.parse(localStorage.getItem('user_details'));
    this.alist.agent = this.userDetails.username; 

  }

  ngOnInit(): void {
    this.apiService.agentList(this.alist).subscribe(
      res => {
        this.spinner = false;
        this.agentList = res.Response;
      },err => console.log(err));
  }

  gotoUpdate(id){
    this.router.navigateByUrl('agentAdd/Edit/'+id);
  }

}
