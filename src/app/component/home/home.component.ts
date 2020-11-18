import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  menu: boolean = false; userDetails:any;

  menuFunc(){
    this.menu = !this.menu;       
  }

 constructor(private apiService:ApiService) { 
      this.userDetails = JSON.parse(localStorage.getItem('user_details'));
  }

  ngOnInit(): void {
    this.menuFunc()
  }

  getShortName(fullName) { 
    return fullName.split(' ').map(n => n[0]).join('');
  }

}
