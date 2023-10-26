import {NgModule} from '@angular/core';
import {RouterModule, Routes} from "@angular/router";
import {RxjsExampleOneComponent} from "./components/rxjs-examples/rxjs-example-one/rxjs-example-one.component";
import {RxjsExampleTwoComponent} from "./components/rxjs-examples/rxjs-example-two/rxjs-example-two.component";
import {RxjsExampleThreeComponent} from "./components/rxjs-examples/rxjs-example-three/rxjs-example-three.component";
import {RxjsExampleFourComponent} from "./components/rxjs-examples/rxjs-example-four/rxjs-example-four.component";


const routes: Routes = [
  {path: '', redirectTo: 'app', pathMatch: 'full'},
  {path: 'rxjs-examples/rxjs-example-one', component:RxjsExampleOneComponent},
  {path: 'rxjs-examples/rxjs-example-two', component:RxjsExampleTwoComponent},
  {path: 'rxjs-examples/rxjs-example-three', component:RxjsExampleThreeComponent},
  {path: 'rxjs-examples/rxjs-example-four', component:RxjsExampleFourComponent},
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
