import { createAction, props } from '@ngrx/store';

import { Lead } from '~types/lead';

export enum LeadActions {
  getLeads = '[Leads]: get all Leads',
  getLeadsSuccess = '[Leads]: get all Leads success',
  getLeadsFailed = '[Leads]: get all Leads failed',
  setLeads = '[General]: set all Leads',
  setLeadsSuccess = '[General]: set all Leads success',
  setLeadsFailed = '[General]: set all Leads failed',
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

// export const updateCustomer = createActionLead.updateCustomer,
//   props<{customer: Partial<Lead>, id: number}>()
// )

// export const updateCustomerSuccess = createAction(
//   CustomerActions.updateCustomerSuccess,
//   props<{ customer: Lead }>()
// );

// export const updateCustomerFailed = createAction(
//   CustomerActions.updateCustomerFailed,
//   props<{ error: string }>()
// );

// export const addCustomer = createAction(
//   CustomerActions.addCustomer,
//   props<{customer: Lead}>()
// );

// export const addCustomerSuccess = createAction(
//   CustomerActions.addCustomerSuccess,
//   props<{ customer: Lead }>()
// );

// export const addCustomerFailed = createAction(
//   CustomerActions.addCustomerFailed,
//   props<{ error: string }>()
// );

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
