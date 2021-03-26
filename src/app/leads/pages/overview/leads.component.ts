import { LeadService } from './../../services/lead.service';
import { Lead } from './../../../types/lead';
import { Customer } from './../../../types/customer';
import { AfterViewInit, Component, ViewChild, OnInit } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable } from '@angular/material/table';
import { LeadsDataSource } from './leads-datasource';
import { LeadFacade } from '../../services/lead.facade';

@Component({
  selector: 'app-leads',
  templateUrl: './leads.component.html',
  styleUrls: ['./leads.component.scss']
})
export class LeadsOverviewPageComponent implements OnInit, AfterViewInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatTable) table!: MatTable<Lead>;
  dataSource: LeadsDataSource;

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['project', 'customer', 'status', 'detail'];

  constructor(private store: LeadFacade,
              private leadService: LeadService) {
    this.dataSource = new LeadsDataSource(store);
  }

  ngOnInit(): void {
    this.store.getLeads().subscribe(leads => {
      if(leads.length === 0) {
        this.leadService.fetchLeads().subscribe(leads => {
          this.store.setLeads(leads);
        })
      }
    })
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.table.dataSource = this.dataSource;
  }
}
