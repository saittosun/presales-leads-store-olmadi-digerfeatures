import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs';
import { v4 as uuidv4 } from 'uuid';
import { Lead } from '~types/lead';
import { LeadFacade } from '../../services/lead.facade';


@Component({
  selector: 'app-lead-edit',
  templateUrl: './lead-edit.component.html',
  styleUrls: ['./lead-edit.component.scss']
})
export class LeadEditPageComponent implements OnInit {

  timelineData: string;
  leadNewForm: FormGroup;
  lead: Lead;
  leads: Lead[];
  submitted = false;
  id;
  private destroyed$ = new Subject<boolean>();

  constructor(private fb: FormBuilder,
              private store: LeadFacade,
              private router: Router,
              private route: ActivatedRoute,
              private toastr: ToastrService) {}

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.id = params.id;
    })
    this.store.getLeads().subscribe(leads => {
      this.leads = leads
    })
    this.lead = this.leads.find(lead => lead.id === this.id)
    console.log(this.lead);
    this.createLeadForm()
  }

  private createLeadForm() {
    this.leadNewForm = this.fb.group({
      leadname: new FormControl(this.lead.name, Validators.required),
      customer: new FormControl(this.lead.customer, Validators.required),
      status: new FormControl(this.lead.status, Validators.required),
      pitchDate: new FormControl(this.lead.pitchDate, Validators.required),
      offerDate: new FormControl(this.lead.offerDate, Validators.required),
      presantationDate: new FormControl(this.lead.offerPresentationDate),
      bafoDate: new FormControl(this.lead.bafoDate),
      startDate: new FormControl(this.lead.startDate),
      resolution: new FormControl(this.lead.resolution, Validators.required),
      resolutionComment: new FormControl(this.lead.resolutionComment),
      notes: new FormControl(this.lead.notes),
    })
  }

  onStatusChange() {
    this.timelineData = this.leadNewForm.value.status;
  }

  onResolutionChange() {
    this.timelineData = this.leadNewForm.value.resolution;
  }

  onSubmit() {
    this.submitted = true;
    const lead: Lead = {
      id: uuidv4(),
      name: this.leadNewForm.value.leadname,
      status: this.leadNewForm.value.status,
      resolution: this.leadNewForm.value.resolution,
      customer: this.leadNewForm.value.customer,
      resolutionComment: this.leadNewForm.value.resolutionComment,
      pitchDate: this.leadNewForm.value.pitchDate,
      offerDate: this.leadNewForm.value.offerDate,
      offerPresentationDate: this.leadNewForm.value.presantationDate,
      bafoDate: this.leadNewForm.value.bafoDate,
      startDate: this.leadNewForm.value.startDate,
      notes: this.leadNewForm.value.notes
    }
    if (this.leadNewForm.invalid) {
      this.toastr.error('You must fill the required fields!');
      return;
    }

    this.router.navigate(['../lead-detail', lead.id], {relativeTo: this.route});
    this.leadNewForm.reset();
    this.submitted = false;
  }

  ngOnDestroy(): void {
    this.destroyed$.next(true);
    this.destroyed$.complete();
  }

}
