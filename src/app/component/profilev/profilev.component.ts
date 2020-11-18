import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-profilev',
  templateUrl: './profilev.component.html',
  styleUrls: ['./profilev.component.css']
})
export class ProfilevComponent implements OnInit {
  userDetails:any;

  constructor(private apiService:ApiService) {
    this.userDetails = JSON.parse(localStorage.getItem('user_details'));
   }

  ngOnInit(): void {
  }

}
