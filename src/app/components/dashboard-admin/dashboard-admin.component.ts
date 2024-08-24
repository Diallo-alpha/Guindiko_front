import { Component, OnInit } from '@angular/core';
import { AdminstrateurService } from '../../adminstrateur.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard-admin.component.html',
  styleUrls: ['./dashboard-admin.component.css']
})
export class DashboardAdminComponent implements OnInit {
  requests: any[] = [];

  constructor(private adminService: AdminstrateurService) {}

  ngOnInit() {
    this.fetchMentorRequests();
  }

  fetchMentorRequests() {
    this.adminService.getMentorRequests().subscribe(
      (data: any[]) => {
        this.requests = data;
      },
      (error) => {
        console.error('Error fetching mentor requests:', error);
      }
    );
  }

  viewDetails(request: any) {
    // Logic for viewing details
  }

  editRequest(request: any) {
    // Logic for editing the request
  }

  deleteRequest(request: any) {
    // Logic for deleting the request
  }
}
