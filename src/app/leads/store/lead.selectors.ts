import { createSelector } from '@ngrx/store';

import { AppLeadState, LeadsState } from './lead.types';

export const LEADS_ROOT_SELECTOR = (state: AppLeadState) => state.leads;

export const LEADS_LOADING = createSelector(
  LEADS_ROOT_SELECTOR,
  (state: LeadsState) => state.lead.loading,
);

export const LEADS_ERROR = createSelector(
  LEADS_ROOT_SELECTOR,
  (state: LeadsState) => state.lead.error,
);
