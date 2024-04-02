import { Component } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { SignupComponent } from './pages/signup/signup.component';
import { LoginComponent } from './pages/login/login.component';
import { CreateProjectComponent } from './pages/create-project/create-project.component';
import { ProjectlistComponent } from './pages/projectlist/projectlist.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,LoginComponent,RouterModule,SignupComponent,CreateProjectComponent,ProjectlistComponent,DashboardComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'techprimelab';
}
