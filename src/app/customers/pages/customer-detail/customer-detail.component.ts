import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';

import { Customer } from '~types/customer';
import { CustomerFacade } from '~customers/services/customer.facade';
import { Observable, Subject } from 'rxjs';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-customer-detail',
  templateUrl: './customer-detail.component.html',
  styleUrls: ['./customer-detail.component.scss']
})
export class CustomerDetailPageComponent implements OnInit {
  private destroyed$ = new Subject<boolean>();
  customers: Customer[];
  customer: Customer;
  id: number;

  constructor(private store: CustomerFacade,
              private route: ActivatedRoute,
              private router: Router) { }

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.id = +params.id;
    })
    this.store.getCustomers().subscribe(customers => {
      this.customers = customers
    })
    this.customer = this.customers.find(customer => customer.id === this.id)
    console.log(this.customer);
    // const id = this.store.findId(this.id);
    // console.log(id)
  }

  onEdit() {
    this.router.navigate(['edit'], { relativeTo: this.route });
  }

  ngOnDestroy(): void {
    this.destroyed$.next(true);
    this.destroyed$.complete();
  }

}

