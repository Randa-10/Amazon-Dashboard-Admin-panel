import { OrderServService } from 'src/app/services/order-serv.service';
import { Component, Output, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.scss']
})
export class ClientsComponent implements OnDestroy {
  // dataLoaded = false;
  data: any = [];
  DataLength:number=0;
  isLoading = true;

  constructor(private orderSrv:OrderServService) {
    this.getClients()  
    setTimeout(() => {
      // this.dataLoaded = true;
    }, 1000);
  }
  getClients(): any {
    this.orderSrv.getClients().subscribe(
      (response:any) => {
        // this.isLoading = false;
        if(response.message=='success'){
          // this.isLoading = false;
          this.data=response.clients
          this.DataLength=this.data.length
        }else{
          this.data=[]
        }
        },
      (error) => {
        // this.isLoading = false;

        console.error('Error getting clients', error);
      }
    );
  }
  ngOnDestroy(): void {
    this.getClients()
    // console.log();
    
  }

}
