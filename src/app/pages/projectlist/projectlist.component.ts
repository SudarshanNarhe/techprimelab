import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink, RouterModule } from '@angular/router';
import { Project } from '../../models/Project';
import { SignupService } from '../../services/signup.service';
import { HttpClientModule } from '@angular/common/http';
import { MatPaginatorModule } from '@angular/material/paginator';
import { SessionServiceService } from '../../services/session-service.service';
import { MatIconModule } from '@angular/material/icon';
import { LoginComponent } from '../login/login.component';
import { User } from '../../models/User';;
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-projectlist',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule,RouterLink,HttpClientModule,FormsModule,MatPaginatorModule,RouterModule,MatIconModule],
  providers:[SignupService,LoginComponent],
  templateUrl: './projectlist.component.html',
  styleUrl: './projectlist.component.css'
})
export class ProjectlistComponent implements OnInit{

  projects: Project[] = []; 
  filteredProjects!: Project[] ;
  selectedSortColumn: string = ''; // Track the selected column for sorting
  isSortAscending: boolean = true; // Track the sorting order

  user! : User;
  user_role!:string;
  

  currentPage: number = 1; // Track the current page number
  pageSize: number = 10;  // Number of records per page

  loggedInUser: string | null = null;
 
  isDisabled: boolean = true;

  constructor(private mySer: SignupService, private session : SessionServiceService, private router:Router,private snackBar: MatSnackBar){
    // console.log("in const of projectlist");
  }
  ngOnInit(): void {
  
    //this.loggedInUser = this.session.getLoggedUser();

    this.getSession();

    //this.getProjects();
   // this.getProjectList();
  }

  // getProjectList():void{
  //   console.log(this.user_role);
  //   if(this.user_role==='admin'){
  //   this.mySer.getAllProjects().subscribe(res=>{
  //     this.projects=res;
  //    console.log(this.projects);
  //    console.log(this.loggedInUser);
  //   //  this.mySer.getProjectListOfUser(this.loggedInUser).subscribe(res =>{
  //   //   this.projects=res;
  //   //   console.log(this.loggedInUser);
  //    // console.log(this.projects)
  //   // console.log("in project list "+this.user_role);
  //    this.filteredProjects = [...this.projects];
  //    this.updateFilteredProjects();
  //   });
  // }else{
  //   this.mySer.getProjectListOfUser(this.loggedInUser).subscribe(res =>{
  //     this.projects=res;
  //     console.log(this.loggedInUser);
  //    // console.log(this.projects)
  //   // console.log("in project list "+this.user_role);
  //    this.filteredProjects = [...this.projects];
  //    this.updateFilteredProjects();
  //   });

  // }
  // }

  
  getProjects(){
    if(this.loggedInUser!=null){
    this.mySer.getUserByEmail(this.loggedInUser).subscribe(res =>{
      this.user=res;
      this.user_role=this.user.user_role;
      console.log(this.user);
      console.log(this.user_role);
      console.log(typeof(this.user_role))
      // console.log(this.user_role.admin)
      // if(this.user_role==="admin"){
      //   console.log("in if ")
      // }else{
      //   console.log("in else")
      // }

      if(this.user_role==='admin'){
        this.isDisabled = !this.isDisabled;
       // console.log(this.isDisabled)
        this.mySer.getAllProjects().subscribe(res=>{
          this.projects=res;
          if(this.projects.length==0){
            //console.log('in if condition of project list')
            this.snackBar.open("No projects currently allocated.Please Contact to the Manager. Stay tuned for updates!", 'Close', {
              duration: 10000 // Duration in milliseconds
            });

          }else{
         console.log(this.projects);
         console.log(this.loggedInUser);
        //  this.mySer.getProjectListOfUser(this.loggedInUser).subscribe(res =>{
        //   this.projects=res;
        //   console.log(this.loggedInUser);
         // console.log(this.projects)
        // console.log("in project list "+this.user_role);
         this.filteredProjects = [...this.projects];
         this.updateFilteredProjects();
          }
        });
      
      }else{
        this.isDisabled = this.isDisabled;
        console.log(this.isDisabled)
        this.mySer.getProjectListOfUser(this.loggedInUser).subscribe(res =>{
          this.projects=res;
          if(this.projects.length==0){
           // console.log('in if condition of project list')
           this.snackBar.open("No projects currently allocated.Please Contact to the Project Manager. Stay tuned for updates!", 'Close', {
            duration: 10000 // Duration in milliseconds
          });
        }else{
          console.log(this.loggedInUser);
         // console.log(this.projects)
        // console.log("in project list "+this.user_role);
         this.filteredProjects = [...this.projects];
         this.updateFilteredProjects();
        }
        });
      }

    });

  }
    
  }

  startProject(project: Project): void {
    console.log("in startProject")
    // console.log("Project ID:", project.project_id);
    // console.log("Project Status ID:", project.status_id.status_id);
    this.updateProjectStatus(project.project_id, 1);
  }

  closeProject(project: Project): void {
     console.log("Close button clicked for project:", project);
  //    console.log("Project ID:", project.project_id);
  //  console.log("Project Status ID:", project.status_id.status_id);
   this.updateProjectStatus(project.project_id, 2);
  }

  cancelProject(project: Project): void {
      console.log("in cancelProject")
    //  console.log("Project ID:", project.project_id);
    //  console.log("Project Status ID:", project.status_id.status_id);
     this.updateProjectStatus(project.project_id, 3);
  }

  //for upadate status

  updateProjectStatus(project_id: number, status_id: number): void {
    this.mySer.updateStatus(project_id, status_id)
      .subscribe( 
        response => {
          console.log('Project status updated:', response);
          this.getProjects();
        },
        error => {
          console.error('Error updating project status:', error);
        }
     );
  }

  // for searching

  filterProjects(event: Event): void {
    const searchQuery = (event.target as HTMLInputElement).value.toLowerCase();
    this.filteredProjects = this.projects.filter(project =>
      project.project_name.toLowerCase().includes(searchQuery)
    );
  }

  //for sorting 
  applySort(){
      this.sortFilteredProjects();
  }
  sortFilteredProjects(): void {
    if (!this.selectedSortColumn) return; // No column selected for sorting

    // Sort the filtered projects based on the selected column
    this.filteredProjects.sort((a, b) => {
      const valA = this.getValueForSorting(a, this.selectedSortColumn);
      const valB = this.getValueForSorting(b, this.selectedSortColumn);

      if (valA < valB) return this.isSortAscending ? -1 : 1;
      if (valA > valB) return this.isSortAscending ? 1 : -1;
      return 0;
    });
  }

  // Get value for sorting based on column
  getValueForSorting(project: Project, column: string): any {
    switch (column) {
      case 'projectName':
        return project.project_name;
      case 'reason':
        return project.reason_id?.reason;
      case 'type':
        return project.type_id?.type_name;
      case 'division':
        return project.division_id?.division;
      case 'category':
        return project.category_id?.category;
      case 'priority':
        return project.priority_id?.priority;
      case 'department':
        return project.department_id?.department;
      case 'location':
        return project.location_id?.location;
      case 'status':
        return project.status_id?.status;

      case 'startDate':
        return project.start_date ? new Date(project.start_date) : null;
      case 'endDate':
        return project.end_date ? new Date(project.end_date) : null;
      default:
        return project.project_name;
    } 
  }

    // paginator
  onPageChange(pageNumber: number) {
    //console.log('onPageChange() called with pageNumber:', pageNumber);
    this.currentPage = pageNumber;
    //console.log('Current Page:', this.currentPage);
    this.updateFilteredProjects();
  }

  getPagesArray(): number[] {
    return Array(Math.ceil(this.projects.length / this.pageSize))
      .fill(0)
      .map((x, i) => i + 1);
  }

  get totalPages(): number {
    return Math.ceil(this.projects.length / this.pageSize);
  }
  
  updateFilteredProjects(): void {
    const startIndex = (this.currentPage - 1) * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    this.filteredProjects = this.projects.slice(startIndex, endIndex);
  }

  nextPage(): void {
    const totalPages = Math.ceil(this.projects.length / this.pageSize);
    if (this.currentPage < totalPages) {
      this.currentPage++;
      this.updateFilteredProjects();
    }
  }

  prevPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.updateFilteredProjects();
    }
  } 

  getSession() {
    this.mySer.getSession().subscribe(
      (response: string) => {
        this.loggedInUser = response;
       // console.log(response)
       this.getProjects();
      },
      (error) => {
        console.log("Error getting session:", error);
      }
    );
  
    
  }

  logout() {
    console.log("in logout")
    // const confirmLogout = window.confirm('Are you sure you want to logout?');
    // if(confirmLogout){
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
    // }
    // else{
    //   console.log('stay logged in')
    //   // this.router.navigate(['/projectlist']);
    // }
  }
}

