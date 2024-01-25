import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ListComponent } from './modules/products/components/list/list.component';
import { AddComponent } from './modules/products/components/add/add.component';
import { EditComponent } from './modules/products/components/edit/edit.component';
import {SelectComponent} from "./modules/products/components/select/select.component";
import {TestComponent} from "./modules/products/components/test/test.component";
import { PostsComponent } from './modules/posts/components/posts/posts.component';
import { PostPageComponent } from './modules/posts/components/post-page/post-page.component';
import {AuthInterceptorService} from "./modules/posts/services/auth-interceptor.service";
import {LoggingInterceptor} from "./modules/posts/services/logging.interceptor";

@NgModule({
  declarations: [
    AppComponent,
    ListComponent,
    AddComponent,
    EditComponent,
    SelectComponent,
    TestComponent,
    PostsComponent,
    PostPageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptorService,
    multi: true
  },{
    provide: HTTP_INTERCEPTORS,
    useClass: LoggingInterceptor,
    multi: true
  }],
  bootstrap: [AppComponent]
})

export class AppModule { }
