import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { SignupService } from '../../services/signup.service';
import { HttpClientModule, HttpErrorResponse } from '@angular/common/http';
import { Router, RouterModule } from '@angular/router';
import { SessionServiceService } from '../../services/session-service.service';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-create-project',
  standalone: true,
  imports: [FormsModule,CommonModule,ReactiveFormsModule,HttpClientModule,RouterModule,MatIconModule],
  providers:[SignupService,SessionServiceService],
  templateUrl: './create-project.component.html',
  styleUrl: './create-project.component.css'
})
export class CreateProjectComponent implements OnInit{

  projectForm!: FormGroup;
  project_name: string = '';
  users : {user_id:number,name : string}[]=[];
  reasons: {reason_id:number, reason: string }[] = [];
  types: {type_id:number, type_name: string }[] = [];
  divisions: {division_id:number, division: string }[] = [];
  categories: {category_id:number, category: string }[] = [];
  priorities: {priority_id:number, priority: string }[] = [];
  departments: {department_id:number, department: string }[] = [];
  locations: {location_id:number, location: string }[] = [];
  start_date: Date | null = null;
  end_date: Date | null = null;
  status: string ="Registered";

  selectedUsers: number[] = [];
  selectedProjectName:any | null = null;
  selectedReason: number = 0;
  selectedType: number = 0;
  selectedDivision: number = 0;
  selectedCategories: number = 0;
  selectedPriorities: number = 0;
  selectedDepartment: number = 0;
  selectedLocation: number = 0;
  selectedStartDate: Date|null=null;
  selectedEndDate: Date|null=null;

  loggedInUser: string | null = null;

  constructor(private fb : FormBuilder, private mySer : SignupService, private session : SessionServiceService, private router:Router)
  {}

  ngOnInit(): void {
      this.initializeForm();
      this.getAllData();
     // this.loggedInUser = this.session.getLoggedUser();
     this.getSession();
  }

  initializeForm(): void {
    this.projectForm = this.fb.group({
      projectName: ['', Validators.required],
      selectedUsers: [[]],
      reasons: ['', Validators.required],
      type: ['', Validators.required],
      division: ['', Validators.required],
      category: ['', Validators.required],
      priority: ['', Validators.required],
      department: ['', Validators.required],
      start_date: ['', Validators.required],
      end_date: ['', Validators.required],
      location: ['', Validators.required]
    });
  }

  saveProject(){
      const projectData = this.projectForm.value;
      console.log(this.projectForm.value);
      projectData.reason_id =Number(this.selectedReason);
      projectData.type_id = Number(this.selectedType);
      projectData.division_id = Number(this.selectedDivision);
      projectData.category_id = Number(this.selectedCategories);
      projectData.priority_id = Number(this.selectedPriorities);
      projectData.department_id = Number(this.selectedDepartment);
      projectData.location_id = Number(this.selectedLocation);
      projectData.status_id = 1;
      projectData.user_id = this.selectedUsers[0];
      projectData.start_date=this.selectedStartDate;
      projectData.end_date=this.selectedEndDate;
      projectData.project_name=this.selectedProjectName;

      //console.log(projectData.id);
      //console.log(projectData.reason_id);
      //console.log(projectData.type_id);
      //console.log(projectData.division_id);
      console.log(projectData.user_id);
      // console.log(projectData.start_date);
      // console.log(projectData.end_date);

     // console.log(projectData.project_name)

       console.log(projectData);

      this.mySer.saveProject(projectData).subscribe(res=>{
        alert('Project saved Successfully');
        this.projectForm.reset();
      })

  }

  getAllData(){
    this.mySer.getAllCategories().subscribe(res=>{
      //console.log(res)
        this.categories=res;
      //  console.log(this.categories);
    })

    this.mySer.getAllDepartments().subscribe(res=>{
      this.departments=res;
      // this.departments.forEach(dep => {
      //       console.log(dep.department_id);
      //   });
    })

    this.mySer.getAllDivisions().subscribe(res=>{
      this.divisions=res;
    })

    this.mySer.getAllLocations().subscribe(res=>{
      this.locations=res;
    })

    this.mySer.getAllPriorities().subscribe(res=>{
      this.priorities=res;
    })

    this.mySer.getAllReasons().subscribe(res=>{
      this.reasons=res;
    })

    // this.mySer.getAllStatus().subscribe(res=>{
    //   this.status=res;
    // })

    this.mySer.getAllTypes().subscribe(res=>{
      this.types=res;
    })

    this.mySer.getAllUser().subscribe(res=>{
      this.users=res;
    //   this.users.forEach(user => {
    //     console.log(user.id);
    // });
    })

  
  }

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
