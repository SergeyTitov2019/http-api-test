import { Component, OnInit } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { map } from "rxjs/operators";
import { PostModel } from "../../types/post.model";
import { ActivatedRoute, Router } from "@angular/router";
import {postUrl} from "../../data/data";

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})
export class PostsComponent implements OnInit {

  loadedPost: PostModel[] = []

  private basePostUrl: string = postUrl;

  constructor(private http: HttpClient,
              private route: ActivatedRoute,
              private router: Router
              ) { }

  ngOnInit(): void {
    this.onFetchPost()
  }

  private fetchData(){
    this.http
      .get<{[key: number]: PostModel}>(this.basePostUrl)
      .pipe(map(responseData => {
        const postArray = []
        for(let key in responseData){
          if(responseData.hasOwnProperty(key)){
            postArray.push({...responseData[key], id: key})
          }
        }
        return postArray
      }))
      .subscribe(post => {
        this.loadedPost = post
        console.log('post:', post);
      })

  }

  onCreatePost(postData: any) {
    this.http
      .post<{name:string}>(this.basePostUrl, postData)
      .subscribe(responseData => {
      console.log('responseData', responseData);
    })
  }

  onFetchPost(){
    this.fetchData()
  }

  onPagePost() {
    this.router.navigate(['posts'], { relativeTo: this.route })
  }
}
