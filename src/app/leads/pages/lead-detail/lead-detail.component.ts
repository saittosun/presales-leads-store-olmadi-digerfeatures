import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Subject } from 'rxjs';
import { CustomerFacade } from '~customers/services/customer.facade';
import { Customer } from '~types/customer';

@Component({
  selector: 'app-lead-detail',
  templateUrl: './lead-detail.component.html',
  styleUrls: ['./lead-detail.component.scss']
})
export class LeadDetailPageComponent implements OnInit , OnDestroy{
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
      console.log(customers);
    })
    this.customer = this.customers.find(customer => customer.id === this.id)
    console.log(this.customer);
  }

  onEdit() {
    //
  }

  ngOnDestroy() {
    //
  }

}
