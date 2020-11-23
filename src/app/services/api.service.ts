import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  server 	= 'http://elanciereschool.in/lucky/app/users';
  server1 	= 'http://elanciereschool.in/lucky/app/agent';

  	// Http Headers
	httpOptions = {
		headers: new HttpHeaders({
			'Content-Type': 'application/json;',
		})
	}

	// Error handling
	errorHandl(error) {
		let errorMessage = '';
		if(error.error instanceof ErrorEvent) {
		  errorMessage = error.error.message;
		} else {
		  errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
		}
		console.log(errorMessage);
		return throwError(errorMessage);
	  }

  constructor(private httpClient:HttpClient,private router:Router) { 

  }

    //check user login or not
  	userLoggedin(){
		return !!localStorage.getItem('user_id');
	}

	//login 
  	login(details):Observable<any>{
		return this.httpClient.post<any>(this.server1+'/login.php', details, this.httpOptions).pipe(retry(0),catchError(this.errorHandl)); 
 	}
  
	//logout 
  	logoutUser() {
		localStorage.removeItem('user_id');
		localStorage.removeItem('user_details');
    	this.router.navigateByUrl('');
	  }
	
	//update user
	updateUser(details):Observable<any>{
		return this.httpClient.post<any>(this.server1+'/user_edit.php', details, this.httpOptions).pipe(retry(0),catchError(this.errorHandl)); 
	 }
	 
	//change password
	 changePassword(details):Observable<any>{
		return this.httpClient.post<any>(this.server+'/change_password.php', details, this.httpOptions).pipe(retry(0),catchError(this.errorHandl)); 
	 }
	 
	//get Lottery List

	lotteryList():Observable<any>{
		return this.httpClient.get<any>(this.server+'/lottery_list.php', this.httpOptions).pipe(retry(0),catchError(this.errorHandl));
	}

	//get username 

	getUsername(details):Observable<any>{
		return this.httpClient.post<any>(this.server1+'/get_username.php', details, this.httpOptions).pipe(retry(0),catchError(this.errorHandl)); 
	}


	/***
	 * Agent Start
	 */

	agentAdd(details):Observable<any>{
		return this.httpClient.post<any>(this.server1+'/agent.php', details, this.httpOptions).pipe(retry(0),catchError(this.errorHandl)); 
	}

	agentList(details):Observable<any>{
		return this.httpClient.post<any>(this.server1+'/agent_list.php', details, this.httpOptions).pipe(retry(0),catchError(this.errorHandl)); 
	}

	agentUpdate(details):Observable<any>{
		return this.httpClient.post<any>(this.server1+'/agent_edit.php', details, this.httpOptions).pipe(retry(0),catchError(this.errorHandl)); 
	}

	/***
	 * Agent End
	 */


	 /***
	 * Users Start
	 */

	usersAdd(details):Observable<any>{
		return this.httpClient.post<any>(this.server1+'/user.php', details, this.httpOptions).pipe(retry(0),catchError(this.errorHandl)); 
	}

	usersList(details):Observable<any>{
		return this.httpClient.post<any>(this.server1+'/user_list.php', details, this.httpOptions).pipe(retry(0),catchError(this.errorHandl)); 
	}

	usersUpdate(details):Observable<any>{
		return this.httpClient.post<any>(this.server1+'/user_edit.php', details, this.httpOptions).pipe(retry(0),catchError(this.errorHandl)); 
	}

	/***
	 * Users End
	 */


	// Add Ticket
	addTicket(details):Observable<any>{
		return this.httpClient.post<any>(this.server1+'/addTicket.php', details, this.httpOptions).pipe(retry(0),catchError(this.errorHandl)); 
	}


	// Winner List
	winnerList(details):Observable<any>{ 
		return this.httpClient.post<any>(this.server+'/winner_details.php', details, this.httpOptions).pipe(retry(0),catchError(this.errorHandl)); 
	}


	//getTickets
	getTickets(details):Observable<any>{
		return this.httpClient.post<any>(this.server1+'/usedTickets.php', details, this.httpOptions).pipe(retry(0),catchError(this.errorHandl)); 
	}

	//getLottery
	getLottery(details):Observable<any>{
		return this.httpClient.post<any>(this.server+'/lotteryList.php', details, this.httpOptions).pipe(retry(0),catchError(this.errorHandl)); 
	}

	//getdashLottery
	getDashlottery():Observable<any>{
		return this.httpClient.get<any>(this.server1+'/dashLottery.php', this.httpOptions).pipe(retry(0),catchError(this.errorHandl));
	}


}
