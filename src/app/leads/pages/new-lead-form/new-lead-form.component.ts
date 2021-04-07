import { take } from 'rxjs/operators';
import { environment } from '../../../../environments/environment';
import { LeadService } from './../../services/lead.service';
import { v4 as uuidv4 } from 'uuid';
import { Lead } from './../../../types/lead';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { LeadFacade } from '../../services/lead.facade';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-new-lead-form',
  templateUrl: './new-lead-form.component.html',
  styleUrls: ['./new-lead-form.component.scss']
})
export class NewLeadPageComponent implements OnInit {
  statusArray: string[] = environment.status;
  resolutionArray: string[] = environment.resolution
  timelineData: string;
  leadNewForm: FormGroup;
  lead: Lead;
  leads: Lead[];
  submitted = false;
  private destroyed$ = new Subject<boolean>();

  constructor(private fb: FormBuilder,
              private store: LeadFacade,
              private router: Router,
              private route: ActivatedRoute,
              private leadService: LeadService) {}

  ngOnInit(): void {
    this.store.getLeads().pipe(take(1)).subscribe(leads => {
      if(leads.length === 0) {
        this.leadService.fetchLeads().subscribe(leads => {
          this.store.setLeads(leads);
          this.initilazie(leads);
        })
      } else {
        this.initilazie(leads);
      }
    });
  }

  initilazie(leads) {
    this.store.getLeads().subscribe(leads =>
    this.leads = leads)
    console.log(this.leads);
    this.createLeadForm()
  }


  ngOnDestroy(): void {
    this.destroyed$.next(true);
    this.destroyed$.complete();
  }

  private createLeadForm() {
    this.leadNewForm = this.fb.group({
      leadname: new FormControl('', Validators.required),
      customer: new FormControl('', Validators.required),
      status: new FormControl('', Validators.required),
      pitchDate: new FormControl('', Validators.required),
      offerDate: new FormControl('', Validators.required),
      presantationDate: new FormControl('', Validators.required),
      resolution: new FormControl('', Validators.required),
      resolutionComment: new FormControl('', Validators.required),
      notes: new FormControl('', Validators.required),
    })
  }

  onStatusChange() {
    this.timelineData = this.leadNewForm.value.status;
    console.log(this.timelineData);
  }

  onResolutionChange() {
    this.timelineData = this.leadNewForm.value.resolution;
    console.log(this.timelineData);
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
      notes: this.leadNewForm.value.notes
    }
    if (this.leadNewForm.invalid) {
      alert('You must fill the required fields!');
      return;
    }

    console.log(this.leadNewForm.value);
    console.log(lead);
    this.store.addLead(lead);
    this.router.navigate(['../lead-detail', lead.id], {relativeTo: this.route});
    this.leadNewForm.reset();
    this.submitted = false;
  }

}
