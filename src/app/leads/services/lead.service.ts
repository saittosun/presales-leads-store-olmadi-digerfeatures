import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

import { Lead } from '~types/lead';

@Injectable()
export class LeadService {
  fetchLeads(): Observable<Lead[]> {
    return of([
      {
        id: "2718d62c-f21d-493c-8717-cfe979927xxx",
        name: "Mijn Tijden",
        reference: "A001144",
        status: "won",
        pitchDate: "2018-12-16T14:00:000Z",
        offerDate: "2019-01-07T08:00:000Z",
        offerPresentationDate: "2019-01-10T10:00:000Z",
        customer: "54bd4e53-029d-4743-831a-35efc0e003f4",
        description: "Short description field \nmulti line text",
        notes: "Notes field for further notes between people working on it"
      },
      {
        id: "2718d62c-f21d-493c-8717-cfe979927cbb",
        name: "Mijn Tijden",
        reference: "A001144",
        status: "won",
        pitchDate: "2018-12-16T14:00:000Z",
        offerDate: "2019-01-07T08:00:000Z",
        offerPresentationDate: "2019-01-10T10:00:000Z",
        customer: "54bd4e53-029d-4743-831a-35efc0e003f4",
        description: "Short description field \nmulti line text",
        notes: "Notes field for further notes between people working on it"
      },
      {
        id: "2718d62c-f21d-493c-8717-cfe979927yyy",
        name: "Mijn Tijden",
        reference: "A001144",
        status: "won",
        pitchDate: "2018-12-16T14:00:000Z",
        offerDate: "2019-01-07T08:00:000Z",
        offerPresentationDate: "2019-01-10T10:00:000Z",
        customer: "54bd4e53-029d-4743-831a-35efc0e003f4",
        description: "Short description field \nmulti line text",
        notes: "Notes field for further notes between people working on it"
      },
    ])
  }

  // updateCustomer(id: number, customer: Lead): Observable<Lead> {
  //   return of({...customer, id})
  // }

  // addCustomer(customer: Lead): Observable<Lead>{
  //   return of({...customer})
  // }
}
