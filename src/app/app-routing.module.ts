import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from './component/login/login.component';
import { HomeComponent } from './component/home/home.component';
import { ProfileComponent } from './component/profile/profile.component';
import { ProfilevComponent } from './component/profilev/profilev.component';
import { LotteryWinnerComponent } from './component/lottery-winner/lottery-winner.component';
import { TicketComponent } from './component/ticket/ticket.component';
import { ChangePasswordComponent } from './component/change-password/change-password.component';
import { AuthGuard } from './auth.guard';
import { AgentcreateComponent } from './component/agent/agentcreate/agentcreate.component';
import { UsercreateComponent } from './component/users/usercreate/usercreate.component';
import { UserlistComponent } from './component/users/userlist/userlist.component';
import { AgentlistComponent } from './component/agent/agentlist/agentlist.component';
import { BuypageComponent } from './component/buypage/buypage.component';
import { LuckydrawComponent } from './component/luckydraw/luckydraw.component';
import { WalletComponent } from './component/wallet/wallet.component';
import { TicketListComponent } from './component/ticket-list/ticket-list.component';
import { AgentwinnerComponent } from './component/agentwinner/agentwinner.component';
import { ShopComponent } from './component/shop/shop.component';


const routes: Routes = [
  { path: '', component: LoginComponent},
  { path: 'login', component: LoginComponent},
  { path: 'home', component: HomeComponent ,canActivate: [AuthGuard]  },
  { path: 'profile', component: ProfileComponent ,canActivate: [AuthGuard]  },
  { path: 'profilev', component: ProfilevComponent ,canActivate: [AuthGuard]  },
  { path: 'lotteryWinner', component: LotteryWinnerComponent ,canActivate: [AuthGuard]  },
  { path: 'agentWinner', component: AgentwinnerComponent ,canActivate: [AuthGuard]  },
  { path: 'ticket', component: TicketComponent,canActivate: [AuthGuard] },
  { path: 'ticketList', component: TicketListComponent,canActivate: [AuthGuard] },
  { path: 'changePassword', component: ChangePasswordComponent ,canActivate: [AuthGuard] },
  { path: 'agentAdd/:type/:id', component: AgentcreateComponent ,canActivate: [AuthGuard] },
  { path: 'usersAdd/:type/:id', component: UsercreateComponent ,canActivate: [AuthGuard] },
  { path: 'usersList', component: UserlistComponent ,canActivate: [AuthGuard] },
  { path: 'agentList', component: AgentlistComponent ,canActivate: [AuthGuard] },
  { path: 'buySuccess/:amount', component: BuypageComponent,canActivate: [AuthGuard] },
  { path: 'spinner/:id', component: LuckydrawComponent,canActivate: [AuthGuard] },
  { path: 'wallet', component: WalletComponent,canActivate: [AuthGuard] },
  { path: 'shop', component: ShopComponent,canActivate: [AuthGuard] },


];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

export const routingComponents = [ LoginComponent,HomeComponent, ProfileComponent,ProfilevComponent, LotteryWinnerComponent, TicketComponent, ChangePasswordComponent, WalletComponent]