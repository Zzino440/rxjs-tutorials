import {Component, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Post} from "./models/post";
import {
  debounceTime,
  forkJoin,
  map,
  switchMap,
  take,
} from "rxjs";
import {FormControl} from "@angular/forms";
import {User} from "./models/user";
import {MatExpansionModule} from '@angular/material/expansion';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  searchField = new FormControl();
  users!: User[];
  postsUri: string = 'https://jsonplaceholder.typicode.com/posts';

  usersUri: string = 'https://jsonplaceholder.typicode.com/users';

  data!: Comment[];
  title!: string;
  constructor(private httpClient: HttpClient) {

  }

  ngOnInit(): void {
    /*    this.fetchFivePosts();*/
    /*    this.searchDebounceTime();*/
    /*    this.combineHttpCalls()*/
    /*    this.fetchUserDetails();*/
/*    this.switchMapFunction();*/

  }

  /**Esempio Fabio Biondi 1**/

  switchMapFunction() {
    this.httpClient.get<Array<Post>>('https://jsonplaceholder.typicode.com/posts/')
      .pipe(
        switchMap(posts => this.httpClient.get<Array<Comment>>('https://jsonplaceholder.typicode.com/comments/?postId=' + posts[1].id))
      )
      .subscribe(
        res => {
          console.log(res)
          this.data = res;
        }
      )
  }


  /**Esercizio 1: Fetch di dati da una REST API**/
  fetchFivePosts() {
    this.httpClient.get<Post[]>(this.postsUri).pipe(
      map(posts => posts.slice(0, 5)),
      take(1)
    ).subscribe(res => {
      console.log('res: ', res)
    })
  }

  /** Esercizio 2: Ricerca con Debounce Time **/
  searchDebounceTime() {
    this.searchField.valueChanges
      .pipe(
        debounceTime(300),
        switchMap(query => this.httpClient.get(`https://jsonplaceholder.typicode.com/posts?title_like=${query}`))
      )
      .subscribe(results => {
        console.log(results);
      });
  }

  /**Esercizio 3: Combinare più chiamate HTTP**/
  combineHttpCalls() {
    const post$ = this.httpClient.get('https://jsonplaceholder.typicode.com/posts/1');
    const comments$ = this.httpClient.get('https://jsonplaceholder.typicode.com/posts/1/comments');

    forkJoin([post$, comments$]).subscribe(([post, comments]) => {
      console.log('posts:', post);
      console.log('comments', comments)
    })
  }

  /**Esercizio 4: Fetch Incatenato con Dettagli Utente**/
  fetchUserDetails() {
    this.httpClient.get<Post[]>(this.postsUri).pipe(
      map(post => post.slice(0, 3)),
      take(1)
    ).subscribe(res => {
      console.log(res);
      const uniqueUserIds = [...new Set(res.map(post => post.userId))];
      const userObservables = uniqueUserIds.map(usersId => this.httpClient.get(`${this.usersUri}/${usersId}`));
      forkJoin(userObservables).subscribe((userResults: any) => {
        console.log('All user results:', userResults);
        this.users = userResults;
      })
    })
  }

  /**Esercizio 5: Fetch Condizionale di Dettagli di Post e Utenti**/
  fetchCommentsByPostId() {

  }

}
