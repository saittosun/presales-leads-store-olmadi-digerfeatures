import { CustomerFacade } from './../../services/customer.facade';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';
import { CustomerService } from '~customers/services/customer.service';
import { Customer } from '~types/customer';

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.scss']
})
export class CustomersOverviewPageComponent implements OnInit, OnDestroy {
  // customers: Customer[] = [];
  customers: Customer[];
  filteredCustomers: Customer[]
  private destroyed$ = new Subject<boolean>();

  constructor(private customerService: CustomerService,
              private store: CustomerFacade) { }

  ngOnInit(): void {
    this.store.getCustomers().subscribe(customers => {
      if(customers.length === 0) {
        this.customerService.fetchCustomers().subscribe(customers => {
          this.store.setCustomers(customers);
          console.log(customers);
          this.customers = customers;
        });
      } else {
        this.customers = customers;
      }
    })
  }

  ngOnDestroy(): void {
    this.destroyed$.next(true);
    this.destroyed$.complete();
  }
}
