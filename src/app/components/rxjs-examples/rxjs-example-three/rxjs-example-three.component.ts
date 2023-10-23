import {Component, OnInit} from '@angular/core';
import {Observable, Subscription, switchMap} from "rxjs";
import {Post} from "../../../models/post";
import {HttpClient} from "@angular/common/http";
import {share, tap} from "rxjs/operators";
import {User} from "../../../models/user";
import {Album} from "../../../models/album";

@Component({
  selector: 'app-rxjs-example-three',
  templateUrl: './rxjs-example-three.component.html',
  styleUrls: ['./rxjs-example-three.component.css']
})
/**Componente in cui viene mostrato l'utilizzo dell'operatore "share".
 * Molto utile quando più sottoscrizioni devono
 * **/
export class RxjsExampleThreeComponent implements OnInit {

  // id dello user come placeholder
  selectedUserId = 1;

  userUri: string = 'https://jsonplaceholder.typicode.com/users';

  userDetails$: Observable<User> = this.httpClient.get<Post>(`${this.userUri}/${this.selectedUserId}`);

  sharedDetails$!: Observable<any>;
  subscription1!: Subscription;
  subscription2!: Subscription;

  albums: Album[] = []

  constructor(private httpClient: HttpClient) {
  }

  ngOnInit(): void {
    this.init();
    this.firstMethod()
    this.secondMethod()
  }


  init() {
    // Observable condiviso
    this.sharedDetails$ = this.userDetails$.pipe(
      tap(() => console.log('Start loading post details')), // console log per debug
      share() // Condivisione della sottoscrizione tra più osservatori
    );

  }


// Primo metodo
  firstMethod() {
    // Sottoscrizione al userDetails$ condiviso
    this.subscription1 = this.sharedDetails$
      .subscribe(completeDetails => {
        console.log('completeDetails: ', completeDetails)
        console.log('First method completed'); // console log per debug
      });
  }

// Secondo metodo, chiamato dopo il primo che utilizza i dati condivisi
  secondMethod() {
    // Sottoscrizione al userDetails$ condiviso
    this.subscription2 = this.sharedDetails$
      .pipe(
        tap(data => console.log('Second method, using shared data:', data)), // console log per debug
        switchMap(userData => {
          let userID = userData.id
          return this.httpClient.get<Album[]>(`${this.userUri}/${userID}/albums`);
        })
      )
      .subscribe(albums => {
        console.log('albums: ', albums)
        this.albums = albums
      });
  }
}
