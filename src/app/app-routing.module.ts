import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ListComponent} from "./modules/products/components/list/list.component";
import {TestComponent} from "./modules/products/components/test/test.component";
import {PostsComponent} from "./modules/posts/components/posts/posts.component";
import {PostPageComponent} from "./modules/posts/components/post-page/post-page.component";

const routes: Routes = [
  { path: '', component: PostsComponent },
  { path: 'posts', component: PostPageComponent },
  { path: 'add', component: TestComponent },
  { path: 'list', component: ListComponent },
  { path: 'edit/:id', component: TestComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
