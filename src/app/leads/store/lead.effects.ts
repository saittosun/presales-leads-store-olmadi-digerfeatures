import { Lead } from './../../types/lead';
import { Router } from '@angular/router';
import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { of } from "rxjs";
import { catchError, map, switchMap, tap } from "rxjs/operators";

import { LeadService } from "../services/lead.service";

import { getLeadsFailed } from "./lead.actions";
import { getLeadsSuccess } from "./lead.actions";
import { LeadActions } from "./lead.actions";

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

  // public updateCustomer$ = createEffect(() =>
  // this.actions$.pipe(
  //   ofType(CustomerActions.updateCustomer),
  //   switchMap(({customer, id}: {customer: Customer; id: number}) =>
  //     this.customerService.updateCustomer(id, customer).pipe(
  //       map((customer: Customer) => updateCustomerSuccess({ customer })),
  //       tap(() => {
  //         this.router.navigate(['customers/customer-detail', id])
  //       }),
  //       catchError((error: any) => of(updateCustomerFailed({ error })))
  //       )
  //     )
  //   )
  // );

  // public addCustomer$ = createEffect(() =>
  //  this.actions$.pipe(
  //    ofType(CustomerActions.addCustomer),
  //    switchMap(({customer}: {customer: Customer;}) =>
  //     this.customerService.addCustomer(customer).pipe(
  //       map((customer: Customer) => addCustomerSuccess({customer})),
  //       tap(() => {
  //         this.router.navigate(['customers/customer-detail'])
  //       }),
  //       catchError((error: any) => of(addCustomerFailed({error})))
  //     )
  //   )
  //  )
  // )
}
