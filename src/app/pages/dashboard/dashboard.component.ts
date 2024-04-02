import { Component, OnInit } from '@angular/core';
import { SignupService } from '../../services/signup.service';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { SessionServiceService } from '../../services/session-service.service';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [RouterModule,HttpClientModule,MatIconModule],
  providers:[SignupService],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit{

  totalProjects: number = 0;
  closedProjectsCount: number = 0;
  cancelledProjectsCount: number = 0;
  runningProjectsCount: number = 0;
  closureDelayProjectsCount: number = 0;

  loggedInUser: string | null = null;

  constructor(private mySer : SignupService, private session : SessionServiceService){

  }
  ngOnInit(): void {
    this.fetchTotalProjectCount();
    this.fetchRunningProjectCount();
    this.fetchClosureDelayCount();
    this.fetchClosedProjectCount();
    this.fetchCanlledProjectCount();

    this.loggedInUser = this.session.getLoggedUser();
  }

  fetchTotalProjectCount():void{
    this.mySer.getTotalProjectCount().subscribe(res=>{
      this.totalProjects=res
    },
    (error)=>{
      console.log('Error fetching total projects count:', error)
    });
  }

  fetchClosedProjectCount():void{
    this.mySer.getClosedProjectsCount().subscribe(res=>{
      this.closedProjectsCount=res
    },
    (error)=>{
      console.log('Error fetching closed projects count:', error)
    });
  }

  fetchCanlledProjectCount():void{
    this.mySer.getCancelledProjectsCount().subscribe(res=>{
      this.cancelledProjectsCount=res
    },
    (error)=>{
      console.log('Error fetching cancelled projects count:', error)
    });
  }

  fetchRunningProjectCount():void{
    this.mySer.getRunningProjectsCount().subscribe(res=>{
      this.runningProjectsCount=res
    },
    (error)=>{
      console.log('Error fetching running projects count:', error)
    });
  }

  fetchClosureDelayCount():void{
    this.closureDelayProjectsCount=3;
  }

  logout(): void {
    this.session.clearSession();
  }

  

}
