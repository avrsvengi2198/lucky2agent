import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  menu: boolean = false; userDetails:any; spinner:boolean = true;
  nextLot:any = []; lastWinner :any = [];  date :any= '';
  status:boolean = false;  winnerShow :any = [];

  menuFunc(){
    this.menu = !this.menu;       
  }

 constructor(private apiService:ApiService) { 
      this.userDetails = JSON.parse(localStorage.getItem('user_details'));
      if (!localStorage.getItem('date')) { 
        location.reload() 
      } else{
        if (!localStorage.getItem('foo')) { 
          localStorage.setItem('foo', 'no reload') 
          location.reload() 
        } else {
          localStorage.removeItem('foo') 
        } 
      }
      this.date = localStorage.getItem('date');
  }

  ngOnInit(): void {
    this.menuFunc()
    this.closePopup();

    this.apiService.getDashlottery().subscribe(
      res =>{
        this.spinner = false;
        this.lastWinner = res.Response[0].winner;
        this.nextLot = res.Response[1].lastLot[0];
        this.date = this.nextLot.lotteryTime;
        if(this.date !=''){
          localStorage.setItem('date',this.date);
        }else{
          localStorage.setItem('date','');
        }
      },err => console.log(err));
  }

  getShortName(fullName) { 
    return fullName.split(' ').map(n => n[0]).join('');
  }

  openPopup(id){
    this.spinner = true;
    if(id !=''){
      this.spinner = false;
      this.status = true;
      let pariTicks =  this.lastWinner.find(element => element.id == id);
      this.winnerShow = pariTicks;
    }
  }

  closePopup(){
    this.status = false;
  }

}
