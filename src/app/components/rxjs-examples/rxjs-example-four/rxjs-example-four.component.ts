import {Component, OnInit} from '@angular/core';
import {ExampleService} from "../services/example.service";
import {
  Observable,
  Subscription,
  switchMap,
  take,
} from "rxjs";
import {Post} from "../../../models/post";
import {User} from "../../../models/user";
import {share} from "rxjs/operators";

@Component({
  selector: 'app-rxjs-example-four',
  templateUrl: './rxjs-example-four.component.html',
  styleUrls: ['./rxjs-example-four.component.scss']
})
export class RxjsExampleFourComponent implements OnInit {

  isLoading: boolean = false;

  sharedObs$!: Observable<Post[]>;


  postSubscription!: Subscription;
  userSubscription!: Subscription;

  posts!: Post[];
  user!: User;

  constructor(private exampleService: ExampleService) {
  }

  ngOnInit(): void {
    this.shareFetch()
    this.fetchPosts();
    this.fetchUser();
  }

  shareFetch() {
    this.sharedObs$ = this.exampleService.fetchPosts().pipe(
      share(),
    )
  }

  fetchPosts() {
    this.postSubscription = this.sharedObs$
      .subscribe(res => {
        this.posts = res;
        console.log(res)
      })
  }

  fetchUser() {
    this.userSubscription = this.sharedObs$.pipe(
      switchMap(posts => posts),
      take(1),
      switchMap(post => {
        return this.exampleService.fetchUser(post.userId)
      }),
    ).subscribe(user => {
      this.user = user;
      console.log(user)
    });
  }
}
