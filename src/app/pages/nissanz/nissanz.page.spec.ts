import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NissanzPage } from './nissanz.page';

describe('NissanzPage', () => {
  let component: NissanzPage;
  let fixture: ComponentFixture<NissanzPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(NissanzPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
