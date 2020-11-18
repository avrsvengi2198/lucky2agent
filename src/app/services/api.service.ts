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

  	userLoggedin(){
		return !!localStorage.getItem('user_id');
	}

  	login(details):Observable<any>{
		return this.httpClient.post<any>(this.server+'/login.php', details, this.httpOptions).pipe(retry(0),catchError(this.errorHandl)); 
 	}
  
  	logoutUser() {
		localStorage.removeItem('user_id');
		localStorage.removeItem('user_details');
    	this.router.navigateByUrl('');
	  }
	  
	updateUser(details):Observable<any>{
		return this.httpClient.post<any>(this.server1+'/user_edit.php', details, this.httpOptions).pipe(retry(0),catchError(this.errorHandl)); 
	 }
	 
	 changePassword(details):Observable<any>{
		return this.httpClient.post<any>(this.server+'/change_password.php', details, this.httpOptions).pipe(retry(0),catchError(this.errorHandl)); 
 	}


}
