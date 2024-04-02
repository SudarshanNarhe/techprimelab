import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SessionServiceService {

  private readonly User_key='loggedUser';

  constructor() { }

  setLoggedUser(user : string){
    sessionStorage.setItem(this.User_key,user);
  }

  getLoggedUser(): string | null {
    if (typeof sessionStorage !== 'undefined') {
      return sessionStorage.getItem(this.User_key);
    } else {
      // Handle the case where sessionStorage is not available
      return null;
    }
  }

  clearSession():void{
    sessionStorage.removeItem(this.User_key);
  }

}
