import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChange, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatSelectChange } from '@angular/material/select';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit, OnChanges {
  @Input() formFields: any = [{}];
  form: any = {};
  registerForm: FormGroup;
  @Input() submitted: any;
  @Input() loading: any;
  insubmit = false;
  @Output() formStatus: any = new EventEmitter();
  @Output() formData: any = new EventEmitter();
  constructor(private formBuilder: FormBuilder,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    let formObj: any = {};
    this.formFields.forEach((element: any) => {
      this.form[element.name] = element.value;
      formObj[element.name] = ['', element.validators];
    });
    this.registerForm = this.formBuilder.group(formObj);

  }
  selectedVal(ev: MatSelectChange, name: string) {
    console.log(ev.value, ev, name);
    this.form[name] = ev.value;
  }
  get f() { return this.registerForm.controls; }
  handleSubmit = () => {
    this.insubmit = true;
    this.formStatus.emit(this.registerForm.status);
    if (this.registerForm.status == 'VALID') {
      this.snackBar.open('Submitted Successfully!', 'Close', {
        duration: 2000
      });
      this.formData.emit(this.form);
      let formObj: any = {};
      this.formFields.forEach((element: any) => {
        if (!['file'].includes(element.type)) {
          this.form[element.name] = element.value;
          formObj[element.name] = ['', element.validators];
        }
      });
      this.registerForm = this.formBuilder.group(formObj);
    }
  }
  ngOnChanges(ev: SimpleChanges) {
    let submitted: SimpleChange = ev.submitted;
    if (submitted.currentValue === true) {
      this.insubmit = false;
    }
  }
  onChange(id: any) {
    const inputNode: any = document.querySelector(`#${id}`);
    let file: any = inputNode.files;
    if (file.length > 1)
      file = inputNode.files;
    else
      file = inputNode.files[0];
    this.form[id] = file;
  }

}
