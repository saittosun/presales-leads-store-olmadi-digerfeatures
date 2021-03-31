import { FormControl, Validators } from '@angular/forms';
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
  // statusForm : FormControl;
  private destroyed$ = new Subject<boolean>();
  leads: Lead[];
  lead: Lead;
  id: string;
  // timelineData = [];
  timelineData: string;

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
    })
    this.lead = this.leads.find(lead => lead.id === this.id)
    // const statusArray: string[] = []
    // this.leads.forEach(lead => statusArray.push(lead.status))
    // this.timelineData = {
    //   array: statusArray,
    //   index: this.leads.indexOf(this.lead)
    // };
    // this.leads.forEach(lead => this.timelineData.push(lead.status))
    // console.log(this.timelineData);

    this.timelineData = this.lead.status;

    // const status = this.timelineData.array[this.timelineData.index]
    // this.statusForm = new FormControl(status, Validators.required)
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

  onStatusChange() {
    // const lead = this.leads.find(lead => lead.status === this.statusForm.value);
    // this.timelineData.index = this.leads.indexOf(lead)
  }

  onEdit() {
    //
  }

  ngOnDestroy() {
    //
  }

}
