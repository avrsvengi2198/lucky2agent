import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-wallet',
  templateUrl: './wallet.component.html',
  styleUrls: ['./wallet.component.css']
})
export class WalletComponent implements OnInit {

  userDetails:any; wallet:any = []; totalPrice :any = 0;
  spinner:boolean = true;
  getWal = {
    username:''
  }

  constructor(private apiService:ApiService) { 
    this.userDetails = JSON.parse(localStorage.getItem('user_details'));
    this.getWal.username = this.userDetails.username;
  }

  ngOnInit(): void {

    this.apiService.wallet(this.getWal).subscribe(
      res =>{
        this.spinner =false;
        this.wallet = res.Response;
        this.totalPrice = res.Total;
      },err => console.log(err));
    
  }

}
