import {Component, OnDestroy, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Post} from "../../../models/post";
import {
  BehaviorSubject,
  catchError,
  filter,
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

  //variabile per indicare caricamento nell'interfaccia (se presente)
  isLoading = false; // Imposta lo stato di loading

  // id del post come placeholder
  selectedPostId = 1;

  //variabile per contenere e mostrare l'elenco dei post
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

  //metodo rxjs con operatori switchMap, map e
  methodWithRxjsOperators() {
    this.isLoading = true; // Imposta lo stato di loading

    // creo una variabile che contenga la sottoscrizione in modo da poi poter fare l'unsubscribe
    this.subscription = this.postDetails$
      .pipe(
        tap(() => this.isLoading = true),
        filter(post => post.userId !== null),
        switchMap(post => {
          const userId = post.userId;
          return forkJoin({
            user: this.httpClient.get<User>(`${this.userUri}/${userId}`),
            comments: this.httpClient.get<Comments[]>(`${this.postsUri}/${post.id}/comments`),
          })
            .pipe(
              map(details => {
                return {
                  post,
                  user: details.user,
                  comments: details.comments
                }
              }),
              catchError(error => {
                console.error("Something went wrong: ", error);
                this.hasError$.next(true) // Imposta lo stato di errore a true
                return of(null); // Ritorna un Observable di null in caso di errore
              }),
              finalize(() => this.isLoading = false)  // Resetta lo stato di loading quando l'observable è completo
            )
        }),
        finalize(() => this.isLoading = false)  // Resetta lo stato di loading quando l'observable è completo
      )
      .subscribe(completeDetails => {
        if (completeDetails) {
          console.log('completeDetails: ', completeDetails)
          this.post = completeDetails.post;
          this.user = completeDetails.user;
          this.comments = completeDetails.comments
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

            // Effettua la seconda chiamata per ottenere i tweets
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

  ngOnDestroy() {
    this.subscription?.unsubscribe();
  }

}
