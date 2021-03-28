import { CustomerFacade } from '~customers/services/customer.facade';
import { Lead } from './../../../types/lead';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Subject } from 'rxjs';
import { LeadFacade } from '../../services/lead.facade';

@Component({
  selector: 'app-lead-detail',
  templateUrl: './lead-detail.component.html',
  styleUrls: ['./lead-detail.component.scss']
})
export class LeadDetailPageComponent implements OnInit , OnDestroy{
  private destroyed$ = new Subject<boolean>();
  leads: Lead[];
  lead: Lead;
  id: string;

  constructor(private store: LeadFacade,
              private route: ActivatedRoute,
              private customerFacade: CustomerFacade,
              private router: Router) { }

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.id = params.id;
    })
    this.store.getLeads().subscribe(leads => {
      this.leads = leads
      console.log(leads);
    })
    this.lead = this.leads.find(lead => lead.id === this.id)
    console.log(this.lead);
  }

  onHandleCustomer() {
    const customerName = this.lead.customer;
    this.customerFacade.getCustomers().subscribe(customers => {
      customers.forEach(customer => {
        if(customer.customername === customerName) {
          this.router.navigate(['customers/customer-detail', customer.id])
        }
      })
    })
  }

  onEdit() {
    //
  }

  ngOnDestroy() {
    //
  }

}
