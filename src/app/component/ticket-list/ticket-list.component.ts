import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-ticket-list',
  templateUrl: './ticket-list.component.html',
  styleUrls: ['./ticket-list.component.css']
})
export class TicketListComponent implements OnInit {
  status:boolean = false; tickList:any = []; spinner:boolean = true;
  Ticket : any =[]; title:any ='';
  userDetails:any;
  getDet = {
    type:'',
    mobile_no:''
  }

  openPopup(id){
    this.spinner = true;
    if(id !=''){
      this.spinner = false;
       this.status = true;
       let pariTicks =  this.tickList.find(element => element.lid == id);
       this.Ticket = pariTicks.tickets_list;
       this.title = pariTicks.lottery_name;
    }
   
  }
  closePopup(){
    this.status = false;
  }

  constructor(private apiService:ApiService,private _snackBar: MatSnackBar,private router: Router,) {
    this.userDetails = JSON.parse(localStorage.getItem('user_details'));
    this.getDet.mobile_no = this.userDetails.username;
   }

  ngOnInit(): void {
    this.closePopup();
    this.apiService.newticketList(this.getDet).subscribe(
      res => {
        this.spinner = false;
        this.tickList = res.Response;
      },err => console.log(err) );
  }

}
