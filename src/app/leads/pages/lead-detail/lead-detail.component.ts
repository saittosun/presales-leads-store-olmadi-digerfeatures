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
  leadStatus;

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
      switch(this.lead.status){
        case 'lead':
          this.leadStatus = 1;
          break;
        case 'pitch':
          this.leadStatus = 2;
          break;
        case 'offer':
          this.leadStatus = 3;
          break;
        case 'BAFO':
          this.leadStatus = 4;
          break;
        case 'won':
          this.leadStatus = 5;
          break;
      }
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
