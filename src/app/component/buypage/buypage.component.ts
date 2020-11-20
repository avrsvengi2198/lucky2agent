import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-buypage',
  templateUrl: './buypage.component.html',
  styleUrls: ['./buypage.component.css']
})
export class BuypageComponent implements OnInit {
  amount:any=0; ins_id:any;

  constructor(private router: Router, private arouter:ActivatedRoute) {
    this.amount = this.arouter.snapshot.params.amount;
   }

  ngOnInit(): void {
  }

}
