import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { SignupComponent } from './pages/signup/signup.component';
import { CreateProjectComponent } from './pages/create-project/create-project.component';
import { ProjectlistComponent } from './pages/projectlist/projectlist.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';


export const routes: Routes = [
    {path:'',component:LoginComponent},
    {path:'Login',component:LoginComponent},
    {path:'SignUp',component:SignupComponent},
    {path:'createProject',component:CreateProjectComponent},
    {path:'projectlist',component:ProjectlistComponent},
    {path:'dashboard',component:DashboardComponent}
];
