import { Component, effect } from '@angular/core';
import { ApiMoviesService } from '../../services/api-movies.service';
import { MovieInterface } from '../../movie-interface';
import { ActivatedRoute } from '@angular/router';
import { ActorInterface } from '../../actor-interface';

@Component({
  selector: 'app-movie-detail',
  standalone: true,
  templateUrl: './movie-detail.component.html',
  styleUrl: './movie-detail.component.css',
})
export class MovieDetailComponent {
  movie: MovieInterface | undefined;
  id: string | null = null;

  constructor(
    private apiMovieService: ApiMoviesService,
    private route: ActivatedRoute
  ) {
    this.id = this.route.snapshot.paramMap.get('id');

    if (this.apiMovieService.movies().length === 0) {
      this.apiMovieService.getData();
    }

    effect(() => {
      if (this.id !== null) {
        this.movie = this.apiMovieService.getId(this.id);
        //he de crear un modelo de actores
        // this.apiMovieService.getCast(this.id)

        this.apiMovieService.getCast(this.id);
      }
    });
  }
  get cast(): ActorInterface[] {
    return this.apiMovieService.cast();
  }

  showActorMovies(actorId: number): void {
    this.apiMovieService.getMoviesByActorId(actorId);
  }

  hoveredActorId: number | null = null;

  get actorMovies() {
    return this.apiMovieService.actorMovies();
  }

  onHover(actorId: number) {
    this.hoveredActorId = actorId;
    this.apiMovieService.getMoviesByActorId(actorId);
  }

  onLeave() {
    this.hoveredActorId = null;
  }
}
