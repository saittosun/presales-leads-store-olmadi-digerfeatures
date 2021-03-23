import { Observable } from 'rxjs/internal/Observable';
import { Injectable } from '@angular/core';
import { of } from 'rxjs';

import { Customer } from '~types/customer';
import { map, take } from 'rxjs/operators';

@Injectable()
export class CustomerService {
  customers: Observable<Customer[]>;
  customer: Customer;

  fetchCustomers(): Observable<Customer[]> {
    return of([
      {
        id: 1,
        customername: 'Antwerpen',
        projectname: 'Nova',
        status: 'offer',
        date: 'end of june',
        firstname: 'Jane',
        lastname: 'Doe',
        email: 'test@test.com',
        phonenumber: 11111111,
        vat: 11,
        address: {
          addressline1: 'kouterbaan',
          city: 'denderleeuw',
          state: 'oost-vlanderen',
          country: 'belgie',
          zip: 9470
        }
      },
      {
        id: 2,
        customername: 'Renson',
        projectname: 'Nova',
        status: 'offer',
        date: 'end of june',
        firstname: 'Jane',
        lastname: 'Doe',
        email: 'test@test.com',
        phonenumber: 22222222,
        vat: 11,
        address: {
          addressline1: 'kouterbaan',
          city: 'denderleeuw',
          state: 'oost-vlanderen',
          country: 'belgie',
          zip: 9470
        }
      },
      {
        id: 3,
        customername: 'Brussel',
        projectname: 'Nova',
        status: 'offer',
        date: 'end of june',
        firstname: 'Jane',
        lastname: 'Doe',
        email: 'test@test.com',
        phonenumber: 11111111,
        vat: 11,
        address: {
          addressline1: 'kouterbaan',
          city: 'denderleeuw',
          state: 'oost-vlanderen',
          country: 'belgie',
          zip: 9470
        }
      },
      {
        id: 4,
        customername: 'Gent',
        projectname: 'Nova',
        status: 'offer',
        date: 'end of june',
        firstname: 'Jane',
        lastname: 'Doe',
        email: 'test@test.com',
        phonenumber: 11111111,
        vat: 11,
        address: {
          addressline1: 'kouterbaan',
          city: 'denderleeuw',
          state: 'oost-vlanderen',
          country: 'belgie',
          zip: 9470
        }
      },
      {
        id: 5,
        customername: 'Brugge',
        projectname: 'presales',
        status: 'offer',
        date: 'end of june',
        firstname: 'Jane',
        lastname: 'Doe',
        email: 'test@test.com',
        phonenumber: 11111111,
        vat: 11,
        address: {
          addressline1: 'kouterbaan',
          city: 'denderleeuw',
          state: 'oost-vlanderen',
          country: 'belgie',
          zip: 9470
        }
      },
    ])
  }

  updateCustomer(id: number, customer: Customer): Observable<Customer> {
    return of({...customer, id})
  }

  addCustomer(customer: Customer): Observable<Customer>{
    return of({...customer})
  }

}
