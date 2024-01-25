import {Component, OnInit} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import {ActivatedRoute, Router} from "@angular/router";
import {postUrl} from "../../data/data";
import {PostModel} from "../../types/post.model";
import {map} from "rxjs/operators";
import {PostService} from "../../services/post.service";

@Component({
  selector: 'app-post-page',
  templateUrl: './post-page.component.html',
  styleUrls: ['./post-page.component.css']
})
export class PostPageComponent implements OnInit {

  private basePostUrl: string = postUrl;
  loadedPost: PostModel[] = []
  error = '15151515'

  constructor(private http: HttpClient,
              private route: ActivatedRoute,
              private router: Router,
              private postService: PostService
  ) {
  }

  ngOnInit(): void {
    this.fetchData()
    // this.postService.fetchPosts(this.loadedPost)

  }

  fetchData() {
    let searchParams = new HttpParams()
    searchParams = searchParams.append('print', 'pretty')
    searchParams = searchParams.append('custom', 'text')
    this.http
      .get<{ [key: number]: PostModel }>(this.basePostUrl,
        {
          headers: new HttpHeaders({'Custom-Headers': 'Hello'}),
          params: searchParams
        }
        )
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
      }, error1 => {
        this.error = error1.message
        console.log('error___', error1)
      })
  }

  onGetBack() {
    this.router.navigate([''])
  }
}
