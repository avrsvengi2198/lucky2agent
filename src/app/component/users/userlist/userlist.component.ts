import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-userlist',
  templateUrl: './userlist.component.html',
  styleUrls: ['./userlist.component.css']
})
export class UserlistComponent implements OnInit {
  userDetails:any; usersList:any = [];
  alist = {
    agent:''
  }

  
  constructor(private router: Router, private arouter:ActivatedRoute,private apiService:ApiService,private _snackBar: MatSnackBar,) {
    this.userDetails = JSON.parse(localStorage.getItem('user_details'));
    this.alist.agent = this.userDetails.username; 
   }

  ngOnInit(): void {
    this.apiService.usersList(this.alist).subscribe(
      res => {
        this.usersList = res.Response;
      },err => console.log(err));
  }


  gotoUpdate(id){
    this.router.navigateByUrl('usersAdd/Edit/'+id);
  }

}
