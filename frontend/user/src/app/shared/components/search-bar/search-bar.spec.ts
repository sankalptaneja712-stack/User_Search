import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { SearchBarComponent } from './search-bar.component';

describe('SearchBarComponent', () => {
  let component: SearchBarComponent;
  let fixture: ComponentFixture<SearchBarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SearchBarComponent],
      imports: [FormsModule], // Required for [(ngModel)]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should update query when input value changes', () => {
    const input = fixture.debugElement.query(By.css('input')).nativeElement;
    input.value = 'abc';
    input.dispatchEvent(new Event('input'));
    fixture.detectChanges();

    expect(component.query).toBe('abc');
  });

  it('should emit search event when query length >= 3', () => {
    spyOn(component.search, 'emit');
    component.query = 'abcd';
    const event = new Event('submit');
    component.submit(event);

    expect(component.search.emit).toHaveBeenCalledWith('abcd');
  });

  it('should not emit search event when query length < 3', () => {
    spyOn(component.search, 'emit');
    component.query = 'ab';
    const event = new Event('submit');
    component.submit(event);

    expect(component.search.emit).not.toHaveBeenCalled();
  });

  it('should call submit method when button is clicked', () => {
    spyOn(component, 'submit');
    const form = fixture.debugElement.query(By.css('form')).nativeElement;
    const event = new Event('submit');
    form.dispatchEvent(event);

    expect(component.submit).toHaveBeenCalled();
  });
});
