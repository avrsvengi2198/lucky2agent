import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree , Router} from '@angular/router';
import { Observable } from 'rxjs';
import { ApiService } from 'src/app/services/api.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(
    private apiService: ApiService,
    private router: Router) {}

   canActivate(): boolean {
      if (this.apiService.userLoggedin()) {
        return true;
      } else {
        this.router.navigateByUrl('');
        return false ;
      }
  }
  
}
