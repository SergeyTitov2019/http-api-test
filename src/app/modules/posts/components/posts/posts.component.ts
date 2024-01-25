import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import { map, tap } from "rxjs/operators";
import { PostModel } from "../../types/post.model";
import { ActivatedRoute, Router } from "@angular/router";
import { postUrl } from "../../data/data";
import { PostService } from "../../services/post.service";

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})
export class PostsComponent implements OnInit {

  loadedPost: PostModel[] = []
  private url = postUrl
  private basePostUrl: string = postUrl;

  isFetching = false
  error: any


  constructor(private http: HttpClient,
              private route: ActivatedRoute,
              private router: Router,
              private postService: PostService
  ) {
  }

  ngOnInit() {
    // this.onFetchPost()
    this.fetchPosts()
    this.isFetching = true
    // this.postService.fetchPosts(this.loadedPost).subscribe((post:any) => {
    //   this.loadedPost = post
    //   this.isFetching = false
    //   console.log('post:', post);
    // })
  }

  private fetchPosts() {
    this.http
      .get<{ [key: number]: PostModel }>(this.basePostUrl)
      .pipe(map(responseData => {
        const postArray = []
        for (let key in responseData) {
          if (responseData.hasOwnProperty(key)) {
            postArray.push({...responseData[key], id: key})
          }
        }
        return postArray
      }))
      .subscribe(post => {
        this.loadedPost = post
        console.log('posts with new ID:', post);
      })

  }

  onCreatePost2(postData: PostModel) {
    this.postService.createAndStorePost(postData.title, postData.content)
  }

  onCreatePost(data: any) {
    const postData: PostModel = {title: data.title, content: data.content}
    this.http.post<{ name: string }>(this.url, postData, {
      observe: 'response'
    })
      .subscribe(
        responseData => console.log('responseData:', responseData),
        error => this.error.next(error.message)
        )
  }


  onFetchPost() {
    this.http.get(this.basePostUrl).subscribe(post => {
      console.log('post:', post);
    })
    // this.postService.fetchPosts(this.loadedPost)
  }

  onPagePost() {
    this.router.navigate(['posts'], {relativeTo: this.route})
  }

  onClearPosts(): any {
    this.postService.deletePosts().subscribe(() => {
      this.loadedPost = []
    },
      (error:any) => this.error.next(error.message)
    )
  }

  deletePost(){
    return this.http
      .delete(this.url, {
        observe: "events"
      })
      .pipe(
        tap(event => {
          console.log(event)
          }
        )
      )
  }
}
