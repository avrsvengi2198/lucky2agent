import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ApiService } from 'src/app/services/api.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-lottery-winner',
  templateUrl: './lottery-winner.component.html',
  styleUrls: ['./lottery-winner.component.css']
})
export class LotteryWinnerComponent implements OnInit {

  winnerList :any = []; date:any; spinner:boolean = true;
  dateReq:any = new Date();
  yesterday = new Date(this.dateReq); minDate:any;
  winner = {
    lottery_date:''
  }

  constructor(private apiService:ApiService,private _snackBar: MatSnackBar,
    public datepipe: DatePipe,) { 

  }

  ngOnInit(): void {
    this.getWinnerList();
  }

  getWinnerList(){
    this.winner.lottery_date = this.datepipe.transform(this.dateReq, 'dd-MM-yyyy');
    this.apiService.winnerList(this.winner).subscribe(
      res => {
        this.spinner = false;
        if(res.Status == 'Success'){
            this.winnerList = res.Response;
        }else{
          this.winnerList = res.Response;
          this._snackBar.open('No Record Fount','', {
            duration: 3000,
          });
        }
      },err => console.log(err));
  }

}
