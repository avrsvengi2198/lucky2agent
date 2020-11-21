import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  menu: boolean = false; userDetails:any; spinner:boolean = true;
  nextLot:any = []; lastWinner :any = [];

  menuFunc(){
    this.menu = !this.menu;       
  }

 constructor(private apiService:ApiService) { 
      this.userDetails = JSON.parse(localStorage.getItem('user_details'));
  }

  ngOnInit(): void {
    this.menuFunc()

    this.apiService.getDashlottery().subscribe(
      res =>{
        this.spinner = false;
        this.lastWinner = res.Response[0].winner;
        this.nextLot = res.Response[1].lastLot[0];
      },err => console.log(err));
  }

  getShortName(fullName) { 
    return fullName.split(' ').map(n => n[0]).join('');
  }

}
