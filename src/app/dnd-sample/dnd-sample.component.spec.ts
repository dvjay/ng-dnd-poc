import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DndSampleComponent } from './dnd-sample.component';

describe('DndSampleComponent', () => {
  let component: DndSampleComponent;
  let fixture: ComponentFixture<DndSampleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DndSampleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DndSampleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
