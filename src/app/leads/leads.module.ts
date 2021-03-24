import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';

import { SharedModule } from '~shared/shared.module';
import { LeadsRoutingModule } from './leads.routing';
import { LeadDetailPageComponent } from './pages/lead-detail/lead-detail.component';
import { NewLeadPageComponent } from './pages/new-lead-form/new-lead-form.component';
import { LeadService } from './services/lead.service';
import { LeadFacade } from './services/lead.facade';
import { LeadEffects } from './store/lead.effects';
import { leadReducer } from './store/lead.reducer';
import { LeadEditPageComponent } from './pages/lead-edit/lead-edit.component';
import { LeadsOverviewPageComponent } from './pages/overview/leads.component';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';

@NgModule({
  imports: [
    CommonModule,
    LeadsRoutingModule,
    StoreModule.forFeature('leads', leadReducer),
    EffectsModule.forFeature([LeadEffects]),
    SharedModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
  ],
  declarations: [
    LeadDetailPageComponent,
    NewLeadPageComponent,
    LeadEditPageComponent,
    LeadsOverviewPageComponent
  ],
  providers: [LeadEffects, LeadService, LeadFacade]
})
export class LeadsModule { }
