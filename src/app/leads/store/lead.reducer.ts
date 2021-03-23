import { Action, createReducer, on } from '@ngrx/store';

import { LeadListState } from "./lead.types";
import { getLeads, getLeadsSuccess, getLeadsFailed, setLeads } from './lead.actions';
import { Lead } from '~types/lead';

export const LEAD_INITIAL_STATE: LeadListState = {
  results: [],
  loading: false,
  error: null
};

export const leadReducer = createReducer(
  LEAD_INITIAL_STATE as any,
  on(getLeads, (actionState: LeadListState) => ({
    ...actionState,
    loading: true,
    error: null
  })) as any,
  on(
    getLeadsSuccess,
    (state: LeadListState, { results }: any) => ({
      ...state
    })
  )as any,
  on(
    getLeadsFailed,
    (state: LeadListState, { error }: any) => ({
      ...state,
      loading: false,
      error
    })
  ) as any,
  on(
    setLeads,
    (state: LeadListState, { leads }: {leads: Lead[]}) => ({
      ...state,
      results: leads,
      loading: false,
      error: null
    })
  ) as any,
)

function leadReducerWrapper(state: LeadListState, action: Action) {
  return leadReducer(state, action)
}

export const leadReducers: any = {
  list: leadReducerWrapper
}
