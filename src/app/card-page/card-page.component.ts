import { HttpErrorResponse } from '@angular/common/http';
import { ProductService } from 'src/app/services/product.service';
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
  product!: Product;

  comments: ProductComment[] = [];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private commentService: CommentService,
    private productService: ProductService,
  ) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      // this.param1 = params['id'];
      // this.product.name = params['name'];
      // this.id = params['id']
      this.getProduct(params['id']);
      this.getComments();
  });

  }

  getProduct(id: number){
    // this.product = this.productService.getProductById(this.id);

    this.productService.getProductById(id).subscribe(
      (response: Product) => {
        this.product = response;
        console.log(this.product);
      },
      (error: HttpErrorResponse) => {
        alert(error);
      }
    );

  }

  getComments(){
    // let productId = this.id
    this.commentService.getCommments(Number(this.product.id)).subscribe(
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
