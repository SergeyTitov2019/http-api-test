import {Component, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {ActivatedRoute, Router} from "@angular/router";
import {postUrl} from "../../data/data";
import {PostModel} from "../../types/post.model";
import {map} from "rxjs/operators";

@Component({
  selector: 'app-post-page',
  templateUrl: './post-page.component.html',
  styleUrls: ['./post-page.component.css']
})
export class PostPageComponent implements OnInit {

  private basePostUrl: string = postUrl;
  loadedPost: PostModel[] = []


  constructor(private http: HttpClient,
              private route: ActivatedRoute,
              private router: Router
  ) {
  }

  ngOnInit(): void {
this.fetchData()
  }

  fetchData(){
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
        console.log('this.loadedPost:', this.loadedPost);
      })

  }


  onGetBack() {
    this.router.navigate([''])

  }

}
