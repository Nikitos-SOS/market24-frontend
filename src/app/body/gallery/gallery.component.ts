import { Router } from '@angular/router';
import { Product } from './../../interfaces/product';
import { ProductService } from './../../services/product.service';
import { Component, OnInit } from '@angular/core';
import { HttpErrorResponse, JsonpClientBackend } from '@angular/common/http';
import { NgForm } from '@angular/forms';
import { checkRole } from '../../functions/checkRole';
// import { Product } from './../../interfaces/product';

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.css']
})
export class GalleryComponent implements OnInit {
  public products: Product[] = [];
  public editProduct!: Product;
  public deleteProduct!: Product;
  role: string | null = "";
  // router: any;


  // public products!: Product[];
  // public editProduct: Product | undefined;
  // public deleteProduct: Product | undefined;
  // productService: any;
  constructor(
    private productService: ProductService,
    private router: Router
    ) { }

  ngOnInit() {
    this.getProducts();
    // this.role = localStorage.getItem('role')
  }

  // tslint:disable-next-line: typedef
  getRole(){
    return checkRole();
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

  public onAddProduct(addForm: NgForm):void{
    document.getElementById('add-product-form')?.click();
    this.productService.addProduct(addForm.value).subscribe(
      (response: Product) => {
        console.log(response);
        this.getProducts();
        addForm.reset();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
        addForm.reset();
      }
    );
  }

  public onUpdateProduct(product: Product): void {
    this.productService.updateProduct(product).subscribe(
      (response: Product) => {
        console.log(response);
        this.getProducts();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    )
  }

  public onDeleteProduct(productId: number): void {
    this.productService.deleteProduct(productId).subscribe(
      (response: void) => {
        console.log(response);
        this.getProducts();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    )
  }

  public searchProducts(key:any): void {
    console.log(key);
    let keyString = '';
    keyString +=key.target.value
    const results: Product[] = [];
    for (const product of this.products){
      if(product.name.toLowerCase().indexOf(keyString.toLowerCase()) !== -1){
        results.push(product)
      }
    }
    this.products = results;
    if(results.length ===0 || !keyString){
      this.getProducts();
    }
  }

  public editProductModal(product: Product):void{
    this.editProduct = product;
  }

  public deleteProductModal(product: Product): void{
    this.deleteProduct = product;
  }

  public productToString(product: Product){
    this.router.navigate(['product'],  { queryParams: {
      id:product?.id,
      name:product?.name,
      price: product?.price,
      count:product?.count,
      img:product?.imgUrl,
      description:product?.description
    } });
  }
}
