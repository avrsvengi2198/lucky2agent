import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-luckydraw',
  templateUrl: './luckydraw.component.html',
  styleUrls: ['./luckydraw.component.css']
})
export class LuckydrawComponent implements OnInit {
  date:any = '2020/11/25 10:00:00';
  constructor() { }

  ngOnInit(): void {
  }

}
