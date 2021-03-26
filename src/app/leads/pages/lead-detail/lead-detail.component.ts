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

  onEdit() {
    //
  }

  ngOnDestroy() {
    //
  }

}
