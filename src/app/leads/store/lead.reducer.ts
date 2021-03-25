import { getLeads, getLeadsFailed, getLeadsSuccess, setLeads } from './lead.actions';
import { Action, createReducer, on } from '@ngrx/store';
import { LeadListState } from './lead.types';
import { Lead } from '~types/lead';

export const LEAD_INITIAL_STATE: LeadListState = {
  projects: [],
  loading: false,
  error: null
};

export const leadReducer = createReducer(
  on(getLeads, (actionState: LeadListState) => ({
    ...actionState,
    loading: true,
    error: null
  })) as any,
  on(getLeadsSuccess,
    (state: LeadListState, { results }: any) => ({
      ...state,
      loading: results,
      error: null
    })) as any,
  on(getLeadsFailed,
    (state: LeadListState, { error }: any) => ({
      ...state,
      loading: false,
      error
    })) as any,
  on(setLeads,
    (state: LeadListState, { leads }: { leads: Lead[]}) => ({
      ...state,
      projects: leads,
      loading: false,
      error: null
    })) as any,
);

function leadReducerWrapper(state: LeadListState, action: Action) {
  return leadReducer(state, action)
}

export const leadReducers: any = {
  lead: leadReducerWrapper
}
