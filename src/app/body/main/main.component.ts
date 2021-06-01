import { ProductService } from './../../services/product.service';
import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/interfaces/product';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {
  products: Product[] = [];

  constructor(private productService:ProductService) { }

  ngOnInit(): void {
    this.getProducts()

  }

  public getProducts():void{
    this.productService.getProducts().subscribe(
      (response: Product[])=>{
        this.products = response;
        console.log(this.products);
      },
      (error: HttpErrorResponse)=>{
        alert(error.message)
      }
    )
  }

}
