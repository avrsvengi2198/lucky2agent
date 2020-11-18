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


}
