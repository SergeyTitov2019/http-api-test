import { Component, OnInit } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { map } from "rxjs/operators";
import { PostModel } from "../../types/post.model";
import { ActivatedRoute, Router } from "@angular/router";
import {postUrl} from "../../data/data";
import {PostService} from "../../services/post.service";

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})
export class PostsComponent implements OnInit {

  loadedPost: PostModel[] = []
  isFetching = false

  private basePostUrl: string = postUrl;

  constructor(private http: HttpClient,
              private route: ActivatedRoute,
              private router: Router,
              private postService: PostService
              ) { }

  ngOnInit() {
    // this.fetchPosts()
    this.isFetching = true
    this.postService.fetchPosts(this.loadedPost).subscribe((post:any) => {
      this.loadedPost = post
      this.isFetching = false
      console.log('post:', post);
    })
  }

  // private fetchPosts(){
  //   this.http
  //     .get<{[key: number]: PostModel}>(this.basePostUrl)
  //     .pipe(map(responseData => {
  //       const postArray = []
  //       for(let key in responseData){
  //         if(responseData.hasOwnProperty(key)){
  //           postArray.push({...responseData[key], id: key})
  //         }
  //       }
  //       return postArray
  //     }))
  //     .subscribe(post => {
  //       this.loadedPost = post
  //       console.log('post:', post);
  //     })
  //
  // }

  onCreatePost(postData: PostModel) {
    this.postService.createAndStorePost(postData.title, postData.content)
  }

  onFetchPost(){
    // this.http.get(this.basePostUrl).subscribe(post => {
    //   console.log('post:', post);
    // })
    this.postService.fetchPosts(this.loadedPost)
  }

  onPagePost() {
    this.router.navigate(['posts'], { relativeTo: this.route })
  }

  onClearPosts():any{
    this.postService.deletePosts().subscribe(() => {
      this.loadedPost = []
    })
  }
}
