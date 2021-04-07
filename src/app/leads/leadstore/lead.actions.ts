import { createAction, props } from '@ngrx/store';

import { Lead } from '~types/lead';

export enum LeadActions {
  getLeads = '[Leads]: get all Leads',
  getLeadsSuccess = '[Leads]: get all Leads success',
  getLeadsFailed = '[Leads]: get all Leads failed',
  setLeads = '[General]: set all Leads',
  setLeadsSuccess = '[General]: set all Leads success',
  setLeadsFailed = '[General]: set all Leads failed',
  addLead = '[New Lead Form]: add new lead',
  addLeadSuccess = '[New Lead Form]: add new lead',
  addLeadFailed = '[New Lead Form]: add new lead'
}

export const getLeads = createAction(LeadActions.getLeads);

export const getLeadsSuccess = createAction(
  LeadActions.getLeadsSuccess,
  props<{ results: Lead[] }>()
);

export const getLeadsFailed = createAction(
  LeadActions.getLeadsFailed,
  props<{ error: string }>()
);

export const addLead = createAction(
  LeadActions.addLead,
  props<{lead: Lead}>()
);

export const addLeadSuccess = createAction(
  LeadActions.addLeadSuccess,
  props<{ lead: Lead }>()
);

export const addLeadFailed = createAction(
  LeadActions.addLeadFailed,
  props<{ error: string }>()
);

export const setLeads = createAction(
  LeadActions.setLeads,
  props<{leads: Lead[]}>()
)
export const setLeadsSuccess = createAction(
  LeadActions.setLeadsSuccess,
  props<{ lead: Lead }>()
)

export const setLeadsFailed = createAction(
  LeadActions.setLeadsFailed,
  props<{ error: string }>()
)
