import {Component, OnInit, OnDestroy} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable, Subscription, forkJoin, of, BehaviorSubject, shareReplay} from 'rxjs';
import {tap, filter, switchMap, map, catchError, finalize} from 'rxjs/operators';
import {Post} from "../../../models/post";
import {User} from "../../../models/user";
import {Comments} from "../../../models/comments";
import {Album} from "../../../models/album";

@Component({
  selector: 'app-rxjs-example-two',
  templateUrl: './rxjs-example-two.component.html',
  styleUrls: ['./rxjs-example-two.component.css']
})
export class RxjsExampleTwoComponent implements OnInit, OnDestroy {

  // id del post come placeholder
  selectedPostId = 1;

  userUri: string = 'https://jsonplaceholder.typicode.com/users';
  postsUri: string = 'https://jsonplaceholder.typicode.com/posts';

  isLoading = false;
  hasError$ = new BehaviorSubject<boolean>(false);

  //observable iniziale per fare request del post
  postDetails$: Observable<Post> = this.httpClient.get<Post>(`${this.postsUri}/${this.selectedPostId}`);

  //variabile contenente l'observable condiviso
  sharedDetails$!: Observable<any>;

  //le due sottoscrizioni che confidividono
  subscription1!: Subscription;
  subscription2!: Subscription;

  //variabili per contenere e mostrare dati
  post: Post = new Post();
  user: User = new User();
  comments: Comments[] = [];
  albums: Album[] = [];

  constructor(private httpClient: HttpClient) {
  }

  ngOnInit() {
    this.initializeSharedDetails();
    this.fetchPostData()
  }


  initializeSharedDetails() {
    this.isLoading = true;
    this.sharedDetails$ = this.postDetails$
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
              map(details => ({
                post,
                user: details.user,
                comments: details.comments
              })),
              catchError(error => {
                console.error("Something went wrong: ", error);
                this.hasError$.next(true);
                return of(null);
              }),
              finalize(() => this.isLoading = false)
            );
        }),
        finalize(() => this.isLoading = false),
        shareReplay(1) // Condividi e memorizza l'ultimo valore emesso
      );
  }

  fetchPostData() {
    // Prima sottoscrizione
    this.subscription1 = this.sharedDetails$.subscribe(completeDetails => {
      if (completeDetails) {
        console.log('completeDetails: ', completeDetails);
        this.post = completeDetails.post;
        this.user = completeDetails.user;
        this.comments = completeDetails.comments;
      }
    });
  }

  onClickFetchAlbumData() {
    // Seconda sottoscrizione quando il bottone è cliccato
    this.subscription2 = this.sharedDetails$
      .pipe(
        filter(details => details !== null && details.user !== null),
        switchMap(details => {
          const userId = details.user.id;
          return this.httpClient.get<Album[]>(`${this.userUri}/${userId}/albums`);
        })
      )
      .subscribe(albums => {
        if (albums) {
          this.albums = albums;
          console.log('this.albums: ', this.albums)
        }
      });
  }

  ngOnDestroy() {
    // Fai pulizia delle sottoscrizioni
    if (this.subscription1) {
      this.subscription1.unsubscribe();
    }
    if (this.subscription2) {
      this.subscription2.unsubscribe();
    }
  }
}
