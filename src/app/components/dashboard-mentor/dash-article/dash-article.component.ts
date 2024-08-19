import { Component } from '@angular/core';
import { SidebarComponent } from '../sidebar/sidebar.component';

@Component({
  selector: 'app-dash-article',
  standalone: true,
  imports: [SidebarComponent],
  templateUrl: './dash-article.component.html',
  styleUrl: './dash-article.component.css'
})
export class DashArticleComponent {

}
