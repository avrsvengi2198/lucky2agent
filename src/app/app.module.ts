import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { ApiService } from './services/api.service';
import { AuthGuard } from './auth.guard';
import { AppRoutingModule, routingComponents } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CommonModule } from '@angular/common';
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
import { from } from 'rxjs';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import { AgentlistComponent } from './component/agent/agentlist/agentlist.component';
import { AgentcreateComponent } from './component/agent/agentcreate/agentcreate.component';
import { UserlistComponent } from './component/users/userlist/userlist.component';
import { UsercreateComponent } from './component/users/usercreate/usercreate.component';


@NgModule({
  declarations: [
    AppComponent,
    routingComponents,
    MenuComponent,
    AgentlistComponent,
    AgentcreateComponent,
    UserlistComponent,
    UsercreateComponent
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
    MatSnackBarModule
  ],
  providers: [ApiService,AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }