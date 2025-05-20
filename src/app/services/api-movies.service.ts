import { Injectable, signal } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';

import { MovieInterface } from '../movie-interface';
import { ActorInterface } from '../actor-interface';

@Injectable({
  providedIn: 'root'
})
export class ApiMoviesService {
 private apiUrL=environment.apiUrl;
  private api_key=environment.api_key
  numPage=1
  constructor(private http:HttpClient) { }
movies=signal<MovieInterface[]>([])


//creo una variable para meter actores
cast=signal<ActorInterface[]>([])

public getData(): void {
  // if (this.movies().length > 0) return;

  this.http.get<{ results: MovieInterface[] }>(`${this.apiUrL}discover/movie?${this.api_key}&page=${this.numPage}`)
    .subscribe({
      next: response => {
      const currentMovies = this.movies();
        this.movies.set([...currentMovies, ...response.results]);
        console.log( this.numPage);
        
      },
      error: err => {
        console.error('Error fetching data:', err);
      }
    });
}
 
//he deañadir el id const
  public getId(id: string): MovieInterface | undefined {
    return this.movies().find(movie => movie.id === Number(id));
  }

  public getCast(movieId: string): void {
  this.http.get<{ cast: ActorInterface[] }>(
    `${this.apiUrL}movie/${movieId}/credits?${this.api_key}`
  ).subscribe({
    next: response => {
      this.cast.set(response.cast);
      console.log( response.cast);
    },
    error: err => {
      console.error('Error al obtener el reparto:', err);
    }
  });
}

actorMovies = signal<any[]>([])
public getMoviesByActorId(actorId:number):void{
this.http.get<{cast:any}>(`${this.apiUrL}person/${actorId}/movie_credits?${this.api_key}`).subscribe({
  next: (response:any)=>{
    this.actorMovies.set(response.cast)
    console.log(response.cast);
    
  },
  error:(error)=>{
    console.log(error);
    
  }
})
}
}
