import { Lead } from '~types/lead';
import { LeadService } from './leads/services/lead.service';
import { LeadFacade } from './leads/services/lead.facade';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { CustomerFacade } from '~customers/services/customer.facade';
import { CustomerService } from '~customers/services/customer.service';
import { Customer } from '~types/customer';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent implements OnInit, OnDestroy {
  title = 'lead-follow-up';

  leads: Lead[]
  customers: Customer[];
  private destroyed$ = new Subject<boolean>();

  constructor(private customerService: CustomerService,
              private store: CustomerFacade,
              private leadStore: LeadFacade,
              private leadService: LeadService) { }

  ngOnInit(): void {
     this.store.getCustomers().subscribe(customers => {
      if(customers.length === 0) {
        this.customerService.fetchCustomers().subscribe(customers => {
          this.store.setCustomers(customers);
          this.customers = customers;
        });
      } else {
        this.customers = customers;
      }
    })

    this.leadStore.getLeads().subscribe(leads => {
      if(leads.length === 0) {
        this.leadService.fetchLeads().subscribe(leads => {
          this.leadStore.setLeads(leads)
          this.leads = leads;
        })
      }else {
        this.leads = leads;
      }
    })
  }

  ngOnDestroy(): void {
    this.destroyed$.next(true);
    this.destroyed$.complete();
  }
}
