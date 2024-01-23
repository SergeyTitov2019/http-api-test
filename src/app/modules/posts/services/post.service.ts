import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {postUrl} from "../data/data";
import {PostModel} from "../types/post.model";
import {map} from "rxjs/operators";

@Injectable({providedIn: 'root'})
export class PostService {

  private url = postUrl

  constructor(private http: HttpClient) {
  }

  createAndStorePost(title: string, content: string) {
    const postData: PostModel = {title: title, content: content}
    this.http.post<{ name: string }>(this.url, postData)
      .subscribe(data => console.log(data))
  }

  fetchPosts(gettingPost: any): any {
    this.http
      .get<{ [key: number]: PostModel }>(this.url)
      .pipe(
        map(responseData => {
          const postArray = []
          for (let key in responseData) {
            if (responseData.hasOwnProperty(key)) {
              postArray.push({...responseData[key], id: key})
            }
          }
          return postArray
        })).subscribe(post => {
      gettingPost = post
      console.log('gettingPost:', gettingPost);
    })
  }

  deletePosts(): any {
    return this.http.delete(`${this.url}`)
  }
}
