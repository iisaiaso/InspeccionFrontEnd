import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { InspectionService } from 'src/app/services/inspection.services';

@Component({
  selector: 'app-add-edit-inspection',
  templateUrl: './add-edit-inspection.component.html',
  styleUrls: ['./add-edit-inspection.component.css'],
})
export class AddEditInspectionComponent implements OnInit {
  inspectionList$!: Observable<any[]>;
  inspectionTypeList$!: Observable<any[]>;
  inspectionTypeList!: any[];
  statusList$!: Observable<any[]>;

  constructor(private service: InspectionService) {}

  @Input() inspection: any;

  id: number = 0;
  status: string = '';
  comments: string = '';
  inspectionTypeId!: number;

  ngOnInit(): void {
    this.id = this.inspection.id;
    // console.log(this.id)
    this.status = this.inspection.status;
    this.comments = this.inspection.comments;
    this.inspectionTypeId = this.inspection.inspectionTypeId;
    this.statusList$ = this.service.getStatus();
    this.inspectionTypeList$ = this.service.getInspectionType();
    // console.log(this.inspectionTypeList$);
  }

  addInspection() {
    let inspection = {
      status: this.status,
      comments: this.comments,
      inspectionTypeId: this.inspectionTypeId,
    };
    // console.log('insp', inspection);

    this.service.addInspection(inspection).subscribe((res) => {
      // console.log('add ->', res);
      let closeModalBtn = document.getElementById('add-edit-modal-close');
      if (closeModalBtn) {
        closeModalBtn.click();
      }
      this.inspectionList$ = this.service.getInspection();
      let showAddSuccess = document.getElementById('add-success-alert');
      if (showAddSuccess) {
        showAddSuccess.style.display = 'block';
      }
      setTimeout(function () {
        if (showAddSuccess) {
          showAddSuccess.style.display = 'none';
        }
      }, 4000);
    });
  }

  updateInspection() {
    let data = {
      id: this.id,
      status: this.status,
      comments: this.comments,
      inspectionTypeId: this.inspectionTypeId,
    };
    // console.log('inspect', data);
    let id: number = this.id;
    // console.log(id);

    this.service.updateInspection(id, data).subscribe((res) => {
      let closeModalBtn = document.getElementById('add-edit-modal-close');
      if (closeModalBtn) {
        closeModalBtn.click();
      }
      this.inspectionList$ = this.service.getInspection();
      let showAddSuccess = document.getElementById('update-success-alert');
      if (showAddSuccess) {
        showAddSuccess.style.display = 'block';
      }
      setTimeout(function () {
        if (showAddSuccess) {
          showAddSuccess.style.display = 'none';
        }
      }, 4000);
    });
  }
}
