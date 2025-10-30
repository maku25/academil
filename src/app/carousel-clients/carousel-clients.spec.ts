import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarouselClients } from './carousel-clients';

describe('CarouselClients', () => {
  let component: CarouselClients;
  let fixture: ComponentFixture<CarouselClients>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CarouselClients]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CarouselClients);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
