import { Component } from '@angular/core'
import { SidebarComponent } from '../sidebar/sidebar.component'

@Component({
  selector: 'app-session',
  standalone: true,
  imports: [SidebarComponent],
  templateUrl: './session.component.html',
  styleUrls: ['./session.component.css']
})
export class SessionComponent {
  // Define an array of sessions
  sessions = [
    {
      theme: 'What is Lorem Ipsum',
      category: 'Informatique',
      resourcesLink: '#',
      date: '10/01/2024',
      duration: '3h'
    },
    {
      theme: 'What is Lorem Ipsum',
      category: 'Informatique',
      resourcesLink: '#',
      date: '10/01/2024',
      duration: '3h'
    }
    // Add more sessions as needed
  ]
}
