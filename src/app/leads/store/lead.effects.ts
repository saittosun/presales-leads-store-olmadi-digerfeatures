import { Router } from '@angular/router';
import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { of } from "rxjs";
import { catchError, map, switchMap, tap } from "rxjs/operators";

import { LeadService } from "../services/lead.service";

import { addLeadFailed, addLeadSuccess, getLeadsFailed } from "./lead.actions";
import { getLeadsSuccess } from "./lead.actions";
import { LeadActions } from "./lead.actions";
import { Lead } from '~types/lead';

@Injectable()
export class LeadEffects {
  constructor(private actions$: Actions,
              private leadService: LeadService,
              private router: Router) { }

  public getLeads$ = createEffect(() =>
    this.actions$.pipe(
      ofType(LeadActions.getLeads),
      switchMap(() =>
        this.leadService.fetchLeads().pipe(
          map((results: Lead[]) => getLeadsSuccess({ results })),
          catchError((error: any) => of(getLeadsFailed({ error })))
        )
      )
    )
  );

  public addLead$ = createEffect(() =>
   this.actions$.pipe(
     ofType(LeadActions.addLead),
     switchMap(({lead}: {lead: Lead;}) =>
      this.leadService.addLead(lead).pipe(
        map((lead: Lead) => addLeadSuccess({lead})),
        tap(() => {
          this.router.navigate(['leads/lead-detail'])
        }),
        catchError((error: any) => of(addLeadFailed({error})))
      )
    )
   )
  )
}
