import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  constructor(private apiService:ApiService) { }

  ngOnInit(): void {
  }

  logout(){
    this.apiService.logoutUser();
  }

}
