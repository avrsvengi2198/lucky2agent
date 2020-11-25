import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ApiService } from 'src/app/services/api.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-agentwinner',
  templateUrl: './agentwinner.component.html',
  styleUrls: ['./agentwinner.component.css']
})
export class AgentwinnerComponent implements OnInit {

  winnerList :any = []; date:any; spinner:boolean = true;
  dateReq:any = new Date(); userDetails:any;
  yesterday = new Date(this.dateReq); minDate:any;
  winner = {
    lottery_date:'',
    username:''
  }

  constructor(private apiService:ApiService,private _snackBar: MatSnackBar,
    public datepipe: DatePipe,) { 
      this.userDetails = JSON.parse(localStorage.getItem('user_details'));
      this.winner.username = this.userDetails.username;
  }

  ngOnInit(): void {
    this.getWinnerList();
  }

  getWinnerList(){
    this.winner.lottery_date = this.datepipe.transform(this.dateReq, 'dd-MM-yyyy');
    this.apiService.agentwinnerList(this.winner).subscribe(
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
