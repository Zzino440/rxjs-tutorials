import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppComponent} from './app.component';
import {HttpClientModule} from "@angular/common/http";
import {ReactiveFormsModule} from "@angular/forms";
import {RouterOutlet} from "@angular/router";
import {AppRoutingModule} from './app-routing.module';
import {RxjsExampleOneComponent} from './components/rxjs-examples/rxjs-example-one/rxjs-example-one.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatExpansionModule} from "@angular/material/expansion";
import {RxjsExampleTwoComponent} from "./components/rxjs-examples/rxjs-example-two/rxjs-example-two.component";
import {MatIconModule} from "@angular/material/icon";
import {MatListModule} from "@angular/material/list";
import {NgOptimizedImage} from "@angular/common";
import {MatProgressBarModule} from "@angular/material/progress-bar";
import {MatButtonModule} from "@angular/material/button";
import {RxjsExampleThreeComponent} from './components/rxjs-examples/rxjs-example-three/rxjs-example-three.component';
import {MatCardModule} from "@angular/material/card";
import {ToolbarComponent} from './components/toolbar/toolbar.component';
import {MatToolbarModule} from "@angular/material/toolbar";
import { RxjsExampleFourComponent } from './components/rxjs-examples/rxjs-example-four/rxjs-example-four.component';
import { RxjsExampleFiveComponent } from './components/rxjs-examples/rxjs-example-five/rxjs-example-five.component';

@NgModule({
  declarations: [
    AppComponent,
    ToolbarComponent,
    RxjsExampleOneComponent,
    RxjsExampleTwoComponent,
    RxjsExampleThreeComponent,
    RxjsExampleFourComponent,
    RxjsExampleFiveComponent,
  ],
  imports: [
    AppRoutingModule,
    RouterOutlet,
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatExpansionModule,
    MatIconModule,
    MatListModule,
    NgOptimizedImage,
    MatProgressBarModule,
    MatButtonModule,
    MatCardModule,
    MatToolbarModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
