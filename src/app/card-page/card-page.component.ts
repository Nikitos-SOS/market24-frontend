import { NgForm } from '@angular/forms';
import { Product } from './../interfaces/product';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { CommentService } from '../services/comment.service';
import { ProductComment } from './../interfaces/comment'


@Component({
  selector: 'app-card-page',
  templateUrl: './card-page.component.html',
  styleUrls: ['./card-page.component.css']
})
export class CardPageComponent implements OnInit {
  id!: string;
  name!:string
  price!:string
  count!:string
  img!:string
  description!: string

  comments: ProductComment[] = [];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private commentService: CommentService,
  ) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      // this.param1 = params['id'];
      // this.product.name = params['name'];
      this.id = params['id']
      this.name = params['name']
      this.price = params['price']
      this.count = params['count']
      this.img = params['img']
      this.description = params['description']

      this.getComments();
  });

  }

  getComments(){
    // let productId = this.id
    this.commentService.getCommments(Number(this.id)).subscribe(
      (response: ProductComment[]) => {
        this.comments = response;
        console.log(this.comments);
      }
    )
  }

  public onAddComment(addForm:NgForm){
    console.log(addForm.value)
  }

  public getUserId(){

    return localStorage.getItem('userId')
  }

}
