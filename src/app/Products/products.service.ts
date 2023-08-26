import { HttpClient, HttpHeaders } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

 // updatecart = new EventEmitter();

    updatecart = new Subject();

   // updatecart = new BehaviorSubject("initial value");

  constructor(public http : HttpClient) { }

  getCategories()
  {
    return this.http.get<any[]>("http://localhost:3000/getcategories");
  }

  getProductsByCatwise(catid:string)
  {
  return  this.http.get<any[]>("http://localhost:3000/getpdtcatwise/"+catid);
  }

  getProductsList()
  {
  return  this.http.get<any[]>("http://localhost:3000/listproducts");
  }

  getMyCartCartItems()
  {
    return this.http.get<any[]>("http://localhost:3000/mycart"/*, {
      headers : new HttpHeaders({
        'myauthtoken' : "fdghfghfghgfhgfhfg"
      })
    }*/);
  }

  addProducts(data:any)
  {
    return this.http.post<string>("http://localhost:3000/addproducts", data);
  }

  addToMyCart(cartPdtId:number, cartPdtPrice:number)
  {
    return this.http.post<string>("http://localhost:3000/addtocart", {cartPdtId:cartPdtId, cartPdtPrice:cartPdtPrice});
  }

  getMyCartCount()
  {
    return this.http.get<number>("http://localhost:3000/cartcount");
  }

  updateMyCartItems(cartdId:number, cartQty:number, pdtPrice:number)
  {
    return this.http.put<string>("http://localhost:3000/updatecart", {cartdId:cartdId, cartQty:cartQty, pdtPrice:pdtPrice});
  }

  removeMyCartItem(cartId:number)
  {
    return this.http.delete<string>("http://localhost:3000/removecart/"+cartId);
  }
}
