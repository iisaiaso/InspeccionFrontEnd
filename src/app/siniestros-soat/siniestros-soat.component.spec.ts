import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SiniestrosSoatComponent } from './siniestros-soat.component';

describe('SiniestrosSoatComponent', () => {
  let component: SiniestrosSoatComponent;
  let fixture: ComponentFixture<SiniestrosSoatComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SiniestrosSoatComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SiniestrosSoatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
