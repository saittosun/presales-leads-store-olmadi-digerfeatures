import { DataSource } from '@angular/cdk/collections';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { map } from 'rxjs/operators';
import { Observable, of as observableOf, merge } from 'rxjs';
import { Customer } from '~types/customer';

// TODO: Replace this with your own data model type
// export interface Customer {
//   name: string;
//   id: number;
// }

// TODO: replace this with real data from your application
const EXAMPLE_DATA: Customer[] = [
  {
    id: 1,
    customername: 'Antwerpen',
    projectname: 'lijn',
    status: 'won',
    date: 'june',
    firstname: 'Jane',
    lastname: 'Doe',
    email: 'test@test.com',
    phonenumber: 11111111,
    vat: 11,
    address: {
      addressline1: 'kouterbaan',
      addressline2: 'kouter',
      city: 'denderleeuw',
      state: 'oost-vlanderen',
      country: 'belgie',
      zip: 9470
    }
  },
  {
    id: 2,
    customername: 'brussel',
    projectname: 'renson',
    status: 'BAFO',
    date: 'june',
    firstname: 'Jane',
    lastname: 'Doe',
    email: 'test@test.com',
    phonenumber: 11111111,
    vat: 11,
    address: {
      addressline1: 'kouterbaan',
      addressline2: 'kouter',
      city: 'denderleeuw',
      state: 'oost-vlanderen',
      country: 'belgie',
      zip: 9470
    }
  },
  {
    id: 3,
    customername: 'brussel',
    projectname: 'renson',
    status: 'pitch',
    date: 'june',
    firstname: 'Jane',
    lastname: 'Doe',
    email: 'test@test.com',
    phonenumber: 11111111,
    vat: 11,
    address: {
      addressline1: 'kouterbaan',
      addressline2: 'kouter',
      city: 'denderleeuw',
      state: 'oost-vlanderen',
      country: 'belgie',
      zip: 9470
    }
  },
  {
    id: 4,
    customername: 'brussel',
    projectname: 'renson',
    status: 'offer',
    date: 'june',
    firstname: 'Jane',
    lastname: 'Doe',
    email: 'test@test.com',
    phonenumber: 11111111,
    vat: 11,
    address: {
      addressline1: 'kouterbaan',
      addressline2: 'kouter',
      city: 'denderleeuw',
      state: 'oost-vlanderen',
      country: 'belgie',
      zip: 9470
    }
  },
  {
    id: 5,
    customername: 'brussel',
    projectname: 'renson',
    status: 'ongoing',
    date: 'june',
    firstname: 'Jane',
    lastname: 'Doe',
    email: 'test@test.com',
    phonenumber: 11111111,
    vat: 11,
    address: {
      addressline1: 'kouterbaan',
      addressline2: 'kouter',
      city: 'denderleeuw',
      state: 'oost-vlanderen',
      country: 'belgie',
      zip: 9470
    }
  },
  {
    id: 6,
    customername: 'brussel',
    projectname: 'renson',
    status: 'lost',
    date: 'june',
    firstname: 'Jane',
    lastname: 'Doe',
    email: 'test@test.com',
    phonenumber: 11111111,
    vat: 11,
    address: {
      addressline1: 'kouterbaan',
      addressline2: 'kouter',
      city: 'denderleeuw',
      state: 'oost-vlanderen',
      country: 'belgie',
      zip: 9470
    }
  },
  {
    id: 7,
    customername: 'brussel',
    projectname: 'renson',
    status: 'pitch',
    date: 'june',
    firstname: 'Jane',
    lastname: 'Doe',
    email: 'test@test.com',
    phonenumber: 11111111,
    vat: 11,
    address: {
      addressline1: 'kouterbaan',
      addressline2: 'kouter',
      city: 'denderleeuw',
      state: 'oost-vlanderen',
      country: 'belgie',
      zip: 9470
    }
  },
  {
    id: 8,
    customername: 'brussel',
    projectname: 'renson',
    status: 'won',
    date: 'june',
    firstname: 'Jane',
    lastname: 'Doe',
    email: 'test@test.com',
    phonenumber: 11111111,
    vat: 11,
    address: {
      addressline1: 'kouterbaan',
      addressline2: 'kouter',
      city: 'denderleeuw',
      state: 'oost-vlanderen',
      country: 'belgie',
      zip: 9470
    }
  },
];

/**
 * Data source for the Leads view. This class should
 * encapsulate all logic for fetching and manipulating the displayed data
 * (including sorting, pagination, and filtering).
 */
export class LeadsDataSource extends DataSource<Customer> {
  data: Customer[] = EXAMPLE_DATA;
  paginator: MatPaginator | undefined;
  sort: MatSort | undefined;

  constructor() {
    super();
  }

  /**
   * Connect this data source to the table. The table will only update when
   * the returned stream emits new items.
   * @returns A stream of the items to be rendered.
   */
  connect(): Observable<Customer[]> {
    if (this.paginator && this.sort) {
      // Combine everything that affects the rendered data into one update
      // stream for the data-table to consume.
      return merge(observableOf(this.data), this.paginator.page, this.sort.sortChange)
        .pipe(map(() => {
          return this.getPagedData(this.getSortedData([...this.data ]));
        }));
    } else {
      throw Error('Please set the paginator and sort on the data source before connecting.');
    }
  }

  /**
   *  Called when the table is being destroyed. Use this function, to clean up
   * any open connections or free any held resources that were set up during connect.
   */
  disconnect(): void {}

  /**
   * Paginate the data (client-side). If you're using server-side pagination,
   * this would be replaced by requesting the appropriate data from the server.
   */
  private getPagedData(data: Customer[]): Customer[] {
    if (this.paginator) {
      const startIndex = this.paginator.pageIndex * this.paginator.pageSize;
      return data.splice(startIndex, this.paginator.pageSize);
    } else {
      return data;
    }
  }

  /**
   * Sort the data (client-side). If you're using server-side sorting,
   * this would be replaced by requesting the appropriate data from the server.
   */
  private getSortedData(data: Customer[]): Customer[] {
    if (!this.sort || !this.sort.active || this.sort.direction === '') {
      return data;
    }

    return data.sort((a, b) => {
      const isAsc = this.sort?.direction === 'asc';
      switch (this.sort?.active) {
        case 'project': return compare(a.projectname, b.projectname, isAsc);
        case 'customer': return compare(a.customername, b.customername, isAsc);
        case 'status': return compare(a.status, b.status, isAsc);
        default: return 0;
      }
    });
  }
}

/** Simple sort comparator for example ID/Name columns (for client-side sorting). */
function compare(a: string | number, b: string | number, isAsc: boolean): number {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}
