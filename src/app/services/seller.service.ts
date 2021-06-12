import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Seller } from '../interfaces/seller';

@Injectable({
  providedIn: 'root'
})
export class SellerService {

  private apiServerUrl = 'http://localhost:8080/seller';

  private sellers: Seller[] = [];

  constructor(
    private http: HttpClient
  ) { }

  public getSellers(): Observable<Seller[]>{
    return this.http.get<any>(`${this.apiServerUrl}/all`);
  }

  public editSeller(seller: Seller): Observable<Seller>{
    return this.http.put<Seller>(`${this.apiServerUrl}/update`, seller);
  }

  public deleteSeller(sellerId: number): Observable<void>{
    return this.http.delete<void>(`${this.apiServerUrl}/delete/${sellerId}`);
  }
}
