import {Component, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {User} from "../../../models/user";
import {defer, map, Observable, switchMap, tap} from "rxjs";
import {Album} from "../../../models/album";
import {Task} from "../../../models/task";
import {filter} from "rxjs/operators";

@Component({
  selector: 'app-rxjs-example-five',
  templateUrl: './rxjs-example-five.component.html',
  styleUrls: ['./rxjs-example-five.component.css']
})
export class RxjsExampleFiveComponent implements OnInit {

  selectedId: number = 1;

  userUri: string = 'https://jsonplaceholder.typicode.com/users';
  userObs$: Observable<User> = this.httpClient.get<User>(`${this.userUri}/${this.selectedId}`);
  user!: User;

  arrayToShow!: Album[] | Task[];


  constructor(private httpClient: HttpClient) {
  }

  ngOnInit(): void {
    this.getUser();
  }


  getUser() {
    this.userObs$
      .pipe(
        switchMap(user => {
          const request$ = defer(() => {
            return user.id === 1
              ? this.httpClient.get<Album[]>(`${this.userUri}/${user.id}/albums`)
              : this.httpClient.get<Task[]>(`${this.userUri}/${user.id}/todos`);
          });
          return request$.pipe(
            map(list => ({
              user,
              list: list
            }))
          );
        }),
      )
      .subscribe(res => {
        console.log('res: ', res)
        this.user = res.user;
        this.arrayToShow = res.list;
      });
  }


}
