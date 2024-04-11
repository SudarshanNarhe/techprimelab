import { Component, OnInit } from '@angular/core';
import { SignupService } from '../../services/signup.service';
import { Router, RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { SessionServiceService } from '../../services/session-service.service';
  import { MatIconModule } from '@angular/material/icon';
import { DepartmentSuccess } from '../../models/DepartmentSuccess';
import { CommonModule } from '@angular/common';
import {jqxChartModule} from 'jqwidgets-ng/jqxchart';



@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [RouterModule,HttpClientModule,MatIconModule,CommonModule,jqxChartModule],
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

  departmentSuccessData: DepartmentSuccess[]=[];
 
  sampleData!: any[];
  xAxis!: any;
  seriesGroups!: any[];

  loggedInUser: string | null = null;

  constructor(private mySer : SignupService, private session : SessionServiceService, private router : Router){

  }
  ngOnInit(): void {


    this.fetchTotalProjectCount();
    this.fetchRunningProjectCount();
    this.fetchClosureDelayCount();
    this.fetchClosedProjectCount();
    this.fetchCanlledProjectCount();
    this.fetchDepartmentSuccessData();

    //this.loggedInUser = this.session.getLoggedUser();
    this.getSession();
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
    this.mySer.getCountOfClosureProject().subscribe(res =>{
      this.closureDelayProjectsCount=res
      // console.log(this.closureDelayProjectsCount)
    },
    (error)=>{
      console.log('Error fetching closure projects count:', error)
    });
  }


  fetchDepartmentSuccessData(): void {
    this.mySer.getDatForGraph().subscribe(
      (data: DepartmentSuccess[]) => {
        this.departmentSuccessData = data;
  
        // Populate sampleData array
        this.sampleData = data.map(item => ({
          department: item.department,
          totalProjects: item.totalProjects, 
          totalProjectsclosed: item.totalProjectsclosed, 
          successPercentage: item.successPercentage 
        }));
  
        console.log('sampledata 11',this.sampleData)
        // Configure xAxis
        this.xAxis = { 
          dataField: 'department', 
          showGridLines: true,  
          labels: {
            formatFunction: (value: string): string => {
             // const abbreviatedValue = value.substring(0, 5);
              const item = this.sampleData.find((item) => item.department == value);
              if (item) {
                return `${item.successPercentage}% <br> ${value}`;
              }
              return value; 
            },
          },
        };
  
  
        // Configure seriesGroups
        this.seriesGroups = [
          {
            type: 'column',
            columnsGapPercent: 50,
            seriesGapPercent: 0,
            valueAxis: {
              unitInterval: 2,
              minValue: 0,
              maxValue: 16,
              displayValueAxis: true,
              description: '',
              axisSize: 'auto',
              tickMarksColor: '#888888'
            },
            series: [
              { dataField: 'totalProjects', displayText: 'Total Projects' },
              { dataField: 'totalProjectsclosed', displayText: 'Closed Projects' },
             
            ]
          }
        ];
      
        console.log('Department success data:', data);
      },
      (error) => {
        console.error('Error fetching department success data:', error);
      }
    );
  }
  


  padding: any = { left: 15, top: 15, right: 15, bottom: 15 };
  titlePadding: any = { left: 10, top: 10, right: 0, bottom: 10 }; 

  getSession() {
    this.mySer.getSession().subscribe(
      (response: string) => {
        this.loggedInUser = response;
      },
      (error) => {
        console.log("Error getting session:", error);
      }
    );
  }
  
  logout() {
    console.log("in logout")
    this.mySer.logOutUser().subscribe(
      response => {
        this.router.navigate(['/login']);
        console.log('Logout successful:', response);
        
        // Handle logout success, such as redirecting to login page or showing a message
      },
      error => {
        console.error('Logout failed:', error);
        // Handle logout failure
      }
    );
  }

}
