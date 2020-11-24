import { BrowserModule } from '@angular/platform-browser';
import { NgModule ,NO_ERRORS_SCHEMA} from '@angular/core';


import { ApiService } from './services/api.service';
import { AuthGuard } from './auth.guard';
import { AppRoutingModule, routingComponents } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CommonModule, HashLocationStrategy, LocationStrategy } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatRadioModule} from '@angular/material/radio';
import {MatIconModule} from '@angular/material/icon';
import { MenuComponent } from './component/menu/menu.component';
import {MatSelectModule} from '@angular/material/select';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatNativeDateModule, MatRippleModule} from '@angular/material/core';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { DatePipe } from '@angular/common'
import { from } from 'rxjs';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import { AgentlistComponent } from './component/agent/agentlist/agentlist.component';
import { AgentcreateComponent } from './component/agent/agentcreate/agentcreate.component';
import { UserlistComponent } from './component/users/userlist/userlist.component';
import { UsercreateComponent } from './component/users/usercreate/usercreate.component';
import { BuypageComponent } from './component/buypage/buypage.component';
import { LuckydrawComponent } from './component/luckydraw/luckydraw.component';
import { TicketListComponent } from './component/ticket-list/ticket-list.component';
import { LotteryComponent } from './component/lottery/lottery.component';
import { AgentwinnerComponent } from './component/agentwinner/agentwinner.component';

@NgModule({
  declarations: [
    AppComponent,
    routingComponents,
    MenuComponent,
    AgentlistComponent,
    AgentcreateComponent,
    UserlistComponent,
    UsercreateComponent,
    BuypageComponent,
    LuckydrawComponent,
    TicketListComponent,
    LotteryComponent,
    AgentwinnerComponent,
  ],
  imports: [
    BrowserModule,
    CommonModule ,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatExpansionModule,
    MatFormFieldModule,
    MatInputModule,
    MatCheckboxModule,
    MatRadioModule,
    MatIconModule,
    MatSelectModule,
    MatDatepickerModule,
    MatSnackBarModule,
    MatProgressSpinnerModule,
    MatNativeDateModule,
    MatRippleModule
  ],
  schemas: [
    NO_ERRORS_SCHEMA
  ],
  providers: [ApiService,DatePipe,AuthGuard,{provide: LocationStrategy, useClass: HashLocationStrategy}],
  bootstrap: [AppComponent]
})
export class AppModule { }