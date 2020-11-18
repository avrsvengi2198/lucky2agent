import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
declare var $: any;


@Component({
  selector: 'app-ticket',
  templateUrl: './ticket.component.html',
  styleUrls: ['./ticket.component.css']
})
export class TicketComponent implements OnInit {
  status:boolean = false; Lottery:any = [];
  pLottory : any = []; Ticket : any = [];
  getname = {
    mobile_no:''
  }

  details = {
    lottery_id:'',
    user:'',
    uname:'',
    ticket_count:'',
    type:'',

  }

  openPopup(){
    this.status = true;
  }

  closePopup(){
    this.status = false;
  }

  constructor(private apiService:ApiService,private _snackBar: MatSnackBar,private router: Router) { }

  ngOnInit(): void {
    this.openPopup();
    this.closePopup();

    this.apiService.lotteryList().subscribe(
      res =>{
        this.Lottery = res.Response;
      },err => console.log(err)
    );

  }

  createTicket(){

  }

  //get user name

  getName(){
    if(this.details.user !=''){
      this.getname.mobile_no = this.details.user;
      this.apiService.getUsername(this.getname).subscribe(
        res => {
            if(res.Status == 'Success'){
                this.details.uname = res.Message;
            }else{
              this._snackBar.open('Does not exist any record !','', {
                duration: 3000,
              });
            }
        },err => console.log(err));
    }else{
      this._snackBar.open('Enter Mobile No !!','', {
        duration: 3000,
      });
    }
    
  }

  //show ticket
  showTicket(){
    if(this.details.ticket_count !=''){
      if(this.details.ticket_count > this.pLottory.max_count){
        this._snackBar.open('You Enter Max.no of Ticket !','', {
          duration: 3000,
        });
      }else{
          this.Ticket = this.generateTicket();
        if(this.details.type =="Manual"){
            this.openPopup();
        }else{
          console.log(this.details.ticket_count);
        }
      }
     
    }else{
      $('#tCount').focus();
      this._snackBar.open('Enter Ticket Count !!','', {
        duration: 3000,
      });
    }
  }

  //get particular lottry
  getParticlot(){
    if(this.details.lottery_id !=''){
      this.pLottory = this.Lottery.find(element => element.id == this.details.lottery_id);
    }else{
      this._snackBar.open('Select Lottery !!','', {
        duration: 3000,
      });
    }
  }

 //generate ticket
 generateTicket(){
  let genTick = [];
   for(let i =1; i<= Number(this.pLottory.max_count);i++){
     let gtick = this.pLottory.lottery_num + (new Date().getFullYear()) + this.pad(i,'5');
    genTick.push(gtick);
   }
   return genTick;
 }

pad(num, size) {
  let s = num+"";
  while (s.length < size) s = "0" + s;
  return s;
}

//check max count
checkMaxcount(){
  if(this.details.ticket_count > this.pLottory.max_count){
    $('#tCount').val('');
    $('#tCount').focus();
    this._snackBar.open('You Enter Max.no of Ticket !','', {
      duration: 3000,
    });
  }
}


}
