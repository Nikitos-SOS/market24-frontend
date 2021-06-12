import { SellerService } from './../services/seller.service';
import { ChangePassword } from './../interfaces/changePassword';
import { Component, OnInit } from '@angular/core';
import { Seller } from '../interfaces/seller';
import { checkRole, getUsername } from '../functions/checkRole';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-seller-panel',
  templateUrl: './seller-panel.component.html',
  styleUrls: ['./seller-panel.component.css']
})
export class SellerPanelComponent implements OnInit {

  public seller!: Seller;
  public changePassword!: ChangePassword;
  constructor(
    private sellerService: SellerService,
  ) { }

  ngOnInit(): void {
    this.getSeller();
  }

  public getSeller(): void{
    this.sellerService.getSellerByUsername(getUsername()).subscribe(
      (response: Seller) => {
        this.seller = response;
        console.log(this.seller);
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public onUpdateSeller(seller: Seller): void{
    this.sellerService.editSeller(seller).subscribe(
      (response: Seller) => {
        console.log(response);
        this.getSeller();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    )
  }

  public getNewPassword(changePassword: ChangePassword): void{
    if(changePassword.newPassword === changePassword.reNewPassword){
      this.sellerService.changePassword(changePassword).subscribe(
        (response: void) => {
          alert(response);
        },
        (error: HttpErrorResponse) => {
          alert(error.message);
        }
      )
    }
    else{
      alert("Неправильно введен новый пароль")
    }
  }

  public roleSeller(){
    return checkRole() === "ROLE_SELLER";
  }

}
