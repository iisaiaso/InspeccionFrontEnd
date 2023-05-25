import { Component, OnInit } from '@angular/core';
import { log } from 'console';
import { Observable } from 'rxjs';
import { InspectionService } from 'src/app/services/inspection.services';

@Component({
  selector: 'app-show-inspection',
  templateUrl: './show-inspection.component.html',
  styleUrls: ['./show-inspection.component.css'],
})
export class ShowInspectionComponent implements OnInit {
  // inspectionList!: any[]
  inspectionList$!: Observable<any[]>;
  inspectionTypeList$!: Observable<any[]>;
  inspectionTypeList!: any[];
  modalTitle: string = '';
  activeAddInspectionComponent: boolean = false;
  inspection: any;

  id!: any;

  inspectionTypesMap: Map<number, string> = new Map();

  constructor(private inspectionService: InspectionService) {}

  ngOnInit(): void {
    // this.inspectionService.getInspection().subscribe(res => { this.inspectionList = res; console.log('Lista', this.inspectionList) })
    this.inspectionList$ = this.inspectionService.getInspection();
    this.inspectionTypeList$ = this.inspectionService.getInspectionType();
    this.refreshInspectionTypesMap();
  }

  refreshInspectionTypesMap() {
    this.inspectionService.getInspectionType().subscribe((data) => {
      this.inspectionTypeList = data;
      console.log('data', this.inspectionTypeList);
      for (let i = 0; i < data.length; i++) {
        this.inspectionTypesMap.set(
          this.inspectionTypeList[i].id,
          this.inspectionTypeList[i].inspectionName
        );
      }
    });
  }
  modalClose() {
    this.activeAddInspectionComponent = false;
    this.inspectionList$ = this.inspectionService.getInspection();
  }
  modalEdit(item: any) {
    console.log('Data de item', item);
    this.inspection = item;
    this.modalTitle = 'Editar Inspección';
    this.activeAddInspectionComponent = true;
  }

  modalAdd() {
    this.inspection = {
      id: 0,
      status: null,
      comments: null,
      inspectionTypeId: null,
    };
    this.modalTitle = 'Añadir Inspección';
    this.activeAddInspectionComponent = true;
  }

  delete(item: any) {
    if (confirm(`Estas seguro de eliminar Inspección ${item.id}`)) {
      this.inspectionService.deleteInspection(item.id).subscribe((res) => {
        // console.log('item', res);

        this.inspectionList$ = this.inspectionService.getInspection();
        var showDeleteSucces = document.getElementById('delete-success-alert');
        if (showDeleteSucces) {
          showDeleteSucces.style.display = 'block';
        }
        setTimeout(function () {
          if (showDeleteSucces) {
            showDeleteSucces.style.display = 'none';
          }
        }, 4000);
      });
    }
  }
  deleteInspection(id: number) {
    console.log('Delete', id);
    if (confirm('Estas seguro de eliminar tipo de inspección')) {
      console.log('AQui');
      this.inspectionService.deleteInspectionType(id).subscribe((res) => {
        console.log('Delete->', res);
        this.inspectionTypeList$ = this.inspectionService.getInspectionType();
      });
    }
  }
}
