import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Subscription } from 'rxjs';
import { ProductsService } from '../products.service';

@Component({
  selector: 'app-listproducts',
  templateUrl: './listproducts.component.html',
  styleUrls: ['./listproducts.component.css']
})
export class ListproductsComponent implements OnInit, OnDestroy {

  productsLists : any[] = [];

  isLoading = true;

  myParamSubscription : Subscription;

  constructor(public pdtSer : ProductsService, public activeRoute : ActivatedRoute) { }

  ngOnInit(): void {

    console.log("List products Instance created");

  this.myParamSubscription =  this.activeRoute.params.subscribe((param:Params)=>{
      console.log(param);

      if(param.catid)
      {
        this.isLoading = true;

        this.pdtSer.getProductsByCatwise(param.catid).subscribe((data:any[])=>{

          console.log(data);

          this.isLoading = false;
    
          this.productsLists = data;
    
        }, (error:any)=>{
    
          console.log(error);
    
        }, ()=>{
    
          console.log("HTTP Call Completed");
    
        });
      }
      else {
        this.pdtSer.getProductsList().subscribe((data:any[])=>{

          console.log(data);

          this.isLoading = false;
    
          this.productsLists = data;
    
        }, (error:any)=>{
    
          console.log(error);
    
        }, ()=>{
    
          console.log("HTTP Call Completed");
    
        });
      }
    }, (error:any)=>{

      console.log(error);

    }, ()=>{

      console.log("Params Subscription Completed");
    });

    

  }

  addToCart(cartPdtId:number, cartPdtPrice:number)
  {
    //this.pdtSer.updatecart.next("event emitted");

    this.pdtSer.addToMyCart(cartPdtId, cartPdtPrice).subscribe((data:string)=>{

      console.log(data);

      this.pdtSer.updatecart.next("event emitted");

    }, (error:any)=>{

      console.log(error);

    })
  }

  ngOnDestroy()
  {
    this.myParamSubscription.unsubscribe();
  }

}
