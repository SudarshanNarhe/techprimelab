import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule, RouterOutlet } from '@angular/router';
import { SignupService } from '../../services/signup.service';
import { HttpClientModule } from '@angular/common/http';
import { SessionServiceService } from '../../services/session-service.service';
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterModule,ReactiveFormsModule,CommonModule,HttpClientModule,RouterOutlet],
  providers:[SignupService],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit{

  loginForm!:FormGroup;
  isFormSubmitted:boolean=false;
  isValidUser: boolean=true;  


  constructor(private fb : FormBuilder, private mySer : SignupService,private router : Router, private session : SessionServiceService,private snackBar: MatSnackBar){

  }


    ngOnInit(): void {
      this.loginForm = this.fb.group({
        email: ['', [Validators.required, Validators.email]],
        password: ['', Validators.required]
      });
    }

    // checkUser(){
    //     if(this.loginForm.valid){
    //       const{email, password}=this.loginForm.value;
    //       this.mySer.login(email,password).subscribe(result =>{
    //         this.isValidUser=result;
    //         console.log("in check user"+this.isValidUser)
    //       });
    //     }
    //     console.log(this.isValidUser)
    //     if(!this.isValidUser){
    //       alert('You are Not Valid User Please SignUp First')
    //       this.loginForm.reset();
    //     }
    //     else{
    //       const email = this.loginForm.get('email')?.value;
    //       this.session.setLoggedUser(email);
    //       alert('Login Successful')
    //       this.router.navigate(['/createProject']);
    //     }


    //   }

      onSubmit(): void {
        console.log("in submit method")
      if (this.loginForm.valid) {
        const { email, password } = this.loginForm.value;
    
        this.mySer.loginByUser(email, password).subscribe(
          (response: any) => {
            if (response && response.status === 'success' && response.message === 'Login successful') {
              // Handle successful login
              console.log("111",response)
            //console.log(response.user_role)
            this.snackBar.open("Login Successful.", 'Close', {
              duration: 3000 // Duration in milliseconds
            });
           // this.router.navigate(['/createProject']);
              if (response.user_role === 'admin') {
                console.log(response.user_role)
                this.router.navigate(['/createProject']);
              }
              else if(response.user_role === 'user'){
                this.router.navigate(['/projectlist']);
              }
               else  {
                // Handle other roles or scenarios
              }
            } else {
              //console.error("Unexpected response:", response);
              // Handle unexpected response format
              this.snackBar.open("Unexpected response. Please try again later.", 'Close', {
                duration: 3000 // Duration in milliseconds
              });
              this.loginForm.reset();
            }
          },
          (error: any) => {
           // console.log(error);
            if (error.status === 404) {
              this.snackBar.open("User not found. Please register...", 'Close', {
                duration: 3000 // Duration in milliseconds
              });
              this.loginForm.reset();
            } else if (error.status === 401) {
              this.snackBar.open("Incorrect password...", 'Close', {
                duration: 3000 // Duration in milliseconds
              });
              this.loginForm.reset();
            } else {
              // Handle other errors
             // console.error("An unexpected error occurred:", error);
              this.snackBar.open("An unexpected error occurred. Please try again later.", 'Close', {
                duration: 3000 // Duration in milliseconds
              });
              this.loginForm.reset();
            }
          }
        );
      }
      }

    }


