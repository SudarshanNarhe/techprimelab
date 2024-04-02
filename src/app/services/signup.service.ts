import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { User } from '../models/User';
import { Project } from '../models/Project';
import { Project1 } from '../models/Project1';

@Injectable({
  providedIn: 'root'
})
export class SignupService {
  url:string="http://localhost:8080/user/";

  url1:string="http://localhost:8080/projects/"

  constructor(public myClient : HttpClient) { }

  saveUser(user: User): Observable<any> {
    return this.myClient.post<any>(this.url+"saveUser",user).pipe(
      catchError(this.errorHandler)
    );
  }

  saveProject(project : Project1):Observable<any>{
    return this.myClient.post<any>(this.url1+"saveProject",project).pipe(
      catchError(this.errorHandler)
    )
  }

  getAllUser():Observable<any> {
    return this.myClient.get<any>(this.url+"getAllUser");
  }

  login(email:string , password : string): Observable<any>{
    return this.myClient.get<any>(`${this.url}login/${email}/${password}`)
  }

  getAllProjects():Observable<any>{
    return this.myClient.get<any>(this.url1+"getAllProjects");
  }

  getAllCategories():Observable<any>{
    return this.myClient.get<any>(this.url1+"getAllCategories");
  }

  getAllDepartments():Observable<any>{
    return this.myClient.get<any>(this.url1+"getAllDepartments");
  }

  getAllDivisions():Observable<any>{
    return this.myClient.get<any>(this.url1+"getAllDivisions");
  }

  getAllLocations():Observable<any>{
    return this.myClient.get<any>(this.url1+"getAllLocations");
  }

  getAllPriorities():Observable<any>{
    return this.myClient.get<any>(this.url1+"getAllPriority");
  }

  getAllReasons():Observable<any>{
    return this.myClient.get<any>(this.url1+"getAllReasons");
  }

  getAllStatus():Observable<any>{
    return this.myClient.get<any>(this.url1+"getAllStatus");
  }

  getAllTypes():Observable<any>{
    return this.myClient.get<any>(this.url1+"getAllTypes");
  }

  updateStatus(project_id:number,status_id:number):Observable<any>{
    return this.myClient.put<any>(`${this.url1}updateStatus/${project_id}/${status_id}`,null);
  }

  getTotalProjectCount():Observable<any>{
    return this.myClient.get<any>(this.url1+"getTotalProjectCount");
  }

  getClosedProjectsCount():Observable<any>{
    return this.myClient.get<any>(this.url1+"closedProjectsCount");
  }

  getCancelledProjectsCount():Observable<any>{
    return this.myClient.get<any>(this.url1+"cancelledProjectsCount");
  }

  getRunningProjectsCount():Observable<any>{
    return this.myClient.get<any>(this.url1+"runningProjectsCount");
  }



  errorHandler(error:any){
    let errorMessage='';
    if(error.error instanceof ErrorEvent){
      errorMessage=error.error.message;
    }
    else{
      errorMessage='error code :$(error.status)\nMessage:${error.message}'
    }
    console.log(errorMessage);
    return throwError(()=>new Error(errorMessage));
   }




}
