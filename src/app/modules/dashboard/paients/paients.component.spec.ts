import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaientsComponent } from './paients.component';

describe('PaientsComponent', () => {
  let component: PaientsComponent;
  let fixture: ComponentFixture<PaientsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PaientsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PaientsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
