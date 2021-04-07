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
import { LeadEffects } from './leadstore/lead.effects';
import { leadReducers } from './leadstore/lead.reducer';
import { LeadEditPageComponent } from './pages/lead-edit/lead-edit.component';
import { LeadsOverviewPageComponent } from './pages/overview/leads.component';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { TimeLineComponent } from './time-line/time-line.component';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatNativeDateModule } from '@angular/material/core';
import { MatInputModule } from '@angular/material/input';


@NgModule({
  imports: [
    CommonModule,
    LeadsRoutingModule,
    StoreModule.forFeature('leads', leadReducers),
    EffectsModule.forFeature([LeadEffects]),
    SharedModule,
    MatTableModule,
    MatPaginatorModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatNativeDateModule,
    MatInputModule,
    MatSortModule,
  ],
  declarations: [
    LeadDetailPageComponent,
    NewLeadPageComponent,
    LeadEditPageComponent,
    LeadsOverviewPageComponent,
    TimeLineComponent
  ],
  providers: [LeadEffects, LeadService, LeadFacade]
})
export class LeadsModule { }
