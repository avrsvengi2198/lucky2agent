import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-lottery-winner',
  templateUrl: './lottery-winner.component.html',
  styleUrls: ['./lottery-winner.component.css']
})
export class LotteryWinnerComponent implements OnInit {

  winnerList :any = []; date:any;

  winner = {
    lottery_date:''
  }

  constructor(private apiService:ApiService,private _snackBar: MatSnackBar) { 

  }

  ngOnInit(): void {
    this.getWinnerList();
  }

  getWinnerList(){
    this.apiService.winnerList(this.winner).subscribe(
      res => {
        if(res.Status == 'Success'){
            this.winnerList = res.Response;
        }else{
          this._snackBar.open('No Record Fount','', {
            duration: 3000,
          });
        }
      },err => console.log(err));
  }

}
