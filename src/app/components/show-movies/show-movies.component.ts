import { Component, computed, OnInit } from '@angular/core';
import { ApiMoviesService } from '../../services/api-movies.service';
import { RouterLink} from '@angular/router';
import { InfiniteScrollDirective } from 'ngx-infinite-scroll';



@Component({
  selector: 'app-show-movies',
  standalone:true,
  imports: [RouterLink, InfiniteScrollDirective],
  templateUrl: './show-movies.component.html',
  styleUrl: './show-movies.component.css'
})
export class ShowMoviesComponent implements OnInit {
  
 data = computed(() => this.apiMoviesService.movies());
imageBaseUrl: string = 'https://image.tmdb.org/t/p/w500'
constructor(private apiMoviesService:ApiMoviesService){
  // this.apiMoviesService.getMoviesByActorId()
}
ngOnInit(): void {
  // this.dataMovies()
  this.apiMoviesService.getData()
}
// dataMovies():void{
//   this.apiMoviesService.getData().subscribe({
//     next: (response:any)=>{
//       this.data=response.results
//       console.log(this.data);
     
      
      
//     },
//     error:(error)=>{
//       console.log(error);
      
//     }
//   })
// }
  onScrollDown() {
    console.log('scrolled down!!');
  }

  onScrollUp() {
    console.log('scrolled up!!');
  }
}
