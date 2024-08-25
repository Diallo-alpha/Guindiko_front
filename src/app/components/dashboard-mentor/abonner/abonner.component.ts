// import { Component } from '@angular/core';
// import { SidebarComponent } from '../sidebar/sidebar.component';

@Component({
  selector: 'app-abonner',
  standalone: true,
  imports: [SidebarComponent],
  templateUrl: './abonner.component.html',
  styleUrl: './abonner.component.css'
})
export class abonnerComponent {

}
import { Component } from '@angular/core'
import { SidebarComponent } from '../sidebar/sidebar.component'
import './abonner.component.css';
import '../sidebar/sidebar.component.css';

@Component({
  selector: 'app-abonner',
  standalone: true,
  imports: [SidebarComponent],
  templateUrl: './abonner.component.html',
  styleUrls: ['./abonner.component.css']
})
export class AbonnerComponent {
  subscribers = [
    {
      name: 'Modou Faye',
      email: 'ndiayeamina775@gmail.com',
      profileImage:
        'https://replicate.delivery/yhqm/1ajKcsD4NmoNPlDCMCLYPTt4wjzTSrDl8jiyp3Wp0qTcdB1E/out-0.png'
    }


  ]
}
