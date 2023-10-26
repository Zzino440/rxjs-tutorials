import {Component, OnDestroy, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Post} from "../../../models/post";
import {
  BehaviorSubject,
  catchError,
  finalize,
  forkJoin,
  map,
  Observable,
  of,
  Subscription,
  switchMap,
  tap
} from "rxjs";
import {User} from "../../../models/user";
import {Comments} from "../../../models/comments";
import {filter} from "rxjs/operators";

@Component({
  selector: 'app-rxjs-example-one',
  templateUrl: './rxjs-example-one.component.html',
  styleUrls: ['./rxjs-example-one.component.css']
})
export class RxjsExampleOneComponent implements OnInit, OnDestroy {
  //variabile che contiene la sottoscrizione all'observable
  private subscription!: Subscription;

  //behavior subject per gestire gli errori in maniera reactive -
  // alternativa più semplice potrebbe essere una variabile booleana
  hasError$ = new BehaviorSubject<boolean>(false);

  //uris
  userUri: string = 'https://jsonplaceholder.typicode.com/users';
  postsUri: string = 'https://jsonplaceholder.typicode.com/posts';

  isLoading = false;

  selectedPostId = 1;

  postDetails$: Observable<Post> = this.httpClient.get<Post>(`${this.postsUri}/${this.selectedPostId}`);

  post: Post = new Post();
  user: User = new User();
  comments: Comments[] = [];

  constructor(private httpClient: HttpClient) {

  }

  ngOnInit(): void {
    this.methodWithRxjsOperators();
    /*    this.methodWithPromises();*/
  }

  //metodo rxjs con operatori switchMap, map e forkJoin
  methodWithRxjsOperators() {
    this.isLoading = true;

    this.subscription = this.postDetails$
      .pipe(
        switchMap(post => {
          return forkJoin({
            user: this.httpClient.get<User>(`${this.userUri}/${post.userId}`),
            comments: this.httpClient.get<Comments[]>(`${this.postsUri}/${post.id}/comments`)
          })
            .pipe(
              map(details => {
                return {post, user: details.user, comments: details.comments,}
              }),
              catchError(error => {
                this.hasError$.next(true)
                return of(null);
              }),
              finalize(() => this.isLoading = false)
            )
        }),
        finalize(() => this.isLoading = false)
      )
      .subscribe(completeDetails => {
        if (completeDetails) {
          this.post = completeDetails.post;
          this.user = completeDetails.user;
          this.comments = completeDetails.comments;
        }
      });
  }


  //Senza Operatori RxJS
  // Senza l'uso degli operatori, il codice potrebbe essere implementato utilizzando le Promesse e i metodi .then() e .catch():
  //ci saranno errori perchè le promise hanno bisogno di più accortezze
  /*  methodWithPromises() {
      this.isLoading = true; // Imposta lo stato di loading

      this.postDetails$.subscribe(post => {
        const userId = post.userId;

        // Effettua la prima chiamata per ottenere l'utente
        this.httpClient.get<User>(`${this.userUri}/${userId}`).toPromise()
          .then(async user => {

            // Effettua la seconda chiamata per ottenere i commenti
            const comments = await this.httpClient.get<Comments[]>(`${this.postsUri}/${this.selectedPostId}/comments`).toPromise();
            return {
              post,
              user,
              comments
            };
          })
          .catch(error => {
            console.error("Something went wrong: ", error);
          })
          .finally(() => {
            this.isLoading = false; // Resetta lo stato di loading
          })
          .then(completeDetails => {
            if (completeDetails) {

              console.log('Post res', completeDetails);
              this.post = completeDetails.post;
              this.user = completeDetails.user;
              this.comments = completeDetails.comments;
            }
          });
      });
    }*/

  //faccio l'unsubscribe alla distruzione del componente
  //questa operazione viene effettuata automaticamente nel caso in cui io utilizzi la pipe | async
  ngOnDestroy() {
    this.subscription?.unsubscribe();
  }

}
