import { Component, OnInit } from '@angular/core';
import { SignupService } from '../../services/signup.service';
import { Router, RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import {  HttpClientModule } from '@angular/common/http';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { User } from '../../models/User';


@Component({
  selector: 'app-edit-profile',
  standalone: true,
  imports: [RouterModule,MatIconModule,HttpClientModule,ReactiveFormsModule,CommonModule,FormsModule],
  providers:[SignupService],
  templateUrl: './edit-profile.component.html',
  styleUrl: './edit-profile.component.css'
})
export class EditProfileComponent implements OnInit{

  loggedInUser: string | null = null;
  myGroup!: FormGroup;
  user!: User;

  isDisabled: boolean = true;

  constructor(private mySer: SignupService, private router: Router, private formBuilder: FormBuilder) {
    this.user={ 
      user_id: 0,
      name: '',
      address: '',
      contact: '',
      email: '',
      password: '',
      user_role: ''
    };
   }

  ngOnInit(): void {
    this.initializedForm();
    this.getSession();
    // this.initializedForm();
  }

  getSession() {
    this.mySer.getSession().subscribe(
      (response: string) => {
        this.loggedInUser = response;
        this.getUserByEmail();
       
      },
      (error) => {
        console.log("Error getting session:", error);
      }
    );
  }

  getUserByEmail() {
    console.log(this.loggedInUser);
    if (this.loggedInUser != null) {
      this.mySer.getUserByEmail(this.loggedInUser).subscribe(
        (res: User) => {
          this.user = res;
          console.log("User retrieved:", this.user);
          if(this.user.user_role=='admin'){
            this.isDisabled=false;
          }
          this.setValuetoForm();
        },
        (error) => {
          console.log("Error fetching user:", error);
        }
      );
    } else {
      console.log('Email is null to get a user');
    }
  }

  initializedForm(){
    this.myGroup = this.formBuilder.group({
      user_id: ['', Validators.required],
      name: ['', Validators.required],
      address: ['', Validators.required],
      contact: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      user_role: ['', Validators.required]
    });
  }

  setValuetoForm() {
    this.myGroup = this.formBuilder.group({
      user_id: [this.user.user_id, Validators.required],
      name: [this.user.name, Validators.required],
      address: [this.user.address, Validators.required],
      contact: [this.user.contact, Validators.required],
      email: [this.user.email, [Validators.required, Validators.email]],
      password: [this.user.password, [Validators.required, Validators.minLength(6)]],
      user_role: [this.user.user_role, Validators.required]
    });
  }

  onSubmit() {
    console.log('In submit method');
    let isupdate = confirm('Do you want to update Profile ?')
    if(isupdate){
    if (this.myGroup.valid) {
      let userData = this.myGroup.value;
      console.log('Form data:', userData);
      this.mySer.updateUser(userData).subscribe(
        (result) => {
          console.log('Profile updated successfully:', result);
          alert('Profile updated successfully');
          location.reload();
        },
        (error) => {
          console.error('Error updating user:', error);
        }
      );
    } else {
      console.log('Form is invalid');
    }
  }
  else{
    console.log(" in else for not update profile")
    location.reload();
  }
  }

  logout() {
    console.log('In logout');
    this.mySer.logOutUser().subscribe(
      () => {
        this.router.navigate(['/login']);
        console.log('Logout successful');
      },
      (error) => {
        console.error('Logout failed:', error);
      }
    );
  }
}