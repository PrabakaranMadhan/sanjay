import { Component } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
  totalExams: number = 100; 
  totalEmployees: number = 500; 
  completedExams: number = 75; 
  inProgressExams: number = 25; 
}
