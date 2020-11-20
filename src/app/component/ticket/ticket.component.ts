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
  status:boolean = false; Lottery:any = []; sTicket:any = [];
  pLottory : any = []; Ticket : any = []; spinner:boolean = true;
  availabelTick : number = 0; 
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
        this.spinner = false;
        this.Lottery = res.Response;
      },err => console.log(err)
    );

  }

  createTicket(){
    if(this.details.user !=''){
        if(this.details.lottery_id !=''){
            if(this.details.ticket_count !=''){
                if(this.sTicket.length !=0){
                    let addTicks = {
                      ticket_count:this.details.ticket_count,
                      user:this.details.user,
                      lottery_id:this.details.lottery_id,
                      tickets:this.sTicket,
                      ticket_type:this.details.type
                    }
                    this.apiService.addTicket(addTicks).subscribe(
                      res => {
                        if(res.Status =="Failure"){
                          this._snackBar.open(res.Message,'', {
                            duration: 3000,
                          });
                          this.router.navigateByUrl('home');
                        }else{
                          this.router.navigateByUrl('buySuccess');
                        }
                      },err => console.log(err));
                }else{
                  this._snackBar.open('Select Lottery Type !!','', {
                    duration: 3000,
                  });
                }
            }else{
              this._snackBar.open('Enter Ticket Count !!','', {
                duration: 3000,
              });
            }
        }else{
          this._snackBar.open('Select Lottery !!','', {
            duration: 3000,
          });
        }
    }else{
      this._snackBar.open('Enter Mobile No !!','', {
        duration: 3000,
      });
    }

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
  showTicket(args){
    this.sTicket = [];
    if(this.details.lottery_id !=''){
      //check ticket count empty
          if(this.details.ticket_count !=''){
              //check ticket count max
                if(Number(this.details.ticket_count) > Number(this.availabelTick)){
                  this._snackBar.open('You Enter Max.no of Ticket !','', {
                    duration: 3000,
                  });
                }else{
                  if(this.details.type =="Manual"){
                      this.openPopup();
                  }else{
                    for(let a = 0; a < Number(this.details.ticket_count);a++){
                      let randTick = this.Ticket[Math.floor(Math.random() * this.Ticket.length)];                      
                      this.sTicket.push(randTick);
                    }
                    console.log(this.sTicket);
                  }
               }
          }else{
            this.details.type = '';
            $('#tCount').focus();
            this._snackBar.open('Enter Ticket Count !!','', {
              duration: 3000,
            });
          }
    }else{
      $('#lid').focus();
      this._snackBar.open('Select Lottery !!','', {
        duration: 3000,
      });
      this.details.type = '';
    }
    
  }

  
  //get particular lottry
  getParticlot(){
    if(this.details.lottery_id !=''){
      let getT = {lottery_id:this.details.lottery_id}
      this.apiService.getTickets(getT).subscribe(
        res => {
          this.Ticket = res.Response;
          this.availabelTick = res.Message;
        },err => console.log(err));
      this.pLottory = this.Lottery.find(element => element.id == this.details.lottery_id);
    }else{
      this._snackBar.open('Select Lottery !!','', {
        duration: 3000,
      });
    }
  }

/* //generate ticket
 generateTicket(){
  let genTick = [];
   for(let i =1; i<= Number(this.pLottory.max_count);i++){
     let gtick = this.pLottory.lottery_num + (new Date().getFullYear()) + this.pad(i,'5');
    genTick.push(gtick);
   }
   return genTick;
 }*/

pad(num, size) {
  let s = num+"";
  while (s.length < size) s = "0" + s;
  return s;
}

//check max count
checkMaxcount(){
  if( Number(this.availabelTick) <= Number(this.details.ticket_count) ){
    $('#tCount').val('');
    $('#tCount').focus();
    this._snackBar.open('You Enter Max.no of Ticket !','', {
      duration: 3000,
    });
  }
}

storeTicket(pin,event){
    if(event.currentTarget.checked){
      this.sTicket.push(pin);
      if(this.details.ticket_count < this.sTicket.length){
        this.sTicket.forEach((element,index) => {
        if(element == pin){
          this.sTicket.splice(index,1)
        }
      });
        event.currentTarget.checked =false;
        this._snackBar.open('Already '+this.details.ticket_count+' Tickets Picked !','', {
          duration: 2000,
        });
      }
    }else{
      this.sTicket.forEach((element,index) => {
        if(element == pin){
          this.sTicket.splice(index,1)
        }
      });
    }
}


}
