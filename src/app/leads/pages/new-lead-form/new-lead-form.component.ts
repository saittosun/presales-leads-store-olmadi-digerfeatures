import { Lead } from './../../../types/lead';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { LeadFacade } from '../../services/lead.facade';
import { LeadService } from '../../services/lead.service';


@Component({
  selector: 'app-new-lead-form',
  templateUrl: './new-lead-form.component.html',
  styleUrls: ['./new-lead-form.component.scss']
})
export class NewLeadPageComponent implements OnInit {
  timelineData: string;
  leadNewForm: FormGroup;
  lead: Lead;
  leads: Lead[];
  submitted = false;
  private destroyed$ = new Subject<boolean>();

  constructor(private fb: FormBuilder,
              private store: LeadFacade,
              private leadService: LeadService) {}

  ngOnInit(): void {
    this.store.getLeads().subscribe(leads => {
      this.leads = leads
      console.log(this.leads);
    })
    this.createLeadForm()
  }

  private createLeadForm() {
    this.leadNewForm = this.fb.group({
      leadname: new FormControl('', Validators.required),
      customer: new FormControl('', Validators.required),
      status: new FormControl('', Validators.required),
      description: new FormControl('')
    })
  }

  onStatusChange() {

  }

  onSubmit() {
    this.submitted = true;
    // if (this.leadNewForm.invalid) {
    //   alert('You must fill the required fields!');
    //   return;
    // }
  }






}
