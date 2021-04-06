import { FormControl, Validators, FormGroup, FormBuilder } from '@angular/forms';
import { CustomerFacade } from '~customers/services/customer.facade';
import { Lead } from './../../../types/lead';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Subject } from 'rxjs';
import { LeadFacade } from '../../services/lead.facade';
import { environment } from '../../../../environments/environment';


@Component({
  selector: 'app-lead-detail',
  templateUrl: './lead-detail.component.html',
  styleUrls: ['./lead-detail.component.scss']
})
export class LeadDetailPageComponent implements OnInit {
  statusResolutionForm : FormGroup;
  resolutionForm : FormControl;
  private destroyed$ = new Subject<boolean>();
  leads: Lead[];
  lead: Lead;
  id: string;
  activeResolution: string;
  resolutionArray: string[] = environment.resolution
  activeStatus: string;
  statusArray: string[] = environment.status

  constructor(private store: LeadFacade,
              private route: ActivatedRoute,
              private customerFacade: CustomerFacade,
              private router: Router,
              private fb: FormBuilder) { }

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.id = params.id;
    })
    this.store.getLeads().subscribe(leads => {
      this.leads = leads
    })
    this.lead = this.leads.find(lead => lead.id === this.id)
    this.createStatusResolutionForm()
    this.activeStatus = this.lead.status;
    // this.statusForm = new FormControl(this.activeStatus, Validators.required);
    this.activeResolution = this.lead.resolution;
    // this.resolutionForm = new FormControl(this.activeResolution, Validators.required)
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

  private createStatusResolutionForm() {
    this.statusResolutionForm = this.fb.group({
      statusForm: new FormControl(this.lead.status, Validators.required),
      resolutionForm: new FormControl(this.lead.resolution, Validators.required)
    })
  }

  onStatusChange() {
    this.activeStatus = this.statusResolutionForm.value.statusForm;
    console.log(this.activeStatus);
  }

  onResolutionChange() {
    this.activeResolution = this.statusResolutionForm.value.resolutionForm;
    console.log(this.activeResolution);
  }

  onEdit() {
    //
  }

}
