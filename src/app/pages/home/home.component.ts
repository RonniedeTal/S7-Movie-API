import { Component } from '@angular/core';

import { ShowMoviesComponent } from '../../components/show-movies/show-movies.component';

@Component({
  selector: 'app-home',
  imports: [ShowMoviesComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

}
