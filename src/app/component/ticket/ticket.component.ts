import { Component, OnInit,ChangeDetectorRef,NgZone } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { ExternalLibraryService } from './../../util';
declare var $: any;
declare let Razorpay: any;


@Component({
  selector: 'app-ticket',
  templateUrl: './ticket.component.html',
  styleUrls: ['./ticket.component.css']
})
export class TicketComponent implements OnInit {
  status:boolean = false; Lottery:any = []; sTicket:any = [];
  pLottory : any = []; Ticket : any = []; spinner:boolean = false;
  availabelTick : number = 0;  lotteryType : any = ['Silver','Gold','Platinum'];
  ticketPrice:number = 0; manuSel : boolean = false; userDetails:any;
  btypeSel:boolean = false; agentCommis:any = 0; gst:any=''; email ='';
  getname = {
    mobile_no:''
  }

  details = {
    btype:'',
    lottery_id:'',
    user:'',
    uname:'',
    ticket_count:'',
    type:'',
    ltype:'',
    price:0,
    user_id:'',
    trans_id:''
  }

  response;
  razorpayResponse;
  showModal = false;

  openPopup(){
    this.status = true;
  }

  closePopup(){
    this.status = false;
  }

  constructor(private apiService:ApiService,private _snackBar: MatSnackBar,private router: Router,private razorpayService: ExternalLibraryService, private cd:  ChangeDetectorRef,private ngZone:NgZone) {
    this.userDetails = JSON.parse(localStorage.getItem('user_details'));
    this.details.user_id = this.userDetails.id;
    this.email = this.userDetails.email;
   }

  ngOnInit(): void {
    this.openPopup();
    this.closePopup();

    this.razorpayService.lazyLoadLibrary('https://checkout.razorpay.com/v1/checkout.js') .subscribe();
   

    // this.apiService.lotteryList().subscribe(
    //   res =>{
    //     this.spinner = false;
    //     this.Lottery = res.Response;
    //   },err => console.log(err)
    // );

  }


  /*** RAZORPAY */
  RAZORPAY_OPTIONS = {
    "key": "rzp_test_OegT5x6ZBDVE5X",
    "amount": 1,
    "name": "Adhiw",
    "order_id": "",
    "description": "Buy Ticks",
    "image": "assets/img/adhiw.png",
    "prefill": {
      "name": this.details.uname,
      "email": this.email,
      "contact": this.details.user,
      "method": ""
    },
    "modal": {},
    "theme": {
      "color": "#0096C5"
    }
  };

  public proceed() {
   var rpay = this.details.price * (100);
   this.RAZORPAY_OPTIONS.amount = rpay;
    // binding this object to both success and dismiss handler
    this.RAZORPAY_OPTIONS['handler'] = this.razorPaySuccessHandler.bind(this);
    // this.showPopup();
    let razorpay = new Razorpay(this.RAZORPAY_OPTIONS)
    razorpay.open();
  }

  public razorPaySuccessHandler(response) {
    //console.log(response.razorpay_payment_id);
    //console.log(response)
    this.razorpayResponse = 'Razorpay Response';
    this.details.trans_id = response.razorpay_payment_id;
    this.showModal = true;
    //this.cd.detectChanges()
    this.buyticketSave();
  }


  /*** */

  //getLottery

  getLottery(){
    this.spinner = true;
    if(this.details.ltype !=''){
      let ltype = {
        ltype:this.details.ltype
      }
      this.apiService.getLottery(ltype).subscribe(
        res =>{
          this.spinner = false;
          if(res.Status =="Success"){
            this.Lottery = res.Response;
          }else{
            this._snackBar.open('Try Another Lottery Type','', {
              duration: 3000,
            });
          }
        },err => console.log(err));
    }else{
      this._snackBar.open('Select Lottery Type','', {
        duration: 3000,
      });
    }
    
  }

  createTicket(){
    if(this.details.btype !=''){
        if(this.details.user !=''){
            if(this.details.lottery_id !=''){
                if(this.details.ticket_count !=''){
                    if(this.sTicket.length !=0){
                      this.proceed();
                    }else{
                      this._snackBar.open('Select Lottery !!','', {
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
    }else{
      this._snackBar.open('Please Select Buy type !!','', {
        duration: 3000,
      });
    }
  }

  buyticketSave(){
    this.spinner = true;
    let addTicks = {
      types:this.details.btype,
      ticket_count:this.details.ticket_count,
      user:this.details.user,
      lottery_id:this.details.lottery_id,
      tickets:this.sTicket,
      ticket_type:this.details.type,
      amount:this.details.price,
      who:'',
      type:'Agent',
      agentCommis:this.Lottery[0].agentCommis,
      trans_id:this.details.trans_id
    }
  if(this.details.btype == 'user'){
      addTicks.who = this.userDetails.username;
  }else{
    addTicks.who = null;
  }

    this.apiService.addTicket(addTicks).subscribe(
      res => {
        this.spinner = false;
        if(res.Status =="Failure"){
          this._snackBar.open(res.Message,'', {
            duration: 3000,
          });
         // this.router.navigateByUrl('home');
          this.ngZone.run(()=>this.navigateTo('/ticket'));
        }else{
          this.ngZone.run(()=>this.navigateTo('/buySuccess/'+res.Response[0].amount));
          //this.router.navigateByUrl('buySuccess/'+res.Response[0].amount);
        }
      },err => console.log(err));
  }

  navigateTo(url){
    this.router.navigate([url]);
  }

  //get user name

  getName(){
    if(this.details.user !=''){
      this.spinner = true;
      this.getname.mobile_no = this.details.user;
      this.apiService.getUsername(this.getname).subscribe(
        res => {
          this.spinner = false;
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
                      this.manuSel = true;
                  }else{
                    this.manuSel = false;
                    for(let a = 0; a < Number(this.details.ticket_count);a++){
                      let randTick = this.Ticket[Math.floor(Math.random() * this.Ticket.length)];                      
                      this.sTicket.push(randTick);
                    }
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
    if(this.details.btype !=''){
          if(this.details.lottery_id !=''){
            let getT = {
              types :'Agent',
              type:this.details.btype,
              lottery_id:this.details.lottery_id,
              user_id:this.details.user_id,
              username:this.userDetails.username,
            }
      
            this.apiService.getTickets(getT).subscribe(
              res => {
                if(res.Message != 0){
                  this.Ticket = res.Response;
                  this.availabelTick = res.Message;
                }else{
                  location.reload()
                  if(this.details.btype == 'user'){
                    this._snackBar.open('Buy Ticket !!','', {
                      duration: 3000,
                    });
                  }else{
                    this._snackBar.open('No Ticket Available !!','', {
                      duration: 3000,
                    });
                  }
                }
              
              },err => console.log(err));
      
            this.pLottory = this.Lottery.find(element => element.id == this.details.lottery_id);
            this.ticketPrice = this.pLottory.ticketPrice;
            this.gst = (this.pLottory.gst !='')?this.pLottory.gst:18;
          }else{
            this._snackBar.open('Select Lottery !!','', {
              duration: 3000,
            });
          }
    }else{
       location.reload()
      this._snackBar.open('Select Buy Type !!','', {
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
  if(this.details.lottery_id !=''){
    if( Number(this.availabelTick) < Number(this.details.ticket_count) ){
      $('#tCount').val('');
      $('#tCount').focus();
      this.details.price = 0;
      this._snackBar.open('You Enter Max.no of Ticket !','', {
        duration: 3000,
      });
    }else{
      if(this.details.btype == 'agent'){
        this.agentCommis = this.Lottery[0].agentCommis / 100;
        let calPrice = Number(this.details.ticket_count) * Number(this.ticketPrice);
        let commis = Number(calPrice) *  this.agentCommis;
        let gst =  Number(calPrice) * (this.gst / 100);
        this.details.price = Number(calPrice) - Number(commis) + Number(gst);
      }else{
        let calPrice = Number(this.details.ticket_count) * Number(this.ticketPrice);
        let gst =  Number(calPrice) * (this.gst / 100);
        this.details.price = Number(calPrice) + Number(gst);
        
      }
     
    }
  }else{
    $('#tCount').val('');
    this._snackBar.open('Select Lottery!','', {
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

showDetails(btype){
  if(btype !=''){
      if(btype == 'agent'){
          this.details.user = this.userDetails.username;
          this.details.uname = this.userDetails.name;
          this.btypeSel = true;
      }else{
        this.btypeSel = false;
      }
  }else{
    this._snackBar.open('Please Select Buy type !','', {
      duration: 3000,
    });
  }
}


}
