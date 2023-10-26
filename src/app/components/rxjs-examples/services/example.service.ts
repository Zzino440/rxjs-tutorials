import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Post} from "../../../models/post";
import {catchError, Observable, shareReplay, Subscription, switchMap, take, tap, toArray} from "rxjs";
import {filter, share} from "rxjs/operators";
import {logMessages} from "@angular-devkit/build-angular/src/builders/browser-esbuild/esbuild";
import {User} from "../../../models/user";
import {Comments} from "../../../models/comments";

@Injectable({
  providedIn: 'root'
})
export class ExampleService {

  //uris
  private userUri: string = 'https://jsonplaceholder.typicode.com/users';
  private postsUri: string = 'https://jsonplaceholder.typicode.com/posts';


  //Observables
  posts$: Observable<Post[]> = this.httpClient.get<Post[]>(this.postsUri);


  constructor(private httpClient: HttpClient) {

  }

  fetchPosts(): Observable<Post[]> {
    return this.posts$.pipe(
      switchMap(posts => posts),
      filter(post => post.userId == 1),
      toArray(),
      shareReplay(1)
    );
  }

  fetchUser(userId: number): Observable<User> {
    return this.httpClient.get<User>(`${this.userUri}/${userId}`);
  }

  fetchComments(postId: number): Observable<Comments[]> {
    return this.httpClient.get<Comments[]>(`${this.postsUri}/${postId}/comments`);
  }


}
