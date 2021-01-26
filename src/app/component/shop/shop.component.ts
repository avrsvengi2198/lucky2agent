import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.css']
})
export class ShopComponent implements OnInit {
  spinner:boolean = true; product:any = [];
  constructor(private apiService:ApiService,private _snackBar: MatSnackBar,private router: Router) { }

  ngOnInit(): void {
    this.loadproducts();
  }

  loadproducts(){
    this.apiService.lotteryList().subscribe(
      res =>{
        this.spinner = false;
        if(res.Status == "Success"){
            this.product = res.Response;
        }else{

        }
      },err =>console.log(err));
  }

}
