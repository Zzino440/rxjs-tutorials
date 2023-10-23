import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import {HttpClientModule} from "@angular/common/http";
import {ReactiveFormsModule} from "@angular/forms";
import {RouterOutlet} from "@angular/router";
import { RxjsExampleOneComponent } from './components/rxjs-examples/rxjs-example-one/rxjs-example-one.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatExpansionModule} from "@angular/material/expansion";
import {RxjsExampleTwoComponent} from "./components/rxjs-examples/rxjs-example-two/rxjs-example-two.component";
import {MatIconModule} from "@angular/material/icon";
import {MatListModule} from "@angular/material/list";
import {NgOptimizedImage} from "@angular/common";
import {MatProgressBarModule} from "@angular/material/progress-bar";
import {MatButtonModule} from "@angular/material/button";
import { RxjsExampleThreeComponent } from './components/rxjs-examples/rxjs-example-three/rxjs-example-three.component';
import {MatCardModule} from "@angular/material/card";

@NgModule({
  declarations: [
    AppComponent,
    RxjsExampleOneComponent,
    RxjsExampleTwoComponent,
    RxjsExampleThreeComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule,
    RouterOutlet,
    BrowserAnimationsModule,
    MatExpansionModule,
    MatIconModule,
    MatListModule,
    NgOptimizedImage,
    MatProgressBarModule,
    MatButtonModule,
    MatCardModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
