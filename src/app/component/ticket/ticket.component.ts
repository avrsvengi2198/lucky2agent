import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-ticket',
  templateUrl: './ticket.component.html',
  styleUrls: ['./ticket.component.css']
})
export class TicketComponent implements OnInit {
  status:boolean = false;

  openPopup(){
    this.status = true;
  }
  closePopup(){
    this.status = false;
  }

  constructor() { }

  ngOnInit(): void {
    this.openPopup();
    this.closePopup();
  }

}
